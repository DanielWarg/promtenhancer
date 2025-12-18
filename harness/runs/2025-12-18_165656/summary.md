# Run Summary

**Run ID:** 2025-12-18_165656
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T15:57:39.982Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en självklarhet som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad läsaren säger sig vara och deras faktiska beteende.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att trycka ner en ballong under vattnet", som bär insikter om att undvika konflikter och dess konsekvenser. Metaforerna skapar igenkänning och stannar kvar i läsarens sinne.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Att sätta en tid för att prata om det som verkligen stör.
– Att uttrycka dina känslor istället för att låta dem bubbla över.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): . Texten innehåller flera imperativ som "tänk om du istället valde" och "att sätta en tid för att prata", vilket ger en moraliserande ton. Dessutom saknas en tydlig självinvolvering som skulle skapa igenkänning.

## Iteration History

### v1
- Compliance: 70
- Quality: 70
- Total: 70
- Failed: W007b, W007, W003

### v2
- Compliance: 90
- Quality: 70
- Total: 82
- Failed: W007b, W007
- **Patch Applied:** lista
  - Location: full
  - Lines changed: 6

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
