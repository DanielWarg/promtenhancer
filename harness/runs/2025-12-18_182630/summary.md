# Run Summary

**Run ID:** 2025-12-18_182630
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:26:52.507Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om självbedrägeri kring konflikträdsla, vilket skapar en känsla av att bli sedd snarare än informerad. Denna kontrast mellan påståendet och verkligheten skapar friktion och engagemang.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer som "att sätta ett plåster på en spricka i väggen" och "konflikter är som stormar", vilka bär insikter om att undvika problem och vikten av att hantera konflikter. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Blandad ton med inslag av igenkänning; Visar på egna svårigheter vilket skapar en spegel; Innehåller vissa föreläsande inslag men med en uppmuntrande avslutning
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
