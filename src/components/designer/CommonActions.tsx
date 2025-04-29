
import React from 'react';
import { Button } from "@/components/ui/button";

interface CommonActionsProps {
  selectedElement: any | null;
  deleteSelectedElement: () => void;
  exportDesign: (format: 'png' | 'jpeg') => void;
}

const CommonActions: React.FC<CommonActionsProps> = ({ 
  selectedElement, 
  deleteSelectedElement,
  exportDesign
}) => {
  return (
    <div className="space-y-4">
      {selectedElement && (
        <div className="pt-4 border-t space-y-4">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={deleteSelectedElement}
          >
            Delete Selected Element
          </Button>
        </div>
      )}
      
      <div className="pt-4 border-t">
        <h3 className="font-medium mb-4">Export Design</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportDesign('png')}
            className="flex-1"
          >
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportDesign('jpeg')}
            className="flex-1"
          >
            JPEG
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonActions;
