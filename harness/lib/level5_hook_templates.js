/**
 * Reflektera Text Harness v1.1
 * Level 5 Hook Templates - Exakta mallar för kaxig spegel
 * 
 * Varje mall följer strukturen:
 * 1. Gemensamt självbedrägeri (vi-form eller "du kallar det…")
 * 2. Social spegel (andra ser effekten)
 * 3. Självinvolvering som erkännande (avsändaren erkänner att den själv använde samma ord)
 */

export const LEVEL5_HOOK_TEMPLATES = [
  // Template 1: Vi-form + social spegel + självinvolvering
  {
    pattern: "Vi kallar det {X}. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. {X}. {Y}. {Z}.",
    example: "Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad.",
    description: "Klassisk vi-form med tydlig självinvolvering i hooken"
  },
  
  // Template 2: Du-form + social spegel + självinvolvering
  {
    pattern: "Du kallar det {X}. Alla runt dig ser vad det gör. Jag använde exakt samma ord. {X}. {Y}. {Z}.",
    example: "Du kallar det professionalism. Alla runt dig ser vad det gör. Jag använde exakt samma ord. Professionalism. Mognad. Diplomati.",
    description: "Du-form med social spegel och självinvolvering"
  },
  
  // Template 3: Vi-form + konkret effekt + självinvolvering
  {
    pattern: "Vi kallar det {X}. Men i rummen vi sitter i ser alla något annat. Jag kallade det exakt samma sak. {X}. {Y}. {Z}.",
    example: "Vi kallar det konflikthantering. Men i rummen vi sitter i ser alla något annat. Jag kallade det exakt samma sak. Konflikthantering. Professionalism. Mognad.",
    description: "Konkret rum/plats med social spegel"
  },
  
  // Template 4: Du-form + social spegel + erkännande
  {
    pattern: "Du säger att du är {X}. Dina handlingar säger något helt annat. Jag sa exakt samma sak. {X}. {Y}. {Z}.",
    example: "Du säger att du är öppen. Dina handlingar säger något helt annat. Jag sa exakt samma sak. Öppen. Rak. Modig.",
    description: "Kontrast mellan ord och handlingar"
  },
  
  // Template 5: Vi-form + social konsekvens + självinvolvering
  {
    pattern: "Vi kallar det {X}. Alla runt omkring vet vad det egentligen är. Jag kallade det exakt samma sak. {X}. {Y}. {Z}.",
    example: "Vi kallar det samarbete. Alla runt omkring vet vad det egentligen är. Jag kallade det exakt samma sak. Samarbete. Professionalism. Diplomati.",
    description: "Social konsekvens med "vet vad det egentligen är""
  },
  
  // Template 6: Du-form + social spegel + självinvolvering (kortare)
  {
    pattern: "Du kallar det {X}. Alla runt dig ser det. Jag använde samma ord. {X}. {Y}.",
    example: "Du kallar det mognad. Alla runt dig ser det. Jag använde samma ord. Mognad. Professionalism.",
    description: "Kortare variant för snabbare rytm"
  },
  
  // Template 7: Vi-form + konkret plats + självinvolvering
  {
    pattern: "Vi kallar det {X}. I mötena vi sitter i ser alla något annat. Jag kallade det exakt samma sak. {X}. {Y}. {Z}.",
    example: "Vi kallar det öppenhet. I mötena vi sitter i ser alla något annat. Jag kallade det exakt samma sak. Öppenhet. Rakhet. Mod.",
    description: "Konkret plats (möten) med social spegel"
  },
  
  // Template 8: Du-form + social spegel + erkännande (variation)
  {
    pattern: "Du kallar det {X}. Alla runt dig ser effekten. Jag kallade det också {X}. {Y}. {Z}.",
    example: "Du kallar det professionalism. Alla runt dig ser effekten. Jag kallade det också professionalism. Mognad. Diplomati.",
    description: "Variation med "också" för mjukare övergång"
  },
  
  // Template 9: Vi-form + social spegel + självinvolvering (direkt)
  {
    pattern: "Vi kallar det {X}. Alla runt omkring ser vad det gör med rummet. Jag kallade det exakt samma sak. {X}. {Y}. {Z}.",
    example: "Vi kallar det konflikthantering. Alla runt omkring ser vad det gör med rummet. Jag kallade det exakt samma sak. Konflikthantering. Professionalism. Diplomati.",
    description: "Konkret effekt på rummet/platsen"
  },
  
  // Template 10: Du-form + social spegel + självinvolvering (variation)
  {
    pattern: "Du kallar det {X}. Alla runt dig ser vad det gör. Jag använde exakt samma ord. {X}. {Y}. {Z}.",
    example: "Du kallar det öppenhet. Alla runt dig ser vad det gör. Jag använde exakt samma ord. Öppenhet. Rakhet. Mod.",
    description: "Variation med "vad det gör" för konkret effekt"
  },
  
  // Template 11: Vi-form + social spegel + självinvolvering + parentetisk aside (SMUTSIG)
  {
    pattern: "Vi kallar det {X}. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. {X}. {Y}. {Z}. (Ja, jag sa det.)",
    example: "Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad. (Ja, jag sa det.)",
    description: "Klassisk vi-form med parentetisk aside för smutsig röst"
  },
  
  // Template 12: Du-form + konkret rum + självinvolvering + parentetisk aside (SMUTSIG)
  {
    pattern: "Du kallar det {X}. I mötena du sitter i ser alla något annat. Jag använde exakt samma ord. {X}. {Y}. {Z}. (Aj.)",
    example: "Du kallar det professionalism. I mötena du sitter i ser alla något annat. Jag använde exakt samma ord. Professionalism. Mognad. Diplomati. (Aj.)",
    description: "Konkret rum med parentetisk aside för människa-i-rummet-energi"
  },
  
  // Template 13: Vi-form + social spegel + självinvolvering + kort aside (SMUTSIG)
  {
    pattern: "Vi kallar det {X}. Alla runt omkring vet vad det egentligen är. Jag kallade det exakt samma sak. {X}. {Y}. {Z}. (Du vet.)",
    example: "Vi kallar det samarbete. Alla runt omkring vet vad det egentligen är. Jag kallade det exakt samma sak. Samarbete. Professionalism. Diplomati. (Du vet.)",
    description: "Social spegel med kort parentetisk aside"
  },
  
  // Template 14: Du-form + konkret plats + självinvolvering + aside (SMUTSIG)
  {
    pattern: "Du kallar det {X}. I korridoren, i Slack, i mötena – alla ser det. Jag använde exakt samma ord. {X}. {Y}. {Z}. (Jag vet.)",
    example: "Du kallar det öppenhet. I korridoren, i Slack, i mötena – alla ser det. Jag använde exakt samma ord. Öppenhet. Rakhet. Mod. (Jag vet.)",
    description: "Konkret platslista med parentetisk aside för rumsnärvaro"
  },
  
  // Template 15: Vi-form + social konsekvens + självinvolvering + aside (SMUTSIG)
  {
    pattern: "Vi kallar det {X}. Alla runt omkring ser vad det gör med rummet. Jag kallade det exakt samma sak. {X}. {Y}. {Z}. (Och ja, jag sa det.)",
    example: "Vi kallar det konflikthantering. Alla runt omkring ser vad det gör med rummet. Jag kallade det exakt samma sak. Konflikthantering. Professionalism. Diplomati. (Och ja, jag sa det.)",
    description: "Social konsekvens med längre parentetisk aside"
  },
  
  // Template 16: Du-form + social spegel + självinvolvering + kort aside (SMUTSIG)
  {
    pattern: "Du kallar det {X}. Alla runt dig ser det. Jag använde samma ord. {X}. {Y}. (Aj.)",
    example: "Du kallar det mognad. Alla runt dig ser det. Jag använde samma ord. Mognad. Professionalism. (Aj.)",
    description: "Kortare variant med parentetisk aside för snabbare rytm"
  },
  
  // Template 17: Vi-form + konkret scen + självinvolvering + aside (SMUTSIG)
  {
    pattern: "Vi kallar det {X}. Men när vi sitter i rummen ser alla något annat. Jag kallade det exakt samma sak. {X}. {Y}. {Z}. (Du vet vem jag menar.)",
    example: "Vi kallar det diplomati. Men när vi sitter i rummen ser alla något annat. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad. (Du vet vem jag menar.)",
    description: "Konkret scen med längre parentetisk aside för närvaro"
  },
  
  // Template 18: Du-form + social spegel + självinvolvering + aside (SMUTSIG)
  {
    pattern: "Du kallar det {X}. Alla runt dig ser vad det gör. Jag använde exakt samma ord. {X}. {Y}. {Z}. (Ja, jag sa det. Och jag menade det.)",
    example: "Du kallar det professionalism. Alla runt dig ser vad det gör. Jag använde exakt samma ord. Professionalism. Mognad. Diplomati. (Ja, jag sa det. Och jag menade det.)",
    description: "Social spegel med längre parentetisk aside för mer röst"
  },
  
  // Template 19: Vi-form + social spegel + självinvolvering + kort aside (SMUTSIG)
  {
    pattern: "Vi kallar det {X}. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. {X}. {Y}. {Z}. (Jag vet. Jag sa det.)",
    example: "Vi kallar det samarbete. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Samarbete. Professionalism. Diplomati. (Jag vet. Jag sa det.)",
    description: "Social spegel med två korta parentetiska meningar för varierad rytm"
  },
  
  // Template 20: Du-form + konkret plats + självinvolvering + aside (SMUTSIG)
  {
    pattern: "Du kallar det {X}. I Slack, i Teams, i mötena – alla ser det. Jag använde exakt samma ord. {X}. {Y}. {Z}. (Aj. Jag sa det.)",
    example: "Du kallar det öppenhet. I Slack, i Teams, i mötena – alla ser det. Jag använde exakt samma ord. Öppenhet. Rakhet. Mod. (Aj. Jag sa det.)",
    description: "Konkret platslista med två korta parentetiska meningar för rumsnärvaro och varierad rytm"
  }
];

