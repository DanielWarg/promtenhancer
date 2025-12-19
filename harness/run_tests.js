#!/usr/bin/env node
/**
 * Run multiple E2E tests and collect W007 scores
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUNS_DIR = path.join(__dirname, 'runs');

const NUM_RUNS = 5;
const results = [];

console.log(`\n🧪 Running ${NUM_RUNS} E2E tests for warm_provocation...\n`);

for (let i = 1; i <= NUM_RUNS; i++) {
  console.log(`\n═══ RUN ${i}/${NUM_RUNS} ═══`);
  
  try {
    // Run the harness
    execSync('npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    
    // Find latest run
    const latestPath = path.join(RUNS_DIR, 'latest');
    const latestRun = fs.readFileSync(latestPath, 'utf-8').trim();
    const runDir = path.join(RUNS_DIR, latestRun);
    
    // Read results
    const resultsPath = path.join(runDir, 'results_v1.json');
    const runResults = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
    
    // Find W007
    const w007 = runResults.per_check.find(c => c.id === 'W007');
    
    results.push({
      run: i,
      runId: latestRun,
      w007_score: w007?.score ?? 'N/A',
      w007_pass: w007?.pass ?? false,
      compliance: runResults.scores.compliance_score,
      quality: runResults.scores.quality_score
    });
    
    console.log(`\n📊 Run ${i}: W007 score = ${w007?.score ?? 'N/A'} (${w007?.pass ? 'PASS' : 'FAIL'})`);
    
  } catch (error) {
    console.error(`Run ${i} failed:`, error.message);
    results.push({
      run: i,
      runId: 'FAILED',
      w007_score: 0,
      w007_pass: false,
      compliance: 0,
      quality: 0
    });
  }
}

// Calculate statistics
const scores = results.map(r => r.w007_score).filter(s => typeof s === 'number');
const sorted = [...scores].sort((a, b) => a - b);
const median = sorted.length > 0 ? sorted[Math.floor(sorted.length / 2)] : 0;
const min = Math.min(...scores);
const max = Math.max(...scores);
const spread = max - min;

// Build summary table
let summaryTable = `
## W007 Score Analysis (${NUM_RUNS} runs)

| Run# | Run ID | W007 Score | Pass/Fail | Compliance | Quality |
|------|--------|------------|-----------|------------|---------|
`;

for (const r of results) {
  summaryTable += `| ${r.run} | ${r.runId} | ${r.w007_score} | ${r.w007_pass ? '✅ PASS' : '❌ FAIL'} | ${r.compliance} | ${r.quality} |\n`;
}

summaryTable += `
### Statistics
- **Median**: ${median}
- **Min**: ${min}
- **Max**: ${max}
- **Spread (max-min)**: ${spread}
- **Target**: median >= 72, spread <= 8

### Result: ${median >= 72 && spread <= 8 ? '✅ TARGETS MET' : '❌ TARGETS NOT MET'}
`;

console.log('\n' + '═'.repeat(60));
console.log(summaryTable);
console.log('═'.repeat(60));

// Save to file
const summaryPath = path.join(RUNS_DIR, 'w007_analysis.md');
fs.writeFileSync(summaryPath, summaryTable);
console.log(`\n💾 Saved analysis to: ${summaryPath}`);

