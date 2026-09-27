/* แท็บสถานการณ์น้ำ — ระดับน้ำคลอง + จุดรายงานน้ำท่วม + ฝนสะสม + เรดาร์ฝน (ข้อมูลสด) */
(function(){
const TW="https://api-v3.thaiwater.net/api/v1/thaiwater30/public/";
const API={wl:TW+"waterlevel_load", rain:TW+"rain_24h", events:"https://event.longdo.com/feed/json", radar:"https://api.rainviewer.com/public/weather-maps.json"};
const PROV={"10":"กรุงเทพฯ","11":"สมุทรปราการ","12":"นนทบุรี","13":"ปทุมธานี","73":"นครปฐม","74":"สมุทรสาคร"};
const BOX={s:13.3,n:14.25,w:99.95,e:101.0}; // กทม.และปริมณฑล
const BKK={s:13.48,n:13.97,w:100.32,e:100.95};
const inBox=(b,la,lo)=>la>=b.s&&la<=b.n&&lo>=b.w&&lo<=b.e;
const REFRESH_MS=10*60*1000, STALE_MS=2*60*60*1000;
const LEAF="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/";

const css=`
.wv-sum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}
.wv-card{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.wv-card b{display:block;font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;font-size:24px;line-height:1.2}
.wv-card span{font-size:13px;color:var(--muted)}
.wv-card.red b{color:#c8102e}.wv-card.blue b{color:#1d5fbf}
.wv-bar{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;padding-block:12px 8px;font-size:14px;color:var(--muted)}
.wv-layers{display:flex;flex-wrap:wrap;gap:6px}
.wv-tg{font:inherit;font-size:13.5px;border:1px solid var(--line);background:var(--chip);color:var(--ink);padding:4px 11px;border-radius:999px;cursor:pointer}
.wv-tg[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.wv-btn{font:inherit;font-size:14px;border:1px solid var(--line);background:var(--surface);color:var(--ink);padding:5px 12px;border-radius:8px;cursor:pointer}
.wv-tg:focus-visible,.wv-btn:focus-visible,.wv-row:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#wv-map{height:min(60vh,540px);border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--chip);z-index:0}
.wv-legend{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12.5px;color:var(--muted);margin-top:8px}
.wv-legend i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;vertical-align:-1px;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25)}
.wv-legend i.sq{border-radius:3px;transform:rotate(45deg);width:10px;height:10px}
.wv-h{font-size:17px;margin:22px 0 4px;padding-bottom:6px;border-bottom:2px solid var(--ink);display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.wv-h small{font-size:13px;font-weight:400;color:var(--muted)}
.wv-row{display:grid;grid-template-columns:14px minmax(0,1fr) auto;gap:2px 12px;padding:9px 0;border-bottom:1px solid var(--line);align-items:center;cursor:pointer}
.wv-row:hover .wv-name{text-decoration:underline}
.wv-dot{width:12px;height:12px;border-radius:50%}
.wv-dot.sq{border-radius:3px;transform:rotate(45deg);width:10px;height:10px}
.wv-name{font-weight:600;font-size:15.5px}
.wv-sub{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.wv-num{font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;font-size:17px;font-weight:500;text-align:right;white-space:nowrap}
.wv-num small{display:block;font-family:"IBM Plex Sans Thai",sans-serif;font-size:12px;color:var(--muted);font-weight:400}
.wv-tag{font-size:12px;color:var(--warn);background:var(--warn-bg);border-radius:6px;padding:0 6px;margin-left:6px;white-space:nowrap;font-weight:500}
.wv-more{font:inherit;font-size:14px;border:0;background:transparent;color:var(--accent);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:8px 0}
.wv-err{padding:14px;color:var(--bad);background:var(--bad-bg);border-radius:10px;margin-top:10px;font-size:14px}
.wv-src{font-size:12.5px;color:var(--muted);margin-top:16px;line-height:1.6}
.wv-pop b{font-size:15px}.wv-pop div{font-size:13px;line-height:1.5}
.wv-flood{width:14px;height:14px;background:#7b2cbf;border:2px solid #fff;border-radius:3px;transform:rotate(45deg);box-shadow:0 0 0 1px rgba(0,0,0,.3)}
.wv-flood.new{background:#c8102e;animation:wvp 1.6s ease-in-out infinite}
@keyframes wvp{50%{box-shadow:0 0 0 6px rgba(200,16,46,.25)}}
@media (prefers-reduced-motion:reduce){.wv-flood.new{animation:none}}
@media (max-width:560px){.wv-sum{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.wv-card{padding:8px}.wv-card b{font-size:20px}.wv-card span{font-size:12px}}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

// ---------- DOM ----------
const tabs=document.querySelector(".tabs");
const btn=document.createElement("button");
btn.className="tab"; btn.type="button"; btn.id="tab-water"; btn.setAttribute("role","tab"); btn.setAttribute("aria-selected","false");
btn.innerHTML='สถานการณ์น้ำ<small>สด</small>';
tabs.appendChild(btn);

const view=document.createElement("main");
view.className="wrap"; view.id="view-water"; view.hidden=true;
view.innerHTML=`
  <div class="wv-sum">
    <div class="wv-card red"><b id="wv-n-flood">–</b><span>จุดรายงานน้ำท่วม (<span id="wv-win-lbl">3 ชม.</span>)</span></div>
    <div class="wv-card red"><b id="wv-n-over">–</b><span>สถานีน้ำเกินตลิ่ง</span></div>
    <div class="wv-card blue"><b id="wv-n-rain">–</b><span id="wv-rain-lbl">ฝนสะสมสูงสุด 24 ชม. (มม.)</span></div>
  </div>
  <div class="wv-bar">
    <div class="wv-layers" role="group" aria-label="ชั้นข้อมูล">
      <button class="wv-tg" type="button" data-l="flood" aria-pressed="true">จุดน้ำท่วม</button>
      <button class="wv-tg" type="button" data-l="wl" aria-pressed="true">ระดับน้ำคลอง</button>
      <button class="wv-tg" type="button" data-l="rain" aria-pressed="false">ฝน 24 ชม.</button>
      <button class="wv-tg" type="button" data-l="radar" aria-pressed="false">เรดาร์ฝน</button>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="wv-btn" type="button" id="wv-win">รายงาน: 3 ชม.ล่าสุด</button>
      <button class="wv-btn" type="button" id="wv-reload">โหลดใหม่</button>
    </div>
  </div>
  <div id="wv-map" role="region" aria-label="แผนที่สถานการณ์น้ำ"></div>
  <div class="wv-legend">
    <span><i class="sq" style="background:#c8102e"></i>รายงานน้ำท่วม ใน 1 ชม.</span>
    <span><i class="sq" style="background:#7b2cbf"></i>รายงานน้ำท่วม เก่ากว่า 1 ชม.</span>
    <span><i style="background:#c8102e"></i>คลองเกินตลิ่ง</span>
    <span><i style="background:#e56b00"></i>90–100%</span>
    <span><i style="background:#d4a100"></i>70–90%</span>
    <span><i style="background:#1f7a3a"></i>ต่ำกว่า 70%</span>
    <span><i style="background:#9aa093"></i>ข้อมูลเก่า</span>
    <span><i style="background:#1d5fbf"></i>ฝน 24 ชม. (ใหญ่ = ตกมาก)</span>
  </div>
  <div id="wv-msg"></div>
  <h3 class="wv-h">จุดรายงานน้ำท่วมล่าสุด <small id="wv-flood-meta"></small></h3>
  <div id="wv-flood-list"></div>
  <h3 class="wv-h">ระดับน้ำคลอง <small>เรียงจากวิกฤตมากไปน้อย</small></h3>
  <div id="wv-wl-list"></div>
  <p class="wv-src">
    จุดน้ำท่วม: รายงานจากผู้ใช้ถนนผ่าน Longdo Traffic (ไม่ได้ผ่านการยืนยันจากหน่วยงาน) · ระดับน้ำคลองและฝน: คลังข้อมูลน้ำแห่งชาติ (ThaiWater, สสน.) — % คือระดับน้ำเทียบระดับตลิ่ง (100% = ถึงตลิ่ง) · เรดาร์ฝน: RainViewer · แผนที่ © OpenStreetMap contributors<br>
    อัปเดตอัตโนมัติทุก 10 นาที · ใช้ประกอบการติดตามสถานการณ์ ไม่ใช่ประกาศเตือนภัยทางการ</p>`;
document.getElementById("view-kitchen").after(view);

const $=id=>view.querySelector("#"+id);
const searchBox=document.querySelector(".search"), chips=document.getElementById("chips");
const other=["area","kitchen"];

function showWater(on){
  btn.setAttribute("aria-selected",on);
  view.hidden=!on;
  searchBox.hidden=on; chips.hidden=on;
  if(on){
    other.forEach(t=>{document.getElementById("tab-"+t).setAttribute("aria-selected","false");document.getElementById("view-"+t).hidden=true;});
    document.getElementById("eyebrow").textContent="ทภ.1 · ติดตามสถานการณ์น้ำ กทม. และปริมณฑล";
    document.getElementById("title").textContent="สถานการณ์น้ำ (เรียลไทม์)";
    start();
  }
}
btn.addEventListener("click",()=>{showWater(true);window.scrollTo(0,0)});
other.forEach(t=>document.getElementById("tab-"+t).addEventListener("click",()=>showWater(false),true));

// ---------- helpers ----------
const num=v=>{const n=parseFloat(v);return isFinite(n)?n:null};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function bkkTime(s){const m=/(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)/.exec(s||""); return m?Date.UTC(+m[1],m[2]-1,+m[3],m[4]-7,+m[5]):null}
function ago(t){const m=Math.round((Date.now()-t)/60000); if(m<1) return "เมื่อสักครู่"; if(m<60) return m+" นาทีที่แล้ว"; const h=Math.floor(m/60); return h<48?h+" ชม.ที่แล้ว":Math.floor(h/24)+" วันที่แล้ว"}
const fmtTime=t=>new Date(t).toLocaleString("th-TH",{timeZone:"Asia/Bangkok",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+" น.";
async function getJSON(u,ms=20000){const c=new AbortController(); const to=setTimeout(()=>c.abort(),ms); try{const r=await fetch(u,{cache:"no-store",signal:c.signal}); if(!r.ok) throw new Error("HTTP "+r.status); return await r.json()} finally{clearTimeout(to)}}
function wlColor(s){ if(s.stale) return "#9aa093"; if(s.pct>=100) return "#c8102e"; if(s.pct>=90) return "#e56b00"; if(s.pct>=70) return "#d4a100"; return "#1f7a3a"}
function trend(s){ if(s.msl==null||s.prev==null) return ""; const d=s.msl-s.prev; if(Math.abs(d)<0.005) return "คงที่"; return (d>0?"▲ ขึ้น ":"▼ ลง ")+Math.abs(d).toFixed(2)+" ม."}
const WIN=[3,6,24]; let winIdx=0;

// ---------- state ----------
let map=null, L_=null, layers={}, wl=[], rain=[], floods=[], radarLayer=null, radarInfo=null, loading=false;
const on={flood:true,wl:true,rain:false,radar:false};
const markers={};

async function load(){
  if(loading) return; loading=true;
  $("wv-reload").textContent="กำลังโหลด…";
  const errs=[];
  const now=Date.now();
  await Promise.all([
    getJSON(API.wl).then(d=>{
      wl=((d.waterlevel_data&&d.waterlevel_data.data)||[]).filter(x=>x.geocode&&PROV[x.geocode.province_code]).map(x=>{
        const t=bkkTime(x.waterlevel_datetime), msl=num(x.waterlevel_msl), bank=num(x.station&&x.station.min_bank);
        return {id:"w"+x.id, name:(x.station&&x.station.tele_station_name&&x.station.tele_station_name.th)||"สถานี",
          prov:x.geocode.province_code, provName:PROV[x.geocode.province_code], amphoe:(x.geocode.amphoe_name&&x.geocode.amphoe_name.th)||"",
          lat:num(x.station&&x.station.tele_station_lat), lng:num(x.station&&x.station.tele_station_long),
          msl, prev:num(x.waterlevel_msl_previous), bank, pct:num(x.storage_percent), t, stale:!t||now-t>STALE_MS,
          odd:msl!=null&&bank!=null&&msl<bank-3};
      }).filter(s=>s.lat&&s.lng&&s.pct!=null).sort((a,b)=>(a.stale-b.stale)||(b.pct-a.pct));
    }).catch(e=>errs.push("ระดับน้ำคลอง ("+e.message+")")),
    getJSON(API.rain).then(d=>{
      rain=(d.data||[]).map(x=>({id:"r"+x.id, name:(x.station&&x.station.tele_station_name&&x.station.tele_station_name.th)||"สถานี",
        lat:num(x.station&&x.station.tele_station_lat), lng:num(x.station&&x.station.tele_station_long),
        mm:num(x.rain_24h), t:bkkTime(x.rainfall_datetime), amphoe:(x.geocode&&x.geocode.amphoe_name&&x.geocode.amphoe_name.th)||""}))
        .filter(r=>r.lat&&r.lng&&r.mm!=null&&r.mm>0&&inBox(BOX,r.lat,r.lng)&&r.t&&now-r.t<6*3600e3).sort((a,b)=>b.mm-a.mm);
    }).catch(e=>errs.push("ฝน ("+e.message+")")),
    getJSON(API.events,30000).then(d=>{
      floods=(d||[]).filter(e=>e.type==="6").map(e=>({id:"f"+e.eid, title:e.title||"น้ำท่วม", desc:e.description||"",
        lat:num(e.latitude), lng:num(e.longitude), t:bkkTime(e.start)}))
        .filter(f=>f.lat&&f.lng&&f.t&&inBox(BOX,f.lat,f.lng)).sort((a,b)=>b.t-a.t);
    }).catch(e=>errs.push("จุดน้ำท่วม ("+e.message+")")),
    getJSON(API.radar).then(d=>{const p=d.radar&&d.radar.past; radarInfo=p&&p.length?{host:d.host,path:p[p.length-1].path,time:p[p.length-1].time*1000}:null}).catch(()=>{})
  ]);
  loading=false; $("wv-reload").textContent="โหลดใหม่";
  $("wv-msg").innerHTML=errs.length?`<div class="wv-err">โหลดบางส่วนไม่สำเร็จ: ${errs.map(esc).join(", ")} ลองกด “โหลดใหม่”</div>`:"";
  render();
}

function floodWin(){ const h=WIN[winIdx]; return floods.filter(f=>Date.now()-f.t<h*3600e3) }

function render(){
  const fw=floodWin(), now=Date.now();
  $("wv-n-flood").textContent=fw.length;
  $("wv-win-lbl").textContent=WIN[winIdx]+" ชม.";
  $("wv-n-over").textContent=wl.filter(s=>!s.stale&&s.pct>=100).length;
  const top=rain[0]; $("wv-n-rain").textContent=top?top.mm.toFixed(0):"–";
  $("wv-rain-lbl").textContent=top?`ฝนสูงสุด 24 ชม. (มม.) ${top.name}`:"ฝนสะสมสูงสุด 24 ชม. (มม.)";

  if(map){
    Object.values(layers).forEach(g=>g.clearLayers());
    for(const k in markers) delete markers[k];
    // rain
    rain.forEach(r=>{
      const rad=Math.max(4,Math.min(18,4+Math.sqrt(r.mm)*1.4));
      const mk=L_.circleMarker([r.lat,r.lng],{radius:rad,color:"#1d5fbf",weight:1,fillColor:"#1d5fbf",fillOpacity:r.mm>=35?.55:.28})
        .bindPopup(`<div class="wv-pop"><b>ฝน 24 ชม. ${r.mm.toFixed(1)} มม.</b><div>${esc(r.name)}${r.amphoe?" · "+esc(r.amphoe):""}</div><div>${fmtTime(r.t)}</div></div>`);
      mk.addTo(layers.rain); markers[r.id]=mk;
    });
    // water level
    wl.slice().reverse().forEach(s=>{
      const c=wlColor(s);
      const mk=L_.circleMarker([s.lat,s.lng],{radius:s.pct>=100&&!s.stale?10:7,color:"#fff",weight:2,fillColor:c,fillOpacity:.95})
        .bindPopup(`<div class="wv-pop"><b>${esc(s.name)}</b><div>${esc(s.amphoe)} · ${esc(s.provName)}</div>
          <div>ระดับน้ำ <b>${s.msl?.toFixed(2)}</b> ม.รทก. · ตลิ่ง ${s.bank?.toFixed(2)} ม.</div>
          <div><b style="color:${c}">${s.pct.toFixed(0)}%</b> ของตลิ่ง · ${trend(s)}</div>
          <div>${s.t?fmtTime(s.t)+" ("+ago(s.t)+")":""}${s.odd?"<br>⚠ ค่าผิดปกติ อาจเป็นเซนเซอร์ขัดข้อง":""}</div></div>`);
      mk.addTo(layers.wl); markers[s.id]=mk;
    });
    // floods (on top)
    fw.slice().reverse().forEach(f=>{
      const fresh=now-f.t<3600e3;
      const mk=L_.marker([f.lat,f.lng],{icon:L_.divIcon({className:"",html:`<div class="wv-flood${fresh?" new":""}"></div>`,iconSize:[14,14],iconAnchor:[7,7]}),zIndexOffset:fresh?1000:500})
        .bindPopup(`<div class="wv-pop"><b>${esc(f.title)}</b><div>${esc(f.desc)}</div><div>รายงานเมื่อ ${fmtTime(f.t)} (${ago(f.t)})</div></div>`);
      mk.addTo(layers.flood); markers[f.id]=mk;
    });
    // radar
    if(radarLayer){ map.removeLayer(radarLayer); radarLayer=null; }
    if(on.radar && radarInfo){
      radarLayer=L_.tileLayer(`${radarInfo.host}${radarInfo.path}/256/{z}/{x}/{y}/2/1_1.png`,{opacity:.6,maxNativeZoom:7,maxZoom:18,attribution:"RainViewer"}).addTo(map);
    }
    for(const k of ["flood","wl","rain"]){ if(on[k]) map.addLayer(layers[k]); else map.removeLayer(layers[k]); }
  }

  // flood list
  const shown=fw.slice(0,listLimit);
  $("wv-flood-meta").textContent=fw.length?`${fw.length} จุดใน ${WIN[winIdx]} ชม. · ล่าสุด ${ago(fw[0].t)}`:"";
  $("wv-flood-list").innerHTML=shown.map(f=>`<div class="wv-row" tabindex="0" data-id="${f.id}">
    <span class="wv-dot sq" style="background:${now-f.t<3600e3?"#c8102e":"#7b2cbf"}"></span>
    <div><div class="wv-name">${esc(f.title)}</div><div class="wv-sub">${esc(f.desc.replace(/\s*รายงานโดย.*$/,""))}</div></div>
    <div class="wv-num" style="font-size:14px">${new Date(f.t).toLocaleTimeString("th-TH",{timeZone:"Asia/Bangkok",hour:"2-digit",minute:"2-digit"})} น.<small>${ago(f.t)}</small></div></div>`).join("")
    +(fw.length>listLimit?`<button class="wv-more" type="button" id="wv-more">แสดงเพิ่ม (${fw.length-listLimit})</button>`:"")
    || `<div class="wv-sub" style="padding:12px 0">ไม่มีรายงานน้ำท่วมใน ${WIN[winIdx]} ชม.ล่าสุด</div>`;

  // water level list
  $("wv-wl-list").innerHTML=wl.map(s=>`<div class="wv-row" tabindex="0" data-id="${s.id}">
    <span class="wv-dot" style="background:${wlColor(s)}"></span>
    <div><div class="wv-name">${esc(s.name)}${s.stale?'<span class="wv-tag">ข้อมูลเก่า</span>':""}${s.odd?'<span class="wv-tag">ค่าผิดปกติ</span>':""}</div>
      <div class="wv-sub">${esc(s.amphoe)} · ${esc(s.provName)} · น้ำ ${s.msl?.toFixed(2)} / ตลิ่ง ${s.bank?.toFixed(2)} ม. · ${trend(s)} · ${s.t?ago(s.t):""}</div></div>
    <div class="wv-num" style="color:${wlColor(s)}">${s.pct.toFixed(0)}%<small>ของตลิ่ง</small></div></div>`).join("")
    || `<div class="wv-sub" style="padding:12px 0">ไม่มีข้อมูล</div>`;
}
let listLimit=30;

// ---------- events ----------
view.addEventListener("click",e=>{
  const tg=e.target.closest(".wv-tg");
  if(tg){ const k=tg.dataset.l; on[k]=!on[k]; tg.setAttribute("aria-pressed",on[k]); render(); return; }
  if(e.target.id==="wv-more"){ listLimit+=50; render(); return; }
  const row=e.target.closest(".wv-row");
  if(row&&map){
    const id=row.dataset.id, mk=markers[id]; if(!mk) return;
    const k=id[0]==="f"?"flood":id[0]==="w"?"wl":"rain";
    if(!on[k]){ on[k]=true; view.querySelector(`.wv-tg[data-l="${k}"]`).setAttribute("aria-pressed","true"); render(); }
    map.setView(markers[id].getLatLng(),15); markers[id].openPopup();
    $("wv-map").scrollIntoView({behavior:"smooth",block:"center"});
  }
});
view.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.classList.contains("wv-row")) e.target.click() });
$("wv-win").addEventListener("click",()=>{ winIdx=(winIdx+1)%WIN.length; listLimit=30; $("wv-win").textContent=`รายงาน: ${WIN[winIdx]} ชม.ล่าสุด`; render(); });
$("wv-reload").addEventListener("click",load);

function loadLeaflet(){
  return new Promise((res,rej)=>{
    if(window.L) return res();
    const l=document.createElement("link"); l.rel="stylesheet"; l.href=LEAF+"leaflet.min.css"; document.head.appendChild(l);
    const s=document.createElement("script"); s.src=LEAF+"leaflet.min.js"; s.onload=res; s.onerror=()=>rej(new Error("โหลดแผนที่ไม่ได้")); document.head.appendChild(s);
  });
}

let started=false;
async function start(){
  if(started){ setTimeout(()=>map&&map.invalidateSize(),50); return; }
  started=true;
  try{
    await loadLeaflet(); L_=window.L;
    map=L_.map("wv-map").fitBounds([[BKK.s,BKK.w],[BKK.n,BKK.e]]);
    L_.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"&copy; OpenStreetMap"}).addTo(map);
    layers={rain:L_.layerGroup(), wl:L_.layerGroup(), flood:L_.layerGroup()};
  }catch(e){ $("wv-map").innerHTML=`<div class="wv-err">${esc(e.message)}</div>`; }
  await load();
  setInterval(()=>{ if(!view.hidden&&!document.hidden) load(); },REFRESH_MS);
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&!view.hidden) load(); });
}

if(location.hash==="#water") showWater(true);
})();
