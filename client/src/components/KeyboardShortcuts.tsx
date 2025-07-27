import React, { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import TooltipHint from '@/components/TooltipHint';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Conversion shortcuts
  { keys: ['Ctrl', 'Shift', 'C'], description: 'Copy HTML content', category: 'Conversion' },
  { keys: ['Ctrl', 'Shift', 'M'], description: 'Copy Markdown content', category: 'Conversion' },
  { keys: ['Ctrl', 'Shift', 'X'], description: 'Clear all content', category: 'Conversion' },
  { keys: ['Ctrl', 'Shift', 'U'], description: 'Upload HTML file', category: 'Conversion' },
  
  // Theme shortcuts
  { keys: ['Ctrl', 'Shift', 'T'], description: 'Toggle theme (light/dark)', category: 'Interface' },
  
  // Help shortcuts
  { keys: ['Ctrl', 'Shift', 'K'], description: 'Show keyboard shortcuts', category: 'Help' },
  { keys: ['Ctrl', 'Shift', '?'], description: 'Show keyboard shortcuts', category: 'Help' },
  { keys: ['Escape'], description: 'Close dialogs and overlays', category: 'Navigation' },
  
  // Editor shortcuts
  { keys: ['Ctrl', 'A'], description: 'Select all text in active editor', category: 'Editing' },
  { keys: ['Ctrl', 'Z'], description: 'Undo changes in active editor', category: 'Editing' },
  { keys: ['Ctrl', 'Y'], description: 'Redo changes in active editor', category: 'Editing' },
  { keys: ['Tab'], description: 'Switch between HTML and Markdown editors', category: 'Navigation' },
];

const categories = ['Conversion', 'Interface', 'Editing', 'Navigation', 'Help'];

const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts overlay with Ctrl+Shift+K or Ctrl+Shift+?
      if (event.ctrlKey && event.shiftKey && (event.key === 'K' || event.key === '?')) {
        event.preventDefault();
        setIsOpen(true);
      }
      
      // Close overlay with Escape
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const formatKeys = (keys: string[]) => {
    return keys.map((key, index) => (
      <span key={`${key}-${index}`} className="inline-flex items-center">
        <Badge 
          variant="outline" 
          className="px-2 py-1 text-xs font-mono bg-slate-200 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200"
        >
          {key}
        </Badge>
        {index < keys.length - 1 && <span className="mx-1 text-slate-700 dark:text-slate-400">+</span>}
      </span>
    ));
  };

  const groupedShortcuts = categories.reduce((acc, category) => {
    acc[category] = shortcuts.filter(shortcut => shortcut.category === category);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipHint content="View keyboard shortcuts (Ctrl+Shift+K)">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <Keyboard className="w-5 h-5" />
          </Button>
        </DialogTrigger>
      </TooltipHint>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-sm text-slate-700 dark:text-slate-400">
            Use these keyboard shortcuts to work faster with the HTML ↔ Markdown Converter
          </div>
          
          {categories.map(category => {
            const categoryShortcuts = groupedShortcuts[category];
            if (categoryShortcuts.length === 0) return null;
            
            return (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
                  {category}
                </h3>
                
                <div className="grid gap-3">
                  {categoryShortcuts.map((shortcut, index) => (
                    <div 
                      key={`${category}-${index}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1 ml-4">
                        {formatKeys(shortcut.keys)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Press <Badge variant="outline" className="mx-1 px-2 py-1 font-mono bg-slate-200 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200">Esc</Badge> to close this overlay</span>
              <span>Or click outside to close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;