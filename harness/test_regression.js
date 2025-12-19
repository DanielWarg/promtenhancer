#!/usr/bin/env node
/**
 * Reflektera Text Harness v1.1
 * Regression Test Suite - Runs without LLM/network
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generate } from './lib/generator.js';
import { evaluate } from './lib/evaluator.js';
import { config } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HARNESS_ROOT = path.resolve(__dirname);

/**
 * Test that generator creates run folder even without LLM
 */
async function testGeneratorOffline() {
  console.log('🧪 Test 1: Generator creates run folder without LLM');
  
  const specPath = path.join(HARNESS_ROOT, 'specs', 'brev_smallbarn.json');
  if (!fs.existsSync(specPath)) {
    console.log('  ⚠️  Skipping (spec file not found)');
    return true;
  }
  
  try {
    const runDir = path.join(HARNESS_ROOT, 'runs', `test_${Date.now()}`);
    fs.mkdirSync(runDir, { recursive: true });
    
    const result = await generate(specPath, runDir);
    
    // Verify files were created
    const requiredFiles = [
      'post_spec.json',
      'internal_prompt_v1.txt',
      'output_v1.txt'
    ];
    
    let allExist = true;
    for (const file of requiredFiles) {
      const filePath = path.join(runDir, file);
      if (!fs.existsSync(filePath)) {
        console.log(`  ❌ Missing file: ${file}`);
        allExist = false;
      }
    }
    
    if (allExist) {
      console.log('  ✅ Generator creates all required files');
      
      // Verify output contains placeholder if LLM disabled
      const outputPath = path.join(runDir, 'output_v1.txt');
      const output = fs.readFileSync(outputPath, 'utf-8');
      
      if (!config.LLM_ENABLED && output.includes('[GENERATION SKIPPED')) {
        console.log('  ✅ Output contains placeholder marker');
      } else if (config.LLM_ENABLED) {
        console.log('  ✅ Output generated (LLM enabled)');
      } else {
        console.log('  ⚠️  Output missing placeholder marker');
      }
      
      // Cleanup
      fs.rmSync(runDir, { recursive: true, force: true });
      return true;
    }
    
    // Cleanup on failure
    fs.rmSync(runDir, { recursive: true, force: true });
    return false;
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return false;
  }
}

/**
 * Test that evaluator handles skipped LLM checks
 */
