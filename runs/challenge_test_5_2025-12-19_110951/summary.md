# Run Summary

**Run ID:** challenge_test_5_2025-12-19_110951
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:10:02.670Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och hur de uppfattas av andra, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan att vilja framstå som konflikträdd och den verkliga dynamiken i arbetsmiljön.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "det här är inte samarbete. Det är en teater där vi spelar roller" vilket bär insikt om ytliga interaktioner och skapar igenkänning kring konflikter i arbetsmiljön.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du nickar medhållande, men innerst inne känner du att något skaver.  
– Du undviker ögonkontakt, men vet att det är en ljuspunkt i mörkret.  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren pekar finger och dömer andra. Tonen känns distanserad och föreläsande.
