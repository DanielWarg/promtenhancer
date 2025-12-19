/**
 * Test script för Brev-profil Challenge Levels (1-5)
 * Testar nivåer 1-5 med användarens specifika prompt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root FIRST
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) return;
    
    const key = trimmed.substring(0, equalIndex).trim();
    const value = trimmed.substring(equalIndex + 1).trim();
    
    if (key && value && !process.env[key]) {
      process.env[key] = value;
    }
  });
  
  if (process.env.OPENAI_API_KEY) {
    console.log(`✅ API-nyckel laddad från .env`);
  } else {
    console.log(`⚠️  OPENAI_API_KEY inte hittad i .env`);
  }
} else {
  console.log(`⚠️  .env finns inte på ${envPath}`);
}

// Import AFTER .env is loaded
import { generate } from './lib/generator.js';
import { evaluate } from './lib/evaluator.js';

const HARNESS_ROOT = path.resolve(__dirname, '..');
const RUNS_DIR = path.join(HARNESS_ROOT, 'runs');

// Load spec
const specPath = path.join(__dirname, 'specs', 'brev_smallbarn_test.json');
const baseSpec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));

/**
 * Create a test run directory
 */
function createTestRunDir(level) {
  const now = new Date();
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  
  const runDir = path.join(RUNS_DIR, `brev_test_level_${level}_${formatted}`);
  fs.mkdirSync(runDir, { recursive: true });
  
  return runDir;
}

/**
 * Run test for all levels 1-5
 */
