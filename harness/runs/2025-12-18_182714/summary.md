# Run Summary

**Run ID:** 2025-12-18_182714
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:27:33.815Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 67 | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de kanske inte är så öppna för konflikter som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan påståendet och verkligheten skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "bär på irritation och frustration som en tung ryggsäck" och "stå vid en sjö och hoppas att vattnet ska komma till oss", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer bidrar till att förmedla budskapet på ett minnesvärt sätt.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 68/100 (threshold: 70). Blandning av igenkänning och föreläsande ton; Visar på förståelse men har inslag av pekande; Inkluderar avsändaren men med en viss distans
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 65
- Quality: 70
- Total: 67
- Failed: W001a, W007, W003

### v2
- Compliance: 65
- Quality: 70
- Total: 67
- Failed: W001a, W007, W003
- **Patch Applied:** hook
