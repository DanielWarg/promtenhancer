# Run Summary

**Run ID:** brev_test_level_3_2025-12-19_140810
**Profile:** brev
**Timestamp:** 2025-12-19T13:08:21.910Z

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
- **B002** (heuristic, weight: 18): Found 4 micro-details: morgon, kopp, kall
- **G001** (heuristic, weight: 6): No cloning detected
- **B005** (llm_judge, weight: 55): . Texten visar en tydlig rörelse från känslor av skuld och krav till en acceptans av mänsklighet och sårbarhet, vilket ger läsaren tillåtelse att vara sig själv utan att det känns påklistrat. Vändningen känns äkta och ger en känsla av gemenskap i den delade erfarenheten.
- **B008** (llm_judge, weight: 45): . Texten innehåller konkreta detaljer om en vardaglig situation och tillåter en reflekterande och mänsklig ton, vilket skapar en känsla av äkthet och närhet.
- **B001** (regex, weight: 18): Found: "Till dig som"
- **B004** (regex, weight: 14): Found: "Jag minns"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (2)
- **B003** (heuristic, weight: 16): Line breaks: 5/8, Lonely sentences: 2/3
- **B007** (heuristic, weight: 6): Length: 1209 chars (target: 800-1200)
