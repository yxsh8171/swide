
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textbox } from 'fabric';
import { TextOptions } from '@/hooks/useDesignCanvas';

// Fonts to choose from
const fontOptions = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
];

// Color presets
const colorPresets = [
  '#1a1a1a', '#ffffff', '#ff5252', '#3b82f6', 
  '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'
];

interface TextToolbarProps {
  selectedElement: any | null;
  textOptions: TextOptions;
  setTextOptions: React.Dispatch<React.SetStateAction<TextOptions>>;
  updateTextProperty: (property: string, value: any) => void;
  addNewText: () => void;
}

const TextToolbar: React.FC<TextToolbarProps> = ({
  selectedElement,
  textOptions,
  setTextOptions,
  updateTextProperty,
  addNewText
}) => {
  const isTextSelected = selectedElement instanceof Textbox;

  return (
    <div className="space-y-4">
      <Button onClick={addNewText} size="sm" className="w-full">
        Add New Text
      </Button>
      
      {isTextSelected && (
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Font Size</label>
            <div className="flex items-center gap-2">
              <Slider
                value={[textOptions.fontSize]}
                min={8}
                max={120}
                step={1}
                onValueChange={([value]) => {
                  setTextOptions({...textOptions, fontSize: value});
                  updateTextProperty('fontSize', value);
                }}
              />
              <span className="text-sm w-8">{textOptions.fontSize}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Font Family</label>
            <Select
              value={textOptions.fontFamily}
              onValueChange={(value) => {
                setTextOptions({...textOptions, fontFamily: value});
                updateTextProperty('fontFamily', value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map(font => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Text Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map(color => (
                <button
                  key={color}
                  className="w-full aspect-square rounded-md border flex items-center justify-center"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setTextOptions({...textOptions, color});
                    updateTextProperty('color', color);
                  }}
                />
              ))}
            </div>
            <Input
              type="color"
              value={textOptions.color}
              onChange={(e) => {
                setTextOptions({...textOptions, color: e.target.value});
                updateTextProperty('color', e.target.value);
              }}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Text Alignment</label>
            <div className="grid grid-cols-3 gap-2">
              {(['left', 'center', 'right'] as const).map(align => (
                <Button
                  key={align}
                  variant={textOptions.textAlign === align ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextOptions({...textOptions, textAlign: align});
                    updateTextProperty('textAlign', align);
                  }}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={textOptions.bold ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setTextOptions({...textOptions, bold: !textOptions.bold});
                updateTextProperty('bold', !textOptions.bold);
              }}
            >
              Bold
            </Button>
            <Button
              variant={textOptions.italic ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setTextOptions({...textOptions, italic: !textOptions.italic});
                updateTextProperty('italic', !textOptions.italic);
              }}
            >
              Italic
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToolbar;
