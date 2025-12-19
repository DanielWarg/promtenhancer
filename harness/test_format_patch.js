#!/usr/bin/env node
/**
 * Test suite for format-patch: deterministic 4-5 paragraphs + whitespace-only invariant
 */

import { applyPatch } from './lib/iterator.js';

/**
 * Normalize whitespace for comparison
 */
function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Count paragraphs (split on double newlines)
 */
function countParagraphs(text) {
  return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
}

/**
 * Test 1: Format patch keeps content (whitespace-only invariant)
 */
async function testFormatPatchKeepsContent() {
  console.log('🧪 Test 1: Format patch keeps content (whitespace-only invariant)');
  
  const input = `Du som sitter där med ett febrigt barn i famnen. Jag minns känslan när telefonen ringde. Hur hjärtat sjönk.

Det är som om tiden stannar, men ändå tickar klockan obarmhärtigt vidare. Jag ser hur du försöker balansera.

Jag har varit där. När lungorna känns tunga av stress och hjärtat är fyllt av oro.

Det är allt jag vet just nu.

/Test-User`;

  const result = await applyPatch(input, 'format', { profile: 'brev' });
  
  if (!result.success) {
    console.log(`  ❌ FAIL: Patch failed: ${result.error} - ${result.message}`);
    if (result.debug) {
      console.log(`     Debug: ${JSON.stringify(result.debug, null, 2)}`);
    }
    return false;
  }
  
  const originalNormalized = normalizeWhitespace(input.replace(/\/Test-User.*$/, '').trim());
  const patchedNormalized = normalizeWhitespace(result.patchedOutput.replace(/\/Test-User.*$/, '').trim());
  
  if (originalNormalized !== patchedNormalized) {
    console.log(`  ❌ FAIL: Content changed (whitespace-only invariant broken)`);
    console.log(`     Original (normalized): ${originalNormalized.substring(0, 100)}...`);
    console.log(`     Patched (normalized): ${patchedNormalized.substring(0, 100)}...`);
    return false;
  }
  
  console.log(`  ✅ PASS: Content preserved (whitespace-only changes)`);
  return true;
}

/**
 * Test 2: Format patch forces 4-5 paragraphs
 */
async function testFormatPatchForces4to5Paragraphs() {
  console.log('\n🧪 Test 2: Format patch forces 4-5 paragraphs');
  
  // Test case: 6 paragraphs (should become 4-5)
  const input = `Du som sitter där.

Jag minns känslan.

Det är som om tiden stannar.

Jag ser hur du försöker balansera.

Jag har varit där.

Det är allt jag vet just nu.

/Test-User`;

  const result = await applyPatch(input, 'format', { profile: 'brev' });
  
  if (!result.success) {
    console.log(`  ❌ FAIL: Patch failed: ${result.error} - ${result.message}`);
    return false;
  }
  
  const paragraphCount = countParagraphs(result.patchedOutput.replace(/\/Test-User.*$/, '').trim());
  
  if (paragraphCount < 4 || paragraphCount > 5) {
    console.log(`  ❌ FAIL: Expected 4-5 paragraphs, got ${paragraphCount}`);
    return false;
  }
  
  console.log(`  ✅ PASS: Result has ${paragraphCount} paragraphs (4-5 range)`);
  return true;
}

/**
 * Fix punctuation spacing (same as in iterator.js)
 */
