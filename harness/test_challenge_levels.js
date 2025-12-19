/**
 * Test script för Challenge Levels (1-5) - Production-grade
 * Verifierar:
 * - Uniqueness: overlap < 0.20 mellan nivåer
 * - Escalation: nivå 1 varsam, nivå 5 kaxig
 * - Compliance/Quality: W001/W005/W007/W007b
 * - Signatur: kommer från spec, inte hårdkodad
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root FIRST, before importing any modules that use config
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
  
  // Debug: verify API key was loaded
  if (process.env.OPENAI_API_KEY) {
    console.log(`✅ API-nyckel laddad från .env (${process.env.OPENAI_API_KEY.substring(0, 10)}...)`);
  } else {
    console.log(`⚠️  OPENAI_API_KEY inte hittad i .env eller redan satt`);
  }
} else {
  console.log(`⚠️  .env finns inte på ${envPath}`);
}

// Import AFTER .env is loaded
import { generate } from './lib/generator.js';
import { evaluate } from './lib/evaluator.js';
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
      name: 'Test-User',
      tagline: 'Test tagline för att verifiera att signatur inte är hårdkodad'
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
 * Normalize text for comparison (remove punctuation, lowercase, split into words)
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-–—]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);
}

/**
 * Calculate sentence-level overlap between two texts
 * Returns overlap ratio (0-1)
 */
function calculateOverlap(text1, text2) {
  const sentences1 = text1.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
  const sentences2 = text2.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
  
  if (sentences1.length === 0 || sentences2.length === 0) {
    return 0;
  }
  
  let matches = 0;
  const total = Math.max(sentences1.length, sentences2.length);
  
  for (const s1 of sentences1) {
    const words1 = normalizeText(s1);
    if (words1.length < 5) continue; // Skip very short sentences
    
    for (const s2 of sentences2) {
      const words2 = normalizeText(s2);
      if (words2.length < 5) continue;
      
      // Calculate word overlap
      const set1 = new Set(words1);
      const set2 = new Set(words2);
      const intersection = new Set([...set1].filter(x => set2.has(x)));
      const union = new Set([...set1, ...set2]);
      
      const similarity = union.size > 0 ? intersection.size / union.size : 0;
      
      // If similarity > 0.7, consider it a match
      if (similarity > 0.7) {
        matches++;
        break; // Count each sentence only once
      }
    }
  }
  
  return matches / total;
}

/**
 * Extract hook from text (first 2-3 sentences)
 */
function extractHook(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const firstLines = lines.slice(0, 3).join(' ');
  const sentences = firstLines.split(/[.!?]\s+/).slice(0, 3);
  return sentences.join('. ').trim();
}

/**
 * Check if text contains "kaxig spegel" pattern (level 5)
 * Updated to detect identity-revealing patterns with self-involvement
 */
function hasKaxigPattern(text) {
  const patterns = [
    // New structure: Gemensamt självbedrägeri + Social spegel + Självinvolvering
    /vi kallar det .+?\. (alla runt omkring|alla runt dig) .+?\. jag kallade det .+?\./i,
    /du kallar det .+?\. (alla runt omkring|alla runt dig) .+?\. jag (kallade|använde) .+?\./i,
    /vi kallar det .+?\. (alla runt omkring|alla runt dig) ser .+?\. jag kallade det/i,
    /du kallar det .+?\. (alla runt omkring|alla runt dig) ser .+?\. jag (kallade|använde)/i,
    // Fallback patterns (old structure)
    /du kallar det .+?\. (dina|alla|ditt) .+? kallar det .+?\./i,
    /du säger att du är .+?\. (dina|ditt) .+? säger .+?\./i,
    /du kallar det .+?\. (alla runt dig|dina kollegor|ditt team) .+?\./i,
    /du kallar det .+?\. det är .+?\./i,
    /du är inte .+?\. du är .+? – men/i
  ];
  
  return patterns.some(pattern => pattern.test(text));
}

/**
 * Check if text has shorter sentences (level 5 characteristic)
 */
