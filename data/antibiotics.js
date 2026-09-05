/* ============================================================
   CritiDose — antibiotic data
   Version 1.0  ·  Step 1
   ------------------------------------------------------------
   Sources: Sanford Guide, The Renal Drug Handbook, product information.
   Verified against source: colistimethate (Tsuji 2019 / Nation 2017),
   vancomycin (Rybak 2020), ceftazidime-avibactam (AVYCAZ PI),
   echinocandins and amphotericin (IDSA candidiasis 2016), posaconazole (PI).
   Everything else is from training and has NOT been checked line by line.
   ------------------------------------------------------------
   This file holds DATA ONLY. No app logic lives here, so it can
   be replaced on its own whenever a dose needs correcting.

   Record shape
   ------------
   n      name
   al     aliases — brands and alternate spellings, for search
   c      class key (drives the colour bar and the filter chips)
   tag    one-line indication
   tg     property tags (see TAGS in app)
   wt     true  -> dose depends on body weight
   wb     which weight to use: 'tbw' actual · 'ibw' ideal
          omitted -> the standard ladder (actual if under ideal,
          ideal if within 30%, adjusted if over)
   load   loading dose (never reduced for renal function)
   loadwhy  why it is not reduced
   bands  [ceiling CrCl, dose, status]
          A band applies when CrCl is at or below its ceiling and
          above the next ceiling down. 999 = no upper limit.
          status: ok | adj | care | avoid
   ihd    intermittent haemodialysis
   crrt   continuous renal replacement therapy
   hep    liver
   lvl    drug level monitoring (shows the lab marker)
   notes  things worth remembering at the bedside
   ============================================================ */

var DRUG_VERSION = '1.0';

var CLASSES = [
  ['carbapenem',      'Carbapenem',      '#22D3EE'],
  ['penicillin',      'Penicillin',      '#A78BFA'],
  ['cephalosporin',   'Cephalosporin',   '#818CF8'],
  ['mrsa',            'Anti-MRSA',       '#F472B6'],
  ['polymyxin',       'Polymyxin',       '#FB7185'],
  ['aminoglycoside',  'Aminoglycoside',  '#A3E635'],
  ['quinolone',       'Quinolone',       '#2DD4BF'],
  ['tetracycline',    'Tetracycline',    '#F0ABFC'],
  ['antifungal',      'Antifungal',      '#FDBA74'],
  ['antiviral',       'Antiviral',       '#7DD3FC'],
  ['other',           'Other',           '#94A3B8']
];

var TAGS = [
  ['pseudo',   'Anti-pseudomonal'],
  ['mrsa',     'Anti-MRSA'],
  ['atypical', 'Atypical cover'],
  ['anaerobe', 'Anaerobic cover'],
  ['esbl',     'ESBL'],
  ['cro',      'Carbapenem-resistant'],
  ['cns',      'CNS penetration'],
  ['ckdsafe',  'CKD-safe'],
  ['pregsafe', 'Pregnancy-safe'],
  ['qt',       'QT prolonging'],
  ['nephro',   'Nephrotoxic'],
  ['seizure',  'Pro-convulsant'],
  ['nasal',    'High sodium load']
];

