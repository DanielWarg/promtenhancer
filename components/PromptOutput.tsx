import React, { useState } from 'react';
import { Button } from './Button';

interface PromptOutputProps {
  content: string;
  onSave?: () => void;
  onRun?: () => void;
  isRunning?: boolean;
  runOutput?: string | null;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ content, onSave, onRun, isRunning, runOutput }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const codeBlockRegex = /```(?:markdown)?\n([\s\S]*?)```/;
      const match = content.match(codeBlockRegex);
      const textToCopy = match ? match[1] : content;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderTextLine = (line: string, index: number) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-2xl font-semibold text-prompt-heading mt-8 mb-4 tracking-tight border-b border-prompt-border pb-2">{line.replace('# ', '')}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-lg font-bold text-prompt-accent mt-6 mb-3 tracking-wide uppercase text-xs">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-base font-semibold text-prompt-heading mt-5 mb-2">{line.replace('### ', '')}</h3>;
    }
    if (line.startsWith('- ')) {
      return <li key={index} className="ml-4 mb-2 text-prompt-text list-disc marker:text-prompt-accent/50 leading-relaxed">{renderBold(line.replace('- ', ''))}</li>;
    }
    return (
      <div key={index} className="min-h-[1.5rem] whitespace-pre-wrap leading-relaxed text-prompt-text my-1.5">
        {renderBold(line)}
      </div>
    );
  };

  const renderBold = (text: string) => {
    const boldParts = text.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-prompt-heading font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const formatContent = (text: string) => {
    const parts = text.split(/```(?:markdown)?/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <div key={index} className="bg-prompt-subtle rounded-lg border border-prompt-border p-6 my-8 font-mono text-sm text-prompt-text overflow-x-auto relative group shadow-inner">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] text-prompt-text-muted uppercase tracking-widest font-bold">Code Block</span>
            </div>
            <pre className="whitespace-pre-wrap">{part.trim()}</pre>
          </div>
        );
      }
      return (
        <div key={index}>
          {part.split('\n').map((line, lineIndex) => renderTextLine(line, lineIndex))}
        </div>
      );
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-prompt-border shadow-soft overflow-hidden">
        <div className="bg-white px-6 py-5 border-b border-prompt-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-prompt-accent"></div>
            <span className="text-xs font-mono text-prompt-text-muted uppercase tracking-widest">super_prompt.md</span>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            {onSave && (
               <Button variant="secondary" onClick={onSave} className="text-[10px] py-2 px-4 h-9 flex-1 md:flex-none">
                 Spara
               </Button>
            )}
            <Button 
              variant="secondary" 
              onClick={handleCopy}
              className="text-[10px] py-2 px-4 h-9 flex-1 md:flex-none"
            >
              {copied ? 'Kopierad' : 'Kopiera'}
            </Button>
            {onRun && (
              <Button 
                variant="primary" 
                onClick={onRun}
                isLoading={isRunning}
                className="text-[10px] py-2 px-5 h-9 flex-1 md:flex-none shadow-none"
              >
                Kör Prompt
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-8 md:p-12 font-sans text-prompt-text">
          {formatContent(content)}
        </div>
      </div>

      {/* Execution Result Area */}
      {runOutput && (
        <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-4 px-1">
             <div className="h-px w-8 bg-prompt-accent"></div>
             <h3 className="text-xs font-bold text-prompt-text-muted uppercase tracking-[0.2em]">Resultat</h3>
          </div>
          <div className="bg-prompt-subtle text-prompt-text rounded-xl p-8 md:p-10 border-l-4 border-prompt-accent shadow-soft whitespace-pre-wrap leading-relaxed font-sans">
            {runOutput}
          </div>
        </div>
      )}
    </div>
  );
};