
import React from 'react';
import { Circle, Rect, Triangle } from 'fabric';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextToolbar from './TextToolbar';
import ShapesToolbar from './ShapesToolbar';
import ImageToolbar from './ImageToolbar';
import SuggestionPanel from './SuggestionPanel';
import CommonActions from './CommonActions';
import { TextOptions } from '@/hooks/useDesignCanvas';

interface EditorSidebarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  textOptions: TextOptions;
  setTextOptions: (options: TextOptions) => void;
  addNewText: () => void;
  addShape: (type: 'circle' | 'rectangle' | 'triangle') => void;
  updateTextProperty: (property: string, value: any) => void;
  selectedElement: any;
  deleteSelectedElement: () => void;
  addImageFromFile: (file: File) => void;
  exportDesign: (format: 'png' | 'jpeg') => void;
  fabricRef: React.MutableRefObject<any>;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeTool,
  setActiveTool,
  textOptions,
  setTextOptions,
  addNewText,
  addShape,
  updateTextProperty,
  selectedElement,
  deleteSelectedElement,
  addImageFromFile,
  exportDesign,
  fabricRef
}) => {
  return (
    <div className="w-64 h-full border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Design Tools</h2>
        <div className="flex mt-2 space-x-2">
          <Button 
            variant={activeTool === 'text' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTool('text')}
            className="flex-1"
          >
            Text
          </Button>
          <Button 
            variant={activeTool === 'shapes' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTool('shapes')}
            className="flex-1"
          >
            Shapes
          </Button>
          <Button 
            variant={activeTool === 'image' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTool('image')}
            className="flex-1"
          >
            Image
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeTool === 'text' && (
            <TextToolbar 
              textOptions={textOptions} 
              setTextOptions={setTextOptions}
              updateTextProperty={updateTextProperty} 
              addNewText={addNewText} 
              selectedElement={selectedElement}
            />
          )}
          
          {activeTool === 'shapes' && (
            <ShapesToolbar addShape={addShape} />
          )}
          
          {activeTool === 'image' && (
            <ImageToolbar addImageFromFile={addImageFromFile} />
          )}
          
          {selectedElement && (
            <>
              <Separator className="my-4" />
              <SuggestionPanel />
            </>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <CommonActions 
          selectedElement={selectedElement}
          deleteSelectedElement={deleteSelectedElement}
          exportDesign={exportDesign}
        />
      </div>
    </div>
  );
};

export default EditorSidebar;
