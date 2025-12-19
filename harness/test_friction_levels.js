/**
 * Test script för att testa alla friction-nivåer (1-5) med samma spec
 * Verifierar att varje nivå producerar distinkt text och klarar compliance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generate } from './lib/generator.js';
import { evaluate } from './lib/evaluator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HARNESS_ROOT = path.resolve(__dirname, '..');
const RUNS_DIR = path.join(HARNESS_ROOT, 'runs');

// Base spec från warm_provocation_konflikter.json
const BASE_SPEC = {
  meta: {
    created_at: new Date().toISOString(),
    version: '1.1',
    harness_version: '1.1.0'
  },
  channel: 'linkedin',
  profile: 'warm_provocation',
  topic: 'Konflikträdsla på jobbet',
  audience: 'Yrkesverksamma som undviker jobbiga samtal',
  user_input: 'Skriv ett LinkedIn-inlägg om konflikter på jobbet. Jag vill att det ska vara rakt, lite provocerande men inte otrevligt. Utgå från att många säger att de inte är konflikträdda, men i praktiken undviker jobbiga samtal och istället går och stör sig, pratar i korridoren eller skriver passivt aggressivt i Slack. Texten ska få folk att känna igen sig och kanske bli lite obekväma, men också visa att det finns ett bättre sätt. Använd konkreta exempel från vardagen, korta meningar med pauser, och gärna någon tydlig metafor. Avsluta med en varm men självsäker uppmaning till samtal, inte säljsnack.',
  constraints: {
    no_asterisks: true,
    no_swearing: true,
    language: 'sv',
    max_chars: 1200,
    min_chars: 600,
    signature: {
      name: 'Ann-Christin',
      tagline: 'Ninja-psykolog och den som fortfarande övar på att inte skicka DM när jag borde ta mötet'
    }
  },
  controls: {
    friction: 3, // Will be overridden
    warmth: 3,
    story: 3,
    seed: 42
  }
};

/**
 * Create a test run directory
 */
function createTestRunDir(level) {
  const now = new Date();
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  
  const runDir = path.join(RUNS_DIR, `friction_test_${level}_${formatted}`);
  fs.mkdirSync(runDir, { recursive: true });
  
  return runDir;
}

/**
 * Test a single friction level
 */
