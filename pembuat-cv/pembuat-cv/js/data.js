// DATA: isi awal CV (D), data kosong (BLANK), dan pengaturan kolom form (LISTS)
const D={
 sertakanSurat:true,sertakanLampiran:true,
 nama:"MR. XXX",ttl:"Jakarta, 17 Agustus 1991",alamat:"Jl. xxx No. 48, XXX - Jakarta Pusat",telp:"0813-xxxx-xxxx",email:"xxxxxxx@gmail.com",
 kota:"Pekanbaru",tanggal:"",perusahaan:"PT. XXX",posisi:"XXX",
 pengalaman:"Saya memiliki pengalaman langsung sebagai Teknisi Walkthrough Pipeline di PT. XXX (Mei 2023 - Juni 2024) dan dilanjutkan sebagai Teknisi Patrol Pipeline di PT. XXX (Juni 2024 - September 2026), yang membuat saya terbiasa bekerja sesuai prosedur, mengutamakan keselamatan, serta teliti dan konsisten dalam menyelesaikan tugas dan tanggung jawab pekerjaan.",
 lampiranSurat:"Daftar Riwayat Hidup (CV)\nScan Kartu Tanda Penduduk (KTP)\nScan Ijazah Terakhir\nScan Sertifikat Pelatihan terkait (Hapus jika tidak ada)",
 profil:"Profesional dengan pengalaman di bidang operasional dan pengawasan lapangan, memiliki kemampuan beradaptasi, dokumentasi, koordinasi, serta penyelesaian masalah di lapangan. Saat ini menempuh pendidikan jarak jauh pada jurusan Informatika dan aktif mengembangkan kemampuan di bidang teknologi informasi. Termotivasi untuk terus berkembang dan memberikan kontribusi yang disiplin dan berorientasi pada hasil.",
 kerja:[
  {jabatan:"(Contoh) : Teknisi Patrol Pipeline",perusahaan:"PT. XXX, Duri – Bengkalis",periode:"26 Juni 2024 – 21 September 2026",uraian:"(Contoh) Monitoring kondisi jalur pipa minyak secara berkala.\nMemantau, memastikan dan melaporkan aktivitas di dekat jalur pipa dan fasilitas.\nMendokumentasikan serta melakukan sosialisasi keselamatan kepada masyarakat di sekitar pipa."},
  {jabatan:"(Contoh) : Teknisi Walkthrough Pipeline",perusahaan:"PT. XXX, Duri – Bengkalis",periode:"9 Mei 2023 – 26 Juni 2024",uraian:"(Contoh) Monitoring kondisi jalur pipa minyak secara lebih dekat.\nMemantau, memastikan dan melaporkan aktivitas di dekat jalur pipa dan fasilitas.\nMendokumentasikan serta melakukan sosialisasi keselamatan kepada masyarakat."},
  {jabatan:"(Contoh) : Operator Mesin Produksi",perusahaan:"PT. XXX, Pulau Burung – Indragiri Hilir",periode:"16 Desember 2014 – 16 Maret 2021",uraian:"(Contoh) Mengoperasikan dan memantau mesin produksi sesuai standar operasional.\nMemastikan proses produksi berjalan aman, lancar, dan sesuai target.\nMemeriksa kondisi mesin serta menjaga kualitas produk dan kebersihan area kerja."}],
 pendidikan:[
  {nama:"Universitas XXX – Jakarta",detail:"S1 Pendidikan Jarak Jauh (PJJ) Informatika",tahun:"2025 – Sekarang"},
  {nama:"SMAN XXX – Jakarta",detail:"",tahun:"2006 – 2009"},
  {nama:"MTs XXX – Jakarta",detail:"",tahun:"2003 – 2006"},
  {nama:"SD XXX – Jakarta",detail:"",tahun:"1997 – 2003"}],
 teknis:"Penerapan Prosedur dan Instruksi Kerja, Pencatatan dan Pelaporan Kerja Dasar, Pemanfaatan Perangkat Digital dan Aplikasi Komunikasi, Menjaga Kebersihan dan Kerapian Area Kerja.",
 nonteknis:"Etos Kerja dan Disiplin, Integritas dan Tanggung Jawab, Kerja Sama Tim, Komunikasi Efektif, Adaptabilitas dan Kemauan Belajar",
 sertifikat:"Contoh :Basic Fire Fighting | 2023\nDefensive Driving | 2023\nFirst Aid & CPR | 2023\nEffective Communication | 2023 & 2025\nBantuan Hidup Dasar (P3K) | 2025\nFuture Career AI Data Trainer | 2025",
 organisasi:[
  {nama:"(Contoh) : Karang Taruna",jabatan:"Seksi Keagamaan",periode:"2019 – 2021",uraian:"Berperan dalam perencanaan dan pelaksanaan kegiatan keagamaan, membangun kebersamaan pemuda di lingkungan masyarakat."},
  {nama:"(Contoh) : Pemuda Desa",jabatan:"Bendahara",periode:"2017 – 2019",uraian:"Mengelola administrasi dan keuangan organisasi secara tertib, transparan, dan bertanggung jawab."}],
 lampIdentitas:"KTP, NPWP, SIM A, SIM C, Kartu Keluarga, Ijazah Terakhir",
 lampPendukung:"Pengalaman Kerja, Sertifikat Pelatihan"
};
const BLANK={sertakanSurat:true,sertakanLampiran:true,nama:"",ttl:"",alamat:"",telp:"",email:"",kota:"",tanggal:"",perusahaan:"",posisi:"",pengalaman:"",kelebihan:"",lampiranSurat:"Daftar Riwayat Hidup (CV)\nScan Kartu Tanda Penduduk (KTP)\nScan Ijazah Terakhir\nScan Sertifikat Pelatihan terkait",profil:"",kerja:[],pendidikan:[],teknis:"",nonteknis:"",sertifikat:"",organisasi:[],lampIdentitas:"",lampPendukung:""};
// DRAFT profil singkat: pilihan yang bisa diklik pengguna (kata dalam [KURUNG SIKU] diganti sendiri)
const DRAFT_PROFIL=[
 {label:"Umum",teks:"Pribadi yang memiliki semangat belajar tinggi, disiplin, jujur, selalu mengedepankan attituted dan mudah beradaptasi. Terbiasa bekerja sama dalam tim serta bertanggung jawab terhadap tugas yang diberikan. Siap belajar dengan cepat dan berkontribusi secara maksimal."},
 {label:"Berpengalaman",teks:"Profesional dengan pengalaman [JUMLAH] tahun di bidang [BIDANG],membentuk pekerja disiplin, teliti, dan bertanggung jawab dalam menyelesaikan pekerjaan sesuai standar yang berlaku. Mampu bekerja sama dengan tim, beradaptasi dengan lingkungan kerja, serta menyelesaikan tugas tepat waktu. Berkomitmen untuk terus belajar dan memberikan hasil kerja yang terbaik pada perusahaan."},
];
// DRAFT keahlian: pilihan yang bisa diklik (isi kolom Teknis dan Non-teknis)
const DRAFT_KEAHLIAN=[
 {label:"Umum",teknis:"Penerapan Keselamatan Kerja Dasar, Pengoperasian Peralatan Kerja Sederhana, Menjaga Kebersihan dan Kerapian Area Kerja, Pelayanan dan Komunikasi dengan Orang Lain",nonteknis:"Disiplin, Jujur, Bertanggung Jawab, Kerja Tim, Komunikasi, Mudah Beradaptasi"},
 {label:"Skill",teknis:"Microsoft Office (Word, Excel), Administrasi dan Pengarsipan Dokumen, Penyusunan Laporan Kerja, Penerapan Prosedur Operasional dan K3, Komunikasi Digital (Email, WhatsApp)",nonteknis:"Komunikasi Efektif, Kerja Sama Tim, Manajemen Waktu, Pemecahan Masalah, Ketelitian dan Tanggung Jawab, Adaptabilitas"},
 ];
