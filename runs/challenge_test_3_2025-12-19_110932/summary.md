# Run Summary

**Run ID:** challenge_test_3_2025-12-19_110932
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:09:42.394Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 79 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan det de säger och hur de agerar.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att stänga in en storm i ett rum" och "som en dålig låt du inte kan få ur huvudet", som bär insikter om konflikthantering och kommunikation. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skickar passivt aggressiva meddelanden i Slack.
– Du pratar i korridoren, men tystnar i mötet.
–"
- **W004** (regex, weight: 15): Found: "
Nej."

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 55/100 (threshold: 70). Inkluderande 'vi' men med starka inslag av dömande. Avsändaren delar egen erfarenhet men använder en pedagogisk ton.
- **W006** (regex, weight: 15): Pattern not found: (\/[A-ZÅÄÖ]|\n\/)
