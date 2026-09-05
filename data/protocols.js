/* ============================================================
   CritiDose — protocols
   Version 1.0  ·  Step 3
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

var PROTOCOL_VERSION = '1.0';

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
  'Calcium gluconate 10%, 10 mL IV over 2–3 minutes. Repeat after 5 minutes if the ECG has not improved. This protects the heart; it does not lower the potassium.',
  'Insulin 10 units in 25% dextrose 100 mL IV over 15–30 minutes. Expect a fall of about 1 mmol/L within an hour.',
  'Salbutamol 10–20 mg nebulised, as an addition rather than an alternative.',
  'Sodium bicarbonate only if there is a metabolic acidosis alongside.',
  'Stop everything that adds potassium: ACE inhibitors, ARBs, spironolactone, potassium in the fluids, trimethoprim, NSAIDs.',
  'Call for dialysis early if the patient is anuric, catabolic, or the potassium rebounds.'],
 cautions:[
  'Check the glucose hourly for 6 hours after the insulin. Late hypoglycaemia is the commonest harm from treating hyperkalaemia.',
  'Calcium does not lower potassium and its effect lasts 30–60 minutes. It buys time for the rest.',
  'A haemolysed sample is the commonest cause of a surprising result — repeat it, but treat while you wait if the ECG is abnormal.',
  'Binders work too slowly to matter in the acute phase.'],
 drugs:['Calcium gluconate 10%','Insulin (regular)','Dextrose 25%','Salbutamol nebuliser','Sodium bicarbonate','Calcium polystyrene sulphonate']},

{n:'Diabetic ketoacidosis', al:'DKA ketoacidosis', k:'metabolic',
 when:'Glucose usually above 11 mmol/L (200 mg/dL), ketones present, pH under 7.3 or bicarbonate under 15.',
 steps:[
  'Fluid first: 0.9% saline 1 litre in the first hour, then 500 mL/hr for the next few hours, adjusted for age and cardiac state.',
  'Start potassium replacement once the potassium is under 5.5 and the patient is passing urine. Add 20–40 mmol to each litre.',
  'Insulin infusion at 0.1 units/kg/hr. No bolus is needed if fluid has been started.',
  'When the glucose falls below 14 mmol/L (250 mg/dL), add 10% dextrose alongside and keep the insulin running.',
  'Continue the insulin until the ketones clear and the bicarbonate normalises, not until the glucose is normal.',
  'Overlap the subcutaneous insulin with the infusion by 30–60 minutes before stopping.'],
 cautions:[
  'Do not stop the insulin when the sugar comes down. That is what causes the rebound and the second admission.',
  'Potassium falls as the acidosis corrects. Never run insulin into a patient whose potassium is under 3.3 — replace first.',
  'Bicarbonate is not indicated except at a pH below 6.9, and even then the benefit is uncertain.',
  'Look for the trigger: infection, missed insulin, myocardial infarction, pancreatitis, steroid.',
  'Euglycaemic ketoacidosis happens on SGLT2 inhibitors. A normal glucose does not exclude it.'],
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
  'N-acetylcysteine, the standard three-bag regimen: 150 mg/kg over 1 hour, 50 mg/kg over 4 hours, 100 mg/kg over 16 hours.',
  'Start it without waiting for the level if presentation is late, the ingestion staggered, or the timing unclear.',
  'Recheck ALT, INR, creatinine and the paracetamol level at the end of the infusion. Continue N-acetylcysteine if the INR or ALT is still rising.',
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
  'Failed endoscopy: balloon tamponade as a bridge, then TIPS.'],
 cautions:[
  'Over-transfusion raises portal pressure and restarts the bleeding. Do not chase a normal haemoglobin.',
  'Terlipressin causes hyponatraemia and peripheral ischaemia — check the sodium daily and look at the fingers.',
  'Lactulose alongside, because blood in the gut precipitates encephalopathy.',
  'Tranexamic acid is not recommended in gastrointestinal bleeding.'],
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

{n:'Septic shock — the first hour', al:'sepsis six sepsis bundle shock', k:'emergency',
 when:'Suspected infection with hypotension or a lactate above 2 mmol/L.',
 steps:[
  'Blood cultures and a lactate before the first dose, but do not let this delay the antibiotic.',
  'Broad-spectrum antibiotic within the hour, chosen from the empiric card that fits the source.',
  'Crystalloid 30 mL/kg for hypotension or a lactate above 4, given in aliquots with reassessment.',
  'Noradrenaline if the mean arterial pressure stays under 65 — start it through a peripheral line rather than waiting for central access.',
  'Find and control the source: image, drain, remove the line, operate.',
  'Repeat the lactate at 2–4 hours to judge the response.'],
 cautions:[
  'The 30 mL/kg figure is a starting point, not a prescription. In cardiac disease, dialysis dependence or established ARDS, give less and reassess sooner.',
  'Hydrocortisone 200 mg/day for shock that persists on vasopressors.',
  'A rising lactate on a falling noradrenaline requirement is usually adrenaline or salbutamol, not worsening perfusion.'],
 drugs:['Noradrenaline','Hydrocortisone','Piperacillin-tazobactam','Meropenem','Vancomycin']},

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

{n:'Dengue with shock', al:'dengue DSS dengue shock haemorrhagic fever', k:'emergency',
 when:'Defervescence with warning signs: abdominal pain, persistent vomiting, a rising haematocrit with a falling platelet count, mucosal bleeding, lethargy, or a narrow pulse pressure.',
 steps:[
  'Recognise the critical phase — it starts as the fever settles, around day 4–6, and lasts 24–48 hours.',
  'Compensated shock: crystalloid 5–10 mL/kg over an hour, then reassess and step down as the haematocrit and output allow.',
  'Hypotensive shock: 20 mL/kg bolus, then colloid if there is no response and the haematocrit is still high.',
  'A falling haematocrit with continuing shock means bleeding, not resolution — transfuse rather than giving more crystalloid.',
  'Follow haematocrit, urine output and pulse pressure hourly, and reduce the fluid as soon as the patient is stable.',
  'Anticipate the reabsorption phase at 48–72 hours: pulmonary oedema comes from the fluid you gave earlier.'],
 cautions:[
  'Over-resuscitation is the main cause of death in the recovery phase. Fluid is titrated, not poured.',
  'No NSAIDs, no aspirin, no intramuscular injections.',
  'Platelet transfusion for a number alone does not help. Transfuse for bleeding.',
  'A patient who becomes suddenly comfortable and quiet after a hypotensive phase may be improving — or may be bleeding into the abdomen.'],
 drugs:['Paracetamol','Noradrenaline','Ondansetron']}

];
