
/* V2.5 — Quick Definitions
   Goal: definition access should never require leaving the current decision point. */

const simpleTermIndex = {
 "apprehension of imminent physical injury":{
   plain:"The victim believed physical injury was about to happen.",
   why:"Use this for fear-based assault. The focus is what the victim perceived as imminent, not whether injury actually occurred.",
   cite:"§ 5-13-207",url:URLS.assault207
 },
 "purposely":{
   plain:"The person meant to do it or meant for that result to happen.",
   why:"Use when the conduct/result was the person's conscious objective.",
   cite:"§ 5-2-202(1)",url:URLS.mentalStates
 },
 "knowingly":{
   plain:"The person was aware of what they were doing or knew the result was practically certain.",
   why:"Use when awareness—not necessarily a specific desire for the result—is what the statute requires.",
   cite:"§ 5-2-202(2)",url:URLS.mentalStates
 },
 "recklessly":{
   plain:"The person knew there was a substantial risk and consciously ignored it.",
   why:"The disregard must be more than ordinary carelessness.",
   cite:"§ 5-2-202(3)",url:URLS.mentalStates
 },
 "negligently":{
   plain:"The person should have recognized a substantial risk but failed to.",
   why:"The failure to recognize the risk must be a gross departure from reasonable care.",
   cite:"§ 5-2-202(4)",url:URLS.mentalStates
 },
 "physical injury":{
   plain:"Substantial pain, physical impairment, or visible trauma such as bruising or swelling.",
   why:"Use the actual observed/reported facts; do not rely only on the phrase “injured.”",
   cite:"§ 5-1-102(14)",url:URLS.defs
 },
 "serious physical injury":{
   plain:"A life-threatening or long-lasting injury.",
   why:"Think substantial risk of death, lasting disfigurement, lasting health impairment, or loss/lasting impairment of a body part or organ.",
   cite:"§ 5-1-102(21)",url:URLS.defs
 },
 "deadly weapon":{
   plain:"A firearm, a weapon designed to cause death/serious injury, or another object used in a way capable of causing death/serious injury.",
   why:"An ordinary object can qualify because of HOW it was used.",
   cite:"§ 5-1-102(4)",url:URLS.defs
 },
 "manifestly under the influence":{
   plain:"The intoxication is outwardly noticeable from the person's behavior or condition.",
   why:"Use objective signs: odor, speech, balance, coordination, eyes, confusion, admissions, drinking observed, containers, etc.",
   cite:"§ 5-71-212",url:URLS.pubintox
 },
 "unreasonable annoyance":{
   plain:"The intoxicated person's conduct is actually and unreasonably bothering or disturbing someone nearby.",
   why:"Document the conduct and who was affected; avoid using the label without facts.",
   cite:"§ 5-71-212",url:URLS.pubintox
 },
 "wanton disregard":{
   plain:"Driving that shows more than ordinary carelessness—an obvious danger is ignored and safety is treated with indifference.",
   why:"Look at the total driving conduct. Speed alone does not automatically establish reckless driving.",
   cite:"§ 27-50-308",url:URLS.reckless
 },
 "substantial pain":{
   plain:"Pain significant enough to be more than minor or trivial.",
   why:"Describe what the victim reported and the surrounding facts instead of simply writing “substantial pain.”",
   cite:"§ 5-1-102(14)",url:URLS.defs
 },
 "extreme indifference":{
   plain:"Conduct showing a profound disregard for whether another person lives or suffers serious injury.",
   why:"Look for objective facts showing especially grave danger—not merely ordinary recklessness.",
   cite:"Charge-specific statute",url:URLS.battery201
 },
 "possess":{
   plain:"The person had actual control, dominion, or management over the item.",
   why:"For constructive possession, document the facts connecting the person to the item and showing control.",
   cite:"§ 5-1-102(15)",url:URLS.defs
 }
};

const relatedTermsByQuestion = {
 assault:{
   conduct:["apprehension of imminent physical injury","purposely","recklessly"]
 },
 battery:{
   mental:["purposely","knowingly","recklessly","negligently"],
   visibleInjuries:["physical injury"],
   substantialPain:["substantial pain","physical injury"],
   physicalImpairment:["physical injury"],
   riskDeath:["serious physical injury"],
   protractedDisfigure:["serious physical injury"],
   protractedHealth:["serious physical injury"],
   lossFunction:["serious physical injury"],
   objectUse:["deadly weapon"],
   objectFeatures:["deadly weapon"],
   extremeFacts:["extreme indifference"]
 },
 pubintox:{
   manifest:["manifestly under the influence"],
   intoxSigns:["manifestly under the influence"],
   basis:["unreasonable annoyance"],
   annoyFacts:["unreasonable annoyance"]
 },
 possession:{
   substance:["possess"]
 }
};

