
/* V2.3 FIELD MODE — single-question flow, contextual help, definitions/statute dock, compact results */

Object.assign(URLS,{
 mentalStates:"https://law.justia.com/codes/arkansas/title-5/subtitle-1/chapter-2/subchapter-2/section-5-2-202/",
 theftDefs:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-36/subchapter-1/section-5-36-101/"
});

let wizardStep=0;
let lastFieldResult=null;

const moduleDefinitions={
 assault:[
  {term:"Apprehension of imminent physical injury",text:"FIELD CUE — not a separate Arkansas Code definition. Use this when the victim actually perceived or anticipated physical injury as about to occur. The offense itself requires PURPOSEFUL creation of that apprehension.",cite:"§ 5-13-207",url:URLS.assault207},
  {term:"Purposely",text:"The person's conscious object is to engage in the conduct or cause the result.",cite:"§ 5-2-202(1)",url:URLS.mentalStates},
  {term:"Recklessly",text:"The person consciously disregards a substantial and unjustifiable risk; the disregard must be a gross deviation from reasonable care.",cite:"§ 5-2-202(3)",url:URLS.mentalStates},
  {term:"Physical injury",text:"Impairment of physical condition, substantial pain, or bruising, swelling, or a visible trauma mark.",cite:"§ 5-1-102(14)",url:URLS.defs},
  {term:"Serious physical injury",text:"Physical injury creating substantial risk of death, protracted disfigurement, protracted impairment of health, or loss/protracted impairment of a bodily member or organ.",cite:"§ 5-1-102(21)",url:URLS.defs}
 ],
 battery:[
  {term:"Physical injury",text:"Impairment of physical condition, substantial pain, or bruising, swelling, or a visible trauma mark.",cite:"§ 5-1-102(14)",url:URLS.defs},
  {term:"Serious physical injury",text:"Physical injury creating substantial risk of death, protracted disfigurement, protracted impairment of health, or loss/protracted impairment of a bodily member or organ.",cite:"§ 5-1-102(21)",url:URLS.defs},
  {term:"Deadly weapon",text:"A firearm/weapon designed for death or serious injury, or another item that is capable of causing death or serious physical injury in the manner used or intended to be used.",cite:"§ 5-1-102(4)",url:URLS.defs},
  {term:"Purposely",text:"Conscious object to engage in the conduct or cause the result.",cite:"§ 5-2-202(1)",url:URLS.mentalStates},
  {term:"Knowingly",text:"Aware conduct/circumstances exist, or aware the result is practically certain.",cite:"§ 5-2-202(2)",url:URLS.mentalStates},
  {term:"Recklessly",text:"Consciously disregards a substantial and unjustifiable risk; gross deviation from reasonable care.",cite:"§ 5-2-202(3)",url:URLS.mentalStates},
  {term:"Negligently",text:"Should be aware of a substantial and unjustifiable risk; failure to perceive it is a gross deviation from reasonable care.",cite:"§ 5-2-202(4)",url:URLS.mentalStates}
 ],
 mischief:[
  {term:"Purposely",text:"Conscious object to engage in the conduct or cause the result.",cite:"§ 5-2-202(1)",url:URLS.mentalStates},
  {term:"Recklessly",text:"Consciously disregards a substantial and unjustifiable risk; gross deviation from reasonable care.",cite:"§ 5-2-202(3)",url:URLS.mentalStates}
 ],
 theft:[
  {term:"Knowingly",text:"Aware conduct/circumstances exist, or aware the result is practically certain.",cite:"§ 5-2-202(2)",url:URLS.mentalStates},
  {term:"Deprive / deception / threat",text:"Theft-specific definitions are collected in § 5-36-101. Use the linked full definition section when the method of theft is unclear.",cite:"§ 5-36-101",url:URLS.theftDefs}
 ],
 trespass:[
  {term:"Purposely",text:"Conscious object to engage in the conduct or cause the result.",cite:"§ 5-2-202(1)",url:URLS.mentalStates}
 ],
 disorderly:[
  {term:"Purposely",text:"Conscious object to engage in the conduct or cause the result.",cite:"§ 5-2-202(1)",url:URLS.mentalStates},
  {term:"Recklessly",text:"Consciously disregards a substantial and unjustifiable risk; gross deviation from reasonable care.",cite:"§ 5-2-202(3)",url:URLS.mentalStates}
 ],
 loitering:[],
 obstruction:[
  {term:"Knowingly",text:"Aware conduct/circumstances exist, or aware the result is practically certain.",cite:"§ 5-2-202(2)",url:URLS.mentalStates}
 ],
 pubintox:[
  {term:"Manifestly under the influence",text:"FIELD CUE — outwardly observable impairment/intoxication facts should be present. Use the objective signs checklist; do not rely on a bare label of 'intoxicated'.",cite:"§ 5-71-212",url:URLS.pubintox}
 ],
 possession:[
  {term:"Possess",text:"Exercise actual dominion, control, or management over a tangible object.",cite:"§ 5-1-102(15)",url:URLS.defs}
 ],
 paraphernalia:[
  {term:"Possession + drug-related purpose",text:"The item must be possessed/used with the statutory drug-related purpose; an ordinary item by itself is not enough.",cite:"§ 5-64-443",url:URLS.paraphernalia}
 ]
};

