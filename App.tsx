import React, { useState, useEffect } from 'react';
import { generateSuperPrompt, runGeneratedPrompt } from './services/geminiService';
import { PromptOutput } from './components/PromptOutput';
import { Button } from './components/Button';
import { Sidebar } from './components/Sidebar';
import { LoadingState, SavedPrompt, METHODS, MethodType, AppMode, RoleType } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [runOutput, setRunOutput] = useState<string | null>(null);
  
  // App Mode State
  const [mode, setMode] = useState<AppMode>('create');
  const [role, setRole] = useState<RoleType>('viral');
  const [selectedMethod, setSelectedMethod] = useState<MethodType>(METHODS[0]);
  const [spiciness, setSpiciness] = useState<number>(0.8);
  
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  // Library State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  // Load prompts on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedPrompts');
    if (saved) {
      try {
        setSavedPrompts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved prompts", e);
      }
    }
  }, []);

  // Update spiciness defaults when role changes
  useEffect(() => {
    if (role === 'corporate') {
      setSpiciness(0.2);
    } else {
      setSpiciness(0.8);
    }
  }, [role]);

  const saveToLibrary = () => {
    if (!output) return;
    
    // Create a title from the first few words of user input or a default based on mode
    let title = input.slice(0, 50) + (input.length > 50 ? '...' : '');
    if (!title) {
      if (mode === 'reverse-engineer') title = "Stilanalys";
      else if (role === 'corporate') title = "Corporate Prompt";
      else title = "Viral Prompt";
    }
    
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      title,
      prompt: output,
      date: new Date().toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' })
    };

    const updatedPrompts = [newPrompt, ...savedPrompts];
    setSavedPrompts(updatedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedPrompts));
    setIsSidebarOpen(true); // Open sidebar to show it was saved
  };

  const deleteFromLibrary = (id: string) => {
    const updatedPrompts = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updatedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedPrompts));
  };

  const loadPrompt = (saved: SavedPrompt) => {
    setOutput(saved.prompt);
    setInput(`(Laddad: ${saved.title})`);
    setRunOutput(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoadingState(LoadingState.LOADING);
    setError(null);
    setOutput('');
    setRunOutput(null);

    try {
      const result = await generateSuperPrompt(input, selectedMethod, mode, role, spiciness);
      setOutput(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setError('Ett fel uppstod. Försök igen.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleRunPrompt = async () => {
    if (!output) return;
    setLoadingState(LoadingState.TESTING);
    try {
      const codeBlockRegex = /```(?:markdown)?\n([\s\S]*?)```/;
      const match = output.match(codeBlockRegex);
      let promptToRun = match ? match[1] : output;

      if (promptToRun.includes('[ÄMNE]')) {
         promptToRun += "\n\n(TEST: Skriv ett inlägg om ämnet 'Att våga misslyckas' med denna stil.)";
      }

      const result = await runGeneratedPrompt(promptToRun);
      setRunOutput(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setError('Kunde inte köra prompten.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-prompt-bg text-prompt-text flex flex-col pt-24 px-4 font-sans selection:bg-prompt-accent/20 selection:text-prompt-heading">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        savedPrompts={savedPrompts}
        onLoadPrompt={loadPrompt}
        onDeletePrompt={deleteFromLibrary}
      />

      {/* Menu Trigger */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-8 left-8 z-30 text-[10px] font-bold tracking-[0.2em] text-prompt-text-muted hover:text-prompt-accent transition-colors uppercase"
      >
        Meny
      </button>

      <div className="w-full max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-prompt-heading tracking-tight mb-3">
            Prompt Enhancer
          </h1>
          <p className="text-prompt-text-muted text-sm font-medium tracking-wide">
            KONSTEN ATT TÄNKA KLART
          </p>
        </div>

        {/* Input Section */}
        <section className="bg-white border border-prompt-border rounded-xl p-6 md:p-10 shadow-soft relative mb-12 animate-in fade-in slide-in-from-bottom-2">
          
          {/* Mode Switching Tabs */}
          <div className="flex border-b border-prompt-border mb-8">
            <button
              onClick={() => setMode('create')}
              className={`pb-4 pr-8 text-xs font-bold uppercase tracking-[0.15em] transition-all relative ${
                mode === 'create' 
                  ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' 
                  : 'text-prompt-text-muted hover:text-prompt-text'
              }`}
            >
              Skapa
            </button>
            <button
              onClick={() => setMode('reverse-engineer')}
              className={`pb-4 px-8 text-xs font-bold uppercase tracking-[0.15em] transition-all relative ${
                mode === 'reverse-engineer' 
                  ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' 
                  : 'text-prompt-text-muted hover:text-prompt-text'
              }`}
            >
              Kopiera Stil
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* ROLE SELECTOR - Only shown in Create Mode */}
            {mode === 'create' && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                 <button
                    type="button"
                    onClick={() => setRole('viral')}
                    className={`p-5 rounded-lg border transition-all duration-300 group ${
                      role === 'viral' 
                        ? 'bg-prompt-subtle border-prompt-accent shadow-sm' 
                        : 'bg-white border-prompt-border hover:border-gray-300'
                    }`}
                 >
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-prompt-accent transition-colors ${role === 'viral' ? 'text-prompt-accent' : 'text-prompt-text'}`}>Viral</div>
                    <div className="text-[10px] text-prompt-text-muted uppercase tracking-wide">Attityd & Debatt</div>
                 </button>
                 <button
                    type="button"
                    onClick={() => setRole('corporate')}
                    className={`p-5 rounded-lg border transition-all duration-300 group ${
                      role === 'corporate' 
                        ? 'bg-prompt-subtle border-prompt-accent shadow-sm' 
                        : 'bg-white border-prompt-border hover:border-gray-300'
                    }`}
                 >
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-prompt-accent transition-colors ${role === 'corporate' ? 'text-prompt-accent' : 'text-prompt-text'}`}>Corporate</div>
                    <div className="text-[10px] text-prompt-text-muted uppercase tracking-wide">Diplomati & Proffs</div>
                 </button>
              </div>
            )}

            {/* Method Selector & Slider - Only shown in Create mode */}
            {mode === 'create' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-top-1">
                
                {/* Only show Method selector for Viral mode */}
                {role === 'viral' && (
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                      Metod
                    </label>
                    <div className="relative group">
                      <select 
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value as MethodType)}
                        className="w-full bg-prompt-subtle text-prompt-text p-4 rounded-lg border border-transparent hover:border-prompt-border focus:border-prompt-accent focus:bg-white focus:ring-0 outline-none transition-all text-xs font-medium uppercase tracking-wide cursor-pointer appearance-none"
                      >
                        {METHODS.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-prompt-text-muted text-xs group-hover:text-prompt-accent transition-colors">
                        ▼
                      </div>
                    </div>
                  </div>
                )}

                {/* Spiciness Slider - Dynamic ranges based on Role */}
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest">
                      {role === 'viral' ? 'Attityd' : 'Frihet'}
                    </label>
                    <span className="text-xs font-mono font-bold text-prompt-accent">
                      {spiciness}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={role === 'viral' ? "0.5" : "0.0"} 
                    max={role === 'viral' ? "1.0" : "0.5"} 
                    step="0.1" 
                    value={spiciness}
                    onChange={(e) => setSpiciness(parseFloat(e.target.value))}
                    className="w-full h-1 bg-prompt-border rounded-lg appearance-none cursor-pointer accent-prompt-accent hover:accent-prompt-accent-dark transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-prompt-text-muted font-mono uppercase px-1">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                {mode === 'create' ? 'Instruktion' : 'Textanalys'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'reverse-engineer' 
                    ? "Klistra in text här..." 
                    : role === 'corporate'
                      ? "Beskriv uppgiften..."
                      : "Vad vill du skapa?"
                }
                className="w-full bg-prompt-subtle text-prompt-text p-5 rounded-xl border border-transparent focus:border-prompt-accent focus:bg-white focus:ring-1 focus:ring-prompt-accent outline-none min-h-[160px] resize-none transition-all placeholder-prompt-text-muted/50 font-mono text-sm leading-relaxed"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSubmit(e);
                  }
                }}
              />
            </div>

            <Button 
              type="submit" 
              isLoading={loadingState === LoadingState.LOADING}
              className="w-full mt-4"
            >
              {loadingState === LoadingState.LOADING 
                ? 'Bearbetar...' 
                : mode === 'create' 
                  ? 'Generera Prompt' 
                  : 'Analysera Text'}
            </Button>
          </form>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg text-red-900 text-xs font-mono flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-red-400"></span>
            {error}
          </div>
        )}

        {/* Output Section */}
        {output && (
          <div className="mb-32">
            <PromptOutput 
              content={output} 
              onSave={saveToLibrary}
              onRun={handleRunPrompt}
              isRunning={loadingState === LoadingState.TESTING}
              runOutput={runOutput}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default App;