// DRAFT paragraf pengalaman di surat lamaran
const DRAFT_PENGALAMAN=[
 {label:"Berpengalaman",teks:"Saya memiliki pengalaman lebih dari tiga tahun di bidang XXX, sebagai Teknisi XXX di PT. XXX (Mei 2023 – Juni 2024) dan Teknisi XXXX di PT. XXX (Juni 2024 – September 2026). Pengalaman tersebut membentuk saya menjadi pribadi yang disiplin, teliti, dan konsisten dalam menjalankan prosedur kerja, mengutamakan keselamatan, serta bertanggung jawab menyelesaikan tugas sesuai standar perusahaan."},
 {label:"Belum berpengalaman",teks:"Meskipun belum memiliki pengalaman kerja formal, saya pernah terlibat dalam kegiatan di lingkungan sekitar yang melatih saya bekerja sama, bertanggung jawab, dan berkomunikasi dengan baik serta selalu mengedepankan attitude yang positif. Pengalaman tersebut membuat saya siap belajar dan beradaptasi di tempat kerja yang baru."}
];
const LISTS={
 kerja:{judul:"Pengalaman kerja",item:"Pekerjaan",tambah:"Tambah pekerjaan",f:[["jabatan","Jabatan"],["perusahaan","Perusahaan, kota"],["periode","Periode","26 Juni 2024 – 21 September 2026"],["uraian","Tugas (satu baris = satu poin)","t"]]},
 pendidikan:{judul:"Pendidikan",item:"Pendidikan",tambah:"Tambah pendidikan",f:[["nama","Nama sekolah / kampus, kota"],["detail","Jurusan / program (boleh kosong)"],["tahun","Tahun","2006 – 2009"]]},
 organisasi:{judul:"Pengalaman organisasi",item:"Organisasi",tambah:"Tambah organisasi",f:[["nama","Nama organisasi"],["jabatan","Jabatan"],["periode","Periode","2019 – 2021"],["uraian","Peran (boleh kosong)","t"]]}
};
