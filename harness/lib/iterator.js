/**
 * Reflektera Text Harness v1.1
 * Iterator - Local patch iteration with budgets
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { wordDiff, normalizeForComparison } from './utils.js';
import { MODELS } from './config.js';

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
  'W007b': 'de-moralisera',  // Guard - samma patch som W007
  
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

// Patch budgets
export const PATCH_BUDGETS = {
  'hook': { maxLines: 4, location: 'top' },
  'lista': { maxLines: 5, location: 'full', transform: true },
  'parafrasera': { maxLines: 2, location: 'any', replace: true },
  'miljo': { maxLines: 2, location: 'middle', insert: true },
  'format': { maxLines: 0, location: 'full', modifyOnly: true, noWordChange: true },
  'rytm': { maxLines: 3, location: 'middle', insert: true },
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
 * Determine which patch to apply based on failed checks and W007 score
 */
export function determinePatch(failedChecks, checkResults = {}) {
  // Check W007 score for gray zone (65-85) - patch required even if not failed
  const w007Result = checkResults['W007'];
  if (w007Result && typeof w007Result.score === 'number') {
    if (w007Result.score < 85) {
      // W007 gray zone: patch required
      return 'de-moralisera';
    }
  }
  
  // Get patch types needed for failed checks
  const patchesNeeded = failedChecks
    .map(checkId => CHECK_TO_PATCH[checkId])
    .filter(Boolean);
  
  // Return first patch according to priority order
  for (const patch of PATCH_ORDER) {
    if (patchesNeeded.includes(patch)) {
      return patch;
    }
  }
  
  return null;
}

/**
 * FORMAT PATCH - Only add line breaks, no word changes
 * For B003: 8+ line breaks, 3+ lonely sentences
 */
