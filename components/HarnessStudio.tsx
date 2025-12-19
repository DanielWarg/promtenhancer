import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { Alert } from './Alert';
import { Loader } from './Loader';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Input } from './Input';

interface HarnessConfig {
  NO_NETWORK: boolean;
  HAS_OPENAI_KEY: boolean;
  LLM_ENABLED: boolean;
  LLM_SKIP_REASON: string | null;
}

interface RunResult {
  runId: string;
  runDir: string;
  output: string;
  outputs: Record<string, string>;
  results: {
    iterations: Array<{
      version: string;
      compliance: number;
      quality: number | null;
      quality_status: string | null;
      total: number;
      failedChecks: string[];
    }>;
    finalVersion: string;
    targetsMet: boolean;
    scores: {
      compliance: number;
      quality: number | null;
      total: number;
    };
  };
  summary: string | null;
  diff: string | null;
  isDummy: boolean;
}

export const HarnessStudio: React.FC = () => {
  const [config, setConfig] = useState<HarnessConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  
  // Form state
  const [profile, setProfile] = useState<'brev' | 'warm_provocation'>('brev');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [userInput, setUserInput] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [signatureTagline, setSignatureTagline] = useState('');
  const [friction, setFriction] = useState(3);
  const [warmth, setWarmth] = useState(3);
  const [story, setStory] = useState(3);
  
  // Load config on mount
  useEffect(() => {
    fetch('/api/harness/config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.config);
        }
      })
      .catch(err => {
        console.error('Failed to load config:', err);
      });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setLoading(true);
    setError(null);
    setRunResult(null);
    
    try {
      const postSpec = {
        meta: {
          created_at: new Date().toISOString(),
          version: '1.1',
          harness_version: '1.1.0'
        },
        channel: 'linkedin',
        profile,
        topic: topic || (profile === 'brev' ? 'Småbarnsförälder med sjukt barn och jobbstress' : 'Konflikträdsla på jobbet'),
        audience: audience || (profile === 'brev' ? 'Föräldrar som jonglerar jobb och familj' : 'Yrkesverksamma som undviker jobbiga samtal'),
        user_input: userInput,
        constraints: {
          no_asterisks: true,
          no_swearing: true,
          language: 'sv',
          max_chars: 1200,
          min_chars: profile === 'brev' ? 800 : 600,
          signature: {
            name: signatureName || '',
            tagline: signatureTagline || ''
          }
        },
        controls: {
          friction,
          warmth,
          story,
          seed: 42
        }
      };
      
      const response = await fetch('/api/harness/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postSpec,
          complianceTarget: 95,
          qualityTarget: 85,
          maxIterations: 3
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte köra harness');
      }
      
      setRunResult(data);
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod');
    } finally {
      setLoading(false);
    }
  };
  
  const finalScores = runResult?.results.scores;
  const finalIteration = runResult?.results.iterations[runResult.results.iterations.length - 1];
  const qualitySkipped = finalIteration?.quality_status === 'SKIPPED';
  
  return (
    <div className="min-h-screen bg-prompt-bg text-prompt-text flex flex-col pt-24 px-4 font-sans selection:bg-prompt-accent/20 selection:text-prompt-heading">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-prompt-heading tracking-tight mb-3">
            Reflektera Text Harness
          </h1>
          <p className="text-prompt-text-muted text-xs font-bold tracking-[0.2em] uppercase">
            Creator Studio v1.1
          </p>
        </div>
        
        {/* Config Banner */}
        {config && !config.LLM_ENABLED && (
          <Alert variant="warning" className="mb-8">
            <div>
              <div className="font-bold mb-1">LLM DISABLED - Running in OFFLINE mode</div>
              <div className="text-[10px]">{config.LLM_SKIP_REASON}</div>
            </div>
          </Alert>
        )}
        
        {/* Input Form */}
        <Card className="p-6 md:p-10 mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Profile Selection */}
            <div className="flex border-b border-prompt-border mb-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setProfile('brev')}
                className={`pb-4 pr-8 text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap relative ${
                  profile === 'brev' 
                    ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' 
                    : 'text-prompt-text-muted hover:text-prompt-text'
                }`}
              >
                Brev
              </button>
              <button
                type="button"
                onClick={() => setProfile('warm_provocation')}
                className={`pb-4 px-8 text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap relative ${
                  profile === 'warm_provocation' 
                    ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' 
                    : 'text-prompt-text-muted hover:text-prompt-text'
                }`}
              >
                Warm Provocation
              </button>
            </div>
            
            {/* Topic & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Ämne"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={profile === 'brev' ? 'Småbarnsförälder med sjukt barn...' : 'Konflikträdsla på jobbet...'}
              />
              <Input
                label="Målgrupp"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder={profile === 'brev' ? 'Föräldrar som jonglerar...' : 'Yrkesverksamma som...'}
              />
            </div>
            
            {/* User Input */}
            <Textarea
              label={profile === 'brev' ? 'Beskriv vad du vill skriva om' : 'Beskriv vad du vill provocera eller lära ut'}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                profile === 'brev' 
                  ? 'Skriv ett LinkedIn-inlägg om hur det är att vara hemma med sjukt barn när jobbet trycker på...'
                  : 'Skriv ett LinkedIn-inlägg om konflikter på jobbet. Jag vill att det ska vara rakt, lite provocerande...'
              }
              required
            />
            
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                    Utmaningsgrad
                  </label>
                  <span className="text-[10px] text-prompt-text-muted font-mono">{friction}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={friction}
                  onChange={(e) => setFriction(parseInt(e.target.value) || 3)}
                  className="w-full h-2 bg-prompt-subtle rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8D6E63 0%, #8D6E63 ${((friction - 1) / 4) * 100}%, #EAE0D5 ${((friction - 1) / 4) * 100}%, #EAE0D5 100%)`
                  }}
                />
                <div className="text-[9px] text-prompt-text-muted font-mono italic">
                  {profile === 'warm_provocation' ? (
                    friction === 1 ? 'Varsam spegel – trygg igenkänning' :
                    friction === 2 ? 'Mjuk friktion – lätt kontrast' :
                    friction === 3 ? 'Avslöjande spegel – tydlig friktion' :
                    friction === 4 ? 'Konfrontation – ifrågasättande' :
                    'Kaxig spegel – avslöjar hyckleri'
                  ) : (
                    friction <= 2 ? 'Varsam spegel' : friction === 3 ? 'Balanserad provokation' : 'Tydlig konfrontation med värme'
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                  Värme (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={warmth}
                  onChange={(e) => setWarmth(parseInt(e.target.value) || 3)}
                  className="w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-medium"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                  Berättelse (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={story}
                  onChange={(e) => setStory(parseInt(e.target.value) || 3)}
                  className="w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-medium"
                />
              </div>
            </div>
            
            {/* Signature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Signatur (namn)"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Namn (lämna tomt om ingen signatur)"
              />
              <Input
                label="Signatur (tagline)"
                value={signatureTagline}
                onChange={(e) => setSignatureTagline(e.target.value)}
                placeholder="Ninja-psykolog..."
              />
            </div>
            
            <Button 
              type="submit" 
              isLoading={loading}
              className="w-full mt-4"
            >
              {loading ? 'Bearbetar...' : 'Generera & Utvärdera'}
            </Button>
          </form>
        </Card>
        
        {/* Error Display */}
        {error && (
          <Alert variant="error" className="mb-8">
            {error}
          </Alert>
        )}
        
        {/* Results */}
        {runResult && (
          <div className="space-y-8 mb-32">
            
            {/* Scores Card */}
            <Card className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-prompt-accent"></div>
                <h2 className="text-xs font-mono text-prompt-text-muted uppercase tracking-widest">
                  Resultat
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest mb-2">
                    Compliance
                  </div>
                  <div className="text-3xl font-light text-prompt-heading">
                    {finalScores?.compliance || 0}
                    <span className="text-lg text-prompt-text-muted">/100</span>
                  </div>
                  <Badge variant={finalScores && finalScores.compliance >= 95 ? 'success' : 'warning'} className="mt-2">
                    {finalScores && finalScores.compliance >= 95 ? 'MET' : 'NOT MET'}
                  </Badge>
                </div>
                
                <div>
                  <div className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest mb-2">
                    Quality
                  </div>
                  {qualitySkipped ? (
                    <>
                      <div className="text-3xl font-light text-prompt-text-muted">
                        SKIPPED
                      </div>
                      <Badge variant="info" className="mt-2">
                        LLM DISABLED
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-light text-prompt-heading">
                        {finalScores?.quality || 0}
                        <span className="text-lg text-prompt-text-muted">/100</span>
                      </div>
                      <Badge variant={finalScores && finalScores.quality && finalScores.quality >= 85 ? 'success' : 'warning'} className="mt-2">
                        {finalScores && finalScores.quality && finalScores.quality >= 85 ? 'MET' : 'NOT MET'}
                      </Badge>
                    </>
                  )}
                </div>
                
                <div>
                  <div className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest mb-2">
                    Total
                  </div>
                  <div className="text-3xl font-light text-prompt-heading">
                    {finalScores?.total || 0}
                    <span className="text-lg text-prompt-text-muted">/100</span>
                  </div>
                  <Badge variant={runResult.results.targetsMet ? 'success' : 'warning'} className="mt-2">
                    {runResult.results.targetsMet ? 'TARGETS MET' : 'INCOMPLETE'}
                  </Badge>
                </div>
              </div>
              
              {/* Iteration History */}
              {runResult.results.iterations.length > 1 && (
                <div className="mt-8 pt-8 border-t border-prompt-border">
                  <div className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest mb-4">
                    Iteration History
                  </div>
                  <div className="space-y-3">
                    {runResult.results.iterations.map((iter, idx) => (
                      <div key={iter.version} className="flex items-center justify-between p-3 bg-prompt-subtle rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="neutral">{iter.version}</Badge>
                          <span className="text-xs text-prompt-text">
                            Compliance: {iter.compliance} | Quality: {iter.quality_status === 'SKIPPED' ? 'SKIPPED' : iter.quality} | Total: {iter.total}
                          </span>
                        </div>
                        {iter.failedChecks.length > 0 && (
                          <Badge variant="warning" className="text-[9px]">
                            {iter.failedChecks.length} failed
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
            
            {/* Output Card */}
            <Card className="overflow-hidden">
              <div className="bg-white px-6 py-5 border-b border-prompt-border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-prompt-accent"></div>
                  <span className="text-xs font-mono text-prompt-text-muted uppercase tracking-widest">
                    output_{runResult.results.finalVersion}.txt
                  </span>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(runResult.output);
                    }}
                    className="text-[10px] py-2 px-4 h-9 flex-1 md:flex-none"
                  >
                    Kopiera
                  </Button>
                </div>
              </div>
              
              <div className="p-8 md:p-12 font-sans text-prompt-text whitespace-pre-wrap leading-relaxed">
                {runResult.output}
              </div>
            </Card>
            
            {/* Summary */}
            {runResult.summary && (
              <Card variant="subtle" className="p-6">
                <div className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest mb-4">
                  Summary
                </div>
                <div className="text-xs text-prompt-text whitespace-pre-wrap font-mono leading-relaxed">
                  {runResult.summary}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

