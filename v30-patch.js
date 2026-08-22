
/* ============================================================
   V3.0 PATROL FIELD HUB
   Rule 3: simple, field-first, understandable by a day-one cadet.
   ============================================================ */

Object.assign(URLS,{
 fortSmithCode:"https://library.municode.com/ar/fort_smith/codes/code_of_ordinances?nodeId=COOR_CH1GEPR_S1-9PEVI",
 terrorThreat:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-13/subchapter-3/section-5-13-301/",
 firearmProhibited:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-73/subchapter-1/section-5-73-103/",
 firearmPublic:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-73/subchapter-1/section-5-73-122/",
 firearmPlaces:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-73/subchapter-3/section-5-73-306/",
 carryingWeapon:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-73/subchapter-1/section-5-73-120/",
 harassment:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-71/subchapter-2/section-5-71-208/",
 stalking:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-71/subchapter-2/section-5-71-229/",
 doxxMinor:"https://law.justia.com/codes/arkansas/title-5/subtitle-3/chapter-27/subchapter-6/section-5-27-610/",
 falseAlarm:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-71/subchapter-2/section-5-71-210/",
 threatFireBomb:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-71/subchapter-2/section-5-71-211/",
 emergency1:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-60/subchapter-1/section-5-60-124/",
 emergency2:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-60/subchapter-1/section-5-60-125/",
 emergencyArrest:"https://law.justia.com/codes/arkansas/title-16/subtitle-6/chapter-81/subchapter-1/section-16-81-116/",
 cruelty:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-62/subchapter-1/section-5-62-103/",
 aggravatedCruelty:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-62/subchapter-1/section-5-62-104/",
 resistRefuse:"https://law.justia.com/codes/arkansas/title-5/subtitle-5/chapter-54/subchapter-1/section-5-54-103/",
 interferenceOfficer:"https://law.justia.com/codes/arkansas/title-5/subtitle-5/chapter-54/subchapter-1/section-5-54-104/",
 hindering:"https://law.justia.com/codes/arkansas/title-5/subtitle-5/chapter-54/subchapter-1/section-5-54-105/",
 fleeing:"https://law.justia.com/codes/arkansas/title-5/subtitle-5/chapter-54/subchapter-1/section-5-54-125/",
 orderProtection:"https://law.justia.com/codes/arkansas/title-5/subtitle-5/chapter-53/subchapter-1/section-5-53-134/",
 juvenileDefs:"https://law.justia.com/codes/arkansas/title-9/subtitle-3/chapter-27/subchapter-3/section-9-27-303/",
 juvenileCustody:"https://law.justia.com/codes/arkansas/title-9/subtitle-3/chapter-27/subchapter-3/section-9-27-313/",
 rape:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-103/",
 sexAssault1:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-124/",
 sexAssault2:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-125/",
 sexAssault3:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-126/",
 sexAssault4:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-127/",
 indecentExposure:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/subchapter-1/section-5-14-112/",
 trafficking:"https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-18/section-5-18-103/",
 fraudCard:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-37/subchapter-2/section-5-37-207/",
 marijuana:"https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-64/subchapter-4/section-5-64-419/",
 headlightRequired:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-204/",
 headlamps:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-209/",
 twoLamps:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-207/",
 tint:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-37/subchapter-3/section-27-37-306/",
 registrationCurrent:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-14/subchapter-3/section-27-14-304/",
 cellPhone:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-15/section-27-51-1504/",
 leftCenter:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-3/section-27-51-301/",
 yieldIntersection:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-5/section-27-51-503/",
 yieldUncontrolled:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-5/section-27-51-501/",
 yieldLeft:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-5/section-27-51-502/",
 yieldPrivate:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-6/section-27-51-603/",
 trailerTow:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-35/subchapter-1/section-27-35-111/",
 trailerTail:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-215/",
 trailerExtra:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-218/",
 trailerPlate:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-14/subchapter-12/section-27-14-1211/",
 terry:"https://www.law.cornell.edu/supremecourt/text/392/1",
 miranda:"https://www.law.cornell.edu/supremecourt/text/384/436",
 gant:"https://www.law.cornell.edu/supct/html/07-542.ZO.html",
 rodriguez:"https://www.law.cornell.edu/supct/pdf/13-9972.pdf",
 consentCase:"https://www.law.cornell.edu/supremecourt/text/412/218",
 plainFeel:"https://www.law.cornell.edu/supct/html/91-2019.ZO.html",
 plainView:"https://www.law.cornell.edu/supremecourt/text/496/128",
 automobileException:"https://www.law.cornell.edu/supremecourt/text/267/132"
});

let appMode=localStorage.getItem("arTriageMode")||"simple";
window.setAppMode=function(mode){
 appMode=mode==="advanced"?"advanced":"simple";
 localStorage.setItem("arTriageMode",appMode);
 if(currentModule&&document.getElementById("wizard")&&!document.getElementById("wizard").classList.contains("hidden")){wizardStep=0;renderModule();}
 else home();
};
function modeBar(){
 return `<div class="mode-strip"><button class="${appMode==="simple"?"active":""}" onclick="setAppMode('simple')">SIMPLE MODE</button><button class="${appMode==="advanced"?"active":""}" onclick="setAppMode('advanced')">ADVANCED MODE</button></div>
 <div class="mode-caption">${appMode==="simple"?"Plain language + only essential enhancement checks.":"Full enhancement / arrest-detail review."}</div>`;
}

/* -------------------- MAIN TOPIC HUB -------------------- */
const hubTopics=[
 ["violent","Violent Offenses","Battery • Assault • Fighting • Terroristic Threatening","triage"],
 ["firearms","Firearms / Weapons","Prohibited person • prohibited places • carry overview","triage"],
 ["juvenilehub","Juvenile Law","Delinquent juvenile • Curfew • Runaway","triage"],
 ["sexual","Sexual Offenses","Rape / age guide • Sexual Assault • Indecent Exposure • Human Trafficking","triage"],
 ["behavioral","Behavioral Offenses","Public order • harassment • stalking • arrest interference • fleeing","triage"],
 ["propertyhub","Property Offenses","Theft • fraud card • vehicle use • burglary • breaking/entering • trespass","triage"],
 ["controlled","Controlled Substance","Marijuana • drug paraphernalia","triage"],
 ["specialhub","Special Vehicles","Autocycle • E-bike • motorcycle • moped/scooter • stand-up scooter • trailers","triage"],
 ["traffichub","Common Traffic","Reckless • headlights • registration • tint • phone/text • yield • left of center","triage"],
 ["domesticissues","Domestic Issues","Adult / child calls • chronological first-response checklist","quick"],
 ["parks","City Park Related","Fort Smith park ordinance tools • detention/citation leads","city"],
 ["quickhub","Patrol Quick Reference","Encounters • searches • seizures • traffic stops • arrests • Miranda • carry • marijuana","quick"],
 ["library","Infographic Library","One-page field cards for at-a-glance use","quick"]
];
function topicButton(t){
 const cls=t[3]==="quick"?"quick":t[3]==="city"?"city":"";
 const badge=t[3]==="quick"?"Quick Reference":t[3]==="city"?"City Ordinance":"Field Triage";
 const action=t[0]==="library"?"openLibrary()":`openTopic('${t[0]}')`;
 return `<button class="topic-card ${cls}" data-search="${escAttr((t[1]+" "+t[2]).toLowerCase())}" onclick="${action}"><span class="topic-badge">${badge}</span><strong>${t[1]}</strong><small>${t[2]}</small></button>`;
}
home=function(){
 hideAll();const el=document.getElementById("home");el.classList.remove("hidden");
 el.innerHTML=`<div class="hero"><h2>Arkansas Patrol Field Hub</h2><p>Pick what you are dealing with. The app should explain the law—not assume you already know it.</p></div>
 ${modeBar()}
 <input class="home-search" id="hubSearch" placeholder="Search: battery, runaway, tint, Miranda…" oninput="filterHub(this.value)">
 <div class="topic-grid" id="hubGrid">${hubTopics.map(topicButton).join("")}</div>`;
 scrollTo(0,0);
};
window.filterHub=function(v){
 const q=String(v||"").trim().toLowerCase();
 document.querySelectorAll("#hubGrid .topic-card").forEach(b=>b.style.display=!q||b.dataset.search.includes(q)?"":"none");
};

/* -------------------- TOPIC DEFINITIONS -------------------- */
const topicMap={
 violent:{title:"Violent Offenses",desc:"Start with what happened. Domestic-violence relationship, mutual-force, predominant-aggressor, and court-order issues are built into Battery / Assault.",items:[
  ["module","battery","Battery — including Domestic Battering","Actual injury / prohibited contact"],
  ["module","assault","Assault — including Domestic Assault","Fear / risk without required actual injury"],
  ["preset","disorderly","Fighting (Disorderly Conduct)","Public fighting / violent or tumultuous behavior",{act:"fight"}],
  ["module","terroristic","Terroristic Threatening","Threat + purpose to terrorize"]
 ]},
 firearms:{title:"Firearms / Weapons",desc:"Use the prohibited-person triage for a possession case. Use prohibited-places as a quick reference because carry exceptions can depend on license/endorsement/location.",items:[
  ["module","firearmProhibited","Possession of Firearm by Certain Persons","Felony / prohibited-status possession"],
  ["quick","firearmPlaces","Firearms — Prohibited Places","Public buildings, licensed carry, exceptions"],
  ["quick","concealedCarry","Concealed Carry Overview","What to check before assuming carry is unlawful"]
 ]},
 juvenilehub:{title:"Juvenile Law",desc:"All juvenile-specific material stays here.",items:[
  ["quick","delinquentJuvenile","Delinquent Juvenile","What the term means + custody basics"],
  ["module","curfew","Fort Smith Juvenile Curfew","Age • time • place • defenses"],
  ["quick","runaway","Runaway / FINS","Status issue, custody and parent notification"]
 ]},
 sexual:{title:"Sexual Offenses",desc:"These offenses are relationship- and age-sensitive. The first screen is intentionally a quick reference; use the full statute before final charging when the fact pattern is close.",items:[
  ["quick","rapeAge","Rape / Age & Consent Guide","Force/capacity • victim age • actor age • relationship"],
  ["quick","sexualAssault","Sexual Assault 1st–4th","Age / contact / custody / authority pathways"],
  ["quick","indecentExposure","Indecent Exposure","Exposure + sexual purpose / affront or alarm"],
  ["quick","humanTrafficking","Human Trafficking","Recruitment/transport/obtaining + prohibited purpose/coercion"]
 ]},
 behavioral:{title:"Behavioral Offenses",desc:"Public-order, harassment, interference, arrest-resistance and fleeing tools.",items:[
  ["module","loitering","Loitering","Specific statutory circumstance required"],
  ["module","disorderly","Disorderly Conduct","Public inconvenience / annoyance / alarm + listed act"],
  ["module","harassment","Harassment","Purpose to harass/annoy/alarm + listed conduct"],
  ["quick","stalking","Stalking","Course of conduct + fear/emotional distress + degree factors"],
  ["module","doxxminor","Unlawful Doxxing of Minor","Social-media doxxing + fear of physical injury"],
  ["module","falsealarm","Communicating False Alarm","False emergency report + response/fear/evacuation"],
  ["module","threatfire","Threatening Fire or Bombing","Threat + apprehension/property damage/public alarm"],
  ["module","pubintox","Public Intoxication","Public + manifest intoxication + danger/annoyance"],
  ["module","emergencycomm","Interference with Emergency Communication","1st / 2nd degree + special arrest authority"],
  ["module","animalcruelty","Cruelty to Animals","Cruelty / care failures / aggravated torture pathway"],
  ["module","obstruction","Obstructing Governmental Operations","Affirmative interference / false information"],
  ["module","resistrefuse","Resisting / Refusal to Submit to Arrest","Force/risk vs active/passive refusal"],
  ["module","interferenceOfficer","Interference with LEO / Code Enforcement","Physical force or threat against officer"],
  ["module","hindering","Hindering Apprehension or Prosecution","Helping another avoid apprehension/prosecution"],
  ["module","fleeing","Fleeing","Foot / vehicle + current 2025 enhancement paths"]
 ]},
 propertyhub:{title:"Property Offenses",desc:"Property classification and value questions are kept factual and required only when they change the charge.",items:[
  ["module","theft","Theft of Property","Control / deception / threat + value/special property"],
  ["module","fraudcard","Fraudulent Use of Credit / Debit Card","Unauthorized card/account use + 6-month value total"],
  ["module","unauthvehicle","Unauthorized Use of Vehicle","Knowingly takes/operates/controls without consent"],
  ["module","resburglary","Residential Burglary","Automatically checks aggravated pathways"],
  ["module","comburglary","Commercial Burglary","Includes pharmacy enhancement"],
  ["module","resburglary","Aggravated Residential Burglary","Use Residential Burglary triage; aggravated facts resolve automatically"],
  ["module","breaking","Breaking or Entering","Listed target + purpose to commit theft/felony"],
  ["module","trespass","Criminal Trespass","Purposeful unlawful entry/remain + variants"]
 ]},
 controlled:{title:"Controlled Substance",desc:"Current quick charging paths for marijuana and paraphernalia.",items:[
  ["module","marijuana","Possession of Marijuana","Weight + qualifying prior history"],
  ["module","paraphernalia","Drug Paraphernalia","Item + purpose + controlled-substance / prior logic"],
  ["quick","controlledTable","Controlled Substance Classifications","Quick schedule / weight reference"],
  ["quick","medicalMarijuana","Medical Marijuana Overview","What to verify on patrol"]
 ]},
 specialhub:{title:"Special Vehicles",desc:"Classify first, then show only the laws that actually apply. Use the optional lifelines if you have never dealt with the vehicle before.",items:[
  ["special","slingshot","Autocycle / Polaris Slingshot","License • registration • belts • passenger • gear"],
  ["special","ebike","E-bike — all classes","Class 1 / 2 / 3 + required label"],
  ["special","gascycle","Motorcycle / Motor-Driven Cycle / Moped","cc + transmission + licensing / registration / rider rules"],
  ["special","escooter","Stand-up Electric Scooter","Definition + max capability + operating speed"],
  ["quick","trailers","Trailers","Registration • towing connection • lights / reflectors"]
 ]},
 traffichub:{title:"Common Traffic",desc:"Validation tools—not report-writing workflows. Check the observed fact against the exact rule.",items:[
  ["reckless","","Reckless Driving","Wanton disregard + injury/prior penalty factors"],
  ["traffic","headlight","Headlight Out","Required lighting time + two-light requirement"],
  ["traffic","registration","Expired / Invalid Registration","Current valid registration / plate"],
  ["traffic","tint","Windshield / Window Tint","What can be verified without a tint meter"],
  ["traffic","cellphone","Cell Phone / Texting","Text/social-media use + exceptions"],
  ["traffic","yield","Failure to Yield","Choose the actual yield situation first"],
  ["traffic","leftcenter","Left of Center","Right-half rule + statutory exceptions"]
 ]},
 domesticissues:{title:"Domestic Issues",desc:"Standalone response checklists. These do not choose a charge for you.",items:[
  ["quick","dvAdultResponse","Domestic Violence — Adult Response Checklist","Chronological first-response steps"],
  ["quick","dvChildResponse","Domestic Issues — Children Present / Involved","Safety, welfare, documentation and referral prompts"],
  ["quick","protectionOrder","Protection / No-Contact Order Check","Order validity, notice, condition, violation, arrest authority"]
 ]},
 parks:{title:"City Park Related",desc:"Fort Smith park rules that can create enforcement or investigative leads most officers may not use often.",items:[
  ["park","","City Park Enforcement","Fort Smith Chapter 18 field reference"],
  ["quick","parkDetention","Park Investigative-Detention Leads","Conduct → ordinance → articulable facts"],
  ["quick","cityOrdinances","Common Patrol City Ordinances","Quick links to frequently useful municipal sections"]
 ]},
 quickhub:{title:"Patrol Quick Reference",desc:"Standalone constitutional / patrol references. No charge triage required.",items:[
  ["quick","encounters","Types of Encounters","Consensual • Terry stop • frisk • arrest"],
  ["quick","searches","Types of Searches","Consent • vehicle • incident to arrest • plain view/feel • canine"],
  ["quick","seizures","Seizure Rules","When a person/property seizure occurs + scope"],
  ["quick","trafficStops","Traffic Stops — Do / Don’t","Mission, safety steps, duration, unrelated investigation"],
  ["quick","arrests","Types of Arrests","Warrant • felony PC • in-presence misdemeanor • statutory exceptions"],
  ["quick","concealedCarry","Concealed Carry Overview","Carry is not automatically a crime; check person/place/conduct"],
  ["quick","controlledTable","Controlled Substance Classifications","Simplified patrol table"],
  ["quick","medicalMarijuana","Medical Marijuana Overview","Card/status/quantity/location checks"],
  ["quick","miranda","When to Mirandize","Custody + interrogation, with examples"],
  ["quick","definitionsHub","Legal Definitions","Reasonable suspicion • probable cause • injury • sexual terms • mental states"],
  ["quick","dvAdultResponse","Domestic Violence First Response","Chronological checklist + Laura’s Card / lethality prompts"]
 ]}
};