const qWhy={
 assault:{
  relationship:"This decides whether the general assault statute or the family/household-member assault statute applies.",
  conduct:"This is the main degree-selection question. Choose the factual conduct and mental state that actually occurred.",
  presence:"For a misdemeanor, this affects the ordinary warrantless-arrest analysis.",
  dvwindow:"A qualifying domestic-abuse time window can create separate warrantless-arrest authority.",
  childPresent:"These facts may trigger a separate enhancement or related charge, depending on the final offense."
 },
 battery:{
  relationship:"This determines whether the general Battery statutes or Domestic Battering statutes control.",
  actType:"This routes the app to physical-force battery, nonconsensual drug/substance battery, or first-responder bodily-fluid battery.",
  mental:"Battery degree can change based on PURPOSELY, KNOWINGLY, RECKLESSLY, or NEGLIGENTLY.",
  forceMethod:"The physical method helps resolve whether an object may qualify as a deadly weapon and helps document the conduct.",
  bodyArea:"Body area helps evaluate the manner of force and seriousness of injury.",
  objectUse:"An ordinary object is not automatically a deadly weapon. The manner in which it was used matters.",
  objectDesc:"Describe the actual object so the app does not make a legal conclusion from a vague label.",
  objectFeatures:"These objective features help determine whether the item was capable of causing death or serious physical injury in the manner used.",
  visibleInjuries:"Visible injury facts help establish physical injury and seriousness. Select what you actually observed.",
  substantialPain:"Substantial pain is one statutory way to establish physical injury even without a visible mark.",
  physicalImpairment:"Impairment of physical condition is another statutory way to establish physical injury.",
  riskDeath:"A substantial risk of death is one route to serious physical injury.",
  protractedDisfigure:"Long-lasting disfigurement is one route to serious physical injury.",
  protractedHealth:"Long-lasting impairment of health is one route to serious physical injury.",
  lossFunction:"Loss or long-lasting impairment of a body member/organ is one route to serious physical injury.",
  permanentDisfigure:"Permanent disfigurement can route the conduct to a higher battery degree.",
  extremeFacts:"These are objective facts used to determine whether an extreme-indifference battery pathway is supported.",
  special:"Victim age/status or other listed circumstance can change the exact subsection or degree.",
  presence:"For a misdemeanor, this affects ordinary warrantless-arrest authority.",
  treatment:"Treatment supports injury documentation but does not replace the statutory injury definition.",
  pregnant:"Pregnancy can elevate a Domestic Battering classification when the required knowledge is established.",
  pregKnowledge:"Pregnancy enhancement requires facts showing the suspect knew or reasonably should have known.",
  prior5:"A qualifying DV offense within 5 years can elevate the current Domestic Battering classification.",
  prior2ten:"Two qualifying priors within 10 years can create an independent Domestic Battering 1st pathway.",
  bodilyHarmEvidence:"For an off-presence misdemeanor battery arrest, the statute requires evidence of bodily harm.",
  furtherViolence:"For that off-presence arrest exception, there also must be danger of further violence without immediate arrest.",
  dvwindow:"A qualifying domestic-abuse time window can provide separate warrantless-arrest authority."
 },
 mischief:{
  conduct:"Purposeful vs reckless damage determines which criminal-mischief statute applies.",
  damage:"Damage amount is a classification fact; use an actual supported estimate or value basis.",
  critical:"Critical-infrastructure involvement can change the applicable subsection.",
  presence:"For a misdemeanor, this affects ordinary warrantless-arrest authority."
 },
 theft:{
  method:"Control, deception, and threat are separate theft pathways.",
  property:"Some property types have classification rules independent of ordinary dollar value.",
  value:"Value is a required classification fact for many theft cases.",
  threatlevel:"The type of threat can change the felony level.",
  presence:"For a misdemeanor, this affects ordinary warrantless-arrest authority.",
  prior10:"A qualifying prior theft offense can elevate low-value theft."
 },
 pubintox:{
  publicplace:"Public Intoxication requires a public place.",
  manifest:"This asks whether intoxication is outwardly apparent from objective facts.",
  basis:"The statute requires either danger to self/others/property OR unreasonable annoyance to a person in the vicinity.",
  intoxSigns:"Use observable signs and admissions to articulate why intoxication was manifest.",
  dangerFacts:"Select the actual danger created rather than merely calling the person 'a danger'.",
  annoyFacts:"Document the repeated/concrete conduct showing unreasonable annoyance.",
  priors:"Two or more qualifying convictions within 5 years change the statutory classification.",
  presence:"For a misdemeanor, this affects ordinary warrantless-arrest authority."
 }
};

