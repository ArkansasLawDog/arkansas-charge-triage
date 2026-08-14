
/* Arkansas Patrol Charge Triage V2.2 field workflow patch */
Object.assign(URLS,{
 vehicleDefs:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-14/subchapter-1/section-27-14-104/",
 vehicleReg:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-14/subchapter-7/section-27-14-703/",
 noPlate:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-14/subchapter-3/section-27-14-304/",
 bicycleLamps:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-220/",
 cycleRide:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-20/subchapter-1/section-27-20-110/",
 youngPassenger:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-20/subchapter-1/section-27-20-118/",
 instructionPermit:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-8/section-27-16-802/",
 escooterLocal:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-19/section-27-51-1905/",
 fortSmithCode:"https://library.municode.com/ar/fort_smith/codes/code_of_ordinances"
});

/* Ensure the new ordinance screen participates in navigation. */
hideAll=function(){["home","criminal","wizard","special","traffic","ordinances","library"].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.add("hidden")})};

/* ---------- Battery / Domestic Battering: fact-based arrest authority + complete enhancement display ---------- */
(()=>{
 const presence=modules.battery.required.find(q=>q.id==="presence");
 if(presence){
   presence.label="Did you personally witness the battery?";
   presence.opts=[["yes","YES — personally witnessed"],["no","NO — not personally witnessed"]];
 }
 const dangerIndex=modules.battery.enhancement.findIndex(q=>q.id==="danger");
 if(dangerIndex>=0){
   modules.battery.enhancement.splice(dangerIndex,1,
     qSeg("bodilyHarmEvidence","If not witnessed: is there evidence the victim suffered bodily harm?",[
       ["yes","YES — bodily-harm evidence present"],["no","NO — bodily harm not established"],["unknown","UNKNOWN — obtain / confirm facts"]
     ],false,"This question is for warrantless-arrest authority. The charge injury element is resolved separately from the injury questions above.",v=>v.presence==="no"),
     qSeg("furtherViolence","If not witnessed: do facts indicate further violence is likely unless the suspect is arrested now?",[
       ["yes","YES — danger of further violence"],["no","NO — immediate danger not established"],["unknown","UNKNOWN — assess / confirm"]
     ],false,"The app combines this with probable cause and bodily-harm evidence to apply § 16-81-106(b)(2)(B).",v=>v.presence==="no")
   );
 }

 const original=evaluators.battery;
 evaluators.battery=function(v){
   const input={...v};
   input.danger=(v.bodilyHarmEvidence==="yes"&&v.furtherViolence==="yes")?"yes":"no";
   let r=original(input);
   if(!r||!r.charge)return r;

   const dv=v.relationship&&v.relationship!=="none";

   /* If pregnancy + 5-year history both independently support the same elevated DV class,
      show both statutory bases without a fake second elevation. */
   if(dv && v.pregnant==="yes" && v.prior5==="yes" && !String(r.classification).toLowerCase().includes("class y")){
     let offensePart=String(r.statute||"").split(", (b)")[0].split("; classification")[0];
     if(v.prior2ten==="yes" && r.charge==="Domestic Battering — First Degree")offensePart="§ 5-26-303(a)(5)";
     let refs=[];
     if(r.charge==="Domestic Battering — First Degree")refs=["§ 5-26-303(b)(2)(B)(i)","§ 5-26-303(b)(2)(B)(ii)"];
     if(r.charge==="Domestic Battering — Second Degree")refs=["§ 5-26-304(b)(2)(A)","§ 5-26-304(b)(2)(B)"];
     if(r.charge==="Domestic Battering — Third Degree")refs=["§ 5-26-305(b)(2)(A)","§ 5-26-305(b)(2)(B)"];
     if(refs.length){
       r.statute=`${offensePart}; classification ${refs.join(" + ")}`;
       r.chargeImpact=(r.chargeImpact||[]).filter(x=>!String(x).includes("→ Class D felony")&&!String(x).includes("→ Class B felony")&&!String(x).includes("→ Class A felony"));
       r.chargeImpact.push(`PREGNANCY — independently supports the elevated ${r.classification} classification because pregnancy + suspect knowledge facts were entered.`);
       r.chargeImpact.push(`5-YEAR DV HISTORY — independently supports the same elevated ${r.classification} classification.`);
     }
   }

   /* Rebuild the enhancement/situation section so no entered factor disappears. */
   if(dv){
     let enh=[];
     enh.push("APPLIES — qualifying family/household relationship: domestic-battering statutes control.");
     if(v.pregnant==="yes")enh.push(`APPLIED / CONSIDERED — pregnancy. Knowledge basis: ${(v.pregKnowledge||[]).join(", ")||"not entered"}. The final classification citation identifies the applicable pregnancy subsection when it changes the charge.`);
     else if(v.pregnant==="unknown")enh.push("VERIFY BEFORE FINAL CHARGE — pregnancy status unknown; pregnancy can elevate Domestic Battering 1st/2nd/3rd if the suspect knew or reasonably should have known.");
     else enh.push("NOT APPLIED — pregnancy enhancement: victim marked not pregnant.");

     if(v.prior5==="yes")enh.push("APPLIED / CONSIDERED — at least one qualifying DV offense within 5 years. This can elevate the current domestic-battering classification.");
     else if(v.prior5==="unknown")enh.push("VERIFY BEFORE FINAL CHARGE — qualifying DV history within 5 years is unknown and can elevate the classification.");
     else enh.push("NOT APPLIED — 5-year qualifying DV prior enhancement: none reported.");

     if(v.prior2ten==="yes")enh.push("APPLIED / CONSIDERED — two qualifying family/household battery or aggravated-assault priors within 10 years. If the present conduct otherwise fits DB2/DB3, this creates a Domestic Battering 1st pathway under § 5-26-303(a)(5).");
     else if(v.prior2ten==="unknown")enh.push("VERIFY BEFORE FINAL CHARGE — two-prior / 10-year history is unknown and may create a Domestic Battering 1st pathway.");
     else enh.push("NOT APPLIED — two-prior / 10-year DB1 pathway: none reported.");

     if(v.special&&v.special!=="none")enh.push(`SITUATION FACTOR ENTERED — special victim/circumstance: ${v.special}. The exact subsection above reflects it when legally material.`);
     if(v.forceMethod==="firearm")enh.push("SITUATION FACTOR ENTERED — firearm used; firearm status was included in the subsection analysis.");
     else if(["bat","knife","household","vehicle","other"].includes(v.forceMethod))enh.push(`SITUATION FACTOR ENTERED — object/method: ${v.forceMethod}. The app used the object, manner of use, body area, and injury facts to resolve whether a deadly-weapon element applied.`);
     r.enhancements=enh;
   }

   /* Replace the old legal-conclusion arrest prompt with an objective result. */
   const dvWindow=dv&&["within4","within12injury"].includes(v.dvwindow);
   if(!isFelony(r.classification) && v.presence==="no" && !dvWindow){
     if(v.bodilyHarmEvidence==="yes"&&v.furtherViolence==="yes"){
       r.arrest={kind:"yes",text:"YES — off-presence misdemeanor battery exception supported: probable cause for battery + evidence of bodily harm + danger of further violence without immediate arrest. § 16-81-106(b)(2)(B)."};
     }else if(v.bodilyHarmEvidence==="unknown"||v.furtherViolence==="unknown"){
       r.arrest={kind:"maybe",text:"NOT YET RESOLVED — § 16-81-106(b)(2)(B) requires probable cause for battery + evidence of bodily harm + danger of further violence without immediate arrest. Resolve the UNKNOWN factor before relying on this exception."};
     }else if(v.bodilyHarmEvidence!=="yes"){
       r.arrest={kind:"no",text:"NO under the off-presence battery exception — evidence of bodily harm is not established. § 16-81-106(b)(2)(B)."};
     }else{
       r.arrest={kind:"no",text:"NO under the off-presence battery exception — danger of further violence without immediate arrest is not established. § 16-81-106(b)(2)(B)."};
     }
   }

   const impact=(r.chargeImpact||[]);
   if(impact.length){
     r.why=`${r.why||""} CHARGE / ENHANCEMENT IMPACT: ${impact.join(" ")}`;
   }
   return r;
 };
})();

