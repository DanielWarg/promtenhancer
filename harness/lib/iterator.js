/**
 * Reflektera Text Harness v1.1
 * Iterator - Local patch iteration with budgets
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { wordDiff, normalizeForComparison } from './utils.js';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check to Patch mapping
export const CHECK_TO_PATCH = {
  // Warm Provocation
  'W001': 'hook',
  'W001a': 'hook',
  'W002': 'miljo',
  'W003': 'lista',
  'W004': 'rytm',
  'W005': 'metafor',
  'W006': 'signatur',
  'W007': 'de-moralisera',
  'W007b': 'de-moralisera',
  
  // Brev
  'B001': 'hook',
  'B001a': 'hook',
  'B002': 'mikrodetaljer',
  'B003': 'format',
  'B004': 'sarbar-auktoritet',
  'B005': 'reframing',
  'B006': 'signatur',
  'B007': 'langd',
  'B008': 'de-klyscha',
  
  // Global
  'G001': 'parafrasera'
};

// Patch priority order (UPDATED per spec)
export const PATCH_ORDER = [
  'hook',
  'lista',
  'parafrasera',
  'miljo',
  'format',
  'rytm',
  'metafor',
  'mikrodetaljer',
  'sarbar-auktoritet',
  'reframing',
  'de-klyscha',
  'de-moralisera',
  'signatur',
  'langd'
];

// Explicit patch classification (CRITICAL for offline mode)
export const LLM_REQUIRED_PATCHES = new Set([
  'hook',
  'metafor',
  'reframing',
  'de-klyscha',
  'de-moralisera',
  'parafrasera',
  'miljo',
  'mikrodetaljer',
  'sarbar-auktoritet',
  'signatur',
  'langd'
]);

export const DETERMINISTIC_PATCHES = new Set([
  'format',
  'lista',
  'rytm'
]);

// Verify all patches are classified
const ALL_PATCHES = new Set([...LLM_REQUIRED_PATCHES, ...DETERMINISTIC_PATCHES]);
const PATCH_ORDER_SET = new Set(PATCH_ORDER);
if (ALL_PATCHES.size !== PATCH_ORDER_SET.size || 
    [...ALL_PATCHES].some(p => !PATCH_ORDER_SET.has(p))) {
  throw new Error('Patch classification mismatch: all patches must be in PATCH_ORDER and classified');
}

// Patch budgets
export const PATCH_BUDGETS = {
  'hook': { maxLines: 4, location: 'top' },
  'lista': { maxLines: 5, location: 'full', transform: true },
  'parafrasera': { maxLines: 2, location: 'any', replace: true },
  'miljo': { maxLines: 2, location: 'middle', insert: true },
  'format': { maxLines: 0, location: 'full', modifyOnly: true, noWordChange: true },
  'rytm': { maxLines: 2, location: 'middle', insert: true },
  'metafor': { maxLines: 2, location: 'middle', insert: true },
  'mikrodetaljer': { maxLines: 3, location: 'middle', insert: true },
  'sarbar-auktoritet': { maxLines: 2, location: 'middle', insert: true },
  'reframing': { maxLines: 4, location: 'middle' },
  'de-klyscha': { maxLines: 4, location: 'any', replace: true },
  'de-moralisera': { maxLines: 3, location: 'any', replace: true },
  'signatur': { maxLines: 3, location: 'bottom' },
  'langd': { maxLines: 0, location: 'full', trimOrExpand: true }
};

/**
 * Determine which patch to apply based on failed checks
 * Skips LLM-requiring patches if LLM is disabled
 */
export function determinePatch(failedChecks) {
  // Get patch types needed for failed checks
  const patchesNeeded = failedChecks
    .map(checkId => CHECK_TO_PATCH[checkId])
    .filter(Boolean);
  
  // Return first patch according to priority order
  for (const patch of PATCH_ORDER) {
    if (patchesNeeded.includes(patch)) {
      // Skip LLM-requiring patches if LLM is disabled (use explicit classification)
      if (!config.LLM_ENABLED && LLM_REQUIRED_PATCHES.has(patch)) {
        console.log(`  ⏭️  Skipping ${patch} patch (requires LLM, but LLM is disabled)`);
        continue;
      }
      return patch;
    }
  }
  
  return null;
}

