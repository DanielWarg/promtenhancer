# Run Summary

**Run ID:** 2025-12-18_170054
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T16:01:32.751Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 76 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och deras beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan vad läsaren säger och vad de faktiskt gör.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "konflikter är som bergstoppar" och "tänk på det som att rensa ogräs i trädgården", som bär insikter om kommunikation och förändring. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Texten innehåller imperativ som "Vill du förändra kulturen på din arbetsplats?" och "Tänk på det som att rensa ogräs", vilket pekar finger. Dessutom saknas en tydlig självinvolvering i form av personliga erfarenheter utöver den avslutande meningen.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

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
  - Lines changed: 1

### v3
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W007, W003
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1

### v4
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W007, W003
- **Patch Applied:** lista
