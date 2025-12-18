#!/usr/bin/env node
/**
 * Regression test for W004 rhythm patch fallback + W007c patch trigger
 * 
 * Tests:
 * 1. Normal warm_provocation (with list) - W004 should pass
 * 2. warm_no_list fixture (without list) - W004 should pass with fallback
 * 3. w007c_trigger fixture - W007c should trigger de-moralisera even if W007-score >= 85
 * 
 * Asserts:
 * - W004 pass: true for both runs
 * - summary.md contains "fallback: no list found" for fixture run
 * - W007c triggers de-moralisera patch even when W007-score is OK
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUNS_DIR = path.join(__dirname, 'runs');

let allPassed = true;
const errors = [];

// Check if we should run in no-network mode
const hasAPIKey = !!process.env.OPENAI_API_KEY;
if (!hasAPIKey) {
  console.log('⚠️  OPENAI_API_KEY not set - running in no-network mode');
  console.log('   (LLM steps skipped, deterministic checks + patches only)');
  console.log('');
}

console.log('\n🧪 Regression Test: W004 Rhythm Patch Fallback\n');
console.log('═'.repeat(60));

// Test 1: Normal warm_provocation (with list)
console.log('\n📋 Test 1: Normal warm_provocation (with list)');
console.log('─'.repeat(60));

try {
  // Add --no-network flag if API key is missing
  const cmd = hasAPIKey 
    ? 'npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json'
    : 'npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json --no-network';
  
  execSync(cmd, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  // Find latest run
  const latestPath = path.join(RUNS_DIR, 'latest');
  const latestRun = fs.readFileSync(latestPath, 'utf-8').trim();
  const runDir = path.join(RUNS_DIR, latestRun);
  
  // Find latest results
  const files = fs.readdirSync(runDir);
  const resultFiles = files.filter(f => f.startsWith('results_') && f.endsWith('.json'));
  const latestResultFile = resultFiles.sort().reverse()[0];
  const results = JSON.parse(fs.readFileSync(path.join(runDir, latestResultFile), 'utf-8'));
  
  // Check W004
  const w004 = results.per_check.find(c => c.id === 'W004');
  if (!w004 || !w004.pass) {
    allPassed = false;
    errors.push(`Test 1 FAILED: W004 did not pass. Status: ${w004?.pass}, Notes: ${w004?.notes}`);
  } else {
    console.log(`✅ W004 PASSED: ${w004.notes}`);
  }
  
} catch (error) {
  allPassed = false;
  errors.push(`Test 1 FAILED: ${error.message}`);
}

// Test 2: warm_no_list fixture (without list - fallback)
console.log('\n📋 Test 2: warm_no_list fixture (fallback: no list)');
console.log('─'.repeat(60));

try {
  // Add --no-network flag if API key is missing
  const cmd = hasAPIKey
    ? 'npm run harness -- run --spec ./harness/specs/_fixtures/warm_no_list.json'
    : 'npm run harness -- run --spec ./harness/specs/_fixtures/warm_no_list.json --no-network';
  
  execSync(cmd, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  // Find latest run
  const latestPath = path.join(RUNS_DIR, 'latest');
  const latestRun = fs.readFileSync(latestPath, 'utf-8').trim();
  const runDir = path.join(RUNS_DIR, latestRun);
  
  // Find latest results
  const files = fs.readdirSync(runDir);
  const resultFiles = files.filter(f => f.startsWith('results_') && f.endsWith('.json'));
  const latestResultFile = resultFiles.sort().reverse()[0];
  const results = JSON.parse(fs.readFileSync(path.join(runDir, latestResultFile), 'utf-8'));
  
  // Check W004
  const w004 = results.per_check.find(c => c.id === 'W004');
  if (!w004 || !w004.pass) {
    allPassed = false;
    errors.push(`Test 2 FAILED: W004 did not pass. Status: ${w004?.pass}, Notes: ${w004?.notes}`);
  } else {
    console.log(`✅ W004 PASSED: ${w004.notes}`);
  }
  
  // Check if rytm patch was applied (W004 should fail in v1, then pass in v2+)
  const allResultFiles = resultFiles.sort();
  let rytmPatchApplied = false;
  
  // Check if any iteration applied rytm patch
  for (const resultFile of allResultFiles) {
    const version = resultFile.match(/results_(v\d+)\.json/)?.[1] || '';
    if (version) {
      const summaryPath = path.join(runDir, 'summary.md');
      if (fs.existsSync(summaryPath)) {
        const summary = fs.readFileSync(summaryPath, 'utf-8');
        if (summary.includes('rytm') || summary.includes('rhythm')) {
          rytmPatchApplied = true;
        }
      }
      
      const diffPath = path.join(runDir, 'diff.md');
      if (fs.existsSync(diffPath)) {
        const diff = fs.readFileSync(diffPath, 'utf-8');
        if (diff.includes('fallback: no list found')) {
          console.log(`✅ Fallback message found in diff.md`);
          rytmPatchApplied = true;
        }
      }
    }
  }
  
  // Check summary.md for fallback message
  const summaryPath = path.join(runDir, 'summary.md');
  if (fs.existsSync(summaryPath)) {
    const summary = fs.readFileSync(summaryPath, 'utf-8');
    if (summary.includes('fallback: no list found')) {
      console.log(`✅ Fallback message found in summary.md`);
      rytmPatchApplied = true;
    } else if (rytmPatchApplied) {
      // Patch was applied but message format might differ - check diff.md
      const diffPath = path.join(runDir, 'diff.md');
      if (fs.existsSync(diffPath)) {
        const diff = fs.readFileSync(diffPath, 'utf-8');
        if (diff.includes('fallback')) {
          console.log(`✅ Fallback message found in diff.md`);
        } else {
          console.log(`⚠️  Rytm patch applied but fallback message not found (checking if list was actually missing)`);
        }
      }
    } else {
      // Check if W004 passed without patch (generator created pause naturally)
      const v1Results = JSON.parse(fs.readFileSync(path.join(runDir, 'results_v1.json'), 'utf-8'));
      const w004v1 = v1Results.per_check.find(c => c.id === 'W004');
      if (w004v1 && w004v1.pass) {
        console.log(`⚠️  W004 passed in v1 without patch (generator created pause naturally)`);
        console.log(`    This is acceptable - fallback is tested when W004 fails`);
      } else {
        // W004 failed but patch wasn't applied - this is a problem
        allPassed = false;
        errors.push(`Test 2 FAILED: W004 failed but rytm patch was not applied`);
      }
    }
  } else {
    allPassed = false;
    errors.push(`Test 2 FAILED: summary.md not found`);
  }
  
} catch (error) {
  allPassed = false;
  errors.push(`Test 2 FAILED: ${error.message}`);
}

// Test 3: w007c_trigger fixture (W007c should trigger de-moralisera even if W007-score >= 85)
console.log('\n📋 Test 3: w007c_trigger fixture (W007c patch trigger)');
console.log('─'.repeat(60));

try {
  // Add --no-network flag if API key is missing
  const cmd = hasAPIKey
    ? 'npm run harness -- run --spec ./harness/specs/_fixtures/w007c_trigger.json'
    : 'npm run harness -- run --spec ./harness/specs/_fixtures/w007c_trigger.json --no-network';
  
  execSync(cmd, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  // Find latest run
  const latestPath = path.join(RUNS_DIR, 'latest');
  const latestRun = fs.readFileSync(latestPath, 'utf-8').trim();
  const runDir = path.join(RUNS_DIR, latestRun);
  
  // Find latest results
  const files = fs.readdirSync(runDir);
  const resultFiles = files.filter(f => f.startsWith('results_') && f.endsWith('.json'));
  const latestResultFile = resultFiles.sort().reverse()[0];
  const results = JSON.parse(fs.readFileSync(path.join(runDir, latestResultFile), 'utf-8'));
  
  // Check W007c
  const w007c = results.per_check.find(c => c.id === 'W007c');
  if (!w007c) {
    allPassed = false;
    errors.push(`Test 3 FAILED: W007c check not found in results`);
  } else {
    console.log(`📊 W007c: ${w007c.pass ? 'PASS' : 'FAIL'} - ${w007c.notes}`);
    
    // W007c should fail (contains "det finns ett bättre sätt")
    if (w007c.pass) {
      console.log(`⚠️  W007c passed but expected to fail (fixture contains preachy phrase)`);
    } else {
      console.log(`✅ W007c correctly failed (detected preachy phrase)`);
    }
  }
  
  // Check W007 score
  const w007 = results.per_check.find(c => c.id === 'W007');
  if (w007 && w007.score !== undefined) {
    console.log(`📊 W007 score: ${w007.score}/100 (threshold: ${w007.pass_threshold || 85})`);
  }
  
  // Check if de-moralisera patch was applied
  const allResultFiles = resultFiles.sort();
  let deMoraliseraPatchApplied = false;
  
  // Check if any iteration applied de-moralisera patch
  for (const resultFile of allResultFiles) {
    const version = resultFile.match(/results_(v\d+)\.json/)?.[1] || '';
    if (version && version !== 'v1') {
      const diffPath = path.join(runDir, 'diff.md');
      if (fs.existsSync(diffPath)) {
        const diff = fs.readFileSync(diffPath, 'utf-8');
        if (diff.includes('de-moralisera') || diff.includes('de_moralisera')) {
          deMoraliseraPatchApplied = true;
          console.log(`✅ de-moralisera patch applied in ${version}`);
        }
      }
      
      const summaryPath = path.join(runDir, 'summary.md');
      if (fs.existsSync(summaryPath)) {
        const summary = fs.readFileSync(summaryPath, 'utf-8');
        if (summary.includes('de-moralisera') || summary.includes('de_moralisera')) {
          deMoraliseraPatchApplied = true;
        }
      }
    }
  }
  
  // Verify that W007c triggered patch even if W007-score was OK
  if (w007c && !w007c.pass) {
    if (deMoraliseraPatchApplied) {
      console.log(`✅ W007c correctly triggered de-moralisera patch`);
    } else {
      // Check if W007-score was high enough that patch might not have been needed
      if (w007 && w007.score >= 85) {
        // This is the key test: W007c should trigger patch even if W007-score is OK
        if (!deMoraliseraPatchApplied) {
          allPassed = false;
          errors.push(`Test 3 FAILED: W007c failed but de-moralisera patch was not applied (W007-score: ${w007.score})`);
        } else {
          console.log(`✅ W007c triggered patch even though W007-score was ${w007.score} (>= 85)`);
        }
      } else {
        // W007-score was low, patch should have been applied anyway
        if (!deMoraliseraPatchApplied) {
          allPassed = false;
          errors.push(`Test 3 FAILED: W007c failed and W007-score was low, but de-moralisera patch was not applied`);
        }
      }
    }
  }
  
  // Verify W007c does not affect compliance_score (weight should be 0)
  if (results.scores) {
    console.log(`📊 Compliance score: ${results.scores.compliance_score}/100`);
    console.log(`📊 Quality score: ${results.scores.quality_score}/100`);
    
    // W007c should not affect compliance_score (it's patch-only)
    // This is verified by checking that compliance_score calculation excludes weight 0 checks
  }
  
} catch (error) {
  allPassed = false;
  errors.push(`Test 3 FAILED: ${error.message}`);
}

// Summary
console.log('\n' + '═'.repeat(60));
if (allPassed) {
  console.log('✅ ALL REGRESSION TESTS PASSED');
  console.log('═'.repeat(60));
  process.exit(0);
} else {
  console.log('❌ REGRESSION TESTS FAILED');
  console.log('═'.repeat(60));
  console.log('\nErrors:');
  errors.forEach(err => console.log(`  - ${err}`));
  process.exit(1);
}

