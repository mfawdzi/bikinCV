// TEMPLATE: susunan Surat Lamaran, CV, dan Lampiran (semua kolom bisa diketik langsung)
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lines=s=>String(s||"").split("\n").map(x=>x.trim()).filter(Boolean);
const bulan=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
function hariIni(){const d=new Date();return d.getDate()+" "+bulan[d.getMonth()]+" "+d.getFullYear()}

const ed=(k,ph,tag="span")=>`<${tag} class="ed" contenteditable="true" data-k="${k}" data-ph="${ph}">${esc(S[k])}</${tag}>`;
const edl=(key,i,f,ph)=>`<span class="ed" contenteditable="true" data-l="${key}:${i}:${f}" data-ph="${ph}">${esc(S[key][i][f])}</span>`;
const daftar=(attr,txt,ph,cls="")=>{const a=lines(txt);return `<ul class="ed ${cls}" contenteditable="true" ${attr}>${(a.length?a:[""]).map(x=>`<li data-ph="${ph}">${esc(x)}</li>`).join("")}</ul>`};
const hapus=(key,i)=>`<button type="button" class="x noprint" data-del="${key}:${i}" title="Hapus">×</button>`;
const judul=(t,key,hk,lbl="Hapus bagian")=>`<h2><span>${t}</span><span class="aksi noprint">${key?`<button type="button" class="plus" data-add="${key}">+ Tambah</button>`:""}${hk?`<button type="button" class="plus" data-hide="${hk}">${lbl}</button>`:""}</span></h2>`;
const tugas=(key,i,o,ph)=>{const n=key==="kerja"?"tugas & tanggung jawab":"peran";return o.tanpa?`<button type="button" class="plus noprint" data-tog="${key}:${i}">+ Tambah ${n}</button>`:`${daftar(`data-l="${key}:${i}:uraian"`,o.uraian,ph)}<button type="button" class="plus noprint" data-tog="${key}:${i}">${key==="kerja"?"Tidak ingin menampilkan tugas dan tanggung jawab":"Hapus peran"}</button>`};
const bag=(k,kosong,isi)=>S.hide&&S.hide[k]?"":`<div class="bag${kosong?" kosong":""}">${isi}</div>`;
const lepas=()=>{const a=[["kerja","Pengalaman kerja"],["keahlian","Keahlian"],["sertifikat","Sertifikasi & pelatihan"],["organisasi","Pengalaman organisasi"]].filter(x=>S.hide&&S.hide[x[0]]);return a.length?`<div class="addbar noprint">${a.map(x=>`<button type="button" class="plus" data-show="${x[0]}">+ Tambahkan bagian ${x[1]}</button>`).join(" ")}</div>`:""};

