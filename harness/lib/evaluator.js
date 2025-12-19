/**
 * Reflektera Text Harness v1.1
 * Evaluator - Runs all checks and produces dual scores
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTextByScope } from './utils.js';
import { runAllRegexChecks } from './checks/regex-checks.js';
import { runAllHeuristicChecks } from './checks/heuristic-checks.js';
import { runAllLLMJudgeChecks } from './checks/llm-judge.js';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HARNESS_ROOT = path.resolve(__dirname, '..');

/**
 * Load acceptance checks from JSON
 */
function loadChecks() {
  const checksPath = path.join(HARNESS_ROOT, 'acceptance_checks.json');
  return JSON.parse(fs.readFileSync(checksPath, 'utf-8'));
}

/**
 * Load examples content for clone detection
 */
function loadExamples() {
  const examplesPath = path.join(HARNESS_ROOT, 'examples.md');
  return fs.readFileSync(examplesPath, 'utf-8');
}

/**
 * Get all checks for a profile (both compliance and quality)
 */
function getProfileChecks(checksData, profile) {
  const profileData = checksData.profiles[profile];
  if (!profileData) {
    throw new Error(`Unknown profile: ${profile}`);
  }
  
  return {
    compliance: profileData.compliance.checks,
    quality: profileData.quality.checks,
    all: [...profileData.compliance.checks, ...profileData.quality.checks]
  };
}

/**
 * Calculate scores from check results
 * Handles skipped LLM checks (they don't count towards score)
 */
function calculateScores(checkResults, profileChecks) {
  // Compliance = regex + heuristic
  const complianceChecks = profileChecks.compliance;
  let compliancePassed = 0;
  let complianceTotal = 0;
  
  for (const check of complianceChecks) {
    const result = checkResults[check.id];
    // Skip checks that are marked as skipped
    if (result?.skipped) continue;
    
    complianceTotal += check.weight;
    if (result?.pass) {
      compliancePassed += check.weight;
    }
  }
  
  // Quality = llm_judge
  const qualityChecks = profileChecks.quality;
  let qualityPassed = 0;
  let qualityTotal = 0;
  let qualitySkipped = false;
  
  for (const check of qualityChecks) {
    const result = checkResults[check.id];
    // Track if any quality check was skipped
    if (result?.skipped) {
      qualitySkipped = true;
      continue;
    }
    
    qualityTotal += check.weight;
    if (result?.pass) {
      qualityPassed += check.weight;
    }
  }
  
  const compliance_score = complianceTotal > 0 
    ? Math.round(100 * compliancePassed / complianceTotal) 
    : 0;
  
  // If all quality checks were skipped, quality_score is null and quality_status is SKIPPED
  let quality_score = null;
  let quality_status = null;
  let total_score = 0;
  let total_score_formula = '';
  
  if (qualitySkipped && qualityTotal === 0) {
    // Quality was skipped - use null for score, set status
    quality_score = null;
    quality_status = 'SKIPPED';
    total_score = compliance_score;
    total_score_formula = 'compliance_only (quality skipped)';
  } else {
    // Quality was evaluated normally
    quality_score = qualityTotal > 0 
      ? Math.round(100 * qualityPassed / qualityTotal) 
      : 0;
    quality_status = null;
    total_score = Math.round(0.6 * compliance_score + 0.4 * quality_score);
    total_score_formula = '0.6 * compliance + 0.4 * quality';
  }
  
  return { 
    compliance_score, 
    quality_score, 
    quality_status,
    total_score, 
    total_score_formula,
    qualitySkipped 
  };
}

/**
 * Build results JSON structure
 */
