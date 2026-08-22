/* ==========================================================
   V3.2 FIELDING RELEASE
   Completes the approved noncommercial licensing, Theft of
   Services, and common-traffic expansion.
   ========================================================== */

Object.assign(URLS,{
 theftServices:"https://law.justia.com/codes/arkansas/title-5/subtitle-4/chapter-36/subchapter-1/section-5-36-104/",
 licenseClasses:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-8/section-27-16-801/",
 instructionPermit:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-8/section-27-16-802/",
 restrictedLicense:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-8/section-27-16-804/",
 licensePenalty:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-3/section-27-16-301/",
 suspendedLicense:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-3/section-27-16-303/",
 licenseCarry:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-6/section-27-16-601/",
 noLicense:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-16/subchapter-6/section-27-16-602/",
 driverLicenseKey:"https://www.ark.org/itvr-demo/dlinfo.html",
 act928:"https://arkleg.state.ar.us/Acts/FTPDocument?ddBienniumSession=2025%2F2025R&file=928.pdf&path=%2FACTS%2F2025R%2FPublic%2F",
 speeding:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-2/section-27-51-201/",
 speedingClass:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-50/subchapter-3/section-27-50-302/",
 schoolSpeed:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-2/section-27-51-212/",
 schoolSpeedPenalty:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-2/section-27-51-214/",
 careless:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-51/subchapter-1/section-27-51-104/",
 insuranceImpound:"https://law.justia.com/codes/arkansas/title-27/subtitle-2/chapter-22/subchapter-1/section-27-22-109/",
 tailLamps:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-215/",
 signalLamps:"https://law.justia.com/codes/arkansas/title-27/subtitle-3/chapter-36/subchapter-2/section-27-36-216/",
 trafficDevices:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-52/subchapter-1/section-27-52-103/",
 trafficSignals:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-52/subchapter-1/section-27-52-107/",
 flashingSignals:"https://law.justia.com/codes/arkansas/title-27/subtitle-4/chapter-52/subchapter-1/section-27-52-108/"
});

/* -------------------- THEFT OF SERVICES -------------------- */
modules.theftservices={
 title:"Theft of Services",
 subtitle:"Includes dine-and-dash, lodging, transportation, labor, utility diversion, and other compensated services.",
 required:[
  qSeg("purposeDefraud","Was there a PURPOSE TO DEFRAUD?",[["yes","YES"],["no","NO"],["unknown","UNKNOWN — need more facts"]],true,"The offense begins with purpose to defraud; nonpayment by itself is not enough."),
  qChoice("serviceRoute","Which statutory route fits?",[
   {v:"obtain",k:"PURPOSELY OBTAINED",tone:"purpose",t:"a service known to be available only for compensation, by deception, threat, or other means to avoid payment"},
   {v:"divert",k:"PURPOSELY DIVERTED",tone:"purpose",t:"a service while controlling its disposition, despite not being entitled to it"}
  ],true),
  qSelect("serviceType","What service was involved?",[
   ["restaurant","Food / beverage — dine-and-dash"],["lodging","Hotel / lodging"],["transport","Taxi / rideshare / transportation"],
   ["labor","Labor / professional service"],["admission","Admission / rental / other compensated service"],["utility","Gas / electric / water / telephone / cable utility"],["other","Other service"]
  ],true),
  qSelect("avoidMethod","If obtained: how was payment avoided?",[
   ["deception","Deception"],["threat","Threat"],["abscond","Left / absconded without payment"],["other","Other purposeful means to avoid payment"]
  ],true,"Select the actual conduct, not merely that a bill remains unpaid.",function(v){return v.serviceRoute==="obtain"}),
  qSeg("immediatePayment","Was payment ordinarily due immediately when the service was rendered?",yesNoUnknown,true,"This controls the statutory absconding presumption.",function(v){return v.serviceRoute==="obtain"&&v.avoidMethod==="abscond"}),
  qSeg("absconded","Did the person leave without payment OR an offer to pay?",yesNoUnknown,true,"If both this and immediate-payment custom are established, § 5-36-104(b) supplies a presumption of purpose to avoid payment.",function(v){return v.serviceRoute==="obtain"&&v.avoidMethod==="abscond"}),
  qNum("value","Value of the service ($)",true,"$25,000+ = B felony; more than $5,000 but under $25,000 = C felony; more than $1,000 through $5,000 = D felony; otherwise Class A misdemeanor unless another rule controls."),
  qSelect("threatLevel","If threat: which fact is established?",[
   ["ordinary","Threat — no listed Class B factor"],["serious","Threat of serious physical injury or destruction of another's occupiable structure"],["fiduciary","Threat + actor stood in confidential / fiduciary relationship"]
  ],true,"Threat creates at least a Class C felony; the two listed facts create Class B felony pathways.",function(v){return v.avoidMethod==="threat"}),
  qSelect("utilityImpact","If utility service: what resulted?",[
   ["none","No line / meter damage or contamination established"],["damage","Damage / destruction to utility line, pipe, waterline, meter, or other utility property"],
   ["contamination","Contamination of a line, pipe, waterline, meter, or other utility property"],["hazmat","Spill, dumping, or release of hazardous material into the environment"]
  ],true,"Utility contamination or hazardous release is Class B; property damage is a Class A pathway when no higher value classification applies.",function(v){return v.serviceType==="utility"}),
  qSeg("presence","Committed in officer's presence?",presenceOpts,true)
 ],
 enhancement:[],
 report:[...contextQuestions,qText("serviceDetail","Provider, service, amount due, and how value was established",false),qText("intentFacts","Statements / conduct showing purpose to defraud or avoid payment",false),...evidenceQuestions]
};

