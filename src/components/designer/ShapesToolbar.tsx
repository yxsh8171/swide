
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textbox } from 'fabric';

// Color presets
const colorPresets = [
  '#1a1a1a', '#ffffff', '#ff5252', '#3b82f6', 
  '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'
];

interface ShapesToolbarProps {
  selectedElement: any | null;
  addShape: (type: 'circle' | 'rectangle' | 'triangle') => void;
  fabricRef: React.RefObject<fabric.Canvas | null>;
}

const ShapesToolbar: React.FC<ShapesToolbarProps> = ({
  selectedElement,
  addShape,
  fabricRef
}) => {
  const isShape = selectedElement && !(selectedElement instanceof Textbox);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button onClick={() => addShape('rectangle')} size="sm" className="h-16">
          Rectangle
        </Button>
        <Button onClick={() => addShape('circle')} size="sm" className="h-16">
          Circle
        </Button>
        <Button onClick={() => addShape('triangle')} size="sm" className="h-16">
          Triangle
        </Button>
      </div>
      
      {isShape && (
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fill Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map(color => (
                <button
                  key={color}
                  className="w-full aspect-square rounded-md border flex items-center justify-center"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    selectedElement.set('fill', color);
                    fabricRef.current?.renderAll();
                  }}
                />
              ))}
            </div>
            <Input
              type="color"
              value={(selectedElement?.fill as string) || '#000000'}
              onChange={(e) => {
                selectedElement.set('fill', e.target.value);
                fabricRef.current?.renderAll();
              }}
              className="mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapesToolbar;
