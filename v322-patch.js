/* ============================================================
   V3.2.2 FIELDING CORRECTION
   Repairs the shared category-card navigation defect.
   ============================================================ */

/* Route every category card through one constant click handler. This removes
   nested-quote parsing from inline onclick attributes—the cause of Quick
   Reference and charge cards appearing tappable but doing nothing on iOS. */
window.routeTopicItemV322=function(button){
 const kind=button?.dataset?.routeKind||"",id=button?.dataset?.routeId||"";
 if(kind==="module")return startModule(id);
 if(kind==="preset"){
  let preset={};
  try{preset=JSON.parse(button.dataset.routePreset||"{}")}catch(_){preset={}}
  return startPresetModule(id,preset);
 }
 if(kind==="quick")return openQuickRef(id);
 if(kind==="special")return openSpecialPreset(id);
 if(kind==="traffic")return openTrafficCheck(id);
 if(kind==="reckless")return openRecklessV30();
 if(kind==="park")return openParkEnforcement();
};

topicItemButton=function(x){
 const kind=x[0]||"",id=x[1]||"",preset=kind==="preset"?JSON.stringify(x[4]||{}):"";
 const badge=kind==="quick"?"Quick Reference":kind==="traffic"||kind==="reckless"?"Validation":"Triage";
 return `<button type="button" class="topic-card ${kind==="quick"?"quick":""}" data-route-kind="${escAttr(kind)}" data-route-id="${escAttr(id)}"${preset?` data-route-preset="${escAttr(preset)}"`:""} onclick="routeTopicItemV322(this)" aria-label="Open ${escAttr(x[2])}"><span class="topic-badge">${badge}</span><strong>${esc(x[2])}</strong><small>${esc(x[3])}</small></button>`;
};

/* Expose a deterministic audit used by the release validation suite. */
window.topicNavigationAuditV322=function(){
 const rows=[];
 Object.entries(topicMap).forEach(([topic,t])=>(t.items||[]).forEach(item=>rows.push({topic,kind:item[0],id:item[1],title:item[2],registered:item[0]!=="quick"||!!quickRefs[item[1]]})));
 return rows;
};

const v322ReleaseNote=document.querySelector("#home .v32-release-note");
if(v322ReleaseNote)v322ReleaseNote.innerHTML="<strong>V3.2.2 fielding correction:</strong> repairs the shared category-card tap handler so every charge, Quick Reference, traffic validator, special-vehicle card, and park tool opens its intended screen.";
