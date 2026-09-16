/* ============================================================
   V3.3 NAME PHONETIC TRANSLATOR
   Uses the department Adam/Boy/Charles police alphabet.
   ============================================================ */

const PHONETIC_V33={
 A:"Adam",B:"Boy",C:"Charles",D:"David",E:"Edward",F:"Frank",G:"George",
 H:"Henry",I:"Ida",J:"John",K:"King",L:"Lincoln",M:"Mary",N:"Nora",
 O:"Ocean",P:"Paul",Q:"Queen",R:"Robert",S:"Sam",T:"Tom",U:"Union",
 V:"Victor",W:"William",X:"X-ray",Y:"Young",Z:"Zebra"
};

if(!quickRefs.phoneticTranslator){
 quickRefs.phoneticTranslator={
  title:"Name Phonetic Translator",
  one:"Enter a name and the app will spell it with the department radio alphabet.",
  sections:[],sources:[]
 };
}
if(!topicMap.quickhub.items.some(x=>x[1]==="phoneticTranslator")){
 topicMap.quickhub.items.unshift([
  "quick","phoneticTranslator","Name Phonetic Translator",
  "Type a name → Adam / Boy / Charles radio spelling"
 ]);
}

const phoneticStyleV33=document.createElement("style");
phoneticStyleV33.textContent=`
.phonetic-tool{display:grid;gap:14px}
.phonetic-input-card,.phonetic-result-card{background:#fff;border:1px solid #d8e1eb;border-radius:14px;padding:15px}
.phonetic-input-card label{display:block;color:#0d315f;font-weight:900;margin-bottom:8px}
.phonetic-input{width:100%;box-sizing:border-box;border:2px solid #9fb2c8;border-radius:11px;padding:14px 12px;font-size:1.15rem;font-weight:800;text-transform:uppercase;color:#16283c;background:#fff}
.phonetic-input:focus{outline:3px solid rgba(14,77,143,.18);border-color:#0e4d8f}
.phonetic-hint{margin:8px 0 0;color:#617184;font-size:.78rem;line-height:1.4}
.phonetic-result-card{border-left:5px solid #0d315f}
.phonetic-result-label{font-size:.72rem;font-weight:900;color:#607086;letter-spacing:.08em;text-transform:uppercase}
.phonetic-original{margin-top:5px;color:#0d315f;font-size:1.25rem;font-weight:900;word-break:break-word}
.phonetic-words{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}
.phonetic-token{display:inline-flex;align-items:center;gap:6px;background:#eef4fa;border:1px solid #cddaea;border-radius:9px;padding:8px 10px;color:#172b42;font-weight:800}
.phonetic-token b{color:#a51f2c;font-size:1.05em}
.phonetic-divider{display:inline-flex;align-items:center;color:#748398;font-weight:900;padding:0 2px}
.phonetic-empty{margin-top:12px;color:#748398;font-style:italic}
.phonetic-line{margin-top:13px;background:#f5f8fb;border-radius:9px;padding:11px;color:#172b42;font-weight:800;line-height:1.55;word-break:break-word}
.phonetic-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.phonetic-actions button{border:0;border-radius:10px;padding:12px;font-weight:900;background:#0d315f;color:#fff}
.phonetic-actions button.secondary{background:#e7edf4;color:#23384f}
.phonetic-copy-status{min-height:18px;text-align:center;color:#287446;font-size:.78rem;font-weight:800}
`;
document.head.appendChild(phoneticStyleV33);

window.translatePhoneticV33=function(value){
 const raw=String(value||"").toUpperCase();
 const tokens=[];let plain="";
 for(const ch of raw){
  if(PHONETIC_V33[ch]){tokens.push({kind:"letter",char:ch,word:PHONETIC_V33[ch]});plain+=(plain&& !plain.endsWith(" / ")?" – ":"")+PHONETIC_V33[ch];continue;}
  if(ch===" "){
   if(tokens.length&&tokens[tokens.length-1].kind!=="space"){tokens.push({kind:"space"});plain=plain.replace(/ – $/,"")+" / ";}
   continue;
  }
  if(ch==="-"||ch==="’"||ch==="'"){
   const word=ch==="-"?"Dash":"Apostrophe";
   tokens.push({kind:"separator",word});plain+=(plain&& !plain.endsWith(" / ")?" – ":"")+word;
  }
 }
 return {raw:raw.trim(),tokens,plain:plain.replace(/ \/ $/,"").replace(/ – $/,"")};
};

