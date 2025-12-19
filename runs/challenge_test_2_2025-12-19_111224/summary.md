# Run Summary

**Run ID:** challenge_test_2_2025-12-19_111224
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:12:37.198Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan självbild och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Den framhäver en friktion mellan uppfattning och handling, vilket gör den engagerande.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "irritation växa, som ogräs i en trädgård" och "kliva ut på en osäker bro", som båda bär insikter om kommunikationens svårigheter och vikten av att konfrontera problem. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren istället för att ta det direkt  
– skickar passivt aggressiva meddelanden i Slack  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 60/100 (threshold: 70). Inkluderande 'vi' används, men tonen är något överpedagogisk. Avsändaren delar egen erfarenhet, vilket skapar igenkänning.
