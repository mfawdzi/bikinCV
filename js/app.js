// APLIKASI: state, ketik langsung di kertas, mode pratinjau, simpan otomatis
const $=q=>document.querySelector(q);
const salin=o=>JSON.parse(JSON.stringify(o));
const BARU={kerja:{jabatan:"",perusahaan:"",periode:"",uraian:""},pendidikan:{nama:"",detail:"",tahun:""},organisasi:{nama:"",jabatan:"",periode:"",uraian:""}};
let S,tujuan;
try{const s=localStorage.getItem("cv-fauzi-v2");S=s?JSON.parse(s):null}catch(e){S=null}
if(!S){S=salin(BLANK);S.kerja=[{...BARU.kerja}];S.pendidikan=[{...BARU.pendidikan}];S.organisasi=[{...BARU.organisasi}]}
S.dokumen=S.dokumen||[];S.foto=S.foto||"";S.tanggal=S.tanggal||hariIni();
const P=$("#papers");
const simpan=()=>{try{localStorage.setItem("cv-fauzi-v2",JSON.stringify(S))}catch(e){}};

function fit(){
 const pad=innerWidth<=820?20:32,w=$("#preview").clientWidth-pad;
 const cair=innerWidth<=820&&!document.body.classList.contains("pv");
 const z=cair?1:Math.min(1,w/794);
 P.style.transform=z<1?`scale(${z})`:"none";
 P.style.marginLeft=z<1?`${(w-794*z)/2}px`:"";
 P.style.marginBottom=z<1?`-${(1-z)*P.scrollHeight}px`:"0";
}
// tanda tangan digital: digambar langsung di kertas, disimpan sebagai gambar
function initTtd(){
 const c=P.querySelector("#ttdC");if(!c)return;
 const box=c.parentNode,x=c.getContext("2d");
 x.lineWidth=3;x.lineCap="round";x.lineJoin="round";x.strokeStyle="#111";
 if(S.ttd){const im=new Image();im.onload=()=>x.drawImage(im,0,0,c.width,c.height);im.src=S.ttd}
 let gambar=false;
 const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 c.onpointerdown=e=>{if(document.body.classList.contains("pv"))return;gambar=true;c.setPointerCapture(e.pointerId);const[a,b]=pos(e);x.beginPath();x.moveTo(a,b);x.lineTo(a+.1,b+.1);x.stroke();box.classList.remove("kosong")};
 c.onpointermove=e=>{if(!gambar)return;const[a,b]=pos(e);x.lineTo(a,b);x.stroke()};
 const selesai=()=>{if(!gambar)return;gambar=false;S.ttd=c.toDataURL("image/png");simpan()};
 c.onpointerup=selesai;c.onpointercancel=selesai;
 const h=P.querySelector("#ttdHapus");
 if(h)h.onclick=()=>{x.clearRect(0,0,c.width,c.height);S.ttd="";box.classList.add("kosong");simpan()};
}
function muatSatu(){
 const c=P.querySelector(".cv-fit"),b=P.querySelector(".cv-box");if(!c)return;
 let k=1;const set=z=>{k=z;c.style.transform=z<1?`scale(${z})`:"";c.style.width=z<1?`${100/z}%`:""};
 set(1);b.style.height="";
 if(innerWidth<=820&&!document.body.classList.contains("pv"))return;
 const maks=261*96/25.4;document.body.classList.add("ukur");
 if(c.offsetHeight>maks){let a=.6,z=1;for(let i=0;i<9;i++){const m=(a+z)/2;set(m);if(c.offsetHeight*m>maks)z=m;else a=m}set(a)}
document.body.classList.remove("ukur");if(k<1)b.style.height=c.offsetHeight*k+"px";
 document.body.classList.remove("ukur");
}
function kunci(pv){P.querySelectorAll("[contenteditable]").forEach(n=>n.setAttribute("contenteditable",pv?"false":"true"))}
function render(){
 P.innerHTML=(S.sertakanSurat?surat():"")+cv()+(S.sertakanLampiran?lampiran():"");
if(document.body.classList.contains("pv"))kunci(true);
 initTtd();
muatSatu();fit();simpan();
}
function mode(pv){document.body.classList.toggle("pv",pv);render();kunci(pv);scrollTo(0,0);fit()}