async function runTest() {
  const results = {
    timestamp: new Date().toISOString(),
    profile: 'brev',
    spec: baseSpec,
    levels: {}
  };

  console.log('\n🧪 TESTAR BREV-PROFIL NIVÅER 1-5\n');
  console.log('Prompt:', baseSpec.user_input.substring(0, 100) + '...\n');

  // Test each level
  for (let level = 1; level <= 5; level++) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TESTAR NIVÅ ${level}/5`);
    console.log('='.repeat(60));

    const spec = {
      ...baseSpec,
      controls: {
        ...baseSpec.controls,
        friction: level
      }
    };

    // Create run directory
    const runDir = createTestRunDir(level);
    const specPath = path.join(runDir, 'post_spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec, null, 2));

    try {
      // Generate
      console.log(`\n📝 Genererar text för nivå ${level}...`);
      await generate(specPath, runDir);
      
      // Read output
      const outputPath = path.join(runDir, 'output_v1.txt');
      let output = fs.readFileSync(outputPath, 'utf-8');
      
      // Remove LLM disabled markers if present
      if (output.includes('[GENERATION SKIPPED')) {
        const parts = output.split('---\n\n');
        output = parts.length > 1 ? parts[parts.length - 1] : output;
      }
      output = output.replace(/\[DUMMY OUTPUT.*?\]/g, '').trim();
      
      // Evaluate
      console.log(`\n🔍 Utvärderar text för nivå ${level}...`);
      const evaluation = await evaluate(runDir, {
        complianceTarget: 95,
        qualityTarget: 85
      });
      
      results.levels[level] = {
        runDir,
        output,
        evaluation,
        compliance_score: evaluation.scores.compliance_score,
        quality_score: evaluation.scores.quality_score,
        total_score: evaluation.scores.total_score,
        checks: evaluation.per_check
      };

      console.log(`\n✅ Nivå ${level} klar:`);
      console.log(`   Compliance: ${evaluation.scores.compliance_score}/100`);
      console.log(`   Quality: ${evaluation.scores.quality_score}/100`);
      console.log(`   Total: ${evaluation.scores.total_score}/100`);

      // Show key checks
      const keyChecks = ['B005', 'B008'];
      keyChecks.forEach(checkId => {
        const check = evaluation.per_check.find(c => c.id === checkId);
        if (check) {
          console.log(`   ${checkId}: ${check.pass ? '✅ PASS' : '❌ FAIL'} - ${check.notes}`);
        }
      });

    } catch (error) {
      console.error(`\n❌ Fel vid nivå ${level}:`, error.message);
      results.levels[level] = {
        error: error.message
      };
    }
  }

  // Create summary directory
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const summaryDir = path.join(RUNS_DIR, `brev_test_summary_${timestamp}`);
  if (!fs.existsSync(summaryDir)) {
    fs.mkdirSync(summaryDir, { recursive: true });
  }

  // Save full results
  fs.writeFileSync(
    path.join(summaryDir, 'full_results.json'),
    JSON.stringify(results, null, 2)
  );

  // Generate markdown report
  const markdown = generateMarkdownReport(results);
  const markdownPath = path.join(summaryDir, 'results.md');
  fs.writeFileSync(markdownPath, markdown);
  
  // Also save in root for easy access
  const rootMarkdownPath = path.join(HARNESS_ROOT, 'BREV_TEST_RESULTS.md');
  fs.writeFileSync(rootMarkdownPath, markdown);

  console.log(`\n\n${'='.repeat(60)}`);
  console.log('✅ TEST KLART');
  console.log('='.repeat(60));
  console.log(`\n📄 Resultat sparade i:`);
  console.log(`   ${markdownPath}`);
  console.log(`   ${rootMarkdownPath}`);
  console.log(`\n`);

  return results;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(results) {
  let md = `# Brev-profil Test Resultat\n\n`;
  md += `**Datum:** ${new Date(results.timestamp).toLocaleString('sv-SE')}\n`;
  md += `**Profil:** ${results.profile}\n`;
  md += `**Prompt:** ${results.spec.user_input}\n\n`;
  md += `---\n\n`;

  // Summary table
  md += `## Sammanfattning\n\n`;
  md += `| Nivå | Compliance | Quality | Total | Status |\n`;
  md += `|------|------------|---------|-------|--------|\n`;
  
  Object.keys(results.levels).forEach(level => {
    const levelData = results.levels[level];
    if (levelData.error) {
      md += `| ${level} | - | - | - | ❌ Error: ${levelData.error} |\n`;
    } else {
      const status = levelData.compliance_score >= 95 && levelData.quality_score >= 85 ? '✅' : '⚠️';
      md += `| ${level} | ${levelData.compliance_score}/100 | ${levelData.quality_score}/100 | ${levelData.total_score}/100 | ${status} |\n`;
    }
  });

  md += `\n---\n\n`;

  // Detailed results per level
  Object.keys(results.levels).forEach(level => {
    const levelData = results.levels[level];
    
    md += `## Nivå ${level}/5\n\n`;
    
    if (levelData.error) {
      md += `**Fel:** ${levelData.error}\n\n`;
      return;
    }

    md += `### Scores\n\n`;
    md += `- **Compliance:** ${levelData.compliance_score || 'N/A'}/100\n`;
    md += `- **Quality:** ${levelData.quality_score || 'N/A'}/100\n`;
    md += `- **Total:** ${levelData.total_score || 'N/A'}/100\n\n`;

    // Checks
    if (levelData.checks && levelData.checks.length > 0) {
      md += `### Checks\n\n`;
      md += `| Check | Status | Notes |\n`;
      md += `|-------|--------|-------|\n`;
      
      levelData.checks.forEach(check => {
        const status = check.pass ? '✅ PASS' : '❌ FAIL';
        const notes = check.notes ? check.notes.substring(0, 100) : '-';
        md += `| ${check.id} | ${status} | ${notes} |\n`;
      });
      
      md += `\n`;
    }

    // Output
    if (levelData.output) {
      md += `### Genererad Text\n\n`;
      md += `\`\`\`\n`;
      md += levelData.output;
      md += `\n\`\`\`\n\n`;
    }

    // Run directory
    if (levelData.runDir) {
      md += `**Run directory:** \`${levelData.runDir}\`\n\n`;
    }

    md += `---\n\n`;
  });

  return md;
}

// Run test
runTest().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