/* ---------- Fort Smith ordinance library supplied by the user ---------- */
const ordinanceData=[
 {sec:"13-214",cat:"Business / Public Ways",title:"Soliciting and peddling prohibited in business district",
  rule:"Except for listed newspaper, educational, religious, charitable, or other nonprofit representatives, a person may not station or loiter on a public street, sidewalk, alley, or other public way in a business area for the purpose of selling, offering for sale, soliciting orders, peddling, or hawking goods or merchandise.",
  why:"Potential citation when the location is a business-area public way and the person's purpose is covered commercial selling, solicitation, peddling, or hawking.",
  confirm:"Confirm exact public-way location, business-area character, commercial purpose, and whether a listed exemption applies.",
  except:"Newspaper, educational, religious, charitable, or other nonprofit representatives listed by the section."},
 {sec:"25-298",cat:"Sanitation",title:"Removal from cans or containers",
  rule:"A person may not remove garbage, recyclables, trash, solid waste, or similar material from a garbage can or commercial container after it has been placed there, except under sanitation-department orders.",
  why:"Direct Fort Smith ordinance for dumpster / trash-container removal when a person actually removes material from a can or commercial container.",
  confirm:"Confirm material was removed from a garbage can/commercial container inside Fort Smith and no sanitation-department authorization existed.",
  except:"Removal under orders of a sanitation-department officer, agent, or employee for disposal."},
 {sec:"24-176",cat:"Bicycles / Sidewalk",title:"Bicycles and pushcarts on central-business-district sidewalks",
  rule:"Except for police officers, a person may not ride a bicycle or operate a pushcart on a sidewalk in the central business district.",
  why:"Potential local citation when a bicycle is actually ridden on a sidewalk within the central business district.",
  confirm:"Confirm the location is a sidewalk AND within the central business district; confirm the device is a bicycle before using this section.",
  except:"Police officers."},
 {sec:"25-299",cat:"Sanitation",title:"Public trash receptacles",
  rule:"City street/sidewalk trash receptacles may not be removed, sat upon, defaced, made inaccessible, or obstructed by nearby material; a city-issued blue recycling container may not be removed from the residence/business for which it was provided.",
  why:"Potential citation when conduct directly interferes with, damages, removes, or improperly relocates a city-provided receptacle.",
  confirm:"Identify the city-provided receptacle and the exact prohibited act.",
  except:"Use the specific subsection matching the observed conduct."},
 {sec:"19-66",cat:"Parking",title:"Historic-district parking on unimproved surfaces",
  rule:"A vehicle may not be parked/stored on specified front/side-yard or undeveloped property in the historic district on an unimproved surface such as grass, dirt, or a sidewalk that is not qualifying driveway/garage/carport access.",
  why:"Potential parking citation when the historic-district, property-position, and unimproved-surface elements are all present.",
  confirm:"Confirm historic-district boundaries, developed/undeveloped property status, and whether the surface is part of qualifying driveway/garage/carport access.",
  except:"Qualifying driveway, garage, or carport access described by the ordinance."},
 {sec:"18-65",cat:"Parks",title:"Camping and sleeping",
  rule:"Overnight camping and sleeping is prohibited except in a designated park area.",
  why:"Potential park-ordinance citation when overnight camping/sleeping occurs outside a designated area.",
  confirm:"Confirm Fort Smith park jurisdiction, overnight camping/sleeping conduct, and whether the location is designated.",
  except:"Designated park area."},
 {sec:"18-60",cat:"Parks / Animals",title:"Animals unleashed in parks",
  rule:"Animals other than those native to the park area must be properly leashed; service animals are to be properly harnessed.",
  why:"Potential park citation when a nonnative animal is present in a park without the required leash/harness.",
  confirm:"Confirm park location and animal/service-animal status.",
  except:"Animals native to the park; service-animal harness provision."},
 {sec:"18-63",cat:"Parks / Special Vehicles",title:"Motorized cycles, scooters, and vehicles in parks/trails",
  rule:"Motorized vehicles, including cycles, scooters, and four-wheelers, are prohibited in park areas or on the trails system other than paved public traffic ways.",
  why:"Useful special-vehicle local authority when a motorized cycle, scooter, or other motorized vehicle is operated in a Fort Smith park/trail area off a paved public traffic way.",
  confirm:"Confirm Fort Smith park/trail jurisdiction, motorized operation, exact surface/location, and whether an exception applies.",
  except:"Motorized wheelchairs, public-work vehicles, emergency responders, and operation on paved public traffic ways."},
 {sec:"18-64",cat:"Parks",title:"Campfires",
  rule:"Open fires may not be made or kindled in a park except in picnic stoves provided for that purpose.",
  why:"Potential citation when an open fire is made in a park outside a provided picnic stove.",
  confirm:"Confirm park location, open-fire conduct, and whether a provided picnic stove was used.",
  except:"Picnic stoves provided for that purpose."},
 {sec:"18-70",cat:"Parks / Property",title:"Damage or removal of park property",
  rule:"A person may not cut, injure, deface, remove, or disturb listed vegetation, structures, apparatus, or other park property, or damage/mark/write upon park structures.",
  why:"Potential ordinance violation when the conduct specifically damages, removes, or disturbs Fort Smith park property.",
  confirm:"Identify the exact park property and exact damaging/removal/marking act; separately evaluate Criminal Mischief if state-law elements are also present.",
  except:"This local ordinance does not replace a separate state criminal charge when those elements are independently met."},
 {sec:"24-97",cat:"Parking",title:"Stopping, standing, or parking in specified places",
  rule:"Prohibits stopping/standing/parking in listed locations including signed no-stopping areas, safety zones, certain offset-intersection points, approved fire zones, red curbs, and yellow-curb areas outside active loading/unloading.",
  why:"Potential parking citation when the vehicle is in one of the specifically designated prohibited locations and no traffic/safety exception applies.",
  confirm:"Identify the exact subsection/sign/curb marking. For a fire zone on private property, confirm the required fire-department approval/designation.",
  except:"Necessary to avoid conflict with traffic or comply with police/traffic-control directions; yellow curb permits active loading/unloading as described."},
 {sec:"24-178",cat:"Bicycles / Motorcycles",title:"Riding on handlebars, frame, or tank",
  rule:"On a street, highway, or boulevard, a motorcycle or bicycle operator may not carry another person on the handlebar, frame, or tank, and a person may not ride there.",
  why:"Potential local citation when a passenger is actually riding on the handlebar/frame/tank rather than a lawful passenger position.",
  confirm:"Confirm qualifying motorcycle/bicycle, street/highway/boulevard location, and exact passenger position.",
  except:"State passenger/equipment statutes may also independently apply; use the provision matching the proved facts."},
 {sec:"4-130",cat:"Animals",title:"Animal waste",
  rule:"A person responsible for an animal on property not owned/possessed by that person must possess a removal device/depository and immediately remove the animal's excrement; animal excreta may not accumulate to an offensive-stench, health-hazard, or nuisance level.",
  why:"Potential citation when the handler lacks the required cleanup means, fails to remove excrement, or allows prohibited accumulation.",
  confirm:"Confirm control/ownership of the animal, property ownership/possession, and the exact failure or accumulation condition.",
  except:"The possession/removal duties apply to property not owned or possessed by the responsible person."}
];

