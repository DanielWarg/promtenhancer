import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Harness root directory
const HARNESS_ROOT = path.resolve(__dirname, '..', 'harness');
const RUNS_DIR = path.join(HARNESS_ROOT, 'runs');

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

// ============================================================================
// HARNESS API ENDPOINTS
// ============================================================================

/**
 * Create a new run directory with timestamp
 */
function createRunDir() {
  const now = new Date();
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  
  const runDir = path.join(RUNS_DIR, formatted);
  fs.mkdirSync(runDir, { recursive: true });
  
  // Update 'latest' file
  const latestPath = path.join(RUNS_DIR, 'latest');
  fs.writeFileSync(latestPath, formatted);
  
  return runDir;
}

/**
 * POST /api/harness/generate
 * Generate output from a post_spec
 */
app.post('/api/harness/generate', async (req, res) => {
  try {
    const { postSpec } = req.body;
    
    if (!postSpec || !postSpec.profile) {
      return res.status(400).json({ error: 'postSpec med profile är obligatoriskt' });
    }
    
    // Create run directory
    const runDir = createRunDir();
    
    // Save spec to run directory
    const specPath = path.join(runDir, 'post_spec.json');
    fs.writeFileSync(specPath, JSON.stringify(postSpec, null, 2));
    
    // Import and call generator
    const { generate } = await import('../harness/lib/generator.js');
    const result = await generate(specPath, runDir);
    
    // Read generated files
    const output = fs.readFileSync(path.join(runDir, 'output_v1.txt'), 'utf-8');
    const internalPrompt = fs.readFileSync(path.join(runDir, 'internal_prompt_v1.txt'), 'utf-8');
    
    res.json({
      success: true,
      runId: path.basename(runDir),
      runDir,
      output,
      internalPrompt,
      isDummy: result.isDummy || false
    });
  } catch (error) {
    console.error('Harness generate error:', error);
    res.status(500).json({ 
      error: 'Kunde inte generera output',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/harness/eval
 * Evaluate a run
 */
app.post('/api/harness/eval', async (req, res) => {
  try {
    const { runId, complianceTarget = 95, qualityTarget = 85 } = req.body;
    
    if (!runId) {
      return res.status(400).json({ error: 'runId är obligatoriskt' });
    }
    
    const runDir = path.join(RUNS_DIR, runId);
    if (!fs.existsSync(runDir)) {
      return res.status(404).json({ error: `Run ${runId} finns inte` });
    }
    
    // Import and call evaluator
    const { evaluate } = await import('../harness/lib/evaluator.js');
    const results = await evaluate(runDir, {
      complianceTarget,
      qualityTarget
    });
    
    // Read summary if exists
    const summaryPath = path.join(runDir, 'summary.md');
    const summary = fs.existsSync(summaryPath) 
      ? fs.readFileSync(summaryPath, 'utf-8')
      : null;
    
    res.json({
      success: true,
      runId,
      results,
      summary
    });
  } catch (error) {
    console.error('Harness eval error:', error);
    res.status(500).json({ 
      error: 'Kunde inte utvärdera run',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/harness/iterate
 * Iterate on a run
 */
app.post('/api/harness/iterate', async (req, res) => {
  try {
    const { runId, complianceTarget = 95, qualityTarget = 85, maxIterations = 3 } = req.body;
    
    if (!runId) {
      return res.status(400).json({ error: 'runId är obligatoriskt' });
    }
    
    const runDir = path.join(RUNS_DIR, runId);
    if (!fs.existsSync(runDir)) {
      return res.status(404).json({ error: `Run ${runId} finns inte` });
    }
    
    // Import and call iterator
    const { iterate } = await import('../harness/lib/iterator.js');
    const result = await iterate(runDir, {
      complianceTarget,
      qualityTarget,
      maxIterations
    });
    
    // Read updated summary and diff
    const summaryPath = path.join(runDir, 'summary.md');
    const diffPath = path.join(runDir, 'diff.md');
    const summary = fs.existsSync(summaryPath) 
      ? fs.readFileSync(summaryPath, 'utf-8')
      : null;
    const diff = fs.existsSync(diffPath)
      ? fs.readFileSync(diffPath, 'utf-8')
      : null;
    
    // Read all output versions
    const outputs = {};
    for (let i = 1; i <= result.iterations.length; i++) {
      const outputPath = path.join(runDir, `output_v${i}.txt`);
      if (fs.existsSync(outputPath)) {
        outputs[`v${i}`] = fs.readFileSync(outputPath, 'utf-8');
      }
    }
    
    res.json({
      success: true,
      runId,
      result,
      summary,
      diff,
      outputs
    });
  } catch (error) {
    console.error('Harness iterate error:', error);
    res.status(500).json({ 
      error: 'Kunde inte iterera run',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/harness/run
 * Full run: generate + eval + iterate
 */
app.post('/api/harness/run', async (req, res) => {
  try {
    const { postSpec, complianceTarget = 95, qualityTarget = 85, maxIterations = 3 } = req.body;
    
    if (!postSpec || !postSpec.profile) {
      return res.status(400).json({ error: 'postSpec med profile är obligatoriskt' });
    }
    
    // Step 1: Generate
    const runDir = createRunDir();
    const specPath = path.join(runDir, 'post_spec.json');
    fs.writeFileSync(specPath, JSON.stringify(postSpec, null, 2));
    
    const { generate } = await import('../harness/lib/generator.js');
    const genResult = await generate(specPath, runDir);
    
    // Step 2: Evaluate
    const { evaluate } = await import('../harness/lib/evaluator.js');
    const evalResult = await evaluate(runDir, {
      complianceTarget,
      qualityTarget
    });
    
    // Step 3: Iterate if needed
    const complianceMet = evalResult.scores.compliance_score >= complianceTarget;
    const qualitySkipped = evalResult.scores.quality_status === 'SKIPPED';
    const qualityMet = qualitySkipped ? null : evalResult.scores.quality_score >= qualityTarget;
    
    let iterResult = null;
    if (!(complianceMet && qualityMet === true)) {
      const { iterate } = await import('../harness/lib/iterator.js');
      iterResult = await iterate(runDir, {
        complianceTarget,
        qualityTarget,
        maxIterations
      });
    }
    
    // Read final files
    const finalVersion = iterResult ? iterResult.finalVersion : 'v1';
    const output = fs.readFileSync(path.join(runDir, `output_${finalVersion}.txt`), 'utf-8');
    const summaryPath = path.join(runDir, 'summary.md');
    const diffPath = path.join(runDir, 'diff.md');
    const summary = fs.existsSync(summaryPath) 
      ? fs.readFileSync(summaryPath, 'utf-8')
      : null;
    const diff = fs.existsSync(diffPath)
      ? fs.readFileSync(diffPath, 'utf-8')
      : null;
    
    // Read all outputs
    const outputs = {};
    const iterations = iterResult ? iterResult.iterations : [{
      version: 'v1',
      compliance: evalResult.scores.compliance_score,
      quality: evalResult.scores.quality_score,
      quality_status: evalResult.scores.quality_status,
      total: evalResult.scores.total_score
    }];
    
    for (const iter of iterations) {
      const outputPath = path.join(runDir, `output_${iter.version}.txt`);
      if (fs.existsSync(outputPath)) {
        outputs[iter.version] = fs.readFileSync(outputPath, 'utf-8');
      }
    }
    
    res.json({
      success: true,
      runId: path.basename(runDir),
      runDir,
      output,
      outputs,
      results: iterResult ? iterResult : {
        iterations: [{
          version: 'v1',
          compliance: evalResult.scores.compliance_score,
          quality: evalResult.scores.quality_score,
          quality_status: evalResult.scores.quality_status,
          total: evalResult.scores.total_score,
          failedChecks: evalResult.per_check.filter(c => !c.pass && !c.skipped).map(c => c.id)
        }],
        finalVersion: 'v1',
        targetsMet: complianceMet && qualityMet === true,
        scores: {
          compliance: evalResult.scores.compliance_score,
          quality: evalResult.scores.quality_score,
          total: evalResult.scores.total_score
        }
      },
      summary,
      diff,
      isDummy: genResult.isDummy || false
    });
  } catch (error) {
    console.error('Harness run error:', error);
    res.status(500).json({ 
      error: 'Kunde inte köra full run',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/harness/config
 * Get harness runtime configuration
 */
app.get('/api/harness/config', async (req, res) => {
  try {
    const { config } = await import('../harness/lib/config.js');
    res.json({
      success: true,
      config
    });
  } catch (error) {
    console.error('Harness config error:', error);
    res.status(500).json({ 
      error: 'Kunde inte hämta config',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/harness/runs
 * List all runs
 */
app.get('/api/harness/runs', async (req, res) => {
  try {
    if (!fs.existsSync(RUNS_DIR)) {
      return res.json({ success: true, runs: [] });
    }
    
    const runs = fs.readdirSync(RUNS_DIR)
      .filter(item => {
        const itemPath = path.join(RUNS_DIR, item);
        return fs.statSync(itemPath).isDirectory() && item !== 'latest';
      })
      .map(runId => {
        const runDir = path.join(RUNS_DIR, runId);
        const specPath = path.join(runDir, 'post_spec.json');
        const summaryPath = path.join(runDir, 'summary.md');
        
        let spec = null;
        let summary = null;
        
        try {
          if (fs.existsSync(specPath)) {
            spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
          }
          if (fs.existsSync(summaryPath)) {
            summary = fs.readFileSync(summaryPath, 'utf-8');
          }
        } catch (e) {
          // Ignore parse errors
        }
        
        return {
          runId,
          profile: spec?.profile || null,
          topic: spec?.topic || null,
          createdAt: spec?.meta?.created_at || null,
          summary: summary ? summary.substring(0, 200) : null
        };
      })
      .sort((a, b) => {
        // Sort by runId (timestamp) descending
        return b.runId.localeCompare(a.runId);
      });
    
    res.json({
      success: true,
      runs
    });
  } catch (error) {
    console.error('Harness runs list error:', error);
    res.status(500).json({ 
      error: 'Kunde inte lista runs',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/harness/runs/:runId
 * Get details for a specific run
 */
app.get('/api/harness/runs/:runId', async (req, res) => {
  try {
    const { runId } = req.params;
    const runDir = path.join(RUNS_DIR, runId);
    
    if (!fs.existsSync(runDir)) {
      return res.status(404).json({ error: `Run ${runId} finns inte` });
    }
    
    // Read all files
    const specPath = path.join(runDir, 'post_spec.json');
    const summaryPath = path.join(runDir, 'summary.md');
    const diffPath = path.join(runDir, 'diff.md');
    
    const spec = fs.existsSync(specPath) 
      ? JSON.parse(fs.readFileSync(specPath, 'utf-8'))
      : null;
    const summary = fs.existsSync(summaryPath)
      ? fs.readFileSync(summaryPath, 'utf-8')
      : null;
    const diff = fs.existsSync(diffPath)
      ? fs.readFileSync(diffPath, 'utf-8')
      : null;
    
    // Read all versions
    const outputs = {};
    const results = {};
    const internalPrompts = {};
    
    const files = fs.readdirSync(runDir);
    for (const file of files) {
      const outputMatch = file.match(/^output_v(\d+)\.txt$/);
      const resultsMatch = file.match(/^results_v(\d+)\.json$/);
      const promptMatch = file.match(/^internal_prompt_v(\d+)\.txt$/);
      
      if (outputMatch) {
        const version = `v${outputMatch[1]}`;
        outputs[version] = fs.readFileSync(path.join(runDir, file), 'utf-8');
      }
      if (resultsMatch) {
        const version = `v${resultsMatch[1]}`;
        results[version] = JSON.parse(fs.readFileSync(path.join(runDir, file), 'utf-8'));
      }
      if (promptMatch) {
        const version = `v${promptMatch[1]}`;
        internalPrompts[version] = fs.readFileSync(path.join(runDir, file), 'utf-8');
      }
    }
    
    res.json({
      success: true,
      runId,
      spec,
      summary,
      diff,
      outputs,
      results,
      internalPrompts
    });
  } catch (error) {
    console.error('Harness run details error:', error);
    res.status(500).json({ 
      error: 'Kunde inte hämta run-detaljer',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server körs på http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Harness API: http://localhost:${PORT}/api/harness/*`);
});

