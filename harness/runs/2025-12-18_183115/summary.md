# Run Summary

**Run ID:** 2025-12-18_183115
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:31:35.133Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om deras verkliga beteende kring konflikter, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad som sägs och vad som faktiskt händer, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "stå vid kanten av en djup avgrund" och "försöka laga en läckande kran med en pappershandduk", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer stannar kvar och ger läsaren en tydlig bild av situationen.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Blandad ton med inslag av igenkänning; Visar på frustration utan att döma; Inkluderar avsändaren och ger en känsla av gemenskap
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
