# Run Summary

**Run ID:** challenge_test_4_2025-12-19_133742
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:37:52.674Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 90 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 94 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Den negativa kontrasten mellan påståendet och verkligheten skapar friktion och engagemang.
- **W005** (llm_judge, weight: 30): . Metaforen "bygga upp små berg av frustration" är konkret och visuell, bär en insikt om att undvikande beteende leder till ackumulerade problem, och skapar igenkänning hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Inkluderande 'vi' skapar gemenskap. Avsändaren delar egen erfarenhet och lärdomar.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiva meddelanden i Slack
 – Tysta i möten, men viskar i korridoren
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Det är dags att
