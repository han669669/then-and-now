import { useRef, useState } from 'react';
import { Button } from '@heroui/react';
import { validateImageFile, readFileAsDataURL } from '@/utils/validation';
import type { ImageData } from '@/types/image';

interface Props {
  id: 'then' | 'now';
  imageData: ImageData;
  onUpload: (id: 'then' | 'now', updates: Partial<ImageData>) => void;
  onRemove: (id: 'then' | 'now') => void;
}

export function ImageUploader({ id, imageData, onUpload, onRemove }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    const validation = validateImageFile(file);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      onUpload(id, { file, dataUrl });
    } catch (err) {
      setError('Failed to read file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {imageData.dataUrl ? (
          <div className="space-y-4">
            <img
              src={imageData.dataUrl}
              alt={`${id} preview`}
              className="max-h-40 mx-auto rounded"
            />
            <div className="flex gap-2 justify-center">
              <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                Replace
              </Button>
              <Button size="sm" color="danger" onClick={() => onRemove(id)}>
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              Drag & drop {id === 'then' ? '"Then"' : '"Now"'} image here
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              Choose File
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
