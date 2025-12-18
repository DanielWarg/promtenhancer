# Run Summary

**Run ID:** 2025-12-18_183415
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:34:37.193Z

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
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar en självbedräglig uppfattning om att inte vara konflikträdd, vilket skapar en känsla av att läsaren blir konfronterad med sin verklighet. Det finns en tydlig kontrast mellan det som sägs och det som faktiskt händer, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att sätta ett plåster på en spricka i väggen" och "konflikter är som stormar", som bär insikter om kommunikationens betydelse och skapar igenkänning. Metaforerna bidrar till att förmedla ett budskap om vikten av att hantera konflikter direkt.
- **W007** (llm_judge, weight: 30): Score: 72/100 (threshold: 65). Vi-språk inkluderar avsändaren; Konkreta exempel skapar igenkänning; Provocerande men med värme
- **W002** (regex, weight: 20): Found: "Slack"
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