function surat(){
 const r=(l,k,ph)=>`<tr><td>${l}</td><td>:</td><td>${ed(k,ph)}</td></tr>`;
 return `<section class="page">
 <p style="text-align:right">${ed("kota","Kota")}, ${ed("tanggal","Tanggal")}</p>
 <p style="text-align:left;margin-top:14pt">Kepada Yth.<br><b>HRD ${ed("perusahaan","Nama perusahaan tujuan")}</b><br>di Tempat</p>
<div class="draft noprint"><span>Posisi yang dilamar:</span><button type="button" class="plus${S.tanpaPosisi?"":" on"}" data-posisi="sudah">Sudah tahu posisi</button><button type="button" class="plus${S.tanpaPosisi?" on":""}" data-posisi="belum">Belum tahu posisi</button><span><i>Silakan edit sesuai keinginan Anda, Anda juga bisa menggunakan draft ini</i></span></div>
 <p style="text-align:left"><b>Perihal: Lamaran Pekerjaan${S.tanpaPosisi?"":` sebagai ${ed("posisi","Posisi yang dilamar")}`}</b></p>
 <p>Dengan hormat,</p>
<p>Sehubungan dengan adanya kesempatan kerja ${S.tanpaPosisi?"":`untuk posisi ${ed("posisi","posisi")} `}di ${ed("perusahaan","perusahaan")}, dengan ini saya yang bertanda tangan di bawah ini:</p>
 <table class="bio" style="margin:0 0 9pt 18pt">${r("Nama","nama","Nama lengkap")}${r("Tempat, tanggal lahir","ttl","Tempat, tanggal lahir")}${r("Alamat","alamat","Alamat")}${r("No. telepon","telp","Nomor telepon")}${r("Email","email","Email")}</table>
<p>bermaksud mengajukan diri untuk bergabung dan berkontribusi pada ${S.tanpaPosisi?"posisi yang sesuai dengan kemampuan dan pengalaman saya":`posisi ${ed("posisi","posisi")}`} di perusahaan yang Bapak/Ibu pimpin.</p>
<div class="draft noprint"><span>Pilih draft:</span>${DRAFT_PENGALAMAN.map((d,i)=>`<button type="button" class="plus" data-pengalaman="${i}">${d.label}</button>`).join("")}<span><i>Silakan edit sesuai keinginan Anda, Anda juga bisa menggunakan draft ini</i></span></div>
 ${ed("pengalaman","Tulis paragraf pengalaman kerja Anda di sini","p")}
 <p style="margin-bottom:2pt">Sebagai bahan pertimbangan, bersama surat ini saya lampirkan:</p>
 ${daftar('data-k="lampiranSurat"',S.lampiranSurat,"Nama berkas yang dilampirkan")}
 <p style="margin-top:9pt">Besar harapan saya untuk dapat diberikan kesempatan mengikuti proses seleksi lebih lanjut dan menjelaskan lebih detail mengenai kompetensi serta pengalaman yang saya miliki. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.</p>
 <div class="sign" style="margin-left:68%;break-inside:avoid;text-align:center;padding-top:15pt"><div>Hormat saya,</div><div class="ttd-box${S.ttd?"":" kosong"}"><canvas class="ttd-c" id="ttdC" width="540" height="240"></canvas><button type="button" class="plus noprint" id="ttdHapus">Hapus</button></div><b>${ed("nama","Nama")}</b></div>
 </section>`;
}

