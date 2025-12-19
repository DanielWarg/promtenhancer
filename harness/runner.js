#!/usr/bin/env node
/**
 * Reflektera Text Harness v1.1
 * CLI Runner
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config, printConfigBanner } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root if exists
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim();
      if (value && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

const HARNESS_ROOT = __dirname;
const RUNS_DIR = path.join(HARNESS_ROOT, 'runs');

// Default targets
const DEFAULT_TARGETS = {
  compliance: 95,
  quality: 85
};

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const parsed = {
    command: args[0],
    options: {}
  };
  
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      parsed.options[key] = value;
      if (value !== true) i++;
    }
  }
  
  // Handle --no-network flag
  if (parsed.options['no-network'] === true) {
    process.env.NO_NETWORK = '1';
  }
  
  return parsed;
}

/**
 * Create a new run directory with timestamp
 */
function createRunDir() {
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/[T:]/g, '_')
    .replace(/\..+/, '')
    .replace(/-/g, '-');
  
  // Format: YYYY-MM-DD_HHMMSS
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  
  const runDir = path.join(RUNS_DIR, formatted);
  fs.mkdirSync(runDir, { recursive: true });
  
  // Update 'latest' symlink/file
  const latestPath = path.join(RUNS_DIR, 'latest');
  try {
    if (fs.existsSync(latestPath)) {
      fs.unlinkSync(latestPath);
    }
    // On Windows, use a text file with the path instead of symlink
    fs.writeFileSync(latestPath, formatted);
  } catch (e) {
    // Symlink might fail on Windows without admin
    fs.writeFileSync(latestPath, formatted);
  }
  
  return runDir;
}

/**
 * Resolve run path (handles 'latest' alias)
 */
function resolveRunPath(runPath) {
  if (runPath.endsWith('latest')) {
    const latestPath = path.join(RUNS_DIR, 'latest');
    if (fs.existsSync(latestPath)) {
      const latestRun = fs.readFileSync(latestPath, 'utf-8').trim();
      return path.join(RUNS_DIR, latestRun);
    }
    throw new Error('No latest run found');
  }
  return runPath;
}

/**
 * Command: generate
 */
async function cmdGenerate(options) {
  if (!options.spec) {
    console.error('❌ Fel: --spec krävs');
    console.log('Användning: npm run harness -- generate --spec ./harness/specs/brev_smallbarn.json');
    process.exit(1);
  }
  
  const specPath = path.resolve(options.spec);
  if (!fs.existsSync(specPath)) {
    console.error(`❌ Fel: Spec-filen finns inte: ${specPath}`);
    process.exit(1);
  }
  
  // Print config banner if LLM disabled
  printConfigBanner();
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - GENERATE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  const runDir = createRunDir();
  console.log(`📁 Run directory: ${runDir}`);
  console.log('');
  
  const { generate } = await import('./lib/generator.js');
  const result = await generate(specPath, runDir);
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✅ Generation complete!`);
  console.log(`📁 Run saved to: ${runDir}`);
  console.log('═══════════════════════════════════════════════════════════════');
  
  return result;
}

/**
 * Command: eval
 */
async function cmdEval(options) {
  const runPath = options.run 
    ? resolveRunPath(path.resolve(options.run))
    : resolveRunPath(path.join(RUNS_DIR, 'latest'));
  
  if (!fs.existsSync(runPath)) {
    console.error(`❌ Fel: Run-mappen finns inte: ${runPath}`);
    process.exit(1);
  }
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - EVAL');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📁 Evaluating: ${runPath}`);
  console.log('');
  
  const { evaluate } = await import('./lib/evaluator.js');
  const result = await evaluate(runPath, {
    complianceTarget: parseInt(options['target-compliance']) || DEFAULT_TARGETS.compliance,
    qualityTarget: parseInt(options['target-quality']) || DEFAULT_TARGETS.quality
  });
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`📊 Compliance: ${result.scores.compliance_score}/100 (target: ${result.targets.compliance_target})`);
  if (result.scores.quality_status === 'SKIPPED') {
    console.log(`📊 Quality: SKIPPED (LLM disabled)`);
    console.log(`📊 Total: ${result.scores.total_score}/100 (${result.scores.total_score_formula})`);
    console.log(`⚠️  Quality target cannot be evaluated offline`);
    console.log(`📋 Run Status: ${result.targets.run_status}`);
  } else {
    console.log(`📊 Quality: ${result.scores.quality_score}/100 (target: ${result.targets.quality_target})`);
    console.log(`📊 Total: ${result.scores.total_score}/100 (${result.scores.total_score_formula})`);
    console.log(`📋 Run Status: ${result.targets.run_status}`);
  }
  console.log('═══════════════════════════════════════════════════════════════');
  
  return result;
}

/**
 * Command: run (generate + eval + iterate)
 */
