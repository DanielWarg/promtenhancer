import React from 'react';
import { SavedPrompt } from '../types';
import { Button } from './Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPrompt[];
  onLoadPrompt: (prompt: SavedPrompt) => void;
  onDeletePrompt: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  savedPrompts, 
  onLoadPrompt, 
  onDeletePrompt 
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-prompt-heading/10 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-prompt-border transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-prompt-border flex justify-between items-center bg-white">
            <h2 className="text-xs font-bold text-prompt-heading uppercase tracking-[0.2em]">
              Bibliotek
            </h2>
            <button 
              onClick={onClose}
              className="text-[10px] font-bold text-prompt-text-muted hover:text-prompt-accent transition-colors uppercase tracking-widest"
            >
              Stäng
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedPrompts.length === 0 ? (
              <div className="text-center text-prompt-text-muted py-12 text-xs font-mono uppercase tracking-wide">
                Inga sparade prompts.
              </div>
            ) : (
              savedPrompts.map((item) => (
                <div key={item.id} className="bg-prompt-subtle border border-transparent hover:border-prompt-border rounded-lg p-5 transition-all group hover:shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold text-prompt-heading line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePrompt(item.id);
                      }}
                      className="text-prompt-text-muted hover:text-red-400 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Radera"
                    >
                      Radera
                    </button>
                  </div>
                  <div className="text-[10px] text-prompt-text-muted font-mono mb-5 uppercase tracking-wide">
                    {item.date}
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-full text-[10px] h-8 bg-white"
                    onClick={() => {
                      onLoadPrompt(item);
                      onClose();
                    }}
                  >
                    Ladda
                  </Button>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-prompt-border bg-prompt-subtle text-[10px] text-prompt-text-muted text-center font-bold uppercase tracking-[0.2em]">
            Sparat lokalt
          </div>
        </div>
      </div>
    </>
  );
};