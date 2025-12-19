# Run Summary

**Run ID:** 2025-12-19_092251
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T08:23:16.967Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | SUCCESS | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Den negativa kontrasten mellan påståendet och de efterföljande exemplen skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att säga att man är en mästare på att simma, men bara doppa tårna i vattnet" och "sätta en plåster på en sårig yta", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer förmedlar en djupare förståelse för ämnet och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 70/100 (threshold: 70). Inkluderande 'vi' och delad erfarenhet från avsändaren. Tonen är något pedagogisk men ändå varm och igenkännande.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Valt att hellre sända ett krypande meddelande i Slack än att ta det där jobbiga samtalet?  
– Viskat om problemet i korridoren istället för att konfrontera det?  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 90
- Quality: 70
- Total: 82
- Failed: W007b, W007

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
