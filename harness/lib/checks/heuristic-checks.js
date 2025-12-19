/**
 * Reflektera Text Harness v1.1
 * Heuristic-based checks
 */

import { 
  countLineBreaks, 
  countLonelySentences, 
  countChars,
  getFirstSentences,
  checkExampleCloning 
} from '../utils.js';

/**
 * B001a - Emotionell närhet i öppningen (inte tes-intro)
 * Checks if opening has emotional closeness rather than thesis-style intro
 */
function checkB001a(text) {
  const firstSentences = getFirstSentences(text, 3);
  const firstText = firstSentences.join(' ').toLowerCase();
  
  // Positive indicators
  const emotionalIndicators = [
    /du som/i,
    /jag minns/i,
    /jag har/i,
    /känslan/i,
    /hjärtat/i,
    /magen/i,
    /sitter där/i,
    /till dig/i
  ];
  
  // Negative indicators (thesis-style)
  const thesisIndicators = [
    /^i dagens/i,
    /^enligt/i,
    /^forskning visar/i,
    /^det är viktigt att/i,
    /^många människor/i,
    /^i vår moderna/i
  ];
  
  const hasEmotional = emotionalIndicators.some(pattern => pattern.test(firstText));
  const hasThesis = thesisIndicators.some(pattern => pattern.test(firstText));
  
  if (hasThesis) {
    return {
      pass: false,
      notes: 'Opening has thesis-style introduction'
    };
  }
  
  if (hasEmotional) {
    return {
      pass: true,
      notes: 'Opening has emotional closeness'
    };
  }
  
  return {
    pass: false,
    notes: 'Opening lacks clear emotional connection'
  };
}

/**
 * B002 - 2-3 sensoriska mikrodetaljer
 */
function checkB002(text) {
  const detailPatterns = [
    // Time
    /morgon|kväll|natt|klockan|timmar|minuter/i,
    // Place
    /frukostbord|sängen|soffan|köket|rummet|golvet/i,
    // Body
    /magen|hjärtat|pannan|halsen|axeln|kroppen|andetag/i,
    // Objects
    /termometer|telefon|dator|kopp|filt|kudde/i,
    // Sensory
    /varm|kall|tung|lätt|mjuk|hård|tyst|högt/i,
    // Specific
    /feber|38|39|grå|november|regn/i
  ];
  
  let count = 0;
  const found = [];
  
  for (const pattern of detailPatterns) {
    const match = text.match(pattern);
    if (match) {
      count++;
      found.push(match[0]);
    }
  }
  
  return {
    pass: count >= 2,
    notes: count >= 2 
      ? `Found ${count} micro-details: ${found.slice(0, 3).join(', ')}`
      : `Only ${count} micro-detail(s) found (need 2-3)`
  };
}

/**
 * B003 - Whitespace: Naturligt brevflöde med luft, inte dikt/telegram
 * Kräver: minst 3-6 stycken, max 2 ensamma rader, minst 3 tomma rader (radbrytningar mellan stycken)
 */
function checkB003(text) {
  const lonelySentences = countLonelySentences(text);
  
  // Räkna stycken (radbrytningar som skapar tomma rader)
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;
  
  // Räkna tomma rader (radbrytningar mellan stycken)
  const emptyLines = (text.match(/\n\s*\n/g) || []).length;
  
  // Krav: minst 3 och max 6 stycken (naturligt brevflöde)
  const passParagraphs = paragraphCount >= 3 && paragraphCount <= 6;
  
  // Krav: minst 3 tomma rader (luft mellan stycken) - detta säkerställer att texten har naturligt brevflöde
  const passBreaks = emptyLines >= 3;
  
  // Krav: max 2 ensamma rader (undvik diktkänsla)
  const passLonely = lonelySentences <= 2;
  
  // Undvik telegramstil: kontrollera att det inte finns för många korta meningar på egna rader
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const shortLines = lines.filter(l => {
    const trimmed = l.trim();
    // Undvik signaturrader
    if (trimmed.match(/^\/[A-Z]/)) return false;
    // Kort rad med max 1 mening
    const sentences = trimmed.split(/[.!?]/).filter(s => s.trim().length > 0);
    return sentences.length <= 1 && trimmed.length < 50;
  });
  const tooManyShortLines = shortLines.length > 5; // För många korta rader = telegramstil
  
  const pass = passParagraphs && passBreaks && passLonely && !tooManyShortLines;
  
  return {
    pass,
    notes: `Paragraphs: ${paragraphCount} (3-6 ok), Empty lines: ${emptyLines}/3, Lonely sentences: ${lonelySentences} (max 2), Short lines: ${shortLines.length}${tooManyShortLines ? ' (telegramstil!)' : ''}`
  };
}