function applyFormatPatch(output) {
  let lines = output.split('\n');
  let newLines = [];
  let changesMade = [];
  
  // Strategy 1: Split long paragraphs at sentence boundaries
  const expandedLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    
    // If this is a long paragraph (multiple sentences), split it
    if (trimmed.length > 100 && (trimmed.match(/[.!?]/g) || []).length > 1) {
      // Split at sentence boundaries, keeping punctuation
      const sentences = trimmed.split(/(?<=[.!?])\s+/);
      for (const sentence of sentences) {
        if (sentence.trim()) {
          expandedLines.push(sentence.trim());
          changesMade.push(`Split paragraph into sentences`);
        }
      }
    } else {
      expandedLines.push(line);
    }
  }
  
  // Strategy 2: Add empty lines around short sentences to make them "lonely"
  for (let i = 0; i < expandedLines.length; i++) {
    const line = expandedLines[i];
    const trimmed = line.trim();
    const prevLine = expandedLines[i - 1]?.trim() || '';
    const nextLine = expandedLines[i + 1]?.trim() || '';
    const lastNewLine = newLines[newLines.length - 1]?.trim() || '';
    
    // If this is a short-ish sentence (< 80 chars) that ends with punctuation
    if (trimmed.length > 0 && trimmed.length < 80 && 
        (trimmed.endsWith('.') || trimmed.endsWith('?') || trimmed.endsWith('!'))) {
      
      // Add empty line before if previous isn't empty
      if (i > 0 && lastNewLine !== '' && !lastNewLine.startsWith('/')) {
        newLines.push('');
        changesMade.push(`Added break before: "${trimmed.substring(0, 25)}..."`);
      }
      
      newLines.push(line);
      
      // Add empty line after
      if (i < expandedLines.length - 1 && nextLine !== '' && !nextLine.startsWith('/')) {
        newLines.push('');
        changesMade.push(`Added break after: "${trimmed.substring(0, 25)}..."`);
      }
    } else if (trimmed === '') {
      // Keep existing empty lines but don't double up
      if (lastNewLine !== '') {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  // Clean up: remove consecutive empty lines (keep max 1)
  const cleanedLines = [];
  for (const line of newLines) {
    const lastCleaned = cleanedLines[cleanedLines.length - 1];
    if (!(line.trim() === '' && lastCleaned?.trim() === '')) {
      cleanedLines.push(line);
    }
  }
  
  const patchedOutput = cleanedLines.join('\n');
  
  // CRITICAL: Verify no words were changed
  const diffResult = wordDiff(output, patchedOutput);
  if (!diffResult.identical) {
    return {
      success: false,
      error: 'FORMAT_PATCH_CHANGED_WORDS',
      message: `Format patch changed words: ${diffResult.message}`,
      patchedOutput: null
    };
  }
  
  // Count improvements
  const oldBreaks = (output.match(/\n\s*\n/g) || []).length;
  const newBreaks = (patchedOutput.match(/\n\s*\n/g) || []).length;
  
  return {
    success: true,
    patchedOutput,
    patchDescription: {
      type: 'format',
      location: 'full',
      linesChanged: changesMade.length,
      budgetUsed: `${oldBreaks} → ${newBreaks} line breaks`,
      changes: changesMade.slice(0, 5),
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
 * DE-MORALISERA PATCH v3 - Remove preachy formulations + add self-involvement + mirror question
 * For W007: Inte moralpredikan (gray zone: 65-85)
 * 
 * Strategy:
 * 1. Remove preachy formulations ("Tänk om vi...", "Det finns ett bättre sätt...", etc.)
 * 2. Add self-involvement line
 * 3. Replace ending with mirror question (not instruction)
 * Budget: Max 3 lines changed
 */
async function applyDeMoraliseraPatch(output, spec) {
  const MAX_LINES = 3;
  const lines = output.split('\n');
  const changes = [];
  
  // Preachy patterns to remove
  const preachyPatterns = [
    /^Tänk om vi/i,
    /^Det finns ett bättre sätt/i,
    /^Jag utmanar dig/i,
    /^Låt oss/i,
    /^Så nästa gång du känner.*stanna upp/i,
    /^Det är inte alltid lätt, men/i,
    /^Konflikter är en del av livet/i
  ];
  
  // Self-involvement templates
  const selfInvolvementTemplates = [
    'Jag känner igen mig.',
    'Jag har gjort det här själv.',
    'Jag har också stått där.',
    'Jag vet hur det känns.',
    'Jag har varit där.'
  ];
  
  // Mirror question templates (NOT instructions)
  const mirrorQuestionTemplates = [
    'Vad kostar det att inte säga det?',
    'Vad försöker du slippa genom att kalla det "onödigt drama"?',
    'Vad händer om du aldrig tar det där samtalet?',
    'Vad är det egentligen du skyddar dig från?',
    'Vad vinner du på att vänta?'
  ];
  
  let patchedLines = [...lines];
  let linesChanged = 0;
  
  // Step 1: Remove preachy formulations
  for (let i = 0; i < patchedLines.length && linesChanged < MAX_LINES; i++) {
    const line = patchedLines[i].trim();
    for (const pattern of preachyPatterns) {
      if (pattern.test(line)) {
        // Remove the line
        changes.push({
          type: 'remove_preachy',
          lineNum: i + 1,
          removed: line
        });
        patchedLines[i] = '';
        linesChanged++;
        break;
      }
    }
  }
  
  // Step 2: Find ending section (last 3-5 lines before signature)
  let endingStart = -1;
  for (let i = patchedLines.length - 1; i >= 0; i--) {
    if (patchedLines[i].trim().startsWith('/')) {
      // Found signature, ending is before this
      endingStart = Math.max(0, i - 5);
      break;
    }
  }
  
  if (endingStart === -1) {
    endingStart = Math.max(0, patchedLines.length - 5);
  }
  
  // Step 3: Replace ending with self-involvement + mirror question
  const topic = spec?.topic?.toLowerCase() || '';
  let selfInvolvement, mirrorQuestion;
  
  if (topic.includes('konflikt')) {
    selfInvolvement = selfInvolvementTemplates[1]; // "Jag har gjort det här själv."
    mirrorQuestion = mirrorQuestionTemplates[1]; // "Vad försöker du slippa..."
  } else {
    selfInvolvement = selfInvolvementTemplates[0]; // "Jag känner igen mig."
    mirrorQuestion = mirrorQuestionTemplates[0]; // "Vad kostar det..."
  }
  
  // Replace ending lines (keep max 3 lines)
  const endingLines = [
    selfInvolvement,
    '',
    mirrorQuestion
  ];
  
  // Find where to insert (after last non-empty line before signature)
  let insertIndex = endingStart;
  for (let i = endingStart; i < patchedLines.length; i++) {
    if (patchedLines[i].trim().startsWith('/')) {
      insertIndex = i;
      break;
    }
    if (patchedLines[i].trim() && !preachyPatterns.some(p => p.test(patchedLines[i]))) {
      insertIndex = i + 1;
    }
  }
  
  // Remove old ending lines and insert new
  const linesToRemove = Math.min(3, insertIndex - endingStart);
  patchedLines.splice(endingStart, linesToRemove, ...endingLines);
  
  changes.push({
    type: 'replace_ending',
    replaced: `ending section (${linesToRemove} lines)`,
    with: [selfInvolvement, mirrorQuestion]
  });
  linesChanged += linesToRemove;
  
  // Clean up: remove consecutive empty lines
  const cleanedLines = [];
  for (let i = 0; i < patchedLines.length; i++) {
    if (i === 0 || patchedLines[i].trim() !== '' || cleanedLines[cleanedLines.length - 1].trim() !== '') {
      cleanedLines.push(patchedLines[i]);
    }
  }
  
  return {
    success: true,
    patchedOutput: cleanedLines.join('\n'),
    patchDescription: {
      type: 'de-moralisera',
      location: 'ending + preachy removal',
      linesChanged: Math.min(linesChanged, MAX_LINES),
      budgetUsed: `${Math.min(linesChanged, MAX_LINES)}/${MAX_LINES} lines`,
      changes: changes.slice(0, 3)
    }
  };
}

/**
 * RYTM PATCH - Insert rhythmic pause sequence
 * For W004: Rytmisk paus ('Nej.' / 'Nej nej.' / 'Exakt.')
 * 
 * Strategy:
 * 1. If list exists: Insert after last list line (lines starting with "– ")
 * 2. Fallback: Insert in first_screen after hook-block (after first empty line or after line 2-3)
 * 3. Safety: Never in last_screen (last 6 lines) - move up to lines.length - 7 if needed
 */
function applyRytmPatch(output) {
  const lines = output.split('\n');
  const changes = [];
  let insertIndex = -1;
  let isFallback = false;
  let placementLog = '';
  
  // Build pause sequence (3 lines) - each as separate array element to ensure newlines
  const pauseSequence = [
    '',        // Empty line for spacing
    'Nej.',    // First pause
    'Nej nej.', // Second pause
    'Exakt.'   // Third pause
  ];
  
  // Strategy 1: Find last line of list sequence (lines starting with "– ")
  let lastListIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('–')) {
      lastListIndex = i;
    }
  }
  
  if (lastListIndex !== -1) {
    // List found - insert after last list line
    insertIndex = lastListIndex + 1;
    placementLog = `Inserted rhythm block after list line ${lastListIndex + 1} (list ended at line ${lastListIndex + 1}, inserted at ${insertIndex + 1})`;
  } else {
    // Fallback: No list found - find anchor point in first_screen after hook-block
    isFallback = true;
    
    // Try to find good anchor point in first_screen (first 6 lines or ~280 chars)
    const firstScreenEnd = Math.min(6, lines.length);
    let anchorFound = false;
    
    // Option 1: After first empty line in first_screen (if exists)
    for (let i = 1; i < firstScreenEnd; i++) {
      if (lines[i].trim() === '') {
        insertIndex = i + 1;
        anchorFound = true;
        break;
      }
    }
    
    // Option 2: After line 2-3 (if no empty line found)
    if (!anchorFound) {
      // Try after line 3 first, then line 2
      if (firstScreenEnd >= 4) {
        insertIndex = 3;
      } else if (firstScreenEnd >= 3) {
        insertIndex = 2;
      } else {
        // Very short text - insert after line 2 (or line 1 if only 1 line)
        insertIndex = Math.min(2, lines.length - 1);
      }
    }
    
    placementLog = `Inserted rhythm block after line ${insertIndex} (fallback: no list found)`;
  }
  
  // Safety check: Never insert in last_screen (last 6 lines)
  // If insertion point is too close to signature, move up to lines.length - 7
  const signatureStart = lines.length - 6;
  if (insertIndex >= signatureStart) {
    insertIndex = Math.max(0, lines.length - 7);
    placementLog += ` (moved up to avoid last_screen)`;
  }
  
  // Ensure insertIndex is valid
  if (insertIndex < 0 || insertIndex > lines.length) {
    insertIndex = Math.max(0, Math.min(2, lines.length - 1));
    placementLog = `Inserted rhythm block after line ${insertIndex} (fallback: safe default)`;
  }
  
  // Check if there's already an empty line at insert point
  const hasEmptyLine = insertIndex < lines.length && lines[insertIndex].trim() === '';
  
  // Build patched lines - each pause line is separate to ensure proper newlines
  const patchedLines = [
    ...lines.slice(0, insertIndex),
    ...(hasEmptyLine ? pauseSequence.slice(1) : pauseSequence), // Skip first empty if already exists
    ...lines.slice(insertIndex + (hasEmptyLine ? 1 : 0))
  ];
  
  // Join with explicit newlines to ensure resilience against whitespace formatting
  const patchedOutput = patchedLines.join('\n');
  
  changes.push({
    type: 'insert_rhythmic_pause',
    afterLine: insertIndex,
    inserted: pauseSequence.slice(1), // Exclude first empty line from description
    placement: placementLog,
    isFallback: isFallback
  });
  
  return {
    success: true,
    patchedOutput: patchedOutput,
    patchDescription: {
      type: 'rytm',
      location: isFallback 
        ? `after line ${insertIndex} (fallback: no list found)`
        : `after line ${insertIndex} (end of list)`,
      placement: placementLog,
      linesChanged: pauseSequence.length - (hasEmptyLine ? 1 : 0),
      budgetUsed: `${pauseSequence.length - (hasEmptyLine ? 1 : 0)}/3 lines`,
      changes: [
        { 
          type: 'insert', 
          content: 'Nej.\nNej nej.\nExakt.',
          placement: placementLog
        }
      ]
    }
  };
}

/**
 * Apply a patch based on type
 */
export async function applyPatch(output, patchType, spec) {
  console.log(`  🔧 Applying patch: ${patchType}`);
  
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
    
    case 'rytm':
      return applyRytmPatch(output);
    
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

      if (desc.placement) {
        md += `- **Placement:** ${desc.placement}\n`;
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
          } else if (change.placement) {
            md += `- ${change.content} (${change.placement})\n`;
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
        if (iter.patch.description.placement) {
          iterationSection += `  - Placement: ${iter.patch.description.placement}\n`;
        }
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
    quality: results.scores.quality_score,
    total: results.scores.total_score,
    failedChecks: results.per_check.filter(c => !c.pass).map(c => c.id),
    patch: null
  });
  
  // Check if targets met
  while (currentVersion < maxIterations + 1) {
    const complianceMet = results.scores.compliance_score >= complianceTarget;
    const qualityMet = results.scores.quality_score >= qualityTarget;
    
    if (complianceMet && qualityMet) {
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
    
    // Determine patch (include check results for W007 gray zone detection)
    const checkResultsMap = {};
    for (const check of results.per_check) {
      checkResultsMap[check.id] = check;
    }
    
    // Try patches in priority order until one succeeds
    let patchApplied = false;
    let patchType = null;
    let patchResult = null;
    const attemptedPatches = [];
    
    // Get all possible patches for failed checks
    const patchesNeeded = failedChecks
      .map(checkId => CHECK_TO_PATCH[checkId])
      .filter(Boolean);
    
    // Try each patch in priority order
    for (const candidatePatch of PATCH_ORDER) {
      if (!patchesNeeded.includes(candidatePatch)) continue;
      
      patchType = candidatePatch;
      attemptedPatches.push(patchType);
      
      console.log(`\n🔧 v${currentVersion} → v${currentVersion + 1}: Trying ${patchType} patch`);
      
      // Load current output
      const outputPath = path.join(runDir, `output_v${currentVersion}.txt`);
      const currentOutput = fs.readFileSync(outputPath, 'utf-8');
      
      // Apply patch
      patchResult = await applyPatch(currentOutput, patchType, spec);
      
      if (patchResult.success) {
        patchApplied = true;
        break; // Success - use this patch
      } else {
        console.log(`  ❌ ${patchType} patch failed: ${patchResult.message}`);
        // Continue to next patch in priority order
      }
    }
    
    if (!patchApplied) {
      console.log(`\n⚠️ All applicable patches failed. Attempted: ${attemptedPatches.join(', ')}`);
      
      // Record failed patch attempts
      iterations.push({
        version: `v${currentVersion + 1}`,
        compliance: results.scores.compliance_score,
        quality: results.scores.quality_score,
        total: results.scores.total_score,
        failedChecks,
        patch: {
          type: attemptedPatches.join(' → '),
          success: false,
          error: 'ALL_PATCHES_FAILED',
          message: `All patches failed: ${attemptedPatches.join(', ')}`
        }
      });
      break;
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
      quality: results.scores.quality_score,
      total: results.scores.total_score,
      failedChecks: results.per_check.filter(c => !c.pass).map(c => c.id),
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
  const qualityMet = finalIter.quality >= qualityTarget;
  
  console.log(`\n════════════════════════════════════════════`);
  console.log(`📊 Final: compliance=${finalIter.compliance}, quality=${finalIter.quality}, total=${finalIter.total}`);
  console.log(`🎯 Targets: compliance>=${complianceTarget} ${complianceMet ? '✅' : '❌'}, quality>=${qualityTarget} ${qualityMet ? '✅' : '❌'}`);
  console.log(`🔄 Iterations: ${iterations.length}`);
  console.log(`════════════════════════════════════════════`);
  
  return {
    iterations,
    finalVersion: `v${currentVersion}`,
    targetsMet: complianceMet && qualityMet,
    scores: {
      compliance: finalIter.compliance,
      quality: finalIter.quality,
      total: finalIter.total
    }
  };
}

