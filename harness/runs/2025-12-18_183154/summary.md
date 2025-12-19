# Run Summary

**Run ID:** 2025-12-18_183154
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:32:13.007Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar en självbedräglig uppfattning om att inte vara konflikträdd, vilket skapar en känsla av att läsaren blir konfronterad med sin verklighet. Denna kontrast mellan påståendet och den faktiska beteendet skapar friktion och får läsaren att känna sig sedd.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "en läckande kran" och "bygga en mur av frustration", som bär insikter om att undvika konflikter och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Vi viskar i korridoren men tystnar i mötet.  
– Vi skickar passivt aggressiva meddelanden i Slack.  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 68/100 (threshold: 70). Blandning av igenkänning och föreläsande ton; Visar på förståelse men har inslag av pekande; Inkluderar sig själv men uppmanar till förändring

## Iteration History

### v1
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W001a, W007

### v2
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W001a, W007
- **Patch Applied:** hook
