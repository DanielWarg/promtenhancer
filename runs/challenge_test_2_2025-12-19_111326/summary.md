# Run Summary

**Run ID:** challenge_test_2_2025-12-19_111326
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:13:36.385Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Den framhäver också en kontrast mellan att påstå sig vara öppen och det faktiska beteendet.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "ta tjuren vid hornen" och "kliva ut på en isflak", som bär insikter om att konfrontera svåra situationer. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen"… som om det skulle försvinna av sig självt.  
 – Tystnaden som sänker sig i mötet när det verkligen behövs en röst.  
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande 'vi' och personlig erfarenhet, men en del pekande formuleringar. Tonen är delvis pedagogisk och uppmanande.
