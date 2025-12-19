# Run Summary

**Run ID:** 2025-12-19_101235
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:12:50.147Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 73 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en självbedräglig uppfattning om öppenhet för konflikter, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan påståendet och verkligheten skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att "bygga en vacker vägg av professionellt beteende", som bär en insikt om hur vi döljer våra känslor och problem. Metaforen skapar igenkänning och stannar kvar genom att illustrera en vanlig men ofta osynlig dynamik i arbetslivet.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Vi vägrar att ta den där tysta blicken i mötet.
– Vi skickar passivt aggressiva meddelanden i Slack.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 50/100 (threshold: 70). Blandad ton, vissa delar inkluderande men också dömande. Avsändaren reflekterar över gemensamma beteenden men pekar också på brister.

## Iteration History

### v1
- Compliance: 75
- Quality: 70
- Total: 73
- Failed: W001a, W007b, W007

### v2
- Compliance: 75
- Quality: 70
- Total: 73
- Failed: W001a, W007b, W007
- **Patch Applied:** hook