function buildResultsJson(checkResults, scores, targets, profile, version = 'v1') {
  const perCheck = [];
  
  for (const [id, result] of Object.entries(checkResults)) {
    const checkEntry = {
      id,
      title: result.check?.title || id,
      type: result.check?.type || 'unknown',
      scope: result.check?.scope || 'full_text',
      weight: result.check?.weight || 0,
      pass: result.pass,
      notes: result.notes
    };
    
    // Mark skipped checks
    if (result.skipped) {
      checkEntry.skipped = true;
      checkEntry.pass = false; // Skipped checks are treated as failed for routing
    }
    
    // Include score-based data for W007
    if (id === 'W007' && result.score !== undefined) {
      checkEntry.score = result.score;
      checkEntry.threshold = result.threshold;
      checkEntry.reasons = result.reasons;
    }
    
    perCheck.push(checkEntry);
  }
  
  // Sort by type then id
  perCheck.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.id.localeCompare(b.id);
  });
  
  // Determine run status
  let run_status = null;
  const compliance_met = scores.compliance_score >= targets.complianceTarget;
  const quality_met = scores.quality_status === 'SKIPPED' 
    ? null  // Cannot evaluate quality target offline
    : (scores.quality_score >= targets.qualityTarget);
  
  if (scores.quality_status === 'SKIPPED') {
    run_status = compliance_met ? 'PARTIAL_OFFLINE_SUCCESS' : 'OFFLINE_INCOMPLETE';
  } else {
    run_status = (compliance_met && quality_met) ? 'SUCCESS' : 'INCOMPLETE';
  }
  
  return {
    version,
    timestamp: new Date().toISOString(),
    profile,
    scores: {
      compliance_score: scores.compliance_score,
      quality_score: scores.quality_score,  // null when skipped
      quality_status: scores.quality_status,  // "SKIPPED" or null
      total_score: scores.total_score,
      total_score_formula: scores.total_score_formula
    },
    targets: {
      compliance_target: targets.complianceTarget,
      quality_target: targets.qualityTarget,
      compliance_met,
      quality_met,  // null when skipped
      run_status
    },
    per_check: perCheck
  };
}

/**
 * Build summary markdown
 */
function buildSummaryMd(results, runId) {
  const { scores, targets, per_check, profile } = results;
  
  const failedChecks = per_check.filter(c => !c.pass && !c.skipped);
  const passedChecks = per_check.filter(c => c.pass);
  const skippedChecks = per_check.filter(c => c.skipped);
  
  let md = `# Run Summary

**Run ID:** ${runId}
**Profile:** ${profile}
**Timestamp:** ${results.timestamp}

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | ${scores.compliance_score} | ${targets.compliance_target} | ${targets.compliance_met ? '✅ MET' : '❌ NOT MET'} |
| Quality | ${scores.quality_status === 'SKIPPED' ? 'SKIPPED (LLM disabled)' : scores.quality_score} | ${targets.quality_target} | ${scores.quality_status === 'SKIPPED' ? '⏭️ SKIPPED' : (targets.quality_met ? '✅ MET' : '❌ NOT MET')} |
| Total | ${scores.total_score} | - | - |
| Formula | ${scores.total_score_formula} | - | - |
| Run Status | ${targets.run_status} | - | - |

## Check Results

### ✅ Passed (${passedChecks.length})
`;

  for (const check of passedChecks) {
    md += `- **${check.id}** (${check.type}, weight: ${check.weight}): ${check.notes}\n`;
  }

  md += `
### ❌ Failed (${failedChecks.length})
`;

  for (const check of failedChecks) {
    md += `- **${check.id}** (${check.type}, weight: ${check.weight}): ${check.notes}\n`;
  }

  if (skippedChecks.length > 0) {
    md += `
### ⏭️ Skipped (${skippedChecks.length}) - LLM disabled
`;

    for (const check of skippedChecks) {
      md += `- **${check.id}** (${check.type}, weight: ${check.weight}): ${check.notes}\n`;
    }
  }

  return md;
}

/**
 * Find the latest version number in run directory
 */
function findLatestVersion(runDir) {
  const files = fs.readdirSync(runDir);
  let maxVersion = 0;
  
  for (const file of files) {
    const match = file.match(/output_v(\d+)\.txt/);
    if (match) {
      maxVersion = Math.max(maxVersion, parseInt(match[1]));
    }
  }
  
  return maxVersion || 1;
}