function openTopic(k){
 const t=topicMap[k];if(!t)return home();
 hideAll();const el=document.getElementById("criminal");el.classList.remove("hidden");
 el.innerHTML=topTitle(t.title)+modeBar()+`<div class="topic-head"><h3>${t.title}</h3><p>${t.desc}</p></div>
 <div class="topic-grid">${t.items.map(topicItemButton).join("")}</div>`;
 scrollTo(0,0);
}
window.openTopic=openTopic;
function topicItemButton(x){
 let action="";
 if(x[0]==="module")action=`startModule('${x[1]}')`;
 if(x[0]==="preset")action=`startPresetModule('${x[1]}',${JSON.stringify(x[4]||{})})`;
 if(x[0]==="quick")action=`openQuickRef('${x[1]}')`;
 if(x[0]==="special")action=`openSpecialPreset('${x[1]}')`;
 if(x[0]==="traffic")action=`openTrafficCheck('${x[1]}')`;
 if(x[0]==="reckless")action=`openRecklessV30()`;
 if(x[0]==="park")action=`openParkEnforcement()`;
 return `<button class="topic-card ${x[0]==="quick"?"quick":""}" onclick='${action}'><span class="topic-badge">${x[0]==="quick"?"Quick Reference":x[0]==="traffic"||x[0]==="reckless"?"Validation":"Triage"}</span><strong>${x[2]}</strong><small>${x[3]}</small></button>`;
}
openCriminal=function(){openTopic("violent")};
openCriminalCat=function(k){openTopic(k)};
categoryFor=function(id){
 const map={
  assault:"violent",battery:"violent",terroristic:"violent",
  firearmProhibited:"firearms",
  curfew:"juvenilehub",
  disorderly:"behavioral",loitering:"behavioral",obstruction:"behavioral",pubintox:"behavioral",
  harassment:"behavioral",doxxminor:"behavioral",falsealarm:"behavioral",threatfire:"behavioral",emergencycomm:"behavioral",
  animalcruelty:"behavioral",resistrefuse:"behavioral",interferenceOfficer:"behavioral",hindering:"behavioral",fleeing:"behavioral",
  theft:"propertyhub",trespass:"propertyhub",mischief:"propertyhub",burglary:"propertyhub",resburglary:"propertyhub",comburglary:"propertyhub",breaking:"propertyhub",unauthvehicle:"propertyhub",fraudcard:"propertyhub",
  possession:"controlled",paraphernalia:"controlled",marijuana:"controlled"
 };return map[id]||"violent";
};
window.startPresetModule=function(id,preset){startModule(id);Object.assign(currentVals,preset||{});wizardStep=0;renderModule();};
window.openSpecialPreset=function(device){
 openSpecialVehicle();
 setTimeout(()=>{if(window.svSet)svSet("device",device)},0);
};

/* -------------------- SIMPLE vs ADVANCED MODULE FLOW -------------------- */
const simpleEnhancementIds={
 assault:["dvwindow","childPresent","bothForce","predominant","courtOrderType","orderNotice","orderViolation"],
 battery:["pregnant","pregKnowledge","prior5","prior2ten","bodilyHarmEvidence","furtherViolence","dvwindow","bothForce","predominant","courtOrderType","orderNotice","orderViolation"],
 theft:["prior10"],trespass:["prior"],mischief:["mischiefFlags"],pubintox:["priors"],possession:["priors4","inmate"],paraphernalia:["prior"],
 resburglary:[],comburglary:[],breaking:[],unauthvehicle:[],curfew:[],
 terroristic:[],firearmProhibited:["aggravators"],harassment:[],doxxminor:[],falsealarm:["repeat"],threatfire:[],
 emergencycomm:["timing"],animalcruelty:["priors"],resistrefuse:[],interferenceOfficer:[],hindering:[],fleeing:["footPrior"],fraudcard:[],marijuana:["priors4"]
};
fieldQuestions=function(){
 const m=modules[currentModule];
 const required=m.required.filter(q=>visible(q,currentVals)).map(q=>({q,stage:"required"}));
 let opt=m.enhancement.filter(q=>visible(q,currentVals));
 if(appMode==="simple"){
   const ids=simpleEnhancementIds[currentModule]||[];
   opt=opt.filter(q=>ids.includes(q.id)||q.id==="locationType");
 }
 const report=(appMode==="advanced"?(m.report||[]).filter(q=>visible(q,currentVals)).map(q=>({q,stage:"report"})):[]);
 return [...required,...opt.map(q=>({q,stage:"optional"})),...report];
};
const v30BaseRenderModule=renderModule;
renderModule=function(toTop=true){
 v30BaseRenderModule(toTop);
 const el=document.getElementById("wizard");
 const head=el?.querySelector(".flow-head");
 if(head&&!el.querySelector(".flow-mode-note"))head.insertAdjacentHTML("afterend",`<div class="flow-mode-note"><strong>${appMode==="simple"?"Simple Mode":"Advanced Mode"}:</strong> ${appMode==="simple"?"core facts + charge-changing enhancement/arrest checks only.":"full enhancement review + optional evidence/report-support prompts."}</div>`);
 const item=fieldQuestions()[wizardStep];
 if(item?.stage==="report"){
   const badge=el.querySelector(".flow-stage");
   const title=el.querySelector(".flow-title");
   if(badge){badge.classList.remove("required");badge.classList.add("optional");badge.textContent="Optional — evidence / report support";}
   if(title)title.textContent="Evidence / report support";
 }
};

/* -------------------- DV / MUTUAL FORCE / ORDER CHECKS -------------------- */
function addQuestionOnce(arr,q){if(!arr.some(x=>x.id===q.id))arr.push(q)}
["assault","battery"].forEach(id=>{
 const a=modules[id].enhancement;
 addQuestionOnce(a,qSeg("bothForce","Did BOTH parties use physical force against each other?",yesNoUnknown,false,"Mutual force does not automatically mean mutual arrest.",v=>v.relationship&&v.relationship!=="none"));
 addQuestionOnce(a,qSelect("predominant","If both used force: what do the objective facts show?",[
   ["unclear","Predominant aggressor not yet resolved"],["one","One party is predominant aggressor"],["separatepc","Independent probable cause for separate offenses by both"],["defense","One party appears to have acted in lawful self-defense"]
 ],false,"Evaluate comparative injuries, threats, history, self-defense, and who initiated/escalated the violence.",v=>v.bothForce==="yes"));
 addQuestionOnce(a,qSelect("courtOrderType","Relevant protection / no-contact / property-ban order?",[
   ["none","None known"],["protection","Active Arkansas / recognized protection order"],["nocontact","Court no-contact order / release condition"],["ban","Property ban / revoked permission"],["unknown","UNKNOWN — verify"]
 ],false,"An order may create a separate offense or change arrest authority."));
 addQuestionOnce(a,qSeg("orderNotice","If an order exists: did the suspect have legally sufficient notice?",yesNoUnknown,false,"Protection-order violation requires notice; other orders have their own requirements.",v=>v.courtOrderType&&v.courtOrderType!=="none"&&v.courtOrderType!=="ban"));
 addQuestionOnce(a,qSeg("orderViolation","Did the conduct violate an actual condition of the order / ban?",yesNoUnknown,false,"Identify the exact condition, not just that an order exists.",v=>v.courtOrderType&&v.courtOrderType!=="none"));
});
function appendDvContext(r,v){
 if(!r||!r.charge)return r;
 if(v.bothForce==="yes"){
  if(v.predominant==="one")r.enhancements.push("MUTUAL FORCE — one party appears to be the predominant aggressor. Do not default to dual arrest; document comparative injuries, threats, history, self-defense, and escalation.");
  else if(v.predominant==="defense")r.enhancements.push("MUTUAL FORCE — facts indicate possible lawful self-defense by one party. Document the threat, proportional response, retreat/escape facts if relevant, and why the response ended/continued.");
  else if(v.predominant==="separatepc")r.enhancements.push("MUTUAL FORCE — independent probable cause may exist for separate offenses by both parties. Analyze each person's conduct separately; mutual combat is not a substitute for elements.");
  else r.enhancements.push("MUTUAL FORCE — predominant aggressor unresolved. Do not use 'both were fighting' as the final legal analysis.");
 }
 if(v.courtOrderType==="protection"){
  if(v.orderNotice==="yes"&&v.orderViolation==="yes"){
   r.enhancements.push("RELATED OFFENSE SUPPORTED FOR REVIEW — Violation of an Order of Protection § 5-53-134: qualifying order + notice + knowing violation. The statute provides off-presence warrantless arrest authority on probable cause.");
   r.sources.push(source("§ 5-53-134 — Order of Protection",URLS.orderProtection));
  }else if(v.orderNotice==="unknown"||v.orderViolation==="unknown"){
   r.enhancements.push("VERIFY ORDER — protection order selected, but notice and/or the exact violated condition remains unresolved.");
  }
 }else if(v.courtOrderType==="nocontact"){
  r.enhancements.push("COURT NO-CONTACT ORDER — verify the issuing court, service/notice, exact condition, and the specific enforcement authority. Do not automatically cite § 5-53-134 unless it is a qualifying order of protection.");
 }else if(v.courtOrderType==="ban"){
  r.enhancements.push("PROPERTY BAN / REVOKED PERMISSION — may support Criminal Trespass if purposeful unlawful entry/remain is established; document who had authority to revoke permission and when/how notice was given.");
 }
 return r;
}
const v30AssaultEval=evaluators.assault;
evaluators.assault=v=>appendDvContext(v30AssaultEval(v),v);
const v30BatteryEval=evaluators.battery;
evaluators.battery=v=>appendDvContext(v30BatteryEval(v),v);