evaluators.theftservices=function(v){
 var src=[source("§ 5-36-104 — Theft of Services",URLS.theftServices),source("§ 16-81-106 — Arrest Authority",URLS.arrest)];
 if(v.purposeDefraud!=="yes")return insufficient("§ 5-36-104(a)","Purpose to defraud is not established. A civil debt or nonpayment alone does not establish this offense.",src);
 if(v.serviceRoute==="obtain"&&v.avoidMethod==="abscond"&&v.absconded!=="yes")return insufficient("§ 5-36-104(a)(1)","The selected absconding route is not established because leaving without payment or an offer to pay was not confirmed.",src);
 var value=Number(v.value),classSub="",cls="";
 var utility=v.serviceType==="utility";
 if(utility&&v.utilityImpact==="contamination"){cls="Class B felony";classSub="(c)(1)(D)(i)";}
 else if(utility&&v.utilityImpact==="hazmat"){cls="Class B felony";classSub="(c)(1)(D)(ii)";}
 else if(v.avoidMethod==="threat"&&v.threatLevel==="serious"){cls="Class B felony";classSub="(c)(1)(B)";}
 else if(v.avoidMethod==="threat"&&v.threatLevel==="fiduciary"){cls="Class B felony";classSub="(c)(1)(C)";}
 else if(value>=25000){cls="Class B felony";classSub="(c)(1)(A)";}
 else if(v.avoidMethod==="threat"){cls="Class C felony";classSub="(c)(2)(B)";}
 else if(value>5000&&value<25000){cls="Class C felony";classSub="(c)(2)(A)";}
 else if(value>1000&&value<=5000){cls="Class D felony";classSub="(c)(3)";}
 else if(utility&&v.utilityImpact==="damage"){cls="Class A misdemeanor";classSub="(c)(4)(A)";}
 else{cls="Class A misdemeanor";classSub="(c)(4)(B)";}
 var base=v.serviceRoute==="divert"?"§ 5-36-104(a)(2)":"§ 5-36-104(a)(1)";
 var presumption=v.serviceRoute==="obtain"&&v.avoidMethod==="abscond"&&v.immediatePayment==="yes"&&v.absconded==="yes";
 var statute=base+(presumption?", (b)":"")+", "+classSub;
 var r=baseResult("Theft of Services",statute,cls);
 r.elements=["Purpose to defraud"];
 if(v.serviceRoute==="divert"){
  r.elements.push("Controlled disposition of a service to which actor was not entitled","Purposely diverted the service for actor or another person not entitled to it");
 }else{
  r.elements.push("Purposely obtained a service known to be available only for compensation","Used "+(v.avoidMethod==="abscond"?"absconding / another means":v.avoidMethod)+" to avoid payment");
 }
 r.elements.push("Service value: $"+value.toLocaleString());
 if(presumption)r.elements.push("Immediate-payment service + absconded without payment or offer to pay: statutory presumption under subsection (b)");
 if(utility&&v.utilityImpact!=="none")r.elements.push("Utility result: "+v.utilityImpact);
 r.reportFacts=["Identity of service provider and person legally entitled to payment","Exact service rendered and when payment became due","Statements, conduct, planning, deception, threat, or diversion facts showing purpose to defraud","Invoice, receipt, menu, meter, fare, contract, or other value basis","Payment method offered or not offered; efforts to identify/contact the actor","Video, witnesses, account records, and utility damage/contamination evidence",...evidenceFacts(v)];
 if(v.serviceType==="restaurant")r.enhancements.push("DINE-AND-DASH FIELD KEY — leaving is not the whole offense. Establish that immediate payment was customary, the person absconded without payment or an offer to pay, and the surrounding facts support purpose to defraud.");
 if(presumption)r.chargeImpact.push("The immediate-payment + absconding facts activate the rebuttable statutory presumption of purpose to avoid payment under § 5-36-104(b).");
 if(utility)r.enhancements.push("Utility theft requires full restitution provisions under § 5-36-104(d); document service value, repair cost, and other measurable loss.");
 r.confirm=["Rule out a billing dispute, mistake, failed payment, service-quality dispute, or other facts inconsistent with purpose to defraud."];
 r.verbiage=v.serviceRoute==="divert"
  ?"With purpose to defraud, the suspect controlled the disposition of [service] without entitlement and purposely diverted it for [self/other person not entitled]."
  :"With purpose to defraud, the suspect purposely obtained [service], known to be available only for compensation, by [deception/threat/other means] to avoid payment.";
 r.why="The entered facts establish purpose to defraud and the "+(v.serviceRoute==="divert"?"service-diversion":"compensated-service avoidance")+" route. "+(presumption?"The immediate-payment absconding presumption also applies. ":"")+"The $"+value.toLocaleString()+" value and any selected threat or utility-result fact produce "+cls+" under "+classSub+".";
 r.arrest=arrestText(cls,v.presence);
 r.penalty=penaltyFor(cls);
 r.sources=src;
 return r;
};

