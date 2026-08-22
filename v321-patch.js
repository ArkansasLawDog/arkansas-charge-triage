/* ============================================================
   V3.2.1 FIELDING CORRECTION
   Direct Fort Smith offense links + visible ordinance citations.
   Live Municode section IDs verified 2026-08-22 against the
   current online Code of Ordinances (content updated 2025-09-29).
   ============================================================ */

const fortSmithCodeRootV321="https://library.municode.com/ar/fort_smith/codes/code_of_ordinances";
const municipalSectionsV321=Object.freeze({
 "1-9":{title:"Penalty for violations",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH1GEPR_S1-9PEVI`},
 "4-110":{title:"Animal waste",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH4AN_ARTIVDOCA_S4-110ANWA`},
 "13-214":{title:"Soliciting and peddling prohibited in business district",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH13LITAMIBURE_ARTVIIIPE_DIV1GE_S13-214SOPEPRBUDI`},
 "14-101":{title:"Curfew for minors — imposed",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-101IM`},
 "14-102":{title:"Curfew for minors — exceptions",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-102EX`},
 "14-103":{title:"Parent responsibility; penalty",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-103REPAETPE`},
 "14-104":{title:"Business-operator duty; penalty",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-104DUOPETESWHVIOCPE`},
 "14-105":{title:"Curfew waiver permit — authorized",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-105WAPEUT`},
 "14-106":{title:"Curfew waiver permit — conditions",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH14MIPROF_ARTIVOFINPUMO_DIV2CUMI_S14-106WAPEON`},
 "18-58":{title:"Park rules — penalty",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-58PE`},
 "18-59":{title:"Use of alcohol",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-59USAL`},
 "18-60":{title:"Animals—Unleashed",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-60ANNL`},
 "18-61":{title:"Animals—Horses",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-61ANOR`},
 "18-62":{title:"Birds protected",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-62BIPR`},
 "18-63":{title:"Riding bicycles, motorcycles, scooters",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-63RIBIMOSC`},
 "18-64":{title:"Campfires",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-64CA`},
 "18-65":{title:"Camping and sleeping",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-65CASL`},
 "18-66":{title:"Disruption of recreational programs",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-66DIREPR`},
 "18-67":{title:"Fireworks and firearms",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-67FIFI`},
 "18-68":{title:"Hours; park curfew",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-68HOPACU`},
 "18-69":{title:"Littering",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-69LI`},
 "18-70":{title:"Damage or removal of park property",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-70DAREPAPR`},
 "18-71":{title:"Posting signs",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-71POSI`},
 "18-72":{title:"Unlawful activity",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-72UNAC`},
 "18-73":{title:"Rest rooms",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-73RERO`},
 "18-74":{title:"Vehicles",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-74VE`},
 "18-75":{title:"Handguns and other firearms",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-75HAOTFI`},
 "18-76":{title:"Feeding of certain birds prohibited",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-76FECEBIPR`},
 "18-77":{title:"Sale or soliciting of goods and services",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-77SASOGOSE`},
 "18-78":{title:"Motorboats",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-78MO`},
 "18-79":{title:"Tennis courts",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-79TECO`},
 "18-80":{title:"Skate park",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-80SKPA`},
 "18-81":{title:"Park public-assembly and special-event permits",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-81PEPUASSPEVPA`},
 "18-82":{title:"Smoking and use of tobacco prohibited",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU_S18-82SMUSTOPRCINEOPREFAPA`},
 "18-177":{title:"Penalty for violation of trespass warning and exception",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTVIITRWAPR_S18-177PEVITRWAEX`},
 "19-66":{title:"Historic-preservation parking",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH19PLDE_ARTIIIHIPR_DIV1GE_S19-66PA`},
 "24-97":{title:"Stopping, standing or parking prohibited in specified places",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH24TR_ARTIVSTSTPA_DIV1GE_S24-97STSTPAPRSPPL`},
 "24-176":{title:"Bicycles, carts on sidewalks",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH24TR_ARTVBIMOET_S24-176BICASI`},
 "24-178":{title:"Riding on handle bars prohibited",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH24TR_ARTVBIMOET_S24-178RIHABAPR`},
 "25-298":{title:"Removal from cans or containers",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH25UT_ARTVIISOWA_DIV2CO_S25-298RECACO`},
 "25-299":{title:"Public trash receptacles",url:`${fortSmithCodeRootV321}?nodeId=COOR_CH25UT_ARTVIISOWA_DIV2CO_S25-299PUTRRE`}
});