function fixPunctuationSpacing(text) {
  return text.replace(/([.?!])(["')\]]?)([A-Za-zÅÄÖåäö])/g, '$1$2 $3');
}

/**
 * Test 3: Punctuation spacing fix
 */
async function testPunctuationSpacingFix() {
  console.log('\n🧪 Test 3: Punctuation spacing fix');
  
  const input = `Du som sitter där med ett febrigt barn i famnen.Jag minns känslan när telefonen ringde.Hur hjärtat sjönk.

Det är som om tiden stannar!Du försöker balansera.

Jag har varit där?När lungorna känns tunga.

Det är allt jag vet just nu.

/Test-User`;

  const result = await applyPatch(input, 'format', { profile: 'brev' });
  
  if (!result.success) {
    console.log(`  ❌ FAIL: Patch failed: ${result.error} - ${result.message}`);
    return false;
  }
  
  // Check that spacing was fixed (no .Jag or similar)
  const hasUnfixedSpacing = result.patchedOutput.match(/[.!?]["')\]]?[A-Za-zÅÄÖåäö]/);
  
  if (hasUnfixedSpacing) {
    console.log(`  ❌ FAIL: Punctuation spacing not fixed (found: ${hasUnfixedSpacing[0]})`);
    return false;
  }
  
  // Verify invariant: original with punctuation fix should match patched
  // (punctuation spacing fix is a whitespace-only change - injecting space)
  const originalWithPunctuationFix = fixPunctuationSpacing(input.replace(/\/Test-User.*$/, '').trim());
  const originalNormalized = normalizeWhitespace(originalWithPunctuationFix);
  const patchedNormalized = normalizeWhitespace(result.patchedOutput.replace(/\/Test-User.*$/, '').trim());
  
  if (originalNormalized !== patchedNormalized) {
    console.log(`  ❌ FAIL: Whitespace-only invariant broken after punctuation fix`);
    console.log(`     Original (normalized, after punct fix): ${originalNormalized.substring(0, 100)}...`);
    console.log(`     Patched (normalized): ${patchedNormalized.substring(0, 100)}...`);
    return false;
  }
  
  console.log(`  ✅ PASS: Punctuation spacing fixed and invariant preserved`);
  return true;
}

/**
 * Test 4: Too few paragraphs (should split to reach 4-5)
 */
async function testFormatPatchSplitsWhenTooFew() {
  console.log('\n🧪 Test 4: Format patch splits when too few paragraphs');
  
  const input = `Du som sitter där med ett febrigt barn i famnen. Jag minns känslan när telefonen ringde. Hur hjärtat sjönk. Det är som om tiden stannar, men ändå tickar klockan obarmhärtigt vidare.

Jag ser hur du försöker balansera. Jag har varit där. När lungorna känns tunga av stress och hjärtat är fyllt av oro. Det är allt jag vet just nu.

/Test-User`;

  const result = await applyPatch(input, 'format', { profile: 'brev' });
  
  if (!result.success) {
    console.log(`  ❌ FAIL: Patch failed: ${result.error} - ${result.message}`);
    return false;
  }
  
  const paragraphCount = countParagraphs(result.patchedOutput.replace(/\/Test-User.*$/, '').trim());
  
  if (paragraphCount < 4 || paragraphCount > 5) {
    console.log(`  ❌ FAIL: Expected 4-5 paragraphs after split, got ${paragraphCount}`);
    return false;
  }
  
  // Verify invariant
  const originalNormalized = normalizeWhitespace(input.replace(/\/Test-User.*$/, '').trim());
  const patchedNormalized = normalizeWhitespace(result.patchedOutput.replace(/\/Test-User.*$/, '').trim());
  
  if (originalNormalized !== patchedNormalized) {
    console.log(`  ❌ FAIL: Whitespace-only invariant broken after split`);
    return false;
  }
  
  console.log(`  ✅ PASS: Split to ${paragraphCount} paragraphs, invariant preserved`);
  return true;
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  FORMAT PATCH TEST SUITE');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const results = [];
  
  results.push(await testFormatPatchKeepsContent());
  results.push(await testFormatPatchForces4to5Paragraphs());
  results.push(await testPunctuationSpacingFix());
  results.push(await testFormatPatchSplitsWhenTooFew());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`  RESULTS: ${passed}/${total} tests passed`);
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (passed === total) {
    console.log('✅ All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

// Run tests
runTests().catch(err => {
  console.error('❌ Test suite error:', err);
  process.exit(1);
});