/**
 * Normalize whitespace for comparison (all whitespace -> single space, trim)
 */
function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Verify whitespace-only invariant: original and patched must be identical when whitespace is normalized
 */
function verifyWhitespaceOnlyInvariant(original, patched) {
  const originalNormalized = normalizeWhitespace(original);
  const patchedNormalized = normalizeWhitespace(patched);
  
  if (originalNormalized !== patchedNormalized) {
    // Find first difference for debugging
    let firstDiff = 0;
    const minLen = Math.min(originalNormalized.length, patchedNormalized.length);
    for (let i = 0; i < minLen; i++) {
      if (originalNormalized[i] !== patchedNormalized[i]) {
        firstDiff = i;
        break;
      }
    }
    return {
      valid: false,
      message: `Whitespace-only invariant broken: difference at position ${firstDiff}, original length ${originalNormalized.length}, patched length ${patchedNormalized.length}`,
      firstDiff,
      originalSample: originalNormalized.substring(Math.max(0, firstDiff - 20), firstDiff + 20),
      patchedSample: patchedNormalized.substring(Math.max(0, firstDiff - 20), firstDiff + 20)
    };
  }
  
  return { valid: true };
}

/**
 * Fix punctuation spacing: ensure space after .?! before letter
 * This is a whitespace-only change (injecting space)
 */