var DRUGS = [

/* ---------- CARBAPENEMS ---------- */
{n:'Meropenem', al:'Meronem Merotec Neopenem', c:'carbapenem',
 tag:'Pseudomonas, ESBL, MDR Gram-negatives',
 tg:['pseudo','esbl','anaerobe','cns','seizure'],
 load:'2 g IV', loadwhy:'Give the full load whatever the CrCl. Only the maintenance is reduced.',
 bands:[[999,'1 g IV q8h','ok'],[50,'1 g IV q12h','adj'],[25,'500 mg IV q12h','adj'],[10,'500 mg IV q24h','adj']],
 ihd:'500 mg q24h — give after the session', crrt:'1 g q8h (CVVHDF) — do not reduce',
 hep:'No change',
 notes:['CNS infection or MDR organism: 2 g q8h.','Run the maintenance over 3 hours — better time above MIC in sepsis.','Seizure risk climbs with high dose, renal failure and CNS disease.','Valproate levels collapse — do not combine in an epileptic.']},

{n:'Imipenem-cilastatin', al:'Tienam Primaxin', c:'carbapenem',
 tag:'Broad Gram-negative, anaerobes',
 tg:['pseudo','esbl','anaerobe','seizure'],
 bands:[[999,'500 mg IV q6h','ok'],[60,'500 mg IV q8h','adj'],[30,'500 mg IV q8h','adj'],[15,'500 mg IV q12h','adj'],[0,'Avoid unless on dialysis','avoid']],
 ihd:'250–500 mg q12h after dialysis', crrt:'500 mg q6–8h',
 hep:'No change',
 notes:['Highest seizure risk of the carbapenems. Avoid in CNS infection or established epilepsy.','Meropenem is the safer choice after brain injury.']},

{n:'Ertapenem', al:'Invanz', c:'carbapenem',
 tag:'ESBL — NOT Pseudomonas or Acinetobacter',
 tg:['esbl','anaerobe'],
 bands:[[999,'1 g IV q24h','ok'],[30,'500 mg IV q24h','adj']],
 ihd:'500 mg daily after dialysis', crrt:'1 g q24h',
 hep:'No change',
 notes:['No cover for Pseudomonas or Acinetobacter — the wrong drug for most ICU VAP.','Highly protein bound; a low albumin raises the free drug.']},

/* ---------- PENICILLINS ---------- */
{n:'Piperacillin-tazobactam', al:'Zosyn Tazocin Pipracil Piptaz', c:'penicillin',
 tag:'Pseudomonas, anaerobes, empiric HAP',
 tg:['pseudo','anaerobe','esbl'],
 load:'4.5 g IV', loadwhy:'Load in full, then adjust the maintenance.',
 bands:[[999,'4.5 g IV q6h','ok'],[40,'4.5 g IV q8h','adj'],[20,'4.5 g IV q12h','adj']],
 ihd:'2.25 g q8h + 0.75 g after each dialysis', crrt:'4.5 g q8h over 4 hours',
 hep:'No change',
 notes:['Extended 4-hour infusion for the maintenance doses in septic shock.','Watch for AKI when it runs alongside vancomycin.','Metronidazole on top is redundant — the anaerobic cover is already here.']},

{n:'Ampicillin-sulbactam', al:'Unasyn Sulbacin', c:'penicillin',
 tag:'Acinetobacter (high dose), aspiration',
 tg:['anaerobe','cro'],
 bands:[[999,'3 g IV q6h','ok'],[30,'3 g IV q12h','adj'],[15,'3 g IV q24h','adj']],
 ihd:'3 g q24h after dialysis', crrt:'3 g q8–12h',
 hep:'No change',
 notes:['In MDR Acinetobacter sulbactam is the active half — high dose 9 g sulbactam/day (3 g ampi-sulbactam q4h) with normal kidneys.','Reduce that high-dose regimen in renal failure exactly as above.']},

{n:'Amoxicillin-clavulanate', al:'Augmentin Co-amoxiclav Fimoxyclav Moxaclav', c:'penicillin',
 tag:'Community pneumonia, aspiration, biliary',
 tg:['anaerobe','pregsafe'],
 bands:[[999,'1.2 g IV q8h','ok'],[30,'1.2 g IV q12h','adj'],[10,'1.2 g then 600 mg IV q24h','adj']],
 ihd:'1.2 g then 600 mg q24h, plus a dose after dialysis', crrt:'1.2 g q8h',
 hep:'Cholestatic hepatitis — avoid if there is existing liver disease',
 notes:['Clavulanate is the part that causes the hepatitis and the diarrhoea.']},

{n:'Flucloxacillin', al:'Floxapen Cloxacillin', c:'penicillin',
 tag:'MSSA — endocarditis, bone, skin',
 tg:[],
 bands:[[999,'2 g IV q4–6h','ok'],[10,'2 g IV q8h','adj']],
 ihd:'2 g q8h', crrt:'2 g q6h',
 hep:'Cholestatic hepatitis — avoid in liver disease',
 notes:['Beats vancomycin for MSSA. Narrow down as soon as sensitivities are back.']},

{n:'Ampicillin', al:'Ampicilin', c:'penicillin',
 tag:'Listeria, enterococcus, meningitis add-on',
 tg:['cns','pregsafe'],
 bands:[[999,'2 g IV q4–6h','ok'],[30,'2 g IV q8h','adj'],[10,'2 g IV q12h','adj']],
 ihd:'1–2 g q12–24h, give after dialysis', crrt:'2 g q6–8h',
 hep:'No change',
 notes:['Listeria meningitis: 2 g q4h — add it for the elderly, pregnant or immunosuppressed.']},

{n:'Benzylpenicillin', al:'Penicillin G Crystalline penicillin', c:'penicillin',
 tag:'Streptococci, meningococcus, leptospirosis',
 tg:['cns','pregsafe','seizure'],
 bands:[[999,'2.4 g (4 MU) IV q4h','ok'],[30,'Reduce total daily dose by 25%','adj'],[10,'Reduce total daily dose by 50%','adj']],
 ihd:'Give a dose after dialysis', crrt:'2.4 g q4–6h',
 hep:'No change',
 notes:['Carries a large potassium load at high dose — check K in renal failure.','Neurotoxicity and seizures if a full dose is continued in renal failure.']},

/* ---------- CEPHALOSPORINS ---------- */
{n:'Cefepime', al:'Maxipime Cepim', c:'cephalosporin',
 tag:'Pseudomonas, AmpC organisms',
 tg:['pseudo','cns','seizure'],
 bands:[[999,'2 g IV q8h','ok'],[60,'2 g IV q12h','adj'],[29,'2 g IV q24h','adj'],[11,'1 g IV q24h','adj']],
 ihd:'1 g after each dialysis', crrt:'2 g q12h',
 hep:'No change',
 notes:['Cefepime neurotoxicity — myoclonus, altered consciousness, non-convulsive status. Almost always from a dose left unadjusted.','If a renal-failure patient becomes encephalopathic on cefepime, stop the cefepime before reaching for sedation.']},

{n:'Ceftazidime', al:'Fortum Ceftum-IV Tazid', c:'cephalosporin',
 tag:'Pseudomonas',
 tg:['pseudo','cns'],
 bands:[[999,'2 g IV q8h','ok'],[50,'2 g IV q12h','adj'],[30,'2 g IV q24h','adj'],[15,'1 g IV q24h','adj'],[5,'500 mg IV q24h','adj']],
 ihd:'1 g after dialysis', crrt:'2 g q12h',
 hep:'No change',
 notes:['No Gram-positive cover worth relying on.']},

{n:'Ceftriaxone', al:'Rocephin Ceftron Traxone', c:'cephalosporin',
 tag:'CAP, meningitis, biliary sepsis',
 tg:['cns','ckdsafe','pregsafe'],
 bands:[[999,'2 g IV q24h','ok']],
 ihd:'2 g q24h — no supplement needed', crrt:'2 g q24h',
 hep:'Liver and renal failure together: cap at 2 g/day',
 notes:['No renal adjustment — dual biliary and renal clearance.','Meningitis: 2 g q12h.','No Pseudomonas cover.','Biliary sludge and pseudolithiasis on long courses.','Do not run in the same line as calcium.']},

{n:'Cefotaxime', al:'Claforan', c:'cephalosporin',
 tag:'Meningitis, SBP, community sepsis',
 tg:['cns','pregsafe'],
 bands:[[999,'2 g IV q6–8h','ok'],[20,'Halve the total daily dose','adj']],
 ihd:'2 g q24h after dialysis', crrt:'2 g q8–12h',
 hep:'No change',
 notes:['First choice in spontaneous bacterial peritonitis.','Preferred over ceftriaxone in neonates and where biliary sludge matters.']},

{n:'Cefuroxime', al:'Zinacef Sefur Kefurox', c:'cephalosporin',
 tag:'Community pneumonia, surgical prophylaxis',
 tg:['pregsafe'],
 bands:[[999,'1.5 g IV q8h','ok'],[20,'1.5 g IV q12h','adj'],[10,'1.5 g IV q24h','adj']],
 ihd:'1.5 g after dialysis', crrt:'1.5 g q12h',
 hep:'No change',
 notes:['Poor CNS penetration — not a meningitis drug.']},

{n:'Cefazolin', al:'Ancef Kefzol', c:'cephalosporin',
 tag:'MSSA, surgical prophylaxis',
 tg:['pregsafe'],
 bands:[[999,'2 g IV q8h','ok'],[35,'2 g IV q12h','adj'],[10,'2 g IV q24h','adj']],
 ihd:'2 g after each dialysis session', crrt:'2 g q12h',
 hep:'No change',
 notes:['Equal to flucloxacillin for MSSA bacteraemia and better tolerated.','No CNS penetration.']},

{n:'Cefoperazone-sulbactam', al:'Sulcef Sulperazone Cefosul', c:'cephalosporin',
 tag:'Broad Gram-negative, biliary sepsis',
 tg:['pseudo','anaerobe','esbl'],
 bands:[[999,'2–4 g IV q12h','ok'],[30,'Cap sulbactam at 1 g q12h','adj'],[15,'Cap sulbactam at 500 mg q12h','adj']],
 ihd:'Cefoperazone unchanged; sulbactam 500 mg q12h after dialysis', crrt:'2 g q12h',
 hep:'Biliary excretion — reduce in obstructive jaundice or severe liver disease',
 notes:['Cefoperazone clears through the bile, sulbactam through the kidney — only the sulbactam half needs adjusting.','Hypoprothrombinaemia: check INR and give vitamin K on long courses.','Disulfiram reaction with alcohol.']},

{n:'Ceftazidime-avibactam', al:'Zavicefta Avycaz', c:'cephalosporin',
 tag:'KPC and OXA-48 carbapenem-resistant organisms',
 tg:['pseudo','cro','esbl'],
 bands:[[999,'2.5 g IV q8h (2-hour infusion)','ok'],[50,'1.25 g IV q8h','adj'],[30,'0.94 g IV q12h','adj'],[15,'0.94 g IV q24h','adj'],[5,'0.94 g IV q48h','adj']],
 ihd:'0.94 g q48h after dialysis', crrt:'2.5 g q8h',
 hep:'No change',
 notes:['No activity against metallo-beta-lactamases (NDM) — add aztreonam if NDM is suspected.','Under-dosing in renal failure is a recognised cause of emergent resistance.']},

/* ---------- ANTI-MRSA ---------- */
{n:'Vancomycin', al:'Vancocin Vanlid', c:'mrsa',
 tag:'MRSA, coagulase-negative staph',
 tg:['mrsa','nephro'],
 wt:true, wb:'tbw',
 load:'20–35 mg/kg (actual weight, max 3 g)', loadwhy:'The load uses actual body weight and is never reduced for renal failure.',
 bands:[[999,'15–20 mg/kg q8–12h','ok'],[90,'15–20 mg/kg q12h','ok'],[49,'15–20 mg/kg q24h','adj'],[20,'One dose, then redose on the level','care']],
 ihd:'Load, then 500–1000 mg after each session — or dose on the pre-dialysis level',
 crrt:'15–20 mg/kg q24h, level-guided',
 hep:'No change',
 lvl:'Target AUC24/MIC 400–600. Take a level before the 4th dose, sooner if renal function is moving.',
 notes:['Trough-only dosing is outdated — use AUC where you can.','Vd rises in sepsis; under-loading is the commonest error with this drug.','Oral vancomycin 125 mg q6h is for C. difficile and is a different problem entirely.']},

{n:'Teicoplanin', al:'Targocid Teiconel', c:'mrsa',
 tag:'MRSA alternative',
 tg:['mrsa'],
 wt:true, wb:'tbw',
 load:'6–12 mg/kg q12h for 3–5 doses', loadwhy:'Long half-life. Without a proper load it takes days to reach target.',
 bands:[[999,'6 mg/kg q24h','ok'],[80,'6 mg/kg q48h','adj'],[30,'6 mg/kg q72h','adj']],
 ihd:'Load fully, then 6 mg/kg q72h after dialysis', crrt:'6 mg/kg q24h',
 hep:'No change',
 lvl:'Trough 15–20 mg/L for deep-seated infection, 30–40 for endocarditis.',
 notes:['Less nephrotoxic than vancomycin — useful when the kidneys are already struggling.','The dose is often written as 400 mg; check that against the weight before accepting it.']},

{n:'Linezolid', al:'Zyvox Linzolid Linospan', c:'mrsa',
 tag:'MRSA, VRE, MRSA pneumonia',
 tg:['mrsa','ckdsafe'],
 bands:[[999,'600 mg IV/PO q12h','ok']],
 ihd:'600 mg q12h — give after dialysis when the timing coincides', crrt:'600 mg q12h',
 hep:'No change',
 notes:['No renal adjustment at all.','Thrombocytopenia after 10–14 days — check platelets twice weekly.','Serotonin syndrome with SSRIs, fentanyl, tramadol.','Better lung penetration than vancomycin.']},

{n:'Daptomycin', al:'Cubicin', c:'mrsa',
 tag:'MRSA bacteraemia, right-sided endocarditis',
 tg:['mrsa'],
 wt:true, wb:'tbw',
 bands:[[999,'6–10 mg/kg IV q24h','ok'],[30,'6–10 mg/kg IV q48h','adj']],
 ihd:'Same dose q48h, given after dialysis', crrt:'8–10 mg/kg q24h',
 hep:'No change',
 notes:['Never for pneumonia — surfactant inactivates it.','Check CK weekly and hold the statin.','Use it when vancomycin fails or the MIC is creeping up.']},

/* ---------- POLYMYXINS ---------- */
{n:'Colistimethate (CMS)', al:'Colistin Polymixin E Colomycin Coly-Mycin', c:'polymyxin',
 tag:'MDR/XDR Acinetobacter, Klebsiella, Pseudomonas',
 tg:['pseudo','cro','nephro'],
 load:'9 MIU IV (300 mg CBA) over 30–60 min', loadwhy:'The load is identical for every patient — dialysis, anuric, normal kidneys. Never reduce it. The first maintenance dose follows 12–24 hours later.',
 bands:[[999,'5.45 MIU q12h (10.9 MIU/day)','ok'],[90,'5.15 MIU q12h (10.3 MIU/day)','ok'],[80,'4.5 MIU q12h (9 MIU/day)','ok'],[70,'4.2 MIU q12h (8.35 MIU/day)','adj'],[60,'3.7 MIU q12h (7.4 MIU/day)','adj'],[50,'3.3 MIU q12h (6.65 MIU/day)','adj'],[40,'3 MIU q12h (5.9 MIU/day)','adj'],[30,'2.65 MIU q12h (5.3 MIU/day)','adj'],[20,'2.4 MIU q12h (4.85 MIU/day)','adj'],[10,'2.2 MIU q12h (4.4 MIU/day)','adj'],[5,'2 MIU q12h (3.95 MIU/day)','adj']],
 ihd:'3.95 MIU/day (130 mg CBA) on non-dialysis days; add roughly 10% per hour of dialysis and give it after the session',
 crrt:'6.65 MIU q12h (13.3 MIU/day, 440 mg CBA/day) — CRRT clears it, do NOT reduce',
 hep:'No change',
 notes:['Units matter: 1 MIU \u2248 33 mg colistin base activity \u2248 80 mg colistimethate. 9 MIU = 90 lac = 300 mg CBA. Check what the vial in your hand is labelled in before drawing up.','The maintenance ladder above comes from the Nation look-up table used by the 2019 international consensus, targeting an average steady-state colistin of 2 mg/L.','Nephrotoxic — creatinine and urine output every day.','Nebulised colistin is an add-on in VAP, never a substitute for the IV dose.','Use ideal body weight if the patient is obese.']},

{n:'Polymyxin B', al:'Polymixin B', c:'polymyxin',
 tag:'MDR Gram-negative bacteraemia',
 tg:['pseudo','cro','nephro'],
 wt:true, wb:'tbw',
 load:'2–2.5 mg/kg (20,000–25,000 IU/kg)', loadwhy:'Load over 1 hour, then start the maintenance 12 hours later.',
 bands:[[999,'1.25–1.5 mg/kg q12h — no renal adjustment','ok']],
 ihd:'Same dose — do not reduce', crrt:'Same dose — do not reduce',
 hep:'No change',
 notes:['Dosed on total body weight and NOT adjusted for renal function. That is the key difference from colistin.','Better than colistin for bloodstream infection; colistin is better for a urinary source.']},

/* ---------- AMINOGLYCOSIDES ---------- */
{n:'Amikacin', al:'Amikin Mikacin', c:'aminoglycoside',
 tag:'Gram-negative synergy, MDR',
 tg:['pseudo','nephro'],
 wt:true,
 bands:[[999,'15–20 mg/kg q24h','ok'],[60,'15 mg/kg q36h','adj'],[40,'15 mg/kg q48h','adj'],[20,'Single dose, then redose on the level','care']],
 ihd:'5–7.5 mg/kg after each dialysis', crrt:'7.5 mg/kg q24–48h, level-guided',
 hep:'No change',
 lvl:'Once daily: peak 60–80 mg/L, trough under 5 (ideally under 2.5).',
 notes:['Use adjusted body weight if obese, and keep the first dose high — Vd is expanded in sepsis.','Do not run beyond 5–7 days without a strong reason.']},

{n:'Gentamicin', al:'Genticyn Garamycin', c:'aminoglycoside',
 tag:'Synergy, urinary source',
 tg:['nephro'],
 wt:true,
 bands:[[999,'5–7 mg/kg q24h','ok'],[60,'5 mg/kg q36h','adj'],[40,'5 mg/kg q48h','adj'],[20,'Single dose, then redose on the level','care']],
 ihd:'1–2 mg/kg after dialysis', crrt:'2.5 mg/kg q24–48h, level-guided',
 hep:'No change',
 lvl:'Trough under 1 mg/L on once-daily dosing.',
 notes:['Ototoxicity is missed in a sedated patient and it is usually permanent.']},

/* ---------- QUINOLONES ---------- */
{n:'Ciprofloxacin', al:'Ciprocin Ciproxin Cipro', c:'quinolone',
 tag:'Pseudomonas, Gram-negatives, atypicals',
 tg:['pseudo','atypical','qt'],
 bands:[[999,'400 mg IV q8h','ok'],[50,'400 mg IV q12h','adj'],[30,'400 mg IV q24h','adj']],
 ihd:'400 mg q24h after dialysis', crrt:'400 mg q12h',
 hep:'No change',
 notes:['q8h for Pseudomonas or severe sepsis, q12h otherwise.','QT prolongation — look at the ECG if amiodarone, haloperidol or a macrolide is also running.','Antacids, sucralfate and feeds chelate it — separate the doses if enteral.']},

{n:'Levofloxacin', al:'Levoxin Tavanic Levo', c:'quinolone',
 tag:'Community pneumonia, atypicals',
 tg:['atypical','qt'],
 bands:[[999,'750 mg IV q24h','ok'],[49,'750 mg IV q48h','adj'],[19,'750 mg once, then 500 mg q48h','adj']],
 ihd:'750 mg once, then 500 mg q48h', crrt:'750 mg q24–48h',
 hep:'No change',
 notes:['QT prolongation, tendon rupture, delirium in the elderly.']},

{n:'Moxifloxacin', al:'Avelox Moxiflox', c:'quinolone',
 tag:'Atypicals, anaerobes, aspiration',
 tg:['atypical','anaerobe','qt','ckdsafe'],
 bands:[[999,'400 mg IV q24h','ok']],
 ihd:'400 mg q24h', crrt:'400 mg q24h',
 hep:'Child-Pugh C: avoid',
 notes:['No renal adjustment — useful when the kidneys are gone.','Poor urinary concentration — not a UTI drug.','The longest QT effect of the quinolones.']},

/* ---------- TETRACYCLINES ---------- */
{n:'Tigecycline', al:'Tygacil Tigecyclin', c:'tetracycline',
 tag:'MDR Acinetobacter, intra-abdominal',
 tg:['mrsa','cro','anaerobe','ckdsafe'],
 load:'100 mg IV (200 mg for MDR)', loadwhy:'The loading dose is not renally adjusted.',
 bands:[[999,'50 mg IV q12h (high dose 100 mg q12h)','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Child-Pugh C: 100 mg load, then 25 mg q12h',
 notes:['No renal adjustment.','Poor blood and urine levels — not for bacteraemia or a urinary source on its own. There is a mortality signal with monotherapy.','Nausea and vomiting are common; watch for pancreatitis.']},

{n:'Minocycline IV', al:'Minocin', c:'tetracycline',
 tag:'Acinetobacter, Stenotrophomonas',
 tg:['cro','ckdsafe'],
 load:'200 mg IV',
 bands:[[999,'100 mg IV q12h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Caution in severe impairment',
 notes:['No renal adjustment.','A useful partner for MDR Acinetobacter alongside a polymyxin or sulbactam.']},

{n:'Doxycycline', al:'Doxicap Vibramycin', c:'tetracycline',
 tag:'Atypicals, rickettsia, scrub typhus, leptospirosis',
 tg:['atypical','ckdsafe'],
 bands:[[999,'100 mg IV/PO q12h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Caution in severe impairment',
 notes:['No renal adjustment.','The drug for undifferentiated fever with a rash or a tick or mite exposure — start it early, do not wait for serology.']},

/* ---------- ANTIFUNGALS ---------- */
{n:'Fluconazole', al:'Diflucan Flugal Fluzol', c:'antifungal',
 tag:'Candida albicans, prophylaxis',
 tg:['qt'],
 load:'800 mg IV (12 mg/kg)', loadwhy:'Full load whatever the renal function.',
 bands:[[999,'400 mg IV q24h','ok'],[50,'200 mg IV q24h','adj']],
 ihd:'400 mg after each dialysis session', crrt:'400–800 mg q24h — no reduction',
 hep:'Monitor LFTs',
 notes:['Not active against C. krusei; C. glabrata is often resistant.','Prolongs QT and interacts widely through CYP.']},

{n:'Caspofungin', al:'Cancidas', c:'antifungal',
 tag:'Candidaemia, empiric antifungal',
 tg:['ckdsafe'],
 load:'70 mg IV',
 bands:[[999,'50 mg IV q24h (70 mg if over 80 kg)','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Child-Pugh B: 35 mg daily. Child-Pugh C: no data — use with caution',
 notes:['No renal adjustment — first choice antifungal when the kidneys have failed.','First line for candidaemia in the unstable or azole-exposed patient.']},

{n:'Micafungin', al:'Mycamine', c:'antifungal',
 tag:'Candidaemia, oesophageal candidiasis',
 tg:['ckdsafe'],
 bands:[[999,'100 mg IV q24h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'No change in mild to moderate impairment',
 notes:['No renal adjustment and no loading dose needed.','Fewer interactions than caspofungin.']},

{n:'Voriconazole', al:'Vfend Vorizol', c:'antifungal',
 tag:'Aspergillus',
 tg:['qt'],
 wt:true, wb:'tbw',
 load:'6 mg/kg IV q12h × 2 doses',
 bands:[[999,'4 mg/kg IV q12h','ok'],[50,'Switch to oral — the IV vehicle accumulates','care']],
 ihd:'Use the oral route', crrt:'IV acceptable — cyclodextrin is cleared',
 hep:'Child-Pugh A/B: full load, halve the maintenance. Child-Pugh C: avoid',
 lvl:'Trough 1–5.5 mg/L.',
 notes:['The IV cyclodextrin vehicle accumulates below CrCl 50 — go oral.','Visual disturbance, hallucinations, hepatotoxicity.']},

{n:'Anidulafungin', al:'Ecalta Eraxis', c:'antifungal',
 tag:'Candidaemia, invasive candidiasis',
 tg:['ckdsafe'],
 load:'200 mg IV', loadwhy:'A load is needed on day 1 — the maintenance alone takes days to reach target.',
 bands:[[999,'100 mg IV q24h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'No change — degraded chemically in plasma, not by the liver',
 notes:['No renal and no hepatic adjustment at all. The echinocandin for a patient whose kidneys and liver have both failed.','Fewest drug interactions of the three echinocandins — useful alongside tacrolimus, rifampicin or an azole.','Endocarditis and other deep infection: 100–200 mg daily has been used.','Not for a urinary source — negligible urine levels, like the whole class.']},

{n:'Posaconazole', al:'Noxafil Posacon', c:'antifungal',
 tag:'Mould prophylaxis, mucormycosis, salvage aspergillosis',
 tg:['qt'],
 load:'300 mg IV/PO twice on day 1', loadwhy:'Day-1 twice-daily loading, then once daily. A switch between the IV and the delayed-release tablet needs no new load.',
 bands:[[999,'300 mg IV/PO q24h','ok'],[50,'Use the tablet or suspension — the IV vehicle accumulates','care']],
 ihd:'Use the oral route', crrt:'IV acceptable — cyclodextrin is cleared',
 hep:'No routine adjustment; monitor LFTs',
 lvl:'Trough above 0.7 mg/L for prophylaxis, above 1.0–1.25 mg/L for treatment. Take it after 5–7 days.',
 notes:['Covers mucorales, which voriconazole does not. That is the main reason to reach for it here.','The IV formulation carries cyclodextrin like voriconazole, so below CrCl 50 go oral.','The delayed-release tablet absorbs far better than the old suspension — do not swap them dose for dose.','Strong CYP3A4 inhibitor: tacrolimus, ciclosporin, statins and vincristine all need attention.']},

{n:'Amphotericin B deoxycholate', al:'Conventional amphotericin Fungizone AmB-d', c:'antifungal',
 tag:'Candidaemia, cryptococcus, mucormycosis where lipid is unavailable',
 tg:['nephro'],
 wt:true, wb:'tbw',
 bands:[[999,'0.7–1 mg/kg IV q24h (up to 1.5 mg/kg in mucormycosis)','ok'],[30,'Same dose — but switch to the liposomal form if you can','care']],
 ihd:'Same dose, given after dialysis', crrt:'Same dose',
 hep:'No change',
 notes:['No renal dose adjustment, and yet it is the most nephrotoxic drug on this list. If the liposomal form is available, use it instead.','Pre-load with 500–1000 mL of saline before each dose, and replace potassium and magnesium daily.','Infusion reactions — rigors, fever, vomiting — in the first hours. Premedicate and run it over 4–6 hours.','Not interchangeable milligram for milligram with the liposomal form: 1 mg/kg of this is not 1 mg/kg of AmBisome.']},

{n:'Liposomal amphotericin B', al:'AmBisome Ampholip Fungisome', c:'antifungal',
 tag:'Mucormycosis, refractory fungal infection',
 tg:['nephro'],
 wt:true, wb:'tbw',
 bands:[[999,'3–5 mg/kg IV q24h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'No change',
 notes:['No renal dose adjustment, but it is nephrotoxic — creatinine, K and Mg daily, and replace the losses.','Pre-load with saline to reduce the renal injury.','Mucormycosis needs 5–10 mg/kg plus surgery.']},

/* ---------- ANTIVIRALS ---------- */
{n:'Acyclovir IV', al:'Aciclovir Zovirax Xovir', c:'antiviral',
 tag:'HSV encephalitis, varicella, disseminated zoster',
 tg:['cns','nephro','seizure'],
 wt:true, wb:'ibw',
 bands:[[999,'10 mg/kg IV q8h','ok'],[50,'10 mg/kg IV q12h','adj'],[25,'10 mg/kg IV q24h','adj'],[10,'5 mg/kg IV q24h','adj']],
 ihd:'5 mg/kg after each dialysis', crrt:'5–10 mg/kg q24h',
 hep:'No change',
 notes:['Dose on ideal body weight if obese.','Crystal nephropathy — run it over an hour and keep the patient well filled.','Neurotoxicity in renal failure looks like the encephalitis you are treating. If the patient worsens on day 3, think drug before thinking failure.','Start it on suspicion in encephalitis; do not wait for the PCR.']},

{n:'Oseltamivir', al:'Tamiflu Fluvir', c:'antiviral',
 tag:'Influenza',
 tg:['pregsafe'],
 bands:[[999,'75 mg PO/NG q12h','ok'],[60,'30 mg PO q12h','adj'],[30,'30 mg PO q24h','adj']],
 ihd:'30 mg after each dialysis session', crrt:'75 mg q24h',
 hep:'No change',
 notes:['Severe influenza in ICU: double dose (150 mg q12h) is often used, though the evidence is thin.','Start within 48 hours if you can, but still give it late in the ventilated patient.']},

/* ---------- OTHER ---------- */
{n:'Metronidazole', al:'Flagyl Metrogyl Amodis', c:'other',
 tag:'Anaerobes, amoebiasis, C. difficile',
 tg:['anaerobe','ckdsafe','cns'],
 bands:[[999,'500 mg IV q8h','ok']],
 ihd:'500 mg q8h — give after dialysis', crrt:'500 mg q8h',
 hep:'Child-Pugh C: 500 mg q12h',
 notes:['No renal adjustment.','Redundant alongside pip-tazo, a carbapenem or moxifloxacin — stop one of them.','Peripheral neuropathy on courses beyond two weeks.']},

{n:'Clindamycin', al:'Dalacin Clindacin', c:'other',
 tag:'Necrotising fasciitis, toxin suppression',
 tg:['anaerobe','mrsa','ckdsafe','pregsafe'],
 bands:[[999,'600–900 mg IV q8h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Severe impairment: reduce or monitor',
 notes:['No renal adjustment.','Add it to a beta-lactam in necrotising soft tissue infection and toxic shock for the antitoxin effect.','Highest C. difficile risk of the common agents.']},

{n:'Cotrimoxazole (TMP-SMX)', al:'Bactrim Septrin Cotrim', c:'other',
 tag:'PCP, Stenotrophomonas, Nocardia',
 tg:['mrsa','nephro'],
 wt:true, wb:'tbw',
 bands:[[999,'15–20 mg/kg/day TMP, divided q6–8h','ok'],[30,'Halve the total daily dose','adj'],[15,'Avoid — or 5–10 mg/kg/day TMP with levels','avoid']],
 ihd:'5 mg/kg TMP q24h after dialysis', crrt:'Reduce by about 50%, watch K',
 hep:'Caution',
 notes:['The doses here are milligrams of trimethoprim, not of the total.','Hyperkalaemia, and a creatinine rise that is often not true AKI.','Marrow suppression on long courses — check the blood count.','PCP with hypoxia also needs steroid.']},

{n:'Aztreonam', al:'Azactam', c:'other',
 tag:'Gram-negatives in penicillin allergy, NDM combinations',
 tg:['pseudo','cro'],
 load:'2 g IV',
 bands:[[999,'2 g IV q8h','ok'],[30,'1 g IV q8h','adj'],[10,'500 mg IV q8h','adj']],
 ihd:'500 mg q8h, extra 500 mg after dialysis', crrt:'2 g q8–12h',
 hep:'No change',
 notes:['Safe in true penicillin anaphylaxis — no cross-reactivity.','Paired with ceftazidime-avibactam for NDM producers.']},

{n:'Azithromycin', al:'Azomax Zithromax Azin', c:'other',
 tag:'Atypical cover in community pneumonia',
 tg:['atypical','ckdsafe','qt','pregsafe'],
 bands:[[999,'500 mg IV q24h','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Caution in severe impairment',
 notes:['No renal adjustment.','QT prolongation.','Anti-inflammatory benefit in severe CAP beyond the atypical cover.']},

{n:'Rifampicin', al:'Rifadin Rimactane R-cin', c:'other',
 tag:'Prosthetic material, biofilm, staphylococcal add-on',
 tg:['mrsa','cns','ckdsafe'],
 bands:[[999,'600 mg IV/PO q24h (or 10 mg/kg)','ok']],
 ihd:'No change', crrt:'No change',
 hep:'Severe liver disease: avoid or reduce with close LFT monitoring',
 notes:['No renal adjustment.','Never as monotherapy — resistance emerges within days.','A powerful CYP inducer. It will wreck warfarin, tacrolimus, azoles, steroids and many antiretrovirals.','Orange urine, sweat and tears — warn the family before they panic.']},

{n:'Fosfomycin IV', al:'Fosmicin Monurol', c:'other',
 tag:'MDR Gram-negatives, combination partner',
 tg:['cro','esbl','nasal'],
 bands:[[999,'4–8 g IV q8h','ok'],[50,'4–8 g IV q12h','adj'],[20,'4 g IV q12h','adj'],[10,'4 g IV q24h','adj']],
 ihd:'2–4 g after each dialysis', crrt:'4–8 g q12h',
 hep:'No change',
 notes:['Large sodium load — roughly 14 mmol of sodium per gram. In heart failure or cerebral oedema that adds up fast.','Hypokalaemia is common; replace it.','A partner drug, not a solo agent — resistance appears quickly.']}

];