function hasShortSentences(text) {
  const sentences = text.split(/[.!?]\s+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return false;
  
  const avgLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
  return avgLength < 80; // Level 5 should have shorter sentences
}

/**
 * Verify signature comes from spec, not hardcoded
 */
function verifySignature(output, spec) {
  const expectedName = spec.constraints.signature.name;
  const expectedTagline = spec.constraints.signature.tagline;
  
  // Check for hardcoded signatures
  const hardcodedSignatures = [
    '/Ann-Christin',
    'Ann-Christin',
    'Ninja-psykolog'
  ];
  
  const hasHardcoded = hardcodedSignatures.some(sig => 
    output.includes(sig) && !output.includes(expectedName)
  );
  
  const hasExpected = output.includes(`/${expectedName}`) && 
                      (expectedTagline ? output.includes(expectedTagline) : true);
  
  return {
    valid: !hasHardcoded && hasExpected,
    hasHardcoded,
    hasExpected,
    expectedName,
    expectedTagline
  };
}

/**
 * Create a test run directory
 */
function createTestRunDir(level) {
  const now = new Date();
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  
  const runDir = path.join(RUNS_DIR, `challenge_test_${level}_${formatted}`);
  fs.mkdirSync(runDir, { recursive: true });
  
  return runDir;
}

/**
 * Test a single challenge level
 */
async function testChallengeLevel(level) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🧪 TESTAR CHALLENGE NIVÅ ${level}/5`);
  console.log('='.repeat(70));
  
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
    let output = fs.readFileSync(outputPath, 'utf-8');
    
    // Remove LLM disabled markers if present
    if (output.includes('[GENERATION SKIPPED')) {
      const parts = output.split('---\n\n');
      output = parts.length > 1 ? parts[parts.length - 1] : output;
    }
    output = output.replace(/\[DUMMY OUTPUT.*?\]/g, '').trim();
    
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
    
    // Extract hook
    const hook = extractHook(output);
    
    // Verify signature
    const signatureCheck = verifySignature(output, spec);
    
    // Check escalation characteristics
    const hasKaxig = hasKaxigPattern(output);
    const hasShort = hasShortSentences(output);
    
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
      signatureCheck,
      escalation: {
        hasKaxig,
        hasShort
      },
      allPassed: w007?.pass && w007b?.pass && w001?.pass && w005?.pass && signatureCheck.valid
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
  console.log('🚀 Startar Challenge Levels tester (Production-grade)');
  console.log(`📂 Base spec: ${BASE_SPEC.topic}`);
  console.log(`📝 User input: ${BASE_SPEC.user_input.substring(0, 100)}...`);
  console.log(`🔑 Signatur test: ${BASE_SPEC.constraints.signature.name} (${BASE_SPEC.constraints.signature.tagline})`);
  
  const results = [];
  
  // Test all levels
  for (let level = 1; level <= 5; level++) {
    const result = await testChallengeLevel(level);
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
      console.log(`   Signatur: ${result.signatureCheck.valid ? '✅' : '❌'} (${result.signatureCheck.hasHardcoded ? 'HARDCODED!' : 'OK'})`);
      if (level === 5) {
        console.log(`   Eskalering (nivå 5): Kaxig=${result.escalation.hasKaxig ? '✅' : '❌'}, Korta meningar=${result.escalation.hasShort ? '✅' : '❌'}`);
      }
      console.log(`   Alla checks: ${result.allPassed ? '✅' : '❌'}`);
    }
  }
  
  // Uniqueness check
  console.log(`\n${'='.repeat(70)}`);
  console.log('🔍 UNIKHETSKONTROLL (Overlap < 0.20)');
  console.log('='.repeat(70));
  
  const successful = results.filter(r => !r.error && r.output);
  const overlaps = [];
  let maxOverlap = 0;
  
  for (let i = 0; i < successful.length; i++) {
    for (let j = i + 1; j < successful.length; j++) {
      const overlap = calculateOverlap(successful[i].output, successful[j].output);
      overlaps.push({
        level1: successful[i].level,
        level2: successful[j].level,
        overlap: overlap
      });
      maxOverlap = Math.max(maxOverlap, overlap);
      
      if (overlap > 0.20) {
        console.log(`⚠️  HÖG OVERLAP: Nivå ${successful[i].level} ↔ Nivå ${successful[j].level}: ${(overlap * 100).toFixed(1)}%`);
      }
    }
  }
  
  if (maxOverlap <= 0.20) {
    console.log(`✅ Alla overlaps ≤ 20% (max: ${(maxOverlap * 100).toFixed(1)}%)`);
  } else {
    console.log(`❌ FAIL: Max overlap ${(maxOverlap * 100).toFixed(1)}% > 20%`);
  }
  
  // Escalation check
  console.log(`\n${'='.repeat(70)}`);
  console.log('📈 ESKALERINGSKONTROLL');
  console.log('='.repeat(70));
  
  const level1 = successful.find(r => r.level === 1);
  const level5 = successful.find(r => r.level === 5);
  
  if (level1 && level5) {
    const level1Hook = level1.hook.toLowerCase();
    const level5Hook = level5.hook.toLowerCase();
    
    // Level 1 should be soft
    const level1Soft = level1Hook.includes('lätt') || level1Hook.includes('många') || 
                       !level1Hook.includes('du är inte');
    // Level 5 should be kaxig
    const level5Kaxig = level5.escalation.hasKaxig;
    
    console.log(`Nivå 1 (varsam): ${level1Soft ? '✅' : '❌'} - "${level1.hook.substring(0, 80)}..."`);
    console.log(`Nivå 5 (kaxig): ${level5Kaxig ? '✅' : '❌'} - "${level5.hook.substring(0, 80)}..."`);
    
    if (!level1Soft) {
      console.log(`⚠️  Nivå 1 är inte tillräckligt varsam`);
    }
    if (!level5Kaxig) {
      console.log(`⚠️  Nivå 5 saknar kaxig spegel-pattern`);
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(70)}`);
  console.log('📊 SAMMANFATTNING');
  console.log('='.repeat(70));
  
  const failed = results.filter(r => r.error);
  
  console.log(`\n✅ Lyckade: ${successful.length}/5`);
  console.log(`❌ Misslyckade: ${failed.length}/5`);
  
  if (failed.length > 0) {
    console.log('\n❌ Misslyckade nivåer:');
    failed.forEach(r => {
      console.log(`   Nivå ${r.level}: ${r.error}`);
    });
  }
  
  // Compliance summary
  console.log('\n📊 COMPLIANCE/QUALITY SAMMANFATTNING:');
  successful.forEach(r => {
    const status = r.allPassed ? '✅' : '⚠️';
    const checks = [
      r.checks.w007?.pass ? 'W007' : '',
      r.checks.w007b?.pass ? 'W007b' : '',
      r.checks.w001?.pass ? 'W001' : '',
      r.checks.w005?.pass ? 'W005' : '',
      r.signatureCheck.valid ? 'SIG' : ''
    ].filter(Boolean).join(',');
    
    console.log(`   Nivå ${r.level}: ${status} Compliance: ${r.scores.compliance}, Quality: ${r.scores.quality || r.scores.qualityStatus} | Checks: ${checks || 'INGA'}`);
  });
  
  // Output locations
  console.log('\n📁 OUTPUT FILER:');
  successful.forEach(r => {
    console.log(`   Nivå ${r.level}: ${r.runDir}`);
  });
  
  // Final verdict
  console.log(`\n${'='.repeat(70)}`);
  const allPassed = successful.every(r => r.allPassed) && maxOverlap <= 0.20;
  if (allPassed) {
    console.log('✅ ALLA TESTER PASSERADE!');
  } else {
    console.log('❌ NÅGRA TESTER FAILADE');
    if (maxOverlap > 0.20) {
      console.log(`   - Overlap för hög: ${(maxOverlap * 100).toFixed(1)}%`);
    }
    const failedChecks = successful.filter(r => !r.allPassed);
    if (failedChecks.length > 0) {
      console.log(`   - ${failedChecks.length} nivåer failade checks`);
    }
  }
  console.log('='.repeat(70));
  
  console.log('\n✅ Testning klar!\n');
  
  return results;
}

// Run tests
runTests().catch(error => {
  console.error('❌ Testfel:', error);
  process.exit(1);
});

