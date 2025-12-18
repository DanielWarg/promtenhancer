<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Prompt Enhancer - Creator Studio

En AI-driven applikation som omvandlar vaga idéer till perfekt strukturerade Super-Prompts baserat på avancerad prompt engineering-metodik.

## 🚀 Snabbstart

**Förutsättningar:** Node.js 18+ installerat

### 1. Installera dependencies
```bash
npm install
```

### 2. Konfigurera API-nyckel

Kopiera `.env.example` till `.env`:
```bash
cp .env.example .env
```

Redigera `.env` och lägg till din OpenAI API-nyckel:
```
OPENAI_API_KEY=din_api_nyckel_här
PORT=3001
```

**Hämta API-nyckel:** https://platform.openai.com/api-keys

### 3. Starta applikationen

**Alternativ A: Starta både backend och frontend samtidigt (rekommenderat)**
```bash
npm run dev:all
```

**Alternativ B: Starta separat**

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Öppna applikationen

Frontend: http://localhost:3000  
Backend API: http://localhost:3001

## 📁 Projektstruktur

```
├── server/           # Backend API (Express)
│   ├── index.js     # API endpoints
│   └── constants.js # System instructions
├── components/       # React-komponenter
├── services/         # Frontend services
├── .env.example      # Mall för environment variables
└── vite.config.ts    # Vite-konfiguration
```

## 🔒 Säkerhet

**VIKTIGT:** API-nyckeln hanteras nu säkert via backend. Den exponeras INTE i frontend-koden.

- Backend körs på port 3001
- Frontend proxar API-anrop till backend
- API-nyckel finns endast i `.env` (som inte committas)

## 🛠️ Development Scripts

- `npm run dev` - Starta endast frontend
- `npm run dev:server` - Starta endast backend
- `npm run dev:all` - Starta både frontend och backend
- `npm run build` - Bygg för produktion
- `npm run preview` - Förhandsgranska produktionsbuild

## 📝 Deployment

Se `PRODUKTIONSUTVARDERING.md` för detaljerad deployment-guide.
