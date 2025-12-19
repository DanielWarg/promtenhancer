# Run Summary

**Run ID:** 2025-12-18_183437
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:34:53.773Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om att de kanske inte är så öppna som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan påståendet och verkligheten som skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "en gammal, trasig maskin" och "stå stilla i en ström av vatten", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer stannar kvar och uppmanar till reflektion och handling.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 65). Vi-språk inkluderar avsändaren; Konkreta exempel skapar igenkänning; Uppmaningar till handling med värme och öppenhet
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
