# Run Summary

**Run ID:** 2025-12-18_183453
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:35:18.757Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Denna kontrast mellan påståendet och den underliggande verkligheten skapar friktion och engagemang.
- **W005** (llm_judge, weight: 30): . Metaforen om att "försöka laga en läckande kran med en pappershandduk" är konkret och visuell, bär en insikt om att ytliga lösningar inte löser grundproblemet, och skapar igenkänning i situationer av konflikträdsla.
- **W007** (llm_judge, weight: 30): Score: 70/100 (threshold: 65). Vi-språk inkluderar avsändaren; Konkreta exempel skapar igenkänning; Visar självinsikt och humor i avslutningen
- **W002** (regex, weight: 20): Found: "korridor"
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
