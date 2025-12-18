# Run Summary

**Run ID:** 2025-12-18_170241
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T16:03:28.161Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Den negativa kontrasten mellan vad läsaren säger och deras faktiska beteende skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "vi lever i en bubbla av tystnad" och "olösta konflikter växer som ogräs i en trädgård", som bär insikter om konflikthantering och skapar igenkänning. Metaforerna är relevanta och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Valt att undvika en jobbigt samtal genom att skicka ett passivt aggressivt meddelande i Slack?  
– Viska i korridoren om en kollega istället för att ta det i mötet?  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): . Texten innehåller flera imperativ och pekar finger, vilket ger en moraliserande ton. Även om avsändaren delar sina erfarenheter, så framstår det som en överläraraktig hållning snarare än en inkluderande och igenkännande dialog.

## Iteration History

### v1
- Compliance: 90
- Quality: 70
- Total: 82
- Failed: W007b, W007

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1

### v4
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