async function testFrictionLevel(level) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 TESTAR FRICTION NIVÅ ${level}/5`);
  console.log('='.repeat(60));
  
  // Create spec with this friction level
  const spec = {
    ...BASE_SPEC,
    controls: {
      ...BASE_SPEC.controls,
      friction: level
    }
  };
  
  // Create run directory
  const runDir = createTestRunDir(level);
  const specPath = path.join(runDir, 'post_spec.json');
  fs.writeFileSync(specPath, JSON.stringify(spec, null, 2));
  
  try {
    // Generate
    console.log(`📝 Genererar output för nivå ${level}...`);
    const genResult = await generate(specPath, runDir);
    
    // Read output
    const outputPath = path.join(runDir, 'output_v1.txt');
    const output = fs.readFileSync(outputPath, 'utf-8');
    
    // Evaluate
    console.log(`📊 Utvärderar output...`);
    const evalResult = await evaluate(runDir, {
      complianceTarget: 95,
      qualityTarget: 85
    });
    
    // Extract key metrics
    const compliance = evalResult.scores.compliance_score;
    const quality = evalResult.scores.quality_score;
    const qualityStatus = evalResult.scores.quality_status;
    const total = evalResult.scores.total_score;
    
    // Check critical checks
    const w007 = evalResult.per_check.find(c => c.id === 'W007');
    const w007b = evalResult.per_check.find(c => c.id === 'W007b');
    const w001 = evalResult.per_check.find(c => c.id === 'W001');
    const w005 = evalResult.per_check.find(c => c.id === 'W005');
    
    // Extract hook (first 2-3 lines)
    const lines = output.split('\n').filter(l => l.trim());
    const hook = lines.slice(0, 3).join(' ').substring(0, 150);
    
    return {
      level,
      runDir,
      output,
      hook,
      scores: {
        compliance,
        quality,
        qualityStatus,
        total
      },
      checks: {
        w007: w007 ? { pass: w007.pass, score: w007.score, notes: w007.notes } : null,
        w007b: w007b ? { pass: w007b.pass, notes: w007b.notes } : null,
        w001: w001 ? { pass: w001.pass, notes: w001.notes } : null,
        w005: w005 ? { pass: w005.pass, notes: w005.notes } : null
      },
      allPassed: w007?.pass && w007b?.pass && w001?.pass && w005?.pass
    };
  } catch (error) {
    console.error(`❌ Fel vid testning av nivå ${level}:`, error.message);
    return {
      level,
      error: error.message
    };
  }
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🚀 Startar friction-nivå tester');
  console.log(`📂 Base spec: ${BASE_SPEC.topic}`);
  console.log(`📝 User input: ${BASE_SPEC.user_input.substring(0, 100)}...`);
  
  const results = [];
  
  // Test all levels
  for (let level = 1; level <= 5; level++) {
    const result = await testFrictionLevel(level);
    results.push(result);
    
    if (result.error) {
      console.log(`❌ Nivå ${level} misslyckades: ${result.error}`);
    } else {
      console.log(`\n✅ Nivå ${level} Resultat:`);
      console.log(`   Compliance: ${result.scores.compliance}/100`);
      console.log(`   Quality: ${result.scores.quality || result.scores.qualityStatus}/100`);
      console.log(`   Total: ${result.scores.total}/100`);
      console.log(`   Hook: "${result.hook}..."`);
      console.log(`   W007: ${result.checks.w007?.pass ? '✅' : '❌'} (score: ${result.checks.w007?.score || 'N/A'})`);
      console.log(`   W007b: ${result.checks.w007b?.pass ? '✅' : '❌'}`);
      console.log(`   W001: ${result.checks.w001?.pass ? '✅' : '❌'}`);
      console.log(`   W005: ${result.checks.w005?.pass ? '✅' : '❌'}`);
      console.log(`   Alla checks: ${result.allPassed ? '✅' : '❌'}`);
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SAMMANFATTNING');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => !r.error);
  const failed = results.filter(r => r.error);
  
  console.log(`\n✅ Lyckade: ${successful.length}/5`);
  console.log(`❌ Misslyckade: ${failed.length}/5`);
  
  if (failed.length > 0) {
    console.log('\n❌ Misslyckade nivåer:');
    failed.forEach(r => {
      console.log(`   Nivå ${r.level}: ${r.error}`);
    });
  }
  
  // Check uniqueness
  console.log('\n🔍 UNIKHETSKONTROLL:');
  const hooks = successful.map(r => r.hook);
  const uniqueHooks = new Set(hooks.map(h => h.toLowerCase().substring(0, 50)));
  
  if (uniqueHooks.size === hooks.length) {
    console.log('✅ Alla hooks är unika');
  } else {
    console.log('⚠️  Varning: Några hooks verkar lika');
    hooks.forEach((hook, idx) => {
      console.log(`   Nivå ${idx + 1}: "${hook.substring(0, 80)}..."`);
    });
  }
  
  // Compliance summary
  console.log('\n📊 COMPLIANCE SAMMANFATTNING:');
  successful.forEach(r => {
    const status = r.allPassed ? '✅' : '⚠️';
    console.log(`   Nivå ${r.level}: ${status} Compliance: ${r.scores.compliance}, Quality: ${r.scores.quality || r.scores.qualityStatus}`);
  });
  
  // Output locations
  console.log('\n📁 OUTPUT FILER:');
  successful.forEach(r => {
    console.log(`   Nivå ${r.level}: ${r.runDir}`);
  });
  
  console.log('\n✅ Testning klar!\n');
  
  return results;
}

// Run tests
runTests().catch(error => {
  console.error('❌ Testfel:', error);
  process.exit(1);
});

