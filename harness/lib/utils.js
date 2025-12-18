/**
 * Reflektera Text Harness v1.1
 * Utils - Shared utility functions
 */

// Swedish stopwords for clone detection
export const SWEDISH_STOPWORDS = new Set([
  'och', 'att', 'det', 'som', 'är', 'i', 'på', 'en', 'ett',
  'jag', 'du', 'ni', 'vi', 'de', 'den', 'har', 'för', 'med',
  'av', 'till', 'om', 'kan', 'när', 'så', 'men', 'inte', 'vara',
  'var', 'han', 'hon', 'sig', 'sin', 'sitt', 'sina', 'dem', 'deras',
  'vad', 'hur', 'här', 'där', 'nu', 'då', 'bara', 'också', 'eller',
  'efter', 'innan', 'under', 'över', 'mellan', 'genom', 'utan', 'mot'
]);

/**
 * Get text by scope (first_screen, last_screen, full_text)
 * first_screen: First 6 lines OR max 280 chars (without cutting mid-line)
 * last_screen: Last 6 lines
 * full_text: Entire output
 */
export function getTextByScope(output, scope) {
  const lines = output.split('\n');
  
  switch (scope) {
    case 'first_screen': {
      // First 6 lines OR max 280 chars (without cutting mid-line)
      let firstScreen = '';
      let charCount = 0;
      const maxLines = Math.min(6, lines.length);
      
      for (let i = 0; i < maxLines; i++) {
        const lineWithNewline = lines[i] + '\n';
        // If adding this line exceeds 280 chars and we have at least one line, stop
        if (charCount + lineWithNewline.length > 280 && i > 0) {
          break;
        }
        firstScreen += lineWithNewline;
        charCount += lineWithNewline.length;
      }
      return firstScreen.trim();
    }
    
    case 'last_screen': {
      // Last 6 lines
      return lines.slice(-6).join('\n').trim();
    }
    
    case 'full_text':
    default:
      return output;
  }
}

/**
 * Normalize text for comparison (lowercase, remove punctuation, filter stopwords)
 */
export function normalizeForComparison(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-–—\[\]{}]/g, '')  // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 0 && !SWEDISH_STOPWORDS.has(word));
}

/**
 * Calculate Jaccard similarity between two word arrays
 */
export function jaccardSimilarity(words1, words2) {
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  if (set1.size === 0 && set2.size === 0) return 0;
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Check for example cloning using Jaccard similarity
 * Returns pass/fail and list of cloned lines with similarity scores
 */
export function checkExampleCloning(output, examplesContent) {
  const SIMILARITY_THRESHOLD = 0.85;
  const MIN_EXAMPLE_LENGTH = 35;
  
  // Extract example lines (ignore short lines and headers)
  const exampleLines = examplesContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => 
      line.length >= MIN_EXAMPLE_LENGTH && 
      !line.startsWith('#') && 
      !line.startsWith('-') &&
      !line.startsWith('VIKTIGT')
    );
  
  const outputLines = output
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  const clonedLines = [];
  
  for (const outputLine of outputLines) {
    const outputWords = normalizeForComparison(outputLine);
    // Skip lines with too few words
    if (outputWords.length < 3) continue;
    
    for (const exampleLine of exampleLines) {
      const exampleWords = normalizeForComparison(exampleLine);
      if (exampleWords.length < 3) continue;
      
      const similarity = jaccardSimilarity(outputWords, exampleWords);
      
      if (similarity >= SIMILARITY_THRESHOLD) {
        clonedLines.push({
          outputLine,
          exampleLine,
          similarity: Math.round(similarity * 100) / 100
        });
      }
    }
  }
  
  return {
    pass: clonedLines.length === 0,
    clonedLines,
    notes: clonedLines.length > 0 
      ? `Found ${clonedLines.length} cloned line(s) with similarity >= ${SIMILARITY_THRESHOLD}`
      : 'No cloning detected'
  };
}

/**
 * Word diff - compares two texts and checks if words are identical
 * Used for format-patch validation (only whitespace changes allowed)
 */
export function wordDiff(before, after) {
  const beforeWords = normalizeForComparison(before);
  const afterWords = normalizeForComparison(after);
  
  // Check if lengths match
  if (beforeWords.length !== afterWords.length) {
    return { 
      identical: false, 
      diff: Math.abs(beforeWords.length - afterWords.length),
      message: `Word count changed: ${beforeWords.length} -> ${afterWords.length}`
    };
  }
  
  // Check each word
  for (let i = 0; i < beforeWords.length; i++) {
    if (beforeWords[i] !== afterWords[i]) {
      return { 
        identical: false, 
        diff: i,
        message: `Word mismatch at position ${i}: "${beforeWords[i]}" vs "${afterWords[i]}"`
      };
    }
  }
  
  return { identical: true, diff: 0, message: 'Words are identical' };
}

/**
 * Count sentences in text (splits on . ! ?)
 */
export function countSentences(text) {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

/**
 * Get first N sentences from text
 */
export function getFirstSentences(text, n = 3) {
  const sentences = text.split(/([.!?]+)/).reduce((acc, part, i, arr) => {
    if (i % 2 === 0 && part.trim()) {
      const punctuation = arr[i + 1] || '';
      acc.push(part.trim() + punctuation);
    }
    return acc;
  }, []);
  
  return sentences.slice(0, n);
}

/**
 * Count line breaks (empty lines) in text
 */
export function countLineBreaks(text) {
  return (text.match(/\n\s*\n/g) || []).length;
}

/**
 * Count "lonely sentences" (lines that stand alone with whitespace around)
 */
export function countLonelySentences(text) {
  const lines = text.split('\n');
  let count = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const prevEmpty = i === 0 || lines[i - 1].trim() === '';
    const nextEmpty = i === lines.length - 1 || lines[i + 1]?.trim() === '';
    
    // A lonely sentence is a non-empty line surrounded by empty lines (or edges)
    if (line.length > 0 && line.length < 60 && prevEmpty && nextEmpty) {
      count++;
    }
  }
  
  return count;
}

/**
 * Count character length of text (excluding whitespace-only differences)
 */
export function countChars(text) {
  return text.trim().length;
}