function cv(){
 const kerja=S.kerja.map((k,i)=>`<div class="item">${hapus("kerja",i)}<div class="split"><b>${edl("kerja",i,"jabatan","Jabatan")}</b><i>${edl("kerja",i,"periode","Periode kerja")}</i></div><div class="sub">${edl("kerja",i,"perusahaan","Perusahaan, kota")}</div>${tugas("kerja",i,k,"Tugas dan tanggung jawab")}</div>`).join("");
 const pend=S.pendidikan.map((p,i)=>`<div class="item">${hapus("pendidikan",i)}<div class="split"><span><b>${edl("pendidikan",i,"nama","Nama sekolah / kampus, kota")}</b><br><span class="sub">${edl("pendidikan",i,"detail","Jurusan / program (boleh kosong)")}</span></span><i>${edl("pendidikan",i,"tahun","Tahun")}</i></div></div>`).join("");
 const org=S.organisasi.map((o,i)=>`<div class="item">${hapus("organisasi",i)}<div class="split"><span><b>${edl("organisasi",i,"nama","Nama organisasi")}</b> – ${edl("organisasi",i,"jabatan","Jabatan")}</span><i>${edl("organisasi",i,"periode","Periode")}</i></div>${tugas("organisasi",i,o,"Peran dan kegiatan")}</div>`).join("");
 const sert=String(S.sertifikat||"").replace(/\s*\|\s*/g," · ");
 return `<section class="page">
<div class="cv-box"><div class="cv-fit"><div class="cv-head"><label class="cv-foto${S.foto?"":" kosong"}" id="fotoBox" for="fileIn">${S.foto?`<img src="${S.foto}" alt="">`:"<span>Klik untuk menambah foto</span>"}</label>
 <div class="cv-id"><h1>${ed("nama","Nama lengkap")}</h1><div class="cv-ttl">${ed("ttl","Tempat, tanggal lahir")}</div><div class="cv-kontak">${ed("telp","Telepon")} &nbsp;|&nbsp; ${ed("email","Email")} &nbsp;|&nbsp; ${ed("alamat","Alamat")}</div></div></div>
${judul("PROFIL SINGKAT")}<div class="draft noprint"><span>Pilih draft:</span>${DRAFT_PROFIL.map((d,i)=>`<button type="button" class="plus" data-draft="${i}">${d.label}</button>`).join("")}<span><i>Silakan edit sesuai keinginan Anda, Anda juga bisa menggunakan draft ini</i></span></div>${ed("profil","Tulis ringkasan singkat tentang diri Anda","p")}
 ${bag("kerja",false,`${judul("PENGALAMAN KERJA","kerja","kerja","Tidak memiliki pengalaman")}${kerja}`)}
 ${judul("PENDIDIKAN","pendidikan")}${pend}
 ${bag("keahlian",!S.teknis&&!S.nonteknis,`${judul("KEAHLIAN",null,"keahlian")}<div class="draft noprint"><span>Pilih draft:</span>${DRAFT_KEAHLIAN.map((d,i)=>`<button type="button" class="plus" data-keahlian="${i}">${d.label}</button>`).join("")}<span><i>Silakan edit sesuai keinginan Anda, Anda juga bisa menggunakan draft ini</i></span></div><div class="rata"><b>Teknis:</b> ${ed("teknis","Pisahkan dengan koma")}</div><div class="rata"><b>Non-teknis:</b> ${ed("nonteknis","Pisahkan dengan koma")}</div>`)}
 ${bag("sertifikat",!lines(S.sertifikat).length,`${judul("SERTIFIKASI & PELATIHAN",null,"sertifikat","Tidak memiliki sertifikat dan pelatihan")}${daftar('data-k="sertifikat"',sert,"Nama sertifikat · tahun","cert")}<div class="hint noprint">Tekan Enter untuk menambah sertifikat atau pelatihan baru (satu baris = satu sertifikat)</div>`)}
 ${bag("organisasi",!S.organisasi.some(o=>o.nama||o.jabatan||o.periode||o.uraian),`${judul("PENGALAMAN ORGANISASI","organisasi","organisasi","Tidak memiliki pengalaman organisasi")}${org}`)}
</div></div>${lepas()}
 </section>`;
}

function lampiran(){
 const sel=(d,i,kecil)=>`<div class="sel${kecil?" k":""}${d.file?"":" kosong"}">${hapus("dokumen",i)}<div class="lamp-judul">${kecil?"":`<span class="n">LAMPIRAN DOKUMEN</span>`}<b><span class="ed" contenteditable="true" data-dok="${i}" data-ph="Ketik nama dokumen">${esc(d.nama)}</span></b><button type="button" class="plus noprint" data-ukuran="${i}">Ukuran: ${kecil?"kecil":"besar"}</button></div><label class="lamp-isi" for="fileIn" data-pick="${i}">${d.file?`<img src="${d.file}" alt="">`:`<div class="pilih">Klik untuk memilih foto / scan</div>`}</label></div>`;
 const hal=[];let g=null;
 S.dokumen.forEach((d,i)=>{
  if(d.ukuran==="kecil"){if(!g||g.length>=6){g=[];hal.push({kecil:true,isi:g})}g.push([d,i])}
  else{g=null;hal.push({kecil:false,isi:[[d,i]]})}
 });
 return hal.map(h=>`<section class="page lamp${h.isi.every(x=>!x[0].file)?" kosong":""}">${h.kecil?`<div class="kop-lamp">LAMPIRAN DOKUMEN</div><div class="grid-k">${h.isi.map(x=>sel(x[0],x[1],true)).join("")}</div>`:sel(h.isi[0][0],h.isi[0][1],false)}</section>`).join("")
 +`<div class="addbar noprint"><div class="chips"><button type="button" class="plus" data-add="dokumen">+ Dokumen kecil (KTP, SIM A, NPWP, dll)</button><button type="button" class="plus" data-besar="1">+ Dokumen besar (Ijazah, KK,Sertifikat, dll)</button></div></div>`;
}