window.openOrdinances=function(){
 hideAll();const el=document.getElementById("ordinances");el.classList.remove("hidden");
 el.innerHTML=topTitle("Fort Smith Ordinance Quick Reference")+`
 <div class="hero"><h2>Local ordinance field checks</h2><p>Search the ordinance list you provided by section, conduct, location, or category. Each result shows the rule, why it could be cited, and the fact or exception to confirm.</p></div>
 <div class="card"><input id="ordSearch" class="ord-search" placeholder="Search: dumpster, park, bicycle, parking, animal…" oninput="renderOrdinanceList()">
 <select id="ordCat" onchange="renderOrdinanceList()"><option value="">All categories</option>${[...new Set(ordinanceData.map(x=>x.cat))].map(x=>`<option>${x}</option>`).join("")}</select>
 <div id="ordList" class="ord-grid"></div></div><div id="ordResult"></div>`;
 renderOrdinanceList();scrollTo(0,0);
};
window.renderOrdinanceList=function(){
 const q=(document.getElementById("ordSearch")?.value||"").toLowerCase(),cat=document.getElementById("ordCat")?.value||"";
 const rows=ordinanceData.filter(o=>(!cat||o.cat===cat)&&(!q||`${o.sec} ${o.cat} ${o.title} ${o.rule}`.toLowerCase().includes(q)));
 document.getElementById("ordList").innerHTML=rows.length?rows.map(o=>`<button class="ord-btn" onclick="showOrdinance('${o.sec}')"><strong>§ ${o.sec} — ${o.title}</strong><small>${o.cat}</small></button>`).join(""):`<div class="field-note">No matching ordinance in the current imported list.</div>`;
};
window.showOrdinance=function(sec){
 const o=ordinanceData.find(x=>x.sec===sec),r=document.getElementById("ordResult");if(!o)return;
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Fort Smith Municipal Code</div><h2>§ ${esc(o.sec)} — ${esc(o.title)}</h2></div>
 <div class="result-grid"><div class="block full"><h3>Plain-Language Rule</h3><p>${esc(o.rule)}</p></div>
 <div class="block"><h3>Why It Could Be Cited</h3><p>${esc(o.why)}</p></div><div class="block"><h3>Confirm Before Citing</h3><p>${esc(o.confirm)}</p></div>
 <div class="block full"><h3>Exception / Left-Right Limit</h3><p>${esc(o.except)}</p></div>
 <div class="block full sources"><h3>Municipal Code Source</h3><a target="_blank" rel="noopener" href="${URLS.fortSmithCode}">Fort Smith Municipal Code ↗</a></div></div></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};

/* ---------- Special Vehicle Triage: classify first, then show only applicable laws ---------- */
window.openSpecialVehicle=function(){
 hideAll();const el=document.getElementById("special");el.classList.remove("hidden");window.sv={};window.svClass=null;
 el.innerHTML=topTitle("Special Vehicle Triage")+`
 <div class="hero"><h2>Classify first — then enforce</h2><p>You do not need to know whether it is legally an e-bike, moped, motor-driven cycle, motorcycle, scooter, or autocycle. Start with what you see and enter objective specifications.</p></div>
 <div class="card"><div class="tier-title required">Step 1 — visual starting point</div>
 ${svChoice("device","What best matches what you are looking at?",[
   ["ebike","Electric bicycle / bicycle-style device"],
   ["escooter","Stand-up electric scooter"],
   ["electricmc","Electric dirt bike / electric motorcycle / seated electric device"],
   ["gascycle","Gas scooter / moped / motorcycle"],
   ["slingshot","Polaris Slingshot / steering-wheel 3-wheeler"]
 ])}
 <div id="svDynamic"></div><div class="actions"><button class="primary" onclick="classifySpecial()">Classify Vehicle & Load Applicable Laws</button></div></div>
 <div id="svResult"></div>`;
 scrollTo(0,0);
};
window.svChoice=function(id,label,opts){return `<div class="q"><label>${label}</label><div class="choice-grid">${opts.map(o=>`<button type="button" class="choice" id="sv-${id}-${o[0]}" onclick="svSet('${id}','${o[0]}')"><span class="radio"></span><span><strong>${o[1]}</strong></span></button>`).join("")}</div></div>`};
window.svSet=function(k,v){sv[k]=v;document.querySelectorAll(`[id^="sv-${k}-"]`).forEach(x=>x.classList.remove("selected"));let b=document.getElementById(`sv-${k}-${v}`);if(b)b.classList.add("selected");renderSVDynamic()};
window.svSeg=function(k,v){sv[k]=v;renderSVDynamic()};
window.svInput=function(k,v){sv[k]=v};
window.svSel=function(k,v){sv[k]=v};
function svTri(k,label,hint=""){return `<div class="q"><label>${label}</label><div class="seg"><button type="button" onclick="svSeg('${k}','yes')" class="${sv[k]==="yes"?"selected":""}">YES</button><button type="button" onclick="svSeg('${k}','no')" class="${sv[k]==="no"?"selected":""}">NO</button><button type="button" onclick="svSeg('${k}','unknown')" class="${sv[k]==="unknown"?"selected":""}">UNKNOWN</button></div>${hint?`<div class="hint">${hint}</div>`:""}</div>`}
function svNum(k,label,ph,hint=""){return `<div class="q"><label>${label}</label><input type="number" inputmode="decimal" value="${escAttr(sv[k]||"")}" onchange="svInput('${k}',this.value)" placeholder="${ph}">${hint?`<div class="hint">${hint}</div>`:""}</div>`}
function svDropdown(k,label,opts,hint=""){return `<div class="q"><label>${label}</label><select onchange="svSel('${k}',this.value)"><option value="">— Select —</option>${opts.map(o=>`<option value="${o[0]}" ${sv[k]===o[0]?"selected":""}>${o[1]}</option>`).join("")}</select>${hint?`<div class="hint">${hint}</div>`:""}</div>`}

