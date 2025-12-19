# Run Summary

**Run ID:** challenge_test_5_2025-12-19_111056
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:11:05.912Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 60 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 64 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar ett självbedrägeri genom att kontrastera mellan självbild och andras uppfattning, vilket skapar friktion och får läsaren att känna sig sedd.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "det är rollspel" och "konflikterna ruttnar", som bär insikter om ytliga interaktioner och bristen på äkta samarbete. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren genom att belysa en vanlig arbetsplatsdynamik.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du viskar i korridoren, men tystnar i mötet. 
– Du skriver passivt aggressiva meddelanden i Slack. 
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Det är dags att
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Fingerpekning, avsändaren står utanför. Skuldbeläggande ton genom att ifrågasätta läsarens beteende.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)
