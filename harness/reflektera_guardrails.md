# Reflektera Guardrails v1.1

## A. Tonal DoD

### A1. Warm Provocation (DoD)

**Målet är spegel, inte dom:** läsaren ska känna "aj… sant" snarare än "nu blev jag tillrättavisad".

**Obligatoriskt:**
* Avslöjande hook i första 2–3 meningarna (W001).
* Vardagsmiljö (Slack/Teams/korridor/möte).
* Lista med tankstreck (3–5 rader).
* Rytmisk paus ("Nej." / "Nej nej." / "Exakt.") på egna rader.
* Minst en metafor som bär insikt (W005) — konkret, inte pynt.
* Självinvolvering ("jag har också…", "jag kallade det…") så att avsändaren står med läsaren, inte över.

**Förbjudet:**
* Imperativ, fingerpekning, "du borde/måste", "det är dags att", "prova att", "tänk om du…" (W007b).
* Coaching-tone, "tips/3 steg", uppmaningar förklädda som frågor.
* Pepp/klyschor.

### A2. Brev (DoD)

**Målet är emotionell närhet och mikrosituationer, inte tes/ledarskapsråd.**

**Obligatoriskt:**
* Direkt tilltal tidigt ("Du som…" / "Till dig som…").
* 2–3 mikrodetaljer (tid/plats/kropp/föremål).
* Naturligt brevflöde: 3–6 stycken med luft mellan.
* Sårbar auktoritet ("Jag har varit där…", minns-känsla).
* Mjuk slutsats (ingen hård CTA).
* Längd: 900–1100 tecken (tillåtet 800–1200).

**Förbjudet:**
* Pepp, affisch-ton, "du klarar det", "du gör det bästa du kan", "det är okej", "vi klarar det".
* Telegramstil ("Kaffe. Kallt. Möte.").
* Listor eller bullets (Warm kan ha bullets, Brev får inte).
* För många ensamma rader som skapar diktkänsla (max 2).
* Rim/rytm-upprepning som känns "dikt".
* Coach-fraser och uppmuntrande klyschor.

**Brev Flow & Length-standard:**
* **Längd-guard:** Sikta på 900–1100 tecken. Om < 800: lägg till 1–2 mikrodetaljer + 1 reflekterande mening (inte råd). Om > 1200: kapa förklarande meningar, behåll bilder och kärninsikt.
* **Formatering:** 3–6 stycken, varje stycke 1–3 meningar. Minst 3 tomma rader (luft mellan stycken). Max 2 ensamma rader. Förbjud telegramstil och för korta fraser på rad.
* **Flow:** Skriv som ett brev, inte LinkedIn, inte poesi. Undvik rim/rytm-upprepning. Avlasta skuld genom ton och igenkänning, inte genom pepp.
* **Nivådifferentiering:** Behåll nivåernas "inre position" men variera öppningar (öppningsbank per nivå: tid/kropp/ljud/miljö).
* **Signatur:** Alltid från `constraints.signature` i spec, aldrig hårdkodad. Formatering: ny rad + `/SIGNATURE` (inte `<SIGNATURE>`, inte utan snedstreck). Om saknas: lämna tomt.

---

## B. Eskaleringsregler (Warm Provocation nivå 1–5)

**Gemensam princip:** varje nivå ska vara en distinkt retorisk konstruktion. Anta att nivåerna jämförs sida vid sida.

### Nivå 1 – Varsam spegel (trygg igenkänning)

* Observation, låg friktion, mjuk kontrast.
* Ingen "social skam", ingen hård konsekvens.
* Självinvolvering tidigt.

### Nivå 2 – Mjuk friktion (lätt kontrast)

* "Du säger X… men Y händer ofta."
* Konsekvens antyds, inte spikas.
* Varma formuleringar + spegelfråga.

### Nivå 3 – Avslöjande spegel (tydlig friktion)

* Skarpare avslöjande, tydligare kontrast, kortare meningar.
* Konsekvens tydlig men fortfarande human.

### Nivå 4 – Konfrontation (ifrågasättande)

