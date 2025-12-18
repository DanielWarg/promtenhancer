import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Generate super prompt endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { 
      userInput, 
      method, 
      mode, 
      channel, 
      tone, 
      audience, 
      temperature 
    } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: 'userInput är obligatoriskt' });
    }

    // Import system instruction function
    const { getSystemInstruction } = await import('./constants.js');
    
    const systemInstruction = getSystemInstruction(
      channel || 'general',
      mode || 'create',
      tone || 'leader',
      audience || '',
      method || 'Automatisk (AI bestämmer)'
    );

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userInput }
      ],
      temperature: temperature || 0.7,
    });

    const text = response.choices[0]?.message?.content || "Kunde inte generera ett svar. Försök igen.";
    
    res.json({ text });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ 
      error: "Ett fel uppstod vid kommunikation med AI-tjänsten.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Run generated prompt endpoint
app.post('/api/run', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt är obligatoriskt' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    const text = response.choices[0]?.message?.content || "Ingen utdata genererades.";
    
    res.json({ text });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ 
      error: "Kunde inte köra prompten.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server körs på http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});

