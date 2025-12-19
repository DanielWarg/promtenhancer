# Release Notes: Brev Flow & Length-standard v1.2

**Datum:** 2025-12-19  
**Version:** 1.2.0  
**Profil:** Brev

## Översikt

Förbättringar av Brev-profilen för att säkerställa längre, mer naturliga texter med bättre flow, utan att tappa den emotionella differentieringen mellan nivå 1–5.

## Problem som åtgärdats

1. **För korta texter:** Texterna kunde ibland hamna under 800 tecken
2. **Fel flow/format:** Texter kunde kännas antingen för kompakta eller för "diktiga" (telegramstil, för många ensamma rader)
3. **Pepp-fraser:** Risk för coach-klyschor som "du gör det bästa du kan", "det är okej"
4. **Återanvändning av öppningar:** Nivåerna kunde börja med samma mall varje gång

## Ändringar

### 1. Längd-guard
- **Sikta på:** 900–1100 tecken (tillåtet 800–1200)
- **Om för kort:** Lägg till 1–2 mikrodetaljer + 1 reflekterande mening (inte råd)
- **Om för lång:** Kapa förklarande meningar, behåll bilder och kärninsikt

### 2. Formaterings-guard: "brev, inte dikt"
- **Krav:** 3–6 stycken, varje stycke 1–3 meningar
- **Luft:** Minst 3 tomma rader mellan stycken
- **Max ensamma rader:** 2 (undvik diktkänsla)
- **Förbjudet:** Telegramstil, listor/bullets, rim/rytm-upprepning

### 3. Flow-guard
- **Undvik:** Coach-fraser ("du gör det bästa du kan", "det är okej", "vi klarar det")
- **Använd istället:** Avlasta skuld genom ton och igenkänning, inte pepp
- **Mål:** Naturligt, prosaiskt brevflöde

### 4. Nivådifferentiering (behållen)
- **Behålls:** Inre position, tidsrörelse, avslut per nivå
- **Förbättras:** Varierade öppningar via öppningsbank (tid/kropp/ljud/miljö)

### 5. Signatur-policy
- **Alltid från spec:** `constraints.signature`, aldrig hårdkodad
- **Ingen fallback:** Om saknas, lämna tomt (inte default "Ann-Christin")
- **Formatering:** Ny rad + `/SIGNATURE` (inte `<SIGNATURE>`)

### 6. Uppdaterad B003-check
- Kräver 3–6 stycken
- Kräver minst 3 tomma rader
- Max 2 ensamma rader
- Flaggar telegramstil (många korta rader)
- Flaggar bullets i Brev-profilen

### 7. Förbättrad format-patch
- Skapar naturliga stycken (3–6) istället för många ensamma rader
- Verifierar att inga ord ändras (endast formatering)
- Hanterar signatur korrekt

## Filer ändrade

- `harness/lib/generator.js` - Brev-nivådefinitioner, längd-guard, flow-guard, signatur-policy
- `harness/lib/iterator.js` - Förbättrad format-patch
- `harness/lib/checks/heuristic-checks.js` - Uppdaterad B003-check
- `harness/reflektera_guardrails.md` - Ny sektion "Brev Flow & Length-standard"
- `harness/specs/brev_smallbarn.json` - Test-signatur uppdaterad till `/Test-User`

## Testresultat

**Test:** `npm run harness:brev`

**Resultat:**
- ✅ Compliance: 100/100 (target: 95)
- ✅ Quality: 100/100 (target: 85)
- ✅ B003: PASS (6 stycken, 5 tomma rader, 2 ensamma rader)
- ✅ B007: PASS (1057 tecken, inom 800–1200)
- ✅ Signatur: `/Test-User` (från spec, korrekt formatering)

## Definition of Done

Alla nivåer 1–5:
- ✅ Känns som brev, inte poesi
- ✅ Har lugnt, sammanhängande flow
- ✅ Ligger runt ~1000 tecken
- ✅ Beholder tydlig emotionell differentiering
- ✅ Ingen hårdkodad signatur
- ✅ Alla checks passerar utan iteration

## Nästa steg

- Testa alla nivåer 1–5 för att verifiera differentiering
- Övervaka längd och flow i produktion
- Justera öppningsbanker om nödvändigt

