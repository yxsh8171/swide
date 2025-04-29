
import React from 'react';
import { Button } from "@/components/ui/button";
import { Square, Circle as CircleIcon, Triangle as TriangleIcon } from 'lucide-react';

interface ShapesToolbarProps {
  addShape: (type: 'circle' | 'rectangle' | 'triangle') => void;
}

const ShapesToolbar: React.FC<ShapesToolbarProps> = ({ addShape }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Add Shapes</h3>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          className="flex flex-col h-20 items-center justify-center"
          onClick={() => addShape('rectangle')}
        >
          <Square size={24} />
          <span className="text-xs mt-1">Rectangle</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col h-20 items-center justify-center"
          onClick={() => addShape('circle')}
        >
          <CircleIcon size={24} />
          <span className="text-xs mt-1">Circle</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col h-20 items-center justify-center"
          onClick={() => addShape('triangle')}
        >
          <TriangleIcon size={24} />
          <span className="text-xs mt-1">Triangle</span>
        </Button>
      </div>
    </div>
  );
};

export default ShapesToolbar;
