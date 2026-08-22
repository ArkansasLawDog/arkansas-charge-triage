
/* ==========================================================
   V3.1 FIELDING BUILD
   Rule 3: simple, low-friction, understandable to a day-one
   cadet or non-law-enforcement user.
   ========================================================== */

/* Add the recently requested primary-source hub. */
if(!hubTopics.some(x=>x[0]==="references")){
  hubTopics.splice(hubTopics.length-1,0,
    ["references","Key Reference Links","Arkansas law • arrest authority • Fort Smith ordinances • constitutional cases","quick"]
  );
}

topicMap.references={
 title:"Key Reference Links",
 desc:"Primary legal sources in one place. Use these when you want the controlling law rather than a summary.",
 items:[
  ["quick","referenceLinks","Primary Legal Reference Links","Arkansas Code • Fort Smith Municode • arrest authority • core cases"]
 ]
};

quickRefs.referenceLinks={
 title:"Key Reference Links",
 one:"Direct links to the primary sources used throughout the field hub. These are references—not substitutes for the charge-specific triage.",
 sections:[
  ["Arkansas criminal law","Arkansas Code Title 5 — Criminal Offenses • definitions • culpable mental states • property • violence • public-order • drug offenses."],
  ["Arrest authority","Arkansas §§ 16-81-106 and 16-81-113 plus charge-specific warrantless-arrest provisions where applicable."],
  ["Fort Smith ordinances","Current Fort Smith Municipal Code on Municode, including park and juvenile-curfew provisions."],
  ["Traffic / special vehicles","Arkansas Title 27 — traffic, licensing, registration, motorcycles, autocycles, e-bikes, electric scooters and vehicle equipment."],
  ["Constitutional patrol law","Terry, Miranda, Gant, Rodriguez, plain-view/plain-feel and consent-search authorities used in the Patrol Quick Reference section."]
 ],
 sources:[
  ["Arkansas Code — Title 5","https://law.justia.com/codes/arkansas/title-5/"],
  ["Arkansas Code — Title 16","https://law.justia.com/codes/arkansas/title-16/"],
  ["Arkansas Code — Title 27","https://law.justia.com/codes/arkansas/title-27/"],
  ["Fort Smith Municipal Code",URLS.fortSmithCode],
  ["§ 16-81-106 — Warrantless Arrest Authority",URLS.arrest],
  ["§ 16-81-113 — Domestic Abuse Arrest Authority","https://law.justia.com/codes/arkansas/title-16/subtitle-6/chapter-81/subchapter-1/section-16-81-113/"],
  ["Terry v. Ohio",URLS.terry],
  ["Miranda v. Arizona",URLS.miranda],
  ["Arizona v. Gant",URLS.gant],
  ["Rodriguez v. United States",URLS.rodriguez]
 ]
};

const v31OldQuickTermsFor=quickTermsFor;
quickTermsFor=function(id){
 if(id==="referenceLinks")return [
  ["Primary source","The actual statute, ordinance, or controlling case—not an app summary."],
  ["Field aid","A simplified operational reference used to help identify what law to open and verify."]
 ];
 return v31OldQuickTermsFor(id);
};

/* Make Quick Reference legal controls use the same predictable labels everywhere. */
openQuickRef=function(id){
 const q=quickRefs[id];if(!q)return;
 hideAll();const el=document.getElementById("criminal");el.classList.remove("hidden");
 const backKey=Object.entries(topicMap).find(([k,t])=>t.items.some(x=>x[0]==="quick"&&x[1]===id))?.[0]||"quickhub";
 const custom=id==="referenceLinks"
   ? `<div class="reference-link-grid">${q.sources.map(s=>`<a class="reference-link" target="_blank" rel="noopener" href="${s[1]}"><strong>${esc(s[0])}</strong><small>Open primary source ↗</small></a>`).join("")}</div>`
   : `<div class="ref-page">${q.sections.map((s,i)=>`<div class="ref-card"><h3>${esc(s[0])}</h3>${Array.isArray(s[1])?`<ul>${s[1].map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p>${esc(s[1])}</p>`}</div>`).join("")}</div>`;
 el.innerHTML=topTitle(q.title,`openTopic('${backKey}')`)+`
 <div class="hero"><h2>${esc(q.title)}</h2><p>${esc(q.one)}</p></div>
 ${custom}
 <div class="ref-links"><button onclick="openQuickTerms('${id}')">Key Terms / Definitions</button><button onclick="openQuickSources('${id}')">${id==="referenceLinks"?"All Source Links":"Full Law / Sources"}</button></div>`;
 scrollTo(0,0);
};

/* Re-state Rule 3 at the home screen without adding workflow clutter. */
const v31Home=home;
home=function(){
 v31Home();
 const hero=document.querySelector("#home .hero");
 if(hero&&!document.querySelector("#home .rule3-note")){
   hero.insertAdjacentHTML("afterend",
    `<div class="rule3-note"><strong>Simple Mode is the default.</strong> Use it for a fast plain-language field answer. Switch to Advanced only when you need the deeper enhancement, arrest-authority, evidence, or report-support review.</div>`);
 }
};

/* Keep the newly requested reference card synchronized with the library. */
if(!libraryItems.some(x=>x[1]==="ref-key-reference-links.png")){
 libraryItems.push(["Key Reference Links","ref-key-reference-links.png"]);
}