function municipalMetaV321(sec){return municipalSectionsV321[String(sec||"").trim()]||null}
function municipalSourceLinkV321(sec,role="OFFENSE"){
 const meta=municipalMetaV321(sec);if(!meta)return "";
 return `<a class="municipal-direct-link" target="_blank" rel="noopener" href="${meta.url}"><span class="municipal-link-role">${esc(role)}</span><span class="municipal-link-copy"><strong>Fort Smith § ${esc(sec)}</strong><small>${esc(meta.title)}</small></span><span class="municipal-link-open">Open exact section ↗</span></a>`;
}

Object.assign(URLS,{
 fortSmithCode:fortSmithCodeRootV321,
 fsCurfew:municipalSectionsV321["14-101"].url,
 fsCurfewExceptions:municipalSectionsV321["14-102"].url,
 fsParks:`${fortSmithCodeRootV321}?nodeId=COOR_CH18PAREET_ARTIIIPARU`,
 fsParkPenalty:municipalSectionsV321["18-58"].url,
 fsPenalty:municipalSectionsV321["1-9"].url
});

/* The 2023 animal-code recodification moved Animal waste from former § 4-130
   to current § 4-110. Keep the existing field summary but correct its citation. */
const animalWasteOrdinanceV321=ordinanceData.find(o=>o.sec==="4-130"||o.title==="Animal waste");
if(animalWasteOrdinanceV321)animalWasteOrdinanceV321.sec="4-110";

ordinanceData.forEach(o=>{
 const meta=municipalMetaV321(o.sec);
 if(meta){o.url=meta.url;o.codeTitle=meta.title}
});
parkRules.forEach(o=>{
 const meta=municipalMetaV321(o.sec);
 if(meta){o.url=meta.url;o.codeTitle=meta.title}
});

window.showOrdinance=function(sec){
 const o=ordinanceData.find(x=>x.sec===sec),r=document.getElementById("ordResult");if(!o)return;
 const isPark=/^18-/.test(o.sec),hasSpecificFine=o.sec==="18-82";
 const related=isPark&&!hasSpecificFine
  ? municipalSourceLinkV321("18-58","PARK PENALTY")+municipalSourceLinkV321("1-9","GENERAL PENALTY")
  : "";
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Fort Smith Municipal Code</div><h2>§ ${esc(o.sec)} — ${esc(o.title)}</h2></div>
 <div class="result-grid"><div class="block full"><h3>Plain-Language Rule</h3><p>${esc(o.rule)}</p></div>
 <div class="block"><h3>Why It Could Be Cited</h3><p>${esc(o.why)}</p></div><div class="block"><h3>Confirm Before Citing</h3><p>${esc(o.confirm)}</p></div>
 <div class="block full"><h3>Exception / Left-Right Limit</h3><p>${esc(o.except)}</p></div>
 <div class="block full sources municipal-source-block"><h3>Direct Municipal Code Section</h3><div class="municipal-link-stack">${municipalSourceLinkV321(o.sec,"OFFENSE")}${related}</div><p class="municipal-source-note">The first link opens the exact selected offense—not the chapter landing page.</p></div></div></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};

window.showParkRule=function(sec){
 const x=parkRules.find(y=>y.sec===sec),r=document.getElementById("parkRuleResult");if(!x)return;
 const special=sec==="18-82"?"Specific § 18-82(d) fine schedule applies.":"§ 18-58: misdemeanor; fine under Fort Smith § 1-9.";
 const penalties=sec==="18-82"?"":municipalSourceLinkV321("18-58","PARK PENALTY")+municipalSourceLinkV321("1-9","GENERAL PENALTY");
 r.innerHTML=`<div class="vehicle-result"><div class="vehicle-head"><div class="kicker">Fort Smith Park Rule</div><h2>§ ${esc(x.sec)} — ${esc(x.title)}</h2></div><div class="result-grid">
 <div class="block full"><h3>What is prohibited?</h3><p>${esc(x.short)}</p></div><div class="block"><h3>Penalty / enforcement</h3><p>${esc(special)}</p><p><strong>Warrantless arrest:</strong> a misdemeanor/public offense committed in the officer's presence generally falls within § 16-81-106(b)(2)(A), subject to department policy/discretion.</p></div><div class="block"><h3>Left / right limit</h3><p>${esc(x.limit)}</p></div><div class="block full sources municipal-source-block"><h3>Direct Ordinance / Penalty Sections</h3><div class="municipal-link-stack">${municipalSourceLinkV321(x.sec,"OFFENSE")}${penalties}</div></div></div></div>`;
 r.scrollIntoView({behavior:"smooth",block:"start"});
};

