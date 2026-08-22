/* Arkansas Patrol Charge Triage V2.6 — Field Systems
   Major update: new property charges, juvenile area, Fort Smith park enforcement,
   universal dual references, municipal-law surfacing, and Special Vehicle lifelines. */

Object.assign(URLS,{
 burglary201:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-39/subchapter-2/section-5-39-201/",
 burglaryDefs:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-39/subchapter-1/section-5-39-101/",
 aggravatedBurglary:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-39/subchapter-2/section-5-39-204/",
 breakingEntering:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-39/subchapter-2/section-5-39-202/",
 unauthorizedVehicle:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-36/subchapter-1/section-5-36-108/",
 fsCurfew:"https://library.municode.com/ar/fort_smith/codes/code_of_ordinances?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-101IM",
 fsParks:"https://library.municode.com/ar/fort_smith/codes/code_of_ordinances?nodeId=COOR_CH18PAREET_ARTIIIPARU",
 fsPenalty:"https://library.municode.com/ar/fort_smith/codes/code_of_ordinances?nodeId=COOR_CH1GEPR_S1-9PEVI",
 ebikeClass:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-17/section-27-51-1702/",
 ebikeLabel:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-17/section-27-51-1704/",
 ebikeClass3:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-17/section-27-51-1706/",
 scooterDef:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-19/section-27-51-1902/",
 scooterShared:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-19/section-27-51-1904/",
 autocycleLimit:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-20/subchapter-3/section-27-20-307/"
});

/* ---------- NAVIGATION / NEW MODULES ---------- */
if(!criminalCats.property.items.some(x=>x[0]==="burglary")){
 criminalCats.property.items.splice(1,0,
  ["burglary","Burglary — Residential / Commercial","Structure type + unlawful entry/remain + intended imprisonable offense + aggravators"],
  ["breaking","Breaking or Entering","Building / vehicle / container + purpose to commit theft or felony"]
 );
 criminalCats.property.items.push(["unauthvehicle","Unauthorized Use of Vehicle","Knowingly takes / operates / controls another's vehicle without consent"]);
}
criminalCats.juvenile={title:"Juvenile",items:[
 ["curfew","Fort Smith Juvenile Curfew","Under 18 + outdoor public place + applicable time + no defense / exception"]
]};
window.openJuvenile=function(){
 hideAll();const el=document.getElementById("criminal");el.classList.remove("hidden");openCriminalCat("juvenile");
};
const v26OldCategoryFor=categoryFor;
categoryFor=function(id){
 if(["burglary","breaking","unauthvehicle"].includes(id))return "property";
 if(id==="curfew")return "juvenile";
 return v26OldCategoryFor(id);
};

/* ---------- UNIVERSAL OPTIONAL LOCATION FOR MUNICIPAL MATCHING ---------- */
const municipalLocationQ=qSelect("locationType","Where did this occur? (optional — checks Fort Smith ordinances)",locations.map(x=>[x,x]),false,"Skip if not needed. Location is used only to surface potentially applicable municipal ordinances.");
Object.entries(modules).forEach(([id,m])=>{
 if(!m.enhancement.some(q=>q.id==="locationType"))m.enhancement.push({...municipalLocationQ});
});

/* ---------- NEW PROPERTY CHARGE MODULES ---------- */
modules.burglary={
 title:"Burglary — Residential / Commercial",subtitle:"Classify the structure first, then unlawful entry/remain, criminal purpose, and aggravated facts.",
 required:[
  qChoice("structureType","What type of occupiable structure?",[
   {v:"res",k:"RESIDENTIAL",tone:"purpose",t:"person lives there OR structure is customarily used for overnight accommodation"},
   {v:"commercial",k:"COMMERCIAL",tone:"knowing",t:"business/calling occurs there OR people assemble for business, government, education, religion, entertainment, or public transportation"}
  ],true),
  qSeg("unlawfulEntry","Did the person enter or remain unlawfully?",[["yes","YES — no license / privilege"],["no","NO — entry/remain was licensed or privileged"],["unknown","UNKNOWN — verify authority / public-access facts"]],true),
  qSelect("intendedOffense","At entry/remain, what offense was the person PURPOSELY intending to commit inside?",[
   ["theft","Theft"],["felony","Felony"],["misd","Misdemeanor punishable by imprisonment"],["unknown","Unknown / intent not yet established"]
  ],true,"Burglary does not require intent to commit only a felony; an intended offense punishable by imprisonment can satisfy the statute.")
 ],
 enhancement:[
  qSeg("occupied","If residential: was the structure occupied by another person?",yesNoUnknown,false,"Occupancy can create aggravated residential burglary.",v=>v.structureType==="res"),
  qSeg("armed","If residential: armed with a deadly weapon OR represented by word/conduct that they were armed?",yesNoUnknown,false,"This creates aggravated residential burglary and a Class Y pathway.",v=>v.structureType==="res"),
  qSeg("deathSPI","If aggravated residential burglary: caused or attempted death or serious physical injury?",yesNoUnknown,false,"A Class Y classification can apply once the aggravated-residential-burglary gate is met.",v=>v.structureType==="res"&&(v.occupied==="yes"||v.armed==="yes")),
  qSeg("pharmacy","If commercial: was the commercial occupiable structure a pharmacy?",yesNoUnknown,false,"Commercial burglary of a pharmacy carries an additional consecutive five-year sentence enhancement.",v=>v.structureType==="commercial"),
  {...municipalLocationQ}
 ],
 report:[...contextQuestions,...evidenceQuestions]
};
modules.breaking={
 title:"Breaking or Entering",subtitle:"The target can be a building, vehicle, safe, cash register, vending machine, or similar container/equipment.",
 required:[
  qSeg("breakEnter","Did the person break OR enter into the target?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN"]],true),
  qSelect("target","What was broken into / entered?",[
   ["structure","Building / structure / vehicle"],["secure","Vault / safe / cash register / safety deposit box / money depository"],["vending","Vending / coin-operated amusement / product dispenser"],["coin","Coin telephone / coin box"],["fare","Bus fare box"],["similar","Other similar container / apparatus / equipment"]
  ],true),
  qSelect("purpose","Purpose at the time of breaking / entering",[["theft","Commit a theft"],["felony","Commit a felony"],["other","Other / not theft or felony"],["unknown","Unknown / not established"]],true)
 ],
 enhancement:[
  qSeg("multiple","More than one separate building / vehicle / container was broken into or entered?",yesNoUnknown,false,"Each separate listed target can constitute a separate offense."),
  {...municipalLocationQ}
 ],
 report:[...contextQuestions,...evidenceQuestions]
};
modules.unauthvehicle={
 title:"Unauthorized Use of Vehicle",subtitle:"Knowingly takes, operates, or exercises control over another person's vehicle without the owner's consent.",
 required:[
  qSeg("anotherVehicle","Was it another person's vehicle?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN"]],true),
  qSeg("controlVehicle","Did the person take, operate, or exercise control over it?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN"]],true),
  qSeg("knowingly","Did the facts show the person KNOWINGLY exercised that control?",[["yes","YES"],["no","NO / accidental or unaware"],["unknown","UNKNOWN"]],true),
  qSeg("ownerConsent","Did the owner consent to this use/control?",[["no","NO — no consent"],["yes","YES — owner consented"],["unknown","UNKNOWN — verify consent"]],true),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],
 enhancement:[
  qSeg("depriveIntent","Evidence the person intended to steal / permanently or substantially deprive the owner?",yesNoUnknown,false,"If YES, separately evaluate Theft of Property; unauthorized use does not require the same theft-purpose analysis."),
  {...municipalLocationQ}
 ],
 report:[...contextQuestions,...evidenceQuestions]
};
modules.curfew={
 title:"Fort Smith Juvenile Curfew",subtitle:"All juvenile-specific curfew enforcement stays in the Juvenile section.",
 required:[
  qNum("age","Juvenile age",true,"Curfew applies to a person under 18."),
  qSelect("curfewPlace","Where was the juvenile?",[["street","City street / right-of-way"],["outdoor","Other outdoor public place"],["private","Private / indoor location"],["unknown","Unknown"]],true),
  qSelect("curfewTime","Which time window applies?",[
   ["weeknight","Sunday–Thursday night: after 10:30 p.m. during hours of darkness"],
   ["weekend","Saturday or Sunday morning: after 12:30 a.m."],
   ["christmas","Christmas school holiday: after 12:30 a.m."],
   ["outside","Outside the applicable curfew period"],
   ["unknown","Unknown / verify date and time"]
  ],true),
  qSelect("curfewDefense","Any § 14-102 defense / exception?",[
   ["none","None identified"],
   ["adult","With parent/guardian or adult designated by parent/guardian"],
   ["errand","Direct parent/guardian errand — no detour or stop"],
   ["interstate","In motor vehicle involved in interstate travel"],
   ["employment","Employment activity or direct travel to/from employment"],
   ["emergency","Emergency requiring immediate action"],
   ["activity","Adult-supervised official school/religious/recreational activity or direct travel to/from"],
   ["firstamendment","Exercising protected First Amendment rights"],
   ["emancipated","Married/formerly married or disabilities of minority removed"],
   ["unknown","Unknown — ask before enforcement"]
  ],true),
  qSeg("presence","Violation observed in officer's presence?",presenceOpts,true)
 ],
 enhancement:[
  qSeg("parentAllows","Parent/guardian/adult custodian knowingly allowing or permitting the curfew violation?",yesNoUnknown,false,"Fort Smith § 14-103 creates a related adult responsibility offense."),
  qSeg("businessAllows","Business operator permitting a minor to loiter/loaf/idle on the premises during prohibited hours?",yesNoUnknown,false,"Fort Smith § 14-104 creates a related business-operator offense."),
  {...municipalLocationQ}
 ],
 report:[...contextQuestions,...evidenceQuestions]
};