/* -------------------- NEW CHARGE MODULES -------------------- */
modules.terroristic={
 title:"Terroristic Threatening",
 required:[
  qSeg("terrorPurpose","Was the threat made with the PURPOSE of terrorizing another person?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN"]],true),
  qSelect("threat","What was threatened?",[
   ["death","Death or serious physical injury"],["substantialProperty","Substantial property damage"],["physical","Physical injury"],["property","Property damage"],["school","Physical injury/property damage to teacher or school employee acting in duty"]
  ],true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.terroristic=v=>{
 if(v.terrorPurpose!=="yes")return insufficient("§ 5-13-301","Purpose to terrorize is not established.",[source("§ 5-13-301",URLS.terrorThreat)]);
 let first=["death","substantialProperty","school"].includes(v.threat);
 let cls=first?"Class D felony":"Class A misdemeanor";
 let sub=v.threat==="school"?"§ 5-13-301(a)(1)(B), (a)(2)":first?"§ 5-13-301(a)(1)(A), (a)(2)":"§ 5-13-301(b)(1)-(2)";
 let r=baseResult(`Terroristic Threatening — ${first?"First":"Second"} Degree`,sub,cls);
 r.elements=["Purpose to terrorize another person",v.threat==="death"?"Threat of death or serious physical injury":v.threat==="substantialProperty"?"Threat of substantial property damage":v.threat==="school"?"Threat of physical injury/property damage to teacher or school employee acting in line of duty":"Threat of "+(v.threat==="physical"?"physical injury":"property damage")];
 r.reportFacts=["Exact words / communication","Recipient and context","Facts showing purpose to terrorize","How threat was communicated","Screenshots/audio/video/witnesses"];
 r.arrest=arrestText(cls,v.presence);r.sources=[source("§ 5-13-301",URLS.terrorThreat)];return r;
};

modules.firearmProhibited={
 title:"Possession of Firearm by Certain Persons",
 required:[
  qSeg("firearm","Did the person possess or own a FIREARM?",yesNoUnknown,true),
  qSelect("status","What prohibited status is established?",[
   ["felony","Prior felony conviction"],["mental","Adjudicated mentally ill"],["commit","Involuntarily committed to mental institution"],["none","No prohibited status established"],["unknown","UNKNOWN — verify status"]
  ],true),
  qSeg("restored","Pardon / expungement / restoration or other statutory authorization may restore firearm rights?",yesNoUnknown,true,"Do not stop at 'has a felony'; verify restoration/exception facts when raised."),
  qSeg("presence","Current possession observed / established by officer?",presenceOpts,true)
 ],enhancement:[
  qMulti("aggravators","If felony status: classification factors",[["violent","Prior violent felony"],["currentcrime","Current firearm possession involves commission of another crime"],["weaponfelony","Prior felony had deadly-weapon use/possession element"],["prior103","Prior § 5-73-103 / similar conviction"]],false,"Any listed factor can raise the violation to Class B felony.",v=>v.status==="felony")
 ],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.firearmProhibited=v=>{
 if(v.firearm!=="yes")return insufficient("§ 5-73-103","Firearm possession/ownership is not established.",[source("§ 5-73-103",URLS.firearmProhibited)]);
 if(["none","unknown"].includes(v.status)||v.restored==="unknown")return insufficient("§ 5-73-103","Prohibited status or restoration/authorization remains unresolved.",[source("§ 5-73-103",URLS.firearmProhibited)]);
 if(v.restored==="yes")return insufficient("§ 5-73-103","A possible restoration/authorization was identified. Verify the legal effect before charging.",[source("§ 5-73-103",URLS.firearmProhibited)]);
 let cls="Class A misdemeanor",sub="§ 5-73-103(c)(3)";
 if(v.status==="felony"){
  if((v.aggravators||[]).length){cls="Class B felony";sub="§ 5-73-103(c)(1)";}
  else{cls="Class D felony";sub="§ 5-73-103(c)(2)";}
 }
 let r=baseResult("Possession of Firearm by Certain Persons",sub,cls);
 r.elements=["Possession/ownership of a firearm","Prohibited status: "+v.status,"No established restoration/authorization defeating the prohibition"];
 r.reportFacts=["Exact firearm and location","Actual/constructive possession facts","Certified status/conviction source","Restoration/pardon/expungement check","Any current-crime / violent-felony aggravator"];
 r.arrest=arrestText(cls,"yes");r.sources=[source("§ 5-73-103",URLS.firearmProhibited)];return r;
};

modules.harassment={
 title:"Harassment",
 required:[
  qSeg("purpose","Purpose to harass, annoy, or alarm another person WITHOUT GOOD CAUSE?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN"]],true),
  qSelect("conduct","Which listed conduct occurred?",[
   ["contact","Struck/shoved/kicked/offensive physical contact or attempt/threat"],["obscene","Public obscene language/gesture likely to provoke violent/disorderly response"],["follow","Followed person in/about public place"],["taunt","Public repeated insults/taunts/challenges likely to provoke response"],["annoy","Repeated/alarming or seriously annoying conduct serving no legitimate purpose"],["surveil","Surveillance outside school/work/vehicle/occupied place/residence solely to harass/alarm/annoy"]
  ],true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.harassment=v=>{
 if(v.purpose!=="yes")return insufficient("§ 5-71-208","Purpose to harass/annoy/alarm without good cause is not established.",[source("§ 5-71-208",URLS.harassment)]);
 let r=baseResult("Harassment","§ 5-71-208(a), (b)","Class A misdemeanor");
 r.elements=["Purpose to harass, annoy, or alarm without good cause","Listed conduct: "+v.conduct];
 r.reportFacts=["Specific act(s) and repetition","Public-place facts if applicable","Victim response","No-legitimate-purpose facts","Video/messages/witnesses"];
 r.arrest=arrestText(r.classification,v.presence);r.sources=[source("§ 5-71-208",URLS.harassment)];return r;
};

modules.doxxminor={
 title:"Unlawful Doxxing of Minor on Social Media",
 required:[
  qSeg("minor","Was the target a minor?",yesNoUnknown,true),
  qSeg("posted","Did suspect KNOWINGLY doxx/transmit/send/post a communication concerning the minor on a social-media platform?",yesNoUnknown,true),
  qSeg("purpose","Purpose to frighten, coerce, intimidate, threaten, abuse, or harass the minor?",yesNoUnknown,true),
  qSeg("fear","Did the communication cause the minor reasonable fear of PHYSICAL INJURY?",yesNoUnknown,true),
  qSelect("result","Result / monetary loss",[["none","No injury/death; loss under $500"],["loss500","$500–<10,000 loss"],["loss10k","$10,000–<1,000,000 loss"],["loss1m","$1,000,000+ loss"],["injury","Physical injury resulted"],["death","Death resulted"]],true),
  qSeg("presence","Conduct sufficiently established for current probable-cause analysis?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.doxxminor=v=>{
 if(["minor","posted","purpose","fear"].some(k=>v[k]!=="yes"))return insufficient("§ 5-27-610","One or more core elements are not established: minor + knowing social-media doxxing/communication + prohibited purpose + reasonable fear of physical injury.",[source("§ 5-27-610",URLS.doxxMinor)]);
 let cls="Class A misdemeanor",sub="§ 5-27-610(c)(2)";
 if(v.result==="loss500"){cls="Class D felony";sub="§ 5-27-610(c)(1)(C)"}
 if(v.result==="loss10k"||v.result==="injury"){cls="Class C felony";sub="§ 5-27-610(c)(1)(B)"}
 if(v.result==="loss1m"||v.result==="death"){cls="Class B felony";sub="§ 5-27-610(c)(1)(A)"}
 let r=baseResult("Unlawful Doxxing of Minor on Social Media Platform",sub,cls);
 r.elements=["Minor target","Knowing doxxing/transmission/post on social media","Purpose to frighten/coerce/intimidate/threaten/abuse/harass","Communication caused reasonable fear of physical injury"];
 r.reportFacts=["Preserve exact post/message/account","Private/identifying information posted","Target age","Threat/fear facts","Resulting injury/loss evidence"];
 r.arrest=arrestText(cls,v.presence);r.sources=[source("§ 5-27-610",URLS.doxxMinor)];return r;
};

modules.falsealarm={
 title:"Communicating a False Alarm",
 required:[
  qSeg("falseReport","Did the person PURPOSELY initiate/circulate a report of bombing, fire, offense, catastrophe, or emergency while knowing it was false/baseless?",yesNoUnknown,true),
  qSeg("response","Was it likely to cause emergency response OR fear of serious physical injury OR evacuation?",yesNoUnknown,true),
  qSelect("result","Result / special circumstance",[["ordinary","No injury/property damage; not school-bomb special"],["school","Bombing false alarm made to/about a school"],["property","Property damage resulted"],["injury","Physical injury resulted"]],true),
  qSeg("presence","Committed/established in officer's presence?",presenceOpts,true)
 ],enhancement:[qSeg("repeat","Prior conviction for otherwise-Class-A false alarm?",yesNoUnknown,false)],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.falsealarm=v=>{
 if(v.falseReport!=="yes"||v.response!=="yes")return insufficient("§ 5-71-210","Purposeful knowing false report + likely emergency response/fear/evacuation is not fully established.",[source("§ 5-71-210",URLS.falseAlarm)]);
 let cls="Class A misdemeanor",sub="§ 5-71-210(b)(3)";
 if(v.result==="injury"){cls="Class C felony";sub="§ 5-71-210(b)(1)"}
 else if(["school","property"].includes(v.result)||v.repeat==="yes"){cls="Class D felony";sub="§ 5-71-210(b)(2)"}
 let r=baseResult("Communicating a False Alarm",sub,cls);
 r.elements=["Purposefully initiated/circulated false or baseless emergency report","Knew report was false/baseless","Likely emergency response, serious-injury fear, or evacuation"];
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Exact false report","How transmitted","Knowledge it was false","Emergency response / evacuation / fear","Injury/property/school facts"];r.sources=[source("§ 5-71-210",URLS.falseAlarm)];return r;
};

modules.threatfire={
 title:"Threatening Fire or Bombing",
 required:[
  qSeg("purpose","Did the person PURPOSELY threaten injury or property damage by bombing, fire, or another means?",yesNoUnknown,true),
  qSeg("effect","Was the threat likely to place a person in reasonable apprehension of injury/property damage OR create public alarm?",yesNoUnknown,true),
  qSeg("injury","Did physical injury result?",yesNoUnknown,true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.threatfire=v=>{
 if(v.purpose!=="yes"||v.effect!=="yes")return insufficient("§ 5-71-211","Purposeful prohibited threat + reasonable-apprehension/public-alarm effect is not established.",[source("§ 5-71-211",URLS.threatFireBomb)]);
 let cls=v.injury==="yes"?"Class D felony":"Class A misdemeanor",sub=v.injury==="yes"?"§ 5-71-211(b)(2)":"§ 5-71-211(b)(1)";
 let r=baseResult("Threatening Fire or Bombing",sub,cls);
 r.elements=["Purposeful threat of injury/property damage by bombing, fire, or other means","Likely reasonable apprehension of injury/property damage or public alarm"];
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Exact threat","Method/medium","Recipient/public context","Why threat created apprehension/alarm","Any injury"];r.sources=[source("§ 5-71-211",URLS.threatFireBomb)];return r;
};

modules.emergencycomm={
 title:"Interference with Emergency Communication",
 required:[
  qChoice("type","What objectively happened?",[
   {v:"first",k:"KNOWINGLY + PURPOSE",tone:"purpose",t:"displaced/damaged/disabled a phone/device to defeat ability to request emergency assistance"},
   {v:"second",k:"RECKLESSLY",tone:"reckless",t:"prevented/interrupted/disrupted/impeded/interfered with an attempt to request emergency assistance"}
  ],true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true),
  qSeg("injury","Physical injury associated with incident?",yesNoUnknown,true)
 ],enhancement:[
  qSelect("timing","If off-presence: when did it occur?",[["now","Within preceding 4 hours"],["injury12","Within preceding 12 hours + physical injury"],["outside","Outside these windows"],["unknown","UNKNOWN"]],false,"§ 16-81-116 creates special off-presence arrest authority.")
 ],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.emergencycomm=v=>{
 let first=v.type==="first",cls=first?"Class A misdemeanor":"Class B misdemeanor",stat=first?"§ 5-60-124":"§ 5-60-125";
 let r=baseResult(first?"Interference with Emergency Communication — First Degree":"Interference with Emergency Communication — Second Degree",stat,cls);
 r.elements=[first?"Knowingly displaced/damaged/disabled communication device":"Recklessly prevented/interrupted/disrupted/impeded/interfered with emergency-assistance request/attempt",first?"Purpose to defeat ability to request emergency assistance":"Emergency-assistance attempt was impeded"];
 if(v.presence==="yes")r.arrest=arrestText(cls,"yes");
 else if(["now","injury12"].includes(v.timing))r.arrest={kind:"yes",text:"YES / special authority — § 16-81-116 permits warrantless arrest on probable cause for qualifying interference occurring within 4 hours, or within 12 hours when physical injury is involved."};
 else r.arrest={kind:"no",text:"Special § 16-81-116 window not established; apply ordinary misdemeanor arrest/process rules."};
 r.reportFacts=["What device/communication was involved","Exact interference act","Purpose/recklessness facts","Who was seeking emergency help and why","Timing and injury facts"];r.sources=[source(stat,first?URLS.emergency1:URLS.emergency2),source("§ 16-81-116 arrest authority",URLS.emergencyArrest)];return r;
};

modules.animalcruelty={
 title:"Cruelty to Animals",
 required:[
  qSelect("conduct","Which conduct occurred?",[
   ["mistreat","Knowingly subjected animal to cruel mistreatment"],["injureOther","Knowingly killed/injured animal owned by another without privilege/consent"],["abandon","Knowingly abandoned animal without continued care"],["foodwater","Knowingly failed to provide sufficient food and clean water"],["shelter","Knowingly failed to provide adequate shelter"],["transport","Knowingly transported/confined in cruel manner"],["torture","Knowingly tortured a dog, cat, or equine"]
  ],true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],enhancement:[qSelect("priors","Prior qualifying cruelty convictions within 5 years?",[["none","None / first offense"],["one","One prior"],["two","Two priors"],["three","Three or more priors"],["unknown","UNKNOWN"]],false)],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.animalcruelty=v=>{
 let agg=v.conduct==="torture",cls,stat,charge;
 if(agg){charge="Aggravated Cruelty to a Dog, Cat, or Equine";cls=v.priors&&v.priors!=="none"&&v.priors!=="unknown"?"Class C felony":"Class D felony";stat="§ 5-62-104";}
 else{charge="Cruelty to Animals";cls=v.priors==="three"?"Class D felony":"Unclassified misdemeanor";stat="§ 5-62-103";}
 let r=baseResult(charge,stat,cls);
 r.penalty=agg?null:"Check § 5-62-103 for offense-specific escalating misdemeanor penalties; fourth/subsequent within 5 years is Class D felony.";
 r.elements=[agg?"Knowingly tortured a dog, cat, or equine":"Knowingly committed listed cruelty/care/abandonment conduct"];
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Animal type/ownership","Exact condition/injury","Food/water/shelter facts if applicable","Veterinary/animal-control observations","Photos/video","Prior-history check"];r.sources=[source("§ 5-62-103",URLS.cruelty),source("§ 5-62-104",URLS.aggravatedCruelty)];return r;
};

modules.resistrefuse={
 title:"Resisting Arrest / Refusal to Submit",
 required:[
  qSelect("type","What did the person actually do?",[
   ["resist","Used or threatened physical force, or another means creating substantial risk of physical injury, while known officer was effecting arrest"],["refuse","Knowingly refused to submit to arrest (active or passive refusal) without force/risk required for resisting"]
  ],true),
  qSeg("knownOfficer","Did the person know a law-enforcement officer was effecting an arrest?",yesNoUnknown,true),
  qSeg("presence","Observed by officer?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.resistrefuse=v=>{
 if(v.knownOfficer!=="yes")return insufficient("§ 5-54-103","Knowledge that a law-enforcement officer was effecting an arrest is not established.",[source("§ 5-54-103",URLS.resistRefuse)]);
 let resist=v.type==="resist",cls=resist?"Class A misdemeanor":"Class B misdemeanor",sub=resist?"§ 5-54-103(a)":"§ 5-54-103(b)";
 let r=baseResult(resist?"Resisting Arrest":"Refusal to Submit to Arrest",sub,cls);
 r.elements=[resist?"Knowingly resisted known officer by force/threat/risk-creating means":"Knowingly refused to submit to arrest; active or passive refusal qualifies"];
 r.arrest=arrestText(cls,"yes");r.reportFacts=["Underlying arrest","Officer identification/commands","Exact resistance/refusal","Force/threat/risk facts","BWC/witnesses"];r.sources=[source("§ 5-54-103",URLS.resistRefuse)];return r;
};

modules.interferenceOfficer={
 title:"Interference with Law Enforcement / Code Enforcement Officer",
 required:[
  qSeg("knowing","Did the person KNOWINGLY employ or threaten physical force?",yesNoUnknown,true),
  qSelect("official","Against whom?",[["leo","Law-enforcement officer performing official duties"],["code","Code-enforcement officer performing official duties (includes animal control)"]],true),
  qSeg("deadly","Deadly physical force used/threatened?",yesNoUnknown,true),
  qSeg("assisted","Assisted by one or more other persons AND officer injury resulted?",yesNoUnknown,true),
  qSeg("presence","Observed by officer?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.interferenceOfficer=v=>{
 if(v.knowing!=="yes")return insufficient("§ 5-54-104","Knowing employment/threat of physical force is not established.",[source("§ 5-54-104",URLS.interferenceOfficer)]);
 let fel=v.deadly==="yes"||v.assisted==="yes",cls=fel?"Class C felony":"Class A misdemeanor",sub=fel?"§ 5-54-104(b)(1)":"§ 5-54-104(b)(2)";
 let r=baseResult("Interference with a Law Enforcement Officer / Code Enforcement Officer",sub,cls);
 r.elements=["Knowing physical force or threat against officer performing official duties",fel?"Deadly-force or assisted+injury felony factor established":"No felony factor established"];
 r.arrest=arrestText(cls,"yes");r.reportFacts=["Officer role and duty being performed","Exact force/threat","Deadly-force facts","Other participants / officer injury"];r.sources=[source("§ 5-54-104",URLS.interferenceOfficer)];return r;
};

modules.hindering={
 title:"Hindering Apprehension or Prosecution",
 required:[
  qSeg("purpose","Purpose to hinder apprehension, prosecution, conviction, or punishment of ANOTHER person?",yesNoUnknown,true),
  qSelect("act","What assistance was provided?",[
   ["harbor","Harbored/concealed person"],["means","Provided weapon, money, transportation, disguise, or escape/avoidance means"],["obstruct","Used force/intimidation/deception to obstruct discovery/apprehension/identification"],["evidence","Concealed/altered/destroyed/suppressed crime-related fact/information/thing"],["warn","Warned person of impending discovery/apprehension/identification"],["false","Volunteered false information to law enforcement"],["lie","Purposely provided/attempted false information/documents/instrumentalities to distract/inhibit investigation"]
  ],true),
  qSelect("assistedLevel","Level of offense committed by person being assisted",[["YA","Class Y or A felony"],["B","Class B felony"],["C","Class C felony"],["D","Class D or unclassified felony"],["Am","Class A misdemeanor"],["Bm","Class B misdemeanor"],["Cm","Class C misdemeanor"],["unknown","UNKNOWN"]],true),
  qSeg("closeFamily","Is defendant parent/child/sibling/spouse of person assisted?",yesNoUnknown,true,"Limited reduction can apply in Class Y/A underlying-offense cases, with listed serious-offense exceptions."),
  qSeg("presence","Observed/established by officer?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.hindering=v=>{
 if(v.purpose!=="yes"||v.assistedLevel==="unknown")return insufficient("§ 5-54-105","Purpose to hinder or the assisted person's offense level is unresolved.",[source("§ 5-54-105",URLS.hindering)]);
 let cls="Class C misdemeanor";
 if(v.assistedLevel==="YA")cls=v.closeFamily==="yes"?"Class D felony":"Class B felony";
 else if(v.assistedLevel==="B")cls="Class C felony";
 else if(v.assistedLevel==="C")cls="Class D felony";
 else if(v.assistedLevel==="D")cls="Class A misdemeanor";
 else if(v.assistedLevel==="Am")cls="Class B misdemeanor";
 else if(v.assistedLevel==="Bm")cls="Class C misdemeanor";
 else if(v.assistedLevel==="Cm"){let r=baseResult("Hindering Apprehension or Prosecution","§ 5-54-105(d)(3)","Misdemeanor one degree below underlying");r.penalty="Verify exact misdemeanor classification under § 5-54-105(d)(3).";r.elements=["Purpose to hinder another","Listed assistance act"];r.arrest={kind:"maybe",text:"Apply ordinary misdemeanor arrest rules after the exact class is verified."};r.sources=[source("§ 5-54-105",URLS.hindering)];return r}
 let r=baseResult("Hindering Apprehension or Prosecution","§ 5-54-105",cls);
 r.elements=["Purpose to hinder another person's apprehension/prosecution/conviction/punishment","Listed assistance: "+v.act,"Classification driven by offense of person assisted"];
 if(v.assistedLevel==="YA"&&v.closeFamily==="yes")r.confirm.push("Family reduction has statutory exceptions for capital murder, first-degree murder, kidnapping, rape, and capital rape — verify the underlying offense before finalizing.");
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Person assisted","Underlying offense and class","Exact assistance","Purpose to hinder","Relationship if reduction claimed"];r.sources=[source("§ 5-54-105 (2025)",URLS.hindering)];return r;
};

modules.fleeing={
 title:"Fleeing",
 required:[
  qSeg("knownAttempt","Did person KNOW immediate arrest or detention was being attempted by a duly authorized LEO?",yesNoUnknown,true),
  qSelect("method","How did person flee?",[["foot","On foot"],["vehicle","By vehicle/conveyance"]],true),
  qSeg("property","Property damage directly resulted?",yesNoUnknown,true,v=>v.method==="foot"),
  qSeg("serious","Serious physical injury directly resulted?",yesNoUnknown,true),
  qSeg("speed","Vehicle operated in excess of posted speed limit?",yesNoUnknown,true,"2025 law makes this vehicle-fleeing path a Class D felony.",v=>v.method==="vehicle"),
  qSeg("extreme","Vehicle purposely operated with extreme indifference creating substantial danger of death/SPI to another?",yesNoUnknown,true,v=>v.method==="vehicle"),
  qSeg("movingExit","Exited moving vehicle/conveyance and continued fleeing on foot during the offense?",yesNoUnknown,true,v=>v.method==="vehicle"),
  qSeg("presence","Observed by officer?",presenceOpts,true)
 ],enhancement:[qSeg("footPrior","Prior fleeing-on-foot conviction within past 1 year?",yesNoUnknown,false,v=>v.method==="foot")],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.fleeing=v=>{
 if(v.knownAttempt!=="yes")return insufficient("§ 5-54-125(a)","Knowledge of immediate arrest/detention attempt is not established.",[source("§ 5-54-125",URLS.fleeing)]);
 let cls,sub;
 if(v.method==="foot"){
  if(v.serious==="yes"){cls="Class D felony";sub="§ 5-54-125(c)(3)"}
  else if(v.property==="yes"){cls="Class A misdemeanor";sub="§ 5-54-125(c)(2)"}
  else if(v.footPrior==="yes"){cls="Class B misdemeanor";sub="§ 5-54-125(c)(1)"}
  else{cls="Class C misdemeanor";sub="§ 5-54-125(c)"}
 }else{
  if(v.serious==="yes"){cls=v.movingExit==="yes"?"Class A felony":"Class B felony";sub=v.movingExit==="yes"?"§ 5-54-125(d)(5)(C)":"§ 5-54-125(d)(4)"}
  else if(v.extreme==="yes"){cls=v.movingExit==="yes"?"Class B felony":"Class C felony";sub=v.movingExit==="yes"?"§ 5-54-125(d)(5)(B)":"§ 5-54-125(d)(3)"}
  else if(v.speed==="yes"){cls=v.movingExit==="yes"?"Class C felony":"Class D felony";sub=v.movingExit==="yes"?"§ 5-54-125(d)(5)(A)":"§ 5-54-125(d)(2)"}
  else{cls="Class A misdemeanor";sub="§ 5-54-125(d)(1)"}
 }
 let r=baseResult("Fleeing",sub,cls);
 r.elements=["Knew immediate arrest/detention was being attempted","Fled "+(v.method==="foot"?"on foot":"by vehicle/conveyance")];
 if(v.method==="vehicle")r.enhancements.push("Vehicle-fleeing conviction also carries driver-license suspension/revocation of at least 6 months and not more than 1 year under § 5-54-125(e).");
 r.arrest=arrestText(cls,"yes");r.reportFacts=["Officer authority/attempted detention or arrest","Commands/signals","Subject awareness","Exact route/method","Speed/danger/injury/property facts","Moving-exit facts"];r.sources=[source("§ 5-54-125 (2025)",URLS.fleeing)];return r;
};

modules.fraudcard={
 title:"Fraudulent Use of Credit / Debit Card",
 required:[
  qSeg("purpose","Purpose to defraud?",yesNoUnknown,true),
  qSeg("use","Used a credit/debit card or account number to obtain property/service?",yesNoUnknown,true),
  qSelect("knowledge","What did person know about authorization?",[["stolen","Card/account stolen"],["revoked","Revoked/cancelled"],["forged","Forged"],["unauthorized","Use otherwise unauthorized"],["unknown","UNKNOWN"]],true),
  qNum("value","Total value obtained during any six-month period ($)",true,"§ 5-37-207 aggregates value during any six-month period."),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],enhancement:[],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.fraudcard=v=>{
 if(v.purpose!=="yes"||v.use!=="yes"||v.knowledge==="unknown")return insufficient("§ 5-37-207","Purpose to defraud + card/account use + knowledge of unauthorized status is not fully established.",[source("§ 5-37-207",URLS.fraudCard)]);
 let n=Number(v.value),cls,sub;
 if(n>=25000){cls="Class B felony";sub="§ 5-37-207(b)(1)"}
 else if(n>5000){cls="Class C felony";sub="§ 5-37-207(b)(2)"}
 else if(n>1000){cls="Class D felony";sub="§ 5-37-207(b)(3)"}
 else{cls="Class A misdemeanor";sub="§ 5-37-207(b)(4)"}
 let r=baseResult("Fraudulent Use of Credit or Debit Card",sub,cls);
 r.elements=["Purpose to defraud","Used credit/debit card or account number to obtain property/service","Knew card/account was stolen/revoked/cancelled/forged/otherwise unauthorized",`Six-month aggregate value: $${n.toFixed(2)}`];
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Card/account owner","Authorization status","Transactions","Six-month aggregate","Receipts/video/device/IP/account records","Suspect knowledge"];r.sources=[source("§ 5-37-207",URLS.fraudCard)];return r;
};

modules.marijuana={
 title:"Possession of Marijuana",
 required:[
  qSeg("possess","Possession/control nexus established?",yesNoUnknown,true),
  qNum("ounces","Total marijuana weight (ounces)",true,"Use a supported actual weight. 16 oz = 1 lb."),
  qSeg("lawful","Medical-marijuana or other lawful-possession authorization may apply?",yesNoUnknown,true,"Verify registry status, amount, location, and product before charging."),
  qSeg("presence","Possession established in officer's presence?",presenceOpts,true)
 ],enhancement:[qSeg("priors4","If under 4 oz: four prior qualifying controlled-substance convictions?",yesNoUnknown,false)],report:[...contextQuestions,...evidenceQuestions]
};
evaluators.marijuana=v=>{
 if(v.possess!=="yes")return insufficient("§ 5-64-419","Possession/control nexus is not established.",[source("§ 5-64-419",URLS.marijuana)]);
 if(v.lawful==="yes"||v.lawful==="unknown")return insufficient("§ 5-64-419","Possible lawful medical/other authorization must be verified before criminal-possession classification.",[source("§ 5-64-419",URLS.marijuana)]);
 let oz=Number(v.ounces),lb=oz/16,cls,sub;
 if(oz<4){if(oz>=1&&v.priors4==="yes"){cls="Class D felony";sub="§ 5-64-419(b)(5)(B)"}else{cls="Class A misdemeanor";sub="§ 5-64-419(b)(5)(A)"}}
 else if(lb<10){cls="Class D felony";sub="§ 5-64-419(b)(5)(C)"}
 else if(lb<25){cls="Class C felony";sub="§ 5-64-419(b)(5)(D)"}
 else if(lb<100){cls="Class B felony";sub="§ 5-64-419(b)(5)(E)"}
 else if(lb<500){cls="Class A felony";sub="§ 5-64-419(b)(5)(F)"}
 else return insufficient("§ 5-64-419","Weight is 500 lb or more; use trafficking/manufacturing statutes rather than this simple possession path.",[source("§ 5-64-419",URLS.marijuana)]);
 let r=baseResult("Possession of a Schedule VI Controlled Substance — Marijuana",sub,cls);
 r.elements=["Possession/control nexus",`Weight: ${oz} oz (${lb.toFixed(2)} lb)`,"No lawful-possession authorization established"];
 r.arrest=arrestText(cls,v.presence);r.reportFacts=["Actual/constructive possession facts","Weight and scale","Packaging","Medical card/authorization check","Photos","Statements"];r.sources=[source("§ 5-64-419",URLS.marijuana)];return r;
};

/* -------------------- MODULE KEY TERMS / STATUTE LINKS -------------------- */
Object.assign(moduleDefinitions,{
 terroristic:[{term:"Purpose to terrorize",text:"The threat is made with the conscious objective of causing terror—not merely anger or rude speech.",cite:"§ 5-13-301",url:URLS.terrorThreat},{term:"Serious physical injury",text:"Life-threatening or long-lasting serious injury.",cite:"§ 5-1-102(21)",url:URLS.defs}],
 firearmProhibited:[{term:"Possess",text:"Actual or constructive control over the firearm must be established.",cite:"§ 5-73-103",url:URLS.firearmProhibited}],
 harassment:[{term:"Without good cause",text:"The listed conduct must not have a legitimate reason that defeats the harassment theory.",cite:"§ 5-71-208",url:URLS.harassment}],
 doxxminor:[{term:"Doxxes",text:"Publishes private or identifying information about a person on social media with malicious purpose.",cite:"§ 5-27-610(a)(2)",url:URLS.doxxMinor}],
 falsealarm:[{term:"False / baseless report",text:"The person knows the reported emergency/event is not real.",cite:"§ 5-71-210",url:URLS.falseAlarm}],
 threatfire:[{term:"Reasonable apprehension",text:"The threat is likely to make a reasonable person fear injury or property damage.",cite:"§ 5-71-211",url:URLS.threatFireBomb}],
 emergencycomm:[{term:"Emergency assistance",text:"A request or attempted request for emergency help. Focus on the actual attempt and how it was defeated or impeded.",cite:"§§ 5-60-124—125",url:URLS.emergency1}],
 animalcruelty:[{term:"Torture",text:"Use the offense-specific statutory definition for aggravated cruelty; do not equate every neglect case with torture.",cite:"§ 5-62-104",url:URLS.aggravatedCruelty}],
 resistrefuse:[{term:"Resists",text:"Force, threat of force, or another means creating a substantial risk of physical injury.",cite:"§ 5-54-103(a)",url:URLS.resistRefuse},{term:"Refuses",text:"Active or passive refusal to submit; force is not required.",cite:"§ 5-54-103(b)",url:URLS.resistRefuse}],
 interferenceOfficer:[{term:"Code enforcement officer",text:"Includes qualifying code-enforcement roles; Arkansas's statute includes animal-control personnel in the definition.",cite:"§ 5-54-104",url:URLS.interferenceOfficer}],
 hindering:[{term:"Purpose to hinder another",text:"The help is given with the conscious objective of helping another person avoid apprehension, prosecution, conviction, or punishment.",cite:"§ 5-54-105",url:URLS.hindering}],
 fleeing:[{term:"Immediate arrest or detention",text:"The person must know a duly authorized officer is attempting an immediate arrest or detention.",cite:"§ 5-54-125(a)",url:URLS.fleeing}],
 fraudcard:[{term:"Purpose to defraud",text:"Conscious objective to obtain property/service through unauthorized or fraudulent card/account use.",cite:"§ 5-37-207",url:URLS.fraudCard}],
 marijuana:[{term:"Possession / control",text:"Document actual possession or facts showing dominion/control over the marijuana.",cite:"§ 5-64-419",url:URLS.marijuana}]
});
const v30StatuteLinks=statuteLinks;
statuteLinks=function(){
 const extra={
  terroristic:[{label:"§ 5-13-301 — Terroristic Threatening",url:URLS.terrorThreat}],
  firearmProhibited:[{label:"§ 5-73-103 — Firearm by Certain Persons",url:URLS.firearmProhibited}],
  harassment:[{label:"§ 5-71-208 — Harassment",url:URLS.harassment}],
  doxxminor:[{label:"§ 5-27-610 — Doxxing of Minor",url:URLS.doxxMinor}],
  falsealarm:[{label:"§ 5-71-210 — False Alarm",url:URLS.falseAlarm}],
  threatfire:[{label:"§ 5-71-211 — Threatening Fire/Bombing",url:URLS.threatFireBomb}],
  emergencycomm:[{label:"§ 5-60-124 — 1st Degree",url:URLS.emergency1},{label:"§ 5-60-125 — 2nd Degree",url:URLS.emergency2},{label:"§ 16-81-116 — Arrest Authority",url:URLS.emergencyArrest}],
  animalcruelty:[{label:"§ 5-62-103 — Cruelty",url:URLS.cruelty},{label:"§ 5-62-104 — Aggravated Cruelty",url:URLS.aggravatedCruelty}],
  resistrefuse:[{label:"§ 5-54-103 — Resisting / Refusal",url:URLS.resistRefuse}],
  interferenceOfficer:[{label:"§ 5-54-104 — Interference with Officer",url:URLS.interferenceOfficer}],
  hindering:[{label:"§ 5-54-105 — Hindering",url:URLS.hindering}],
  fleeing:[{label:"§ 5-54-125 — Fleeing",url:URLS.fleeing}],
  fraudcard:[{label:"§ 5-37-207 — Fraudulent Card Use",url:URLS.fraudCard}],
  marijuana:[{label:"§ 5-64-419 — Possession",url:URLS.marijuana}]
 };
 return extra[currentModule]||v30StatuteLinks();
};

/* -------------------- STANDALONE QUICK REFERENCES -------------------- */
const quickRefs={
 firearmPlaces:{title:"Firearms — Prohibited Places",one:"Do not assume 'gun + public place = crime.' Identify the PERSON, PLACE, LICENSE/ENDORSEMENT, posted restrictions, and any specific statutory exception.",sections:[
  ["First check","Is it a publicly owned building/facility, State Capitol/Justice Building, school/court/correctional facility, municipally owned park, private posted place, or another listed location?"],
  ["Municipal park nuance","§ 5-73-122 generally does not define a municipal park itself as a prohibited 'facility.' A licensed concealed-handgun carrier may have specific park authority, but sports fields during events, municipal buildings, and leased special-event areas are exceptions."],
  ["Enhanced endorsement","An enhanced concealed-carry endorsement can change the rule for several locations. Verify actual license/endorsement before enforcement."],
  ["Patrol limit","Use the exact place-specific statute. Do not create a generic 'prohibited place' charge without identifying the subsection and exception status."]
 ],sources:[["§ 5-73-122 — Public buildings/facilities",URLS.firearmPublic],["§ 5-73-306 — Concealed-carry prohibited places",URLS.firearmPlaces]]},
 concealedCarry:{title:"Concealed Carry Overview",one:"Arkansas carry law is exception-heavy. Seeing a concealed handgun is not enough by itself to assume criminal conduct.",sections:[
  ["What to check","Person's prohibited status • exact location • license/enhanced endorsement if relevant • posted/private-property notice • threatening/unlawful conduct • other crime involvement."],
  ["Carry vs prohibited person","A person prohibited under § 5-73-103 is a different analysis from where a lawful possessor may carry."],
  ["Officer approach","Separate officer-safety actions from the elements of a weapons offense. Document the specific facts that create reasonable suspicion or probable cause."],
  ["Quick example","A licensed carrier walking in a municipal park is not automatically violating § 5-73-122; a municipal building or sports field during an event may change the analysis."]
 ],sources:[["§ 5-73-103",URLS.firearmProhibited],["§ 5-73-120",URLS.carryingWeapon],["§ 5-73-122",URLS.firearmPublic],["§ 5-73-306",URLS.firearmPlaces]]},
 delinquentJuvenile:{title:"Delinquent Juvenile — Patrol Overview",one:"A 'delinquent juvenile' is generally a juvenile age 10 or older who commits an act that would be an adult felony, misdemeanor, or violation, excluding specified traffic/game-fish matters.",sections:[
  ["Do not adult-charge by reflex","First determine age and whether the conduct falls under juvenile jurisdiction. Use the substantive offense elements, then apply juvenile custody/procedure."],
  ["Custody is not punishment","§ 9-27-313 governs taking a juvenile into custody and parent/guardian notification. Follow agency and juvenile-intake procedure."],
  ["Document","DOB/age • exact offense facts • parent/guardian • safety/medical needs • school/home information if relevant • intake/disposition instructions."],
  ["Traffic note","The delinquent-juvenile definition excludes ordinary traffic offenses from that definition."]
 ],sources:[["§ 9-27-303 — Definitions",URLS.juvenileDefs],["§ 9-27-313 — Custody",URLS.juvenileCustody]]},
 runaway:{title:"Runaway / Family in Need of Services",one:"Running away is primarily a juvenile status/FINS issue—not an adult-style criminal charge.",sections:[
  ["FINS definition","Arkansas's juvenile code includes a juvenile absent from home without sufficient cause, permission, or justification within Family in Need of Services criteria."],
  ["Field priorities","Confirm identity/age • missing/runaway status • immediate danger/exploitation • medical needs • parent/guardian • safe custody/disposition."],
  ["Do not invent a charge","If the juvenile committed a separate offense, analyze that offense separately. 'Runaway' itself should not be treated as a substitute criminal charge."],
  ["Documentation","Where found • who reported missing • circumstances of leaving • threats/exploitation • parent contact • juvenile intake or custody disposition."]
 ],sources:[["§ 9-27-303 — Juvenile/FINS definitions",URLS.juvenileDefs],["§ 9-27-313 — Custody",URLS.juvenileCustody]]},
 rapeAge:{title:"Rape / Age & Consent Guide",one:"Arkansas does NOT reduce every sexual case to one 'age of consent' number. Actor age, victim age, type of sexual conduct, force/capacity, and family/custody relationship all matter.",sections:[
  ["Rape — major paths","Sexual intercourse/deviate sexual activity by forcible compulsion; with a person incapable of consent because physically helpless/mentally defective/mentally incapacitated; with a victim under 14 (subject to the statute's narrow age-difference defense); or listed minor/family-guardian circumstances."],
  ["Under 14","For the under-14 rape pathway, consent is not a defense. The statute contains a narrow affirmative defense based on the actor not being more than three years older."],
  ["Age 14–15","Do not assume legality. Sexual Assault statutes can apply depending on actor age, sexual contact vs intercourse/deviate activity, custody/trust/authority, and school/employment relationship."],
  ["Patrol approach","Identify exact sexual act • victim age • actor age • consent/force/capacity • relationship/position of trust • dates • statements • digital/medical evidence. Then select the exact statute."]
 ],sources:[["§ 5-14-103 — Rape",URLS.rape],["§ 5-14-124 — Sexual Assault 1st",URLS.sexAssault1],["§ 5-14-125 — Sexual Assault 2nd",URLS.sexAssault2],["§ 5-14-126 — Sexual Assault 3rd",URLS.sexAssault3],["§ 5-14-127 — Sexual Assault 4th",URLS.sexAssault4]]},
 sexualAssault:{title:"Sexual Assault 1st–4th — Quick Guide",one:"Start with the act, ages, force/capacity, and relationship/authority. The degree cannot be chosen accurately from age alone.",sections:[
  ["1st Degree","Intercourse/deviate sexual activity with a minor plus specified custody/trust/authority or school-related status. Class A felony."],
  ["2nd Degree","Includes sexual contact by forcible compulsion, certain incapable-of-consent cases, adult 18+ sexual contact with victim under 14, and listed trust/custody/school relationships. Degree/class depends on exact subsection."],
  ["3rd Degree","Intercourse/deviate activity in specified trust/authority relationships or specified minor-age pathway. Class C felony."],
  ["4th Degree","Common age-sensitive pathway: actor 20+ with victim under 16; intercourse/deviate activity is Class D felony, sexual contact is Class A misdemeanor. Other custodial paths also exist."]
 ],sources:[["§ 5-14-124",URLS.sexAssault1],["§ 5-14-125",URLS.sexAssault2],["§ 5-14-126",URLS.sexAssault3],["§ 5-14-127",URLS.sexAssault4]]},
 indecentExposure:{title:"Indecent Exposure",one:"Exposure alone is not enough. The statute requires the specified sexual purpose and either public/public-view exposure or knowing likely affront/alarm.",sections:[
  ["Core element","Purpose to arouse or gratify sexual desire while exposing sex organs in a public place/public view, or under circumstances where the actor knows the conduct is likely to affront or alarm."],
  ["Classification","Generally Class A misdemeanor; repeat/custody circumstances can elevate to felony levels."],
  ["Exception","Breastfeeding is expressly excepted."],
  ["Document","Exact body area exposed • location/public view • statements/behavior showing sexual purpose • who observed • repeat-history/custody facts."]
 ],sources:[["§ 5-14-112 — Indecent Exposure",URLS.indecentExposure]]},
 humanTrafficking:{title:"Human Trafficking — Patrol Overview",one:"This is a high-complexity felony. Preserve safety/evidence and use the full statute rather than forcing a simplistic charge from one fact.",sections:[
  ["Common conduct","Recruiting, enticing, harboring, transporting, providing, obtaining, advertising, maintaining, patronizing, or soliciting a person for prohibited commercial sexual activity/forced labor; current law also has minor-specific coercion paths."],
  ["Minor victim","Arkansas law provides more severe classification when the trafficking victim is a minor; ignorance of age is not a defense for specified minor pathways."],
  ["Immediate patrol priorities","Separate victim from controller • medical/safety needs • interpreter • preserve phones/messages/ads/payment/travel records • identify other victims/locations • avoid treating victim behavior as proof against victim status."],
  ["Charge caution","Use § 5-18-103 and current 2025 amendments with investigator/prosecutor support for final subsection selection."]
 ],sources:[["§ 5-18-103 — Human Trafficking",URLS.trafficking]]},
 stalking:{title:"Stalking — Quick Guide",one:"Stalking requires a course of conduct—not merely one unwanted contact. Degree depends on fear/emotional-distress facts and aggravating circumstances such as protective orders or prior offenses.",sections:[
  ["Course of conduct","Two or more acts separated by at least 36 hours, within one year, unless the current statute provides otherwise for the specific path; constitutionally protected activity is excluded."],
  ["Victim impact","Current statute uses reasonable-person emotional distress / fear concepts and incorporates harassment definitions."],
  ["Degree factors","Protection/no-contact orders, prior stalking/threatening history, weapons, victim characteristics, and other factors can change degree."],
  ["Field approach","Build timeline: dates/times • contacts/following/surveillance • victim fear/distress • threats • orders • prior cases • screenshots/video/witnesses. Then use full statute."]
 ],sources:[["§ 5-71-229 — Stalking",URLS.stalking],["§ 5-71-208 — Harassment",URLS.harassment]]},
 trailers:{title:"Trailers — Patrol Quick Reference",one:"For trailers, check plate/registration, towing connection, lights/reflectors, load/visibility, and whether the specific weight/width rule applies.",sections:[
  ["Registration","Arkansas has permanent trailer licensing provisions for covered trailers. Verify whether this trailer is subject to the permanent-plate subchapter before citing."],
  ["Tow connection","Tow connection must be strong enough; generally no more than 15 ft, with an additional safety connection. A chain/rope/cable connection has a white-flag requirement. § 27-35-111."],
  ["Rear lighting","Trailer/semitrailer/pole trailer requires at least one red tail lamp visible 500 ft when lighting is required. § 27-36-215."],
  ["Weight-specific equipment",">3,000 lb trailers have additional clearance/side-marker/reflector/stop-light requirements; ≤3,000 lb have rear reflectors and a stop-light rule if towing vehicle's stop light is obscured. § 27-36-218."]
 ],sources:[["§ 27-35-111 — Towing",URLS.trailerTow],["§ 27-36-215 — Tail lamps",URLS.trailerTail],["§ 27-36-218 — Trailer lamps/reflectors",URLS.trailerExtra],["§ 27-14-1211 — Permanent plate",URLS.trailerPlate]]},
 controlledTable:{title:"Controlled Substance Classifications — Patrol Table",one:"Identify the substance first, then schedule, then exact weight. Never estimate felony level from appearance alone.",sections:[
  ["Schedule / substance","Use current Arkansas controlled-substance schedules and § 5-64-419. Fentanyl, methamphetamine, cocaine, heroin, and marijuana have offense-specific weight ranges."],
  ["Marijuana / Schedule VI","<4 oz generally Class A misdemeanor; larger weights move through felony levels. Four qualifying priors can change the 1–<4 oz pathway."],
  ["Evidence","Actual weight • packaging • lab/field-test policy • possession nexus • lawful prescription/medical-marijuana status • statements • photos."],
  ["Do not collapse charges","Possession, possession with purpose, delivery, manufacturing, and trafficking have different elements and thresholds."]
 ],sources:[["§ 5-64-419 — Possession",URLS.marijuana],["Arkansas Controlled Substances chapter", "https://law.justia.com/codes/arkansas/title-5/subtitle-6/chapter-64/"]]},
 medicalMarijuana:{title:"Medical Marijuana — What to Look For",one:"A marijuana odor/product does not end the analysis. Verify whether the person/product/location/quantity is protected by Arkansas medical-marijuana law.",sections:[
  ["Verify","Registry identification status • identity • product • usable amount • where possessed/used • vehicle facts • whether conduct is actually protected."],
  ["Do not assume","A medical card does not authorize every marijuana-related act, and lack of a physical card should be handled according to current verification capability/policy."],
  ["Patrol evidence","Photograph packaging/labels • document quantity • card/database status • location • admissions • impaired-driving facts separately."],
  ["Separate issues","Medical authorization is separate from DWI, unlawful transfer/sale, prohibited location, and possession exceeding authorized limits."]
 ],sources:[["Arkansas Medical Marijuana Amendment / rules portal","https://healthy.arkansas.gov/programs-services/topics/medical-marijuana/"],["§ 5-64-419 — Criminal possession",URLS.marijuana]]},
 protectionOrder:{title:"Protection / No-Contact Order Check",one:"Do not stop at 'there is an order.' Verify the order type, validity, notice, exact condition, and exact conduct.",sections:[
  ["Protection order § 5-53-134","Qualifying Arkansas/out-of-state/military protection order + legally sufficient notice + knowing violation of an actual condition."],
  ["Arrest authority","§ 5-53-134 expressly permits warrantless arrest on probable cause for a qualifying protection-order violation even when off-presence."],
  ["No-contact order","A criminal-court no-contact/release order is not automatically the same as a Domestic Abuse Act order of protection. Use the issuing order/rule/statute."],
  ["Property ban","A private-property ban/revoked permission may support Criminal Trespass if purposeful unlawful entry/remain is established."]
 ],sources:[["§ 5-53-134 — Order of Protection",URLS.orderProtection],["§ 5-39-203 — Criminal Trespass",URLS.trespass]]},
 dvAdultResponse:{title:"Domestic Violence — First Response Checklist",one:"A chronological field checklist: make it safe, separate people, identify the offense/predominant aggressor, document risk/injury, then complete victim resources and disposition.",sections:[
  ["1 — Arrival / safety","Separate involved parties • locate weapons • identify injuries/medical needs • identify children/witnesses • BWC/scene preservation."],
  ["2 — Independent accounts","Interview separately • exact acts/sequence • threats/weapons/choking • self-defense • prior incidents • order/no-contact status • 911 interference."],
  ["3 — Predominant aggressor","If both used force, do not default to mutual arrest. Compare injuries, threats, history, defensive conduct, escalation, and imminent threat."],
  ["4 — Evidence","Photos • visible/hidden injury • strangulation symptoms • damaged property/devices • 911/audio • neighbor/business cameras • statements • weapons."],
  ["5 — Risk / resources","Complete lethality assessment when required • provide Laura’s Card/resources • explain protective-order resources • safe destination/children/pets considerations."],
  ["6 — Disposition / report","Charge each proven offense separately • document arrest authority/time window • exact relationship • predominant-aggressor basis • order checks • victim resources given."]
 ],sources:[["§ 16-81-113 — Domestic-abuse arrest authority","https://law.justia.com/codes/arkansas/title-16/subtitle-6/chapter-81/subchapter-1/section-16-81-113/"],["Domestic Battering / Assault chapter","https://law.justia.com/codes/arkansas/title-5/subtitle-3/chapter-26/subchapter-3/"]]},
 dvChildResponse:{title:"Domestic Issues — Children Present / Involved",one:"Treat the child's immediate safety and independent legal status as a separate track from the adult domestic charge.",sections:[
  ["Immediate safety","Identify every child • age • location during incident • injuries/medical needs • safe caregiver • exposure to weapons/violence/substances."],
  ["Statements / witnesses","Use age-appropriate non-leading questions consistent with policy; document spontaneous statements and what the child could actually see/hear."],
  ["Charge/enhancement review","Check child-present enhancements or offenses, endangering-welfare statutes, custody/order issues, and mandatory-report requirements when facts support them."],
  ["Victim resources","Document child safety plan, caregiver disposition, referral/notification, and whether Laura’s Card/lethality resources were provided to adult victim."]
 ],sources:[["Arkansas offenses involving children","https://law.justia.com/codes/arkansas/title-5/subtitle-3/chapter-27/"],["Domestic Battering / Assault chapter","https://law.justia.com/codes/arkansas/title-5/subtitle-3/chapter-26/subchapter-3/"]]},
 parkDetention:{title:"City Park — Investigative-Detention Leads",one:"A park ordinance can supply a lawful enforcement lead only when you can articulate the actual conduct and the exact ordinance—not simply that the person 'looks suspicious.'",sections:[
  ["After hours","Confirm exact park, time, § 18-68 curfew applicability, and authorization/exceptions. A verified ordinance violation can support enforcement; a Terry detention still requires facts appropriate to the seizure."],
  ["Motorized device on trail","§ 18-63 can apply to motorized vehicles/cycles/scooters in park/trail areas off paved public traffic ways, subject to exceptions."],
  ["Camping / sleeping / fires","Use §§ 18-64—65 and verify designated-area/picnic-stove exceptions."],
  ["Property damage / litter / solicitation","Use the exact Chapter 18 section; separately evaluate state Criminal Mischief/Theft/Trespass when those elements exist."],
  ["Officer articulation","What you saw • where • time • ordinance element • exception checked • person's response • why further detention was justified."]
 ],sources:[["Fort Smith Municipal Code — Chapter 18",URLS.fsParks],["Terry v. Ohio",URLS.terry]]},
 cityOrdinances:{title:"Common Patrol City Ordinances",one:"Use the ordinance as a specific field tool, not a generic substitute for state law.",sections:[
  ["§ 25-298","Removal of garbage/recyclables/trash/solid waste from garbage can or commercial container after placement, subject to sanitation-department authorization."],
  ["§ 24-176","Bicycle/pushcart on central-business-district sidewalk, with police exception."],
  ["§ 18-63","Motorized vehicles/cycles/scooters in park/trail areas other than paved public traffic ways, subject to listed exceptions."],
  ["§ 18-65 / § 18-68","Camping/sleeping and park curfew rules—verify designated areas, times, authorization, fishing/boat-ramp exceptions."],
  ["§ 24-178","Motorcycle/bicycle passenger on handlebar/frame/tank."],
  ["Always verify","Open current Municode text before final enforcement if the ordinance has changed or an exception is disputed."]
 ],sources:[["Fort Smith Municipal Code",URLS.fortSmithCode]]},
 encounters:{title:"Types of Police Encounters",one:"Ask one question first: is the person free to leave / decline? That separates a consensual encounter from a seizure.",sections:[
  ["Consensual encounter","No reasonable suspicion required. Person may decline questions and leave. Avoid commands, blocking movement, or other conduct that would convert it into a seizure without legal basis."],
  ["Terry stop","Requires specific, articulable facts supporting reasonable suspicion that crime is afoot. Temporary detention must remain reasonably related in scope/duration."],
  ["Frisk","Not automatic with every stop. Requires reasonable belief the person is armed and dangerous; limited protective pat-down for weapons."],
  ["Arrest","Requires probable cause or other lawful arrest authority. An arrest is more intrusive than a Terry detention."]
 ],sources:[["Terry v. Ohio",URLS.terry]]},
 searches:{title:"Types of Searches",one:"Identify the legal authority BEFORE searching. Different exceptions have different scopes.",sections:[
  ["Consent","Voluntary consent; stay within the scope given. Document who consented, authority, exact scope, and any withdrawal."],
  ["Vehicle — automobile exception","Probable cause that vehicle contains evidence/contraband can justify warrantless vehicle search within the scope of that probable cause."],
  ["Vehicle — incident to arrest","Arizona v. Gant: recent-occupant vehicle search incident to arrest is limited to arrestee access or reasonable belief evidence of the offense of arrest is in the vehicle."],
  ["Plain view","Lawful vantage/access + immediately apparent probable cause that item is evidence/contraband; plain view is not permission to move/open things to create a view."],
  ["Plain feel","During a lawful Terry frisk, contraband may be seized when its incriminating character is immediately apparent by touch without manipulation beyond the protective frisk."],
  ["Canine","Dog sniff during a lawful traffic stop cannot add time beyond the traffic mission absent independent reasonable suspicion."]
 ],sources:[["Schneckloth v. Bustamonte — Consent",URLS.consentCase],["Arizona v. Gant",URLS.gant],["Horton v. California — Plain View",URLS.plainView],["Minnesota v. Dickerson — Plain Feel",URLS.plainFeel],["Rodriguez v. United States",URLS.rodriguez]]},
 seizures:{title:"Seizure Rules — Quick Overview",one:"A Fourth Amendment seizure occurs when police, by force or show of authority, restrain a person's freedom in a way the law recognizes.",sections:[
  ["Person","Consensual → Terry detention → arrest are different levels. Each escalation needs its own legal basis."],
  ["Property","Taking control of property meaningfully interferes with possessory interests and requires lawful authority."],
  ["Scope","A seizure lawful at inception can become unlawful if its scope/duration exceeds the justification."],
  ["Articulate","Specific facts + reasonable inferences. Avoid conclusions such as 'suspicious' without describing what was observed."]
 ],sources:[["Terry v. Ohio",URLS.terry]]},
 trafficStops:{title:"Traffic Stops — Do / Don’t",one:"A traffic stop is a seizure. Handle the traffic mission diligently and separately identify any new reasonable suspicion.",sections:[
  ["DO","Articulate the observed traffic/equipment violation • identify driver/vehicle • complete ordinary mission tasks diligently • use lawful safety measures."],
  ["DO","If new facts arise, articulate the independent reasonable suspicion / probable cause before expanding the investigation."],
  ["DON'T","Add time for a dog sniff or unrelated criminal investigation after the traffic mission is—or reasonably should be—completed without independent reasonable suspicion."],
  ["DON'T","Use an offense whose statute expressly forbids a stop based solely on that violation—for example, Arkansas's wiper/headlight rule in § 27-36-204(a)(2)(B)."],
  ["Remember","Separate 'I can ask' from 'I can prolong/detain.' Consensual questioning can coexist with a stop only if it does not unlawfully extend it."]
 ],sources:[["Rodriguez v. United States",URLS.rodriguez],["Terry v. Ohio",URLS.terry],["§ 27-36-204",URLS.headlightRequired]]},
 arrests:{title:"Types of Arrest Authority",one:"Separate probable cause for the offense from authority to make a warrantless arrest.",sections:[
  ["Warrant","Arrest warrant / judicial process authorizes arrest subject to its terms."],
  ["Felony probable cause","Arkansas § 16-81-106 generally authorizes warrantless arrest when the officer has reasonable grounds to believe the person committed a felony."],
  ["Misdemeanor — in presence","General warrantless misdemeanor authority is tied to a public offense committed in the officer's presence, unless a separate statute/rule creates an exception."],
  ["Common special exceptions","Domestic abuse § 16-81-113 • misdemeanor battery bodily-harm/further-violence exception • protection-order violation § 5-53-134 • emergency-communication § 16-81-116."],
  ["Report","State both: (1) facts establishing offense PC and (2) the statute/rule authorizing the warrantless arrest."]
 ],sources:[["§ 16-81-106 — Arrest authority",URLS.arrest],["§ 16-81-113 — Domestic abuse","https://law.justia.com/codes/arkansas/title-16/subtitle-6/chapter-81/subchapter-1/section-16-81-113/"],["§ 5-53-134 — Protection order",URLS.orderProtection],["§ 16-81-116 — Emergency communication",URLS.emergencyArrest]]},
 miranda:{title:"When to Mirandize",one:"Miranda is triggered by BOTH custody AND interrogation. Arrest by itself does not make every statement inadmissible; volunteered statements are different.",sections:[
  ["Mirandize","Person is in custody (or freedom restrained to comparable degree) AND you are asking questions/using conduct reasonably likely to elicit an incriminating response."],
  ["Usually not yet","Routine consensual encounter; ordinary noncustodial investigative questions; typical traffic-stop questioning before the encounter becomes custodial—subject to the actual circumstances."],
  ["Volunteered statement","A spontaneous statement not prompted by interrogation is not barred merely because the person has not yet been Mirandized."],
  ["Public safety / booking","Special doctrines can apply. Do not use this quick card as a substitute for agency/legal guidance in unusual interrogation settings."],
  ["Example — YES","Handcuffed suspect is under arrest in patrol car and officer asks, 'Where did you hide the gun?' → custody + interrogation."],
  ["Example — NO","Officer arrives at a call and asks an unrestrained witness/suspect, 'What happened?' during initial fact gathering → ordinarily not automatically custodial."]
 ],sources:[["Miranda v. Arizona",URLS.miranda]]},
 definitionsHub:{title:"Legal Definitions — On Demand",one:"Use these as field cues, then open the controlling source when the exact wording matters.",sections:[
  ["Reasonable suspicion","Specific, articulable facts plus rational inferences that reasonably suggest criminal activity. More than a hunch; less than probable cause."],
  ["Probable cause","Facts/circumstances sufficient to support a reasonable belief that a crime occurred and the person/item is connected to it. Practical probability, not certainty."],
  ["Physical injury","Impairment of physical condition, substantial pain, or bruising/swelling/visible trauma mark. § 5-1-102(14)."],
  ["Serious physical injury","Substantial risk of death or protracted disfigurement/health impairment/loss or protracted impairment of body member/organ. § 5-1-102(21)."],
  ["Purposely / knowingly / recklessly / negligently","Arkansas culpable mental states are defined in § 5-2-202; use the in-app Key Terms popup during charge triage."],
  ["Sexual terms","For 'sexual contact,' 'sexual intercourse,' 'deviate sexual activity,' 'forcible compulsion,' and capacity to consent, use the definitions within Arkansas Chapter 14 before final charging."]
 ],sources:[["Terry v. Ohio — reasonable suspicion",URLS.terry],["Arkansas general definitions",URLS.defs],["Arkansas mental states",URLS.mentalStates],["Arkansas sexual offenses chapter","https://law.justia.com/codes/arkansas/title-5/subtitle-2/chapter-14/"]]}
};

function quickTermsFor(id){
 const terms={
  rapeAge:[["Forcible compulsion","Force or threat as defined in Arkansas sexual-offense law; use the Chapter 14 definition."],["Consent","Not a universal defense in age/capacity-based sexual offenses."]],
  encounters:[["Reasonable suspicion","Specific, articulable facts reasonably suggesting crime; more than a hunch."],["Frisk","Protective weapons pat-down based on armed-and-dangerous facts; not a general evidence search."]],
  searches:[["Probable cause","Practical, fact-based probability—not certainty."],["Scope","Search must stay within the legal authority/consent/exception that justifies it."]],
  miranda:[["Custody","Formal arrest or restraint on freedom comparable to formal arrest, judged from circumstances."],["Interrogation","Express questioning or its functional equivalent reasonably likely to elicit incriminating response."]],
  firearmPlaces:[["Enhanced endorsement","Additional concealed-carry training/endorsement that changes several location restrictions."]],
  stalking:[["Course of conduct","Repeated conduct meeting the statute; one isolated contact is usually not enough."],["Emotional distress","Significant mental suffering/distress; treatment is not required by the definition."]]
 };return terms[id]||[];
}
window.openQuickTerms=function(id){
 const rows=quickTermsFor(id);
 openSheet("Key Terms",rows.length?rows.map(x=>`<div class="quick-def"><div class="plain">${esc(x[0])} — ${esc(x[1])}</div></div>`).join(""):`<div class="help-text">This reference does not need a separate term list. Use the source links for exact statutory wording.</div>`);
};
window.openQuickSources=function(id){
 const q=quickRefs[id];if(!q)return;
 openSheet("Full Sources",q.sources.map(s=>`<a class="stat-row" target="_blank" rel="noopener" href="${s[1]}"><strong>${esc(s[0])}</strong><small>Open source ↗</small></a>`).join(""));
};
window.openQuickRef=function(id){
 const q=quickRefs[id];if(!q)return;
 hideAll();const el=document.getElementById("criminal");el.classList.remove("hidden");
 const backKey=Object.entries(topicMap).find(([k,t])=>t.items.some(x=>x[0]==="quick"&&x[1]===id))?.[0]||"quickhub";
 el.innerHTML=topTitle(q.title,`openTopic('${backKey}')`)+`
 <div class="hero"><h2>${esc(q.title)}</h2><p>${esc(q.one)}</p></div>
 <div class="ref-page">${q.sections.map((s,i)=>`<div class="ref-card"><h3>${esc(s[0])}</h3>${Array.isArray(s[1])?`<ul>${s[1].map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p>${esc(s[1])}</p>`}</div>`).join("")}</div>
 <div class="ref-links"><button onclick="openQuickTerms('${id}')">Key Terms</button><button onclick="openQuickSources('${id}')">Full Sources</button></div>`;
 scrollTo(0,0);
};

/* -------------------- TRAFFIC VALIDATORS -------------------- */
const v30LegacyReckless=openTraffic;
window.openRecklessV30=function(){v30LegacyReckless();const b=document.querySelector("#traffic .back");if(b)b.setAttribute("onclick","openTopic('traffichub')");};
let trafficCheckState={};
const trafficChecks={
 headlight:{title:"Headlight Out",stat:"§§ 27-36-204, 27-36-207, 27-36-209",sources:[["§ 27-36-204 — When lamps required",URLS.headlightRequired],["§ 27-36-207 — Two lighted lamps",URLS.twoLamps],["§ 27-36-209 — Headlamps",URLS.headlamps]],
  qs:[["required","Are headlights legally required at this time?","yesno"],["out","Is one required front headlamp missing / not lighted / covered so illumination is reduced?","yesno"],["wiperOnly","Is the ONLY reason lights are required the windshield-wiper/precipitation rule?","yesno"]],
  eval:s=>s.out==="yes"&&s.required==="yes"?(s.wiperOnly==="yes"?["NO — not solely for this fact","Arkansas § 27-36-204(a)(2)(B) says a vehicle/operator shall not be stopped, inspected, or detained solely for the wiper/headlight requirement. If a separate valid stop exists, the violation can still be addressed."]:["YES — violation validated","During a time when lamps are required, ordinary motor vehicles must display the required front lamps and be equipped with at least two headlamps, one on each side."]):["NO / NOT YET","A required-lighting condition + actual headlamp defect has not both been established."]},
 registration:{title:"Expired / Invalid Registration",stat:"§ 27-14-304",sources:[["§ 27-14-304",URLS.registrationCurrent]],
  qs:[["required","Is this vehicle required to be registered for this public-road operation?","yesno"],["valid","Is a valid license plate for the current registration year displayed?","yesno"]],
  eval:s=>s.required==="yes"&&s.valid==="no"?["YES — violation validated","A vehicle required to be registered may not be operated on a public street/highway without a valid license plate displayed for the current registration year."]:["NO / VERIFY","Required-registration status and absence of a current valid plate are not both established."]},
 tint:{title:"Windshield / Window Tint — No Meter",stat:"§ 27-37-306",sources:[["§ 27-37-306 — Tint",URLS.tint]],
  qs:[["windshield","Does aftermarket windshield tint extend more than 5 inches down from the top center (outside a verified medical exemption)?","yesno"],["label","If aftermarket tint is present, is the required installer-conformity label on the front glass immediately left of the operator?","yesno"],["waiver","Is a current medical-waiver certification claimed/present?","yesno"],["percentOnly","Is your ONLY concern that side/rear tint 'looks too dark' without a meter or other reliable transmission evidence?","yesno"]],
  eval:s=>s.windshield==="yes"&&s.waiver!=="yes"?["YES — objective windshield issue","The ordinary windshield eyebrow may not extend more than 5 inches down from the top center."]:s.label==="no"?["YES — label issue to verify","Aftermarket tint requires the installer conformity label specified by § 27-37-306(c)/(e)."]:s.percentOnly==="yes"?["NOT VALIDATED ON APPEARANCE ALONE","Without a tint meter or another reliable transmission measurement, do not claim the statutory 25%/10% percentage threshold solely because tint appears dark. Use objectively provable issues such as windshield depth, label, waiver, or reliable measurement."]:["VERIFY","No objective no-meter violation is established by the entered facts."]},
 cellphone:{title:"Cell Phone / Texting",stat:"§ 27-51-1504",sources:[["§ 27-51-1504",URLS.cellPhone]],
  qs:[["operate","Was the person operating a motor vehicle?","yesno"],["use","Was the device being used to text OR access/read/post social media?","yesno"],["callOnly","Was the observed conduct only reading/selecting/entering a number or name to make a phone call?","yesno"],["exempt","Emergency-reporting / preventing injury / qualifying official or emergency medical exemption?","yesno"]],
  eval:s=>s.operate==="yes"&&s.use==="yes"&&s.callOnly!=="yes"&&s.exempt!=="yes"?["YES — violation validated","§ 27-51-1504 prohibits operating a motor vehicle while texting or accessing/reading/posting social media, subject to listed exceptions."]:["NO / VERIFY","The prohibited use or absence of an exception is not established."]},
 yield:{title:"Failure to Yield",stat:"§§ 27-51-501—503; 27-51-603",sources:[["§ 27-51-501 — Uncontrolled intersection",URLS.yieldUncontrolled],["§ 27-51-502 — Left turn",URLS.yieldLeft],["§ 27-51-503 — Stop/Yield intersection",URLS.yieldIntersection],["§ 27-51-603 — Private road/driveway",URLS.yieldPrivate]],
  qs:[["scenario","Which situation?","select",["Stop / yield sign","Uncontrolled intersection","Left turn across oncoming traffic","Entering highway from private road/driveway"]],["hazard","Did another vehicle/pedestrian have the statutory right-of-way / constitute an immediate hazard under that selected situation?","yesno"],["failed","Did the driver fail to yield as required?","yesno"]],
  eval:s=>s.scenario&&s.hazard==="yes"&&s.failed==="yes"?["YES — selected yield violation supported","Use the exact statute shown for the selected yield situation; 'failure to yield' is not one generic rule."]:["NO / VERIFY","The exact yield situation + right-of-way fact + failure to yield are not all established."]},
 leftcenter:{title:"Left of Center",stat:"§ 27-51-301",sources:[["§ 27-51-301",URLS.leftCenter]],
  qs:[["left","Was the vehicle driven on the left half of a roadway of sufficient width?","yesno"],["exception","Did a statutory exception apply (lawful passing, right half closed/unsafe, 3-lane rule, one-way, preparing left exit)?","yesno"]],
  eval:s=>s.left==="yes"&&s.exception==="no"?["YES — violation validated","§ 27-51-301 requires driving on the right half of the roadway unless one of its stated exceptions applies."]:["NO / VERIFY","Left-half driving without a statutory exception is not established."]}
};
function tcControl(id,q){
 if(q[2]==="select")return `<select id="tc-${id}" onchange="trafficCheckState['${id}']=this.value"><option value="">— Select —</option>${q[3].map(x=>`<option>${x}</option>`).join("")}</select>`;
 return `<div class="seg"><button onclick="tcSet('${id}','yes',this)">YES</button><button onclick="tcSet('${id}','no',this)">NO</button><button onclick="tcSet('${id}','unknown',this)">UNKNOWN</button></div>`;
}
window.tcSet=function(id,v,b){trafficCheckState[id]=v;b.parentElement.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};
window.openTrafficCheck=function(id){
 const t=trafficChecks[id];if(!t)return;trafficCheckState={};hideAll();const el=document.getElementById("traffic");el.classList.remove("hidden");
 el.innerHTML=topTitle(t.title,"openTopic('traffichub')")+`<div class="hero"><h2>${t.title}</h2><p>${t.stat}</p></div><div class="card">${t.qs.map(q=>`<div class="q"><div class="q-head"><label>${q[1]}</label><button class="qhelp" onclick="openSheet('Why this matters','<div class=&quot;help-text&quot;>This fact is used to validate the exact statutory rule. Answer from what you observed or verified.</div>')">Help</button></div>${tcControl(q[0],q)}</div>`).join("")}<div class="actions"><button class="primary" onclick="evalTrafficCheck('${id}')">Validate</button></div></div><div id="trafficResult"></div><div class="traffic-dock"><button onclick="openTrafficKey('${id}')">Key Terms</button><button onclick="openTrafficSources('${id}')">Full Statute(s)</button></div>`;
};
window.evalTrafficCheck=function(id){
 const t=trafficChecks[id],res=t.eval(trafficCheckState),r=document.getElementById("trafficResult");
 let tone=res[0].startsWith("YES")?"yes":res[0].startsWith("NO")?"no":"verify";
 r.innerHTML=`<div class="quick-answer"><h3>Validation Result</h3><div class="${tone}">${esc(res[0])}</div><p>${esc(res[1])}</p></div>`;
};
window.openTrafficSources=function(id){const t=trafficChecks[id];openSheet("Full Statute(s)",t.sources.map(x=>`<a class="stat-row" target="_blank" rel="noopener" href="${x[1]}"><strong>${esc(x[0])}</strong><small>Open full law ↗</small></a>`).join(""))};
window.openTrafficKey=function(id){
 const text=id==="tint"?"Without a tint meter, distinguish objective facts (windshield strip depth, required label, medical waiver) from a percentage-transmission allegation that needs reliable measurement.":id==="yield"?"Right-of-way depends on the exact intersection/turn/entry situation. Pick the scenario before deciding whether a failure to yield occurred.":"Use the exact observed fact and statutory exception; avoid legal conclusions without the underlying fact.";
 openSheet("Key Terms / Field Cue",`<div class="quick-def"><div class="plain">${esc(text)}</div></div>`);
};

/* -------------------- SPECIAL VEHICLE / TRAFFIC HUB ENTRY -------------------- */
const v30OldOpenSpecial=openSpecialVehicle;
openSpecialVehicle=function(){v30OldOpenSpecial();const b=document.querySelector("#special .back");if(b)b.setAttribute("onclick","openTopic('specialhub')");};
const v30OldPark=openParkEnforcement;
openParkEnforcement=function(){v30OldPark();const b=document.querySelector("#ordinances .back, #criminal .back");if(b)b.setAttribute("onclick","openTopic('parks')");};

/* -------------------- INFOGRAPHIC LIBRARY additions -------------------- */
[
 ["Terroristic Threatening","ref-terroristic-threatening.png"],
 ["Firearms — Prohibited Person","ref-firearm-prohibited.png"],
 ["Firearms — Prohibited Places","ref-firearm-places.png"],
 ["Juvenile — Delinquent / Runaway","ref-juvenile-overview.png"],
 ["Rape / Age & Consent Guide","ref-rape-age-guide.png"],
 ["Sexual Assault 1st–4th","ref-sexual-assault.png"],
 ["Indecent Exposure","ref-indecent-exposure.png"],
 ["Human Trafficking","ref-human-trafficking.png"],
 ["Harassment","ref-harassment.png"],
 ["Stalking","ref-stalking.png"],
 ["Unlawful Doxxing of Minor","ref-doxxing-minor.png"],
 ["Communicating False Alarm","ref-false-alarm.png"],
 ["Threatening Fire or Bombing","ref-threatening-fire-bomb.png"],
 ["Emergency Communication","ref-emergency-communication.png"],
 ["Cruelty to Animals","ref-animal-cruelty.png"],
 ["Resisting / Refusal to Submit","ref-resisting-refusal.png"],
 ["Interference with Officer","ref-interference-officer.png"],
 ["Hindering Apprehension","ref-hindering.png"],
 ["Fleeing","ref-fleeing.png"],
 ["Fraudulent Card Use","ref-fraud-card.png"],
 ["Marijuana Possession","ref-marijuana.png"],
 ["Special Vehicles — Identification","ref-special-vehicles.png"],
 ["Trailers","ref-trailers.png"],
 ["Common Traffic","ref-common-traffic.png"],
 ["Types of Encounters","ref-encounters.png"],
 ["Searches","ref-searches.png"],
 ["Traffic Stops","ref-traffic-stops.png"],
 ["When to Mirandize","ref-miranda.png"],
 ["Domestic Violence First Response","ref-dv-response.png"],
 ["Legal Definitions","ref-legal-definitions.png"]
].forEach(x=>{if(!libraryItems.some(y=>y[1]===x[1]))libraryItems.push(x)});


[
 ["Concealed Carry Overview","ref-concealed-carry.png"],
 ["Controlled Substance Table","ref-controlled-substances-table.png"],
 ["Medical Marijuana","ref-medical-marijuana.png"],
 ["Domestic Issues — Children","ref-dv-children.png"],
 ["Protection / No-Contact Orders","ref-protection-orders.png"],
 ["City Park — Detention Leads","ref-park-detention.png"],
 ["Common City Ordinances","ref-city-ordinances.png"],
 ["Seizure Rules","ref-seizures.png"],
 ["Types of Arrest Authority","ref-arrests.png"]
].forEach(x=>{if(!libraryItems.some(y=>y[1]===x[1]))libraryItems.push(x)});

/* Ensure every charge added in V3.0 also retains the optional Fort Smith
   location check used to surface applicable municipal law. */
Object.entries(modules).forEach(([id,m])=>{
 if(m?.enhancement && !m.enhancement.some(q=>q.id==="locationType")){
   m.enhancement.push(qSelect("locationType","Where did this occur? (optional — checks Fort Smith ordinances)",locations.map(x=>[x,x]),false,"Skip if not needed. This is used only to surface potentially applicable municipal ordinances."));
 }
});

/* Boot new home */
home();