/**
 * Get a random hook template for level 5
 * @param {string} topic - The topic/theme (e.g., "diplomati", "professionalism", "konflikthantering")
 * @returns {string} - A formatted hook following the template structure
 */
export function getLevel5Hook(topic) {
  const template = LEVEL5_HOOK_TEMPLATES[Math.floor(Math.random() * LEVEL5_HOOK_TEMPLATES.length)];
  
  // Simple placeholder replacement (in real implementation, use more sophisticated matching)
  const replacements = {
    'diplomati': { X: 'diplomati', Y: 'professionalism', Z: 'mognad' },
    'professionalism': { X: 'professionalism', Y: 'mognad', Z: 'diplomati' },
    'konflikthantering': { X: 'konflikthantering', Y: 'professionalism', Z: 'diplomati' },
    'öppenhet': { X: 'öppenhet', Y: 'rakhet', Z: 'mod' },
    'samarbete': { X: 'samarbete', Y: 'professionalism', Z: 'diplomati' },
    'mognad': { X: 'mognad', Y: 'professionalism', Z: 'diplomati' }
  };
  
  const replacement = replacements[topic] || { X: topic, Y: 'professionalism', Z: 'diplomati' };
  
  return template.pattern
    .replace(/{X}/g, replacement.X)
    .replace(/{Y}/g, replacement.Y)
    .replace(/{Z}/g, replacement.Z);
}

