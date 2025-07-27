import React, { useState, useRef, useEffect } from 'react';
import { Smile, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IconPreview from './IconPreview';

// Common emojis organized by category
const emojiCategories = {
  smileys: {
    name: 'Smileys & People',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
      '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
    ]
  },
  nature: {
    name: 'Animals & Nature',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
      '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
      '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
      '🌸', '🌼', '🌻', '🌺', '🌷', '🌹', '🥀', '🌾', '🌿', '🍀',
      '🌳', '🌲', '🌴', '🌵', '🌶', '🍄', '🌰', '🌍', '🌎', '🌏'
    ]
  },
  food: {
    name: 'Food & Drink',
    emojis: [
      '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
      '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
      '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔',
      '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈',
      '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟',
      '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🍝'
    ]
  },
  objects: {
    name: 'Objects',
    emojis: [
      '⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹',
      '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
      '📽', '🎞', '📞', '☎', '📟', '📠', '📺', '📻', '🎙', '🎚',
      '🎛', '⏰', '🕰', '⏱', '⏲', '⏰', '🔋', '🔌', '💡', '🔦',
      '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰',
      '💳', '💎', '⚖', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙'
    ]
  },
  symbols: {
    name: 'Symbols',
    emojis: [
      '❤', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮',
      '✝', '☪', '🕉', '☸', '✡', '🔯', '🕎', '☯', '☦', '🛐',
      '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
      '♑', '♒', '♓', '🆔', '⚛', '🉑', '☢', '☣', '📴', '📳',
      '🈶', '🈚', '🈸', '🈺', '🈷', '✴', '🆚', '💮', '🉐', '㊙'
    ]
  }
};

// Lucide icons organized by category
const iconCategories = {
  ui: {
    name: 'UI & Navigation',
    icons: [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight',
      'ChevronUp', 'ChevronDown', 'Menu', 'X', 'Plus', 'Minus', 'Check', 'CheckCircle',
      'AlertCircle', 'AlertTriangle', 'Info', 'HelpCircle', 'Search', 'Filter'
    ]
  },
  files: {
    name: 'Files & Documents',
    icons: [
      'File', 'FileText', 'Folder', 'FolderOpen', 'Download', 'Upload', 'Save',
      'Copy', 'Cut', 'Clipboard', 'Edit', 'Edit3', 'Trash', 'Archive', 'BookOpen'
    ]
  },
  communication: {
    name: 'Communication',
    icons: [
      'Mail', 'Send', 'Phone', 'MessageCircle', 'MessageSquare', 'Bell', 'BellOff',
      'Volume2', 'VolumeX', 'Mic', 'MicOff', 'Video', 'VideoOff', 'Share', 'Link'
    ]
  },
  media: {
    name: 'Media & Entertainment',
    icons: [
      'Play', 'Pause', 'Stop', 'SkipForward', 'SkipBack', 'FastForward', 'Rewind',
      'Volume', 'Image', 'Camera', 'Video', 'Music', 'Headphones', 'Film', 'Tv'
    ]
  },
  tools: {
    name: 'Tools & Settings',
    icons: [
      'Settings', 'Tool', 'Wrench', 'Hammer', 'Scissors', 'Paperclip', 'Pin',
      'Lock', 'Unlock', 'Key', 'Shield', 'Eye', 'EyeOff', 'Zap', 'Battery'
    ]
  }
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onIconSelect: (iconName: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onIconSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('emojis');

  const filteredEmojis = React.useMemo(() => {
    if (!searchTerm) return emojiCategories;
    
    const filtered: Partial<typeof emojiCategories> = {};
    Object.entries(emojiCategories).forEach(([key, category]) => {
      const matchingEmojis = category.emojis.filter(emoji => 
        emoji.includes(searchTerm.toLowerCase())
      );
      if (matchingEmojis.length > 0) {
        filtered[key as keyof typeof emojiCategories] = {
          ...category,
          emojis: matchingEmojis
        };
      }
    });
    return filtered;
  }, [searchTerm]);

  const filteredIcons = React.useMemo(() => {
    if (!searchTerm) return iconCategories;
    
    const filtered: Partial<typeof iconCategories> = {};
    Object.entries(iconCategories).forEach(([key, category]) => {
      const matchingIcons = category.icons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingIcons.length > 0) {
        filtered[key as keyof typeof iconCategories] = {
          ...category,
          icons: matchingIcons
        };
      }
    });
    return filtered;
  }, [searchTerm]);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const handleIconClick = (iconName: string) => {
    onIconSelect(iconName);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <Smile className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="start">
        <div className="border-b border-slate-200 dark:border-slate-700 p-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search emojis and icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emojis">Emojis</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
          </TabsList>

          <TabsContent value="emojis" className="max-h-64 overflow-y-auto p-2">
            {Object.entries(filteredEmojis).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-4">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 px-2">
                  {category.name}
                </h4>
                <div className="grid grid-cols-8 gap-1">
                  {category.emojis.map((emoji, index) => (
                    <button
                      key={`${categoryKey}-${index}`}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title={emoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(filteredEmojis).length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No emojis found for "{searchTerm}"
              </div>
            )}
          </TabsContent>

          <TabsContent value="icons" className="max-h-64 overflow-y-auto p-2">
            {Object.entries(filteredIcons).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-4">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 px-2">
                  {category.name}
                </h4>
                <div className="grid grid-cols-6 gap-1">
                  {category.icons.map((iconName, index) => {
                    return (
                      <button
                        key={`${categoryKey}-${index}`}
                        onClick={() => handleIconClick(iconName)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                        title={iconName}
                      >
                        <IconPreview iconName={iconName} className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {Object.keys(filteredIcons).length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No icons found for "{searchTerm}"
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;