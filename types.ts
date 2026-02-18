
export interface KTPData {
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  desaKelurahan: string;
  kecamatan: string;
  agama: string;
  pekerjaan: string;
  golonganDarah: string;
  statusPerkawinan: string;
  kewarganegaraan: string;
  emailSaran?: string;
  noHpSaran?: string;
}

export interface ExtractionResponse {
  data: KTPData;
  success: boolean;
  error?: string;
}