function getQuestionHelp(q){
 const specific=qWhy[currentModule]?.[q.id];
 return specific || q.hint || "This question supplies a fact used to select the exact offense, classification, enhancement, or arrest authority. Answer from observed or verified facts rather than a legal conclusion.";
}
function responseText(o,type){
 if(type==="choice")return `${o.k}: ${o.t}`;
 return o[1];
}
function questionResponses(q){
 if(!q.opts)return [];
 return q.opts.map(o=>responseText(o,q.type));
}
function openSheet(title,body){
 closeSheet();
 const d=document.createElement("div");d.id="fieldSheet";d.className="sheet-backdrop";
 d.innerHTML=`<div class="sheet" onclick="event.stopPropagation()"><div class="sheet-grab"></div><div class="sheet-head"><h3>${esc(title)}</h3><button class="sheet-close" onclick="closeSheet()">×</button></div>${body}</div>`;
 d.onclick=closeSheet;document.body.appendChild(d);
}
window.closeSheet=function(){document.getElementById("fieldSheet")?.remove()};
window.openQuestionHelp=function(qid){
 const q=[...modules[currentModule].required,...modules[currentModule].enhancement,...modules[currentModule].report].find(x=>x.id===qid);
 if(!q)return;
 const responses=questionResponses(q);
 const ans=responses.length?`<div class="help-block"><strong>Response guide</strong><div class="answer-help">${responses.map(x=>`<div class="answer-row">${esc(x)}</div>`).join("")}</div></div>`:"";
 openSheet("Question Help",`<div class="help-block"><strong>${esc(q.label)}</strong><div class="help-text">${esc(getQuestionHelp(q))}</div></div>${ans}`);
};

function definitionsForCurrent(){
 const defs=[...(moduleDefinitions[currentModule]||[])];
 return defs;
}
window.openDefinitions=function(){
 const defs=definitionsForCurrent();
 if(!defs.length){openSheet("Definitions",`<div class="help-text">No separate charge-specific definition has been added for this module yet. Use the statute link below while we continue expanding the definition library.</div>`);return}
 openSheet(`${modules[currentModule]?.title||"Charge"} Definitions`,
   defs.map(d=>`<div class="def-row"><strong>${esc(d.term)}</strong><p>${esc(d.text)}</p><a target="_blank" rel="noopener" href="${d.url}">${esc(d.cite)} — full law ↗</a></div>`).join(""));
};