* Direkt "titta närmare"-känsla.
* Konsekvens uttalas tydligt (vad det gör med relationer/rum), men utan etiketter om personen.
* Självinvolvering kvar och tidig.

### Nivå 5 – Kaxig spegel (avslöjar hyckleri, på gränsen)

**Maxnivå = avslöjande utan etiketter.** Den ska vara kaxig i igenkänningen, inte elak i omdömen.

**Obligatorisk hook-struktur** (måste ske i hooken eller direkt efter, aldrig senare än första stycket):

1. **Gemensamt självbedrägeri** (vi-form eller "du kallar det…")
2. **Social spegel** (andra ser effekten)
3. **Självinvolvering som erkännande** (avsändaren erkänner att den själv använde samma ord)

**Exempel (tillåten):**
"Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad."

**Inte tillåten:**
"Du kallar det diplomati. Dina kollegor kallar det feghet." (etikettar läsaren/andra)

**Konsekvens måste vara konkret och social** (relation/retros/mötesrum), inte moralisk ("du är problemet").

**Metafor ska vara hård och konkret** (rollspel, manus, kuliss, brandlarm, etc) men inte förolämpande.

**Avsluta med obekväm spegelfråga utan krav:** "Vad säger det att…?" "Vad försvarar du när…?" Inte "Vad ska du göra nu?"

**Smutsig friktion (tillåtet för nivå 5):**
* **Parentetiska stick (1-2 korta):** Lägg in 1-2 korta parentetiska stick för att skapa mer mänsklig friktion och närvaro. Exempel: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)", "(Jag vet.)", "(Och ja, jag sa det.)". Men utan att bli dryg eller överdriven. Placeras naturligt i hooken eller direkt efter självinvolveringen.
* **Rumsnärvaro:** Slack/Teams/korridor/möte ska kännas som en scen med beteenden som känns "pinsamt sanna". Varje abstrakt påstående måste följas av konkret exempel från rummet/scenen. Exempel: ❌ "Det är en maskerad rädsla för att ta de jobbiga samtalen." (för abstrakt) ✅ "Det är en maskerad rädsla för att ta de jobbiga samtalen. Vi pratar i korridoren, skickar passivt aggressiva meddelanden i Slack, eller skjuter upp möten med ett snällt 'vi tar det sen'." (konkret scen)
* **Rytm:** Fler korta rader, hårdare paus ("Nej.") och tydligare "slag". Varierad rytm och mer "röst" (inte bara resonemang). Kaxig friktion genom kontrast och spegel, inte genom order eller föreläsning.
* **Undvik abstrakta ord utan konkret scen:** Undvik abstrakta ord som "effekt", "maskerad rädsla", "i själva verket" om de inte följs av konkret scen. Texten ska kännas som någon som står mitt i rummet och säger det som ingen vill höra, inte som en snygg text om fenomenet.

**För mycket (FAIL-korridor för nivå 5):**
* **Kall etikettering:** "Du är feg", "Du är problemet", "Du saknar ryggrad" (etikettar läsaren direkt)
* **Coach-uppräkningar:** "Modet är att… Att… Att…" (föreläsande ton, för mycket struktur)
* **För abstrakt utan konkret scen:** "Det är en maskerad rädsla för att ta de jobbiga samtalen." (saknar konkret exempel från rummet/scenen)
* **För många parentetiska stick:** Mer än 2-3 parentetiska stick gör texten dryg och överdriven
* **Imperativ/coaching:** "Du borde…", "sluta…", "gör så här…" (redan förbjudet, men extra viktigt för nivå 5)

---

## C. Brev Flow & Length-standard

### C1. Längd-guard

**Mål:** 900–1100 tecken (tillåtet 800–1200)

**Om text < 800:**
* Lägg till 1–2 mikrodetaljer (tidpunkt, kropp, rum, ljud)
* Fördjupa en befintlig tanke (inte ny insikt)
* Lägg till 1 reflekterande mening (inte råd)

**Om text > 1200:**
* Ta bort förklarande meningar (meta)
* Behåll känsla och observation
* Kapa resonemang, behåll bilder och kärninsikt

### C2. Formaterings-guard: "brev, inte dikt"

