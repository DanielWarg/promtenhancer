# Run Summary

**Run ID:** brev_test_level_2_2025-12-19_145948
**Profile:** brev
**Timestamp:** 2025-12-19T13:59:56.767Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 78 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 87 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **B001a** (heuristic, weight: 12): Opening has emotional closeness
- **B002** (heuristic, weight: 18): Found 4 micro-details: Klockan, kopp, kall
- **G001** (heuristic, weight: 6): No cloning detected
- **B005** (llm_judge, weight: 55): . Texten visar en genuin vändning från skuld och stress till en acceptans av mänsklighet, där läsaren får tillåtelse att känna och vara i sin situation utan press att förändra den. Reflektionen känns äkta och relaterbar, vilket ger en känsla av gemenskap och förståelse.
- **B008** (llm_judge, weight: 45): . Texten innehåller konkreta detaljer om vardagen och känslor, vilket ger en genuin och stillsam reflektion över livets utmaningar. Tonen är varm och empatisk, utan att vara forcerad eller klyschig.
- **B001** (regex, weight: 18): Found: "Till dig som"
- **B004** (regex, weight: 14): Found: "Jag minns"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (2)
- **B003** (heuristic, weight: 16): Line breaks: 5/8, Lonely sentences: 2/3
- **B007** (heuristic, weight: 6): Length: 1217 chars (target: 800-1200)