function statuteLinks(){
 const v=currentVals||{};
 switch(currentModule){
  case "assault":{
    const dv=v.relationship&&v.relationship!=="none";
    if(v.conduct){
      const general={fear:["§ 5-13-207",URLS.assault207],riskPhysical:["§ 5-13-206",URLS.assault206],riskSerious:["§ 5-13-205",URLS.assault205],purposeBreath:["§ 5-13-205",URLS.assault205],aggDanger:["§ 5-13-204",URLS.assault204],aggFirearm:["§ 5-13-204",URLS.assault204],aggBreath:["§ 5-13-204",URLS.assault204]};
      const dom={fear:["§ 5-26-309",URLS.da3],riskPhysical:["§ 5-26-308",URLS.da2],riskSerious:["§ 5-26-307",URLS.da1],aggDanger:["§ 5-26-306",URLS.daAgg],aggFirearm:["§ 5-26-306",URLS.daAgg],aggBreath:["§ 5-26-306",URLS.daAgg]};
      const row=dv&&dom[v.conduct]?dom[v.conduct]:general[v.conduct];if(row)return[{label:row[0],url:row[1]}];
    }
    return dv?
      [{label:"§ 5-26-306 — Aggravated Assault F/H",url:URLS.daAgg},{label:"§ 5-26-307 — 1st",url:URLS.da1},{label:"§ 5-26-308 — 2nd",url:URLS.da2},{label:"§ 5-26-309 — 3rd",url:URLS.da3}]:
      [{label:"§ 5-13-204 — Aggravated Assault",url:URLS.assault204},{label:"§ 5-13-205 — 1st",url:URLS.assault205},{label:"§ 5-13-206 — 2nd",url:URLS.assault206},{label:"§ 5-13-207 — 3rd",url:URLS.assault207}];
  }
  case "battery":{
    const dv=v.relationship&&v.relationship!=="none";
    return dv?
      [{label:"§ 5-26-303 — Domestic Battering 1st",url:URLS.db1},{label:"§ 5-26-304 — Domestic Battering 2nd",url:URLS.db2},{label:"§ 5-26-305 — Domestic Battering 3rd",url:URLS.db3},{label:"§ 5-26-312 — Pregnancy",url:URLS.pregnancy}]:
      [{label:"§ 5-13-201 — Battery 1st",url:URLS.battery201},{label:"§ 5-13-202 — Battery 2nd",url:URLS.battery202},{label:"§ 5-13-203 — Battery 3rd",url:URLS.battery203}];
  }
  case "mischief":return [{label:"§ 5-38-203 — Criminal Mischief 1st",url:URLS.mischief1},{label:"§ 5-38-204 — Criminal Mischief 2nd",url:URLS.mischief2}];
  case "theft":return [{label:"§ 5-36-103 — Theft of Property",url:URLS.theft},{label:"§ 5-36-101 — Theft Definitions",url:URLS.theftDefs}];
  case "trespass":return [{label:"§ 5-39-203 — Criminal Trespass",url:URLS.trespass}];
  case "disorderly":return [{label:"§ 5-71-207 — Disorderly Conduct",url:URLS.disorderly}];
  case "pubintox":return [{label:"§ 5-71-212 — Public Intoxication",url:URLS.pubintox}];
  case "loitering":return [{label:"§ 5-71-213 — Loitering",url:URLS.loiter}];
  case "obstruction":return [{label:"§ 5-54-102 — Obstructing Governmental Operations",url:URLS.obstruction}];
  case "possession":return [{label:"§ 5-64-419 — Possession",url:URLS.possession},{label:"§ 5-64-421 — Fentanyl",url:URLS.fentanyl}];
  case "paraphernalia":return [{label:"§ 5-64-443 — Drug Paraphernalia",url:URLS.paraphernalia}];
  default:return [];
 }
}
window.openStatutes=function(){
 const links=statuteLinks();
 openSheet(`${modules[currentModule]?.title||"Charge"} — Full Statute`,
  links.length?links.map(x=>`<a class="stat-row" target="_blank" rel="noopener" href="${x.url}"><strong>${esc(x.label)}</strong><small>Open complete statute ↗</small></a>`).join(""):`<div class="help-text">No statute link is configured for this screen yet.</div>`);
};
function lawDock(){
 if(!currentModule)return "";
 const links=statuteLinks();
 if(links.length===1)return `<div class="law-dock"><button onclick="openDefinitions()">Definitions</button><a target="_blank" rel="noopener" href="${links[0].url}">Full Statute ↗</a></div>`;
 return `<div class="law-dock"><button onclick="openDefinitions()">Definitions</button><button onclick="openStatutes()">Full Statute(s)</button></div>`;
}

