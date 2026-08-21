
/* V2.4 — Statute-specific key terms, starting with Standard Traffic Validation. */

/* Use the user's preferred field language throughout the criminal triage dock. */
lawDock=function(){
 if(!currentModule)return "";
 const links=statuteLinks();
 if(links.length===1)return `<div class="law-dock"><button onclick="openDefinitions()">Key Terms</button><a target="_blank" rel="noopener" href="${links[0].url}">Full Statute ↗</a></div>`;
 return `<div class="law-dock"><button onclick="openDefinitions()">Key Terms</button><button onclick="openStatutes()">Full Statute(s)</button></div>`;
};

const trafficKeyTerms={
 reckless:{
  title:"Reckless Driving — Key Terms",
  statute:"§ 27-50-308",
  url:URLS.reckless,
  terms:[
   {
    id:"wanton",
    term:"Wanton disregard",
    type:"JUDICIAL / FIELD INTERPRETATION",
    text:"§ 27-50-308 uses “wanton disregard” but does not separately define the phrase. For field purposes, look for driving that shows substantially more than ordinary carelessness: the driver proceeds despite an appreciated or obvious danger to persons or property, with indifference to the likely consequences.",
    important:"Do not treat this field cue as a separately codified definition. The legal question remains whether the TOTAL driving conduct indicates wanton disregard for safety.",
    supports:[
     "Multiple dangerous acts occurring together rather than a single minor error",
     "Dangerous speed combined with traffic, roadway, visibility, weather, pedestrian, or other circumstances",
     "Repeated weaving, racing, intentional hazardous maneuvers, near-collisions, or continuing dangerous conduct despite an obvious risk",
     "Facts showing the driver knew or should plainly appreciate that injury/property damage was a probable consequence and continued anyway"
    ],
    limit:"Speed by itself is not automatically the statutory element. A single ordinary driving mistake or simple carelessness does not automatically establish wanton disregard."
   },
   {
    id:"injury",
    term:"Physical injury",
    type:"STATUTE-SPECIFIC CAUTION",
    text:"§ 27-50-308 changes the penalty when physical injury results, but this section does not itself supply a stand-alone definition of “physical injury.” Document the actual injury facts rather than relying on the label alone.",
    important:"Do not automatically import a definition from an unrelated title/subchapter unless the controlling law makes it applicable.",
    supports:[
     "Describe what injury actually resulted",
     "Medical treatment, visible trauma, impairment, pain complaints, and causal connection to the driving are useful facts",
     "The injury question changes the statutory penalty range, not the core reckless-driving element"
    ],
    limit:"If injury status is unclear, mark UNKNOWN and verify rather than guessing."
   },
   {
    id:"prior",
    term:"Second or subsequent offense within 3 years",
    type:"HISTORY / PENALTY FACTOR",
    text:"A qualifying prior reckless-driving offense within the statutory three-year period changes the penalty range under § 27-50-308(b)(2).",
    important:"This is not part of the core § 27-50-308(a) driving element; it is a sentencing/classification factor to verify.",
    supports:["Confirm the prior offense and date before relying on the enhanced range."],
    limit:"If history has not been checked, use UNKNOWN."
   }
  ]
 }
};