/**
 * B007 - Length check (800-1200 chars)
 */
function checkB007(text, check) {
  const chars = countChars(text);
  const min = check.min_chars || 800;
  const max = check.max_chars || 1200;
  
  return {
    pass: chars >= min && chars <= max,
    notes: `Length: ${chars} chars (target: ${min}-${max})`
  };
}

/**
 * W001a - Hook within first 2-3 sentences
 * For warm_provocation: must have direct address (du/ni) AND contrast/negation
 */
function checkW001a(text) {
  const firstSentences = getFirstSentences(text, 3);
  const firstText = firstSentences.join(' ').toLowerCase();
  
  // Check for direct address
  const hasDirectAddress = /\b(du|ni)\b/i.test(firstText);
  
  // Check for contrast/negation
  const hasContrast = /\b(inte|aldrig|men|utan|nej)\b/i.test(firstText);
  
  if (hasDirectAddress && hasContrast) {
    return {
      pass: true,
      notes: 'Hook has direct address and contrast'
    };
  }
  
  if (!hasDirectAddress) {
    return {
      pass: false,
      notes: 'First 3 sentences lack direct address (du/ni)'
    };
  }
  
  return {
    pass: false,
    notes: 'First 3 sentences lack contrast/negation'
  };
}

/**
 * G001 - No exact example line reuse
 */
function checkG001(text, examplesContent) {
  return checkExampleCloning(text, examplesContent);
}

/**
 * W007b - No imperatives (heuristic pre-check for W007)
 * Fails if text contains finger-pointing phrases
 */
function checkW007b(text) {
  const imperativePatterns = [
    /\bdu borde\b/gi,
    /\bdu måste\b/gi,
    /\bman måste\b/gi,
    /\bman borde\b/gi,
    /\bdet är dags att\b/gi,
    /\bni behöver\b/gi,
    // Additional softer imperatives
    /\btänk om du\b/gi,
    /\bvad sägs om att du\b/gi,
    /\bprova att\b/gi,
    /\bförsök att\b/gi,
    /\bvill du\b/gi,
    /\btänk på det som\b/gi,
    /\bbörja med att\b/gi
  ];
  
  const selfInvolvementPatterns = [
    /\bjag har\b/gi,
    /\bjag också\b/gi,
    /\bjag känner igen\b/gi,
    /\bvi gör\b/gi,
    /\bvi har\b/gi,
    /\bjag vet\b/gi
  ];
  
  // Check for imperatives
  const foundImperatives = [];
  for (const pattern of imperativePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      foundImperatives.push(...matches);
    }
  }
  
  // Check for self-involvement
  let hasSelfInvolvement = false;
  for (const pattern of selfInvolvementPatterns) {
    if (pattern.test(text)) {
      hasSelfInvolvement = true;
      break;
    }
  }
  
  if (foundImperatives.length > 0) {
    return {
      pass: false,
      notes: `Found ${foundImperatives.length} imperative(s): ${foundImperatives.slice(0, 3).join(', ')}`
    };
  }
  
  if (!hasSelfInvolvement) {
    return {
      pass: false,
      notes: 'No self-involvement found (jag/vi). Text may feel preachy.'
    };
  }
  
  return {
    pass: true,
    notes: 'No imperatives found, has self-involvement'
  };
}

/**
 * Run a heuristic check
 */
export function runHeuristicCheck(text, check, context = {}) {
  const { id } = check;
  
  switch (id) {
    case 'B001a':
      return checkB001a(text);
    case 'B002':
      return checkB002(text);
    case 'B003':
      return checkB003(text);
    case 'B007':
      return checkB007(text, check);
    case 'W001a':
      return checkW001a(text);
    case 'W007b':
      return checkW007b(text);
    case 'G001':
      return checkG001(text, context.examplesContent || '');
    default:
      return {
        pass: false,
        notes: `Unknown heuristic check: ${id}`
      };
  }
}

/**
 * Run all heuristic checks for a profile
 */
export function runAllHeuristicChecks(text, checks, getTextByScope, context = {}) {
  const results = {};
  
  for (const check of checks) {
    if (check.type !== 'heuristic') continue;
    
    const scopedText = getTextByScope(text, check.scope);
    results[check.id] = {
      ...runHeuristicCheck(scopedText, check, context),
      check
    };
  }
  
  return results;
}

