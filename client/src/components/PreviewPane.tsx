import React, { useEffect } from 'react';
import { Eye } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

interface PreviewPaneProps {
  content: string;
  type: 'html' | 'markdown';
  className?: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ content, type, className }) => {
  const [renderedContent, setRenderedContent] = React.useState<string>('');

  useEffect(() => {
    if (type === 'markdown' && content.trim()) {
      // Convert markdown to HTML for preview
      if (window.marked) {
        const html = window.marked.parse(content);
        setRenderedContent(html);
      }
    } else if (type === 'html' && content.trim()) {
      // Use HTML content directly
      setRenderedContent(content);
    } else {
      setRenderedContent('');
    }
  }, [content, type]);

  if (!content.trim()) {
    return (
      <div className={`flex items-center justify-center h-full text-slate-400 dark:text-slate-500 ${className}`}>
        <div className="text-center">
          <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <SyntaxHighlighter className={`h-full overflow-auto ${className}`}>
      <div 
        className="prose prose-slate dark:prose-invert max-w-none p-4 text-sm leading-relaxed bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </SyntaxHighlighter>
  );
};

export default PreviewPane;