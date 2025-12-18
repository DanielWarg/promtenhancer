#!/usr/bin/env node
/**
 * W007 Stability Test
 * 
 * Tests judge consistency by running W007 5 times on each golden fixture
 * and asserting mean scores and variance within expected ranges.
 * 
 * Fixtures:
 * - w007_good.txt: Expected 85-100 (warm mirror, self-inclusion, humor)
 * - w007_borderline.txt: Expected 75-88 (mixed, slightly preachy but warm)
 * - w007_bad.txt: Expected 0-65 (moralizing, finger-pointing)
 * 
 * Assertions:
 * - good: mean >= 85
 * - borderline: 75 <= mean <= 88
 * - bad: mean <= 65
 * - All: range (max - min) <= 8
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { runLLMJudgeCheck } from './lib/checks/llm-judge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, 'specs', '_fixtures');

// Load acceptance checks to get W007 config
const checksPath = join(__dirname, 'acceptance_checks.json');
const checksConfig = JSON.parse(readFileSync(checksPath, 'utf-8'));
const warmProfile = checksConfig.profiles.warm_provocation;

if (!warmProfile) {
  console.error('❌ warm_provocation profile not found in acceptance_checks.json');
  process.exit(1);
}

const w007Check = warmProfile.quality.checks.find(c => c.id === 'W007');

if (!w007Check) {
  console.error('❌ W007 check not found in warm_provocation quality checks');
  process.exit(1);
}

const FIXTURES = [
  {
    name: 'w007_good',
    file: 'w007_good.txt',
    expectedMin: 85,
    expectedMax: 100,
    description: 'Warm mirror with self-inclusion and humor'
  },
  {
    name: 'w007_borderline',
    file: 'w007_borderline.txt',
    expectedMin: 75,
    expectedMax: 88,
    description: 'Mixed tone, slightly preachy but warm'
  },
  {
    name: 'w007_bad',
    file: 'w007_bad.txt',
    expectedMin: 0,
    expectedMax: 65,
    description: 'Moralizing, finger-pointing tone'
  }
];

const RUNS_PER_FIXTURE = 5;
const MAX_RANGE = 8;

let allPassed = true;
const results = [];

console.log('\n🧪 W007 Stability Test');
console.log('═'.repeat(70));
console.log(`Running ${RUNS_PER_FIXTURE} judge calls per fixture...\n`);

// Check API key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not set. This test requires an API key.');
  process.exit(1);
}

for (const fixture of FIXTURES) {
  console.log(`\n📋 Testing: ${fixture.name} (${fixture.description})`);
  console.log('─'.repeat(70));
  
  const fixturePath = join(FIXTURES_DIR, fixture.file);
  const text = readFileSync(fixturePath, 'utf-8').trim();
  
  const scores = [];
  const allResults = [];
  
  // Run judge 5 times
  for (let i = 0; i < RUNS_PER_FIXTURE; i++) {
    process.stdout.write(`  Run ${i + 1}/${RUNS_PER_FIXTURE}... `);
    
    try {
      const result = await runLLMJudgeCheck(text, w007Check, { stubMode: false });
      
      if (result.score === undefined || result.score === null) {
        console.log(`❌ No score returned`);
        allPassed = false;
        scores.push(0);
        allResults.push({ run: i + 1, error: 'No score returned', result });
      } else {
        scores.push(result.score);
        allResults.push({ run: i + 1, score: result.score, reasons: result.reasons });
        console.log(`Score: ${result.score}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      allPassed = false;
      scores.push(0);
      allResults.push({ run: i + 1, error: error.message });
    }
  }
  
  // Calculate statistics
  const validScores = scores.filter(s => s > 0);
  if (validScores.length === 0) {
    console.log(`\n  ❌ All runs failed - cannot calculate statistics`);
    allPassed = false;
    results.push({
      fixture: fixture.name,
      passed: false,
      error: 'All runs failed'
    });
    continue;
  }
  
  const mean = validScores.reduce((a, b) => a + b, 0) / validScores.length;
  const min = Math.min(...validScores);
  const max = Math.max(...validScores);
  const range = max - min;
  
  console.log(`\n  Statistics:`);
  console.log(`    Mean: ${mean.toFixed(1)}`);
  console.log(`    Min:  ${min}`);
  console.log(`    Max:  ${max}`);
  console.log(`    Range: ${range}`);
  
  // Assertions
  let fixturePassed = true;
  const errors = [];
  
  // Check mean within expected range
  if (fixture.name === 'w007_good') {
    if (mean < 85) {
      fixturePassed = false;
      errors.push(`Mean ${mean.toFixed(1)} < 85 (expected >= 85)`);
    }
  } else if (fixture.name === 'w007_borderline') {
    if (mean < 75 || mean > 88) {
      fixturePassed = false;
      errors.push(`Mean ${mean.toFixed(1)} not in range [75, 88]`);
    }
  } else if (fixture.name === 'w007_bad') {
    if (mean > 65) {
      fixturePassed = false;
      errors.push(`Mean ${mean.toFixed(1)} > 65 (expected <= 65)`);
    }
  }
  
  // Check range
  if (range > MAX_RANGE) {
    fixturePassed = false;
    errors.push(`Range ${range} > ${MAX_RANGE} (too much variance)`);
  }
  
  if (fixturePassed) {
    console.log(`  ✅ PASSED`);
  } else {
    console.log(`  ❌ FAILED`);
    errors.forEach(err => console.log(`    - ${err}`));
    allPassed = false;
  }
  
  results.push({
    fixture: fixture.name,
    passed: fixturePassed,
    mean,
    min,
    max,
    range,
    scores: validScores,
    errors
  });
}

// Summary
console.log('\n' + '═'.repeat(70));
if (allPassed) {
  console.log('✅ ALL W007 STABILITY TESTS PASSED');
  console.log('═'.repeat(70));
  
  // Print summary table
  console.log('\nSummary:');
  console.log('Fixture          | Mean  | Min | Max | Range | Status');
  console.log('─'.repeat(70));
  results.forEach(r => {
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${r.fixture.padEnd(16)} | ${r.mean.toFixed(1).padStart(5)} | ${String(r.min).padStart(3)} | ${String(r.max).padStart(3)} | ${String(r.range).padStart(5)} | ${status}`);
  });
  
  process.exit(0);
} else {
  console.log('❌ W007 STABILITY TESTS FAILED');
  console.log('═'.repeat(70));
  
  // Print detailed failure info
  console.log('\nFailures:');
  results.forEach(r => {
    if (!r.passed) {
      console.log(`\n${r.fixture}:`);
      console.log(`  Mean: ${r.mean.toFixed(1)} (expected: ${FIXTURES.find(f => f.name === r.fixture).expectedMin}-${FIXTURES.find(f => f.name === r.fixture).expectedMax})`);
      console.log(`  Range: ${r.range} (max allowed: ${MAX_RANGE})`);
      if (r.errors && r.errors.length > 0) {
        r.errors.forEach(err => console.log(`  - ${err}`));
      }
      console.log(`  Scores: [${r.scores.join(', ')}]`);
    }
  });
  
  process.exit(1);
}

