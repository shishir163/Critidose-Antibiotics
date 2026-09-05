/* ============================================================
   CritiDose — infusion data
   Version 1.0  ·  Step 2
   ------------------------------------------------------------
   Sources: standard critical care references and common unit practice.
   Not verified line by line. Your own concentration always wins.
   ------------------------------------------------------------
   Record shape
   ------------
   n       name
   al      aliases for search
   k       group: vaso | sed | analg | nmba | other
   unit    the unit you think in for this drug —
           mcg/kg/min · mcg/kg/hr · mcg/min · mg/kg/hr · mg/hr · units/hr
   lo, hi  usual range in that unit
   amt     default drug amount in the syringe
   au      unit of amt: mg | mcg | units
   vol     default volume in mL
   pre     the amounts your unit might draw up — tap to switch
   pvol    alternative volumes, if the drug is not a 50 mL syringe drug
   bolus   loading or bolus dose
   renal   what renal failure does to it
   hep     what liver failure does to it
   max     hard ceiling worth flagging
   notes   bedside points
   ============================================================ */

var INFUSION_VERSION = '1.0';

var IGROUPS = [
  ['vaso',  'Vasoactive',        '#FB7185'],
  ['sed',   'Sedation',          '#A78BFA'],
  ['analg', 'Analgesia',         '#FBBF24'],
  ['nmba',  'Muscle relaxant',   '#22D3EE'],
  ['other', 'Other infusions',   '#34D399']
];

