import React from 'react';
import * as Icons from 'lucide-react';

interface IconPreviewProps {
  iconName: string;
  className?: string;
}

const IconPreview: React.FC<IconPreviewProps> = ({ iconName, className = "w-4 h-4" }) => {
  // Get the icon component from lucide-react
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
  
  if (!IconComponent) {
    // Fallback if icon doesn't exist
    return (
      <div className={`${className} bg-slate-400 rounded-sm flex items-center justify-center text-[8px] font-bold text-white`}>
        {iconName.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return <IconComponent className={className} />;
};

export default IconPreview;