# Run Summary

**Run ID:** 2025-12-18_183353
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:34:15.388Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 91 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om deras verkliga beteende kring konflikter, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan påståendet och det faktiska beteendet skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att lägga en filt över en glödande kol" och "att kliva ut på en osäker bro", som bär insikter om att undvika svåra samtal och vikten av öppenhet. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 78/100 (threshold: 65). Vi-språk inkluderar avsändaren; Konkreta exempel skapar igenkänning; Värme och humor i avslutningen
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Vi viskar i korridoren men tystnar i mötet.  
– Vi skickar passivt aggressiva meddelanden i Slack.  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)

## Iteration History

### v1
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W001a

### v2
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W001a
- **Patch Applied:** hook