window.renderSVDynamic=function(){
 const d=sv.device,el=document.getElementById("svDynamic");if(!d){el.innerHTML="";return}
 let h=`<div class="tier-title required">Step 2 — objective classification facts</div>`;
 if(d==="ebike"||d==="electricmc"){
   h+=svTri("seat23","Seat/saddle + no more than 3 wheels?","Used if the machine fails the e-bike gate and must continue into motorcycle/motor-vehicle classification.");
   h+=svTri("pedals","Fully operable pedals?","Not decorative, disabled, or peg-style.");
   h+=svTri("labelPresent","Permanent e-bike class / speed / wattage label present?","A missing label is an investigation clue — not automatic proof of an operator violation.");
   h+=svDropdown("specSource","How are wattage and assisted-speed specifications being verified?",[
     ["label","Permanent manufacturer/distributor label"],["manufacturer","Exact-model manufacturer specification"],["documentation","Other reliable vehicle documentation"],["unknown","Unable to verify"]
   ]);
   h+=svNum("watts","Verified motor wattage","e.g. 500, 750, 3000","Arkansas e-bike definition requires LESS THAN 750 W. Exactly 750 W is outside the definition.");
   h+=svDropdown("assistMode","Verified motor operation",[
     ["pedal","Motor assists only while pedaling"],["throttle","Motor can propel without pedaling / throttle"],["unknown","Unable to verify"]
   ]);
   h+=svDropdown("assistCutoff","Verified top motor-assisted speed / cutoff",[
     ["20","20 mph"],["28","28 mph"],["other","Other / above class threshold"],["unknown","Unable to verify"]
   ],"Use the required label or exact-model manufacturer specifications when possible — do not estimate from appearance.");
   h+=svTri("labelAltered","Label / controller / firmware appears altered or inconsistent?","A modification changing motor-powered speed capability or engagement requires an appropriately replaced classification label.");
 }
 if(d==="escooter"){
   h+=svTri("under100","Device weighs less than 100 lb.?","Use label/specifications if disputed.");
   h+=svTri("wheels23","Two or three wheels?");
   h+=svTri("handlebar","Handlebar?");
   h+=svTri("floorboard","Standing floorboard?");
   h+=svDropdown("speedSource","How is maximum capable speed being verified?",[
     ["label","Device/manufacturer label"],["manufacturer","Exact-model manufacturer specification"],["documentation","Other reliable documentation"],["unknown","Unable to verify"]
   ]);
   h+=svNum("maxCapSpeed","Verified maximum capable speed on paved level surface (mph)","e.g. 20","This classifies the device under § 27-51-1902. Do not use an estimated observed speed.");
   h+=svNum("observedSpeed","Observed / measured operating speed (mph) — if known","e.g. 18","Separate enforcement fact: a qualifying scooter may not be operated over 15 mph.");
 }
 if(d==="gascycle"){
   h+=svTri("seat23","Seat/saddle + no more than 3 wheels?");
   h+=svNum("cc","Verified engine displacement (cc)","e.g. 49, 150, 300","Use engine/model marking or reliable specifications.");
   h+=svTri("automatic","Automatic transmission?","Required for the ≤50 cc motorized-bicycle classification.");
 }
 if(d==="slingshot"){
   h+=svTri("threeTires","Three tires?");
   h+=svTri("steeringWheel","Steering wheel?");
   h+=svTri("nonStraddle","Seating does NOT require operator to straddle / sit astride?");
   h+=svTri("autoEquip","Required autocycle equipment present?","Headlights, tail lamps, brakes, horn, and signal lamps are part of the statutory autocycle definition.");
 }
 h+=svDropdown("roadLocation","Where is it being operated?",[
   ["publicroad","Public street / highway"],["sidewalk","Sidewalk"],["bikepath","Bicycle / multi-use path"],["fspark","Fort Smith park / trail"],["private","Private property"],["other","Other / unknown"]
 ],"Location determines which roadway, path, and local rules can apply.");
 el.innerHTML=h;
};

function svClassResult(key,title,why,rules,checks,sources,limits=[]){return{key,title,why,rules,checks,sources,limits}}
function eBikeResolvedClass(){
 const w=Number(sv.watts),verified=sv.specSource&&sv.specSource!=="unknown";
 if(sv.pedals!=="yes"||!verified||!w||!sv.assistMode||!sv.assistCutoff||sv.assistMode==="unknown"||sv.assistCutoff==="unknown")return null;
 if(w>=750)return "not-ebike";
 if(sv.assistMode==="pedal"&&sv.assistCutoff==="20")return "ebike1";
 if(sv.assistMode==="throttle"&&sv.assistCutoff==="20")return "ebike2";
 if(sv.assistMode==="pedal"&&sv.assistCutoff==="28")return "ebike3";
 return "not-ebike";
}
function commonEBikeRules(cls){
 let r=[
   ["LICENSE / TITLE / PLATE / INSURANCE","Qualifying e-bike: no motor-vehicle operator license, title, registration/plate, or motor-vehicle insurance requirement. § 27-51-1703."],
   ["LABEL","Manufacturer/distributor label identifies class, top assisted speed, and motor wattage; speed/engagement modification requires an appropriately replaced label. § 27-51-1704(b)-(c)."],
   ["LIGHTING","Bicycle lighting applies: white front lamp visible 500 ft; red rear lamp visible 500 ft or permitted reflector substitute. § 27-36-220."]
 ];
 if(cls==="ebike1")r.unshift(["CLASS 1","Pedal-assist only; assistance ceases at 20 mph. No Class-1-specific statewide minimum age or helmet rule. § 27-51-1702(1)."]);
 if(cls==="ebike2")r.unshift(["CLASS 2","Motor may propel without pedaling; assistance is not capable at 20 mph. No Class-2-specific statewide minimum age or helmet rule. § 27-51-1702(2)."]);
 if(cls==="ebike3")r.unshift(["CLASS 3","Pedal-assist only; assistance ceases at 28 mph. Operator 16+; operator/passenger under 21 helmet; MPH speedometer required. §§ 27-51-1702(3), 27-51-1706."]);
 return r;
}
function ebikeChecks(cls){
 let c=[
  {id:"bikeLights",label:"Required bicycle lighting is missing when the lighting statute applies",stat:"§ 27-36-220",why:"A qualifying e-bike has bicycle status under § 27-51-1703, so bicycle lighting requirements apply.",confirm:"Document the exact missing/inoperative front or rear lighting/reflector requirement and operating conditions."},
  {id:"modifiedLabel",label:"Motor speed/engagement was modified and classification label was not appropriately replaced",stat:"§ 27-51-1704(c)",why:"Changing motor-powered speed capability or engagement requires an appropriately replaced classification label.",confirm:"Establish the modification and inaccurate/missing replacement label; a merely missing original label alone is not enough."},
  {id:"fsParkMotor",label:"Operated in a Fort Smith park/trail off a paved public traffic way",stat:"Fort Smith § 18-63",why:"Fort Smith prohibits motorized vehicles including cycles/scooters in park/trail areas other than paved public traffic ways.",confirm:"Confirm Fort Smith park/trail jurisdiction, exact surface/location, and no listed exception."}
 ];
 if(cls==="ebike1"||cls==="ebike2")c.push({id:"pathLocal",label:"Class 1/2 operated on a bicycle/multi-use path where a local prohibition is verified",stat:"§ 27-51-1705(a)",why:"Class 1/2 may generally use bicycle/multi-use paths, but a local authority may prohibit them.",confirm:"Identify the exact local prohibition/sign/ordinance — do not cite merely for Class 1/2 path use."});
 if(cls==="ebike3")c.unshift(
  {id:"class3Age",label:"Class 3 operator is under 16",stat:"§ 27-51-1706(a)(1)",why:"A person under 16 may not operate a Class 3 electric bicycle.",confirm:"Confirm DOB / actual age."},
  {id:"class3Helmet",label:"Class 3 operator/passenger is under 21 and not wearing required bicycle helmet",stat:"§ 27-51-1706(b)",why:"Operator/passenger under 21 on a Class 3 e-bike must wear a qualifying bicycle helmet.",confirm:"Confirm actual age and helmet use."},
  {id:"class3Speedometer",label:"Class 3 e-bike has no MPH speedometer",stat:"§ 27-51-1706(c)",why:"Every Class 3 electric bicycle must have a speedometer displaying miles per hour.",confirm:"Confirm Class 3 classification and speedometer absence/inoperability."},
  {id:"class3Path",label:"Class 3 operated on a prohibited bicycle / multi-use path",stat:"§ 27-51-1705(b)",why:"Class 3 generally may not use a bicycle/multi-use path unless within/adjacent to roadway or locally permitted.",confirm:"Confirm exact path relationship to roadway and whether local authority permits Class 3."}
 );
 return c;
}

