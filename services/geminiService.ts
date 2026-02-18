
import { GoogleGenAI, Type } from "@google/genai";
import { KTPData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const KTP_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    nik: { type: Type.STRING, description: '16 digit NIK' },
    nama: { type: Type.STRING, description: 'Nama lengkap' },
    tempatLahir: { type: Type.STRING, description: 'Tempat lahir' },
    tanggalLahir: { type: Type.STRING, description: 'Tanggal lahir format DD-MM-YYYY' },
    alamat: { type: Type.STRING, description: 'Alamat lengkap jalan/blok/nomor' },
    desaKelurahan: { type: Type.STRING, description: 'Desa atau Kelurahan' },
    kecamatan: { type: Type.STRING, description: 'Kecamatan' },
    agama: { type: Type.STRING, description: 'Agama' },
    pekerjaan: { type: Type.STRING, description: 'Pekerjaan' },
    golonganDarah: { type: Type.STRING, description: 'Golongan darah (A, B, AB, O, atau -)' },
    statusPerkawinan: { type: Type.STRING, description: 'Status perkawinan' },
    kewarganegaraan: { type: Type.STRING, description: 'Kewarganegaraan' },
  },
  required: ['nik', 'nama', 'alamat'],
};

export const extractKTPData = async (imageBase64: string): Promise<KTPData> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analisis gambar KTP Indonesia berikut. 
    Ekstrak semua informasi yang terlihat ke dalam format JSON yang terstruktur. 
    Jika KTP terbalik, miring, atau vertikal, koreksi pembacaan Anda secara otomatis.
    Format field Tanggal Lahir harus DD-MM-YYYY.
    Jika ada bagian yang tidak terbaca, gunakan tanda "-".
  `;

  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: imageBase64.split(",")[1] || imageBase64,
    },
  };

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: KTP_SCHEMA,
    },
  });

  const rawText = response.text;
  if (!rawText) throw new Error("Gagal mengekstrak data dari gambar.");

  const data = JSON.parse(rawText) as KTPData;

  // Extract year of birth from DD-MM-YYYY
  let birthYear = "";
  if (data.tanggalLahir && data.tanggalLahir.includes('-')) {
    const parts = data.tanggalLahir.split('-');
    if (parts.length === 3) {
      birthYear = parts[2];
    }
  }

  // Logic: Email ends with kh+[year]@gmail.com, max length before @ is 15 chars
  const suffix = `kh${birthYear}`;
  const maxLocalLength = 15;
  const availableForName = Math.max(0, maxLocalLength - suffix.length);
  
  let namePart = "";
  if (data.nama) {
    // Remove non-alphanumeric and spaces
    namePart = data.nama.toLowerCase().replace(/[^a-z0-9]/g, '');
    namePart = namePart.substring(0, availableForName);
  } else {
    namePart = "user".substring(0, availableForName);
  }
  
  data.emailSaran = `${namePart}${suffix}@gmail.com`;

  // Logic: Phone starts with 0881
  data.noHpSaran = "0881" + Math.floor(Math.random() * 90000000 + 10000000);

  return data;
};