moduleDefinitions.theftservices=[
 {term:"Service",text:"Document exactly what service was rendered, its value, and who was entitled to compensation.",cite:"§ 5-36-104",url:URLS.theftServices},
 {term:"Purpose to defraud",text:"The offense requires a purpose to defraud. Nonpayment, a rejected card, or a disputed bill does not by itself prove the required purpose.",cite:"§ 5-36-104(a)",url:URLS.theftServices},
 {term:"Immediate-payment presumption",text:"When immediate payment is ordinarily customary, absconding without payment or an offer to pay gives rise to a presumption of purpose to avoid payment.",cite:"§ 5-36-104(b)",url:URLS.theftServices}
];
qWhy.theftservices={
 purposeDefraud:"This is the threshold mental-state element. Separate a purposeful scheme from a mistake, inability to pay, or civil dispute.",
 serviceRoute:"The statute separates purposely obtaining compensated services from purposely diverting a service one controls but is not entitled to.",
 avoidMethod:"The exact avoidance method determines whether a threat classification applies and supplies the conduct element.",
 immediatePayment:"The dine-and-dash presumption applies only where payment is ordinarily made immediately after service.",
 absconded:"The presumption requires leaving without payment or an offer to pay.",
 value:"Service value selects the ordinary felony or misdemeanor level.",
 threatLevel:"A threat is at least Class C; serious-injury/occupiable-structure and fiduciary threats are Class B pathways.",
 utilityImpact:"Utility contamination/hazardous release and utility property damage have separate classification rules.",
 presence:"For a misdemeanor, this controls the ordinary warrantless-arrest analysis."
};
simpleEnhancementIds.theftservices=[];

const v32OldStatuteLinks=statuteLinks;
statuteLinks=function(){
 if(currentModule==="theftservices")return [{label:"§ 5-36-104 — Theft of Services",url:URLS.theftServices}];
 return v32OldStatuteLinks();
};
const v32OldCategoryFor=categoryFor;
categoryFor=function(id){return id==="theftservices"?"propertyhub":v32OldCategoryFor(id)};

if(!criminalCats.property.items.some(function(x){return x[0]==="theftservices"}))criminalCats.property.items.push(["theftservices","Theft of Services","Dine-and-dash / compensated service / diversion"]);
if(!topicMap.propertyhub.items.some(function(x){return x[1]==="theftservices"}))topicMap.propertyhub.items.splice(1,0,["module","theftservices","Theft of Services","Dine-and-dash • lodging • transportation • labor • utilities"]);
var v32PropertyHub=hubTopics.find(function(x){return x[0]==="propertyhub"});
if(v32PropertyHub)v32PropertyHub[2]="Theft/property • services • vehicle use • burglary • breaking/entering • trespass";