window.classifySpecial=function(){
 const r=document.getElementById("svResult");if(!sv.device){r.innerHTML=`<div class="error">Select a visual starting point first.</div>`;return}
 let c=null;

 if(sv.device==="ebike"||sv.device==="electricmc"){
   const eb=eBikeResolvedClass();
   if(["ebike1","ebike2","ebike3"].includes(eb)){
     const title=eb==="ebike1"?"Class 1 Electric Bicycle":eb==="ebike2"?"Class 2 Electric Bicycle":"Class 3 Electric Bicycle";
     c=svClassResult(eb,title,
      [`Fully operable pedals established.`,`Verified motor wattage: ${sv.watts} W — below 750 W.`,eb==="ebike1"?"Pedal-assist only + 20 mph cutoff.":eb==="ebike2"?"Motor/throttle propulsion without pedaling + 20 mph class limit.":"Pedal-assist only + 28 mph cutoff."],
      commonEBikeRules(eb),ebikeChecks(eb),
      [source("E-bike definition",URLS.ebikeDef),source("E-bike legal status",URLS.ebikeRules),source("E-bike label/equipment",URLS.ebikeEquipment),source("E-bike path rules",URLS.ebikePaths),source("Class 3 rules",URLS.ebikeClass3),source("Bicycle lamps",URLS.bicycleLamps),source("Fort Smith code",URLS.fortSmithCode)],
      ["Do not apply motorcycle license/plate/insurance requirements to a vehicle that actually meets Arkansas's e-bike definition.","A missing label alone is not automatic proof of an operator offense; verify classification/specifications."]);
   }else if(eb==="not-ebike"&&sv.seat23==="yes"){
     c=svClassResult("electricMotorcycle","Electric Motorcycle / Non-E-Bike Motor Vehicle",
      [sv.pedals!=="yes"?"Fails e-bike gate: no fully operable pedals.":`Fails e-bike gate: ${sv.watts||"unknown"} W or operation/speed facts do not match Class 1, 2, or 3.`,`Seat/saddle + no more than 3 wheels + self-propulsion supports fuel-neutral motorcycle/motor-vehicle treatment for registration purposes.`],
      [
       ["CLASSIFICATION","E-bike exemptions do not apply. Do not convert watts to cc; Chapter 20 cc categories do not map cleanly to an electric motor."],
       ["REGISTRATION / PLATE","Highway motor vehicles are subject to registration unless exempt; a required vehicle may not be operated without a valid plate. §§ 27-14-703, 27-14-304."],
       ["LICENSE","For a motorcycle / similarly classified registrable vehicle on public streets/highways, the motorcycle operator-license rule applies. § 27-20-106(a)."],
       ["INSURANCE","Motor-vehicle liability insurance applies. § 27-22-104."],
       ["RIDER GEAR","Helmet under 21 + protective glasses/goggles/face shield for applicable motorcycle-type public-road operation. § 27-20-104(b)."],
       ["ROAD EQUIPMENT","Applicable motorcycle equipment includes headlamp, rear reflector/lamp, brakes, horn, turn signals, etc. § 27-20-104."]
      ],
      [
       {id:"emNoPlate",label:"Public-highway operation with no valid displayed plate / registration",stat:"§§ 27-14-703; 27-14-304",why:"The device is outside the e-bike exemption and falls into the self-propelled motorcycle/motor-vehicle framework; registrable highway vehicles require registration/plate.",confirm:"Confirm highway operation, no registration exception, and current registration/plate status."},
       {id:"emNoLicense",label:"Operator lacks required motorcycle operator license",stat:"§ 27-20-106(a)",why:"A person 16+ may not operate a motorcycle, motor-driven cycle, or similarly classified registrable vehicle on public streets/highways without a current motorcycle operator license.",confirm:"Confirm operator age, license status, public-road operation, and registration applicability."},
       {id:"emNoInsurance",label:"No motor-vehicle liability insurance",stat:"§ 27-22-104",why:"The non-e-bike device is treated as a motor vehicle rather than an exempt electric bicycle.",confirm:"Verify actual coverage through proof/database; distinguish no coverage from failure to present proof."},
       {id:"emHelmet",label:"Operator/passenger under 21 without helmet",stat:"§ 27-20-104(b)(1)",why:"Protective headgear applies to persons under 21 in the applicable motorcycle-type category.",confirm:"Confirm age and legal vehicle classification."},
       {id:"emEye",label:"Operator/passenger lacks protective glasses/goggles/face shield",stat:"§ 27-20-104(b)(2)",why:"Protective eye/face equipment applies to applicable motorcycle-type public-road operation.",confirm:"Confirm public-street/highway operation and classification."},
       {id:"emEquip",label:"Required motorcycle road equipment missing/inoperative",stat:"§ 27-20-104",why:"Applicable motorcycle-type public-road operation requires the Chapter 20 equipment.",confirm:"Identify/document the exact missing item and subsection."},
       {id:"fsParkMotor",label:"Operated in a Fort Smith park/trail off a paved public traffic way",stat:"Fort Smith § 18-63",why:"Fort Smith prohibits motorized vehicles including cycles/scooters in park/trail areas other than paved public traffic ways.",confirm:"Confirm exact park/trail jurisdiction/location and no exception."}
      ],
      [source("Registration definitions",URLS.vehicleDefs),source("Vehicles subject to registration",URLS.vehicleReg),source("No plate",URLS.noPlate),source("Motorcycle license",URLS.cycleLicense),source("Insurance",URLS.insurance),source("Motorcycle equipment",URLS.cycleEquip),source("Fort Smith code",URLS.fortSmithCode)],
      ["Do not call an electric vehicle a 50 cc / 250 cc equivalent based on wattage — no watts-to-cc conversion is used here.","If title/registration eligibility is disputed for an off-road-only electric dirt bike, document VIN/MSO/model and verify DFA/agency guidance before relying on a registration-specific citation."]);
   }else{
     c=svClassResult("unresolved","Classification Not Yet Resolved",
      ["Entered facts do not establish an Arkansas e-bike class and do not yet establish the seated ≤3-wheel motorcycle/motor-vehicle branch."],
      [["NEXT FACTS","Verify pedals, wattage, assist method/cutoff, seat/saddle, wheel count, and exact-model manufacturer specifications."]],
      [],[source("E-bike definition",URLS.ebikeDef),source("Registration definitions",URLS.vehicleDefs)],
      ["Do not cite e-bike-specific or motorcycle-specific requirements until legal classification is established."]);
   }

 }else if(sv.device==="escooter"){
   const sp=Number(sv.maxCapSpeed),verified=sv.speedSource&&sv.speedSource!=="unknown";
   if(sv.under100==="yes"&&sv.wheels23==="yes"&&sv.handlebar==="yes"&&sv.floorboard==="yes"&&verified&&sp>0&&sp<=20){
     c=svClassResult("escooter","Electric Motorized Scooter",
      ["Less than 100 lb.","2 or 3 wheels + handlebar + standing floorboard","Electric powered",`Verified maximum capable speed: ${sp} mph on a paved level surface — 20 mph or less.`],
      [
       ["MINIMUM AGE","Operator must be 16 or older. § 27-51-1903(1)."],
       ["OPERATING SPEED","May not be operated over 15 mph. § 27-51-1903(2)."],
       ["LOCAL CONTROL","Local authority may regulate safe operation and presence on public property. § 27-51-1905."],
       ["CLASSIFICATION LIMIT","Definition excludes motorcycles, electric bicycles, motor-driven cycles, motorized bicycles, and mopeds. § 27-51-1902."]
      ],
      [
       {id:"scootAge",label:"Operator is under 16",stat:"§ 27-51-1903(1)",why:"A qualifying electric motorized scooter may not be operated by a person under 16.",confirm:"Confirm DOB / actual age."},
       {id:"scootSpeed",label:"Observed / measured operating speed is over 15 mph",stat:"§ 27-51-1903(2)",why:`A qualifying electric motorized scooter may not actually be operated over 15 mph.${sv.observedSpeed?` Entered speed: ${sv.observedSpeed} mph.`:""}`,confirm:"Document a reliable speed basis. Maximum capable speed and actual operating speed are separate facts."},
       {id:"fsParkMotor",label:"Operated in a Fort Smith park/trail off a paved public traffic way",stat:"Fort Smith § 18-63",why:"Fort Smith prohibits motorized vehicles including scooters in park/trail areas other than paved public traffic ways.",confirm:"Confirm Fort Smith park/trail jurisdiction, exact location, and no listed exception."}
      ],
      [source("E-scooter definition",URLS.escooterDef),source("E-scooter operation",URLS.escooterOp),source("Local authority",URLS.escooterLocal),source("Fort Smith code",URLS.fortSmithCode)],
      ["Do not use an observed speed under 20 mph as proof that maximum capability is 20 mph or less — verify capability separately."]);
   }else if(verified&&sp>20){
     c=svClassResult("unresolved","NOT a Statutory Electric Motorized Scooter",
      [`Verified maximum capable speed is ${sp} mph, exceeding the 20 mph definition limit in § 27-51-1902.`],
      [["NEXT STEP","Do not apply the electric-motorized-scooter operating statute merely because the device looks like a scooter. Continue classification under another motor-vehicle/local category."]],
      [{id:"fsParkMotor",label:"Operated in a Fort Smith park/trail off a paved public traffic way",stat:"Fort Smith § 18-63",why:"The local park rule covers motorized vehicles including scooters even when the state scooter definition is not met.",confirm:"Confirm exact park/trail location and exception status."}],
      [source("E-scooter definition",URLS.escooterDef),source("Fort Smith code",URLS.fortSmithCode)],
      ["A >20 mph maximum capability is a classification failure — it is not by itself the separate § 27-51-1903(2) actual-operation-over-15-mph offense."]);
   }else{
     c=svClassResult("unresolved","Electric Scooter Classification — More Facts Needed",
      ["One or more definition facts are NO/UNKNOWN, or maximum capable speed is not reliably verified."],
      [["REQUIRED TO CLASSIFY","Verify <100 lb., 2/3 wheels, handlebar, standing floorboard, electric power, and maximum capability ≤20 mph on a paved level surface."]],
      [],[source("E-scooter definition",URLS.escooterDef)],
      ["Do not guess maximum capable speed from appearance or a brief observed speed."]);
   }

 }else if(sv.device==="gascycle"){
   const cc=Number(sv.cc);
   if(sv.seat23!=="yes"||!cc){
     c=svClassResult("unresolved","Gas Cycle Classification — More Facts Needed",["Seat/saddle / wheel count or verified engine displacement is missing."],[["REQUIRED TO CLASSIFY","Verify seat/saddle, no more than 3 wheels, engine cc, and automatic transmission for the ≤50 cc branch."]],[],[source("Chapter 20 definitions",URLS.cycleDef)]);
   }else if(cc<=50&&sv.automatic==="yes"){
     c=svClassResult("motorizedBicycle","Motorized Bicycle / Traditional Moped-Type (≤50 cc + Automatic)",
      [`Verified displacement: ${cc} cc.`,`Automatic transmission.`,`Meets § 27-20-101(3); an electric bicycle is expressly excluded from this category.`],
      [
       ["MINIMUM AGE / LICENSE","Public street/highway requires motorized-bicycle certificate OR qualifying motor-driven-cycle, motorcycle, or Class A–D license. No certificate under 14; under 14 prohibited in a municipality of 10,000+. § 27-20-111(c)."],
       ["REGISTRATION","§ 27-20-105 requires registration for motorcycles and motor-driven cycles; motorized bicycles are a separate category and are not listed in that registration command."],
       ["LOCATION","No interstate highway, limited-access highway, or sidewalk operation. § 27-20-111(b)."],
       ["RIDER GEAR","Helmet under 21 + protective glasses/goggles/face shield on public streets/highways. § 27-20-104(b)."],
       ["EQUIPMENT","Headlamp, rear reflector/rear lamp, brakes, horn, muffler, and turn signals apply on public streets. § 27-20-104(d)."],
       ["PASSENGER","Operator under 16 may not carry another person on a motorized bicycle. § 27-20-110."]
      ],
      [
       {id:"mbLicense",label:"Public-street/highway operator lacks required certificate or qualifying license",stat:"§ 27-20-111(c)(1)",why:"Public-street/highway operation requires the certificate or one of the listed qualifying licenses.",confirm:"Confirm public-road operation and actual credential status."},
       {id:"mbUnder14",label:"Operator is under 14 within a municipality of 10,000+ population",stat:"§ 27-20-111(c)(2)(A)(iii)",why:"The statute expressly prohibits under-14 operation of a motorized bicycle in a municipality of 10,000 or more.",confirm:"Confirm DOB, municipal limits, and population applicability."},
       {id:"mbSidewalk",label:"Operated on sidewalk, interstate, or limited-access highway",stat:"§ 27-20-111(b)",why:"Those locations are expressly prohibited for motorized-bicycle operation.",confirm:"Document exact location/roadway classification."},
       {id:"mbHelmet",label:"Operator/passenger under 21 without protective headgear",stat:"§ 27-20-104(b)(1)",why:"Helmet requirement applies to motorized-bicycle operators/passengers under 21 on public streets/highways.",confirm:"Confirm age and public-street/highway operation."},
       {id:"mbEye",label:"Operator/passenger lacks protective glasses/goggles/face shield",stat:"§ 27-20-104(b)(2)",why:"Protective eye/face equipment applies to motorized-bicycle operators/passengers on public streets/highways.",confirm:"Confirm public-street/highway operation."},
       {id:"mbPassenger",label:"Operator under 16 is carrying a passenger",stat:"§ 27-20-110",why:"The passenger restrictions prohibit an under-16 motorized-bicycle operator from carrying another person.",confirm:"Confirm operator age and passenger."},
       {id:"mbEquip",label:"Applicable motorized-bicycle equipment is missing/inoperative",stat:"§ 27-20-104(d)",why:"The statute specifies lights/reflector, brakes, horn, muffler, and turn-signal requirements.",confirm:"Identify the exact missing item/subsection and public-street use."},
       {id:"fsParkMotor",label:"Operated in a Fort Smith park/trail off a paved public traffic way",stat:"Fort Smith § 18-63",why:"Fort Smith prohibits motorized cycles/scooters/vehicles in park/trail areas other than paved public traffic ways.",confirm:"Confirm location and no exception."}
      ],
      [source("Definitions",URLS.cycleDef),source("Motorized bicycle rules",URLS.motorizedBicycle),source("Equipment",URLS.cycleEquip),source("Passenger rules",URLS.cycleRide),source("Fort Smith code",URLS.fortSmithCode)],
      ["Do not apply the ≤250 cc special motor-driven-cycle license rule as if this were a motor-driven cycle; ≤50 cc automatic is a separate motorized-bicycle category."]);
   }else if(cc<=250){
     c=svClassResult("motorDriven","Motor-Driven Cycle (≤250 cc; not Motorized Bicycle)",
      [`Verified displacement: ${cc} cc.`,cc<=50&&sv.automatic!=="yes"?"≤50 cc, but the automatic-transmission motorized-bicycle definition is not met.":"250 cc or less and not the separate motorized-bicycle category."],
      [
       ["MINIMUM AGE / LICENSE","Age 14–15 may obtain the special motor-driven-cycle license for ≤250 cc; age 16+ requires a current motorcycle operator license. § 27-20-106."],
       ["REGISTRATION","Motor-driven cycles must be registered. § 27-20-105."],
       ["INSURANCE","Motor-vehicle liability insurance applies. § 27-22-104."],
       ["RIDER GEAR","Helmet under 21 + protective glasses/goggles/face shield. § 27-20-104(b)."],
       ["EQUIPMENT","Headlamp, rear reflector/lamp, brakes, horn, muffler, passenger supports, and turn signals as applicable. § 27-20-104(a)."],
       ["PASSENGER","Operator under 16 may not carry a passenger; seat/support/person-count rules apply. § 27-20-110."]
      ],
      [
       {id:"mdNoPlate",label:"No valid registration / displayed plate",stat:"§§ 27-20-105; 27-14-304",why:"Motor-driven cycles are subject to registration; required highway vehicles may not be operated without a valid plate.",confirm:"Confirm public-highway operation and registration status."},
       {id:"mdLicense",label:"Operator lacks the license required for age / vehicle",stat:"§ 27-20-106",why:"Age 14–15 uses the special ≤250 cc motor-driven-cycle license; age 16+ requires the motorcycle operator license.",confirm:"Confirm DOB, cc, and current license status."},
       {id:"mdInsurance",label:"No motor-vehicle liability insurance",stat:"§ 27-22-104",why:"A motor-driven cycle is a motor vehicle subject to liability-insurance requirements.",confirm:"Verify actual coverage/database status."},
       {id:"mdHelmet",label:"Operator/passenger under 21 without helmet",stat:"§ 27-20-104(b)(1)",why:"Protective headgear is required for persons under 21.",confirm:"Confirm actual age."},
       {id:"mdEye",label:"Operator/passenger lacks required eye/face protection",stat:"§ 27-20-104(b)(2)",why:"Protective glasses/goggles/transparent face shield is required.",confirm:"Confirm public-street/highway operation."},
       {id:"mdPassenger",label:"Operator under 16 carrying passenger / unlawful passenger setup",stat:"§ 27-20-110",why:"Under-16 operators may not carry passengers; seat/foot-support/person-count rules also apply.",confirm:"Confirm operator age and exact passenger arrangement."},
       {id:"mdEquip",label:"Required road equipment missing/inoperative",stat:"§ 27-20-104(a)",why:"Motor-driven cycles on public streets/highways require the listed standard equipment.",confirm:"Identify the exact item and subsection."}
      ],
      [source("Definitions",URLS.cycleDef),source("Registration",URLS.cycleReg),source("License",URLS.cycleLicense),source("Equipment",URLS.cycleEquip),source("Passenger rules",URLS.cycleRide),source("Insurance",URLS.insurance)]);
   }else{
     c=svClassResult("motorcycle","Motorcycle (>250 cc)",
      [`Verified displacement: ${cc} cc — greater than 250 cc under Chapter 20.`],
      [
       ["MINIMUM AGE / LICENSE","Age 16+ motorcycle operator license required for public-street/highway operation. § 27-20-106."],
       ["REGISTRATION","Motorcycles must be registered. § 27-20-105."],
       ["INSURANCE","Motor-vehicle liability insurance applies. § 27-22-104."],
       ["RIDER GEAR","Helmet under 21 + protective glasses/goggles/face shield. § 27-20-104(b)."],
       ["EQUIPMENT","Headlamp, rear reflector/lamp, brakes, horn, muffler, passenger supports, and turn signals as applicable. § 27-20-104(a)."],
       ["YOUNG PASSENGER","Child under 8 may not be a passenger on a motorcycle on a street/highway except in a parade. § 27-20-118."]
      ],
      [
       {id:"mcNoPlate",label:"No valid registration / displayed motorcycle plate",stat:"§§ 27-20-105; 27-14-304",why:"Motorcycles are subject to registration and required highway vehicles must display a valid plate.",confirm:"Confirm current registration and no exception."},
       {id:"mcLicense",label:"Operator lacks current motorcycle operator license",stat:"§ 27-20-106",why:"Motorcycle operation on public streets/highways requires a current motorcycle operator license.",confirm:"Confirm identity/license status and public-road operation."},
       {id:"mcInsurance",label:"No motor-vehicle liability insurance",stat:"§ 27-22-104",why:"A motorcycle is a motor vehicle subject to liability-insurance requirements.",confirm:"Verify actual coverage/database status."},
       {id:"mcHelmet",label:"Operator/passenger under 21 without helmet",stat:"§ 27-20-104(b)(1)",why:"Protective headgear is required unless the person is 21 or older.",confirm:"Confirm actual age."},
       {id:"mcEye",label:"Operator/passenger lacks protective eye/face equipment",stat:"§ 27-20-104(b)(2)",why:"Protective glasses/goggles/transparent face shield is required.",confirm:"Confirm public-street/highway operation."},
       {id:"mcYoungPassenger",label:"Passenger is under 8 on street/highway and parade exception does not apply",stat:"§ 27-20-118",why:"A child under 8 may not ride as a motorcycle passenger on a street/highway except in a parade.",confirm:"Confirm passenger age, location, and parade exception."},
       {id:"mcPassenger",label:"Passenger riding unlawfully / seat or foot-support problem",stat:"§ 27-20-110",why:"Passenger seating, supports, and person-count rules apply.",confirm:"Document exact seating/support condition."},
       {id:"mcEquip",label:"Required motorcycle road equipment missing/inoperative",stat:"§ 27-20-104(a)",why:"Motorcycles on public streets/highways require the listed standard equipment.",confirm:"Identify exact missing item/subsection."},
       {id:"fsHandlebars",label:"Passenger riding on handlebar, frame, or tank in Fort Smith",stat:"Fort Smith § 24-178",why:"Fort Smith prohibits motorcycle/bicycle passengers from riding on a handlebar, frame, or tank on a street/highway/boulevard.",confirm:"Confirm exact passenger position and location."}
      ],
      [source("Definitions",URLS.cycleDef),source("Registration",URLS.cycleReg),source("License",URLS.cycleLicense),source("Equipment",URLS.cycleEquip),source("Passenger rules",URLS.cycleRide),source("Young child passenger",URLS.youngPassenger),source("Insurance",URLS.insurance),source("Fort Smith code",URLS.fortSmithCode)]);
   }

 }else if(sv.device==="slingshot"){
   if(["threeTires","steeringWheel","nonStraddle","autoEquip"].every(k=>sv[k]==="yes")){
     c=svClassResult("autocycle","Autocycle / Polaris Slingshot-Type",
      ["Three tires.","Steering wheel.","Non-straddle seating.","Required headlights/tail lamps/brakes/horn/signal lamps present — matching § 27-20-303 characteristics."],
      [
       ["DRIVER AGE / LICENSE","18+: valid regular driver's license; NO motorcycle endorsement. Under 18: instruction permit, learner's license, or intermediate license + restrictions. § 27-20-306(a). Instruction permit begins at 14 under § 27-16-802."],
       ["REGISTRATION / INSURANCE","Autocycle may be registered/licensed as a motorcycle; registration application requires proof of insurance. § 27-20-304. It is a motor vehicle for minimum liability insurance under § 27-20-303(c)."],
       ["SEAT BELTS","Operator and every passenger must comply with mandatory seat-belt use. § 27-20-306(b)."],
       ["HELMET / EYE PROTECTION","Unless the qualifying fully enclosed metal/metal-reinforced cab + safety glass/mirrors exception is met: helmet under 21 + protective glasses/goggles/face shield. §§ 27-20-306(c), 27-20-104(b)."],
       ["PASSENGERS","No more passengers than manufacturer-provided seats. Child passenger requires qualifying enclosed cab; § 27-20-118 also applies, including the under-8 street/highway restriction. § 27-20-306(d)-(f)."],
       ["ROOF / CAB","A roof/cab is NOT generally required for adult operation; the qualifying enclosed cab changes helmet/eye-protection and child-passenger rules."]
      ],
      [
       {id:"acLicense18",label:"Operator age 18+ has no valid regular driver's license",stat:"§ 27-20-306(a)(1)",why:"An autocycle operator 18+ must hold a valid driver's license; motorcycle endorsement is not required.",confirm:"Confirm operator age and license status."},
       {id:"acUnder18License",label:"Operator under 18 lacks required permit/learner/intermediate license or violates restrictions",stat:"§ 27-20-306(a)(2)",why:"Under-18 autocycle operation requires one of the listed credentials and compliance with its restrictions.",confirm:"Confirm DOB, credential, and restrictions; instruction permits may begin at 14."},
       {id:"acSeatbelt",label:"Operator or passenger not wearing required seat belt",stat:"§ 27-20-306(b)",why:"Mandatory seat-belt use applies to operator and all passengers.",confirm:"Confirm occupant and belt use."},
       {id:"acHelmet",label:"No qualifying enclosed cab + occupant under 21 has no helmet",stat:"§ 27-20-306(c) + § 27-20-104(b)(1)",why:"Without the statutory enclosed-cab exception, the under-21 helmet rule applies.",confirm:"Confirm actual age AND cab construction/safety-glass/mirror exception."},
       {id:"acEye",label:"No qualifying enclosed cab + occupant lacks protective glasses/goggles/face shield",stat:"§ 27-20-306(c) + § 27-20-104(b)(2)",why:"Without the qualifying enclosed cab, eye/face protection is required.",confirm:"Confirm cab-exception status."},
       {id:"acSeats",label:"Passengers exceed manufacturer-provided seats",stat:"§ 27-20-306(d)(1)",why:"Passenger count may not exceed manufacturer-provided seats.",confirm:"Count occupants and manufacturer seats."},
       {id:"acChild",label:"Child passenger without qualifying enclosed cab OR passenger under 8 on street/highway",stat:"§ 27-20-306(e)-(f); § 27-20-118",why:"Child-passenger use requires the qualifying enclosed cab, and § 27-20-118 applies to autocycles.",confirm:"Confirm passenger age, street/highway operation, cab standard, and parade exception if under 8."},
       {id:"acInsurance",label:"No required insurance",stat:"§§ 27-20-303(c), 27-20-304(b)",why:"Autocycle is treated as a motor vehicle for minimum liability insurance and proof is required with registration.",confirm:"Verify actual coverage."}
      ],
      [source("Autocycle definition",URLS.autocycleDef),source("Autocycle registration/insurance",URLS.autocycleReg),source("Autocycle operation",URLS.autocycleOp),source("Instruction permit",URLS.instructionPermit),source("Young child passenger",URLS.youngPassenger)],
      ["Do NOT require a motorcycle endorsement from an operator 18+ who holds a valid driver's license.","Do NOT invent a general roof requirement; cab rules are specific to rider gear and child passengers.","Do not automatically apply a child car-seat citation solely from § 27-20-306; use the exact child-passenger statutes/facts."]);
   }else{
     c=svClassResult("unresolved","Autocycle Classification — More Facts Needed",
      ["One or more § 27-20-303 characteristics are NO/UNKNOWN."],
      [["REQUIRED TO CLASSIFY","Confirm 3 tires, steering wheel, non-straddle seating, and required autocycle equipment."]],
      [],[source("Autocycle definition",URLS.autocycleDef)],
      ["Do not apply Slingshot/autocycle-specific exceptions until the vehicle meets the autocycle definition."]);
   }
 }

 window.svClass=c;renderSpecialResult(c);
};