/* Curfew sources now open each exact provision instead of the chapter. */
if(simpleTermIndex["juvenile curfew"])simpleTermIndex["juvenile curfew"].url=municipalSectionsV321["14-101"].url;
moduleDefinitions.curfew=[
 {term:"Juvenile curfew — offense",text:simpleTermIndex["juvenile curfew"].plain,cite:"Fort Smith § 14-101",url:municipalSectionsV321["14-101"].url},
 {term:"Curfew exceptions",text:"Section 14-102 lists the defenses and exceptions that must be checked before enforcement.",cite:"Fort Smith § 14-102",url:municipalSectionsV321["14-102"].url}
];

const v321BaseStatuteLinks=statuteLinks;
statuteLinks=function(){
 if(currentModule==="curfew")return [
  {label:"Fort Smith § 14-101 — Curfew Imposed",url:municipalSectionsV321["14-101"].url},
  {label:"Fort Smith § 14-102 — Exceptions",url:municipalSectionsV321["14-102"].url},
  {label:"Fort Smith § 14-103 — Parent Responsibility / Penalty",url:municipalSectionsV321["14-103"].url},
  {label:"Fort Smith § 14-104 — Business Operator Duty / Penalty",url:municipalSectionsV321["14-104"].url},
  {label:"Fort Smith § 14-105 — Waiver Permit Authorized",url:municipalSectionsV321["14-105"].url},
  {label:"Fort Smith § 14-106 — Waiver Permit Conditions",url:municipalSectionsV321["14-106"].url},
  {label:"Fort Smith § 1-9 — General Penalty",url:municipalSectionsV321["1-9"].url}
 ];
 return v321BaseStatuteLinks();
};

const v321BaseCurfewEvaluator=evaluators.curfew;
evaluators.curfew=function(v){
 const r=v321BaseCurfewEvaluator(v);if(!r)return r;
 r.sources=[
  source("Fort Smith § 14-101 — Curfew imposed",municipalSectionsV321["14-101"].url),
  source("Fort Smith § 14-102 — Curfew exceptions",municipalSectionsV321["14-102"].url),
  source("Fort Smith § 14-103 — Parent responsibility",municipalSectionsV321["14-103"].url),
  source("Fort Smith § 14-104 — Business operator duty",municipalSectionsV321["14-104"].url),
  source("Fort Smith § 1-9 — General penalty",municipalSectionsV321["1-9"].url),
  source("Arkansas arrest authority",URLS.arrest)
 ];
 return r;
};

/* Exact city-law cards on charge and special-vehicle results. */
cityLawMatches=function(moduleId,v){
 const out=[],park=v.locationType==="Park";
 if(moduleId==="curfew")out.push({sec:"Fort Smith §§ 14-101—14-102",title:"Curfew for Minors",why:"This is the controlling municipal offense/defense framework for the current juvenile curfew triage.",url:municipalSectionsV321["14-101"].url});
 if(park&&moduleId==="mischief")out.push({sec:"Fort Smith § 18-70",title:"Damage or removal of park property",why:"If the damaged, removed, or defaced property belongs to the park, § 18-70 may be an additional municipal violation. Section 18-58 makes park-rule violations misdemeanors.",url:municipalSectionsV321["18-70"].url});
 if(park&&moduleId==="disorderly")out.push({sec:"Fort Smith § 18-66",title:"Disruption of recreational programs",why:"If the conduct used abusive, profane, or indecent language or was reasonably calculated to annoy or disrupt a recreational program or authorized activity, this park ordinance may apply.",url:municipalSectionsV321["18-66"].url});
 if(park&&moduleId==="pubintox"&&((v.intoxSigns||[]).includes("alcohol")||(v.intoxSigns||[]).includes("observed")))out.push({sec:"Fort Smith § 18-59",title:"Alcohol in park",why:"If alcohol was actually possessed, consumed, carried, or brought into a park, check § 18-59 and its permitted-event/location exceptions. Intoxication alone is not enough for this ordinance.",url:municipalSectionsV321["18-59"].url});
 if(park&&moduleId==="trespass")out.push({sec:"Fort Smith §§ 18-171—18-177",title:"Trespass warning on city property",why:"If an effective city-property trespass warning already exists, entering or remaining in violation can constitute criminal trespass under § 18-177. Verify warning validity, effective date, property, and exception authorization.",url:municipalSectionsV321["18-177"].url});
 return out;
};