**Krav:**
* 3–6 stycken totalt
* Varje stycke: 1–3 meningar
* Minst 3 tomma rader (luft mellan stycken)
* Max 2 ensamma rader totalt

**Förbjudet:**
* Telegramstil ("Kaffe. Kallt. Möte.")
* Listor eller bullets (Warm kan ha bullets, Brev får inte)
* För många korta rader som skapar diktkänsla
* Rim/rytm-upprepning som känns "dikt"

**Målet:** Lugnt, prosaiskt brevflöde med luft mellan stycken

### C3. Flow-guard: Brev, inte LinkedIn eller poesi

**Undvik:**
* Coach-fraser: "du gör det bästa du kan", "det är okej", "vi klarar det", "du klarar det", "tro på dig själv"
* Uppmuntrande klyschor som avlastar skuld genom pepp
* Rim/rytm-upprepning som skapar diktkänsla

**Använd istället:**
* Avlasta skuld genom ton och igenkänning
* Naturligt, prosaiskt brevflöde
* Skriv som ett brev, inte LinkedIn, inte poesi

### C4. Nivådifferentiering (behåll exakt)

**Ändra INTE:**
* Inre position per nivå
* Tidsrörelse (nu / distans / efterhand / system / försoning)
* Avslutens funktion per nivå

**Ändra ENDAST:**
* Längd
* Styckeindelning
* Flow mellan meningar
* Variera öppningar (öppningsbank per nivå: tid/kropp/ljud/miljö)

### C5. Signatur-policy

* Signatur kommer alltid från `constraints.signature` i spec, aldrig hårdkodad
* Aldrig default "Ann-Christin"
* Om signature saknas: lämna tomt (ingen fallback)
* Formatering: ny rad + `/SIGNATURE` (inte `<SIGNATURE>`, inte utan snedstreck)

### C6. Checks (B003)

B003 ska fånga "flow inte dikt":
* a) 3–6 stycken
* b) minst 3 tomma rader
* c) max 2 ensamma rader
* d) flagga telegramstil (många rader med 1–3 ord)
* e) flagga bullets i Brev

### C7. Format-patch

Om modellen ändå levererar för kompakta rader eller "dikt":
* Enbart justera radbrytningar och styckeindelning (inte byta ord)
* Resultat: 3–6 stycken och läsbart
* Verifiera att inga ord ändras (endast formatering)

---

## D. Förbud mot återanvändning (Unika nivåer)

* **Förbjudet** att återanvända identiska meningar, hooks, metaforer eller listor mellan nivåer 1–5.
* Anta att alla fem nivåer granskas sida vid sida.
* Om samma idé måste återkomma, måste den byggas om retoriskt (ny struktur, nya bilder, nytt språk).

---

## E. Signatur-policy (allmän)

* Signatur får **ALDRIG** hårdkodas.
* Signatur kommer alltid från `post_spec.constraints.signature` (name + tagline).
* Om signature saknas i spec: rendera ingen signatur alls (hellre tomt än default).
* Detta gäller även dummy/offline-output.
* För Brev-profilen: Formatering är ny rad + `/SIGNATURE` (inte `<SIGNATURE>`, inte utan snedstreck).

---

## F. Acceptabel provokation vs för mycket

### Acceptabel (PASS-korridor):

* Avslöjar självbedrägeri + visar konsekvens.
* Kaxig, kort, vass — men med tydlig "jag har varit där"-position.
* Spegel: läsaren drar slutsatsen själv.

### För mycket (FAIL-korridor):

* Identitetsomdömen eller förolämpningar ("du är feg", "du är problemet", "du saknar ryggrad").
* Imperativ/coaching ("du borde…", "sluta…", "gör så här…").
* Moraliserande överläge ("ni måste förstå att…").
* Hot/utskämning/"call-out"-kultur.

---

## Implementation

Dessa guardrails implementeras i:
* `harness/lib/generator.js` - Prompt-byggning
* `harness/lib/iterator.js` - Patch-logik
* `harness/lib/checks/llm-judge.js` - W007 bedömning

Testas via:
* `harness/test_challenge_levels.js` - Uniqueness/escalation/compliance
