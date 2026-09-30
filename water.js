/* แท็บสถานการณ์น้ำ — แสดงหน้า BKK FloodWatch (flood.autobahn.bot) ภายในเว็บ */
(function(){
const SRC="https://flood.autobahn.bot/";

const css=`
.fw-bar{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between;padding-block:10px 8px;font-size:13.5px;color:var(--muted)}
.fw-bar a{font:inherit;font-size:14px;border:1px solid var(--line);background:var(--surface);color:var(--ink);padding:5px 12px;border-radius:8px;text-decoration:none;white-space:nowrap}
.fw-bar a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.fw-frame{position:relative;height:calc(100vh - 210px);min-height:520px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface)}
.fw-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.fw-load{position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);font-size:14px}
.fw-note{font-size:12.5px;color:var(--muted);margin:10px 0 28px;line-height:1.6}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

const tabs=document.querySelector(".tabs");
const btn=document.createElement("button");
btn.className="tab"; btn.type="button"; btn.id="tab-water"; btn.setAttribute("role","tab"); btn.setAttribute("aria-selected","false");
btn.innerHTML='สถานการณ์น้ำ<small>สด</small>';
tabs.appendChild(btn);

const view=document.createElement("main");
view.className="wrap"; view.id="view-water"; view.hidden=true;
view.innerHTML=`
  <div class="fw-bar">
    <span>ระดับน้ำคลอง กทม. ปริมณฑล และลุ่มเจ้าพระยา จาก BKK FloodWatch</span>
    <a href="${SRC}" target="_blank" rel="noopener">เปิดเต็มจอ ↗</a>
  </div>
  <div class="fw-frame" id="fw-frame"><div class="fw-load">กำลังโหลด BKK FloodWatch…</div></div>
  <p class="fw-note">หน้านี้แสดงเว็บ <a href="${SRC}" target="_blank" rel="noopener">BKK FloodWatch</a> (flood.autobahn.bot) ซึ่งรวมข้อมูลระดับน้ำจากสถานีของ กทม. และหน่วยงานอื่น ไม่ใช่ระบบของ ทภ.1 · เว็บต้นทางระบุว่าเป็นฉบับทดลอง ไม่ใช่ประกาศทางการ · เหตุฉุกเฉินโทร ปภ. 1784 · กทม. 1555</p>`;
document.getElementById("view-kitchen").after(view);

const searchBox=document.querySelector(".search"), chips=document.getElementById("chips");
let loaded=false;
function showWater(on){
  btn.setAttribute("aria-selected",on);
  view.hidden=!on;
  searchBox.hidden=on; chips.hidden=on;
  if(on){
    ["area","kitchen"].forEach(t=>{document.getElementById("tab-"+t).setAttribute("aria-selected","false");document.getElementById("view-"+t).hidden=true;});
    document.getElementById("eyebrow").textContent="ทภ.1 · ติดตามสถานการณ์น้ำ กทม. และปริมณฑล";
    document.getElementById("title").textContent="สถานการณ์น้ำ (เรียลไทม์)";
    if(!loaded){
      loaded=true;
      const f=document.createElement("iframe");
      f.src=SRC; f.title="BKK FloodWatch"; f.loading="eager"; f.referrerPolicy="no-referrer";
      f.setAttribute("allow","geolocation");
      f.addEventListener("load",()=>{ const l=view.querySelector(".fw-load"); if(l) l.remove(); });
      document.getElementById("fw-frame").appendChild(f);
    }
  }
}
btn.addEventListener("click",()=>{showWater(true);window.scrollTo(0,0)});
["area","kitchen"].forEach(t=>document.getElementById("tab-"+t).addEventListener("click",()=>showWater(false),true));

if(location.hash==="#water") showWater(true);
})();
