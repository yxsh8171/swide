
import React from 'react';
import { Canvas } from 'fabric';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasSize: {
    width: number;
    height: number;
  };
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ canvasRef, canvasSize }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/30 p-8 overflow-auto">
      <div 
        className="canvas-container" 
        style={{ 
          width: `${canvasSize.width}px`, 
          height: `${canvasSize.height}px`,
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        <canvas ref={canvasRef} className="border rounded-md" />
      </div>
    </div>
  );
};

export default CanvasArea;