/* ---------- HELP / KEY TERMS FOR NEW + EXISTING MODULES ---------- */
Object.assign(simpleTermIndex,{
 "residential occupiable structure":{plain:"A vehicle, building, or other structure where someone lives OR that is normally used for overnight accommodation.",why:"This separates residential burglary from commercial burglary. A person does not have to be present at the time.",cite:"§ 5-39-101(9)",url:URLS.burglaryDefs},
 "commercial occupiable structure":{plain:"A vehicle, building, or structure where business/another calling occurs, or where people assemble for business, government, education, religion, entertainment, or public transportation.",why:"This is the structure gate for Commercial Burglary.",cite:"§ 5-39-101(2)",url:URLS.burglaryDefs},
 "enter or remain unlawfully":{plain:"The person had no license or privilege to enter or stay there.",why:"Public-access areas can be different: a place open to the public is generally privileged until a lawful order or restricted-area fact removes that privilege.",cite:"§ 5-39-101(4)",url:URLS.burglaryDefs},
 "offense punishable by imprisonment":{plain:"The intended offense inside can be a felony OR a misdemeanor that carries possible imprisonment.",why:"Burglary does not require the intended inside offense to be a felony only.",cite:"§ 5-39-201",url:URLS.burglary201},
 "breaking or entering":{plain:"Breaking OR entering a listed building, vehicle, safe, cash register, vending machine, or similar target for the purpose of committing theft or a felony.",why:"The statute is broader than forcing entry into a building; listed vehicles and containers also qualify.",cite:"§ 5-39-202",url:URLS.breakingEntering},
 "owner consent":{plain:"Permission from the vehicle's owner for the use or control at issue.",why:"Unauthorized Use of a Vehicle requires lack of owner consent.",cite:"§ 5-36-108",url:URLS.unauthorizedVehicle},
 "juvenile curfew":{plain:"In Fort Smith, a person under 18 generally may not remain on city streets/rights-of-way or other outdoor public places after the applicable curfew start unless a listed defense applies.",why:"Always check age, exact date/time, location, and all § 14-102 defenses before enforcement.",cite:"Fort Smith §§ 14-101—14-102",url:URLS.fsCurfew},
 "autocycle":{plain:"A three-tire motorcycle-type vehicle with a steering wheel, non-straddle seating, and specified road equipment.",why:"A Polaris Slingshot is the common field example; operator/license/passenger rules differ from ordinary motorcycles.",cite:"§ 27-20-303",url:URLS.autocycleDef},
 "electric bicycle":{plain:"Fully operable pedals + electric motor under 750 W + Class 1, 2, or 3 speed/assist behavior.",why:"If any gate fails, the device is not an Arkansas statutory e-bike and motor-vehicle rules may need evaluation.",cite:"§ 27-51-1702",url:URLS.ebikeClass},
 "top assisted speed":{plain:"The speed at which the motor assistance is required to stop under the e-bike class definition—not simply the fastest speed the bicycle can coast or be pedaled.",why:"20 mph distinguishes Class 1/2; 28 mph distinguishes Class 3.",cite:"§ 27-51-1702",url:URLS.ebikeClass},
 "motor wattage":{plain:"The manufacturer-rated motor power in watts. Arkansas e-bike status requires LESS THAN 750 W.",why:"Voltage alone is not wattage. Prefer the required e-bike label or exact-model manufacturer specification.",cite:"§§ 27-51-1702, 27-51-1704",url:URLS.ebikeLabel},
 "maximum capable speed":{plain:"For a stand-up electric scooter, the device's maximum speed capability on a paved level surface—not the speed the officer happened to observe at one moment.",why:"A statutory electric motorized scooter must have a maximum speed of 20 mph or less; actual operation over 15 mph is a separate rule.",cite:"§ 27-51-1902",url:URLS.scooterDef}
});
Object.assign(moduleDefinitions,{
 burglary:[
  {term:"Residential occupiable structure",text:simpleTermIndex["residential occupiable structure"].plain,cite:"§ 5-39-101(9)",url:URLS.burglaryDefs},
  {term:"Commercial occupiable structure",text:simpleTermIndex["commercial occupiable structure"].plain,cite:"§ 5-39-101(2)",url:URLS.burglaryDefs},
  {term:"Enter or remain unlawfully",text:simpleTermIndex["enter or remain unlawfully"].plain,cite:"§ 5-39-101(4)",url:URLS.burglaryDefs},
  {term:"Offense punishable by imprisonment",text:simpleTermIndex["offense punishable by imprisonment"].plain,cite:"§ 5-39-201",url:URLS.burglary201},
  {term:"Deadly weapon",text:simpleTermIndex["deadly weapon"].plain,cite:"§ 5-1-102(4)",url:URLS.defs},
  {term:"Serious physical injury",text:simpleTermIndex["serious physical injury"].plain,cite:"§ 5-1-102(21)",url:URLS.defs}
 ],
 breaking:[{term:"Breaking or entering",text:simpleTermIndex["breaking or entering"].plain,cite:"§ 5-39-202",url:URLS.breakingEntering},{term:"Purposely",text:simpleTermIndex["purposely"].plain,cite:"§ 5-2-202(1)",url:URLS.mentalStates}],
 unauthvehicle:[{term:"Knowingly",text:simpleTermIndex["knowingly"].plain,cite:"§ 5-2-202(2)",url:URLS.mentalStates},{term:"Owner consent",text:simpleTermIndex["owner consent"].plain,cite:"§ 5-36-108",url:URLS.unauthorizedVehicle}],
 curfew:[{term:"Juvenile curfew",text:simpleTermIndex["juvenile curfew"].plain,cite:"Fort Smith §§ 14-101—14-102",url:URLS.fsCurfew}]
});
/* Ensure existing modules that previously had thin/empty key-term libraries have something useful. */
moduleDefinitions.trespass=[{term:"Enter or remain unlawfully",text:simpleTermIndex["enter or remain unlawfully"].plain,cite:"§ 5-39-101(4)",url:URLS.burglaryDefs},{term:"Purposely",text:simpleTermIndex["purposely"].plain,cite:"§ 5-2-202(1)",url:URLS.mentalStates}];
moduleDefinitions.loitering=[{term:"Purposely",text:simpleTermIndex["purposely"].plain,cite:"§ 5-2-202(1)",url:URLS.mentalStates}];
moduleDefinitions.disorderly=[{term:"Purposely",text:simpleTermIndex["purposely"].plain,cite:"§ 5-2-202(1)",url:URLS.mentalStates},{term:"Recklessly",text:simpleTermIndex["recklessly"].plain,cite:"§ 5-2-202(3)",url:URLS.mentalStates}];
moduleDefinitions.obstruction=[{term:"Knowingly",text:simpleTermIndex["knowingly"].plain,cite:"§ 5-2-202(2)",url:URLS.mentalStates}];
Object.assign(relatedTermsByQuestion,{
 burglary:{structureType:["residential occupiable structure","commercial occupiable structure"],unlawfulEntry:["enter or remain unlawfully"],intendedOffense:["purposely","offense punishable by imprisonment"],armed:["deadly weapon"],deathSPI:["serious physical injury"]},
 breaking:{breakEnter:["breaking or entering"],purpose:["purposely"]},
 unauthvehicle:{knowingly:["knowingly"],ownerConsent:["owner consent"]},
 curfew:{age:["juvenile curfew"],curfewTime:["juvenile curfew"],curfewDefense:["juvenile curfew"]}
});
Object.assign(qWhy,{
 burglary:{structureType:"Structure type determines Residential vs Commercial Burglary.",unlawfulEntry:"Burglary requires entry or remaining without legal license or privilege.",intendedOffense:"The suspect must have the purpose to commit an offense punishable by imprisonment inside the structure.",occupied:"An occupied residential structure creates an aggravated-residential-burglary pathway.",armed:"Being armed or representing that the suspect is armed creates an aggravated residential burglary Class Y pathway.",deathSPI:"Once aggravated residential burglary is established, causing/attempting death or serious physical injury creates a Class Y classification.",pharmacy:"A pharmacy commercial burglary carries an additional consecutive five-year term."},
 breaking:{breakEnter:"The offense requires breaking OR entering a listed target.",target:"The statute expressly covers more than buildings, including vehicles, safes, cash registers, vending devices, and similar containers.",purpose:"Purpose must be to commit theft or a felony."},
 unauthvehicle:{anotherVehicle:"The vehicle must belong to another person.",controlVehicle:"Taking, operating, or exercising control can satisfy the conduct element.",knowingly:"The control must be knowing, not accidental or unaware.",ownerConsent:"Lack of owner consent is required.",depriveIntent:"If theft intent is present, evaluate Theft of Property separately."},
 curfew:{age:"Fort Smith curfew covers persons under 18.",curfewPlace:"The ordinance applies to city streets/rights-of-way and other outdoor public places.",curfewTime:"Curfew start changes by night and Christmas school holiday period.",curfewDefense:"§ 14-102 contains eight defenses. Ask before enforcement.",parentAllows:"A parent/guardian/custodian can have a separate § 14-103 violation.",businessAllows:"A business operator can have a separate § 14-104 violation."}
});

/* ---------- FULL STATUTE(S): ALWAYS SEPARATE FROM KEY TERMS ---------- */
const v26OldStatuteLinks=statuteLinks;
statuteLinks=function(){
 if(currentModule==="burglary")return [{label:"§ 5-39-201 — Residential / Commercial Burglary",url:URLS.burglary201},{label:"§ 5-39-204 — Aggravated Residential Burglary",url:URLS.aggravatedBurglary},{label:"§ 5-39-101 — Burglary Definitions",url:URLS.burglaryDefs}];
 if(currentModule==="breaking")return [{label:"§ 5-39-202 — Breaking or Entering",url:URLS.breakingEntering}];
 if(currentModule==="unauthvehicle")return [{label:"§ 5-36-108 — Unauthorized Use of Vehicle",url:URLS.unauthorizedVehicle}];
 if(currentModule==="curfew")return [{label:"Fort Smith §§ 14-101—14-106 — Curfew for Minors",url:URLS.fsCurfew},{label:"Fort Smith § 1-9 — General Penalty",url:URLS.fsPenalty}];
 return v26OldStatuteLinks();
};