/**
 * Main evaluate function
 */
export async function evaluate(runDir, options = {}) {
  const {
    complianceTarget = 95,
    qualityTarget = 85,
    stubMode = false,
    version = null
  } = options;
  
  // Find version to evaluate
  const versionNum = version || findLatestVersion(runDir);
  const versionStr = `v${versionNum}`;
  
  console.log(`📊 Evaluating ${versionStr}...`);
  
  // Load spec to get profile
  const specPath = path.join(runDir, 'post_spec.json');
  if (!fs.existsSync(specPath)) {
    throw new Error(`Spec not found: ${specPath}`);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  const profile = spec.profile;
  
  console.log(`📂 Profile: ${profile}`);
  
  // Load output
  const outputPath = path.join(runDir, `output_${versionStr}.txt`);
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Output not found: ${outputPath}`);
  }
  const output = fs.readFileSync(outputPath, 'utf-8');
  
  // Load checks and examples
  const checksData = loadChecks();
  const examplesContent = loadExamples();
  const profileChecks = getProfileChecks(checksData, profile);
  
  console.log(`🔍 Running ${profileChecks.all.length} checks...`);
  
  // Create scope getter
  const scopeGetter = (text, scope) => getTextByScope(text, scope);
  
  // Run all checks
  console.log('  → Regex checks...');
  const regexResults = runAllRegexChecks(output, profileChecks.all, scopeGetter);
  
  console.log('  → Heuristic checks...');
  const heuristicResults = runAllHeuristicChecks(
    output, 
    profileChecks.all, 
    scopeGetter, 
    { examplesContent }
  );
  
  console.log('  → LLM judge checks...');
  const llmResults = await runAllLLMJudgeChecks(
    output, 
    profileChecks.all, 
    scopeGetter,
    { stubMode: stubMode || !config.LLM_ENABLED }
  );
  
  // Merge all results
  const allResults = {
    ...regexResults,
    ...heuristicResults,
    ...llmResults
  };
  
  // Calculate scores
  const scores = calculateScores(allResults, profileChecks);
  
  console.log('');
  if (scores.qualitySkipped) {
    console.log(`📊 Compliance: ${scores.compliance_score}/100 (target: ${complianceTarget})`);
    console.log(`📊 Quality: SKIPPED (LLM disabled)`);
    console.log(`📊 Total: ${scores.total_score}/100 (${scores.total_score_formula})`);
    console.log(`⚠️  Quality target cannot be evaluated offline`);
  } else {
    console.log(`📊 Compliance: ${scores.compliance_score}/100 (target: ${complianceTarget})`);
    console.log(`📊 Quality: ${scores.quality_score}/100 (target: ${qualityTarget})`);
    console.log(`📊 Total: ${scores.total_score}/100 (${scores.total_score_formula})`);
  }
  
  // Build and save results
  const targets = { complianceTarget, qualityTarget };
  const resultsJson = buildResultsJson(allResults, scores, targets, profile, versionStr);
  
  const resultsPath = path.join(runDir, `results_${versionStr}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(resultsJson, null, 2));
  console.log(`💾 Saved: ${resultsPath}`);
  
  // Build and save summary
  const runId = path.basename(runDir);
  const summaryMd = buildSummaryMd(resultsJson, runId);
  
  const summaryPath = path.join(runDir, 'summary.md');
  fs.writeFileSync(summaryPath, summaryMd);
  console.log(`💾 Saved: ${summaryPath}`);
  
  // Print failed checks
  const failedChecks = resultsJson.per_check.filter(c => !c.pass);
  if (failedChecks.length > 0) {
    console.log('');
    console.log('❌ Failed checks:');
    for (const check of failedChecks) {
      console.log(`   - ${check.id}: ${check.title} (${check.type}, weight: ${check.weight})`);
    }
  } else {
    console.log('');
    console.log('✅ All checks passed!');
  }
  
  return resultsJson;
}
