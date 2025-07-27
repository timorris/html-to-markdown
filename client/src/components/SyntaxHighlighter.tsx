import React from 'react';

interface SyntaxHighlighterProps {
  children: React.ReactNode;
  className?: string;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SyntaxHighlighter;