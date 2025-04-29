
import React from 'react';
import { Input } from "@/components/ui/input";

interface ImageToolbarProps {
  addImageFromFile: (file: File) => void;
}

const ImageToolbar: React.FC<ImageToolbarProps> = ({ addImageFromFile }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              addImageFromFile(e.target.files[0]);
            }
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageToolbar;