function trafficTermData(termId){
 return trafficKeyTerms.reckless.terms.find(x=>x.id===termId);
}
window.openTrafficTerm=function(termId){
 const t=trafficTermData(termId);if(!t)return;
 const bullets=t.supports?.length?`<div class="help-block"><strong>Field facts that can help articulate it</strong><ul class="field-examples">${t.supports.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:"";
 openSheet(t.term,`
   <div class="term-callout"><span class="term-tag">${esc(t.type)}</span><p>${esc(t.text)}</p></div>
   <div class="help-block"><strong>Important</strong><div class="help-text">${esc(t.important)}</div></div>
   ${bullets}
   <div class="help-block"><strong>Left / right limit</strong><div class="help-text">${esc(t.limit)}</div></div>
   <div class="help-block"><a class="stat-row" target="_blank" rel="noopener" href="${trafficKeyTerms.reckless.url}"><strong>${trafficKeyTerms.reckless.statute} — Full Reckless Driving Statute</strong><small>Open complete statute ↗</small></a></div>
 `);
};
window.openTrafficTerms=function(){
 const d=trafficKeyTerms.reckless;
 openSheet(d.title,
  d.terms.map(t=>`<button class="ord-btn" style="width:100%;margin:7px 0" onclick="openTrafficTerm('${t.id}')"><strong>${esc(t.term)}</strong><small>${esc(t.type)}</small></button>`).join("")+
  `<a class="stat-row" target="_blank" rel="noopener" href="${d.url}"><strong>${esc(d.statute)} — Full Statute</strong><small>Open complete reckless-driving statute ↗</small></a>`);
};
window.openTrafficQuestionHelp=function(id){
 const data={
  wanton:{
   title:"What is this asking?",
   text:"Do the TOTAL driving facts rise above ordinary carelessness and indicate wanton disregard for the safety of persons or property? Tap WANTON DISREGARD in the question for the key-term explanation."
  },
  injury:{
   title:"Why does injury matter?",
   text:"Physical injury does not create the reckless-driving element. Once reckless driving is established, injury changes the penalty range under § 27-50-308(b)."
  },
  prior:{
   title:"Why check history?",
   text:"A second or subsequent reckless-driving offense occurring within three years of the first changes the penalty range. If history has not been verified, use UNKNOWN."
  }
 }[id];if(!data)return;
 openSheet(data.title,`<div class="help-text">${esc(data.text)}</div>`);
};

openTraffic=function(){
 hideAll();const el=document.getElementById("traffic");el.classList.remove("hidden");
 el.innerHTML=topTitle("Standard Traffic Validation")+`
 <div class="hero"><h2>Automobile criteria validation</h2><p>Start with the suspected violation. Key statutory terms stay one tap away while you validate the elements.</p></div>
 <div class="card">
   <div class="traffic-head">
     <div class="module-title"><h2>Reckless Driving</h2><p>Ark. Code § 27-50-308</p></div>
     <button class="term-mini" onclick="openTrafficTerms()">Key Terms</button>
   </div>
   <div class="tier-title required">Criteria validation</div>

   <div class="q">
     <div class="traffic-q-head">
       <label>Did the driving indicate <button class="term-link" onclick="openTrafficTerm('wanton')">WANTON DISREGARD</button> for the safety of persons or property? <span class="reqmark">*</span></label>
       <button class="traffic-help" onclick="openTrafficQuestionHelp('wanton')">Help</button>
     </div>
     <div class="seg"><button onclick="trafficVal('wanton','yes')" id="twYes">YES</button><button onclick="trafficVal('wanton','no')" id="twNo">NO</button><button onclick="trafficVal('wanton','unknown')" id="twUn">UNKNOWN</button></div>
     <span class="hint">Assess the total driving conduct — not a bare conclusion.</span>
   </div>

   <div class="q">
     <div class="traffic-q-head">
       <label>Did <button class="term-link" onclick="openTrafficTerm('injury')">PHYSICAL INJURY</button> result?</label>
       <button class="traffic-help" onclick="openTrafficQuestionHelp('injury')">Help</button>
     </div>
     <div class="seg"><button onclick="trafficVal('injury','yes')" id="tiYes">YES</button><button onclick="trafficVal('injury','no')" id="tiNo">NO</button><button onclick="trafficVal('injury','unknown')" id="tiUn">UNKNOWN</button></div>
   </div>

   <div class="q">
     <div class="traffic-q-head">
       <label><button class="term-link" onclick="openTrafficTerm('prior')">PRIOR RECKLESS DRIVING WITHIN 3 YEARS</button>?</label>
       <button class="traffic-help" onclick="openTrafficQuestionHelp('prior')">Help</button>
     </div>
     <div class="seg"><button onclick="trafficVal('prior','yes')" id="tpYes">YES</button><button onclick="trafficVal('prior','no')" id="tpNo">NO</button><button onclick="trafficVal('prior','unknown')" id="tpUn">UNKNOWN</button></div>
   </div>

   <div class="actions"><button class="primary" onclick="evalReckless()">Validate Reckless Driving</button></div>
 </div>
 <div id="trafficResult"></div>
 <div class="traffic-dock"><button onclick="openTrafficTerms()">Key Terms</button><a target="_blank" rel="noopener" href="${URLS.reckless}">Full Statute ↗</a></div>`;
 window.trafficState={};scrollTo(0,0);
};

evalReckless=function(){
 const r=document.getElementById("trafficResult");
 if(!trafficState.wanton){r.innerHTML=`<div class="error">Answer the WANTON DISREGARD question first. Tap the term if you need the field explanation.</div>`;return}
 if(trafficState.wanton==="unknown"){r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><h2>RECKLESS DRIVING — NOT YET RESOLVED</h2></div><div class="block full"><strong>Core issue unresolved:</strong> determine whether the total driving conduct indicates wanton disregard for the safety of persons or property. <button class="term-link" onclick="openTrafficTerm('wanton')">WANTON DISREGARD</button></div></div>`;return}
 if(trafficState.wanton==="no"){r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><h2>RECKLESS DRIVING NOT VALIDATED</h2></div><div class="block full"><strong>Core element not established:</strong> the driving does not indicate wanton disregard for the safety of persons or property under § 27-50-308(a). Consider whether a more specific traffic violation or careless-driving statute fits the observed conduct.</div><div class="block full sources"><a target="_blank" rel="noopener" href="${URLS.reckless}">Full § 27-50-308 ↗</a></div></div>`;return}

 let range;
 if(trafficState.prior==="yes"&&trafficState.injury==="yes")range="Second/subsequent within 3 years + injury: 60 days–1 year imprisonment OR $500–$1,000 fine, or both. § 27-50-308(b)(2)(B).";
 else if(trafficState.prior==="yes")range="Second/subsequent within 3 years: 30 days–6 months imprisonment OR $500–$1,000 fine, or both. § 27-50-308(b)(2)(A).";
 else if(trafficState.injury==="yes")range="First conviction + physical injury: 30–90 days imprisonment OR $100–$1,000 fine, or both. § 27-50-308(b)(1)(A).";
 else range="First conviction, no physical injury: 5–90 days imprisonment OR $25–$500 fine, or both. § 27-50-308(b)(1)(B).";

 let flags=[];
 if(trafficState.prior==="unknown")flags.push("CHECK PRIOR HISTORY — a qualifying prior reckless-driving offense within 3 years changes the penalty range.");
 if(trafficState.injury==="unknown")flags.push("CONFIRM INJURY — whether physical injury resulted changes the penalty range.");

 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Criteria Validation</div><h2>RECKLESS DRIVING — CORE ELEMENT MET</h2><div>§ 27-50-308(a)</div></div>
 <div class="block full"><h3>Why</h3><p>Your answer indicates the total driving conduct showed <button class="term-link" onclick="openTrafficTerm('wanton')">wanton disregard</button> for the safety of persons or property — the core statutory criterion.</p></div>
 <div class="block full"><h3>Penalty range for selected facts</h3>${range}</div>
 <div class="block full"><h3>Confirm / history prompts</h3>${flags.length?`<ul>${flags.map(x=>`<li>${x}</li>`).join("")}</ul>`:"None flagged."}</div>
 <div class="block full sources"><a target="_blank" rel="noopener" href="${URLS.reckless}">Full § 27-50-308 ↗</a></div></div>`;
};
