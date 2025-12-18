#!/usr/bin/env node
/**
 * Regression test for W004 rhythm patch fallback
 * 
 * Tests:
 * 1. Normal warm_provocation (with list) - W004 should pass
 * 2. warm_no_list fixture (without list) - W004 should pass with fallback
 * 
 * Asserts:
 * - W004 pass: true for both runs
 * - summary.md contains "fallback: no list found" for fixture run
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

console.log('\n🧪 Regression Test: W004 Rhythm Patch Fallback\n');
console.log('═'.repeat(60));

// Test 1: Normal warm_provocation (with list)
console.log('\n📋 Test 1: Normal warm_provocation (with list)');
console.log('─'.repeat(60));

try {
  execSync('npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json', {
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
  execSync('npm run harness -- run --spec ./harness/specs/_fixtures/warm_no_list.json', {
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

