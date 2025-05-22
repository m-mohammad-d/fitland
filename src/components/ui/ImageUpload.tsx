"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FiPlus, FiX, FiUpload } from "react-icons/fi";
import { useUpload } from "@/hooks/useUpload";
import UploadSpinner from "./UploadSpinner";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadFile, isUploading } = useUpload();

  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadFile(file);
      onChange([...value, url.url]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length + value.length > maxImages) {
        alert(`حداکثر ${maxImages} تصویر مجاز است`);
        return;
      }

      for (const file of imageFiles) {
        await handleImageUpload(file);
      }
    },
    [value.length, maxImages],
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length + value.length > maxImages) {
      alert(`حداکثر ${maxImages} تصویر مجاز است`);
      return;
    }

    for (const file of imageFiles) {
      await handleImageUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div key={`${url} ${index}}`} className="relative h-24 w-24">
            <Image src={url} alt={`Uploaded image ${index + 1}`} fill className="rounded-lg object-cover" />
            <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
              <FiX className="h-4 w-4" />
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <div
            className={`relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${
              isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" multiple onChange={handleFileInput} className="absolute inset-0 cursor-pointer opacity-0" disabled={isUploading} />
            {isUploading ? (
              <UploadSpinner />
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-500">
                <FiUpload className="h-6 w-6" />
                <span className="text-xs">رها کنید</span>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {value.length} از {maxImages} تصویر آپلود شده
      </p>
    </div>
  );
}