// ketik langsung di kertas
const nilai=n=>n.tagName==="UL"?[...n.querySelectorAll("li")].map(l=>l.textContent.trim()).filter(Boolean).join("\n"):n.tagName==="P"?n.innerText.replace(/\n+$/,""):n.textContent;
P.addEventListener("input",e=>{
 const n=e.target.closest(".ed");if(!n)return;
 const v=nilai(n),d=n.dataset;
 if(d.k){S[d.k]=v;P.querySelectorAll(`[data-k="${d.k}"]`).forEach(m=>{if(m!==n&&m.tagName!=="UL")m.textContent=v})}
 else if(d.l){const [k,i,f]=d.l.split(":");S[k][+i][f]=v}
 else if(d.dok!==undefined)S.dokumen[+d.dok].nama=v;
 simpan();
});
P.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.closest(".ed")&&!e.target.closest("ul,p.ed"))e.preventDefault()});
P.addEventListener("paste",e=>{e.preventDefault();const t=(e.clipboardData.getData("text/plain")||"").replace(/\r/g,"");document.execCommand("insertText",false,e.target.closest("p.ed")?t:t.replace(/\n+/g," "))});
P.addEventListener("focusout",e=>{if(e.target.tagName==="UL"&&!e.target.querySelector("li"))render()});

// pindah ke kolom yang baru ditambahkan
function fokus(k){
 const n=S[k].length-1;
 const el=P.querySelector(k==="dokumen"?`[data-dok="${n}"]`:`[data-l="${k}:${n}:${Object.keys(BARU[k])[0]}"]`);
 if(el){el.focus({preventScroll:true});el.scrollIntoView({block:"center",behavior:"smooth"})}
}
// tambah, hapus, pilih file
P.addEventListener("click",e=>{
 if(document.body.classList.contains("pv"))return;
 const t=e.target,a=t.closest("[data-add]"),x=t.closest("[data-del]"),p=t.closest("[data-pick]"),u=t.closest("[data-ukuran]"),c=t.closest("[data-cepat]"),b=t.closest("[data-besar]"),g=t.closest("[data-tog]"),h=t.closest("[data-hide]"),w=t.closest("[data-show]");
 if(a){const k=a.dataset.add;S[k].push(k==="dokumen"?{nama:"",file:"",ukuran:"kecil"}:{...BARU[k]});render();fokus(k)}
 else if(x){const [k,i]=x.dataset.del.split(":");S[k].splice(+i,1);render()}
 else if(u){const d=S.dokumen[+u.dataset.ukuran];d.ukuran=d.ukuran==="kecil"?"besar":"kecil";render()}
 else if(c){S.dokumen.push({nama:c.dataset.cepat,file:"",ukuran:"kecil"});render()}
 else if(b){S.dokumen.push({nama:"",file:"",ukuran:"besar"});render();fokus("dokumen")}
 else if(g){const [k,i]=g.dataset.tog.split(":"),o=S[k][+i];o.tanpa=!o.tanpa;render();if(!o.tanpa){const el=P.querySelector(`[data-l="${k}:${i}:uraian"]`);if(el)el.focus({preventScroll:true})}}
 else if(h){S.hide=S.hide||{};S.hide[h.dataset.hide]=true;render()}
 else if(w){const k=w.dataset.show;S.hide[k]=false;render();const el=P.querySelector({keahlian:'[data-k="teknis"]',sertifikat:'[data-k="sertifikat"]',organisasi:'[data-l^="organisasi:"]',kerja:'[data-l^="kerja:"]'}[k]);if(el){el.focus({preventScroll:true});el.scrollIntoView({block:"center",behavior:"smooth"})}}
 else if(t.closest("#fotoBox")){tujuan="foto";$("#fileIn").click()}
 else if(p){tujuan=+p.dataset.pick;$("#fileIn").click()}
});
$("#fileIn").addEventListener("change",e=>{
 const f=e.target.files[0];e.target.value="";if(!f)return;
 const r=new FileReader();
r.onload=()=>{const im=new Image();im.onerror=()=>alert("File tidak bisa dibaca. Gunakan foto JPG atau PNG, bukan PDF.");im.onload=()=>{
  const c=document.createElement("canvas"),x=c.getContext("2d");
  if(tujuan==="foto"){
   c.width=360;c.height=480;const s=Math.max(360/im.width,480/im.height),w=im.width*s,h=im.height*s;
   x.drawImage(im,(360-w)/2,(480-h)/2,w,h);S.foto=c.toDataURL("image/jpeg",.88);
  }else{
   const s=Math.min(1,1100/Math.max(im.width,im.height));c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
   x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
   S.dokumen[tujuan].file=c.toDataURL("image/jpeg",.78);
  }
  render()};im.src=r.result};
 r.readAsDataURL(f);
});

