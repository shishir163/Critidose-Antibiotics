/* ============================================================
   CritiDose — protocols
   Version 1.1  ·  Step 3, updated
   ------------------------------------------------------------
   Sources: UK Kidney Association Oct 2023 (hyperkalaemia),
   ADA/EASD/JBDS/AACE/DTS 2024 consensus report (DKA), NICE/ILAE
   (status epilepticus — checked Sep 2026, no major update found),
   SNAP and the 21-hour regimen (paracetamol),
   Baveno VII 2022 + APASL Aug 2025 update (variceal bleeding),
   Resuscitation Council UK 2021 (anaphylaxis — checked Sep 2026,
   still current, no newer edition), WHO SEARO (snake bite),
   Surviving Sepsis Campaign 2026 guidelines (septic shock),
   DGHS Bangladesh National Dengue Guideline 2025 (dengue).
   Not verified line by line — see References page.
   Last checked against primary sources: Sep 2026.
   ------------------------------------------------------------
   Record shape
   ------------
   n         name
   al        aliases for search
   k         group: emergency | metabolic | gi | neuro | tox
   when      when this protocol applies
   steps     ordered actions
   cautions  what goes wrong
   drugs     names from the other data files — rendered as taps
   ============================================================ */

var PROTOCOL_VERSION = '1.1';

var PGROUPS = [
  ['emergency','Emergency',  '#F87171'],
  ['metabolic','Metabolic',  '#FBBF24'],
  ['gi',       'GI and liver','#A3E635'],
  ['neuro',    'Neurology',  '#A78BFA'],
  ['tox',      'Poisoning',  '#22D3EE']
];

