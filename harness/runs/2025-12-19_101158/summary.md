# Run Summary

**Run ID:** 2025-12-19_101158
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:12:12.839Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 60 | 85 | ❌ NOT MET |
| Total | 69 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "vi bygger upp en mur av tystnad" och "vad säger din spegel om hur du hanterar konflikter?", som bär insikter om kommunikation och självreflektion. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Inkluderande språk med 'vi' och 'oss'. Avsändaren delar egen erfarenhet och reflektion.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du undviker ögonkontakt under möten.
– Du nickar instämmande men går emot i fikarummet.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W001** (llm_judge, weight: 40): Öppningen ger en generell observation om konflikter utan att konfrontera läsaren eller avslöja något om deras egna beteenden. Det saknas direkt tilltal och en känsla av att läsaren blir sedd.

## Iteration History

### v1
- Compliance: 75
- Quality: 60
- Total: 69
- Failed: W001a, W007b, W001

### v2
- Compliance: 75
- Quality: 60
- Total: 69
- Failed: W001a, W007b, W001
- **Patch Applied:** hook
