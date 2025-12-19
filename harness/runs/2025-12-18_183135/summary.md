# Run Summary

**Run ID:** 2025-12-18_183135
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:31:54.688Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om deras verkliga beteende kring konflikter, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad som påstås och vad som faktiskt sker, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att använda en snöskovel för att hugga ved, vilket bär en insikt om ineffektivitet i kommunikation och skapar igenkänning kring att undvika svåra samtal.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 68/100 (threshold: 70). Blandad ton med inslag av igenkänning; Uppmanar till förändring utan att döma; Inkluderar avsändaren själv i processen
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