function repairMunicipalCardsV321(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll(".app-law-card.city").forEach(card=>{
  const heading=(card.querySelector("h4")?.textContent||"").trim(),link=card.querySelector("a");if(!link)return;
  let sec=(heading.match(/\d+-\d+/)||[])[0];
  if(/trespass warning/i.test(heading))sec="18-177";
  const meta=municipalMetaV321(sec);if(!meta)return;
  link.href=meta.url;link.textContent=`Open Fort Smith § ${sec} — ${meta.title} ↗`;link.setAttribute("aria-label",`Open exact Fort Smith section ${sec}`);
 });
}

const v321BaseRenderResult=renderResult;
renderResult=function(r){v321BaseRenderResult(r);repairMunicipalCardsV321(document.getElementById("result"))};
const v321BaseRenderSpecialResult=renderSpecialResult;
renderSpecialResult=function(c){v321BaseRenderSpecialResult(c);repairMunicipalCardsV321(document.getElementById("svResult"))};

/* Quick-reference source sheets use exact sections beside each link. */
if(quickRefs.parkDetention)quickRefs.parkDetention.sources=[
 ["Fort Smith § 18-68 — Park curfew",municipalSectionsV321["18-68"].url],
 ["Fort Smith § 18-63 — Motorized vehicles / scooters",municipalSectionsV321["18-63"].url],
 ["Fort Smith § 18-64 — Campfires",municipalSectionsV321["18-64"].url],
 ["Fort Smith § 18-65 — Camping and sleeping",municipalSectionsV321["18-65"].url],
 ["Fort Smith § 18-70 — Damage / removal of park property",municipalSectionsV321["18-70"].url],
 ["Fort Smith § 18-58 — Park-rule penalty",municipalSectionsV321["18-58"].url],
 ["Terry v. Ohio",URLS.terry]
];
if(quickRefs.cityOrdinances)quickRefs.cityOrdinances.sources=[
 ["Fort Smith § 25-298 — Removal from cans or containers",municipalSectionsV321["25-298"].url],
 ["Fort Smith § 24-176 — Bicycles / carts on sidewalks",municipalSectionsV321["24-176"].url],
 ["Fort Smith § 18-63 — Motorized vehicles / scooters in parks",municipalSectionsV321["18-63"].url],
 ["Fort Smith § 18-65 — Camping and sleeping",municipalSectionsV321["18-65"].url],
 ["Fort Smith § 18-68 — Park curfew",municipalSectionsV321["18-68"].url],
 ["Fort Smith § 24-178 — Riding on handle bars",municipalSectionsV321["24-178"].url]
];
if(quickRefs.referenceLinks){
 const codeRef=quickRefs.referenceLinks.sources.find(x=>x[0]==="Fort Smith Municipal Code");
 if(codeRef)codeRef[1]=fortSmithCodeRootV321;
}

const v321Style=document.createElement("style");
v321Style.textContent=`
.municipal-source-block{background:#f7faff}
.municipal-link-stack{display:grid;gap:10px;margin-top:8px}
.sources a.municipal-direct-link{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;margin:0;padding:12px;border:2px solid #1e5c96;border-radius:12px;background:#fff;color:#0b2b57;text-decoration:none}
.municipal-direct-link:focus,.municipal-direct-link:hover{background:#edf5ff;border-color:#0b2b57}
.municipal-link-role{display:inline-flex;align-items:center;justify-content:center;min-width:68px;padding:5px 7px;border-radius:999px;background:#0b2b57;color:#fff;font-size:.68rem;font-weight:950;letter-spacing:.06em}
.municipal-link-copy{display:grid;gap:2px;min-width:0}.municipal-link-copy strong{font-size:1rem}.municipal-link-copy small{color:#44566f;font-weight:700;line-height:1.25}
.municipal-link-open{color:#1762a8;font-size:.78rem;font-weight:950;text-align:right}.municipal-source-note{margin:10px 0 0;color:#52627a;font-size:.8rem}
@media(max-width:620px){.sources a.municipal-direct-link{grid-template-columns:auto 1fr}.municipal-link-open{grid-column:2;text-align:left}.municipal-link-role{align-self:start}.municipal-link-copy strong{font-size:1.05rem}}
`;
document.head.appendChild(v321Style);

const v321ReleaseNote=document.querySelector("#home .v32-release-note");
if(v321ReleaseNote)v321ReleaseNote.innerHTML="<strong>V3.2.1 fielding correction:</strong> every Fort Smith quick-reference source now shows the ordinance number inside the link and opens the exact offense section; the current Animal waste citation is § 4-110.";
