# Run Summary

**Run ID:** challenge_test_5_2025-12-19_105950
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:59:59.858Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 73 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om deras beteende och avslöjar en motsättning mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "osagda ord som en tung ryggsäck" och "konflikter är som stormar", som bär insikter om kommunikation och konflikthantering. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiva meddelanden i Slack.  
– Tysta viskningar i korridoren.  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 60/100 (threshold: 70). Inkluderande språk med 'vi', men en del överpedagogiska inslag. Tonen är reflekterande men kan uppfattas som något dömande.
