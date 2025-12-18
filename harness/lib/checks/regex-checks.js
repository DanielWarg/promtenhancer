/**
 * Reflektera Text Harness v1.1
 * Regex-based checks
 */

/**
 * Run a regex check on text
 * @param {string} text - Text to check
 * @param {object} check - Check definition with pattern or pattern_fail
 * @returns {object} - { pass, notes }
 */
export function runRegexCheck(text, check) {
  const { id, pattern, pattern_fail } = check;
  
  try {
    if (pattern_fail) {
      // Fail if pattern matches (e.g., B006 - no hard CTAs)
      const regex = new RegExp(pattern_fail, 'i');
      const match = text.match(regex);
      
      if (match) {
        return {
          pass: false,
          notes: `Found forbidden pattern: "${match[0]}"`
        };
      }
      return {
        pass: true,
        notes: 'No forbidden patterns found'
      };
    }
    
    if (pattern) {
      // Pass if pattern matches
      const regex = new RegExp(pattern, 'im');  // i=case insensitive, m=multiline
      const match = text.match(regex);
      
      if (match) {
        return {
          pass: true,
          notes: `Found: "${match[0]}"`
        };
      }
      return {
        pass: false,
        notes: `Pattern not found: ${pattern}`
      };
    }
    
    return {
      pass: false,
      notes: 'No pattern defined for check'
    };
    
  } catch (error) {
    return {
      pass: false,
      notes: `Regex error: ${error.message}`
    };
  }
}

/**
 * Run all regex checks for a profile
 */
export function runAllRegexChecks(text, checks, getTextByScope) {
  const results = {};
  
  for (const check of checks) {
    if (check.type !== 'regex') continue;
    
    const scopedText = getTextByScope(text, check.scope);
    results[check.id] = {
      ...runRegexCheck(scopedText, check),
      check
    };
  }
  
  return results;
}