var INFUSIONS = [

/* ---------- VASOACTIVE ---------- */
{n:'Noradrenaline', al:'Norepinephrine Levophed Norad', k:'vaso',
 unit:'mcg/kg/min', lo:0.02, hi:1, amt:4, au:'mg', vol:50, pre:[2,4,8,16],
 renal:'No adjustment', hep:'No adjustment',
 notes:['Ampoules are usually labelled as the tartrate salt: 4 mg tartrate ≈ 2 mg noradrenaline base. Whichever your unit writes on the syringe, put that number in the box and stay consistent — mixing the two is how a patient silently gets half the dose.','Central line where possible. Through a peripheral line it is a bridge, not a plan — check the site every hour.','No ceiling dose in shock, but above about 0.5 mcg/kg/min start looking for the reason: hypovolaemia, acidosis, low ionised calcium, adrenal insufficiency, a missed source.']},

{n:'Adrenaline', al:'Epinephrine Adrenalin', k:'vaso',
 unit:'mcg/kg/min', lo:0.02, hi:0.5, amt:4, au:'mg', vol:50, pre:[2,4,8],
 bolus:'Cardiac arrest: 1 mg IV every 3–5 minutes. Anaphylaxis: 0.5 mg IM.',
 renal:'No adjustment', hep:'No adjustment',
 notes:['Lactate and glucose rise on adrenaline through beta-2 effects. That rise is not automatically worsening perfusion — read it with the clinical picture.','First choice infusion in anaphylaxis and in cardiac arrest rhythms; second line in septic shock.']},

{n:'Dopamine', al:'Dopamin', k:'vaso',
 unit:'mcg/kg/min', lo:2, hi:20, amt:200, au:'mg', vol:50, pre:[200,400],
 renal:'No adjustment', hep:'No adjustment',
 notes:['More arrhythmia than noradrenaline for the same blood pressure — that is why it is no longer the default.','"Renal dose dopamine" does not protect the kidney. It has been tested and it does not work.']},

{n:'Dobutamine', al:'Dobutrex Dobutamin', k:'vaso',
 unit:'mcg/kg/min', lo:2.5, hi:20, amt:250, au:'mg', vol:50, pre:[250,500],
 renal:'No adjustment', hep:'No adjustment',
 notes:['Inotrope, not a vasopressor — it will drop the blood pressure through vasodilatation if the tank is empty.','For the cold, clamped, low cardiac output patient. Add it to noradrenaline, do not swap.']},

{n:'Vasopressin', al:'ADH Argipressin', k:'vaso',
 unit:'units/hr', lo:0.6, hi:2.4, amt:20, au:'units', vol:50, pre:[20,40],
 renal:'No adjustment', hep:'No adjustment',
 max:'Do not titrate above 2.4 units/hr (0.04 units/min) — it is a fixed add-on, not a titrated drug.',
 notes:['Added at a fixed rate to spare noradrenaline, not chased upwards.','Digital and mesenteric ischaemia at higher rates. Look at the fingers and toes daily.']},

{n:'Phenylephrine', al:'Phenylephrin', k:'vaso',
 unit:'mcg/kg/min', lo:0.1, hi:1.5, amt:10, au:'mg', vol:50, pre:[10,20],
 bolus:'50–100 mcg IV, repeated',
 renal:'No adjustment', hep:'No adjustment',
 notes:['Pure alpha — expect a reflex bradycardia and a fall in cardiac output.','Useful where tachyarrhythmia is the problem, and in the theatre or the peripheral line setting.']},

{n:'Milrinone', al:'Primacor', k:'vaso',
 unit:'mcg/kg/min', lo:0.125, hi:0.75, amt:10, au:'mg', vol:50, pre:[10,20],
 renal:'Renally cleared — halve the rate below CrCl 30 and expect accumulation',
 hep:'No adjustment',
 notes:['Inodilator. Hypotension is the dose-limiting effect, so skip the loading bolus in an unstable patient.','Works through a pathway beyond the beta receptor, so it still works on a fully beta-blocked heart.']},

{n:'Levosimendan', al:'Simdax', k:'vaso',
 unit:'mcg/kg/min', lo:0.05, hi:0.2, amt:12.5, au:'mg', vol:250, pre:[12.5,25], pvol:[250,500],
 renal:'Avoid below CrCl 30 — the active metabolite accumulates',
 hep:'Avoid in severe impairment',
 notes:['Runs for 24 hours only, but the effect lasts a week or more through its active metabolite.','Skip the loading bolus if the patient is hypotensive.']},

{n:'Glyceryl trinitrate', al:'GTN Nitroglycerin Tridil Nitrocine', k:'vaso',
 unit:'mcg/min', lo:5, hi:200, amt:50, au:'mg', vol:50, pre:[25,50],
 renal:'No adjustment', hep:'No adjustment',
 notes:['Tolerance develops within 24 hours — plan a nitrate-free interval or another agent.','Contraindicated after sildenafil or similar within 24–48 hours.','Avoid in right ventricular infarction and in severe aortic stenosis.']},

{n:'Sodium nitroprusside', al:'SNP Nipride Nitroprusside', k:'vaso',
 unit:'mcg/kg/min', lo:0.3, hi:4, amt:50, au:'mg', vol:50, pre:[50],
 renal:'Thiocyanate accumulates in renal failure — limit the duration',
 hep:'Cyanide clearance falls — use with caution',
 max:'Above 4 mcg/kg/min, or beyond 48–72 hours, cyanide toxicity becomes a real risk.',
 notes:['Protect the syringe and line from light.','Rising lactate with a widening anion gap and a falling conscious level on nitroprusside is cyanide toxicity until proven otherwise.']},

{n:'Esmolol', al:'Brevibloc', k:'vaso',
 unit:'mcg/kg/min', lo:50, hi:200, amt:2500, au:'mg', vol:250, pre:[2500], pvol:[250],
 bolus:'500 mcg/kg over 1 minute, if the blood pressure allows',
 renal:'No adjustment', hep:'No adjustment',
 notes:['Half-life of about 9 minutes — the beta blocker for a patient you are not sure will tolerate one.','Stopping it is the antidote.']},

{n:'Labetalol', al:'Trandate Labetolol', k:'vaso',
 unit:'mg/hr', lo:20, hi:160, amt:200, au:'mg', vol:200, pre:[100,200], pvol:[50,100,200],
 bolus:'10–20 mg IV over 2 minutes, doubling every 10 minutes to a total of 300 mg',
 renal:'No adjustment', hep:'Reduce — hepatic metabolism',
 notes:['First choice in hypertensive emergency in pregnancy and in aortic dissection.','Avoid in asthma, decompensated heart failure and heart block.']},

{n:'Amiodarone', al:'Pacet Cordarone Amiodarone', k:'vaso',
 unit:'mg/hr', lo:30, hi:60, amt:900, au:'mg', vol:500, pre:[600,900], pvol:[250,500],
 bolus:'150 mg over 10 minutes, then 1 mg/min for 6 hours, then 0.5 mg/min for 18 hours (900 mg/24 hr)',
 renal:'No adjustment', hep:'Reduce in severe impairment',
 notes:['Dilute in 5% dextrose, never in saline.','Central line for anything beyond a few hours — it is a strong vein irritant.','Slow the bolus if the pressure drops; the hypotension is usually from the rate, not the drug.']},

/* ---------- SEDATION ---------- */
{n:'Propofol', al:'Diprivan Propofol 1%', k:'sed',
 unit:'mg/kg/hr', lo:0.3, hi:4, amt:1000, au:'mg', vol:100, pre:[500,1000], pvol:[50,100],
 bolus:'0.25–1 mg/kg — avoid entirely in shock',
 renal:'No adjustment', hep:'No adjustment',
 max:'Above 4 mg/kg/hr, or beyond 48 hours, propofol infusion syndrome becomes a real risk.',
 notes:['1% propofol is 10 mg/mL neat, so the default here is the undiluted bottle.','Propofol infusion syndrome: metabolic acidosis, rising lactate, rhabdomyolysis, bradyarrhythmia. Look for it before blaming the sepsis.','1.1 kcal/mL of fat — count it in the feed and check triglycerides after 48 hours.','Fastest wake-up for a daily interruption and a neurological check.']},

{n:'Midazolam', al:'Dormicum Midazolam', k:'sed',
 unit:'mg/kg/hr', lo:0.02, hi:0.1, amt:50, au:'mg', vol:50, pre:[15,50],
 bolus:'1–2 mg, repeated',
 renal:'The active metabolite accumulates — sedation can last days after the infusion stops',
 hep:'Reduce — clearance falls',
 notes:['The worst choice for prolonged sedation in renal failure.','Strongest link to delirium of the common sedatives.','Still the right drug in status epilepticus and in severe haemodynamic instability.']},

{n:'Dexmedetomidine', al:'Precedex Dexmed Dextomid', k:'sed',
 unit:'mcg/kg/hr', lo:0.2, hi:1.4, amt:200, au:'mcg', vol:50, pre:[200,400],
 bolus:'Skip the loading bolus — it causes hypotension and bradycardia',
 renal:'No adjustment, but the sedation may run long', hep:'Reduce — hepatic metabolism',
 notes:['The patient stays rousable and cooperative. Less delirium than the benzodiazepines.','Bradycardia and hypotension are dose-limiting. No respiratory depression, so it survives extubation.']},

{n:'Ketamine', al:'Ketalar Ketamin', k:'sed',
 unit:'mg/kg/hr', lo:0.1, hi:0.5, amt:500, au:'mg', vol:50, pre:[200,500],
 bolus:'0.1–0.5 mg/kg for analgesia, 1–2 mg/kg for induction',
 renal:'No adjustment', hep:'Reduce in severe impairment',
 notes:['Opioid-sparing, keeps the respiratory drive and the blood pressure.','Useful in severe bronchospasm and in the opioid-tolerant patient.','Emergence phenomena — a small dose of benzodiazepine settles it.']},

/* ---------- ANALGESIA ---------- */
{n:'Fentanyl', al:'Fentanil Sublimaze', k:'analg',
 unit:'mcg/hr', lo:25, hi:200, amt:1000, au:'mcg', vol:50, pre:[500,1000],
 bolus:'25–100 mcg',
 renal:'No active metabolite — the safest opioid infusion when the kidneys have failed',
 hep:'Reduce in severe impairment',
 notes:['Accumulates in fat on long infusions; the offset lengthens after a few days.','Chest wall rigidity with a large rapid bolus.']},

{n:'Morphine', al:'Morphin', k:'analg',
 unit:'mg/hr', lo:1, hi:5, amt:50, au:'mg', vol:50, pre:[30,50],
 bolus:'2–5 mg',
 renal:'Morphine-6-glucuronide accumulates — avoid the infusion in AKI and ESRD',
 hep:'Reduce',
 notes:['A renal failure patient on a morphine infusion who will not wake up is accumulating metabolite, not septic.','Histamine release causes hypotension.']},

{n:'Remifentanil', al:'Ultiva Remifentanyl', k:'analg',
 unit:'mcg/kg/min', lo:0.05, hi:0.25, amt:2000, au:'mcg', vol:50, pre:[2000, 5000],
 renal:'No adjustment — broken down by plasma esterases',
 hep:'No adjustment',
 notes:['Organ-independent clearance, so it is the opioid for combined renal and liver failure.','No residual analgesia at all once it stops. Give something else before you turn it off or the patient wakes in pain.','Acute tolerance and hyperalgesia after long infusions.']},

/* ---------- MUSCLE RELAXANTS ---------- */
{n:'Cisatracurium', al:'Nimbex Cisatracurium', k:'nmba',
 unit:'mcg/kg/min', lo:1, hi:3, amt:100, au:'mg', vol:50, pre:[100,200],
 bolus:'0.15–0.2 mg/kg',
 renal:'No adjustment — Hofmann elimination', hep:'No adjustment — Hofmann elimination',
 notes:['The relaxant of choice when both the kidney and the liver have failed.','Confirm adequate sedation before you paralyse, and monitor with train-of-four.','Used in the first 48 hours of severe ARDS in selected patients.']},

{n:'Atracurium', al:'Tracrium Atracurium', k:'nmba',
 unit:'mg/kg/hr', lo:0.3, hi:0.6, amt:250, au:'mg', vol:50, pre:[250],
 bolus:'0.4–0.5 mg/kg',
 renal:'No adjustment — Hofmann elimination', hep:'No adjustment',
 notes:['Histamine release causes hypotension and bronchospasm; cisatracurium avoids that.','Laudanosine accumulates on long infusions.']},

{n:'Rocuronium', al:'Esmeron Rocuronium', k:'nmba',
 unit:'mcg/kg/min', lo:8, hi:12, amt:500, au:'mg', vol:50, pre:[250,500],
 bolus:'0.6 mg/kg, or 1.2 mg/kg for rapid sequence intubation',
 renal:'Mildly prolonged', hep:'Prolonged — reduce',
 notes:['Reversible with sugammadex, which matters if the airway plan fails.','Onset in 60 seconds at 1.2 mg/kg.']},

{n:'Vecuronium', al:'Norcuron Vecuronium', k:'nmba',
 unit:'mcg/kg/min', lo:0.8, hi:1.2, amt:20, au:'mg', vol:50, pre:[20,50],
 bolus:'0.1 mg/kg',
 renal:'The active metabolite accumulates — avoid in renal failure',
 hep:'Prolonged — avoid',
 notes:['Prolonged paralysis after stopping is common in renal failure. Use cisatracurium instead.']},

/* ---------- OTHER ---------- */
{n:'Insulin (regular)', al:'Actrapid Humulin R Soluble insulin', k:'other',
 unit:'units/hr', lo:0.5, hi:10, amt:50, au:'units', vol:50, pre:[50],
 renal:'Insulin requirement falls as the kidneys fail — hypoglycaemia is the risk',
 hep:'Requirement falls in liver failure',
 notes:['50 units in 50 mL gives 1 unit/mL, which keeps the mental arithmetic simple.','Prime the line — the tubing adsorbs insulin and the first millilitres are weaker.','In DKA do not stop the insulin when the glucose falls; add dextrose and keep the infusion running until the ketones clear.']},

{n:'Heparin (unfractionated)', al:'UFH Heparin sodium', k:'other',
 unit:'units/hr', lo:500, hi:2000, amt:25000, au:'units', vol:250, pre:[25000], pvol:[250,500],
 bolus:'80 units/kg (or 5000 units) IV, unless the patient is bleeding',
 renal:'No adjustment — this is why it beats enoxaparin in renal failure',
 hep:'No adjustment',
 notes:['Check APTT 6 hours after starting and 6 hours after every rate change.','Platelet count every 2–3 days. A fall of more than 50% after day 4 is HIT until disproved.','Reversed with protamine, 1 mg per 100 units given in the last hour.']},

{n:'Magnesium sulphate', al:'MgSO4 Magnesium', k:'other',
 unit:'mg/hr', lo:1000, hi:2000, amt:20000, au:'mg', vol:500, pre:[10000,20000], pvol:[500],
 bolus:'Eclampsia: 4 g over 15–20 minutes. Torsades or severe asthma: 2 g over 20 minutes.',
 renal:'Halve the rate and check levels — magnesium is renally cleared and toxicity is easy',
 hep:'No adjustment',
 notes:['Watch the tendon reflexes, the respiratory rate and the urine output. Reflexes go first.','Calcium gluconate 1 g IV is the antidote.','1 g magnesium sulphate = 4 mmol of magnesium.']},

{n:'Aminophylline', al:'Theophylline Aminophyllin', k:'other',
 unit:'mg/kg/hr', lo:0.3, hi:0.7, amt:500, au:'mg', vol:500, pre:[250,500], pvol:[250,500],
 bolus:'5 mg/kg over 20 minutes — omit it if the patient already takes theophylline',
 renal:'No adjustment', hep:'Reduce by half — hepatic clearance',
 notes:['Narrow therapeutic window. Target level 10–20 mg/L.','Clearance falls with age, heart failure, liver disease, macrolides and quinolones. It rises with smoking.','Tachyarrhythmia, vomiting and seizures are the toxicity, and the seizure can be the first sign.']},

{n:'Salbutamol IV', al:'Albuterol Ventolin IV', k:'other',
 unit:'mcg/min', lo:5, hi:20, amt:5, au:'mg', vol:50, pre:[5,10],
 renal:'No adjustment', hep:'No adjustment',
 notes:['Only after nebulised therapy has failed in life-threatening asthma.','Lactate rises and potassium falls — check both, and do not chase the lactate with fluid.']},

{n:'Furosemide', al:'Frusemide Lasix Furosemid', k:'other',
 unit:'mg/hr', lo:5, hi:20, amt:250, au:'mg', vol:50, pre:[100,250],
 bolus:'20–40 mg IV, or double the patient\'s usual oral dose',
 renal:'Higher doses are needed as CrCl falls, not lower',
 hep:'Caution — watch potassium and encephalopathy',
 notes:['An infusion gives a steadier diuresis than boluses in decompensated heart failure, though survival is no different.','Watch sodium, potassium, magnesium and the bicarbonate — a contraction alkalosis builds quietly.']},

{n:'Terlipressin', al:'Glypressin Terlipressin', k:'other',
 unit:'mg/hr', lo:0.08, hi:0.5, amt:5, au:'mg', vol:50, pre:[5,10],
 bolus:'1–2 mg IV every 4–6 hours is the usual route in variceal bleeding',
 renal:'No adjustment', hep:'No adjustment',
 notes:['For variceal bleeding and for hepatorenal syndrome, alongside albumin.','Watch for peripheral and mesenteric ischaemia, and for hyponatraemia — the sodium can drop fast.']}

];
