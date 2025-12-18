# Run Summary

**Run ID:** 2025-12-18_183334
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:33:53.005Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan påståendet och den verkliga situationen skapar friktion och väcker intresse.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "som en tickande bomb" och "som att hålla inne med andan", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer stannar kvar och ger läsaren en tydlig bild av situationen.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 65). Vi-språk inkluderar avsändaren; Konkreta exempel skapar igenkänning; Uppmaning till öppen dialog utan dömande
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W001a, W003

### v2
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W001a, W003
- **Patch Applied:** hook
