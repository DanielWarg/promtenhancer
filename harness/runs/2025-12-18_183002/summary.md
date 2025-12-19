# Run Summary

**Run ID:** 2025-12-18_183002
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:30:21.075Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan påståendet och den efterföljande beskrivningen av verkligheten skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "en uppblåst ballong som växer större och större" och "måla över en spricka i väggen", som bär insikter om att undvika konflikter. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Blandad ton med inslag av igenkänning; Visar på egna erfarenheter utan att döma; Uppmanar till förändring men med en viss värme
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