function fixPunctuationSpacing(text) {
  // Match: punctuation (.?!) optionally followed by quote/paren/brace, then letter
  // Replace with: punctuation + quote/paren/brace + space + letter
  return text.replace(/([.?!])(["')\]]?)([A-Za-zÅÄÖåäö])/g, '$1$2 $3');
}

/**
 * Count sentences in a paragraph (split on .?!)
 */
function countSentencesInParagraph(para) {
  return para.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

/**
 * FORMAT PATCH - Deterministic 4-5 paragraphs, whitespace-only changes
 * For B003: 4-5 paragraphs with empty lines between, max 2 lonely sentences
 * 
 * Rules:
 * - ONLY changes whitespace (line breaks, spaces) - NEVER content
 * - Creates exactly 4-5 paragraphs (prefer 5 when possible)
 * - Each paragraph: 2-3 sentences (prefer 2-3, allow 1-3 if needed)
 * - Max 2 lonely sentences (single-sentence paragraphs)
 * - Preserves all non-whitespace characters exactly
 */
function applyFormatPatch(output) {
  // Remove signature for processing
  const signatureMatch = output.match(/(\/[A-Z][^\n]*\n?[^\n]*)$/);
  const signature = signatureMatch ? signatureMatch[0] : '';
  const textWithoutSignature = signatureMatch ? output.slice(0, signatureMatch.index).trim() : output.trim();
  
  // Step 1: Fix punctuation spacing FIRST (whitespace-only: inject space after .?! before letter)
  // This is a whitespace-only change (injecting space), so we apply it to original for comparison
  const originalText = fixPunctuationSpacing(textWithoutSignature);
  let text = originalText;
  
  // Step 2: Extract existing paragraphs (split on double newlines or multiple newlines)
  const existingParagraphs = text.split(/\n\s*\n+/).map(p => p.trim()).filter(p => p.length > 0);
  
  // Step 3: Split each paragraph into sentences (preserve punctuation)
  // Match: sentence ending (.?!) optionally followed by quote/paren, then whitespace
  const allSentences = [];
  for (const para of existingParagraphs) {
    const sentences = para.split(/(?<=[.!?])(["')\]]?)(\s+)/).filter(s => s.trim().length > 0);
    // Clean up: remove empty strings and whitespace-only splits
    const cleanSentences = sentences
      .map(s => s.trim())
      .filter(s => s.length > 0 && !/^["')\]]+$/.test(s));
    allSentences.push(...cleanSentences);
  }
  
  if (allSentences.length === 0) {
    return {
      success: false,
      error: 'NO_SENTENCES',
      message: 'No sentences found to format',
      patchedOutput: null
    };
  }
  
  // Step 4: Build paragraphs targeting 4-5 (prefer 5)
  const targetParagraphs = 5; // Always prefer 5
  const paragraphs = [];
  let lonelyCount = 0;
  let i = 0;
  
  // Calculate sentences per paragraph (aim for 2-3)
  const avgSentencesPerPara = allSentences.length / targetParagraphs;
  const idealSize = Math.max(2, Math.min(3, Math.round(avgSentencesPerPara)));
  
  while (i < allSentences.length) {
    let paragraphSize;
    const remaining = allSentences.length - i;
    const remainingParas = targetParagraphs - paragraphs.length;
    
    if (remainingParas === 1) {
      // Last paragraph: take all remaining
      paragraphSize = remaining;
    } else if (lonelyCount < 2 && remaining > remainingParas) {
      // Can afford a lonely sentence (max 2 total)
      paragraphSize = 1;
      lonelyCount++;
    } else {
      // Prefer 2-3 sentences per paragraph
      paragraphSize = Math.min(3, Math.max(2, Math.ceil(remaining / remainingParas)));
    }
    
    const paragraphSentences = allSentences.slice(i, i + paragraphSize);
    paragraphs.push(paragraphSentences.join(' '));
    i += paragraphSize;
  }
  
  // Step 5: Ensure we have 4-5 paragraphs
  // If too many (>5): merge shortest adjacent pairs
  while (paragraphs.length > 5) {
    // Find shortest adjacent pair
    let shortestPairIndex = 0;
    let shortestPairLength = paragraphs[0].length + paragraphs[1].length;
    
    for (let j = 0; j < paragraphs.length - 1; j++) {
      const pairLength = paragraphs[j].length + paragraphs[j + 1].length;
      if (pairLength < shortestPairLength) {
        shortestPairLength = pairLength;
        shortestPairIndex = j;
      }
    }
    
    // Merge shortest pair
    paragraphs[shortestPairIndex] = paragraphs[shortestPairIndex] + ' ' + paragraphs[shortestPairIndex + 1];
    paragraphs.splice(shortestPairIndex + 1, 1);
  }
  
  // If too few (<4): split longest paragraphs
  while (paragraphs.length < 4) {
    // Find longest paragraph with 2+ sentences
    let longestIndex = -1;
    let longestLength = 0;
    
    for (let j = 0; j < paragraphs.length; j++) {
      const sentCount = countSentencesInParagraph(paragraphs[j]);
      if (sentCount >= 2 && paragraphs[j].length > longestLength) {
        longestLength = paragraphs[j].length;
        longestIndex = j;
      }
    }
    
    if (longestIndex === -1) break; // Can't split further
    
    // Split at sentence boundary
    const longPara = paragraphs[longestIndex];
    const sentences = longPara.split(/(?<=[.!?])(["')\]]?)(\s+)/).filter(s => s.trim().length > 0 && !/^["')\]]+$/.test(s.trim()));
    
    if (sentences.length >= 2) {
      const mid = Math.ceil(sentences.length / 2);
      paragraphs.splice(longestIndex, 1,
        sentences.slice(0, mid).join(' '),
        sentences.slice(mid).join(' ')
      );
    } else {
      break; // Can't split this one
    }
  }
  
  // Step 6: Join paragraphs with double newlines and clean up whitespace
  let patchedText = paragraphs.map(p => p.trim()).join('\n\n');
  
  // Remove trailing spaces from all lines
  patchedText = patchedText.split('\n').map(line => line.trimEnd()).join('\n');
  
  // Add signature back
  const patchedOutput = patchedText + (signature ? '\n\n' + signature : '');
  
  // Step 7: CRITICAL - Verify whitespace-only invariant
  const invariantCheck = verifyWhitespaceOnlyInvariant(originalText, patchedText);
  if (!invariantCheck.valid) {
    return {
      success: false,
      error: 'FORMAT_PATCH_CHANGED_CONTENT',
      message: invariantCheck.message,
      patchedOutput: null,
      debug: {
        firstDiff: invariantCheck.firstDiff,
        originalSample: invariantCheck.originalSample,
        patchedSample: invariantCheck.patchedSample
      }
    };
  }
  
  // Step 8: Verify paragraph count
  const finalParagraphs = patchedText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  if (finalParagraphs.length < 4 || finalParagraphs.length > 5) {
    return {
      success: false,
      error: 'PARAGRAPH_COUNT_INVALID',
      message: `Format patch resulted in ${finalParagraphs.length} paragraphs (need 4-5)`,
      patchedOutput: null
    };
  }
  
  // Count improvements
  const oldBreaks = (output.match(/\n\s*\n/g) || []).length;
  const newBreaks = (patchedOutput.match(/\n\s*\n/g) || []).length;
  const oldParagraphs = output.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  
  return {
    success: true,
    patchedOutput,
    patchDescription: {
      type: 'format',
      location: 'full',
      linesChanged: finalParagraphs.length,
      budgetUsed: `${oldParagraphs} → ${finalParagraphs.length} paragraphs, ${oldBreaks} → ${newBreaks} line breaks`,
      changes: [`Reformatted into ${finalParagraphs.length} paragraphs (${lonelyCount} lonely) with natural breaks`],
      wordDiff: 0
    }
  };
}

/**
 * LISTA PATCH - Convert list prefix from '-' to '–' (em-dash)
 * For W003: Listsekvens med tankstreck
 */
function applyListaPatch(output) {
  const lines = output.split('\n');
  const newLines = [];
  let changedLines = 0;
  const changes = [];
  
  for (const line of lines) {
    // Match lines that start with optional whitespace, then '-' followed by space
    const listMatch = line.match(/^(\s*)-\s+(.*)$/);
    
    if (listMatch) {
      // Replace '-' with '–' (em-dash)
      const newLine = `${listMatch[1]}– ${listMatch[2]}`;
      newLines.push(newLine);
      changedLines++;
      changes.push({
        before: line.substring(0, 50),
        after: newLine.substring(0, 50)
      });
    } else {
      newLines.push(line);
    }
  }
  
  if (changedLines === 0) {
    return {
      success: false,
      error: 'NO_LIST_ITEMS_FOUND',
      message: 'No list items with "-" prefix found to convert',
      patchedOutput: null
    };
  }
  
  return {
    success: true,
    patchedOutput: newLines.join('\n'),
    patchDescription: {
      type: 'lista',
      location: 'full',
      linesChanged: changedLines,
      budgetUsed: `${changedLines}/5 lines`,
      changes: changes.slice(0, 5)
    }
  };
}

/**
 * DE-MORALISERA PATCH - Remove finger-pointing, add mirror/inclusion
 * For W007: Inte moralpredikan
 * 
 * Strategy:
 * 1. Replace finger-pointing phrases with mirror/inclusion
 * 2. Add self-involving line within budget
 * 3. Ensure no "borde/måste" remains
 */
async function applyDeMoraliseraPatch(output, spec) {
  const budget = PATCH_BUDGETS['de-moralisera'];
  
  // Finger-pointing patterns to replace
  const replacements = [
    // "du borde/måste/ska" → mirror
    { pattern: /\bDu borde\b/g, replacement: 'Jag har också känt att jag borde' },
    { pattern: /\bdu borde\b/g, replacement: 'jag har också känt att jag borde' },
    { pattern: /\bDu måste\b/g, replacement: 'Vi kan' },
    { pattern: /\bdu måste\b/g, replacement: 'vi kan' },
    { pattern: /\bDu ska\b/g, replacement: 'Vi kan' },
    { pattern: /\bdu ska\b/g, replacement: 'vi kan' },
    // "man måste/borde" → inclusion
    { pattern: /\bman måste\b/gi, replacement: 'vi gör ofta' },
    { pattern: /\bman borde\b/gi, replacement: 'det är lätt att' },
    // "det är dags att" → softer
    { pattern: /\bdet är dags att\b/gi, replacement: 'jag känner igen mig i att' },
    // "ni behöver" → inclusion
    { pattern: /\bni behöver\b/gi, replacement: 'vi behöver ibland' },
    { pattern: /\bNi behöver\b/g, replacement: 'Vi behöver ibland' },
    // "sluta" → softer
    { pattern: /\bSluta (med att |att )?/gi, replacement: 'Det är okej att inte ' },
    // Softer imperatives
    { pattern: /\bTänk på att\b/g, replacement: 'Jag har lärt mig att' },
    { pattern: /\btänk på att\b/g, replacement: 'jag har lärt mig att' },
    { pattern: /\bTänk om du\b/g, replacement: 'Jag har provat att' },
    { pattern: /\btänk om du\b/g, replacement: 'jag har provat att' },
    { pattern: /\bVad sägs om att du\b/g, replacement: 'Jag har börjat' },
    { pattern: /\bvad sägs om att du\b/g, replacement: 'jag har börjat' },
    // "Vill du" questions → inclusive
    { pattern: /\bVill du\b/g, replacement: 'Kanske vill vi' },
    { pattern: /\bvill du\b/g, replacement: 'kanske vill vi' },
    // "Tänk på det som" → mirror
    { pattern: /\bTänk på det som\b/g, replacement: 'Jag brukar tänka på det som' },
    { pattern: /\btänk på det som\b/g, replacement: 'jag brukar tänka på det som' },
    // "Börja med" → mirror
    { pattern: /\bBörja med att\b/g, replacement: 'Jag har börjat med att' },
    { pattern: /\bbörja med att\b/g, replacement: 'jag har börjat med att' }
  ];
  
  const lines = output.split('\n');
  let patchedLines = [...lines];
  let changedCount = 0;
  const changes = [];
  
  // Apply replacements (but skip list items to preserve W003)
  for (let i = 0; i < lines.length && changedCount < budget.maxLines; i++) {
    let line = lines[i];
    
    // Skip list items (lines starting with – or -) to preserve lista structure
    if (/^\s*[–-]\s/.test(line)) {
      continue;
    }
    
    let newLine = line;
    
    for (const { pattern, replacement } of replacements) {
      newLine = newLine.replace(pattern, replacement);
    }
    
    if (newLine !== line) {
      changes.push({
        lineNum: i + 1,
        before: line.substring(0, 60),
        after: newLine.substring(0, 60)
      });
      patchedLines[i] = newLine;
      changedCount++;
    }
  }
  
  // Check if any imperatives remain
  const imperativePattern = /\b(du borde|du måste|man måste|man borde|det är dags att|ni behöver)\b/gi;
  const remainingImperatives = patchedLines.join('\n').match(imperativePattern);
  
  // If imperatives remain and we have budget, add self-involving line
  // But NOT if it would break a list sequence
  if (changedCount < budget.maxLines) {
    const selfInvolvingLine = 'Jag har också gjort exakt så.';
    
    // Find a good place to insert (NOT in the middle of a list)
    for (let i = 0; i < patchedLines.length; i++) {
      const line = patchedLines[i].toLowerCase();
      const prevLine = patchedLines[i - 1] || '';
      const nextLine = patchedLines[i + 1] || '';
      
      // Skip if we're in a list sequence (prev or next starts with –)
      if (/^\s*[–-]/.test(prevLine) || /^\s*[–-]/.test(nextLine) || /^\s*[–-]/.test(patchedLines[i])) {
        continue;
      }
      
      // Look for lines describing behavior that we can relate to
      if ((line.includes('undviker') || line.includes('istället') || line.includes('pratar') || 
           line.includes('skriver') || line.includes('säger')) && 
          !line.startsWith('/') && line.length > 20) {
        
        // Check if next line isn't already self-involving
        if (!nextLine.toLowerCase().includes('jag har') && !nextLine.toLowerCase().includes('jag också')) {
          patchedLines.splice(i + 1, 0, selfInvolvingLine);
          changes.push({
            lineNum: i + 2,
            before: '(inserted)',
            after: selfInvolvingLine
          });
          changedCount++;
          break;
        }
      }
    }
  }
  
  if (changedCount === 0) {
    // Fallback: Add self-involvement at start of middle section
    const middleIndex = Math.floor(patchedLines.length / 2);
    const selfLine = 'Jag känner igen mig i det här.';
    patchedLines.splice(middleIndex, 0, '', selfLine);
    changes.push({
      lineNum: middleIndex + 1,
      before: '(inserted)',
      after: selfLine
    });
    changedCount = 1;
  }
  
  return {
    success: true,
    patchedOutput: patchedLines.join('\n'),
    patchDescription: {
      type: 'de-moralisera',
      location: 'any',
      linesChanged: changedCount,
      budgetUsed: `${changedCount}/${budget.maxLines} lines`,
      changes: changes.slice(0, 3),
      remainingImperatives: remainingImperatives?.length || 0
    }
  };
}

/**
 * Check if a patch type requires LLM (uses explicit classification)
 */
function requiresLLM(patchType) {
  return LLM_REQUIRED_PATCHES.has(patchType);
}

/**
 * Apply a patch based on type
 */
export async function applyPatch(output, patchType, spec) {
  console.log(`  🔧 Applying patch: ${patchType}`);
  
  // Check if patch requires LLM but LLM is disabled
  if (requiresLLM(patchType) && !config.LLM_ENABLED) {
    return {
      success: false,
      error: 'LLM_REQUIRED',
      message: `Patch type '${patchType}' requires LLM, but LLM is disabled (${config.LLM_SKIP_REASON})`,
      skipped: true
    };
  }
  
  const budget = PATCH_BUDGETS[patchType];
  if (!budget) {
    return {
      success: false,
      error: 'UNKNOWN_PATCH_TYPE',
      message: `Unknown patch type: ${patchType}`
    };
  }
  
  switch (patchType) {
    case 'format':
      return applyFormatPatch(output);
    
    case 'lista':
      return applyListaPatch(output);
    
    case 'de-moralisera':
      return await applyDeMoraliseraPatch(output, spec);
    
    // Placeholder for other patch types
    default:
      return {
        success: false,
        error: 'PATCH_NOT_IMPLEMENTED',
        message: `Patch type '${patchType}' not yet implemented`
      };
  }
}

/**
 * Build diff.md content
 */
export function buildDiffMd(iterations, runId) {
  let md = `# Diff Report

**Run ID:** ${runId}

## Version Comparison

| Version | Compliance | Quality | Total | Patch Applied |
|---------|------------|---------|-------|---------------|
`;

  for (const iter of iterations) {
    const patchInfo = iter.patch ? iter.patch.type : '-';
    md += `| ${iter.version} | ${iter.compliance} | ${iter.quality} | ${iter.total} | ${patchInfo} |\n`;
  }

  md += `\n## Patch Details\n`;

  for (let i = 1; i < iterations.length; i++) {
    const prev = iterations[i - 1];
    const curr = iterations[i];
    
    if (curr.patch && curr.patch.description) {
      const desc = curr.patch.description;
      md += `
### ${prev.version} → ${curr.version}: ${desc.type}

- **Location:** ${desc.location}
- **Lines Changed:** ${desc.linesChanged}
- **Budget Used:** ${desc.budgetUsed}
`;

      if (desc.wordDiff !== undefined) {
        md += `- **Word Diff:** ${desc.wordDiff} (${desc.wordDiff === 0 ? 'VALID' : 'INVALID'})\n`;
      }

      if (desc.changes && desc.changes.length > 0) {
        md += `\n**Changes:**\n`;
        for (const change of desc.changes) {
          if (change.before && change.after) {
            md += `\`\`\`diff
- ${change.before}
+ ${change.after}
\`\`\`
`;
          } else if (typeof change === 'string') {
            md += `- ${change}\n`;
          }
        }
      }
    }
  }

  return md;
}

/**
 * Update summary.md with iteration history
 */
export function updateSummaryWithIterations(existingSummary, iterations) {
  let iterationSection = `\n## Iteration History\n`;
  
  for (const iter of iterations) {
    iterationSection += `
### ${iter.version}
- Compliance: ${iter.compliance}
- Quality: ${iter.quality}
- Total: ${iter.total}
`;
    
    if (iter.failedChecks && iter.failedChecks.length > 0) {
      iterationSection += `- Failed: ${iter.failedChecks.join(', ')}\n`;
    }
    
    if (iter.patch) {
      iterationSection += `- **Patch Applied:** ${iter.patch.type}\n`;
      if (iter.patch.description) {
        iterationSection += `  - Location: ${iter.patch.description.location}\n`;
        iterationSection += `  - Lines changed: ${iter.patch.description.linesChanged}\n`;
      }
    }
  }
  
  // Append or replace iteration section
  if (existingSummary.includes('## Iteration History')) {
    return existingSummary.replace(/## Iteration History[\s\S]*$/, iterationSection);
  }
  return existingSummary + iterationSection;
}

/**
 * Main iterate function
 */
export async function iterate(runDir, options = {}) {
  const {
    complianceTarget = 95,
    qualityTarget = 85,
    maxIterations = 3
  } = options;
  
  const { evaluate } = await import('./evaluator.js');
  const { generate } = await import('./generator.js');
  
  console.log(`🔄 Starting iteration (max ${maxIterations}, targets: compliance>=${complianceTarget}, quality>=${qualityTarget})`);
  
  // Load spec
  const specPath = path.join(runDir, 'post_spec.json');
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  
  // Track iterations
  const iterations = [];
  let currentVersion = 1;
  
  // Evaluate initial version
  console.log(`\n📊 Evaluating v${currentVersion}...`);
  let results = await evaluate(runDir, { 
    complianceTarget, 
    qualityTarget, 
    version: currentVersion 
  });
  
  iterations.push({
    version: `v${currentVersion}`,
    compliance: results.scores.compliance_score,
    quality: results.scores.quality_score,  // null when skipped
    quality_status: results.scores.quality_status,  // "SKIPPED" or null
    total: results.scores.total_score,
    failedChecks: results.per_check.filter(c => !c.pass && !c.skipped).map(c => c.id),
    patch: null
  });
  
  // Check if targets met
  while (currentVersion < maxIterations + 1) {
    const complianceMet = results.scores.compliance_score >= complianceTarget;
    const qualitySkipped = results.scores.quality_status === 'SKIPPED' || results.scores.quality_score === null;
    const qualityMet = qualitySkipped ? null : (results.scores.quality_score >= qualityTarget);
    
    // If quality is skipped, only check compliance (partial success)
    if (qualitySkipped && complianceMet) {
      console.log(`\n⚠️  Compliance target met at v${currentVersion} (quality skipped - LLM disabled)`);
      console.log(`⚠️  Quality target cannot be evaluated offline`);
      break;
    }
    
    if (complianceMet && qualityMet === true) {
      console.log(`\n✅ Targets met at v${currentVersion}!`);
      break;
    }
    
    // Get failed checks
    const failedChecks = results.per_check
      .filter(c => !c.pass)
      .map(c => c.id);
    
    if (failedChecks.length === 0) {
      console.log(`\n⚠️ No failed checks but targets not met - stopping`);
      break;
    }
    
    // Determine patch
    const patchType = determinePatch(failedChecks);
    
    if (!patchType) {
      console.log(`\n⚠️ No applicable patch for failed checks: ${failedChecks.join(', ')}`);
      break;
    }
    
    console.log(`\n🔧 v${currentVersion} → v${currentVersion + 1}: Applying ${patchType} patch`);
    
    // Load current output
    const outputPath = path.join(runDir, `output_v${currentVersion}.txt`);
    const currentOutput = fs.readFileSync(outputPath, 'utf-8');
    
    // Apply patch
    const patchResult = await applyPatch(currentOutput, patchType, spec);
    
    if (!patchResult.success) {
      // If patch was skipped due to LLM being disabled, continue to next patch
      if (patchResult.skipped) {
        console.log(`  ⏭️  Patch skipped: ${patchResult.message}`);
        console.log(`  🔄 Continuing to next patch in priority order...`);
        
        // Remove this patch type from consideration and try next
        const remainingFailedChecks = failedChecks.filter(
          checkId => CHECK_TO_PATCH[checkId] !== patchType
        );
        
        if (remainingFailedChecks.length === 0) {
          console.log(`  ⚠️  No more patches available (all require LLM)`);
          break;
        }
        
        // Try next patch
        const nextPatchType = determinePatch(remainingFailedChecks);
        if (!nextPatchType) {
          console.log(`  ⚠️  No more applicable patches`);
          break;
        }
        
        // Recursively try next patch (simplified: just log and continue)
        console.log(`  🔄 Trying next patch: ${nextPatchType}`);
        // For now, just break - in a real scenario you'd retry with nextPatchType
        break;
      } else {
        console.log(`  ❌ Patch failed: ${patchResult.message}`);
        
        // Record failed patch attempt
        iterations.push({
          version: `v${currentVersion + 1}`,
          compliance: results.scores.compliance_score,
          quality: results.scores.quality_score,
          total: results.scores.total_score,
          failedChecks,
          patch: {
            type: patchType,
            success: false,
            error: patchResult.error,
            message: patchResult.message
          }
        });
        break;
      }
    }
    
    // Save new version
    currentVersion++;
    const newOutputPath = path.join(runDir, `output_v${currentVersion}.txt`);
    fs.writeFileSync(newOutputPath, patchResult.patchedOutput);
    console.log(`  💾 Saved: output_v${currentVersion}.txt`);
    
    // Save internal prompt (copy from v1 with patch note)
    const promptPath = path.join(runDir, `internal_prompt_v${currentVersion}.txt`);
    const originalPrompt = fs.readFileSync(path.join(runDir, 'internal_prompt_v1.txt'), 'utf-8');
    fs.writeFileSync(promptPath, `${originalPrompt}\n\n# PATCH APPLIED: ${patchType}\n# ${patchResult.patchDescription?.changes?.join(', ') || ''}`);
    
    // Re-evaluate
    console.log(`\n📊 Evaluating v${currentVersion}...`);
    results = await evaluate(runDir, { 
      complianceTarget, 
      qualityTarget, 
      version: currentVersion 
    });
    
    iterations.push({
      version: `v${currentVersion}`,
      compliance: results.scores.compliance_score,
      quality: results.scores.quality_score,  // null when skipped
      quality_status: results.scores.quality_status,  // "SKIPPED" or null
      total: results.scores.total_score,
      failedChecks: results.per_check.filter(c => !c.pass && !c.skipped).map(c => c.id),
      patch: {
        type: patchType,
        success: true,
        description: patchResult.patchDescription
      }
    });
  }
  
  // Build and save diff.md
  const runId = path.basename(runDir);
  const diffMd = buildDiffMd(iterations, runId);
  const diffPath = path.join(runDir, 'diff.md');
  fs.writeFileSync(diffPath, diffMd);
  console.log(`💾 Saved: diff.md`);
  
  // Update summary.md with iteration history
  const summaryPath = path.join(runDir, 'summary.md');
  if (fs.existsSync(summaryPath)) {
    const existingSummary = fs.readFileSync(summaryPath, 'utf-8');
    const updatedSummary = updateSummaryWithIterations(existingSummary, iterations);
    fs.writeFileSync(summaryPath, updatedSummary);
    console.log(`💾 Updated: summary.md`);
  }
  
  // Final status
  const finalIter = iterations[iterations.length - 1];
  const complianceMet = finalIter.compliance >= complianceTarget;
  const qualitySkipped = finalIter.quality_status === 'SKIPPED' || finalIter.quality === null;
  const qualityMet = qualitySkipped ? null : finalIter.quality >= qualityTarget;
  
  console.log(`\n════════════════════════════════════════════`);
  if (qualitySkipped) {
    console.log(`📊 Final: compliance=${finalIter.compliance}, quality=SKIPPED, total=${finalIter.total}`);
    console.log(`🎯 Targets: compliance>=${complianceTarget} ${complianceMet ? '✅' : '❌'}, quality=SKIPPED (LLM disabled)`);
    console.log(`⚠️  Quality target cannot be evaluated offline`);
  } else {
    console.log(`📊 Final: compliance=${finalIter.compliance}, quality=${finalIter.quality}, total=${finalIter.total}`);
    console.log(`🎯 Targets: compliance>=${complianceTarget} ${complianceMet ? '✅' : '❌'}, quality>=${qualityTarget} ${qualityMet ? '✅' : '❌'}`);
  }
  console.log(`🔄 Iterations: ${iterations.length}`);
  console.log(`════════════════════════════════════════════`);
  
  // If quality is skipped, this is PARTIAL_OFFLINE_SUCCESS (not full success)
  const targetsMet = qualitySkipped ? false : (complianceMet && qualityMet === true);
  
  return {
    iterations,
    finalVersion: `v${currentVersion}`,
    targetsMet,
    scores: {
      compliance: finalIter.compliance,
      quality: finalIter.quality,
      total: finalIter.total
    }
  };
}

