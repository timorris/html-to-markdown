import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/components/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(({ className, ...props }, ref) => {
  const { theme, toggleTheme, isTransitioning } = useThemeContext();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      className={`relative bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 ${
        isTransitioning ? 'scale-110' : ''
      } ${className || ''}`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-theme-toggle="true"
      {...props}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute w-5 h-5 text-yellow-500 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
          }`} 
        />
        <Moon 
          className={`absolute w-5 h-5 text-blue-400 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-0 -rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
      </div>
    </Button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;