// pilih draft profil singkat
P.addEventListener("click",e=>{
 const d=e.target.closest("[data-draft]");
 if(!d||document.body.classList.contains("pv"))return;
 if(S.profil&&S.profil.trim()&&!confirm("Ganti ringkasan profil dengan draft ini?"))return;
 S.profil=DRAFT_PROFIL[+d.dataset.draft].teks;render();
 const el=P.querySelector('[data-k="profil"]');if(el)el.focus({preventScroll:true});
});
// pilih draft keahlian
P.addEventListener("click",e=>{
 const d=e.target.closest("[data-keahlian]");
 if(!d||document.body.classList.contains("pv"))return;
 if((S.teknis||S.nonteknis)&&!confirm("Ganti isi keahlian dengan draft ini?"))return;
 const k=DRAFT_KEAHLIAN[+d.dataset.keahlian];
 S.teknis=k.teknis;S.nonteknis=k.nonteknis;render();
 const el=P.querySelector('[data-k="teknis"]');if(el)el.focus({preventScroll:true});
});
// pilih: posisi sudah diketahui atau belum
P.addEventListener("click",e=>{
 const d=e.target.closest("[data-posisi]");
 if(!d||document.body.classList.contains("pv"))return;
 S.tanpaPosisi=d.dataset.posisi==="belum";render();
});
// pilih draft paragraf pengalaman (surat lamaran)
P.addEventListener("click",e=>{
 const d=e.target.closest("[data-pengalaman]");
 if(!d||document.body.classList.contains("pv"))return;
 if(S.pengalaman&&S.pengalaman.trim()&&!confirm("Ganti paragraf pengalaman dengan draft ini?"))return;
 S.pengalaman=DRAFT_PENGALAMAN[+d.dataset.pengalaman].teks;render();
 const el=P.querySelector('[data-k="pengalaman"]');if(el)el.focus({preventScroll:true});
});
// bilah atas
$("#sSurat").checked=S.sertakanSurat;$("#sLamp").checked=S.sertakanLampiran;
$("#sSurat").onchange=e=>{S.sertakanSurat=e.target.checked;render()};
$("#sLamp").onchange=e=>{S.sertakanLampiran=e.target.checked;render()};
$("#reset").onclick=()=>{
 if(!confirm("Kosongkan semua isian? Data yang sudah diketik akan hilang."))return;
 S=salin(BLANK);S.dokumen=[];S.foto="";S.tanggal=hariIni();
 S.kerja=[{...BARU.kerja}];S.pendidikan=[{...BARU.pendidikan}];S.organisasi=[{...BARU.organisasi}];
 $("#sSurat").checked=S.sertakanSurat;$("#sLamp").checked=S.sertakanLampiran;render();
};
$("#contoh").onclick=()=>{
 if(!confirm("Kembalikan isi contoh? Data yang sudah diketik akan diganti dengan contoh."))return;
 S=salin(D);S.dokumen=[];S.foto="";S.tanggal=hariIni();
 $("#sSurat").checked=S.sertakanSurat;$("#sLamp").checked=S.sertakanLampiran;render();scrollTo(0,0);
};
$("#cetak").onclick=()=>mode(true);
$("#kembali").onclick=()=>mode(false);
$("#unduh").onclick=()=>window.print();
addEventListener("resize",fit);
addEventListener("beforeprint",()=>{P.style.transform="none"});
addEventListener("afterprint",fit);
if(document.fonts)document.fonts.ready.then(muatSatu);
render();