/* Compact question renderer — help is always available beside the question. */
renderQuestion=function(q,v){
 if(!visible(q,v))return "";
 const req=q.required?` <span class="reqmark">*</span>`:"";
 const head=`<div class="q-head"><label>${q.label}${req}</label><button type="button" class="qhelp" onclick="openQuestionHelp('${q.id}')">Help</button></div>`;
 if(q.type==="choice"){
   return `<div class="q" data-q="${q.id}">${head}<div class="choice-grid">${q.opts.map(o=>`<button type="button" class="choice ${v[q.id]===o.v?"selected":""}" onclick="setVal('${q.id}','${o.v}')"><span class="radio"></span><span><strong class="kw-${o.tone||"purpose"}">${o.k}</strong><br>${o.t}</span></button>`).join("")}</div></div>`;
 }
 if(q.type==="seg"){
   return `<div class="q" data-q="${q.id}">${head}<div class="seg">${q.opts.map(o=>`<button type="button" class="${v[q.id]===o[0]?"selected":""}" onclick="setVal('${q.id}','${o[0]}')">${o[1]}</button>`).join("")}</div></div>`;
 }
 if(q.type==="multi"){
   const arr=v[q.id]||[];
   return `<div class="q" data-q="${q.id}">${head}<div class="check-grid">${q.opts.map(o=>`<label class="check"><input type="checkbox" ${arr.includes(o[0])?"checked":""} onchange="toggleMulti('${q.id}','${o[0]}',this.checked)"><span>${o[1]}</span></label>`).join("")}</div></div>`;
 }
 if(q.type==="select"){
   return `<div class="q" data-q="${q.id}">${head}<select onchange="setVal('${q.id}',this.value)"><option value="">— Select —</option>${q.opts.map(o=>`<option value="${o[0]}" ${v[q.id]===o[0]?"selected":""}>${o[1]}</option>`).join("")}</select></div>`;
 }
 if(q.type==="number"){
   return `<div class="q" data-q="${q.id}">${head}<input type="number" min="0" step="any" value="${v[q.id]??""}" onchange="setVal('${q.id}',this.value)"></div>`;
 }
 return `<div class="q" data-q="${q.id}">${head}<input type="text" value="${escAttr(v[q.id]??"")}" onchange="setVal('${q.id}',this.value)"></div>`;
};

function fieldQuestions(){
 const m=modules[currentModule];
 const required=m.required.filter(q=>visible(q,currentVals)).map(q=>({q,stage:"required"}));
 const optional=m.enhancement.filter(q=>visible(q,currentVals)).map(q=>({q,stage:"optional"}));
 return [...required,...optional];
}
function valueAnswered(q){
 const val=currentVals[q.id];
 if(q.type==="multi")return Array.isArray(val)&&val.length>0;
 return !(val===undefined||val===null||val==="");
}
function stageName(stage){return stage==="required"?"Charge fact":"Enhancement / arrest check"}

startModule=function(id){
 currentModule=id;currentVals={};wizardStep=0;lastFieldResult=null;hideAll();document.getElementById("wizard").classList.remove("hidden");renderModule();
};
setVal=function(id,val){currentVals[id]=val;renderModule(false)};
toggleMulti=function(id,val,on){
 let a=currentVals[id]||[];
 currentVals[id]=on?[...new Set([...a,val])]:a.filter(x=>x!==val);
 renderModule(false);
};
resetModule=function(){currentVals={};wizardStep=0;lastFieldResult=null;renderModule()};

window.nextFieldQuestion=function(){
 const qs=fieldQuestions();const item=qs[wizardStep];if(!item)return;
 if(item.q.required&&!valueAnswered(item.q)){
  const e=document.getElementById("flowMessage");if(e)e.innerHTML=`<div class="error">Answer this required question before continuing.</div>`;return;
 }
 if(wizardStep<qs.length-1){wizardStep++;renderModule(false);scrollTo(0,0)}
 else evaluateCurrent();
};
window.prevFieldQuestion=function(){if(wizardStep>0){wizardStep--;renderModule(false);scrollTo(0,0)}};
window.jumpResult=function(){
 const missing=missingRequired();
 if(missing.length){const e=document.getElementById("flowMessage");if(e)e.innerHTML=`<div class="error">Still required: ${esc(missing[0])}</div>`;return}
 evaluateCurrent();
};

