# Run Summary

**Run ID:** brev_test_level_5_2025-12-19_150017
**Profile:** brev
**Timestamp:** 2025-12-19T14:00:28.012Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 84 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 90 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **B001a** (heuristic, weight: 12): Opening has emotional closeness
- **B002** (heuristic, weight: 18): Found 4 micro-details: morgon, kopp, varm
- **B007** (heuristic, weight: 6): Length: 982 chars (target: 800-1200)
- **G001** (heuristic, weight: 6): No cloning detected
- **B005** (llm_judge, weight: 55): . Texten visar en tydlig rörelse från känslan av skuld och krav till en acceptans av mänsklighet och tillåtelse, vilket känns genuint och äkta. Läsaren får en känsla av att det är okej att inte alltid leva upp till förväntningarna, utan att det är en del av livet.
- **B008** (llm_judge, weight: 45): . Texten innehåller konkreta detaljer som tid och känslor, vilket skapar en autentisk och mänsklig reflektion över vardagslivets utmaningar. Tonen är varm och empatisk utan att vara överdrivet positiv eller klyschig.
- **B001** (regex, weight: 18): Found: "Du som"
- **B004** (regex, weight: 14): Found: "Jag minns"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (1)
- **B003** (heuristic, weight: 16): Line breaks: 4/8, Lonely sentences: 2/3