/* ---------- EVALUATORS ---------- */
evaluators.burglary=v=>{
 if(v.unlawfulEntry!=="yes")return insufficient("§ 5-39-201",v.unlawfulEntry==="no"?"Entry/remain was licensed or privileged; unlawful entry/remain is not established.":"Verify whether the person had license or privilege to enter/remain.",[source("Burglary statute",URLS.burglary201),source("Definitions",URLS.burglaryDefs)]);
 if(v.intendedOffense==="unknown")return insufficient("§ 5-39-201","Purpose to commit an offense punishable by imprisonment inside the structure is not yet established.",[source("Burglary statute",URLS.burglary201)]);
 if(v.structureType==="res"){
  if(v.occupied==="unknown"||v.armed==="unknown")return insufficient("§§ 5-39-201(a), 5-39-204","Resolve whether the residential structure was occupied and whether the suspect was armed/represented being armed; either fact can change the charge to Aggravated Residential Burglary.",[source("Residential Burglary",URLS.burglary201),source("Aggravated Residential Burglary",URLS.aggravatedBurglary)]);
  const aggravated=v.occupied==="yes"||v.armed==="yes";
  if(aggravated){
   if(v.deathSPI==="unknown")return insufficient("§ 5-39-204","Aggravated residential burglary is established, but death/serious-injury attempt/result is unknown and can change Class A to Class Y.",[source("Aggravated Residential Burglary",URLS.aggravatedBurglary)]);
   const y=v.armed==="yes"||v.deathSPI==="yes";
   const cls=y?"Class Y felony":"Class A felony";
   const stat=y?(v.armed==="yes"?"§ 5-39-204(a)(2), (b)(1)(A)":"§ 5-39-204(a)(1), (b)(1)(B)"):"§ 5-39-204(a)(1), (b)(2)";
   let r=baseResult("Aggravated Residential Burglary",stat,cls);
   r.elements=["Entered/remained unlawfully in another's residential occupiable structure","Purpose to commit an offense punishable by imprisonment inside",v.armed==="yes"?"Armed with deadly weapon or represented being armed":"Structure occupied by another person",v.deathSPI==="yes"?"Caused or attempted death/serious physical injury":"No death/serious-injury Class Y pathway selected"];
   r.why=`Residential burglary is established, and ${v.armed==="yes"?"the armed/representation fact":"the occupied-structure fact"} triggers Aggravated Residential Burglary. ${y?"The entered facts satisfy a Class Y classification pathway.":"No Class Y fact was selected, so the aggravated offense is Class A."}`;
   r.arrest=arrestText(cls,"no");r.penalty=penaltyFor(cls);r.sources=[source("Aggravated Residential Burglary",URLS.aggravatedBurglary),source("Residential Burglary",URLS.burglary201),source("Definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];
   r.reportFacts=["Exact residential structure and why it meets residential-occupiable definition","Facts showing no license/privilege to enter or remain","Facts proving the intended imprisonable offense at time of entry/remain",v.occupied==="yes"?"Who occupied the structure and how occupancy was confirmed":"",v.armed==="yes"?"Weapon or representation facts":"",...evidenceFacts(v)].filter(Boolean);
   r.verbiage="The suspect entered/remained unlawfully in the residential occupiable structure of another with the purpose of committing [OFFENSE] inside. Aggravating facts included [OCCUPANCY / WEAPON REPRESENTATION / INJURY FACTS].";return r;
  }
  let r=baseResult("Residential Burglary","§ 5-39-201(a)(1)-(2)","Class B felony");
  r.elements=["Entered/remained unlawfully","Residential occupiable structure of another","Purpose to commit an offense punishable by imprisonment inside"];
  r.why="The structure qualifies as residential, unlawful entry/remain is established, and the suspect's purpose at entry/remain was to commit an imprisonable offense. No aggravated-residential-burglary fact was selected.";
  r.arrest=arrestText(r.classification,"no");r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-39-201",URLS.burglary201),source("§ 5-39-101 definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];
  r.reportFacts=["Why structure is residential occupiable","How entry/remain was unlawful","Intended offense and facts showing purpose existed at entry/remain",...evidenceFacts(v)];r.verbiage="The suspect entered/remained unlawfully in another person's residential occupiable structure with the purpose of committing [OFFENSE PUNISHABLE BY IMPRISONMENT] inside.";return r;
 }
 if(v.pharmacy==="unknown")return insufficient("§ 5-39-201(b)","Resolve whether the commercial occupiable structure is a pharmacy because a pharmacy burglary carries a consecutive five-year enhancement.",[source("Commercial Burglary",URLS.burglary201)]);
 let r=baseResult("Commercial Burglary","§ 5-39-201(b)(1)-(2)","Class C felony");
 r.elements=["Entered/remained unlawfully","Commercial occupiable structure of another","Purpose to commit an offense punishable by imprisonment inside"];
 if(v.pharmacy==="yes"){
  r.statute="§ 5-39-201(b)(1)-(3)";r.enhancements.push("PHARMACY ENHANCEMENT — additional five-year term of imprisonment, consecutive to any other sentence; prosecutor notice requirements apply.");r.chargeImpact.push("Commercial Burglary remains Class C felony; pharmacy status adds a consecutive 5-year sentence enhancement under § 5-39-201(b)(3).");r.penalty=penaltyFor("Class C felony")+" Plus 5 years consecutive for the pharmacy enhancement.";
 } else r.penalty=penaltyFor(r.classification);
 r.why=`The structure qualifies as commercial, unlawful entry/remain is established, and the entered purpose was to commit an offense punishable by imprisonment.${v.pharmacy==="yes"?" Pharmacy status adds the statutory consecutive enhancement.":""}`;
 r.arrest=arrestText(r.classification,"no");r.sources=[source("§ 5-39-201",URLS.burglary201),source("§ 5-39-101 definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];r.reportFacts=["Why structure is commercial occupiable","How entry/remain was unlawful","Intended offense and purpose facts",v.pharmacy==="yes"?"Facts confirming the business is a pharmacy":"",...evidenceFacts(v)].filter(Boolean);r.verbiage="The suspect entered/remained unlawfully in another person's commercial occupiable structure with the purpose of committing [OFFENSE PUNISHABLE BY IMPRISONMENT] inside.";return r;
};
evaluators.breaking=v=>{
 if(v.breakEnter!=="yes")return insufficient("§ 5-39-202",v.breakEnter==="no"?"Breaking or entry is not established.":"Confirm whether the suspect broke or entered into the listed target.",[source("§ 5-39-202",URLS.breakingEntering)]);
 if(["other","unknown"].includes(v.purpose))return insufficient("§ 5-39-202",v.purpose==="other"?"Purpose to commit theft or a felony is not established.":"Purpose to commit theft or a felony is unresolved.",[source("§ 5-39-202",URLS.breakingEntering)]);
 let r=baseResult("Breaking or Entering","§ 5-39-202(a), (c)","Class D felony");
 r.elements=["Broke or entered a listed building/structure/vehicle/container/apparatus",`Target category: ${v.target}`,`Purpose to commit ${v.purpose==="theft"?"theft":"a felony"}`];
 if(v.multiple==="yes")r.enhancements.push("SEPARATE-OFFENSE FLAG — § 5-39-202(b) states each separate listed building, vehicle, container, apparatus, or equipment can constitute a separate offense.");
 else if(v.multiple==="unknown")r.enhancements.push("VERIFY NUMBER OF TARGETS — each separate listed target can constitute a separate offense.");
 r.why="The entered facts establish breaking or entry into a target listed by § 5-39-202 for the purpose of committing theft or a felony.";r.arrest=arrestText(r.classification,"no");r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-39-202",URLS.breakingEntering),source("Arrest authority",URLS.arrest)];r.reportFacts=["Exact target broken into/entered","How breaking or entry occurred","Facts proving purpose to commit theft/felony","Number of separate targets",...evidenceFacts(v)];r.verbiage="The suspect broke/entered [TARGET] for the purpose of committing [THEFT/FELONY], as shown by [SPECIFIC INTENT FACTS].";return r;
};
evaluators.unauthvehicle=v=>{
 const needed=["anotherVehicle","controlVehicle","knowingly"];
 if(needed.some(k=>v[k]!=="yes")||v.ownerConsent!=="no"){
  let why=[];if(v.anotherVehicle!=="yes")why.push("vehicle of another not established");if(v.controlVehicle!=="yes")why.push("taking/operation/control not established");if(v.knowingly!=="yes")why.push("knowing conduct not established");if(v.ownerConsent!=="no")why.push("lack of owner consent not established");
  return insufficient("§ 5-36-108",why.join("; ")||"Required element unresolved.",[source("§ 5-36-108",URLS.unauthorizedVehicle)]);
 }
 let r=baseResult("Unauthorized Use of a Vehicle","§ 5-36-108(a)-(b)","Class A misdemeanor");
 r.elements=["Knowingly took, operated, or exercised control","Vehicle of another person","Without consent of the owner"];
 if(v.depriveIntent==="yes")r.enhancements.push("THEFT CROSS-CHECK — facts suggesting intent to deprive/steal were entered. Evaluate Theft of Property separately; do not assume Unauthorized Use is the only applicable offense.");
 if(v.depriveIntent==="unknown")r.enhancements.push("ASK ABOUT INTENT / DISPOSITION — theft intent is unknown and may affect charge selection.");
 r.why="The person knowingly exercised control over another person's vehicle and the owner did not consent; those are the elements of § 5-36-108.";r.arrest=arrestText(r.classification,v.presence);r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-36-108",URLS.unauthorizedVehicle),source("Arrest authority",URLS.arrest)];r.reportFacts=["Owner identity and vehicle ownership","Specific act of taking/operating/control","How knowing conduct was established","Owner statement denying consent","Keys/access/permission history",...evidenceFacts(v)];r.verbiage="The suspect knowingly [TOOK/OPERATED/EXERCISED CONTROL OVER] the vehicle of [OWNER] without the owner's consent. Lack of consent was established by [OWNER STATEMENT / OTHER FACTS].";return r;
};
evaluators.curfew=v=>{
 const age=Number(v.age);
 if(!Number.isFinite(age))return insufficient("Fort Smith § 14-101","Juvenile age must be established.",[source("Fort Smith curfew",URLS.fsCurfew)]);
 if(age>=18)return insufficient("Fort Smith § 14-101","Curfew applies to a person under 18; entered age is 18 or older.",[source("Fort Smith curfew",URLS.fsCurfew)]);
 if(!["street","outdoor"].includes(v.curfewPlace))return insufficient("Fort Smith § 14-101",v.curfewPlace==="private"?"The entered location is not a city street/right-of-way or other outdoor public place covered by the curfew ordinance.":"Qualifying outdoor-public location is unresolved.",[source("Fort Smith curfew",URLS.fsCurfew)]);
 if(v.curfewTime==="outside")return insufficient("Fort Smith § 14-101","The entered time is outside the applicable curfew period.",[source("Fort Smith curfew",URLS.fsCurfew)]);
 if(v.curfewTime==="unknown")return insufficient("Fort Smith § 14-101","Exact day/time must be verified before curfew enforcement.",[source("Fort Smith curfew",URLS.fsCurfew)]);
 if(v.curfewDefense==="unknown")return insufficient("Fort Smith § 14-102","Ask about the listed curfew defenses before enforcement.",[source("Fort Smith curfew defenses",URLS.fsCurfew)]);
 if(v.curfewDefense!=="none")return insufficient("Fort Smith §§ 14-101—14-102",`A listed curfew defense was selected: ${v.curfewDefense}.`,[source("Fort Smith curfew and defenses",URLS.fsCurfew)]);
 let r=baseResult("Fort Smith Juvenile Curfew Violation","Fort Smith § 14-101","Municipal misdemeanor");
 r.elements=["Person under 18",v.curfewPlace==="street"?"City street / right-of-way":"Other outdoor public place",`Applicable curfew window: ${v.curfewTime}`,"No § 14-102 defense identified"];
 if(v.parentAllows==="yes")r.enhancements.push("RELATED CITY OFFENSE — Fort Smith § 14-103: parent/guardian/responsible adult allowing or permitting the minor's curfew violation.");
 if(v.parentAllows==="unknown")r.enhancements.push("CHECK § 14-103 — whether a responsible adult allowed/permitted the violation is unknown.");
 if(v.businessAllows==="yes")r.enhancements.push("RELATED CITY OFFENSE — Fort Smith § 14-104: operator/person in charge of a business permitting a minor to loiter/loaf/idle there during prohibited hours.");
 if(v.businessAllows==="unknown")r.enhancements.push("CHECK § 14-104 — business-operator responsibility is unknown.");
 r.why="The entered facts place a person under 18 in an outdoor public place during the applicable Fort Smith curfew period, and no § 14-102 defense was selected.";r.arrest=arrestText(r.classification,v.presence);r.penalty="Municipal misdemeanor; penalty/fine governed by Fort Smith § 1-9 unless a more specific provision applies.";r.sources=[source("Fort Smith §§ 14-101—14-106",URLS.fsCurfew),source("Fort Smith § 1-9 penalty",URLS.fsPenalty),source("Arrest authority",URLS.arrest)];r.reportFacts=["DOB / age verification","Exact location and why it is an outdoor public place/right-of-way","Exact date/time and applicable curfew window","Questions asked to rule out each plausible § 14-102 defense","Parent/guardian contact and disposition",...evidenceFacts(v)];r.verbiage="The juvenile, age [AGE], was present at [OUTDOOR PUBLIC LOCATION] during the applicable Fort Smith curfew period. I asked about the defenses listed in § 14-102 and [NO DEFENSE WAS IDENTIFIED / DESCRIBE].";return r;
};

/* ---------- MUNICIPAL LAW SURFACING ON FINAL CHARGE RESULTS ---------- */
function cityLawMatches(moduleId,v,r){
 const out=[];const park=v.locationType==="Park";
 if(moduleId==="curfew")out.push({sec:"Fort Smith §§ 14-101—14-102",title:"Curfew for Minors",why:"This is the controlling municipal offense/defense framework for the current juvenile curfew triage.",url:URLS.fsCurfew});
 if(park&&moduleId==="mischief")out.push({sec:"Fort Smith § 18-70",title:"Damage or removal of park property",why:"If the damaged/removed/defaced property belongs to the park, § 18-70 may be an additional municipal violation. Chapter 18 § 18-58 makes park-rule violations misdemeanors.",url:URLS.fsParks});
 if(park&&moduleId==="disorderly")out.push({sec:"Fort Smith § 18-66",title:"Disruption of recreational programs",why:"If the conduct used abusive/profane/indecent language or was reasonably calculated to annoy/disrupt a recreational program or authorized activity, this park ordinance may apply.",url:URLS.fsParks});
 if(park&&moduleId==="pubintox"&&((v.intoxSigns||[]).includes("alcohol")||(v.intoxSigns||[]).includes("observed")))out.push({sec:"Fort Smith § 18-59",title:"Alcohol in park",why:"If alcohol was actually possessed/consumed/carried in a park, check § 18-59 and its permitted-event/location exceptions. Intoxication alone is not enough for this ordinance.",url:URLS.fsParks});
 if(park&&moduleId==="trespass")out.push({sec:"Fort Smith §§ 18-171—18-177",title:"Trespass warning on city property",why:"If an effective city-property trespass warning already exists, entering/remaining in violation can constitute criminal trespass under § 18-177. Verify warning validity, effective date, property, and exception authorization.",url:URLS.fsParks});
 return out;
}
const v26BaseRenderResult=renderResult;
renderResult=function(r){
 v26BaseRenderResult(r);
 const result=document.querySelector("#result .result");if(!result)return;
 const action=result.querySelector(".result-actions");if(!action)return;
 const city=cityLawMatches(currentModule,currentVals,r);
 const html=`<details class="result-details" open><summary>Enforceable / Applicable Law</summary><div class="result-detail-body">
   <div class="app-law-card state"><span class="law-type">Arkansas State Law</span><h4>${esc(r.statute||"Applicable statute")}</h4><p>${esc(r.charge||"")}</p></div>
   ${city.length?city.map(x=>`<div class="app-law-card city"><span class="law-type city">Fort Smith City Ordinance</span><h4>${esc(x.sec)} — ${esc(x.title)}</h4><p>${esc(x.why)}</p><a target="_blank" rel="noopener" href="${x.url}">Full ordinance ↗</a></div>`).join(""):`<div class="micro">No separate Fort Smith ordinance independently surfaced from the facts entered. Use the Ordinance Quick Reference if additional municipal conduct is present.</div>`}
 </div></details>`;
 action.insertAdjacentHTML("beforebegin",html);
};

/* ---------- FORT SMITH PARK ENFORCEMENT ---------- */
const parkRules=[
 {sec:"18-59",title:"Alcohol in park",short:"Offer/sell/give/use/consume/carry/bring alcohol into park, subject to listed permitted-location/event exceptions.",limit:"Check permitted activity/location exception before citing."},
 {sec:"18-60",title:"Animal unleashed",short:"Nonnative animal in park must be properly leashed; service animal properly harnessed.",limit:"Native park animals excluded."},
 {sec:"18-61",title:"Horse riding",short:"Horse riding prohibited in park areas other than paved public trafficway.",limit:"Paved public trafficway exception."},
 {sec:"18-62",title:"Native birds / animals protected",short:"Do not injure/molest native bird/animal or alter/destroy its habitat.",limit:"Confirm animal is native to park area."},
 {sec:"18-63",title:"Motorized vehicles / cycles / scooters",short:"Motorized vehicles prohibited in park/trail areas other than paved public traffic ways.",limit:"Motorized wheelchair, public-work vehicle, and emergency-responder exceptions."},
 {sec:"18-64",title:"Open fire",short:"No open fire in park except in picnic stoves provided for that purpose.",limit:"Provided picnic-stove exception."},
 {sec:"18-65",title:"Camping / sleeping",short:"Overnight camping and sleeping prohibited except in designated park area.",limit:"Designated park area exception."},
 {sec:"18-66",title:"Disruption of recreational program",short:"Abusive/profane/indecent language or conduct reasonably calculated to annoy/disrupt recreational program or authorized activity prohibited.",limit:"Must relate to a recreational program or authorized activity."},
 {sec:"18-67",title:"Fireworks / firearms",short:"Code text prohibits fireworks/firearms in park.",limit:"Before firearm enforcement, confirm current state-law preemption/exceptions and agency legal guidance."},
 {sec:"18-68",title:"Park curfew",short:"No park activity 11:00 p.m.–6:00 a.m. without written city-administrator authorization.",limit:"Fort Smith Park fishing and boat-ramp loading/unloading exceptions in subsection (b)."},
 {sec:"18-69",title:"Littering",short:"Depositing litter in park unlawful except in furnished containers.",limit:"Confirm park area and actual deposit."},
 {sec:"18-70",title:"Damage / removal of park property",short:"No cutting, injuring, defacing, removing, disturbing, marking, or writing on listed park vegetation/structures/property.",limit:"Also evaluate state Criminal Mischief independently when its elements are met."},
 {sec:"18-71",title:"Posting signs",short:"No posting/pasting/affixing placard, notice, or sign within a park.",limit:"Confirm no permit/authorized-event provision independently applies."},
 {sec:"18-72",title:"Gambling / games of chance",short:"No gambling or games of chance in park.",limit:"Use exact observed conduct."},
 {sec:"18-74",title:"Vehicle rules",short:"No washing vehicles with park water; motor-vehicle operators must obey park parking designations.",limit:"Choose the exact subsection matching conduct."},
 {sec:"18-76",title:"Feeding waterfowl",short:"No feeding goose, duck, or migratory waterfowl in city public park.",limit:"Species/location-specific."},
 {sec:"18-77",title:"Sale / solicitation",short:"Sale, solicitation, or exhibit of goods/services prohibited in park.",limit:"Valid concession/use permit or authorized public-assembly/special-event permit exception."},
 {sec:"18-78",title:"Motorboats — Carol Ann Cross Park",short:"Manned motorized watercraft prohibited in lake at Carol Ann Cross Park.",limit:"Trolling motors, paddled watercraft, remote-control model boats, authorized city/emergency craft exceptions."},
 {sec:"18-79",title:"Tennis courts",short:"Tennis courts restricted to tennis/approved tennis activities; soccer, skateboarding, cycling prohibited.",limit:"Facility-specific."},
 {sec:"18-80",title:"Skate park",short:"Skate park restricted to skateboards, bicycles, and roller blades.",limit:"Facility-specific."},
 {sec:"18-82",title:"Tobacco / vaping",short:"Smoking, smokeless tobacco, e-cigarettes, and vapor products prohibited in city-owned/operated recreational facilities and parks.",limit:"Specific fine schedule in § 18-82(d), rather than generic § 18-58/§ 1-9."}
];
window.openParkEnforcement=function(){
 hideAll();const el=document.getElementById("ordinances");el.classList.remove("hidden");
 el.innerHTML=topTitle("Fort Smith City Park Enforcement","openOrdinances()")+`<div class="hero"><h2>Park misdemeanor quick reference</h2><p>§ 18-58 states that violating a park conduct/activity rule is a misdemeanor and points to § 1-9 for the fine unless a specific section provides otherwise. Select only conduct you actually observed.</p></div>
 <div class="card"><input class="ord-search" id="parkSearch" placeholder="Search: curfew, scooter, alcohol, litter, fire…" oninput="renderParkRules()"><div id="parkRuleList" class="park-grid"></div></div><div id="parkRuleResult"></div>`;
 renderParkRules();scrollTo(0,0);
};
window.renderParkRules=function(){
 const q=(document.getElementById("parkSearch")?.value||"").toLowerCase();const rows=parkRules.filter(x=>!q||`${x.sec} ${x.title} ${x.short}`.toLowerCase().includes(q));
 document.getElementById("parkRuleList").innerHTML=rows.map(x=>`<button class="park-rule" onclick="showParkRule('${x.sec}')"><strong>§ ${x.sec} — ${x.title}</strong><small>${x.short}</small></button>`).join("");
};
window.showParkRule=function(sec){
 const x=parkRules.find(y=>y.sec===sec),r=document.getElementById("parkRuleResult");if(!x)return;
 const special=sec==="18-82"?"Specific § 18-82(d) fine schedule applies.":"§ 18-58: misdemeanor; fine under Fort Smith § 1-9.";
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Fort Smith Park Rule</div><h2>§ ${esc(x.sec)} — ${esc(x.title)}</h2></div><div class="result-grid">
 <div class="block full"><h3>What is prohibited?</h3><p>${esc(x.short)}</p></div><div class="block"><h3>Penalty / enforcement</h3><p>${esc(special)}</p><p><strong>Warrantless arrest:</strong> a misdemeanor/public offense committed in the officer's presence generally falls within § 16-81-106(b)(2)(A), subject to department policy/discretion.</p></div><div class="block"><h3>Left / right limit</h3><p>${esc(x.limit)}</p></div><div class="block full sources"><h3>Full ordinance / penalty</h3><a target="_blank" rel="noopener" href="${URLS.fsParks}">Fort Smith Chapter 18 ↗</a><a target="_blank" rel="noopener" href="${URLS.fsPenalty}">Fort Smith § 1-9 ↗</a></div></div></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};
const v26OldOpenOrdinances=openOrdinances;
openOrdinances=function(){
 v26OldOpenOrdinances();const hero=document.querySelector("#ordinances .hero");
 if(hero&&!document.getElementById("parkEnfJump"))hero.insertAdjacentHTML("afterend",`<div class="section-jump" id="parkEnfJump"><button class="primary-lite" onclick="openParkEnforcement()">City Park Enforcement</button><button onclick="openJuvenile()">Juvenile / Curfew</button></div>`);
};
/* Add current park rules to the general ordinance search too. */
parkRules.forEach(x=>{if(!ordinanceData.some(o=>o.sec===x.sec))ordinanceData.push({sec:x.sec,cat:"Parks",title:x.title,rule:x.short,why:"Fort Smith park rule; § 18-58 makes violations of park conduct/activity rules misdemeanors unless another section controls.",confirm:x.short,except:x.limit});});

/* ---------- SPECIAL VEHICLE: OPTIONAL LIFELINES + NON-DEAD-END RESULTS ---------- */
function specialDock(){return `<div class="special-dock"><button onclick="openSpecialDefinitions()">Key Terms / Definitions</button><button onclick="openSpecialStatutes()">Full Statute(s)</button></div>`;}
window.openSpecialDefinitions=function(){
 const d=sv?.device;let rows=[];
 if(d==="ebike"||d==="electricmc")rows=["electric bicycle","motor wattage","top assisted speed"];
 else if(d==="escooter")rows=["electric motorized scooter","maximum capable speed","shared scooter identification"];
 else if(d==="slingshot")rows=["autocycle","electric autocycle"];
 else rows=["motorcycle","motor-driven cycle","motorized bicycle"];
 const defs=rows.map(t=>{const x=simpleTerm(t);if(x)return `<div class="quick-def"><div class="plain">${esc(t)} — ${esc(x.plain)}</div><div class="why">${esc(x.why)}</div><div class="source"><a target="_blank" rel="noopener" href="${x.url}">${esc(x.cite)} — source ↗</a></div></div>`;return `<div class="quick-def"><div class="plain">${esc(t)}</div><div class="why">See the applicable full statute for the precise definition.</div></div>`;}).join("");
 openSheet("Special Vehicle — Key Terms",defs);
};
window.openSpecialStatutes=function(){
 const d=sv?.device;let links=[];
 if(d==="ebike"||d==="electricmc")links=[{l:"§ 27-51-1702 — E-bike definitions",u:URLS.ebikeClass},{l:"§ 27-51-1704 — Required e-bike label/equipment",u:URLS.ebikeLabel},{l:"§ 27-51-1706 — Class 3 rules",u:URLS.ebikeClass3},{l:"§ 27-20-101 — Motorcycle / motor-driven / motorized bicycle definitions",u:URLS.cycleDef}];
 else if(d==="escooter")links=[{l:"§ 27-51-1902 — Scooter definition",u:URLS.scooterDef},{l:"§ 27-51-1903 — Scooter operation",u:URLS.escooterOp},{l:"§ 27-51-1904 — Shared scooter ID/insurance",u:URLS.scooterShared},{l:"§ 27-51-1905 — Local regulation",u:URLS.escooterLocal}];
 else if(d==="slingshot")links=[{l:"§ 27-20-303 — Autocycle definition",u:URLS.autocycleDef},{l:"§ 27-20-304 — Registration / insurance",u:URLS.autocycleReg},{l:"§ 27-20-306 — License / seat belts / passengers / gear",u:URLS.autocycleOp},{l:"§ 27-20-307 — Electric autocycle roadway limitations",u:URLS.autocycleLimit}];
 else links=[{l:"§ 27-20-101 — Definitions",u:URLS.cycleDef},{l:"§ 27-20-104 — Equipment / rider gear",u:URLS.cycleEquip},{l:"§ 27-20-105 — Registration",u:URLS.cycleReg},{l:"§ 27-20-106 — License",u:URLS.cycleLicense},{l:"§ 27-20-111 — Motorized bicycle",u:URLS.motorizedBicycle}];
 openSheet("Special Vehicle — Full Statutes",links.map(x=>`<a class="stat-row" target="_blank" rel="noopener" href="${x.u}"><strong>${esc(x.l)}</strong><small>Open complete law ↗</small></a>`).join("")+`<a class="stat-row" target="_blank" rel="noopener" href="${URLS.fsParks}"><strong>Fort Smith Chapter 18 — Park Rules</strong><small>Local ordinance source ↗</small></a>`);
};
window.openSpecialLifeline=function(type){
 const d=sv?.device;
 if(type==="identify"){
  openSheet("Help me identify this vehicle",`<div class="quick-def"><div class="plain">Start with physical design — not the marketing name.</div><div class="why">1. Pedals or no pedals? 2. Seat/saddle or standing floorboard? 3. Number of wheels? 4. Gas cc or electric? 5. Steering wheel or handlebars? 6. Then verify the manufacturer/model label.</div></div><div class="mini-def-note">If you cannot resolve a legal category, the app should show the exact missing facts and avoid applying category-specific citations until they are verified.</div>`);return;
 }
 openSpecHelp(type,d);
};
window.openSpecHelp=function(topic,device=sv?.device){
 let title="Where do I find this?",body="";
 if(topic==="ebikeSpecs"||device==="ebike"||device==="electricmc"){
  body=`<div class="quick-def"><div class="plain">E-bike: check the required permanent classification label first.</div><div class="why">Arkansas § 27-51-1704(b) requires a manufacturer/distributor label, at least 9-point font, permanently affixed in a prominent location, identifying <strong>class number, top assisted speed, and motor wattage</strong>.</div><div class="source"><a target="_blank" rel="noopener" href="${URLS.ebikeLabel}">§ 27-51-1704 — full law ↗</a></div></div>
  <div class="help-block"><strong>Practical places to look</strong><div class="help-text">Frame/downtube/seat tube near the battery or crank; steering area; motor hub/housing; controller; battery label; model/serial data plate. Common locations are investigative tips—not statutory placement requirements beyond “prominent location.”</div></div>
  <div class="help-block"><strong>If the label is missing / altered</strong><div class="help-text">Record that fact and photograph it. A speed/engagement modification requires appropriate replacement of the classification label under § 27-51-1704(c). If specifications still cannot be verified, use the exact model/serial number and manufacturer specifications rather than estimating.</div></div>
  <div class="help-block"><strong>Voltage is NOT wattage</strong><div class="help-text">A 48 V or 72 V battery label does not establish motor wattage. Volts × amps can estimate electrical input, but the app should not treat that as manufacturer-rated motor wattage for the statutory &lt;750 W e-bike gate.</div></div>`;
 }else if(topic==="scooterSpeed"||device==="escooter"){
  body=`<div class="quick-def"><div class="plain">Scooter: verify maximum capability from the exact device/model — do not estimate it from one observed speed.</div><div class="why">§ 27-51-1902 requires a qualifying electric motorized scooter to have a maximum speed of 20 mph on a paved level surface. Arkansas does not impose the same class/speed/wattage placard rule used for e-bikes.</div><div class="source"><a target="_blank" rel="noopener" href="${URLS.scooterDef}">§ 27-51-1902 — full law ↗</a></div></div>
  <div class="help-block"><strong>Where to look</strong><div class="help-text">Manufacturer/model label on stem/deck/underside; model number/serial; controller label; onboard manufacturer settings; exact-model manufacturer specifications.</div></div>
  <div class="help-block"><strong>Shared scooter</strong><div class="help-text">A shared scooter must display a unique alphanumeric ID visible from five feet under § 27-51-1904. That ID requirement is different from an ordinary scooter speed/wattage placard.</div></div>`;
 }else if(topic==="cc"||device==="gascycle"){
  body=`<div class="quick-def"><div class="plain">Gas cycle: verify engine displacement in cubic centimeters (cc).</div><div class="why">Arkansas separates motorized bicycle (≤50 cc + automatic), motor-driven cycle (≤250 cc excluding motorized bicycle), and motorcycle (&gt;250 cc).</div><div class="source"><a target="_blank" rel="noopener" href="${URLS.cycleDef}">§ 27-20-101 — definitions ↗</a></div></div><div class="help-block"><strong>Where to look</strong><div class="help-text">Engine case/cylinder marking, frame/VIN/data plate, manufacturer model sticker, MSO/title information, or exact-model manufacturer specifications. Do not guess displacement from appearance.</div></div>`;
 }else{
  body=`<div class="help-text">Use the permanent manufacturer/data label, model/serial number, motor/controller/battery markings, and exact-model manufacturer specifications. Prefer a source tied to the exact device over visual estimation.</div>`;
 }
 openSheet(title,body);
};

const v26OldOpenSpecial=openSpecialVehicle;
openSpecialVehicle=function(){
 v26OldOpenSpecial();const el=document.getElementById("special");if(el&&!document.getElementById("specialDockV26")){const wrap=document.createElement("div");wrap.id="specialDockV26";wrap.innerHTML=specialDock();el.appendChild(wrap);}
 const hero=document.querySelector("#special .hero");if(hero&&!document.getElementById("specialLifeTop"))hero.insertAdjacentHTML("afterend",`<div class="lifeline-row" id="specialLifeTop"><button class="lifeline" onclick="openSpecialLifeline('identify')">I’m not sure what this is</button><button class="lifeline" onclick="openSpecialLifeline('specs')">Where do I find the specs?</button></div>`);
};

const v26OldRenderSVDynamic=renderSVDynamic;
renderSVDynamic=function(){
 if(sv.device==="slingshot"){
  const el=document.getElementById("svDynamic");let h=`<div class="tier-title required">Step 2 — objective classification facts</div>`;
  h+=svTri("threeTires","Three tires?");
  h+=svTri("steeringWheel","Steering wheel?");
  h+=svTri("nonStraddle","Seating does NOT require the operator to straddle / sit astride?");
  h+=`<div class="tier-title optional">Equipment compliance — does NOT hide the baseline laws</div>`;
  h+=svTri("headlights","Required headlights present / working?");
  h+=svTri("tailLamps","Required tail lamps present / working?");
  h+=svTri("brakes","Required brakes present / working?");
  h+=svTri("horn","Working horn present?");
  h+=svTri("signals","Required signal lamps present / working?");
  h+=svTri("electricAuto","Is this autocycle electrically powered?","If YES, § 27-20-307 adds roadway limitations and no muffler is required by § 27-20-303(b).");
  h+=svDropdown("roadLocation","Where is it being operated?",[["publicroad","Public street / highway"],["sidewalk","Sidewalk"],["bikepath","Bicycle / multi-use path"],["fspark","Fort Smith park / trail"],["private","Private property"],["other","Other / unknown"]],"Location can surface state roadway limitations and Fort Smith ordinances.");
  el.innerHTML=h;return;
 }
 v26OldRenderSVDynamic();
 const el=document.getElementById("svDynamic");if(!el)return;
 const qs=[...el.querySelectorAll(".q")];
 qs.forEach(q=>{
  const label=q.querySelector("label");if(!label||q.querySelector(".spec-help"))return;const t=label.textContent.toLowerCase();
  if(/wattage|assisted-speed|top motor-assisted|classification label/.test(t))label.insertAdjacentHTML("beforeend",`<button type="button" class="spec-help" onclick="event.stopPropagation();openSpecHelp('ebikeSpecs')">Where do I find this?</button>`);
  else if(/maximum capable speed|maximum capability/.test(t))label.insertAdjacentHTML("beforeend",`<button type="button" class="spec-help" onclick="event.stopPropagation();openSpecHelp('scooterSpeed')">Where do I find this?</button>`);
  else if(/engine displacement|cc/.test(t))label.insertAdjacentHTML("beforeend",`<button type="button" class="spec-help" onclick="event.stopPropagation();openSpecHelp('cc')">Where do I find this?</button>`);
 });
};

function specialKnownFacts(){
 const d=sv.device,out=[];
 if(d==="ebike"||d==="electricmc"){
  if(sv.pedals)out.push(`Operable pedals: ${sv.pedals}`);if(sv.seat23)out.push(`Seat/saddle + ≤3 wheels: ${sv.seat23}`);if(sv.watts)out.push(`Verified wattage: ${sv.watts} W`);if(sv.assistMode)out.push(`Motor operation: ${sv.assistMode}`);if(sv.assistCutoff)out.push(`Assist cutoff: ${sv.assistCutoff} mph`);if(sv.specSource)out.push(`Spec source: ${sv.specSource}`);
 }else if(d==="escooter"){
  if(sv.under100)out.push(`<100 lb: ${sv.under100}`);if(sv.wheels23)out.push(`2/3 wheels: ${sv.wheels23}`);if(sv.handlebar)out.push(`Handlebar: ${sv.handlebar}`);if(sv.floorboard)out.push(`Standing floorboard: ${sv.floorboard}`);if(sv.maxCapSpeed)out.push(`Max capable speed: ${sv.maxCapSpeed} mph`);
 }else if(d==="gascycle"){
  if(sv.seat23)out.push(`Seat/saddle + ≤3 wheels: ${sv.seat23}`);if(sv.cc)out.push(`Engine displacement: ${sv.cc} cc`);if(sv.automatic)out.push(`Automatic transmission: ${sv.automatic}`);
 }
 return out;
}
function specialMissingFacts(){
 const d=sv.device,m=[];
 if(d==="ebike"||d==="electricmc"){
  if(!sv.pedals||sv.pedals==="unknown")m.push({k:"Operable pedals",help:"ebikeSpecs"});
  if(!sv.specSource||sv.specSource==="unknown")m.push({k:"Reliable specification source",help:"ebikeSpecs"});
  if(!sv.watts)m.push({k:"Manufacturer-rated motor wattage",help:"ebikeSpecs"});
  if(!sv.assistMode||sv.assistMode==="unknown")m.push({k:"Pedal-assist vs throttle/independent propulsion",help:"ebikeSpecs"});
  if(!sv.assistCutoff||sv.assistCutoff==="unknown")m.push({k:"Top motor-assisted speed / cutoff",help:"ebikeSpecs"});
  if((eBikeResolvedClass()==="not-ebike"||sv.device==="electricmc")&&(!sv.seat23||sv.seat23==="unknown"))m.push({k:"Seat/saddle and wheel count for motor-vehicle branch",help:"identify"});
 }else if(d==="escooter"){
  [["under100","Weight under 100 lb"],["wheels23","Two or three wheels"],["handlebar","Handlebar"],["floorboard","Standing floorboard"]].forEach(x=>{if(!sv[x[0]]||sv[x[0]]==="unknown")m.push({k:x[1],help:"scooterSpeed"})});
  if(!sv.speedSource||sv.speedSource==="unknown")m.push({k:"Reliable maximum-speed specification source",help:"scooterSpeed"});
  if(!sv.maxCapSpeed)m.push({k:"Maximum capable speed on paved level surface",help:"scooterSpeed"});
 }else if(d==="gascycle"){
  if(!sv.seat23||sv.seat23==="unknown")m.push({k:"Seat/saddle and wheel count",help:"identify"});
  if(!sv.cc)m.push({k:"Engine displacement (cc)",help:"cc"});
  if(Number(sv.cc)<=50&&(!sv.automatic||sv.automatic==="unknown"))m.push({k:"Automatic transmission status",help:"cc"});
 }
 return m;
}

const v26OldClassifySpecial=classifySpecial;
classifySpecial=function(){
 if(sv.device!=="slingshot"){v26OldClassifySpecial();return;}
 const core=["threeTires","steeringWheel","nonStraddle"],missing=core.filter(k=>!sv[k]||sv[k]==="unknown"),conflict=core.filter(k=>sv[k]==="no");
 const equipment=["headlights","tailLamps","brakes","horn","signals"];
 const eLabels={headlights:"headlights",tailLamps:"tail lamps",brakes:"brakes",horn:"working horn",signals:"signal lamps"};
 const checks=[
  {id:"acLicense18",label:"Operator age 18+ has no valid regular driver's license",stat:"§ 27-20-306(a)(1)",why:"An autocycle operator 18+ must hold a valid driver's license; a motorcycle endorsement is not required.",confirm:"Confirm operator age and license status."},
  {id:"acUnder18License",label:"Operator under 18 lacks required permit/learner/intermediate license or violates restrictions",stat:"§ 27-20-306(a)(2)",why:"Under-18 operation requires a listed credential and compliance with its restrictions.",confirm:"Confirm DOB, credential, and restrictions."},
  {id:"acSeatbelt",label:"Operator or passenger not wearing required seat belt",stat:"§ 27-20-306(b)",why:"Mandatory seat-belt use applies to operator and passengers.",confirm:"Confirm occupant and belt use."},
  {id:"acHelmet",label:"No qualifying enclosed cab + occupant under 21 has no helmet",stat:"§ 27-20-306(c) + § 27-20-104(b)(1)",why:"Without the statutory enclosed-cab exception, the under-21 helmet rule applies.",confirm:"Confirm age and cab construction/safety-glass/mirror exception."},
  {id:"acEye",label:"No qualifying enclosed cab + occupant lacks protective eye/face equipment",stat:"§ 27-20-306(c) + § 27-20-104(b)(2)",why:"Without qualifying enclosed cab, eye/face protection is required.",confirm:"Confirm cab-exception status."},
  {id:"acSeats",label:"Passengers exceed manufacturer-provided seats",stat:"§ 27-20-306(d)(1)",why:"Passenger count may not exceed manufacturer-provided seats.",confirm:"Count occupants and manufacturer seats."},
  {id:"acChild",label:"Child passenger without qualifying enclosed cab OR passenger under 8 on street/highway",stat:"§ 27-20-306(e)-(f); § 27-20-118",why:"Child-passenger use requires qualifying enclosed cab and the under-8 passenger restriction also applies.",confirm:"Confirm passenger age, roadway, cab standard, and parade exception."},
  {id:"acInsurance",label:"No required insurance",stat:"§§ 27-20-303(c), 27-20-304(b)",why:"Autocycle is a motor vehicle for minimum liability insurance and proof accompanies registration.",confirm:"Verify actual coverage."}
 ];
 equipment.forEach(k=>checks.push({id:`acEq_${k}`,label:`Required ${eLabels[k]} missing / inoperative`,stat:k==="signals"?"§ 27-20-303(a)(8) / § 27-36-216":`§ 27-20-303(a) — ${eLabels[k]}`,why:`${eLabels[k]} are part of the statutory autocycle equipment requirements.`,confirm:`Confirm and document the exact ${eLabels[k]} defect.`}));
 if(sv.electricAuto==="yes")checks.push({id:"acElectricRoad",label:"Electric autocycle operated on prohibited roadway",stat:"§ 27-20-307",why:"Electric autocycles have additional interstate/controlled-access/>55 mph/cannot-maintain-speed restrictions.",confirm:"Confirm roadway type, posted speed, and vehicle capability."});
 if(sv.roadLocation==="fspark")checks.push({id:"acPark",label:"Operated in Fort Smith park/trail off paved public traffic way",stat:"Fort Smith § 18-63",why:"Fort Smith prohibits motorized vehicles on park/trail areas other than paved public traffic ways, subject to listed exceptions.",confirm:"Confirm exact park/trail surface and exception status."});
 let title,why=[],limits=[];
 if(conflict.length||missing.length){
  title="PROVISIONAL AUTOCYCLE / SLINGSHOT — Verify Classification";
  if(conflict.length)why.push(`Conflicting core fact(s): ${conflict.map(x=>({threeTires:"three tires",steeringWheel:"steering wheel",nonStraddle:"non-straddle seating"}[x])).join(", ")}.`);
  if(missing.length)why.push(`Unresolved core fact(s): ${missing.map(x=>({threeTires:"three tires",steeringWheel:"steering wheel",nonStraddle:"non-straddle seating"}[x])).join(", ")}.`);
  why.push("Because the officer selected Polaris Slingshot / steering-wheel 3-wheeler, baseline autocycle laws remain visible as a provisional field reference while the conflicting fact is verified.");
  limits.push("Do not treat the provisional label as final legal classification if a core § 27-20-303 characteristic truly is absent.");
 }else{
  title="Autocycle / Polaris Slingshot — Classification Supported";why=["Three tires confirmed.","Steering wheel confirmed.","Non-straddle seating confirmed.","Equipment compliance is evaluated separately so an equipment defect does not erase the baseline rules."];
 }
 const badEq=equipment.filter(k=>sv[k]==="no"),unkEq=equipment.filter(k=>!sv[k]||sv[k]==="unknown");
 if(badEq.length)why.push(`Equipment defect(s) entered: ${badEq.map(k=>eLabels[k]).join(", ")}. These are surfaced as compliance/citation checks.`);
 if(unkEq.length)limits.push(`Still verify equipment: ${unkEq.map(k=>eLabels[k]).join(", ")}.`);
 const rules=[
  ["DRIVER LICENSE","18+: valid regular driver's license; NO motorcycle endorsement. Under 18: valid instruction permit, learner's, or intermediate license + its restrictions. § 27-20-306(a)."],
  ["REGISTRATION / INSURANCE","May be registered/licensed as a motorcycle; proof of insurance is required with registration. §§ 27-20-303(c), 27-20-304."],
  ["SEAT BELTS","Operator and all passengers must comply with mandatory seat-belt use. § 27-20-306(b)."],
  ["HELMET / EYE PROTECTION","Unless qualifying fully enclosed metal/metal-reinforced cab + safety glass/mirrors: helmet under 21 + protective glasses/goggles/face shield. § 27-20-306(c)."],
  ["PASSENGERS / CHILDREN","No more passengers than manufacturer seats. Child passenger requires qualifying enclosed cab; § 27-20-118 also applies. § 27-20-306(d)-(f)."],
  ["ROOF / CAB","No general roof requirement for adult operation. The qualifying enclosed cab matters for rider gear and child-passenger rules."],
  ["RULES OF ROAD","Registered autocycle follows ordinary rules of the road and their penalties. § 27-20-305."],
  ["ELECTRIC AUTOCYCLE","If electrically powered, additional roadway limits apply under § 27-20-307; no muffler required under § 27-20-303(b)."]
 ];
 window.svClass=svClassResult("autocycle",title,why,rules,checks,[source("Autocycle definition",URLS.autocycleDef),source("Registration / insurance",URLS.autocycleReg),source("Operation / passengers",URLS.autocycleOp),source("Electric roadway limits",URLS.autocycleLimit),source("Fort Smith park rules",URLS.fsParks)],limits);
 renderSpecialResult(window.svClass);
};

const v26OldRenderSpecialResult=renderSpecialResult;
renderSpecialResult=function(c){
 /* Exact missing-fact screen for non-Slingshot unresolved classifications. */
 if(c&&c.key==="unresolved"&&sv.device!=="slingshot"){
  const missing=specialMissingFacts(),known=specialKnownFacts();
  const result=document.getElementById("svResult");
  result.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Vehicle Classification</div><h2>Classification Not Yet Resolved</h2></div><div class="result-grid">
   <div class="block full"><h3>What is preventing classification?</h3>${missing.length?`<div class="missing-box"><strong>Need ${missing.length} more fact${missing.length===1?"":"s"}</strong><ul>${missing.map(x=>`<li>${esc(x.k)} <button class="spec-help" onclick="openSpecialLifeline('${x.help}')">Help me find it</button></li>`).join("")}</ul></div>`:`<div class="missing-box"><strong>Entered facts conflict with a statutory category.</strong> Use the identification lifeline and verify exact model/specifications.</div>`}
   ${known.length?`<div class="known-box"><strong>Already established</strong><ul>${known.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}
   <div class="lifeline-row"><button class="lifeline" onclick="openSpecialLifeline('identify')">Help me identify this vehicle</button><button class="lifeline" onclick="openSpecialLifeline('${sv.device==="escooter"?"scooterSpeed":sv.device==="gascycle"?"cc":"ebikeSpecs"}')">Where do I find the missing specs?</button></div></div>
   <div class="block full"><h3>Enforcement status</h3><p>Category-specific citation checks are withheld only when legal classification truly cannot be resolved. Complete the missing facts above; the app will then load applicable Arkansas statutes and matching Fort Smith ordinances.</p></div>
   <div class="block full sources"><h3>Primary Sources</h3>${(c.sources||[]).map(x=>`<a target="_blank" rel="noopener" href="${x.url}">${esc(x.label)} ↗</a>`).join("")}</div>
  </div></div><div id="svCitations"></div>`;
  result.scrollIntoView({behavior:"smooth",block:"start"});return;
 }
 v26OldRenderSpecialResult(c);
 const res=document.querySelector("#svResult .vehicle-result");if(!res)return;
 /* State + city enforceable portion for resolved/provisional special vehicles. */
 const grid=res.querySelector(".result-grid");if(grid){
  let city="";
  if(sv.roadLocation==="fspark")city=`<div class="app-law-card city"><span class="law-type city">Fort Smith City Ordinance</span><h4>§ 18-63 — Motorized vehicles in parks/trails</h4><p>Motorized vehicles, including cycles and scooters, are prohibited in park/trail areas other than paved public traffic ways, subject to motorized-wheelchair/public-work/emergency-responder exceptions.</p><a target="_blank" rel="noopener" href="${URLS.fsParks}">Full ordinance ↗</a></div>`;
  if((sv.device==="ebike"||sv.device==="electricmc")&&sv.roadLocation==="sidewalk")city+=`<div class="app-law-card city"><span class="law-type city">Fort Smith City Ordinance — Conditional</span><h4>§ 24-176 — Bicycle on CBD sidewalk</h4><p>If the location is a sidewalk in the central business district and the device legally qualifies as a bicycle/e-bike, check the local sidewalk prohibition and police-officer exception.</p><a target="_blank" rel="noopener" href="${URLS.fortSmithCode}">Full municipal code ↗</a></div>`;
  grid.insertAdjacentHTML("beforeend",`<div class="block full"><h3>Enforceable / Applicable Law</h3><div class="app-law-card state"><span class="law-type">Arkansas State Law</span><h4>${esc(c.title)}</h4><p>Use the Quick Law and citation checks above; each check identifies its controlling state section.</p></div>${city||`<div class="micro">No separate Fort Smith ordinance surfaced from the selected location/device facts.</div>`}</div>`);
 }
};

/* ---------- INFOGRAPHIC LIBRARY ITEMS ---------- */
[
 ["Residential / Aggravated Burglary","ref-residential-burglary.png"],
 ["Commercial Burglary","ref-commercial-burglary.png"],
 ["Breaking or Entering","ref-breaking-entering.png"],
 ["Unauthorized Use of Vehicle","ref-unauthorized-use-vehicle.png"],
 ["Fort Smith Juvenile Curfew","ref-juvenile-curfew.png"],
 ["Fort Smith Park Ordinances","ref-city-park-ordinances.png"]
].forEach(x=>{if(!libraryItems.some(y=>y[1]===x[1]))libraryItems.push(x)});


/* ---------- V2.6 FINAL FIELD REFINEMENTS ----------
   Separate Residential / Commercial entry points to reduce unnecessary decisions,
   refine aggravated-residential logic, and complete Special Vehicle definitions. */
(()=>{
 const items=criminalCats.property.items;
 const bidx=items.findIndex(x=>x[0]==="burglary");
 if(bidx>=0)items.splice(bidx,1,
  ["resburglary","Residential Burglary","Residential Burglary → Aggravated Residential Burglary variants"],
  ["comburglary","Commercial Burglary","Commercial Burglary → pharmacy enhancement"]
 );
 modules.resburglary={
  title:"Residential Burglary",subtitle:"Start with unlawful entry/remain and criminal purpose; the app then checks Aggravated Residential Burglary.",
  required:[
   qSeg("unlawfulEntry","Did the person enter or remain unlawfully?",[["yes","YES — no license / privilege"],["no","NO — entry/remain was licensed or privileged"],["unknown","UNKNOWN — verify authority / public-access facts"]],true),
   qSelect("intendedOffense","At entry/remain, what offense was the person PURPOSELY intending to commit inside?",[["theft","Theft"],["felony","Felony"],["misd","Misdemeanor punishable by imprisonment"],["unknown","Unknown / intent not yet established"]],true,"The intended offense does not have to be a felony if it is punishable by imprisonment.")
  ],
  enhancement:[
   qSeg("occupied","Was the residential occupiable structure occupied by another person?",yesNoUnknown,false,"YES creates an Aggravated Residential Burglary pathway."),
   qSeg("armed","Was the suspect armed with a deadly weapon OR did the suspect represent by word/conduct that they were armed?",yesNoUnknown,false,"YES creates Aggravated Residential Burglary and a Class Y classification."),
   qSeg("deathSPI","If aggravated by occupancy: did the suspect cause or attempt death or serious physical injury?",yesNoUnknown,false,"This can elevate an occupancy-based aggravated offense to Class Y.",v=>v.occupied==="yes"&&v.armed!=="yes"),
   {...municipalLocationQ}
  ],
  report:[...contextQuestions,...evidenceQuestions]
 };
 modules.comburglary={
  title:"Commercial Burglary",subtitle:"Commercial structure + unlawful entry/remain + purpose to commit an imprisonable offense; pharmacy status is checked separately.",
  required:[
   qSeg("unlawfulEntry","Did the person enter or remain unlawfully?",[["yes","YES — no license / privilege"],["no","NO — entry/remain was licensed or privileged"],["unknown","UNKNOWN — verify authority / public-access facts"]],true),
   qSelect("intendedOffense","At entry/remain, what offense was the person PURPOSELY intending to commit inside?",[["theft","Theft"],["felony","Felony"],["misd","Misdemeanor punishable by imprisonment"],["unknown","Unknown / intent not yet established"]],true,"The intended offense does not have to be a felony if it is punishable by imprisonment.")
  ],
  enhancement:[qSeg("pharmacy","Was the commercial occupiable structure a pharmacy?",yesNoUnknown,false,"YES adds the statutory consecutive five-year sentence enhancement."),{...municipalLocationQ}],
  report:[...contextQuestions,...evidenceQuestions]
 };
 const oldCat=categoryFor;
 categoryFor=function(id){if(["resburglary","comburglary"].includes(id))return "property";return oldCat(id)};

 moduleDefinitions.resburglary=moduleDefinitions.burglary;
 moduleDefinitions.comburglary=moduleDefinitions.burglary;
 relatedTermsByQuestion.resburglary={unlawfulEntry:["enter or remain unlawfully"],intendedOffense:["purposely","offense punishable by imprisonment"],armed:["deadly weapon"],deathSPI:["serious physical injury"]};
 relatedTermsByQuestion.comburglary={unlawfulEntry:["enter or remain unlawfully"],intendedOffense:["purposely","offense punishable by imprisonment"]};
 qWhy.resburglary={unlawfulEntry:qWhy.burglary.unlawfulEntry,intendedOffense:qWhy.burglary.intendedOffense,occupied:qWhy.burglary.occupied,armed:qWhy.burglary.armed,deathSPI:qWhy.burglary.deathSPI};
 qWhy.comburglary={unlawfulEntry:qWhy.burglary.unlawfulEntry,intendedOffense:qWhy.burglary.intendedOffense,pharmacy:qWhy.burglary.pharmacy};

 const oldLinks=statuteLinks;
 statuteLinks=function(){
  if(currentModule==="resburglary")return [{label:"§ 5-39-201(a) — Residential Burglary",url:URLS.burglary201},{label:"§ 5-39-204 — Aggravated Residential Burglary",url:URLS.aggravatedBurglary},{label:"§ 5-39-101 — Burglary Definitions",url:URLS.burglaryDefs}];
  if(currentModule==="comburglary")return [{label:"§ 5-39-201(b) — Commercial Burglary",url:URLS.burglary201},{label:"§ 5-39-101 — Burglary Definitions",url:URLS.burglaryDefs}];
  return oldLinks();
 };

 function residentialEval(v){
  if(v.unlawfulEntry!=="yes")return insufficient("§ 5-39-201(a)",v.unlawfulEntry==="no"?"Entry/remain was licensed or privileged; unlawful entry/remain is not established.":"Verify whether the person had license or privilege to enter/remain.",[source("Residential Burglary",URLS.burglary201),source("Definitions",URLS.burglaryDefs)]);
  if(!v.intendedOffense||v.intendedOffense==="unknown")return insufficient("§ 5-39-201(a)","Purpose to commit an offense punishable by imprisonment inside the structure is not yet established.",[source("Residential Burglary",URLS.burglary201)]);
  /* Armed/representation independently establishes aggravated + Class Y. */
  if(v.armed==="yes"){
   let r=baseResult("Aggravated Residential Burglary","§ 5-39-204(a)(2), (b)(1)(A)","Class Y felony");
   r.elements=["Residential Burglary established","Armed with deadly weapon OR represented by word/conduct being armed"];
   if(v.occupied==="yes")r.elements.push("Residential structure occupied by another person");
   if(v.deathSPI==="yes")r.elements.push("Caused or attempted death / serious physical injury");
   r.why="Residential Burglary is established and the armed/representation fact independently satisfies § 5-39-204(a)(2); that pathway is Class Y.";
   r.arrest=arrestText(r.classification,"no");r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-39-204",URLS.aggravatedBurglary),source("§ 5-39-201(a)",URLS.burglary201),source("Definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];
   r.reportFacts=["Why structure is a residential occupiable structure","How entry/remain was unlawful","Intended imprisonable offense and purpose facts","Weapon or representation facts",v.occupied==="yes"?"Occupancy facts":"",...evidenceFacts(v)].filter(Boolean);r.verbiage="The suspect entered/remained unlawfully in another person's residential occupiable structure with the purpose of committing [OFFENSE] inside and was armed with / represented being armed with [WEAPON / REPRESENTATION].";return r;
  }
  if(v.armed==="unknown")return insufficient("§§ 5-39-201(a), 5-39-204","Verify whether the suspect was armed or represented being armed; that fact independently creates a Class Y Aggravated Residential Burglary pathway.",[source("Aggravated Residential Burglary",URLS.aggravatedBurglary)]);
  /* Armed is NO. Occupancy decides whether aggravated exists. */
  if(v.occupied==="unknown")return insufficient("§§ 5-39-201(a), 5-39-204","Verify whether another person occupied the residential structure; occupancy changes Residential Burglary to Aggravated Residential Burglary.",[source("Aggravated Residential Burglary",URLS.aggravatedBurglary)]);
  if(v.occupied==="yes"){
   if(v.deathSPI==="unknown")return insufficient("§ 5-39-204","Occupancy establishes Aggravated Residential Burglary, but death/serious-injury attempt/result is unknown and changes Class A to Class Y.",[source("Aggravated Residential Burglary",URLS.aggravatedBurglary)]);
   const y=v.deathSPI==="yes";let r=baseResult("Aggravated Residential Burglary",y?"§ 5-39-204(a)(1), (b)(1)(B)":"§ 5-39-204(a)(1), (b)(2)",y?"Class Y felony":"Class A felony");
   r.elements=["Residential Burglary established","Residential structure occupied by another person",y?"Caused or attempted death / serious physical injury":"No death / serious-injury Class Y fact selected"];
   r.why=y?"Occupancy establishes Aggravated Residential Burglary and the death/serious-injury fact independently elevates it to Class Y.":"Occupancy establishes Aggravated Residential Burglary; without an armed/representation or death/serious-injury Class Y fact, the offense is Class A.";
   r.arrest=arrestText(r.classification,"no");r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-39-204",URLS.aggravatedBurglary),source("§ 5-39-201(a)",URLS.burglary201),source("Definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];r.reportFacts=["Residential structure definition","Unlawful entry/remain facts","Intended imprisonable offense / purpose","Who occupied the structure and how confirmed",y?"Death / serious-injury attempt/result":"",...evidenceFacts(v)].filter(Boolean);r.verbiage="The suspect entered/remained unlawfully in another person's occupied residential occupiable structure with the purpose of committing [OFFENSE] inside. [INJURY/ATTEMPT FACTS IF APPLICABLE].";return r;
  }
  let r=baseResult("Residential Burglary","§ 5-39-201(a)(1)-(2)","Class B felony");r.elements=["Entered/remained unlawfully","Residential occupiable structure of another","Purpose to commit an offense punishable by imprisonment inside","No aggravated-residential-burglary fact established"];
  r.why="The residential structure, unlawful entry/remain, and intended imprisonable offense elements are established. Occupancy and armed/representation aggravators are not established.";r.arrest=arrestText(r.classification,"no");r.penalty=penaltyFor(r.classification);r.sources=[source("§ 5-39-201(a)",URLS.burglary201),source("§ 5-39-101 definitions",URLS.burglaryDefs),source("Arrest authority",URLS.arrest)];r.reportFacts=["Why structure is residential occupiable","How entry/remain was unlawful","Intended offense and facts showing purpose existed at entry/remain",...evidenceFacts(v)];r.verbiage="The suspect entered/remained unlawfully in another person's residential occupiable structure with the purpose of committing [OFFENSE PUNISHABLE BY IMPRISONMENT] inside.";return r;
 }
 function commercialEval(v){
  return evaluators.burglary({...v,structureType:"commercial"});
 }
 evaluators.resburglary=residentialEval;
 evaluators.comburglary=commercialEval;

 Object.assign(simpleTermIndex,{
  "motorcycle":{plain:"A motor vehicle with a seat/saddle, no more than 3 wheels, and an engine over 250 cc under Chapter 20's gas-engine definition.",why:"This category carries motorcycle licensing, registration, insurance, rider-gear, passenger, and equipment rules.",cite:"§ 27-20-101(1)",url:URLS.cycleDef},
  "motor-driven cycle":{plain:"A seated motor vehicle with no more than 3 wheels and an engine of 250 cc or less, excluding the separate motorized-bicycle category.",why:"Age 14–15 can use the special ≤250 cc license route; age 16+ follows the motorcycle-operator-license rule.",cite:"§§ 27-20-101(2), 27-20-106",url:URLS.cycleDef},
  "motorized bicycle":{plain:"A bicycle-type vehicle with automatic transmission and an engine of 50 cc or less; Arkansas expressly excludes an electric bicycle from this definition.",why:"It has its own certificate/license, location, equipment, and passenger rules and is not the same as a motor-driven cycle.",cite:"§ 27-20-101(3)",url:URLS.cycleDef},
  "electric motorized scooter":{plain:"Under 100 lb., 2 or 3 wheels, handlebar, standing floorboard, electric motor, and maximum capable speed of 20 mph or less on a paved level surface.",why:"Maximum capable speed classifies the device; actual operation over 15 mph is a separate operating rule.",cite:"§ 27-51-1902",url:URLS.scooterDef},
  "shared scooter identification":{plain:"A shared scooter must carry a unique alphanumeric identification number visible from five feet.",why:"This is a shared-scooter ID requirement; it is not the same as the e-bike class/speed/wattage label.",cite:"§ 27-51-1904",url:URLS.scooterShared},
  "electric autocycle":{plain:"An autocycle propelled by an electric motor; additional roadway restrictions apply.",why:"Electric autocycles may not use interstates and face additional controlled-access / speed-capability restrictions.",cite:"§ 27-20-307",url:URLS.autocycleLimit}
 });
})();
