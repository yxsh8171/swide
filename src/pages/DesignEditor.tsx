
import React, { useState } from 'react';
import DesignNavbar from '@/components/DesignNavbar';
import { useDesignCanvas } from '@/hooks/useDesignCanvas';
import EditorSidebar from '@/components/designer/EditorSidebar';
import CanvasArea from '@/components/designer/CanvasArea';
import SuggestionPanel from '@/components/designer/SuggestionPanel';

const DesignEditor = () => {
  const [activeTab, setActiveTab] = useState('text');
  
  const {
    canvasRef,
    fabricRef,
    canvasSize,
    selectedElement,
    textOptions,
    setTextOptions,
    addNewText,
    addShape,
    updateTextProperty,
    deleteSelectedElement,
    addImageFromFile,
    exportDesign
  } = useDesignCanvas();

  return (
    <div className="flex flex-col h-screen">
      <DesignNavbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - editing tools */}
        <EditorSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedElement={selectedElement}
          textOptions={textOptions}
          setTextOptions={setTextOptions}
          updateTextProperty={updateTextProperty}
          addNewText={addNewText}
          addShape={addShape}
          deleteSelectedElement={deleteSelectedElement}
          addImageFromFile={addImageFromFile}
          exportDesign={exportDesign}
          fabricRef={fabricRef}
        />
        
        {/* Main canvas area */}
        <CanvasArea 
          canvasRef={canvasRef}
          canvasSize={canvasSize}
        />
        
        {/* Right sidebar - AI suggestions */}
        <div className="w-64 bg-card border-l p-4 overflow-y-auto">
          <SuggestionPanel />
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