var PROTOCOLS = [

{n:'Hyperkalaemia', al:'high potassium K+', k:'metabolic',
 when:'Potassium above 6.0 mmol/L, or above 5.5 with ECG changes: peaked T waves, a flat P wave, a widening QRS, or a sine wave.',
 steps:[
  'Protect the heart: calcium gluconate 10%, 30 mL IV as a single dose over 10 minutes — not the old sequential 10 mL doses, which under-deliver the calcium needed. Repeat if the ECG has not improved. This does not lower the potassium; it buys time.',
  'In a resuscitation or peri-arrest setting, use calcium chloride 10%, 10 mL IV over 5 minutes instead of calcium gluconate.',
  'Insulin-glucose: 10 units soluble insulin in 25 g glucose (25% dextrose 100 mL, or 50% dextrose 50 mL) IV over 15–30 minutes, for potassium 6.5 or over, and reasonable for 6.0–6.4 as well.',
  'If the pre-treatment glucose is under 7 mmol/L, follow with a 10% glucose infusion at 50 mL/hr for 5 hours to prevent the delayed hypoglycaemia that the insulin-glucose bolus otherwise causes.',
  'Salbutamol 10–20 mg nebulised, as an addition rather than an alternative.',
  'Sodium zirconium cyclosilicate 10 g three times daily for up to 72 hours is now part of emergency management for potassium 6.5 or over, and worth considering at 6.0–6.4 too. Patiromer 8.4 g once daily is an alternative for potassium above 6.0. Start these alongside the steps above — they still take hours to work, not minutes.',
  'Sodium bicarbonate only if there is a metabolic acidosis alongside — it is not used routinely for hyperkalaemia on its own.',
  'Stop everything that adds potassium: ACE inhibitors, ARBs, spironolactone, potassium in the fluids, trimethoprim, NSAIDs.',
  'Call for dialysis early if the patient is anuric, catabolic, or the potassium rebounds.'],
 cautions:[
  'Check the glucose at 30, 60, 90, 120, 180, 240, 300 and 360 minutes after the insulin — or at least hourly for 6 hours. Late hypoglycaemia is the commonest harm from treating hyperkalaemia.',
  'Calcium does not lower potassium and its effect lasts 30–60 minutes. It buys time for the rest.',
  'A haemolysed sample is the commonest cause of a surprising result — repeat it, but treat while you wait if the ECG is abnormal.',
  'Calcium resonium is no longer routinely recommended for acute hyperkalaemia — sodium zirconium cyclosilicate or patiromer have taken its place where a binder is indicated.'],
 drugs:['Calcium gluconate 10%','Calcium chloride 10%','Insulin (regular)','Dextrose 25%','Salbutamol nebuliser','Sodium bicarbonate','Sodium zirconium cyclosilicate','Patiromer']},

{n:'Diabetic ketoacidosis', al:'DKA ketoacidosis', k:'metabolic',
 when:'Diabetes or glucose 11 mmol/L (200 mg/dL) or over, plus ketosis — beta-hydroxybutyrate 3.0 mmol/L or over, or urine ketones 2+ or more — plus acidosis: pH under 7.3 or bicarbonate under 18.',
 steps:[
  'Confirm with a bedside beta-hydroxybutyrate if it is available. It has replaced urine ketones as the preferred measure, both for diagnosis and for tracking resolution.',
  'Mild or uncomplicated moderate DKA in a patient who is alert, haemodynamically stable and tolerating oral intake can be managed with subcutaneous rapid-acting insulin every 1–2 hours instead of an infusion, with close nursing supervision — this avoids an unnecessary HDU/ICU admission where staffing allows it.',
  'Anyone with reduced consciousness, instability, severe acidosis or major comorbidity still needs the intravenous pathway below.',
  'Fluid first: 0.9% saline or a balanced crystalloid (Hartmann\'s/Plasma-Lyte) 1 litre in the first hour, then adjusted for age and cardiac state. A balanced solution is now an accepted alternative to saline and may resolve the acidosis faster.',
  'Check the potassium before starting insulin. Do not start insulin if it is under 3.5 mmol/L — replace first. Once above 3.5 and the patient is passing urine, add 20–40 mmol to each litre.',
  'Insulin infusion at 0.1 units/kg/hr. It is acceptable — and now the more common practice — to continue the patient\'s usual long-acting basal insulin alongside the infusion rather than stopping it; this eases the transition off the infusion and cuts the rebound rate.',
  'When the glucose falls below 11 mmol/L (200 mg/dL), add 10% dextrose alongside and keep the insulin running.',
  'Resolution is beta-hydroxybutyrate under 0.6 mmol/L with a venous pH of 7.3 or over, or bicarbonate of 18 or over — not a normal glucose. A venous gas is enough; an arterial sample is not needed to follow the acid-base status.',
  'Overlap the subcutaneous insulin with the infusion by 30–60 minutes before stopping.'],
 cautions:[
  'Do not stop the insulin when the sugar comes down. That is what causes the rebound and the second admission.',
  'Bicarbonate is not indicated except at a pH below 6.9, and even then the benefit is uncertain.',
  'Look for the trigger: infection, missed insulin, myocardial infarction, pancreatitis, steroid.',
  'Euglycaemic ketoacidosis happens on SGLT2 inhibitors. A normal glucose does not exclude it — the diagnosis then rests on the ketones and the acidosis alone.',
  'The subcutaneous pathway is for the alert, stable, orally-tolerating patient only. Do not use it for anyone you would otherwise be admitting to a critical care bed.'],
 drugs:['Insulin (regular)','Potassium chloride','Dextrose 25%','Sodium bicarbonate']},

{n:'Status epilepticus', al:'seizure fitting convulsion', k:'neuro',
 when:'A seizure lasting 5 minutes or more, or seizures recurring without full recovery in between.',
 steps:[
  'Airway, oxygen, glucose. Check the glucose in the first minute and give thiamine before dextrose in the malnourished.',
  'Lorazepam 4 mg IV, repeated once after 10 minutes. If there is no line, midazolam 10 mg intramuscularly.',
  'Second line at 20 minutes, pick one: levetiracetam 40–60 mg/kg IV, sodium valproate 20–40 mg/kg IV, or phenytoin 15–20 mg/kg IV at no more than 50 mg/min.',
  'Still fitting at 40 minutes: intubate and start an anaesthetic infusion — midazolam, propofol or thiopentone.',
  'EEG once the visible movements stop. Non-convulsive status is easy to miss in a paralysed or sedated patient.',
  'Look for the cause throughout: hypoglycaemia, sodium, sepsis, eclampsia, drug withdrawal, structural lesion, toxin.'],
 cautions:[
  'Under-dosing the benzodiazepine is the commonest error. Give the full dose.',
  'Phenytoin needs cardiac monitoring and must not go into dextrose.',
  'In pregnancy or the postpartum period, magnesium is the drug, not an anticonvulsant.',
  'Paralysing a patient stops the movements, not the seizure.'],
 drugs:['Lorazepam','Midazolam','Levetiracetam','Sodium valproate','Phenytoin','Propofol','Magnesium sulphate','Thiamine']},

{n:'Hypoglycaemia', al:'low sugar hypo', k:'metabolic',
 when:'Glucose under 4 mmol/L (70 mg/dL), or any lower value with symptoms.',
 steps:[
  'Conscious and able to swallow: 15–20 g of oral glucose, repeated after 15 minutes.',
  'Unconscious or unsafe swallow: 25% dextrose 50–100 mL IV, or 10% dextrose 150–200 mL.',
  'No access: glucagon 1 mg IM, which will not work in liver disease or starvation.',
  'Recheck at 15 minutes and repeat until above 4 mmol/L.',
  'Then start a 10% dextrose infusion if the cause is long-acting — sulphonylurea, long-acting insulin, liver failure.',
  'Find the cause before stopping the monitoring.'],
 cautions:[
  'Thiamine before glucose in anyone alcohol-dependent or malnourished.',
  'Sulphonylurea hypoglycaemia relapses for 24–72 hours. Never discharge one of these after a single correction.',
  'Octreotide is the specific treatment for refractory sulphonylurea hypoglycaemia.'],
 drugs:['Dextrose 25%','Glucagon','Thiamine','Octreotide']},

{n:'Paracetamol overdose', al:'acetaminophen NAC N-acetylcysteine overdose', k:'tox',
 when:'A staggered or single overdose, or any patient with a level above the treatment line at 4 hours or later.',
 steps:[
  'Take a level at 4 hours after ingestion, or immediately if the timing is unknown or the ingestion was staggered.',
  'Activated charcoal if the patient presents within an hour and the airway is safe.',
  'N-acetylcysteine. Two regimens are in use and both deliver 300 mg/kg — check which one your unit has adopted before you write it up.',
  'Classic 21-hour, three bags: 150 mg/kg over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours.',
  'SNAP 12-hour, two bags: 100 mg/kg over 2 hours, then 200 mg/kg over 10 hours. Fewer anaphylactoid reactions, shorter stay, and now the recommended regimen across much of the UK.',
  'Start it without waiting for the level if presentation is late, the ingestion staggered, or the timing unclear.',
  'Recheck ALT, INR, creatinine and the paracetamol level at the end of the infusion, whichever regimen you used. Continue N-acetylcysteine if the ALT or INR is still rising or the paracetamol level is still detectable.',
  'Apply the King\'s College criteria and speak to a liver unit early if the pH is under 7.3, the INR over 6.5, the creatinine over 300 µmol/L, or there is grade 3–4 encephalopathy.'],
 cautions:[
  'The reaction during the first bag is usually a rate-related histamine reaction, not allergy. Stop the infusion, give an antihistamine, then restart more slowly.',
  'Do not use the nomogram for staggered ingestions — it does not apply.',
  'A normal ALT on arrival means nothing if the ingestion was recent.'],
 drugs:['N-acetylcysteine','Vitamin K']},

{n:'Variceal bleeding', al:'upper GI bleed varices haematemesis', k:'gi',
 when:'Haematemesis or melaena in a patient with known or suspected cirrhosis.',
 steps:[
  'Two large cannulae, cross-match, and resuscitate to a restrictive target — transfuse for haemoglobin under 7 g/dL.',
  'Terlipressin 2 mg IV, then 1–2 mg every 4–6 hours for up to 5 days.',
  'Ceftriaxone 1–2 g IV daily for up to 7 days. The antibiotic improves survival and is not optional.',
  'Endoscopy within 12 hours, sooner if the patient is unstable.',
  'Protect the airway before endoscopy in a bleeding, encephalopathic or unstable patient.',
  'High-risk patient — Child-Pugh C under 14 points, or Child-Pugh B with active bleeding seen at endoscopy: plan early (pre-emptive) TIPS within 24–72 hours rather than waiting for endoscopic therapy to fail. It lowers rebleeding and death in this group.',
  'Failed endoscopy or ongoing bleeding: balloon tamponade, or a self-expanding oesophageal metal stent where available, as a bridge, then TIPS.'],
 cautions:[
  'Over-transfusion raises portal pressure and restarts the bleeding. Do not chase a normal haemoglobin.',
  'Terlipressin causes hyponatraemia and peripheral ischaemia — check the sodium daily and look at the fingers.',
  'Lactulose alongside, because blood in the gut precipitates encephalopathy.',
  'Tranexamic acid is not recommended in gastrointestinal bleeding.',
  'Do not wait for a second failed endoscopy to think about TIPS in the high-risk group above — by then the mortality benefit of going early is lost.'],
 drugs:['Terlipressin','Ceftriaxone','Octreotide','Lactulose','Esomeprazole','Propranolol']},

{n:'Non-variceal upper GI bleeding', al:'peptic ulcer bleed GI bleed', k:'gi',
 when:'Haematemesis, coffee-ground vomit or melaena without evidence of portal hypertension.',
 steps:[
  'Resuscitate and correct coagulopathy. Restrictive transfusion, target haemoglobin 7–8 g/dL.',
  'High-dose proton pump inhibitor: esomeprazole or pantoprazole 80 mg IV, then 8 mg/hr for 72 hours after endoscopic therapy.',
  'Endoscopy within 24 hours, within 12 in a high-risk patient.',
  'Stop the NSAID and, where possible, the anticoagulant. Discuss antiplatelet drugs with cardiology rather than stopping them alone.',
  'Test and treat Helicobacter pylori before discharge.'],
 cautions:[
  'Proton pump infusion before endoscopy downstages the lesion but does not replace the endoscopy.',
  'Melaena with a rising urea and a normal creatinine is an upper source until proven otherwise.'],
 drugs:['Esomeprazole','Pantoprazole','Tranexamic acid','Prothrombin complex concentrate']},

{n:'Anaphylaxis', al:'allergic reaction anaphylactic shock', k:'emergency',
 when:'Sudden airway, breathing or circulatory compromise, usually with skin or mucosal changes, after an exposure.',
 steps:[
  'Stop the trigger. Call for help.',
  'Adrenaline 0.5 mg (0.5 mL of 1:1000) intramuscularly into the anterolateral thigh. Repeat every 5 minutes as needed.',
  'Lay the patient flat with the legs raised. Do not sit them up, and do not stand them up.',
  'High-flow oxygen and a rapid fluid bolus, 500–1000 mL crystalloid.',
  'Refractory: adrenaline infusion, and consider glucagon if the patient is on a beta blocker.',
  'Observe for 6–12 hours — biphasic reactions happen.'],
 cautions:[
  'Intramuscular first. Intravenous adrenaline in a perfusing patient causes arrhythmia and is for the infusion setting only.',
  'Steroid and antihistamine treat the rash. They do nothing for the airway or the shock and must never delay adrenaline.',
  'Mast cell tryptase at presentation, 1–2 hours and at 24 hours if you want the diagnosis confirmed later.'],
 drugs:['Adrenaline','Hydrocortisone','Noradrenaline','Glucagon']},

{n:'Septic shock — the first hours', al:'sepsis six sepsis bundle shock SSC', k:'emergency',
 when:'Suspected infection with hypotension, a lactate above 2 mmol/L, or new organ dysfunction. Screen with SIRS criteria or a MEWS score — qSOFA alone is not sensitive enough to rule sepsis out and should not be the only trigger used.',
 steps:[
  'Blood cultures and a lactate before the first dose, but do not let this delay the antibiotic.',
  'Septic shock, or a high probability of sepsis: broad-spectrum antibiotic within the hour, chosen from the empiric card that fits the source.',
  'Possible sepsis without shock: it is acceptable to take up to 3 hours to complete a focused work-up, provided the patient is reassessed continuously and treated the moment shock or clear organ dysfunction appears.',
  'Give fluid as the default first step for hypotension, but judge the response dynamically — passive leg raise, IVC, pulse pressure variation — rather than committing to a fixed 30 mL/kg. Give less and reassess sooner in cardiac disease, dialysis dependence or established ARDS.',
  'In severe or rapidly progressing shock, starting noradrenaline at the same time as the fluid, rather than after a full fluid load, is now an accepted approach — start it through a peripheral line rather than waiting for central access.',
  'Add vasopressin as the noradrenaline requirement climbs, rather than waiting for very high catecholamine doses.',
  'Target a mean arterial pressure of 65 mmHg; 60 mmHg is a reasonable target in an older patient with chronic hypotension.',
  'Find and control the source: image, drain, remove the line, operate.',
  'Once perfusion is restored, actively de-resuscitate — diuresis or ultrafiltration back toward a negative fluid balance — rather than leaving the resuscitation fluid on board.',
  'De-escalate the antibiotic as soon as cultures and sensitivities allow. Do not add empirical antifungal cover unless the patient has specific risk factors for invasive candidiasis.'],
 cautions:[
  'A normal qSOFA does not rule out sepsis — treat the clinical picture and the SIRS/MEWS trend, not a single score.',
  'The 30 mL/kg figure is a starting point, not a prescription.',
  'Hydrocortisone 200 mg/day for shock that persists on vasopressors.',
  'A rising lactate on a falling noradrenaline requirement is usually adrenaline or salbutamol, not worsening perfusion.',
  'Leftover fluid from the resuscitation phase is something to actively reverse once the patient is stable, not something to leave alone.'],
 drugs:['Noradrenaline','Vasopressin','Hydrocortisone','Piperacillin-tazobactam','Meropenem','Vancomycin']},

{n:'Hepatic encephalopathy', al:'HE coma liver encephalopathy ammonia', k:'gi',
 when:'Confusion, asterixis or reduced consciousness in a patient with liver disease, once other causes are excluded.',
 steps:[
  'Look for the precipitant first: infection, GI bleed, constipation, dehydration, sedatives, electrolytes, renal failure, TIPS.',
  'Lactulose 20–30 mL orally or by nasogastric tube three times a day, titrated to 2–3 soft stools daily.',
  'Rifaximin 550 mg twice daily added when lactulose alone is not holding it.',
  'Lactulose enema (300 mL in 700 mL water) if the patient cannot take it orally.',
  'Protect the airway at grade 3–4 encephalopathy.',
  'Do not restrict protein — feed the patient.'],
 cautions:[
  'Ammonia levels do not track the clinical grade and should not be used to titrate treatment.',
  'Encephalopathy in a cirrhotic is spontaneous bacterial peritonitis until you have tapped the ascites.',
  'Over-treating with lactulose causes dehydration and hypernatraemia, which worsens the encephalopathy.'],
 drugs:['Lactulose','Rifaximin','L-ornithine L-aspartate','Cefotaxime','Human albumin 20%']},

{n:'Alcohol withdrawal', al:'DT delirium tremens withdrawal', k:'neuro',
 when:'Tremor, sweating, agitation, tachycardia or seizures 6–72 hours after the last drink.',
 steps:[
  'Thiamine 300 mg IV daily before any glucose load, and continue it.',
  'Symptom-triggered benzodiazepine using a withdrawal score rather than a fixed schedule.',
  'Diazepam 10 mg or lorazepam 2–4 mg, repeated until the patient is settled but rousable.',
  'Use lorazepam in liver failure — no active metabolite.',
  'Refractory delirium tremens: phenobarbitone, or a propofol infusion with intubation.',
  'Replace magnesium, potassium and phosphate.'],
 cautions:[
  'Antipsychotics alone do not treat withdrawal and lower the seizure threshold.',
  'Withdrawal is a diagnosis of exclusion in a confused patient — check for head injury, sepsis and Wernicke first.',
  'Wernicke is a clinical diagnosis and undertreated. When in doubt give the high-dose thiamine.'],
 drugs:['Diazepam','Lorazepam','Thiamine','Phenobarbitone','Propofol','Magnesium sulphate']},

{n:'Raised intracranial pressure', al:'ICP herniation coning cerebral oedema', k:'neuro',
 when:'Falling conscious level with pupillary change, Cushing response, or a known raised pressure.',
 steps:[
  'Head up 30 degrees, neck midline, tapes not tight around the neck.',
  'Sedate and analgese adequately; treat fever and seizures.',
  'Mannitol 0.25–1 g/kg IV over 15–20 minutes, or hypertonic saline 3%, 150 mL over 15–20 minutes.',
  'Ventilate to a normal carbon dioxide. Brief hyperventilation only as a bridge to definitive treatment.',
  'Keep sodium and osmolality where you want them, and the cerebral perfusion pressure above 60 mmHg.',
  'Call neurosurgery — imaging and a decompression or a drain is what actually fixes it.'],
 cautions:[
  'Mannitol causes a diuresis and hypovolaemia. Watch the intravascular volume and the osmolar gap.',
  'Hypertonic saline is preferable in the hypotensive patient because it expands rather than depletes.',
  'Prolonged hyperventilation causes ischaemia. Do not park the patient there.'],
 drugs:['Mannitol 20%','Hypertonic saline 3%','Propofol','Fentanyl','Levetiracetam']},

{n:'Severe hyponatraemia', al:'low sodium hyponatremia', k:'metabolic',
 when:'Sodium under 125 mmol/L, or any level with seizures, coma or vomiting.',
 steps:[
  'Symptomatic: hypertonic saline 3%, 100–150 mL over 20 minutes, repeated up to three times until the symptoms settle.',
  'Aim for a rise of 4–6 mmol/L in the first hours — that is enough to stop the seizure.',
  'Then stop and reassess. The whole 24-hour rise must stay under 8–10 mmol/L.',
  'Check the sodium every 2 hours in the acute phase.',
  'Work out the cause with paired serum and urine osmolality and urine sodium, and assess the volume state.',
  'Over-correction: stop the saline, give free water, and consider desmopressin to bring it back down.'],
 cautions:[
  'Osmotic demyelination is caused by correcting too fast, and it is irreversible. The risk is highest in alcohol dependence, malnutrition, liver disease and hypokalaemia.',
  'Correcting the volume state alone can cause a rapid unintended rise once ADH switches off. Watch for a sudden large urine output.',
  'Do not treat a number in an asymptomatic chronic hyponatraemia quickly. Slow is safe.'],
 drugs:['Hypertonic saline 3%','Tolvaptan','Desmopressin','Furosemide']},

{n:'Organophosphate poisoning', al:'OPC pesticide poisoning insecticide carbamate', k:'tox',
 when:'Cholinergic syndrome after exposure: pinpoint pupils, secretions, bradycardia, bronchorrhoea, fasciculation, a solvent smell.',
 steps:[
  'Protect yourself and the staff. Remove the clothing and wash the skin.',
  'Airway first — the patient drowns in secretions, not in the poison.',
  'Atropine 2–3 mg IV, then double the dose every 3–5 minutes until the chest is clear and the systolic pressure and heart rate are adequate.',
  'Once atropinised, run an atropine infusion at 10–20% of the total loading dose per hour.',
  'Pralidoxime where it is available and the agent is an organophosphate, ideally in the first hours.',
  'Diazepam for agitation and seizures, and expect a prolonged ICU stay.'],
 cautions:[
  'The endpoint of atropine is a clear chest and a dry axilla, not a dilated pupil. Under-atropinisation kills these patients.',
  'Do not use suxamethonium — the block is greatly prolonged.',
  'Watch for the intermediate syndrome at 24–96 hours: proximal and neck weakness with respiratory failure, after the cholinergic phase has settled.',
  'Carbamate poisoning behaves similarly but is shorter, and pralidoxime is not usually needed.'],
 drugs:['Atropine','Diazepam','Midazolam']},

{n:'Snake bite', al:'snakebite envenomation antivenom viper cobra krait', k:'tox',
 when:'A bite with local swelling, bleeding, ptosis, weakness or a positive 20-minute whole blood clotting test.',
 steps:[
  'Immobilise the limb, keep the patient still, and remove rings and tight clothing. No tourniquet, no incision, no suction.',
  'Do a 20-minute whole blood clotting test on arrival and repeat it every 6 hours — non-clotting blood means haemotoxic envenomation.',
  'Polyvalent antivenom for any sign of systemic envenomation: abnormal clotting, spontaneous bleeding, neurotoxicity, or rapidly progressing local swelling.',
  'Have adrenaline drawn up before the antivenom starts, and watch for anaphylaxis throughout the infusion.',
  'Repeat the antivenom if the clotting is still abnormal at 6 hours, or if neurotoxicity is progressing.',
  'Neurotoxic envenomation: neostigmine with atropine may help, and be ready to intubate. Ventilated patients recover.'],
 cautions:[
  'Krait bites are often painless with minimal local signs, and present as a descending paralysis at dawn. Do not exclude envenomation because the site looks unremarkable.',
  'Antivenom treats systemic envenomation, not local swelling alone.',
  'Watch the urine output and creatinine — acute kidney injury follows Russell\'s viper bites.',
  'Do not give the antivenom on the ward without adrenaline immediately to hand.'],
 drugs:['Adrenaline','Neostigmine','Atropine','Hydrocortisone']},

{n:'Dengue with shock', al:'dengue DSS dengue shock haemorrhagic fever DHF', k:'emergency',
 when:'Defervescence with warning signs: abdominal pain, persistent vomiting, a rising haematocrit with a falling platelet count, mucosal bleeding, lethargy, or a narrow pulse pressure (20 mmHg or less).',
 steps:[
  'Recognise the critical phase — it starts as the fever settles, around day 4–6, and lasts 24–48 hours.',
  'Do immediately at the point of shock: haematocrit, blood sugar, and give oxygen.',
  'Compensated shock (narrow pulse pressure, postural drop, still normotensive): isotonic crystalloid — Hartmann\'s or 0.9% saline — 10 mL/kg over 1 hour.',
  'If improved and the haematocrit falls, step the rate down in sequence: 7 → 5 → 3 → 1.5 mL/kg/hr, keeping the vein open, and continue at 1.5 mL/kg/hr for 24 hours or more.',
  'If not improved, repeat crystalloid 10–20 mL/kg over 1 hour and recheck the vitals and haematocrit.',
  'Decompensated (profound) shock — hypotension: 20 mL/kg crystalloid bolus over a few minutes, using more than one line if needed. Check ABCS, correct the glucose, give NaHCO₃ 1–2 mEq/kg for acidosis. Manage in ICU where possible.',
  'A rising haematocrit with continuing shock: switch to a colloid — dextran 40 or a starch-based fluid — 10 mL/kg over 1 hour, capped at 30 mL/kg in 24 hours.',
  'A falling haematocrit with continuing shock means concealed bleeding, not resolution — transfuse fresh whole blood 10 mL/kg or packed cells 5 mL/kg, do not give more crystalloid.',
  'Refractory shock: correct ABCS — Acidosis (venous gas and lactate), Bleeding (haematocrit), Calcium and electrolytes, Sugar — and look for another cause: sepsis, cardiogenic shock, concealed intestinal bleed, cytokine storm. Add inotropes/vasopressors alongside fluid as needed.',
  'Anticipate the reabsorption phase at 48–72 hours: pulmonary oedema comes from the fluid you gave earlier. Stop the IV fluid once the patient is stable, passing good urine, and the haematocrit is falling with a good pulse volume.'],
 cautions:[
  'A guide to the numbers: 500 mL crystalloid drops the haematocrit by 1–2 points, so a drop of more than 3 points points to bleeding. One unit of blood or packed cells raises it by 3–5 points.',
  'Over-resuscitation is the main cause of death in the recovery phase. Fluid is titrated, not poured — during decompensated shock the haematocrit is checked hourly and matters more than the platelet count.',
  'In acidosis, do not use Ringer\'s lactate or other hyperosmolar fluid.',
  'No NSAIDs, no aspirin, no intramuscular injections.',
  'Platelet transfusion for a number alone does not help. Transfuse for bleeding.',
  'DHF patients are very sensitive to furosemide — if fluid overload needs treating, the dose is about 0.1 mg/kg, smaller than usual.',
  'A patient who becomes suddenly comfortable and quiet after a hypotensive phase may be improving — or may be bleeding into the abdomen.'],
 drugs:['Sodium bicarbonate','Noradrenaline','Dobutamine','Furosemide','Paracetamol']},

{n:'Dengue — ICU criteria and complications', al:'dengue ICU admission discharge HDU organ failure severe dengue', k:'emergency',
 when:'A dengue patient with shock refractory to ward management, severe metabolic derangement, multi-organ involvement, or uncontrolled bleeding — to decide on HDU/ICU transfer and to manage the organ-specific complications.',
 steps:[
  'HDU/ICU admission for any of: profound shock despite full inpatient management; severe metabolic abnormality (acidosis, severe hypocalcaemia, hyponatraemia or hypoglycaemia); two or more organs failing (hepatic, renal, myocarditis, encephalopathy, pancreatitis); or DIC with uncontrolled bleeding.',
  'Numeric thresholds: pH under 7.25 or bicarbonate under 15 (after 2 crystalloid boluses and 1 colloid bolus); creatinine over 300 µmol/L (3.38 mg/dL) or anuria; PT over 50 s or INR over 3.5; DIC score of 5 or more.',
  'In ICU: keep MAP 65 mmHg or above and urine output 0.5 mL/kg/hr or above. If septic shock coexists, give 30 mL/kg fluid.',
  'Vasopressors if MAP is not held: noradrenaline 0.01–3 mcg/kg/min, add vasopressin 0.01–0.04 U/min; dobutamine for cardiogenic shock (myocarditis, ischaemia).',
  'Hepatic failure / encephalopathy: lactulose, rifaximin, LOLA; correct coagulopathy with FFP, platelets, vitamin K; treat hypoglycaemia; protein restriction only in encephalopathy.',
  'Dengue encephalopathy with raised ICP: head midline and up 30–45°, 3% saline 3–5 mL/kg slow bolus, controlled ventilation to PaCO₂ 30–35 mmHg; dexamethasone 0.15 mg/kg 6–8 hourly is used here (unlike routine dengue, where steroid is not indicated).',
  'Renal failure: haemodialysis, SLED or CRRT.',
  'Myocarditis: avoid fluid overload, inotropes (dobutamine/milrinone) for low output, amiodarone for arrhythmia. Dengue-associated MI — antiplatelets and thrombolysis are contraindicated; PCI is preferred if feasible.'],
 cautions:[
  'Only about 0.1–9% of dengue patients need ICU — but the ones who do can deteriorate within hours. The thresholds above are the trigger to move early, not after a second failed attempt on the ward.',
  'Steroid is not indicated in dengue generally; the encephalopathy/raised-ICP setting is the specific exception.',
  'In dengue-associated MI, avoid anticoagulation unless the platelet count is above 50,000 and there is no active bleeding.',
  'Continuing IV fluid beyond the 48-hour critical phase risks fluid overload, thrombophlebitis and pulmonary oedema.',
  'This card follows the DGHS Bangladesh 2025 national guideline, not WHO — the fluid ladders and thresholds differ from the generic international protocol.'],
 drugs:['Noradrenaline','Vasopressin','Dobutamine','Lactulose','Rifaximin','Dexamethasone','Hypertonic saline 3%','Furosemide']}

];
