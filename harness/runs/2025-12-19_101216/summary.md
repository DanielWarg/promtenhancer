# Run Summary

**Run ID:** 2025-12-19_101216
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:12:31.873Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 30 | 85 | ❌ NOT MET |
| Total | 63 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "vi lever i en labyrint av undvikande" och "den där tysta dansen", som bär insikter om kommunikation och konflikthantering. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skickar ett meddelande i Slack, men lägger till en smiley för att mjuka upp det. 
– Du viskar i korridoren om en kollega istället för att ta det direkt i mötet.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W001** (llm_judge, weight: 40): . Öppningen ger en generell observation om att tro att man är öppen för konflikter, utan att direkt konfrontera läsaren eller avslöja något de inte vill erkänna.
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Tonen är dömande och pekar finger mot läsaren. Avsändaren framstår som utanför situationen och kritiserar beteenden.

## Iteration History

### v1
- Compliance: 85
- Quality: 30
- Total: 63
- Failed: W001a, W001, W007

### v2
- Compliance: 85
- Quality: 30
- Total: 63
- Failed: W001a, W001, W007
- **Patch Applied:** hook
