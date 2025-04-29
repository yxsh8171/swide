
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TextToolbar from './TextToolbar';
import ShapesToolbar from './ShapesToolbar';
import ImageToolbar from './ImageToolbar';
import CommonActions from './CommonActions';
import { TextOptions } from '@/hooks/useDesignCanvas';

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedElement: any | null;
  textOptions: TextOptions;
  setTextOptions: React.Dispatch<React.SetStateAction<TextOptions>>;
  updateTextProperty: (property: string, value: any) => void;
  addNewText: () => void;
  addShape: (type: 'circle' | 'rectangle' | 'triangle') => void;
  deleteSelectedElement: () => void;
  addImageFromFile: (file: File) => void;
  exportDesign: (format: 'png' | 'jpeg') => void;
  fabricRef: React.RefObject<fabric.Canvas | null>;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedElement,
  textOptions,
  setTextOptions,
  updateTextProperty,
  addNewText,
  addShape,
  deleteSelectedElement,
  addImageFromFile,
  exportDesign,
  fabricRef
}) => {
  return (
    <div className="w-64 bg-card border-r p-4 overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="shapes">Shapes</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4">
          <TextToolbar
            selectedElement={selectedElement}
            textOptions={textOptions}
            setTextOptions={setTextOptions}
            updateTextProperty={updateTextProperty}
            addNewText={addNewText}
          />
        </TabsContent>
        
        <TabsContent value="shapes" className="space-y-4">
          <ShapesToolbar
            selectedElement={selectedElement}
            addShape={addShape}
            fabricRef={fabricRef}
          />
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <ImageToolbar addImageFromFile={addImageFromFile} />
        </TabsContent>
      </Tabs>
      
      <CommonActions
        selectedElement={selectedElement}
        deleteSelectedElement={deleteSelectedElement}
        exportDesign={exportDesign}
      />
    </div>
  );
};

export default EditorSidebar;
