
import React, { useState, useEffect } from 'react';
import OCRApp from './components/OCRApp';

const App: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800">KTP OCR Extractor</h1>
          <p className="text-slate-500 mt-1">Ekstrak data dari kartu identitas secara otomatis</p>
        </header>
        <OCRApp />
      </div>
    </div>
  );
};

export default App;
