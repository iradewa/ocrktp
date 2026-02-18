
import React, { useRef, useState, useEffect } from 'react';

interface FileUploadProps {
  onImageSelect: (base64: string) => void;
  currentImage: string | null;
  loading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageSelect, currentImage, loading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Support Ctrl+V paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) processFile(blob);
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative group cursor-pointer aspect-[16/10] w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50'}`}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        accept="image/*"
      />

      {currentImage ? (
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-full h-full object-contain rounded-lg shadow-sm"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <span className="text-white font-medium px-4 py-2 bg-black/50 rounded-full">Ganti Gambar</span>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-slate-700 font-semibold text-lg">Klik untuk upload atau Drag & Drop</p>
            <p className="text-slate-400 text-sm">Bisa juga <kbd className="px-1.5 py-0.5 rounded border bg-slate-100 font-sans text-xs">ctrl+V</kbd> (Paste) gambar di sini</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