window.renderSpecialResult=function(c){
 const r=document.getElementById("svResult");
 const rules=c.rules.map(x=>`<div class="rule"><strong>${esc(x[0])}</strong>${esc(x[1])}</div>`).join("");
 const checks=c.checks.length?`<div class="enf-list">${c.checks.map(x=>`<label class="enf"><input type="checkbox" id="svc-${x.id}"><span class="enf-main">${esc(x.label)}</span><span class="enf-stat">${esc(x.stat)}</span></label>`).join("")}</div><div class="actions"><button class="primary" onclick="evalSpecialChecks()">Evaluate Selected Issue(s)</button></div>`:`<div class="field-note">No citation checklist is loaded until classification is resolved.</div>`;
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Resolved Vehicle Classification</div><h2>${esc(c.title)}</h2></div>
 <div class="result-grid"><div class="block full"><h3>Why This Classification Is Correct</h3><ul>${c.why.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
 <div class="block full"><h3>Quick Law — What Applies</h3><div class="rule-grid">${rules}</div></div>
 <div class="block full"><h3>Applicable Stop / Citation Checks</h3><p class="hint">Only rules relevant to the resolved vehicle category are shown. Select facts you actually observed or confirmed.</p>${checks}</div>
 <div class="block full"><h3>Left / Right Limits</h3>${c.limits.length?`<ul>${c.limits.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"No additional classification limit flagged."}</div>
 <div class="block full sources"><h3>Primary Sources</h3>${c.sources.map(x=>`<a target="_blank" rel="noopener" href="${x.url}">${esc(x.label)} ↗</a>`).join("")}</div></div></div><div id="svCitations"></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};
window.evalSpecialChecks=function(){
 const c=window.svClass,r=document.getElementById("svCitations");if(!c)return;
 const selected=c.checks.filter(x=>document.getElementById(`svc-${x.id}`)?.checked);
 if(!selected.length){r.innerHTML=`<div class="field-note"><strong>No violation selected.</strong> Classification by itself is not a citation. Select an applicable observed/confirmed violation above.</div>`;return}
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Citation / Stop Validation</div><h2>${selected.length} Applicable Issue${selected.length===1?"":"s"} Selected</h2></div><div class="block full">${selected.map(x=>`<div class="cite-card"><h4>${esc(x.stat)} — POTENTIAL VIOLATION SUPPORTED</h4><p><strong>Why citable:</strong> ${esc(x.why)}</p><p><strong>Confirm / articulate:</strong> ${esc(x.confirm)}</p></div>`).join("")}</div></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};