async function cmdRun(options) {
  // Print config banner if LLM disabled
  printConfigBanner();
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - FULL RUN');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  // Step 1: Generate
  const genResult = await cmdGenerate(options);
  
  // Step 2: Eval (initial)
  console.log('');
  const { evaluate } = await import('./lib/evaluator.js');
  const complianceTarget = parseInt(options['target-compliance']) || DEFAULT_TARGETS.compliance;
  const qualityTarget = parseInt(options['target-quality']) || DEFAULT_TARGETS.quality;
  
  const evalResult = await evaluate(genResult.runDir, {
    complianceTarget,
    qualityTarget
  });
  
  // Check if iteration needed
  const complianceMet = evalResult.scores.compliance_score >= complianceTarget;
  const qualitySkipped = evalResult.scores.quality_status === 'SKIPPED';
  const qualityMet = qualitySkipped ? null : evalResult.scores.quality_score >= qualityTarget;
  
  if (complianceMet && qualityMet === true) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`✅ Targets met on first try!`);
    console.log(`📊 Compliance: ${evalResult.scores.compliance_score}/100`);
    console.log(`📊 Quality: ${evalResult.scores.quality_score}/100`);
    console.log(`📁 Run saved to: ${genResult.runDir}`);
    console.log('═══════════════════════════════════════════════════════════════');
    return { genResult, evalResult, iterResult: null };
  }
  
  if (qualitySkipped && complianceMet) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`⚠️  Compliance target met, but quality cannot be evaluated offline`);
    console.log(`📊 Compliance: ${evalResult.scores.compliance_score}/100`);
    console.log(`📊 Quality: SKIPPED (LLM disabled)`);
    console.log(`📋 Run Status: ${evalResult.targets.run_status}`);
    console.log(`📁 Run saved to: ${genResult.runDir}`);
    console.log('═══════════════════════════════════════════════════════════════');
    return { genResult, evalResult, iterResult: null };
  }
  
  // Step 3: Iterate
  console.log('');
  console.log('🔄 Targets not met - starting iteration...');
  
  const { iterate } = await import('./lib/iterator.js');
  const iterResult = await iterate(genResult.runDir, {
    complianceTarget,
    qualityTarget,
    maxIterations: parseInt(options.max) || 3
  });
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`${iterResult.targetsMet ? '✅' : '⚠️'} Full run complete!`);
  console.log(`📊 Final: compliance=${iterResult.scores.compliance}, quality=${iterResult.scores.quality}`);
  console.log(`🔄 Iterations: ${iterResult.iterations.length}`);
  console.log(`📁 Run saved to: ${genResult.runDir}`);
  console.log('═══════════════════════════════════════════════════════════════');
  
  return { genResult, evalResult, iterResult };
}

/**
 * Command: compare
 */
async function cmdCompare(options) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - COMPARE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('⚠️  Compare command not yet implemented');
  // TODO: Implement compare
}

/**
 * Command: iterate
 */
async function cmdIterate(options) {
  const runPath = options.run 
    ? resolveRunPath(path.resolve(options.run))
    : resolveRunPath(path.join(RUNS_DIR, 'latest'));
  
  if (!fs.existsSync(runPath)) {
    console.error(`❌ Fel: Run-mappen finns inte: ${runPath}`);
    process.exit(1);
  }
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  REFLEKTERA TEXT HARNESS v1.1 - ITERATE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📁 Iterating: ${runPath}`);
  
  const { iterate } = await import('./lib/iterator.js');
  const result = await iterate(runPath, {
    complianceTarget: parseInt(options['target-compliance']) || DEFAULT_TARGETS.compliance,
    qualityTarget: parseInt(options['target-quality']) || DEFAULT_TARGETS.quality,
    maxIterations: parseInt(options.max) || 3
  });
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`${result.targetsMet ? '✅' : '⚠️'} Iteration complete!`);
  console.log(`📊 Final: compliance=${result.scores.compliance}, quality=${result.scores.quality}`);
  console.log(`🔄 Iterations: ${result.iterations.length}`);
  console.log('═══════════════════════════════════════════════════════════════');
  
  return result;
}

/**
 * Print usage
 */
function printUsage() {
  console.log(`
Reflektera Text Harness v1.1

Användning:
  npm run harness -- <command> [options]

Kommandon:
  generate    Generera output från en spec
  eval        Utvärdera en körning
  run         Kör generate + eval + iterate
  iterate     Iterera tills mål nås
  compare     Jämför versioner i en körning

Alternativ:
  --spec <path>           Sökväg till spec-fil (för generate/run)
  --run <path>            Sökväg till run-mapp (för eval/compare)
  --target-compliance N   Compliance-mål (default: 95)
  --target-quality N      Quality-mål (default: 85)
  --max N                 Max antal iterationer (default: 3)
  --no-network            Kör utan nätverk/LLM (offline-läge)

Exempel:
  npm run harness -- generate --spec ./harness/specs/brev_smallbarn.json
  npm run harness -- eval --run ./harness/runs/latest
  npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json
`);
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }
  
  const { command, options } = parseArgs(args);
  
  try {
    switch (command) {
      case 'generate':
        await cmdGenerate(options);
        break;
      case 'eval':
        await cmdEval(options);
        break;
      case 'run':
        await cmdRun(options);
        break;
      case 'iterate':
        await cmdIterate(options);
        break;
      case 'compare':
        await cmdCompare(options);
        break;
      default:
        console.error(`❌ Okänt kommando: ${command}`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Fel:', error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