window.renderPhoneticV33=function(){
 const input=document.getElementById("phoneticNameV33");
 const result=document.getElementById("phoneticResultV33");
 if(!input||!result)return;
 const translated=translatePhoneticV33(input.value);
 if(!translated.tokens.length){
  result.innerHTML=`<div class="phonetic-empty">The phonetic spelling will appear here as you type.</div>`;
  return;
 }
 result.innerHTML=`
  <div class="phonetic-result-label">Entered name</div>
  <div class="phonetic-original">${esc(translated.raw)}</div>
  <div class="phonetic-words">${translated.tokens.map(t=>t.kind==="letter"?`<span class="phonetic-token"><b>${t.char}</b>${esc(t.word)}</span>`:t.kind==="space"?`<span class="phonetic-divider">/</span>`:`<span class="phonetic-token">${esc(t.word)}</span>`).join("")}</div>
  <div class="phonetic-result-label" style="margin-top:14px">Radio readout</div>
  <div class="phonetic-line">${esc(translated.plain)}</div>`;
};

window.copyPhoneticV33=async function(){
 const input=document.getElementById("phoneticNameV33");
 const status=document.getElementById("phoneticCopyStatusV33");
 const textValue=translatePhoneticV33(input?.value||"").plain;
 if(!textValue){if(status)status.textContent="Enter a name first.";return;}
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(textValue);
  else{
   const temp=document.createElement("textarea");temp.value=textValue;temp.style.position="fixed";temp.style.opacity="0";
   document.body.appendChild(temp);temp.select();document.execCommand("copy");temp.remove();
  }
  if(status)status.textContent="Phonetic spelling copied.";
 }catch(_){if(status)status.textContent="Copy was unavailable. Press and hold the radio readout to copy.";}
};

window.clearPhoneticV33=function(){
 const input=document.getElementById("phoneticNameV33");
 const status=document.getElementById("phoneticCopyStatusV33");
 if(input){input.value="";input.focus();}
 if(status)status.textContent="";
 renderPhoneticV33();
};

window.openPhoneticTranslatorV33=function(){
 hideAll();const el=document.getElementById("criminal");el.classList.remove("hidden");
 el.innerHTML=topTitle("Name Phonetic Translator","openTopic('quickhub')")+`
  <div class="hero"><h2>Name Phonetic Translator</h2><p>Type the name exactly as received. Translation happens on this device and works offline.</p></div>
  <div class="phonetic-tool">
   <div class="phonetic-input-card">
    <label for="phoneticNameV33">NAME</label>
    <input id="phoneticNameV33" class="phonetic-input" type="text" maxlength="80" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Example: MICHAEL WHITE" oninput="renderPhoneticV33()">
    <p class="phonetic-hint">Spaces separate names. Hyphens and apostrophes are read as “Dash” and “Apostrophe.” Other symbols are ignored.</p>
   </div>
   <div id="phoneticResultV33" class="phonetic-result-card" aria-live="polite"><div class="phonetic-empty">The phonetic spelling will appear here as you type.</div></div>
   <div class="phonetic-actions"><button type="button" onclick="copyPhoneticV33()">COPY PHONETIC</button><button type="button" class="secondary" onclick="clearPhoneticV33()">CLEAR</button></div>
   <div id="phoneticCopyStatusV33" class="phonetic-copy-status" aria-live="polite"></div>
  </div>`;
 scrollTo(0,0);setTimeout(()=>document.getElementById("phoneticNameV33")?.focus(),0);
};

const v33OpenQuickRef=openQuickRef;
openQuickRef=function(id){
 if(id==="phoneticTranslator")return openPhoneticTranslatorV33();
 return v33OpenQuickRef(id);
};
window.openQuickRef=openQuickRef;

window.phoneticTranslatorAuditV33=function(){
 const sample=translatePhoneticV33("WHITE");
 return {
  registered:topicMap.quickhub.items.some(x=>x[1]==="phoneticTranslator")&&!!quickRefs.phoneticTranslator,
  sample:sample.plain,
  pass:sample.plain==="William – Henry – Ida – Tom – Edward"
 };
};
