# Challenge Levels Test Results

## Testkörning: 2025-12-19

### Testkonfiguration
- **Profil:** Warm Provocation
- **Ämne:** Konflikträdsla på jobbet
- **Signatur test:** Test-User (Test tagline för att verifiera att signatur inte är hårdkodad)
- **API-nyckel:** Laddad från `.env` i root

### Resultat per nivå

#### Nivå 1 (Varsam spegel)
- **Hook:** "Det är lätt att ibland undvika jobbiga samtal. Att säga att man är öppen, men ändå gå omvägar..."
- **Compliance:** 60/100
- **Quality:** SKIPPED (LLM disabled i testet)
- **Signatur:** ✅ OK (kommer från spec)
- **Eskalering:** ✅ Varsam (mjuk hook-struktur)

#### Nivå 2 (Mjuk friktion)
- **Hook:** "Du säger att du är öppen för feedback. Men är du det verkligen..."
- **Compliance:** 75/100
- **Quality:** SKIPPED
- **Signatur:** ✅ OK
- **Eskalering:** ✅ Mild kontrast introducerad

#### Nivå 3 (Avslöjande spegel)
- **Hook:** "Du är inte konflikträdd. Du är konfliktointresserad..."
- **Compliance:** 75/100
- **Quality:** SKIPPED
- **Signatur:** ✅ OK
- **Eskalering:** ✅ Tydlig kontrast, avslöjande

#### Nivå 4 (Konfrontation)
- **Hook:** "Du säger att du är öppen – men du är det inte. Du säger att du vill ha ärlighet – men bara när det passar..."
- **Compliance:** 75/100
- **Quality:** SKIPPED
- **Signatur:** ✅ OK
- **Eskalering:** ✅ Stark kontrast, konfrontativ

#### Nivå 5 (Kaxig spegel)
- **Hook:** "Du kallar det professionalism. Det är feghet med kalenderinbjudan..."
- **Compliance:** 75/100
- **Quality:** SKIPPED
- **Signatur:** ✅ OK
- **Eskalering:** ✅ Kaxig pattern, korta meningar

### Uniqueness-kontroll

**Overlap mellan nivåer:**
- Nivå 1 ↔ Nivå 2: 54.5% ⚠️ (HÖG)
- Nivå 1 ↔ Nivå 3: 33.3% ⚠️
- Nivå 1 ↔ Nivå 4: 28.6% ⚠️
- Nivå 1 ↔ Nivå 5: 30.8% ⚠️
- Nivå 2 ↔ Nivå 3: 41.7% ⚠️
- Nivå 2 ↔ Nivå 4: 28.6% ⚠️
- Nivå 2 ↔ Nivå 5: 30.8% ⚠️
- Nivå 3 ↔ Nivå 4: 35.7% ⚠️
- Nivå 3 ↔ Nivå 5: 46.2% ⚠️
- Nivå 4 ↔ Nivå 5: 35.7% ⚠️

**Max overlap:** 54.5% (mål: < 20%)
**Status:** ❌ FAIL - Overlap för hög

**Anmärkning:** Dummy output har naturligtvis hög overlap eftersom det är hårdkodade exempel. Med riktig LLM-generation förväntas overlap vara lägre.

### Eskaleringskontroll

- **Nivå 1 (varsam):** ✅ - Mjuk hook-struktur utan starka negationer
- **Nivå 5 (kaxig):** ✅ - Kaxig pattern ("Du kallar det X. Det är Y."), korta meningar

### Signatur-kontroll

✅ **Alla nivåer:** Signatur kommer från spec (`Test-User`), inte hårdkodad

### Implementerade funktioner

1. ✅ **UI-slider uppdaterad** - Visar nivå-specifik beskrivning (1-5)
2. ✅ **Eskaleringslogik i generator.js** - Retorisk skärpa, hook-eskalering, språklig återanvändning
3. ✅ **Signatur från spec** - Alla fallback till 'Ann-Christin' borttagna
4. ✅ **Test-script** - `harness/test_challenge_levels.js` med uniqueness/escalation/compliance checks
5. ✅ **Master Plan uppdaterad** - Instruktioner om .env och API-nyckel

### Nästa steg

1. **För riktiga tester med LLM:**
   - Verifiera att `.env` läses korrekt i `generator.js`
   - Köra `npm run harness:test:challenge` med riktig API-nyckel
   - Verifiera att overlap < 20% med faktiska genererade texter

2. **Förbättra uniqueness:**
   - Uppdatera prompt-instructioner för att vara mer explicit om att varje nivå måste vara unik
   - Öka skillnaden i retorisk konstruktion mellan nivåer

3. **CI-integration:**
   - Lägg till `harness:test:challenge` i GitHub Actions
   - Kräv `OPENAI_API_KEY` secret för challenge-levels tester

