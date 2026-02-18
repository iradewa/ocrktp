
import React, { useState, useCallback } from 'react';
import FileUpload from './FileUpload';
import ResultForm from './ResultForm';
import { extractKTPData } from '../services/geminiService';
import { KTPData } from '../types';

const OCRApp: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KTPData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setImage(base64);
    setError(null);
    setData(null);
  };

  const handleExtract = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const result = await extractKTPData(image);
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError("Gagal membaca KTP. Pastikan gambar jelas dan terang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Panel: Upload & Control */}
      <div className="space-y-6">
        <FileUpload 
          onImageSelect={handleImageSelect} 
          currentImage={image} 
          loading={loading}
        />
        
        <button
          onClick={handleExtract}
          disabled={!image || loading}
          className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md
            ${!image || loading 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.98]'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Mengekstrak Data...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                <path d="M11 4a1 1 0 10-2 0v1H8a1 1 0 000 2h1v1a1 1 0 102 0V7h1a1 1 0 100-2h-1V4zM10 12a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1a1 1 0 10-2 0v1h-1zM16 11a1 1 0 100-2h-1V8a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1z" />
              </svg>
              <span>Ekstrak Data</span>
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="text-amber-800 font-bold text-sm mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips Akurasi:
          </h3>
          <ul className="text-amber-700 text-sm space-y-2 list-disc ml-5">
            <li>Gunakan foto yang terang dan fokus (tidak blur).</li>
            <li>Pastikan teks tidak tertutup pantulan cahaya (hologram).</li>
            <li>Posisi bebas (bisa vertikal, horizontal, atau miring).</li>
          </ul>
        </div>
      </div>

      {/* Right Panel: Results Form */}
      <ResultForm data={data} loading={loading} />
    </div>
  );
};

export default OCRApp;