/* -------------------- NONCOMMERCIAL DRIVER LICENSING -------------------- */
quickRefs.driverLicensing={
 title:"Arkansas Noncommercial Driver Licensing",
 one:"Field reference for Class D, instruction permits, learner/intermediate credentials, restriction codes, and common enforcement checks. Verify the physical credential and current ODS record.",
 sections:[
  ["Credential ladder",[
   "Instruction permit — age 14+, written-test credential; valid up to 24 months. A licensed driver age 21+ must sit beside the permittee unless the § 27-16-802 six-month / age-16 / road-test exception is verified.",
   "Learner's license — restricted Class D for a person under 16, issued after a valid instruction permit, required testing, and six clean months.",
   "Intermediate driver's license — restricted Class D for a person age 16 or older after the required permit/learner, testing, and six clean months. Some cards or records may display Class DI; the statute calls the credential an intermediate driver's license.",
   "Regular Class D — standard noncommercial license, ordinarily age 18+. Individual restriction codes printed on the card or record still control."
  ]],
  ["Instruction permit — § 27-16-802",[
   "Permit must be in the driver's immediate possession.",
   "Licensed driver age 21+ beside the permittee unless the statutory six-month / age-16 / road-test exception is confirmed.",
   "Every passenger must wear a seat belt.",
   "Confirm issue date, age, road-test status, expiration, and any separate printed restrictions."
  ]],
  ["Learner's license — § 27-16-804(f)",[
   "Driver is under 16 and at least 14; valid instruction permit and six clean months required for issuance.",
   "Licensed driver over 21 must accompany the learner.",
   "All passengers must be belted.",
   "No cell phone or interactive wireless device while driving except a listed emergency purpose."
  ]],
  ["Intermediate / Class DI — § 27-16-804(g)",[
   "Driver is at least 16; current law does not cap this credential at age 18.",
   "All passengers must be belted; no nonemergency cell/interactive-device use.",
   "No more than one unrelated minor passenger unless a licensed driver age 21+ occupies the front seat.",
   "No driving 11:00 p.m.–4:00 a.m. unless accompanied by a licensed driver age 21+, traveling to/from school, church, or a job, or driving because of an emergency."
  ]],
  ["Class / endorsement check",[
   "Class D — ordinary noncommercial passenger vehicle operation.",
   "Class M — motorcycle endorsement/license; Class MD — motor-driven cycle credential.",
   "Autocycle operator age 18+ needs a valid driver's license but no motorcycle endorsement under § 27-20-306. An operator under 18 must hold and follow the applicable permit/learner/intermediate restrictions.",
   "Confirm vehicle class, license class, endorsements, expiration, status, and every printed restriction before citing."
  ]],
  ["Common card / record restriction cues",[
   "A — licensed adult required; B — corrective lenses; G — daylight only; J — other/attachment; L — ignition interlock. Read the exact current record description.",
   "Common status abbreviations include VAL, SUS, CAN, RST, and REV. Do not infer the legal status from color or card appearance alone.",
   "Class DI is a field/card cue for an intermediate Class D credential, not a separate unrestricted license."
  ]],
  ["Common enforcement routes",[
   "§ 27-16-601 — license must be carried and displayed on demand; producing a then-valid license in court is a statutory defense.",
   "§ 27-16-602 — no person may drive without a valid license for the type/class of vehicle operated.",
   "§ 27-16-303 — driving while license is suspended, canceled, or revoked is a misdemeanor with a 2-day to 6-month imprisonment range and an optional fine up to $500.",
   "§ 27-16-804(e) — violating an imposed restricted-license condition is a misdemeanor; ODS may also suspend or revoke after its process."
  ]],
  ["Fast field check",[
   "1. Confirm actual operation. 2. Match identity/photo/DOB. 3. Check expiration and current status. 4. Match class/endorsement to vehicle. 5. Read every restriction. 6. Compare the observed operation to that exact restriction. 7. Document database source/time and the conduct establishing the breach."
  ]]
 ],
 sources:[
  ["§ 27-16-801 — License Classes",URLS.licenseClasses],["§ 27-16-802 — Instruction Permit",URLS.instructionPermit],
  ["§ 27-16-804 — Restricted / Learner / Intermediate",URLS.restrictedLicense],["2025 Act 928 — Graduated Licensing Update",URLS.act928],
  ["§ 27-16-601 — Carry / Display",URLS.licenseCarry],["§ 27-16-602 — Valid License Required",URLS.noLicense],
  ["§ 27-16-303 — Suspended / Canceled / Revoked",URLS.suspendedLicense],["Arkansas Driver License Key",URLS.driverLicenseKey],
  ["§ 27-20-306 — Autocycle Operation",URLS.autocycleOp]
 ]
};

const v32OldQuickTermsFor=quickTermsFor;
quickTermsFor=function(id){
 if(id==="driverLicensing")return [
  ["Class DI","A card/record cue for the intermediate Class D credential; apply the intermediate restrictions until current status says otherwise."],
  ["Unrelated minor passenger","A passenger under 21 who is not a sibling, stepsibling, or child residing in the same household as the driver."],
  ["Emergency purpose","The restricted-device-use exceptions listed in § 27-16-804, including specified safety, criminal, fire, crash, road-hazard, medical, hazmat, and unsafe-driver reports."],
  ["Restriction violation","Actual operation contrary to an imposed license restriction—not merely the presence of a restriction code."]
 ];
 return v32OldQuickTermsFor(id);
};

/* -------------------- EXPANDED COMMON TRAFFIC -------------------- */
const v32OldTcControl=tcControl;
tcControl=function(id,q){
 if(q[2]==="number")return '<input type="number" min="0" step="1" id="tc-'+id+'" onchange="trafficCheckState[\''+id+'\']=this.value" placeholder="'+escAttr(q[3]||"")+'">';
 return v32OldTcControl(id,q);
};

