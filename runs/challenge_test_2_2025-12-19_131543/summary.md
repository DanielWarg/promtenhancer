# Run Summary

**Run ID:** challenge_test_2_2025-12-19_131543
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:15:58.112Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 90 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 82 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om deras verkliga beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan uppfattningen om mod och det faktiska beteendet, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "bygger upp en mur av osäkerhet" och "dyka ner i ett djupt hav", som bär insikter om konflikträdsla och skapar igenkänning. Dessa metaforer stannar kvar och uppmanar till reflektion kring undvikande beteenden.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren istället för att ta direktkontakt  
– skickar passivt aggressiva meddelanden i Slack  
– skjuter upp viktiga diskussioner med "vi tar det sen" –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Avsändaren pekar finger och ställer frågor som kan uppfattas som dömande. Det finns inslag av inkluderande språk, men tonen är övergripande mer konfrontativ.