renderModule=function(toTop=true){
 const m=modules[currentModule],el=document.getElementById("wizard"),qs=fieldQuestions();
 if(!qs.length)return;
 if(wizardStep>=qs.length)wizardStep=qs.length-1;
 const item=qs[wizardStep],q=item.q;
 const pct=Math.round(((wizardStep+1)/qs.length)*100);
 const optional=item.stage==="optional";
 const canBack=wizardStep>0;
 el.innerHTML=topTitle(m.title,`openCriminalCat('${categoryFor(currentModule)}')`)+`
 <div class="flow-head"><div class="flow-title">${esc(stageName(item.stage))}</div><div class="flow-count">${wizardStep+1} of ${qs.length}</div></div>
 <div class="flow-bar"><span style="width:${pct}%"></span></div>
 <div class="flow-card">
   <div class="flow-stage ${optional?"optional":"required"}">${optional?"Optional — may change charge/arrest":"Required"}</div>
   ${renderQuestion(q,currentVals)}
   <div id="flowMessage" class="flow-message" role="alert"></div>
   <div class="flow-nav">
     ${canBack?`<button class="secondary" onclick="prevFieldQuestion()">Back</button>`:""}
     <button class="primary" onclick="nextFieldQuestion()">${wizardStep===qs.length-1?"View Triage Result":optional&&!valueAnswered(q)?"Skip / Next":"Next"}</button>
   </div>
   ${optional?`<div class="flow-skip">Optional questions stay in the flow only when they can affect classification, enhancement, or arrest authority.</div>`:""}
 </div>
 ${lawDock()}<div id="result"></div>`;
 if(toTop)scrollTo(0,0);
};

function listHTML(a,empty="None flagged."){
 return a&&a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<span style="color:var(--muted)">${empty}</span>`;
}
renderResult=function(r){
 lastFieldResult=r;
 const el=document.getElementById("result"),ak=r.arrest?.kind||"no",ac=ak==="yes"?"arrest-yes":ak==="maybe"?"arrest-maybe":"arrest-no";
 const why=defaultWhy(r);
 const impact=(r.chargeImpact||[]).length?`<div class="result-summary-card"><h3>Charge / Enhancement Impact</h3>${listHTML(r.chargeImpact)}</div>`:"";
 const confirm=(r.confirm||[]).length?`<details class="result-details" open><summary>Unresolved fact to confirm</summary><div class="result-detail-body">${listHTML(r.confirm)}</div></details>`:"";
 el.innerHTML=`
 <div class="result">
   <div class="result-head">
     <div class="eyebrow">LIKELY CHARGE</div>
     <h2>${esc(r.charge)}</h2>
     <div class="statute">${esc(r.statute)}</div>
     <div class="badges"><span class="badge ${isFelony(r.classification)?"red":""}">${esc(r.classification)}</span></div>
     <div class="penalty"><strong>MAX PENALTY / RANGE</strong><br>${esc(r.penalty||penaltyFor(r.classification))}</div>
     <div class="whybox"><strong>WHY THIS IS CORRECT</strong><br>${esc(why)}</div>
   </div>
   ${impact}
   <div class="result-summary-card"><h3>Warrantless Arrest?</h3><div class="${ac}">${esc(r.arrest?.text||"Check arrest authority.")}</div></div>
   ${confirm}
   <details class="result-details" open><summary>Elements resolved</summary><div class="result-detail-body">${listHTML(r.elements)}</div></details>
   <details class="result-details"><summary>Enhancements / situation flags</summary><div class="result-detail-body">${listHTML(r.enhancements)}</div></details>
   <details class="result-details"><summary>Report support</summary><div class="result-detail-body"><strong>Facts to articulate</strong>${listHTML(r.reportFacts)}<div class="quote" style="margin-top:10px">${esc(r.verbiage||"")}</div></div></details>
   <details class="result-details"><summary>Primary sources</summary><div class="result-detail-body sources">${(r.sources||[]).map(s=>`<a target="_blank" rel="noopener" href="${s.url}">${esc(s.label)} ↗</a>`).join("")}</div></details>
   <div class="result-actions">
     <button class="primary" onclick="generateReport()">Report Skeleton</button>
     <button class="secondary" onclick="copyResult()">Copy Result</button>
   </div>
 </div>
 ${lawDock()}<div id="reportOut"></div>`;
 el.dataset.result=JSON.stringify(r);
 el.scrollIntoView({behavior:"smooth",block:"start"});
};

/* Keep the law dock available if the result is visible and a module remains active. */
