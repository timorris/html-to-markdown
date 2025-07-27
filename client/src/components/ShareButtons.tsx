import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import TooltipHint from '@/components/TooltipHint';

interface ShareButtonsProps {
  htmlContent: string;
  markdownContent: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ htmlContent, markdownContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();



  // Generate a shareable link with content
  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    if (htmlContent) {
      params.set('html', encodeURIComponent(htmlContent.slice(0, 2000))); // Limit length
    }
    if (markdownContent) {
      params.set('markdown', encodeURIComponent(markdownContent.slice(0, 2000))); // Limit length
    }
    
    return `${baseUrl}/?${params.toString()}`;
  };

  // Generate preview image as data URL
  const generatePreviewImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = 1200;
    canvas.height = 630; // Standard social media preview size

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a'); // slate-950
    gradient.addColorStop(1, '#1e293b'); // slate-800
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#f8fafc'; // slate-50
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HTML ↔ Markdown Converter', canvas.width / 2, 150);

    // Subtitle
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.font = '32px Inter, sans-serif';
    ctx.fillText('Real-time bidirectional conversion', canvas.width / 2, 200);

    // Content preview
    const content = markdownContent || htmlContent;
    if (content) {
      ctx.fillStyle = '#e2e8f0'; // slate-200
      ctx.font = '24px Monaco, monospace';
      ctx.textAlign = 'left';
      
      const maxWidth = canvas.width - 100;
      const lineHeight = 35;
      const lines = wrapText(ctx, content.slice(0, 200), maxWidth);
      
      lines.slice(0, 8).forEach((line, index) => {
        ctx.fillText(line, 50, 280 + (index * lineHeight));
      });

      if (content.length > 200) {
        ctx.fillStyle = '#64748b'; // slate-500
        ctx.fillText('...', 50, 280 + (8 * lineHeight));
      }
    }

    // Logo/Icon area
    ctx.fillStyle = '#6366f1'; // indigo-500
    ctx.fillRect(canvas.width - 120, 50, 70, 70);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('↔', canvas.width - 85, 95);

    return canvas.toDataURL('image/png');
  };

  // Helper function to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  // Share to Twitter
  const shareToTwitter = () => {
    const url = generateShareableLink();
    const text = 'Check out this HTML ↔ Markdown conversion! Real-time bidirectional converter with dark theme.';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  // Share to Facebook
  const shareToFacebook = () => {
    const url = generateShareableLink();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  // Copy link to clipboard
  const copyLink = async () => {
    const url = generateShareableLink();
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Shareable link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      });
    }
    setIsOpen(false);
  };

  // Download preview image
  const downloadPreview = () => {
    const imageData = generatePreviewImage();
    if (!imageData) return;

    const link = document.createElement('a');
    link.download = 'html-markdown-converter-preview.png';
    link.href = imageData;
    link.click();
    
    toast({
      title: "Preview downloaded",
      description: "Social media preview image saved",
    });
    setIsOpen(false);
  };

  // Generate and show preview
  const showPreview = () => {
    const imageData = generatePreviewImage();
    setPreviewImage(imageData);
  };

  const hasContent = htmlContent.trim().length > 0 || markdownContent.trim().length > 0;

  return (
    <TooltipHint content={hasContent ? "Share your conversion" : "Add content to enable sharing"}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
            disabled={!hasContent}
            title="Share conversion"
          >
            <Share2 className="w-5 h-5 text-slate-400" />
          </Button>
        </PopoverTrigger>
      <PopoverContent className="w-72 p-0" side="bottom" align="end">
        <div className="p-4">
          <h3 className="font-medium text-sm mb-3 text-slate-900 dark:text-slate-100">
            Share Conversion
          </h3>
          
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={shareToTwitter}
              className="w-full justify-start"
            >
              <Twitter className="w-4 h-4 mr-2 text-blue-400" />
              Share on Twitter
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={shareToFacebook}
              className="w-full justify-start"
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Share on Facebook
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyLink}
              className="w-full justify-start"
            >
              <Link className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
              Copy link
            </Button>
            
            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={showPreview}
                className="w-full justify-start"
              >
                <Eye className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
                Preview image
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadPreview}
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
                Download preview
              </Button>
            </div>
          </div>
          
          {previewImage && (
            <div className="mt-4 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <img 
                src={previewImage} 
                alt="Share preview" 
                className="w-full h-auto"
                style={{ maxHeight: '120px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
    </TooltipHint>
  );
};

export default ShareButtons;