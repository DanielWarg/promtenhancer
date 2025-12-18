# Run Summary

**Run ID:** 2025-12-18_164411
**Profile:** brev
**Timestamp:** 2025-12-18T15:44:30.985Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |

## Check Results

### ✅ Passed (10)
- **B001a** (heuristic, weight: 12): Opening has emotional closeness
- **B002** (heuristic, weight: 18): Found 4 micro-details: morgon, termometer, kall
- **B003** (heuristic, weight: 16): Line breaks: 15/8, Lonely sentences: 8/3
- **B007** (heuristic, weight: 6): Length: 1147 chars (target: 800-1200)
- **G001** (heuristic, weight: 6): No cloning detected
- **B005** (llm_judge, weight: 55): . Texten visar en tydlig rörelse från skuld och stress till acceptans av mänsklighet, där läsaren får tillåtelse att prioritera det som verkligen betyder något. Reframingen känns äkta och ger en känsla av gemenskap utan att bli peppig.
- **B008** (llm_judge, weight: 45): . Texten innehåller konkreta detaljer om en specifik situation och känslor, vilket ger en genuin och mänsklig ton. Den tillåter komplexitet och reflektion utan att falla i klyschor eller tomma uppmaningar.
- **B001** (regex, weight: 18): Found: "Du som"
- **B004** (regex, weight: 14): Found: "Jag minns"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 84
- Quality: 100
- Total: 90
- Failed: B003

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** format
  - Location: full
  - Lines changed: 28
