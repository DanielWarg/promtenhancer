import React, { useState, useEffect } from 'react';
import { generateSuperPrompt, runGeneratedPrompt } from './services/geminiService';
import { PromptOutput } from './components/PromptOutput';
import { Button } from './components/Button';
import { Sidebar } from './components/Sidebar';
import { LoadingState, SavedPrompt, METHODS, MethodType, AppMode, ChannelType, LinkedInTone } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [runOutput, setRunOutput] = useState<string | null>(null);
  
  // App Mode & Studio State
  const [mode, setMode] = useState<AppMode>('create');
  const [channel, setChannel] = useState<ChannelType>('linkedin');
  const [linkedInTone, setLinkedInTone] = useState<LinkedInTone>('leader');
  const [audience, setAudience] = useState('');
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

  // Update spiciness defaults when channel changes
  useEffect(() => {
    if (channel === 'linkedin') setSpiciness(0.8);
    else if (channel === 'newsletter') setSpiciness(0.4);
    else setSpiciness(0.7);
  }, [channel]);

  const saveToLibrary = () => {
    if (!output) return;
    
    let title = input.slice(0, 50) + (input.length > 50 ? '...' : '');
    if (!title) {
      title = `${channel.toUpperCase()} Prompt`;
    }
    
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      title,
      prompt: output,
      date: new Date().toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' }),
      channel
    };

    const updatedPrompts = [newPrompt, ...savedPrompts];
    setSavedPrompts(updatedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedPrompts));
    setIsSidebarOpen(true);
  };

  const deleteFromLibrary = (id: string) => {
    const updatedPrompts = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updatedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedPrompts));
  };

  const loadPrompt = (saved: SavedPrompt) => {
    setOutput(saved.prompt);
    setInput(`(Laddad: ${saved.title})`);
    setChannel(saved.channel);
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
      const result = await generateSuperPrompt(
        input, 
        selectedMethod, 
        mode, 
        channel, 
        linkedInTone, 
        audience, 
        spiciness
      );
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
         promptToRun += "\n\n(TEST: Skriv ett utkast om 'Digital hälsa' med denna strategi.)";
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
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        savedPrompts={savedPrompts}
        onLoadPrompt={loadPrompt}
        onDeletePrompt={deleteFromLibrary}
      />

      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-8 left-8 z-30 text-[10px] font-bold tracking-[0.2em] text-prompt-text-muted hover:text-prompt-accent transition-colors uppercase"
      >
        Bibliotek
      </button>

      <div className="w-full max-w-3xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-prompt-heading tracking-tight mb-3">
            Creator Studio
          </h1>
          <p className="text-prompt-text-muted text-xs font-bold tracking-[0.2em] uppercase">
            Specialiserad innehållsstrategi
          </p>
        </div>

        <section className="bg-white border border-prompt-border rounded-xl p-6 md:p-10 shadow-soft relative mb-12 animate-in fade-in slide-in-from-bottom-2">
          
          {/* Main Channel Tabs */}
          <div className="flex border-b border-prompt-border mb-10 overflow-x-auto">
            <button
              onClick={() => setChannel('linkedin')}
              className={`pb-4 pr-8 text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap relative ${
                channel === 'linkedin' ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' : 'text-prompt-text-muted hover:text-prompt-text'
              }`}
            >
              LinkedIn
            </button>
            <button
              onClick={() => setChannel('newsletter')}
              className={`pb-4 px-8 text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap relative ${
                channel === 'newsletter' ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' : 'text-prompt-text-muted hover:text-prompt-text'
              }`}
            >
              Nyhetsbrev
            </button>
            <button
              onClick={() => setChannel('general')}
              className={`pb-4 px-8 text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap relative ${
                channel === 'general' ? 'text-prompt-heading after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-prompt-accent' : 'text-prompt-text-muted hover:text-prompt-text'
              }`}
            >
              Generell
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Sub-selectors for Channel Specifics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-1">
              
              <div className="flex flex-col gap-3">
                 <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                   Läge
                 </label>
                 <div className="flex bg-prompt-subtle p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setMode('create')}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${mode === 'create' ? 'bg-white text-prompt-heading shadow-sm' : 'text-prompt-text-muted'}`}
                    >
                      Skapa
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('reverse-engineer')}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${mode === 'reverse-engineer' ? 'bg-white text-prompt-heading shadow-sm' : 'text-prompt-text-muted'}`}
                    >
                      Kopiera Stil
                    </button>
                 </div>
              </div>

              {channel === 'linkedin' && mode === 'create' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                    Tonläge
                  </label>
                  <select 
                    value={linkedInTone}
                    onChange={(e) => setLinkedInTone(e.target.value as LinkedInTone)}
                    className="w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-bold uppercase tracking-wide cursor-pointer"
                  >
                    <option value="leader">Professionell Ledare</option>
                    <option value="rebel">Sofistikerad Rebel</option>
                    <option value="coach">Hoppfull Coach</option>
                  </select>
                </div>
              )}

              {channel === 'newsletter' && mode === 'create' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                    Målgrupp
                  </label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="T.ex. VD:ar, Frilansare..."
                    className="w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-medium"
                  />
                </div>
              )}

              {channel === 'general' && mode === 'create' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                    Metodik
                  </label>
                  <select 
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value as MethodType)}
                    className="w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-bold uppercase tracking-wide cursor-pointer"
                  >
                    {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
                {mode === 'create' ? 'Idé eller Rant' : 'Originaltext att analysera'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  channel === 'linkedin' ? "Beskriv vad du vill provocera eller lära ut..." : 
                  channel === 'newsletter' ? "Vad är veckans viktigaste lärdom?" : "Beskriv uppgiften..."
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
                ? 'Bearbetar strategi...' 
                : `Bygg ${channel === 'linkedin' ? 'LinkedIn' : channel === 'newsletter' ? 'Newsletter' : 'Super'}-Prompt`}
            </Button>
          </form>
        </section>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg text-red-900 text-xs font-mono flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-red-400"></span>
            {error}
          </div>
        )}

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