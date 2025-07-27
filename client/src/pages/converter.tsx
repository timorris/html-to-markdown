import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, 
  Upload, 
  Trash2, 
  ArrowLeftRight, 
  Info,
  Github,
  CheckCircle2
} from "lucide-react";
import Footer from "@/components/Footer";
import EmojiPicker from "@/components/EmojiPicker";
import ThemeToggle from "@/components/ThemeToggle";
import ShareButtons from "@/components/ShareButtons";
import TooltipHint from "@/components/TooltipHint";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

declare global {
  interface Window {
    marked: any;
    TurndownService: any;
  }
}

export default function Converter() {
  const [htmlContent, setHtmlContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [lastEditedPanel, setLastEditedPanel] = useState<"html" | "markdown" | null>(null);
  const [conversionCount, setConversionCount] = useState(0);
  const [conversionDirection, setConversionDirection] = useState("Ready to convert");
  const [isConverting, setIsConverting] = useState(false);
  
  const { toast } = useToast();
  const debounceTimer = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const markdownTextareaRef = useRef<HTMLTextAreaElement>(null);
  const turndownService = useRef<any>(null);

  // Load shared content from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedHtml = urlParams.get('html');
    const sharedMarkdown = urlParams.get('markdown');
    
    if (sharedHtml) {
      setHtmlContent(decodeURIComponent(sharedHtml));
      setLastEditedPanel('html');
    }
    
    if (sharedMarkdown) {
      setMarkdownContent(decodeURIComponent(sharedMarkdown));
      setLastEditedPanel('markdown');
    }
    
    // Clear URL parameters after loading
    if (sharedHtml || sharedMarkdown) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Copy shortcuts
      if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        copyToClipboard(htmlContent, 'HTML');
      }
      
      if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        event.preventDefault();
        copyToClipboard(markdownContent, 'Markdown');
      }
      
      // Clear content shortcut
      if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        event.preventDefault();
        clearAll();
      }
      
      // Upload file shortcut
      if (event.ctrlKey && event.shiftKey && event.key === 'U') {
        event.preventDefault();
        fileInputRef.current?.click();
      }
      
      // Theme toggle shortcut
      if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        const themeToggle = document.querySelector('[data-theme-toggle]') as HTMLButtonElement;
        if (themeToggle) {
          themeToggle.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [htmlContent, markdownContent]);

  // Initialize conversion libraries
  useEffect(() => {
    if (typeof window !== 'undefined' && window.TurndownService) {
      turndownService.current = new window.TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });

      // Remove default link rule to prevent conflicts
      turndownService.current.remove('a');

      // Enhanced table handling with proper header detection
      turndownService.current.addRule('betterTable', {
        filter: 'table',
        replacement: function (content: string, node: any) {
          const rows = Array.from(node.querySelectorAll('tr'));
          if (rows.length === 0) return '';

          let markdown = '\n';
          let hasHeader = false;

          rows.forEach((row: any, index: number) => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            const isHeaderRow = row.querySelectorAll('th').length > 0;
            
            if (isHeaderRow) hasHeader = true;

            // Build row content
            const rowContent = cells.map((cell: any) => {
              return cell.textContent?.trim().replace(/\|/g, '\\|') || '';
            }).join(' | ');

            markdown += '| ' + rowContent + ' |\n';

            // Add separator after header row
            if (isHeaderRow || (index === 0 && !hasHeader)) {
              const separator = cells.map(() => '---').join(' | ');
              markdown += '| ' + separator + ' |\n';
            }
          });

          return markdown + '\n';
        }
      });

      // Enhanced link handling for anchor tags - replace default rule
      turndownService.current.addRule('customLinks', {
        filter: 'a',
        replacement: function (content: string, node: any) {
          const href = node.getAttribute('href');
          const title = node.getAttribute('title');
          
          if (!href) {
            return content;
          }
          
          // Clean up content to remove extra whitespace
          const linkText = content.trim();
          
          // Handle different link types
          if (href.startsWith('mailto:')) {
            return `[${linkText}](${href})`;
          }
          
          if (href.startsWith('tel:')) {
            return `[${linkText}](${href})`;
          }
          
          // Regular links with optional title
          if (title && title.trim()) {
            return `[${linkText}](${href} "${title}")`;
          }
          
          return `[${linkText}](${href})`;
        }
      });

      // Handle images properly
      turndownService.current.addRule('customImages', {
        filter: 'img',
        replacement: function (content: string, node: any) {
          const src = node.getAttribute('src');
          const alt = node.getAttribute('alt') || '';
          const title = node.getAttribute('title');
          
          if (!src) {
            return '';
          }
          
          if (title && title.trim()) {
            return `![${alt}](${src} "${title}")`;
          }
          
          return `![${alt}](${src})`;
        }
      });
    }
  }, []);

  // Convert HTML to Markdown
  const convertHtmlToMarkdown = useCallback((html: string): string => {
    try {
      if (!turndownService.current) {
        return 'Error: Turndown service not initialized';
      }
      return turndownService.current.turndown(html);
    } catch (error) {
      console.error('HTML to Markdown conversion error:', error);
      return 'Error: Invalid HTML format';
    }
  }, []);

  // Convert Markdown to HTML
  const convertMarkdownToHtml = useCallback((markdown: string): string => {
    try {
      if (!window.marked) {
        return 'Error: Marked library not loaded';
      }
      
      // Configure marked options for better table support
      window.marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        tables: true, // Enable table support
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
      
      return window.marked.parse(markdown);
    } catch (error) {
      console.error('Markdown to HTML conversion error:', error);
      return 'Error: Invalid Markdown format';
    }
  }, []);

  // Clean markdown for preview rendering
  const cleanMarkdownForPreview = useCallback((markdown: string): string => {
    if (!markdown) return markdown;
    
    // Remove escaping that was added for tables or other conversions
    return markdown
      .replace(/\\(.)/g, '$1')  // Remove escape characters
      .replace(/\\\|/g, '|')    // Fix escaped pipes in tables
      .replace(/\\\[/g, '[')    // Fix escaped square brackets
      .replace(/\\\]/g, ']')    // Fix escaped square brackets
      .replace(/\\\*/g, '*')    // Fix escaped asterisks
      .replace(/\\\\_/g, '_')   // Fix escaped underscores
      .replace(/\\\#/g, '#')    // Fix escaped hash symbols
      .trim();
  }, []);

  // Debounced conversion handler
  const handleConversion = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setIsConverting(true);
      
      if (lastEditedPanel === 'html') {
        const htmlText = htmlContent.trim();
        if (htmlText) {
          const converted = convertHtmlToMarkdown(htmlText);
          setMarkdownContent(converted);
          setConversionDirection('HTML → Markdown');
          setConversionCount(prev => prev + 1);
        } else {
          setMarkdownContent('');
          setConversionDirection('Ready to convert');
        }
      } else if (lastEditedPanel === 'markdown') {
        const markdownText = markdownContent.trim();
        if (markdownText) {
          const converted = convertMarkdownToHtml(markdownText);
          setHtmlContent(converted);
          setConversionDirection('Markdown → HTML');
          setConversionCount(prev => prev + 1);
        } else {
          setHtmlContent('');
          setConversionDirection('Ready to convert');
        }
      }
      
      setIsConverting(false);
    }, 300);
  }, [htmlContent, markdownContent, lastEditedPanel, convertHtmlToMarkdown, convertMarkdownToHtml]);

  // Trigger conversion when content changes
  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  // Handle HTML input change
  const handleHtmlChange = (value: string) => {
    setHtmlContent(value);
    setLastEditedPanel('html');
  };

  // Handle Markdown input change
  const handleMarkdownChange = (value: string) => {
    setMarkdownContent(value);
    setLastEditedPanel('markdown');
  };

  // Copy to clipboard
  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Content copied!",
        description: `${type} copied to clipboard successfully.`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Clear all content
  const clearAll = () => {
    setHtmlContent('');
    setMarkdownContent('');
    setLastEditedPanel(null);
    setConversionDirection('Ready to convert');
    toast({
      title: "Content cleared",
      description: "All content has been cleared.",
    });
  };

  // Insert text at cursor position in markdown textarea
  const insertAtCursor = (text: string) => {
    const textarea = markdownTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = markdownContent;
    
    const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
    setMarkdownContent(newContent);
    setLastEditedPanel("markdown");
    
    // Restore cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    insertAtCursor(emoji);
    toast({
      title: "Emoji added",
      description: `Added ${emoji} to Markdown`,
    });
  };

  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    // Insert as markdown with icon notation
    const iconMarkdown = `:${iconName.toLowerCase()}:`;
    insertAtCursor(iconMarkdown);
    toast({
      title: "Icon added",
      description: `Added ${iconName} icon notation to Markdown`,
    });
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'html' || fileExtension === 'htm') {
        setHtmlContent(content);
        setLastEditedPanel('html');
        toast({
          title: "File loaded",
          description: "HTML file loaded successfully.",
        });
      } else if (fileExtension === 'md' || fileExtension === 'txt') {
        setMarkdownContent(content);
        setLastEditedPanel('markdown');
        toast({
          title: "File loaded",
          description: "Markdown file loaded successfully.",
        });
      } else {
        toast({
          title: "Unsupported file",
          description: "Please upload an HTML or Markdown file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearAll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-50">HTML ↔ Markdown Converter</h1>
                <p className="text-sm text-slate-400 hidden sm:block">Real-time bidirectional conversion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
                <span>{conversionCount}</span>
                <span>conversions</span>
              </div>
              
              <ShareButtons 
                htmlContent={htmlContent} 
                markdownContent={markdownContent} 
              />
              
              <ThemeToggle title="Switch between light and dark theme (Ctrl+Shift+T)" />
              
              <KeyboardShortcuts />
              
              <TooltipHint content="View source code on GitHub">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                  onClick={() => window.open('https://github.com/timorris/html-to-markdown', '_blank')}
                >
                  <Github className="w-5 h-5 text-slate-400" />
                </Button>
              </TooltipHint>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Conversion Direction Indicator */}
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-slate-800/50 rounded-full px-4 py-2 flex items-center space-x-3 border border-slate-700">
            <span className="text-sm font-medium text-slate-300">{conversionDirection}</span>
            <div className={`w-2 h-2 rounded-full ${
              isConverting ? 'bg-indigo-400 animate-pulse' : 
              conversionDirection.includes('→') ? 'bg-indigo-400 animate-pulse' : 'bg-slate-500'
            }`} />
          </div>
        </div>

        {/* Conversion Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* HTML Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-slate-200">HTML</h2>
                <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-md">
                  Input/Output
                </span>
              </div>
              <TooltipHint content="Copy HTML content to clipboard (Ctrl+Shift+C)">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(htmlContent, 'HTML')}
                  className="bg-slate-800 hover:bg-slate-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </TooltipHint>
            </div>
            
            <div className="relative">
              <Textarea 
                value={htmlContent}
                onChange={(e) => handleHtmlChange(e.target.value)}
                className="h-80 font-mono text-sm custom-scrollbar bg-slate-900 border-slate-700 focus:border-indigo-500 resize-none"
                placeholder="Paste your HTML here or see converted output..."
              />
              
              <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded">
                {htmlContent.length} characters
              </div>
            </div>
          </div>

          {/* Markdown Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-slate-200">Markdown</h2>
                <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-md">
                  Input/Output
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipHint content="Add emojis and icons to your Markdown">
                  <EmojiPicker 
                    onEmojiSelect={handleEmojiSelect}
                    onIconSelect={handleIconSelect}
                  />
                </TooltipHint>
                <TooltipHint content="Copy Markdown content to clipboard (Ctrl+Shift+M)">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(markdownContent, 'Markdown')}
                    className="bg-slate-800 hover:bg-slate-700"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </TooltipHint>
              </div>
            </div>
            
            <div className="relative">
              <Textarea 
                ref={markdownTextareaRef}
                value={markdownContent}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="h-80 font-mono text-sm custom-scrollbar bg-slate-900 border-slate-700 focus:border-indigo-500 resize-none"
                placeholder="Paste your Markdown here or see converted output..."
              />
              
              <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded">
                {markdownContent.length} characters
              </div>
            </div>
          </div>

          {/* Rendered Preview Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-slate-200">Preview</h2>
                <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-md">
                  Rendered
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipHint content="Upload HTML or Markdown file (Ctrl+Shift+U)">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 border-slate-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </TooltipHint>
                
                <TooltipHint content="Clear all content (Ctrl+K)">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </TooltipHint>
              </div>
            </div>
            
            <div className="relative">
              <div 
                className="h-80 p-4 bg-slate-900 border border-slate-700 rounded-md overflow-auto custom-scrollbar prose-preview"
                dangerouslySetInnerHTML={{ 
                  __html: markdownContent ? convertMarkdownToHtml(cleanMarkdownForPreview(markdownContent)) : '<p class="text-slate-500 italic">Preview will appear here when you add Markdown content...</p>' 
                }}
              />
              
              <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded">
                Rendered Output
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm,.md,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Help Section */}
        <Card className="mt-12 bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
              <Info className="w-5 h-5 text-indigo-400" />
              <span>Quick Tips</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-300">HTML to Markdown</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Paste HTML in the left panel to see Markdown conversion</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Supports headings, links, images, lists, tables, and code blocks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Preserves semantic structure and formatting</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-slate-300">Markdown to HTML</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Type Markdown in the right panel for HTML output</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Supports tables, strikethrough, and task lists</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Generates clean, semantic HTML markup</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Live preview shows how Markdown renders visually</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Conversion Examples */}
            <div className="mt-6 space-y-4">
              {/* Links Examples */}
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600">
                <h4 className="font-medium text-slate-300 mb-3">Link Conversion Examples</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-2">HTML Links:</p>
                    <code className="text-xs bg-slate-700 p-2 rounded block text-orange-300">
                      &lt;a href="https://example.com"&gt;Link Text&lt;/a&gt;<br/>
                      &lt;a href="mailto:user@email.com"&gt;Email&lt;/a&gt;<br/>
                      &lt;a href="#section" title="Go to section"&gt;Anchor&lt;/a&gt;
                    </code>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-2">Markdown Links:</p>
                    <code className="text-xs bg-slate-700 p-2 rounded block text-blue-300">
                      [Link Text](https://example.com)<br/>
                      [Email](mailto:user@email.com)<br/>
                      [Anchor](#section "Go to section")
                    </code>
                  </div>
                </div>
              </div>

              {/* Table Examples */}
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600">
                <h4 className="font-medium text-slate-300 mb-3">Table Conversion Examples</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-2">HTML Table:</p>
                    <code className="text-xs bg-slate-700 p-2 rounded block text-orange-300">
                      &lt;table&gt;<br/>
                      &nbsp;&nbsp;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Age&lt;/th&gt;&lt;/tr&gt;<br/>
                      &nbsp;&nbsp;&lt;tr&gt;&lt;td&gt;John&lt;/td&gt;&lt;td&gt;30&lt;/td&gt;&lt;/tr&gt;<br/>
                      &lt;/table&gt;
                    </code>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-2">Markdown Table:</p>
                    <code className="text-xs bg-slate-700 p-2 rounded block text-blue-300">
                      | Name | Age |<br/>
                      | --- | --- |<br/>
                      | John | 30 |
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-600">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-slate-300 font-medium">Pro Tip</p>
                  <p className="text-slate-400 mt-1">
                    The converter automatically detects which panel you're editing and converts in the appropriate direction. 
                    The preview panel shows how your Markdown will look when rendered, making it easy to see tables, links, and formatting in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0">📖</div>
                <div className="text-sm">
                  <p className="text-slate-300 font-medium">Markdown Reference</p>
                  <p className="text-slate-400 mt-1">
                    Need help with Markdown syntax? Check out the complete 
                    <a 
                      href="https://www.markdownguide.org/basic-syntax/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors duration-200"
                    >
                      Markdown syntax reference guide
                    </a>{' '}
                    for all the formatting options and examples.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
