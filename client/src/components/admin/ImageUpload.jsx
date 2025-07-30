import React, { use, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { File, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files[0]);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-5">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-2xl overflow-hidden"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer  hover:bg-gray-50"
          >
            <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 " />
            <span>Drag and Drop or Click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-center gap-2 px-2 py-1">
            <div className="flex items-center">
              <File className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-medium truncate">{imageFile.name}</p>
            <Button
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