trafficChecks.speeding={
 title:"Speeding / Speed Too Fast for Conditions",stat:"§§ 27-51-201, 27-50-302(7), 27-51-212",
 sources:[["§ 27-51-201 — Speed Restrictions",URLS.speeding],["§ 27-50-302 — More Than 15 MPH Over",URLS.speedingClass],["§ 27-51-212 — School Zone",URLS.schoolSpeed],["§ 27-51-214 — School-Zone Penalty",URLS.schoolSpeedPenalty]],
 qs:[
  ["posted","Posted / applicable limit (mph)","number","e.g. 45"],["observed","Observed speed (mph)","number","e.g. 58"],
  ["method","Speed evidence / measurement","select",["Radar / lidar","Pace","Calibrated speedometer / video","Visual estimate plus corroborating facts","Other reliable evidence","Not yet verified"]],
  ["unreasonable","Even if not over the number, was the speed greater than reasonable and prudent for actual/potential hazards?","yesno"],
  ["school","Is this a qualifying school-zone period/location?","yesno"],["children","If school zone: were children present and outside the building?","yesno"]
 ],
 eval:function(s){
  var posted=Number(s.posted),observed=Number(s.observed);
  if(!posted||!observed)return ["VERIFY SPEED FACTS","Enter the applicable limit and observed speed. Document the measurement method, location, direction, vehicle identity, and equipment/check facts."];
  if(s.school==="yes"&&!["yes","no"].includes(s.children))return ["VERIFY SCHOOL-ZONE FACTS","Confirm whether children were present and outside the building during the qualifying school-zone period before applying the 25 mph rule."];
  if(s.school==="unknown"&&observed>25)return ["VERIFY SCHOOL-ZONE APPLICABILITY","The school-zone route could change the applicable limit. Confirm location, time, and whether children were present outside."];
  var schoolApplies=s.school==="yes"&&s.children==="yes",applicable=schoolApplies?Math.min(posted,25):posted,over=observed-applicable;
  if(over<=0&&s.unreasonable!=="yes")return ["NO — speed violation not validated","Observed speed does not exceed the entered applicable limit, and speed greater than reasonable and prudent for hazards was not established."];
  if(!s.method||s.method==="Not yet verified")return ["VERIFY MEASUREMENT","The entered speed would exceed the applicable limit, but the evidence/measurement basis is not yet verified."];
  if(over>15)return ["YES — violation; Class C misdemeanor threshold flagged","Observed speed is "+over+" mph over the applicable limit. More than 15 mph over the posted limit is classified as a Class C misdemeanor under § 27-50-302(7); verify the posted limit and measurement proof."];
  if(over>0)return ["YES — numeric speed violation validated","Observed speed is "+over+" mph over the applicable limit. Document the limit source, exact location, measurement method, distance/tracking history, and device/calibration checks."];
  return ["YES — speed too fast for conditions","The selected facts support speed greater than reasonable and prudent under the actual or potential hazards, even though the numeric limit was not exceeded. Articulate the specific hazard and why the speed was unsafe."];
 }
};

trafficChecks.careless={
 title:"Careless and Prohibited Driving",stat:"§ 27-51-104",sources:[["§ 27-51-104 — Careless and Prohibited Driving",URLS.careless],["§ 27-50-308 — Reckless Driving",URLS.reckless]],
 qs:[
  ["observed","Did the officer observe or reliably establish the specific driving conduct?","yesno"],["lookout","Did the driving evidence failure to keep a proper lookout OR failure to maintain proper control?","yesno"],
  ["act","Which listed prohibited act best fits?","select",["None / general lookout-control route","Improper or unsafe lane change","Cut across private property to avoid intersection/sign/signal","Skidding, spinning, or sliding caused by manner/speed","Too close to / collision with parked or stopped vehicle, fixture, person, or object","Vehicle part/object extended so as to endanger","Operation causing failure to maintain control","Passenger positioned in a dangerous manner","Unreasonable / imprudent inattention"]],
  ["wanton","Do the total facts indicate WANTON DISREGARD for safety, beyond ordinary carelessness?","yesno"]
 ],
 eval:function(s){
  if(s.observed!=="yes")return ["NO / VERIFY","The specific driving conduct has not been observed or reliably established. A crash or conclusion alone does not identify the statutory act."];
  var listed=s.act&&s.act!=="None / general lookout-control route";
  if(s.lookout!=="yes"&&!listed)return ["NO — careless-driving route not established","Neither failure of proper lookout/control nor a listed prohibited act is established."];
  var extra=s.wanton==="yes"?" The entered wanton-disregard fact also requires a separate Reckless Driving analysis under § 27-50-308; do not merge the two standards.":"";
  return ["YES — § 27-51-104 supported","The entered facts identify "+(listed?s.act:"failure of proper lookout or control")+". The statutory fine is not more than $100."+extra];
 }
};

