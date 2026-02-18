
import React, { useState, useEffect } from 'react';
import OCRApp from './components/OCRApp';

const App: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800">KTP OCR Extractor</h1>
          <p className="text-slate-500 mt-1">Ekstrak data dari kartu identitas secara otomatis</p>
        </header>
        <OCRApp />
      </div>
      
      <footer className="mt-12 py-6 text-center text-slate-400 text-sm">
        <p>created by IRD</p>
        <p className="mt-1">&copy; 2026 Halal Connect</p>
      </footer>
    </div>
  );
};

export default App;