async function testEvaluatorSkippedChecks() {
  console.log('🧪 Test 2: Evaluator handles skipped LLM checks');
  
  // Create a test run directory with output
  const testRunDir = path.join(HARNESS_ROOT, 'runs', `test_eval_${Date.now()}`);
  fs.mkdirSync(testRunDir, { recursive: true });
  
  try {
    // Copy a spec file
    const specPath = path.join(HARNESS_ROOT, 'specs', 'brev_smallbarn.json');
    if (!fs.existsSync(specPath)) {
      console.log('  ⚠️  Skipping (spec file not found)');
      return true;
    }
    
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
    fs.writeFileSync(path.join(testRunDir, 'post_spec.json'), JSON.stringify(spec, null, 2));
    
    // Create a dummy output
    const dummyOutput = `Du som sitter där med datorn i knät.
Jag har varit du.
Jag minns känslan när telefonen ringde.
Det är ingen bra känsla.
Men vet du vad?
Ditt barn kommer inte minnas vilka möten du missade.
De kommer minnas att du var där.

/${spec.constraints.signature?.name || 'Test'}
${spec.constraints.signature?.tagline || ''}`;
    
    fs.writeFileSync(path.join(testRunDir, 'output_v1.txt'), dummyOutput);
    
    // Run evaluation
    const results = await evaluate(testRunDir, {
      complianceTarget: 95,
      qualityTarget: 85
    });
    
    // Check that LLM checks are marked as skipped if LLM disabled
    const llmChecks = results.per_check.filter(c => c.type === 'llm_judge');
    
    if (!config.LLM_ENABLED) {
      const skippedChecks = llmChecks.filter(c => c.skipped);
      if (skippedChecks.length === llmChecks.length) {
        console.log('  ✅ All LLM checks marked as skipped');
      } else {
        console.log(`  ❌ Expected ${llmChecks.length} skipped checks, got ${skippedChecks.length}`);
        return false;
      }
      
      // Check that quality_score is null and quality_status is SKIPPED
      if (results.scores.quality_score === null && results.scores.quality_status === 'SKIPPED') {
        console.log('  ✅ Quality score is null and quality_status is SKIPPED');
      } else {
        console.log(`  ❌ Expected quality_score=null and quality_status='SKIPPED', got quality_score=${results.scores.quality_score}, quality_status=${results.scores.quality_status}`);
        return false;
      }
      
      // Check that total_score_formula indicates quality was skipped
      if (results.scores.total_score_formula && results.scores.total_score_formula.includes('quality skipped')) {
        console.log('  ✅ total_score_formula indicates quality was skipped');
      } else {
        console.log(`  ❌ Expected total_score_formula to mention 'quality skipped', got: ${results.scores.total_score_formula}`);
        return false;
      }
      
      // Check that run_status is PARTIAL_OFFLINE_SUCCESS or OFFLINE_INCOMPLETE
      if (results.targets.run_status === 'PARTIAL_OFFLINE_SUCCESS' || results.targets.run_status === 'OFFLINE_INCOMPLETE') {
        console.log(`  ✅ Run status correctly set to: ${results.targets.run_status}`);
      } else {
        console.log(`  ❌ Expected run_status to be PARTIAL_OFFLINE_SUCCESS or OFFLINE_INCOMPLETE, got: ${results.targets.run_status}`);
        return false;
      }
      
      // Check that quality_met is null (cannot evaluate offline)
      if (results.targets.quality_met === null) {
        console.log('  ✅ quality_met is null (cannot evaluate offline)');
      } else {
        console.log(`  ❌ Expected quality_met to be null, got: ${results.targets.quality_met}`);
        return false;
      }
    } else {
      console.log('  ℹ️  LLM enabled - skipping skipped check verification');
    }
    
    // Verify summary.md was created
    const summaryPath = path.join(testRunDir, 'summary.md');
    if (fs.existsSync(summaryPath)) {
      const summary = fs.readFileSync(summaryPath, 'utf-8');
      if (!config.LLM_ENABLED && summary.includes('SKIPPED')) {
        console.log('  ✅ Summary.md contains SKIPPED marker');
      } else if (config.LLM_ENABLED) {
        console.log('  ✅ Summary.md created');
      }
    } else {
      console.log('  ❌ Summary.md not created');
      return false;
    }
    
    // Cleanup
    fs.rmSync(testRunDir, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    if (fs.existsSync(testRunDir)) {
      fs.rmSync(testRunDir, { recursive: true, force: true });
    }
    return false;
  }
}

/**
 * Test that iterator skips LLM-requiring patches
 */
async function testIteratorSkipsLLMPatches() {
  console.log('🧪 Test 3: Iterator skips LLM-requiring patches');
  
  // This test verifies that determinePatch skips LLM patches when LLM is disabled
  const { determinePatch, LLM_REQUIRED_PATCHES, DETERMINISTIC_PATCHES } = await import('./lib/iterator.js');
  
  // Test with failed checks that require LLM patches
  const failedChecks = ['B005', 'B008']; // These require reframing and de-klyscha (LLM patches)
  
  const patchType = determinePatch(failedChecks);
  
  if (!config.LLM_ENABLED) {
    // Should return null or a deterministic patch (format/lista)
    if (patchType === null) {
      console.log('  ✅ Iterator correctly returns null when all patches require LLM');
      return true;
    } else if (['format', 'lista'].includes(patchType)) {
      console.log(`  ✅ Iterator falls back to deterministic patch: ${patchType}`);
      return true;
    } else {
      console.log(`  ❌ Iterator returned LLM-requiring patch: ${patchType}`);
      return false;
    }
  } else {
    console.log('  ℹ️  LLM enabled - skipping LLM patch skip verification');
    return true;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - REGRESSION TESTS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`Network mode: ${config.NO_NETWORK ? 'OFFLINE' : 'ONLINE'}`);
  console.log(`LLM enabled: ${config.LLM_ENABLED ? 'YES' : 'NO'}`);
  if (!config.LLM_ENABLED) {
    console.log(`LLM skip reason: ${config.LLM_SKIP_REASON}`);
  }
  console.log('');
  
  const tests = [
    testGeneratorOffline,
    testEvaluatorSkippedChecks,
    testIteratorSkipsLLMPatches
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`  ❌ Test crashed: ${error.message}`);
      failed++;
    }
    console.log('');
  }
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════════════════');
  
  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

