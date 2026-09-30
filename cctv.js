/* แท็บกล้อง CCTV — กล้องสาธารณะ กทม. และปริมณฑล จาก iTIC / Longdo (ชุดเดียวกับ live.iticfoundation.org) */
(function(){
const API_CAM="https://camera.longdo.com/feed/?command=json";
const API_EV="https://event.longdo.com/feed/json";
const LEAF="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/";
const HLSJS="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js";
const BOX={s:13.3,n:14.25,w:99.95,e:101.0};
const NEAR_KM=1.5, FLOOD_WIN=3*3600e3, REFRESH_MS=10*60*1000;

const css=`
.tabs{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;border-bottom:0!important;overflow:visible!important;margin:4px 0 12px!important}
.tabs .tab{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1px;white-space:normal!important;text-align:left;border:1.5px solid var(--line)!important;border-radius:10px;background:var(--surface);color:var(--ink);padding:8px 10px!important;margin:0!important;font-size:15px;line-height:1.25;min-height:52px}
.tabs .tab small{margin:0!important;font-size:11.5px}
.tabs .tab:hover{border-color:var(--accent)!important}
.tabs .tab[aria-selected="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)!important}
.tabs .tab[aria-selected="true"] small{color:var(--accent-ink);opacity:.85}
@media (max-width:720px){.tabs{grid-template-columns:repeat(3,minmax(0,1fr))}header.top{position:static}}
@media (max-width:430px){.tabs{grid-template-columns:repeat(2,minmax(0,1fr))}.tabs .tab{font-size:14px;min-height:46px;padding:6px 9px!important}}
.cc-bar{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;padding-block:12px 8px;font-size:14px;color:var(--muted)}
.cc-bar strong{color:var(--ink)}
.cc-search{position:relative;flex:1 1 220px;max-width:420px}
.cc-search input{width:100%;font:inherit;font-size:16px;padding:8px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);outline:none}
.cc-search input:focus{border-color:var(--accent)}
.cc-tg{font:inherit;font-size:13.5px;border:1px solid var(--line);background:var(--chip);color:var(--ink);padding:4px 11px;border-radius:999px;cursor:pointer}
.cc-tg[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.cc-tg:focus-visible,.cc-row:focus-visible,.cc-x:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#cc-map{height:min(48vh,440px);border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--chip);z-index:0}
.cc-player{margin-top:12px;background:#0d100c;border-radius:12px;overflow:hidden;color:#e8ecdf}
.cc-player video,.cc-player img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#000}
.cc-ph{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;padding:10px 12px}
.cc-ph b{font-size:15px;line-height:1.4}
.cc-ph small{display:block;color:#a9b19c;font-size:12.5px;margin-top:2px}
.cc-x{font:inherit;background:transparent;border:1px solid #3a4234;color:#e8ecdf;border-radius:8px;padding:3px 10px;cursor:pointer;white-space:nowrap}
.cc-st{padding:0 12px 10px;font-size:12.5px;color:#a9b19c}
.cc-st.live{color:#ff6b6b;font-weight:600}
.cc-h{font-size:17px;margin:20px 0 4px;padding-bottom:6px;border-bottom:2px solid var(--ink);display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.cc-h small{font-size:13px;font-weight:400;color:var(--muted)}
.cc-row{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:2px 10px;padding:9px 0;border-bottom:1px solid var(--line);align-items:center;cursor:pointer}
.cc-row:hover .cc-name{text-decoration:underline}
.cc-ic{width:20px;height:20px;border-radius:5px;display:grid;place-items:center;font-size:10px;color:#fff;background:#1d2330}
.cc-ic.still{background:#6b7280}
.cc-name{font-weight:600;font-size:15px}
.cc-sub{font-size:13px;color:var(--muted)}
.cc-tag{font-size:12px;font-weight:600;color:var(--bad);background:var(--bad-bg);border-radius:6px;padding:1px 7px;white-space:nowrap}
.cc-err{padding:12px 14px;color:var(--bad);background:var(--bad-bg);border-radius:10px;margin-top:10px;font-size:14px}
.cc-src{font-size:12.5px;color:var(--muted);margin-top:16px;line-height:1.6}
.cc-pin{width:18px;height:18px;border-radius:5px;background:#1d2330;color:#fff;font-size:9px;display:grid;place-items:center;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
.cc-pin.still{background:#6b7280}
.cc-pin.near{background:#c8102e}
.cc-pin.sel{outline:3px solid #f2c94c}
.cc-more{font:inherit;font-size:14px;border:0;background:transparent;color:var(--accent);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:8px 0}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

// ---------- DOM ----------
const tabs=document.querySelector(".tabs");
const btn=document.createElement("button");
btn.className="tab"; btn.type="button"; btn.id="tab-cctv"; btn.setAttribute("role","tab"); btn.setAttribute("aria-selected","false");
btn.innerHTML='กล้อง CCTV<small>สด</small>';
tabs.appendChild(btn);

const view=document.createElement("main");
view.className="wrap"; view.id="view-cctv"; view.hidden=true;
view.innerHTML=`
  <div class="cc-bar">
    <div class="cc-search"><input id="cc-q" type="text" enterkeyhint="search" autocomplete="off" placeholder="ค้นหากล้อง เช่น พระราม4, บางนา, ประชานุกูล" aria-label="ค้นหากล้อง"></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="cc-tg" type="button" data-f="" aria-pressed="true">ทั้งหมด</button>
      <button class="cc-tg" type="button" data-f="live" aria-pressed="false">วิดีโอสด</button>
      <button class="cc-tg" type="button" data-f="near" aria-pressed="false">ใกล้จุดน้ำท่วม</button>
    </div>
  </div>
  <div id="cc-status" style="font-size:14px;color:var(--muted);padding-bottom:8px">กำลังโหลดรายการกล้อง…</div>
  <div id="cc-map" role="region" aria-label="แผนที่กล้อง CCTV"></div>
  <div id="cc-player" class="cc-player" hidden></div>
  <div id="cc-msg"></div>
  <h3 class="cc-h">รายการกล้อง <small id="cc-meta"></small></h3>
  <div id="cc-list"></div>
  <p class="cc-src">ภาพจากกล้องสาธารณะผ่านมูลนิธิศูนย์ข้อมูลจราจรอัจฉริยะไทย (iTIC) และ Longdo — ชุดเดียวกับ live.iticfoundation.org · ▶ = วิดีโอสด · ◻ = ภาพนิ่ง (โหลดใหม่ทุก 1 นาที) · “ใกล้จุดน้ำท่วม” = ห่างไม่เกิน ${NEAR_KM} กม. จากจุดที่มีรายงานน้ำท่วมใน 3 ชม. (Longdo Traffic) · กล้องบางตัวอาจปิดหรือขัดข้องชั่วคราว</p>`;
(document.getElementById("view-risk")||document.getElementById("view-water")||document.getElementById("view-kitchen")).after(view);

const $=id=>view.querySelector("#"+id);
const searchBox=document.querySelector(".search"), chips=document.getElementById("chips");
const OTHERS=["area","kitchen","water","risk"];

function showCctv(on){
  btn.setAttribute("aria-selected",on);
  view.hidden=!on;
  if(on){
    OTHERS.forEach(t=>{const b=document.getElementById("tab-"+t), v=document.getElementById("view-"+t); if(b) b.setAttribute("aria-selected","false"); if(v) v.hidden=true;});
    searchBox.hidden=true; chips.hidden=true;
    document.getElementById("eyebrow").textContent="ทภ.1 · กล้องสาธารณะ กทม. และปริมณฑล";
    document.getElementById("title").textContent="กล้อง CCTV (ภาพสด)";
    start();
  }else stopStream();
}
btn.addEventListener("click",()=>{showCctv(true);window.scrollTo(0,0)});
OTHERS.forEach(t=>{const b=document.getElementById("tab-"+t); if(b) b.addEventListener("click",()=>{ if(!view.hidden){ showCctv(false); if(t==="area"||t==="kitchen"){searchBox.hidden=false; chips.hidden=false;} } },true)});

// ---------- helpers ----------
const num=v=>{const n=parseFloat(v);return isFinite(n)?n:null};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function bkkTime(s){const m=/(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)/.exec(s||""); return m?Date.UTC(+m[1],m[2]-1,+m[3],m[4]-7,+m[5]):null}
function km(a1,o1,a2,o2){const dx=(o1-o2)*108.5, dy=(a1-a2)*110.6; return Math.sqrt(dx*dx+dy*dy)}
const hhmm=t=>new Date(t).toLocaleTimeString("th-TH",{timeZone:"Asia/Bangkok",hour:"2-digit",minute:"2-digit"})+" น.";
async function getJSON(u,ms=25000){const c=new AbortController(); const to=setTimeout(()=>c.abort(),ms); try{const r=await fetch(u,{cache:"no-store",signal:c.signal}); if(!r.ok) throw new Error("HTTP "+r.status); return await r.json()} finally{clearTimeout(to)}}
function loadScript(src,test){ return new Promise((res,rej)=>{ if(test()) return res(); const s=document.createElement("script"); s.src=src; s.onload=res; s.onerror=()=>rej(new Error("โหลดสคริปต์ไม่ได้")); document.head.appendChild(s); }); }
function loadLeaflet(){ if(!document.querySelector('link[href*="leaflet"]')){const l=document.createElement("link"); l.rel="stylesheet"; l.href=LEAF+"leaflet.min.css"; document.head.appendChild(l);} return loadScript(LEAF+"leaflet.min.js",()=>!!window.L); }
const cleanTitle=t=>String(t||"").replace(/^\((กรุงเทพมหานคร|กทม\.?)\)\s*/,"").trim();

// ---------- state ----------
let cams=[], floods=[], map=null, L_=null, layer=null, markers={}, filter="", q="", sel=null, limit=40, loading=false, updated=null;

async function load(){
  if(loading) return; loading=true;
  const errs=[];
  const [cd,ev]=await Promise.all([
    getJSON(API_CAM).catch(e=>{errs.push("รายการกล้อง");return null}),
    getJSON(API_EV,30000).catch(e=>null)
  ]);
  const now=Date.now();
  if(ev) floods=ev.filter(e=>e.type==="6").map(e=>({title:e.title,la:num(e.latitude),lo:num(e.longitude),t:bkkTime(e.start)})).filter(f=>f.la&&f.lo&&f.t&&now-f.t<FLOOD_WIN);
  if(cd&&Array.isArray(cd)){
    cams=cd.map(c=>{
      const la=num(c.latitude), lo=num(c.longitude);
      const video=/^https:\/\//.test(c.hls_url||"")&&!/tempsus/.test(c.hls_url);
      const still=/^https:\/\//.test(c.imgurl||"")&&!/X\.X\.X\.X/.test(c.imgurl);
      return {id:String(c.camid), title:cleanTitle(c.title), org:c.organization||"", la, lo, hls:video?c.hls_url:null, img:still?c.imgurl:null};
    }).filter(c=>c.la&&c.lo&&c.la>BOX.s&&c.la<BOX.n&&c.lo>BOX.w&&c.lo<BOX.e&&(c.hls||c.img));
    cams.forEach(c=>{ let best=null; floods.forEach(f=>{const d=km(c.la,c.lo,f.la,f.lo); if(d<=NEAR_KM&&(!best||d<best.d)) best={d,f}}); c.near=best; });
    updated=now;
  }
  loading=false;
  $("cc-msg").innerHTML=errs.length?`<div class="cc-err">โหลด${errs.join(", ")}ไม่สำเร็จ ลองเปิดแท็บนี้ใหม่อีกครั้ง</div>`:"";
  render();
}

function visible(){
  const k=q.replace(/\s+/g,"").toLowerCase();
  return cams.filter(c=>{
    if(filter==="live"&&!c.hls) return false;
    if(filter==="near"&&!c.near) return false;
    return !k||c.title.replace(/\s+/g,"").toLowerCase().includes(k);
  }).sort((a,b)=>((b.near?1:0)-(a.near?1:0))||(a.near&&b.near?a.near.d-b.near.d:0)||((b.hls?1:0)-(a.hls?1:0))||a.title.localeCompare(b.title,"th"));
}

function pinIcon(c){ return L_.divIcon({className:"",html:`<div class="cc-pin${c.near?" near":c.hls?"":" still"}${sel&&sel.id===c.id?" sel":""}">${c.hls?"▶":"◻"}</div>`,iconSize:[18,18],iconAnchor:[9,9]}); }

function render(){
  const list=visible(), nLive=cams.filter(c=>c.hls).length, nNear=cams.filter(c=>c.near).length;
  $("cc-status").innerHTML=updated?`<strong>${cams.length}</strong> กล้อง (วิดีโอสด ${nLive}) · ใกล้จุดน้ำท่วม <strong>${nNear}</strong> กล้อง · อัปเดตรายการ ${hhmm(updated)}`:"กำลังโหลดรายการกล้อง…";
  if(map){
    layer.clearLayers(); markers={};
    list.forEach(c=>{ markers[c.id]=L_.marker([c.la,c.lo],{icon:pinIcon(c),title:c.title,zIndexOffset:c.near?1000:0}).on("click",()=>select(c,false)).addTo(layer); });
  }
  $("cc-meta").textContent=list.length+" กล้อง";
  $("cc-list").innerHTML=list.slice(0,limit).map(c=>`<div class="cc-row" tabindex="0" data-id="${esc(c.id)}">
    <span class="cc-ic${c.hls?"":" still"}">${c.hls?"▶":"◻"}</span>
    <div><div class="cc-name">${esc(c.title)}</div><div class="cc-sub">${esc(c.org)}${c.near?` · ห่าง ${(c.near.d*1000).toFixed(0)} ม. จาก ${esc(c.near.f.title)}`:""}</div></div>
    ${c.near?'<span class="cc-tag">ใกล้น้ำท่วม</span>':"<span></span>"}</div>`).join("")
    +(list.length>limit?`<button class="cc-more" type="button" id="cc-more">แสดงเพิ่ม (${list.length-limit})</button>`:"")
    || `<div class="cc-sub" style="padding:14px 0">${updated?(filter==="near"?"ยังไม่มีกล้องใกล้จุดที่มีรายงานน้ำท่วมใน 3 ชม.":"ไม่พบกล้องที่ค้นหา"):"กำลังโหลด…"}</div>`;
}

// ---------- player ----------
let hls=null, stillTimer=null;
function stopStream(){ if(hls){try{hls.destroy()}catch(e){} hls=null;} clearInterval(stillTimer); stillTimer=null; const v=$("cc-player").querySelector("video"); if(v){v.pause(); v.removeAttribute("src"); v.load();} }
function closePlayer(){ stopStream(); $("cc-player").hidden=true; $("cc-player").innerHTML=""; const prev=sel; sel=null; if(prev&&markers[prev.id]) markers[prev.id].setIcon(pinIcon(prev)); }
function showStill(box,c,note){
  const s=box.querySelector(".cc-st"); box.querySelector("video")?.remove();
  if(!c.img){ s.textContent="กล้องนี้ใช้งานไม่ได้ขณะนี้"; return; }
  const img=new Image(); img.referrerPolicy="no-referrer"; img.alt="ภาพนิ่งจาก "+c.title;
  const ld=()=>{ img.src=c.img+(c.img.includes("?")?"&":"?")+"_t="+Date.now(); };
  img.onload=()=>{ s.className="cc-st"; s.textContent=note+" · "+hhmm(Date.now()); };
  img.onerror=()=>{ s.textContent="ไม่สามารถแสดงภาพจากกล้องนี้ได้ขณะนี้"; };
  s.before(img); s.textContent="กำลังโหลดภาพ…"; ld(); stillTimer=setInterval(ld,60000);
}
async function select(c,fly){
  stopStream();
  const prev=sel; sel=c;
  if(prev&&markers[prev.id]) markers[prev.id].setIcon(pinIcon(prev));
  if(markers[c.id]) markers[c.id].setIcon(pinIcon(c));
  if(fly&&map) map.setView([c.la,c.lo],Math.max(map.getZoom(),14));
  const box=$("cc-player"); box.hidden=false;
  box.innerHTML=`<div class="cc-ph"><div><b>${esc(c.title)}</b><small>${esc(c.org)} · ${esc(c.id)}${c.near?` · ห่าง ${(c.near.d*1000).toFixed(0)} ม. จาก ${esc(c.near.f.title)} (${hhmm(c.near.f.t)})`:""}</small></div><button class="cc-x" type="button" id="cc-close">ปิด</button></div>
    ${c.hls?'<video muted autoplay playsinline controls></video>':""}<div class="cc-st">กำลังเชื่อมต่อ…</div>`;
  box.querySelector("#cc-close").addEventListener("click",closePlayer);
  box.scrollIntoView({behavior:"smooth",block:"nearest"});
  if(!c.hls){ showStill(box,c,"ภาพนิ่ง (โหลดใหม่ทุก 1 นาที)"); return; }
  const v=box.querySelector("video"), s=box.querySelector(".cc-st");
  const fail=why=>{ stopStream(); if(c.img) showStill(box,c,"วิดีโอสดใช้ไม่ได้ ("+why+") แสดงภาพนิ่งแทน"); else { v.remove(); s.textContent="วิดีโอสดใช้ไม่ได้ขณะนี้ ("+why+")"; } };
  try{
    if(v.canPlayType("application/vnd.apple.mpegurl")&&!window.MediaSource){
      v.src=c.hls; v.onplaying=()=>{s.className="cc-st live"; s.textContent="● ภาพสด";}; v.onerror=()=>fail("error"); v.play().catch(()=>{});
      return;
    }
    await loadScript(HLSJS,()=>!!window.Hls);
    if(sel!==c) return;
    if(!Hls.isSupported()){ fail("เบราว์เซอร์ไม่รองรับ"); return; }
    hls=new Hls({manifestLoadingMaxRetry:1,levelLoadingMaxRetry:1,fragLoadingMaxRetry:1,liveSyncDurationCount:2});
    hls.on(Hls.Events.ERROR,(_,d)=>{ if(d.fatal) fail(d.details||"error"); });
    hls.on(Hls.Events.FRAG_BUFFERED,()=>{ s.className="cc-st live"; s.textContent="● ภาพสด"; });
    hls.loadSource(c.hls); hls.attachMedia(v); v.play().catch(()=>{});
  }catch(e){ fail(e.message); }
}

// ---------- events ----------
view.addEventListener("click",e=>{
  const tg=e.target.closest(".cc-tg"); if(tg){ filter=tg.dataset.f; limit=40; view.querySelectorAll(".cc-tg").forEach(b=>b.setAttribute("aria-pressed",b===tg)); render(); fit(); return; }
  if(e.target.id==="cc-more"){ limit+=60; render(); return; }
  const row=e.target.closest(".cc-row"); if(row){ const c=cams.find(x=>x.id===row.dataset.id); if(c) select(c,true); }
});
view.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.classList.contains("cc-row")) e.target.click(); });
let qt=null; $("cc-q").addEventListener("input",e=>{ clearTimeout(qt); qt=setTimeout(()=>{ q=e.target.value.trim(); limit=40; render(); fit(); },200); });
document.addEventListener("visibilitychange",()=>{ if(document.hidden) stopStream(); });

function fit(){ if(!map) return; const pts=visible().map(c=>[c.la,c.lo]); if(pts.length) map.fitBounds(pts,{padding:[24,24],maxZoom:14}); }

let started=false;
async function start(){
  if(started){ setTimeout(()=>map&&map.invalidateSize(),50); if(updated&&Date.now()-updated>REFRESH_MS) load(); return; }
  started=true; render();
  try{
    await loadLeaflet(); L_=window.L;
    map=L_.map("cc-map").setView([13.76,100.55],11);
    L_.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"&copy; OpenStreetMap"}).addTo(map);
    layer=L_.layerGroup().addTo(map);
  }catch(e){ $("cc-map").innerHTML=`<div class="cc-err">${esc(e.message)}</div>`; }
  await load();
  if(map){ map.invalidateSize(); fit(); }
}

if(location.hash==="#cctv") showCctv(true);
})();