trafficChecks.license={
 title:"Driver License Status / Restrictions",stat:"§§ 27-16-303, 27-16-601, 27-16-602, 27-16-804",
 sources:[["§ 27-16-303 — Suspended / Canceled / Revoked",URLS.suspendedLicense],["§ 27-16-601 — Carry / Display",URLS.licenseCarry],["§ 27-16-602 — Valid License Required",URLS.noLicense],["§ 27-16-804 — Restriction Violation",URLS.restrictedLicense],["Arkansas Driver License Key",URLS.driverLicenseKey]],
 qs:[
  ["operated","Did the person actually operate the motor vehicle?","yesno"],["presented","Was a driver's license carried and displayed on demand?","yesno"],
  ["record","What current card/database status was verified?","select",["Valid for this vehicle/class","No valid license / wrong class","Suspended, canceled, or revoked","Valid but restricted","Record/status not yet verified"]],
  ["breach","If restricted: did the actual operation violate the exact restriction shown?","yesno"]
 ],
 eval:function(s){
  if(s.operated==="no")return ["NO — operation not established","The selected driver-license offenses require operation/driving. Establish who actually operated the vehicle."];
  if(s.operated!=="yes")return ["VERIFY OPERATION","Confirm who actually operated the motor vehicle before applying a driver-license offense."];
  if(s.record==="Suspended, canceled, or revoked")return ["YES — § 27-16-303 route supported","Current suspended/canceled/revoked status plus actual operation is established. The statute provides 2 days–6 months imprisonment and may include a fine up to $500; document the exact status source and effective dates."];
  if(s.record==="No valid license / wrong class")return ["YES — § 27-16-602 route supported","Actual operation without a valid license for the vehicle type/class is established. Document class/endorsement and the vehicle classification."];
  if(s.record==="Valid but restricted"&&s.breach==="yes")return ["YES — restriction violation supported","Actual operation violated the exact current restriction. § 27-16-804(e) makes violation of an imposed restricted-license condition a misdemeanor; quote the restriction and conduct."];
  if(s.presented==="no"&&s.record==="Valid for this vehicle/class")return ["YES — carry/display issue; note statutory defense","§ 27-16-601 requires carrying and displaying the license on demand. Producing in court a license valid at the time of arrest is a statutory defense."];
  if(!s.record||s.record==="Record/status not yet verified")return ["VERIFY CURRENT STATUS","Do not infer suspension, class, DI/intermediate status, or a restriction from appearance alone. Verify the current ODS record and read the exact restriction."];
  return ["NO — selected license violation not established","The entered facts show a displayed, valid credential or do not establish an actual breach of a restriction."];
 }
};

trafficChecks.insurance={
 title:"Motor Vehicle Liability Insurance",stat:"§§ 27-22-104, 27-22-109",sources:[["§ 27-22-104 — Insurance Required / Proof",URLS.insurance],["§ 27-22-109 — Limited Impound Authority",URLS.insuranceImpound]],
 qs:[
  ["operated","Was a motor vehicle operated in Arkansas?","yesno"],["paper","Was current paper proof presented?","yesno"],["electronic","Was current electronic proof presented?","yesno"],
  ["online","Online verification result","select",["Current coverage shown","No current coverage shown","System unavailable / no result"]],
  ["matches","If proof was presented: did driver/vehicle/date information match?","yesno"],["selfinsured","Was a valid certificate of self-insurance verified?","yesno"]
 ],
 eval:function(s){
  if(s.operated==="no")return ["NO — operation not established","§ 27-22-104 applies to operation of a motor vehicle; ownership or a parked vehicle alone is not the entered operation fact."];
  if(s.operated!=="yes")return ["VERIFY OPERATION","Confirm actual operation before applying § 27-22-104."];
  if(s.selfinsured==="yes")return ["NO — qualifying self-insurance verified","The statute permits coverage through a qualifying certificate of self-insurance."];
  var shown=s.paper==="yes"||s.electronic==="yes";
  if(shown&&s.matches==="yes")return ["NO — current proof validated","Current matching paper/electronic proof was presented. Electronic presentation does not authorize a search of other device content."];
  if(s.online==="Current coverage shown")return ["NO / VERIFY MATCH","The online system shows current coverage. Confirm that the driver/insured/vehicle and operation match before clearing the issue."];
  if((!shown||s.matches==="no")&&s.online==="No current coverage shown")return ["YES — rebuttable presumption of no insurance","Failure to present current matching proof and/or an online no-coverage result creates a rebuttable presumption under § 27-22-104(a)(2). Preserve the system result and allow contrary proof. Impound is not automatic; § 27-22-109 has separate prerequisites."];
  if(!shown)return ["VERIFY — rebuttable presumption / contrary proof possible","Failure to present proof can create the statutory rebuttable presumption, but it is not irrebuttable proof. Document the online-system result and any later insurance evidence. Do not treat electronic proof as consent to search the device."];
  return ["VERIFY COVERAGE MATCH","Proof was shown, but the identifying/effective information was not verified as matching the vehicle and operation."];
 }
};