function normalizedTerm(term){return String(term||"").trim().toLowerCase()}
function simpleTerm(term){return simpleTermIndex[normalizedTerm(term)]}
window.openSimpleDefinition=function(term){
 const d=simpleTerm(term);
 if(!d){openSheet("Key Term",`<div class="help-text">No simplified field definition is stored for this term yet. Use the Full Statute link while we continue expanding the key-term library.</div>`);return}
 openSheet(term,`
   <div class="quick-def">
     <div class="plain">${esc(d.plain)}</div>
     <div class="why">${esc(d.why)}</div>
     <div class="source"><a target="_blank" rel="noopener" href="${d.url}">${esc(d.cite)} — open source ↗</a></div>
   </div>`);
};
function relatedTermsFor(qid){
 return (relatedTermsByQuestion[currentModule]?.[qid]||[]).filter(x=>simpleTerm(x));
}
function relatedTermButtons(qid){
 const terms=relatedTermsFor(qid);
 if(!terms.length)return "";
 return `<div class="related-terms">${terms.map(t=>`<button type="button" onclick="openSimpleDefinition('${t.replace(/'/g,"\\'")}')">${esc(t)} ?</button>`).join("")}</div>`;
}

/* Enhance question Help: short explanation first, related definitions immediately below. */
openQuestionHelp=function(qid){
 const q=[...modules[currentModule].required,...modules[currentModule].enhancement,...modules[currentModule].report].find(x=>x.id===qid);
 if(!q)return;
 const responses=questionResponses(q);
 const ans=responses.length?`<div class="help-block"><strong>Response guide</strong><div class="answer-help">${responses.map(x=>`<div class="answer-row">${esc(x)}</div>`).join("")}</div></div>`:"";
 const terms=relatedTermsFor(qid);
 const termHtml=terms.length?`<div class="help-block"><strong>Related key terms</strong>${terms.map(t=>{const d=simpleTerm(t);return `<div class="quick-def"><div class="plain">${esc(t)} — ${esc(d.plain)}</div><div class="why">${esc(d.why)}</div><div class="source"><a target="_blank" rel="noopener" href="${d.url}">${esc(d.cite)} ↗</a></div></div>`}).join("")}</div>`:"";
 openSheet("Question Help",`<div class="help-block"><strong>${esc(q.label)}</strong><div class="help-text">${esc(getQuestionHelp(q))}</div></div>${termHtml}${ans}`);
};

/* Add related-term chips directly below any criminal triage question. */
const v25BaseRenderQuestion=renderQuestion;
renderQuestion=function(q,v){
 let base=v25BaseRenderQuestion(q,v);
 if(!base)return base;
 const chips=relatedTermButtons(q.id);
 if(!chips)return base;
 return base.replace('</div>', `${chips}</div>`);
};

/* Present the module Key Terms library in plain English first. */
openDefinitions=function(){
 const moduleDefs=definitionsForCurrent();
 const seen=new Set();
 let rows=[];
 for(const d of moduleDefs){
   const key=normalizedTerm(d.term);
   if(seen.has(key))continue;seen.add(key);
   const simple=simpleTermIndex[key];
   rows.push({
     term:d.term,
     plain:simple?.plain||d.text,
     why:simple?.why||"Use this definition when the statute requires this specific term.",
     cite:simple?.cite||d.cite,
     url:simple?.url||d.url
   });
 }
 /* Also add question-related terms that may not be in the older module list. */
 const qmap=relatedTermsByQuestion[currentModule]||{};
 for(const arr of Object.values(qmap)){
   for(const t of arr){
     const key=normalizedTerm(t),simple=simpleTermIndex[key];
     if(!simple||seen.has(key))continue;seen.add(key);
     rows.push({term:t,plain:simple.plain,why:simple.why,cite:simple.cite,url:simple.url});
   }
 }
 if(!rows.length){openSheet("Key Terms",`<div class="help-text">No separate key terms are needed for this module right now. The Full Statute button remains available.</div>`);return}
 openSheet(`${modules[currentModule]?.title||"Charge"} — Key Terms`,
   rows.map(d=>`<div class="quick-def"><div class="plain">${esc(d.term)} — ${esc(d.plain)}</div><div class="why">${esc(d.why)}</div><div class="source"><a target="_blank" rel="noopener" href="${d.url}">${esc(d.cite)} — source ↗</a></div></div>`).join(""));
};

/* V2.4 traffic term sheets: put the simplified one-line definition first. */
const v25OldTrafficTerm=openTrafficTerm;
openTrafficTerm=function(termId){
 const t=trafficTermData(termId);
 if(!t)return;
 if(termId==="wanton"){
   const d=simpleTerm("wanton disregard");
   openSheet("Wanton disregard",`
     <div class="quick-def"><div class="plain">${esc(d.plain)}</div><div class="why">${esc(d.why)}</div><div class="source"><a target="_blank" rel="noopener" href="${d.url}">${esc(d.cite)} — full statute ↗</a></div></div>
     <div class="help-block"><strong>Field examples that may support it</strong><ul class="field-examples">${t.supports.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
     <div class="help-block"><strong>Limit</strong><div class="help-text">${esc(t.limit)}</div></div>`);
   return;
 }
 v25OldTrafficTerm(termId);
};
