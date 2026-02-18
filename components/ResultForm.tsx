
import React, { useState, useEffect } from 'react';
import { KTPData } from '../types';

interface FieldProps {
  label: string;
  value: string;
  placeholder?: string;
  className?: string;
  type?: string;
  isLarge?: boolean;
  onCopy: (text: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, value, placeholder = "-", className = "", type = "text", isLarge = false, onCopy }) => {
  const [val, setVal] = useState(value);
  
  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleClick = () => {
    if (val && val !== "-") {
      onCopy(val);
    }
  };

  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-slate-500 mb-1 tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        {isLarge ? (
          <textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onClick={handleClick}
            placeholder={placeholder}
            rows={2}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none cursor-pointer hover:bg-slate-100"
          />
        ) : (
          <input
            type={type}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onClick={handleClick}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer hover:bg-slate-100"
          />
        )}
      </div>
    </div>
  );
};

const ResultForm: React.FC<ResultFormProps> = ({ data, loading }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string | undefined) => {
    if (!text || text === "" || text === "-") return;
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const defaultData: KTPData = {
    nik: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    desaKelurahan: "",
    kecamatan: "",
    agama: "",
    pekerjaan: "",
    golonganDarah: "",
    statusPerkawinan: "",
    kewarganegaraan: "",
    emailSaran: "",
    noHpSaran: "",
  };

  const displayData = data || defaultData;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full min-h-[600px]">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Hasil Ekstraksi</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Klik kolom untuk menyalin</span>
      </div>

      <div className="p-6 space-y-5 overflow-y-auto flex-1">
        <Field label="Nomor Induk Kependudukan (NIK)" value={displayData.nik} onCopy={handleCopy} />
        <Field label="Nama Lengkap" value={displayData.nama} onCopy={handleCopy} />
        
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tempat Lahir" value={displayData.tempatLahir} onCopy={handleCopy} />
          <Field label="Tanggal Lahir" value={displayData.tanggalLahir} placeholder="DD-MM-YYYY" onCopy={handleCopy} />
        </div>

        <Field label="Alamat" value={displayData.alamat} isLarge onCopy={handleCopy} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Desa/Kelurahan" value={displayData.desaKelurahan} onCopy={handleCopy} />
          <Field label="Kecamatan" value={displayData.kecamatan} onCopy={handleCopy} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Agama" value={displayData.agama} onCopy={handleCopy} />
          <Field label="Kodepos" value="" placeholder="Isi manual jika kosong" onCopy={handleCopy} />
        </div>

        <Field label="Pekerjaan" value={displayData.pekerjaan} onCopy={handleCopy} />

        <div className="pt-4 border-t border-dashed border-slate-200 mt-2">
          {/* Email suggestion field */}
          <div className="mb-4">
             <div className="flex items-center gap-2 mb-1">
              <label className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Email Otomatis</label>
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-bold rounded uppercase">Auto-Generated</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="text"
                  readOnly
                  onClick={() => handleCopy(displayData.emailSaran)}
                  value={displayData.emailSaran}
                  placeholder="Menunggu data..."
                  className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-slate-600 text-sm focus:outline-none cursor-pointer hover:bg-blue-100/50 transition-colors"
                />
              </div>
              <button 
                onClick={() => handleCopy(displayData.emailSaran)}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Phone suggestion field */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">No HP Otomatis</label>
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-bold rounded uppercase">Auto-Generated</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.587 4.587l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  type="text"
                  readOnly
                  onClick={() => handleCopy(displayData.noHpSaran)}
                  value={displayData.noHpSaran}
                  placeholder="08..."
                  className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-slate-600 text-sm focus:outline-none cursor-pointer hover:bg-blue-100/50 transition-colors"
                />
              </div>
              <button 
                onClick={() => handleCopy(displayData.noHpSaran)}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {copyStatus && (
        <div className="fixed bottom-8 right-8 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-bounce z-50">
          {copyStatus}
        </div>
      )}
    </div>
  );
};

interface ResultFormProps {
  data: KTPData | null;
  loading: boolean;
}

export default ResultForm;
