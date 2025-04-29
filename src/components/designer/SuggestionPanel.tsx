
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const SuggestionPanel: React.FC = () => {
  return (
    <div>
      <h3 className="font-medium mb-4">AI Design Suggestions</h3>
      
      <div className="space-y-4">
        <div className="rounded-md border bg-card p-3">
          <h4 className="font-medium text-sm mb-1">Color Palette</h4>
          <p className="text-sm text-muted-foreground mb-2">Try a professional blue scheme</p>
          <div className="flex gap-1 mb-2">
            {['#1e3a8a', '#3b82f6', '#93c5fd', '#dbeafe', '#f8fafc'].map(color => (
              <div 
                key={color} 
                className="w-full h-6 rounded-sm" 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
          <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
        </div>
        
        <div className="rounded-md border bg-card p-3">
          <h4 className="font-medium text-sm mb-1">Layout Improvement</h4>
          <p className="text-sm text-muted-foreground mb-2">Balance elements for better hierarchy</p>
          <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
        </div>
        
        <div className="rounded-md border bg-card p-3">
          <h4 className="font-medium text-sm mb-1">Font Pairing</h4>
          <p className="text-sm text-muted-foreground mb-2">Georgia & Verdana for contrast</p>
          <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
        </div>
        
        <div className="rounded-md border bg-card p-3">
          <h4 className="font-medium text-sm mb-1">Background Style</h4>
          <p className="text-sm text-muted-foreground mb-2">Add subtle gradient background</p>
          <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
        </div>
      </div>
      
      <div className="mt-8">
        <Button className="w-full gap-2">
          Get More Suggestions <MoveRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SuggestionPanel;