trafficChecks.rearLights={
 title:"Tail / Plate / Brake / Turn Lamps",stat:"§§ 27-36-204, 27-36-215, 27-36-216",
 sources:[["§ 27-36-204 — When Lamps Required",URLS.headlightRequired],["§ 27-36-215 — Tail Lamps / Plate Light",URLS.tailLamps],["§ 27-36-216 — Stop / Turn Signal Lamps",URLS.signalLamps]],
 qs:[
  ["lamp","Which equipment issue?","select",["Tail lamp","Rear plate illumination","Stop / brake lamp","Electrical turn signal"]],
  ["applies","Does the selected statutory equipment requirement apply to this vehicle/year/registration?","yesno"],
  ["defect","Was the required lamp absent, inoperative, wrong color, improperly wired, glaring, or not visible/legible at the statutory distance?","yesno"],
  ["requiredTime","For tail/plate lighting: were lamps required at that time?","yesno"]
 ],
 eval:function(s){
  if(!s.lamp)return ["VERIFY EQUIPMENT ROUTE","Select the exact lamp or signal equipment at issue before validating the rule."];
  if(s.applies!=="yes"||s.defect!=="yes")return ["NO / VERIFY","Applicability of the selected equipment rule and an objective defect are not both established."];
  if((s.lamp==="Tail lamp"||s.lamp==="Rear plate illumination")&&s.requiredTime!=="yes")return ["VERIFY OPERATING REQUIREMENT","The equipment defect is selected, but the required-lighting condition for an operating violation is not established."];
  var detail={"Tail lamp":"Tail lamp rule: red light plainly visible 500 feet; Arkansas-registered vehicles manufactured after June 11, 1959 generally require two rear tail lamps.","Rear plate illumination":"Plate light rule: white light must render the rear plate clearly legible at 50 feet and be wired with the headlamps/auxiliary driving lamps.","Stop / brake lamp":"Stop-lamp rule: actuated by the service brake and visible at least 100 feet in normal sunlight; post-July 1, 1959 Arkansas-registered motor vehicles generally require two, subject to listed vehicle exceptions.","Electrical turn signal":"Turn-signal rule: required vehicles must have electrical signals displaying the intended direction with the statutory color, placement, and visibility."};
  return ["YES — selected equipment violation supported",detail[s.lamp]+" Document which lamp, side, test method, time/conditions, and visibility or legibility distance."];
 }
};

trafficChecks.trafficControls={
 title:"Traffic-Control Device / Signal",stat:"§§ 27-51-503, 27-52-103, 27-52-107, 27-52-108",
 sources:[["§ 27-51-503 — Stop / Yield Signs",URLS.yieldIntersection],["§ 27-52-103 — Obedience to Official Devices",URLS.trafficDevices],["§ 27-52-107 — Traffic-Control Signals",URLS.trafficSignals],["§ 27-52-108 — Flashing Signals",URLS.flashingSignals]],
 qs:[
  ["device","Which control?","select",["Stop sign","Yield sign","Steady red signal","Flashing red signal","Other official traffic-control device"]],
  ["official","Was the device official, in proper position, and sufficiently legible/visible?","yesno"],["conduct","Did the driver fail to stop, yield, or otherwise obey the exact command that applied?","yesno"],
  ["exception","Was the driver acting as otherwise directed by a police officer or a lawful statutory exception?","yesno"]
 ],
 eval:function(s){
  if(!s.device)return ["VERIFY CONTROL TYPE","Select the exact sign, signal, or official traffic-control device before choosing the governing statute."];
  if(s.official!=="yes")return ["NO / VERIFY DEVICE","Official status, proper position, and visibility/legibility are not established. Photograph the device and approach."];
  if(s.conduct!=="yes")return ["NO — disobedience not established","The entered facts do not establish failure to obey the exact stop, yield, signal, or device command."];
  if(s.exception==="yes")return ["NO — direction / exception selected","A police direction or other lawful exception was selected. Verify and document the exact authority before enforcement."];
  var map={"Stop sign":"§ 27-51-503","Yield sign":"§ 27-51-503","Steady red signal":"§ 27-52-107","Flashing red signal":"§ 27-52-108","Other official traffic-control device":"§ 27-52-103"};
  return ["YES — selected traffic-control violation supported","The official control, applicable command, and failure to obey are established. Use "+map[s.device]+" and document approach, lane, signal phase/device, stop-line/crosswalk position, sight distance, and conflicting traffic."];
 }
};

topicMap.traffichub.items=[
 ["reckless","","Reckless Driving","Wanton disregard + injury/prior penalty factors"],
 ["quick","driverLicensing","Noncommercial Driver Licensing","Class D • permit • learner • Class DI/intermediate • restrictions"],
 ["traffic","speeding","Speeding / Speed for Conditions","Numeric limit • hazards • school zone • measurement"],
 ["traffic","careless","Careless / Prohibited Driving","Lookout/control + eight listed acts"],
 ["traffic","license","License Status / Restrictions","No license • suspended • display • restriction breach"],
 ["traffic","insurance","Liability Insurance","Paper/electronic proof • online system • rebuttable presumption"],
 ["traffic","headlight","Headlight Out","Required lighting time + two-light requirement"],
 ["traffic","rearLights","Tail / Brake / Turn / Plate Lights","Applicability • objective defect • visibility"],
 ["traffic","registration","Expired / Invalid Registration","Current valid registration / plate"],
 ["traffic","tint","Windshield / Window Tint","What can be verified without a tint meter"],
 ["traffic","cellphone","Cell Phone / Texting","Text/social-media use + exceptions"],
 ["traffic","trafficControls","Traffic-Control Device / Signal","Stop • yield • red • flashing • official device"],
 ["traffic","yield","Failure to Yield","Choose the actual yield situation first"],
 ["traffic","leftcenter","Left of Center","Right-half rule + statutory exceptions"]
];
var v32TrafficHub=hubTopics.find(function(x){return x[0]==="traffichub"});
if(v32TrafficHub)v32TrafficHub[2]="Licensing • reckless • speeding • careless • insurance • equipment • roadway controls";

const v32OldTrafficKey=window.openTrafficKey;
window.openTrafficKey=function(id){
 var cues={
  speeding:"Separate a numeric over-limit case from speed unreasonable for actual/potential hazards. Record the applicable limit, observed speed, exact location, measurement method, and equipment/check facts.",
  careless:"Careless driving requires the specific lookout/control failure or one listed prohibited act. Wanton disregard is the distinct Reckless Driving standard.",
  license:"Verify actual operation, identity, vehicle class, credential class/endorsement, current ODS status, expiration, and the exact restriction. Class DI is an intermediate Class D cue.",
  insurance:"No proof or an online no-hit creates a rebuttable presumption, not permission to ignore contrary proof. Electronic proof does not authorize searching other device content. Impound requires separate § 27-22-109 facts.",
  rearLights:"Match the exact lamp, vehicle/year applicability, operating condition, color, wiring, and statutory visibility or legibility distance.",
  trafficControls:"Identify the exact official device or signal and the precise command the driver failed to obey; photograph position, visibility, lane, and approach."
 };
 if(cues[id])return openSheet("Key Terms / Field Cue",'<div class="quick-def"><div class="plain">'+esc(cues[id])+"</div></div>");
 return v32OldTrafficKey(id);
};

/* -------------------- INFOGRAPHIC LIBRARY -------------------- */
[
 ["Theft of Services","ref-theft-of-services.png"],["Arkansas Noncommercial Driver Licensing","ref-driver-licensing.png"],
 ["Traffic — Speeding","ref-traffic-speeding.png"],["Traffic — Careless / Prohibited Driving","ref-traffic-careless-driving.png"],
 ["Traffic — License Status / Restrictions","ref-traffic-license-status.png"],["Traffic — Liability Insurance","ref-traffic-insurance.png"],
 ["Traffic — Rear Lamps","ref-traffic-rear-lights.png"],["Traffic — Control Devices / Signals","ref-traffic-control-devices.png"]
].forEach(function(x){if(!libraryItems.some(function(y){return y[1]===x[1]}))libraryItems.push(x)});

var v32Style=document.createElement("style");
v32Style.textContent=".ref-page{align-items:stretch}.ref-card li{margin-bottom:7px}.quick-answer p{white-space:pre-line}.library-grid .lib-card strong{min-height:2.5em}.v32-release-note{margin:10px 0 14px;padding:10px 12px;border-left:4px solid #c62828;background:#fff4f3;border-radius:8px;color:#14243a;font-size:.9rem}";
document.head.appendChild(v32Style);

const v32Home=home;
home=function(){
 v32Home();
 var note=document.querySelector("#home .rule3-note");
 if(note&&!document.querySelector("#home .v32-release-note"))note.insertAdjacentHTML("afterend",'<div class="v32-release-note"><strong>V3.2 fielding release:</strong> adds Theft of Services, Arkansas noncommercial licensing, and expanded speeding, careless-driving, license, insurance, rear-light, and traffic-control validation.</div>');
};

home();
