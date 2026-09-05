/* ============================================================
   CritiDose — empiric therapy by site
   Version 1.0  ·  Step 3
   ------------------------------------------------------------
   These are starting points, not answers. Every card assumes you
   will narrow down when the culture comes back, and every card is
   beaten by your own unit's antibiogram.

   Record shape
   ------------
   n      site or syndrome
   al     aliases for search
   sub    one line — what this card covers
   k      group: chest | urinary | cns | abdo | skin | blood | other
   when   how to recognise it / when to use this card
   first  first-choice regimens
   alt    alternatives, and what to add when risk is high
   dur    usual duration
   drugs  drug names that exist in antibiotics.js — rendered as taps
   notes  the things that go wrong
   ============================================================ */

var DISEASE_VERSION = '1.0';

var DGROUPS = [
  ['chest',   'Chest',            '#22D3EE'],
  ['urinary', 'Urinary',          '#60A5FA'],
  ['cns',     'CNS',              '#A78BFA'],
  ['abdo',    'Abdomen',          '#FBBF24'],
  ['skin',    'Skin and soft tissue', '#F472B6'],
  ['blood',   'Bloodstream',      '#FB7185'],
  ['other',   'Other',            '#34D399']
];

var DISEASES = [

{n:'Community-acquired pneumonia', al:'CAP pneumonia CURB', k:'chest',
 sub:'Severe CAP needing ICU admission',
 when:'CURB-65 counts confusion, urea over 7 mmol/L, respiratory rate 30 or more, systolic under 90 or diastolic 60 or less, and age 65 or over. Three or more, or any need for ventilation or vasopressors, is severe.',
 first:['Ceftriaxone 2 g IV daily plus azithromycin 500 mg IV daily',
        'Or a beta-lactam plus levofloxacin 750 mg IV daily if a macrolide is not an option'],
 alt:['Structural lung disease, bronchiectasis or recent hospital antibiotics: cover Pseudomonas with piperacillin-tazobactam or cefepime plus levofloxacin',
      'Post-influenza, cavitation or empyema: add MRSA cover with vancomycin or linezolid'],
 dur:'5–7 days if responding. Longer only for cavitation, empyema or a slow responder.',
 drugs:['Ceftriaxone','Azithromycin','Levofloxacin','Piperacillin-tazobactam','Linezolid','Vancomycin'],
 notes:['The atypical cover is not optional in severe CAP — it changes mortality.',
        'Take blood cultures and a sputum sample before the first dose, but do not let that delay the dose.',
        'Steroid is for the patient in shock or with severe disease by current trials, not for everyone.']},

{n:'Hospital-acquired and ventilator-associated pneumonia', al:'HAP VAP nosocomial pneumonia', k:'chest',
 sub:'Pneumonia starting 48 hours or more after admission',
 when:'New infiltrate plus fever, leucocytosis and purulent secretions, or a falling P/F ratio, after two days in hospital.',
 first:['Piperacillin-tazobactam 4.5 g IV q6h by extended infusion',
        'Or meropenem 1 g IV q8h if ESBL is likely or the patient has had a cephalosporin recently'],
 alt:['MRSA risk (previous colonisation, prior IV antibiotics, high local rate): add vancomycin or linezolid',
      'Known carbapenem-resistant Acinetobacter or Klebsiella: colistimethate with a second agent — high-dose ampicillin-sulbactam, minocycline or tigecycline',
      'KPC or OXA-48 producers: ceftazidime-avibactam'],
 dur:'7 days for most, including Pseudomonas, provided the patient is improving.',
 drugs:['Piperacillin-tazobactam','Meropenem','Vancomycin','Linezolid','Colistimethate (CMS)','Ampicillin-sulbactam','Minocycline IV','Ceftazidime-avibactam'],
 notes:['A tracheal aspirate growing an organism in a patient who is not deteriorating is colonisation. Treating it breeds resistance.',
        'De-escalate on day 3 with the culture in front of you. That review is the single most useful antibiotic decision in the unit.',
        'Ertapenem does not cover Pseudomonas or Acinetobacter — the wrong carbapenem here.']},

{n:'Aspiration pneumonia', al:'aspiration pneumonitis', k:'chest',
 sub:'Aspiration of gastric contents, with or without infection',
 when:'Witnessed aspiration, or a dependent-lobe infiltrate in someone with reduced consciousness, stroke, or a disordered swallow.',
 first:['Community aspiration: ceftriaxone 2 g IV daily, or amoxicillin-clavulanate 1.2 g IV q8h',
        'Hospital aspiration: piperacillin-tazobactam 4.5 g IV q6h'],
 alt:['Established lung abscess or empyema: add clindamycin, or use a carbapenem'],
 dur:'5–7 days for pneumonia. Abscess and empyema need weeks.',
 drugs:['Ceftriaxone','Amoxicillin-clavulanate','Piperacillin-tazobactam','Clindamycin','Metronidazole'],
 notes:['The first hours after aspiration are chemical pneumonitis, not infection. Antibiotics on day one often treat nobody — reassess at 48 hours and stop if the fever and the film have settled.',
        'Routine anaerobic cover is no longer standard except for abscess, empyema or severe periodontal disease.']},

{n:'Urinary sepsis — community', al:'UTI pyelonephritis urosepsis', k:'urinary',
 sub:'Pyelonephritis or urosepsis from outside hospital',
 when:'Fever with loin pain or tenderness, or sepsis with a urinary source and no recent hospital exposure.',
 first:['Ceftriaxone 2 g IV daily',
        'Add an aminoglycoside for one or two doses if the patient is in shock'],
 alt:['Known ESBL, or a recent course of cephalosporin or quinolone: meropenem or ertapenem',
      'Obstruction: no antibiotic works until it is drained'],
 dur:'7 days for pyelonephritis, 10–14 days if there is a complication or a slow response.',
 drugs:['Ceftriaxone','Amikacin','Meropenem','Ertapenem','Ciprofloxacin'],
 notes:['Image early. An obstructed infected kidney is a drainage problem, not an antibiotic problem.',
        'ESBL rates in community E. coli are high here — treat a failure at 48 hours as resistance until the sensitivities say otherwise.']},

{n:'Catheter-associated urinary infection', al:'CAUTI hospital UTI', k:'urinary',
 sub:'Infection in a catheterised or recently instrumented patient',
 when:'Fever or sepsis with no other source, in a patient with a catheter. Pyuria alone is not infection.',
 first:['Piperacillin-tazobactam 4.5 g IV q6h, or meropenem if ESBL is likely'],
 alt:['Candiduria in an unwell patient with no other source: fluconazole, after changing the catheter'],
 dur:'7 days, and change or remove the catheter.',
 drugs:['Piperacillin-tazobactam','Meropenem','Fluconazole','Amikacin'],
 notes:['Asymptomatic bacteriuria in a catheterised patient does not get antibiotics. This is where a great deal of unnecessary treatment starts.',
        'Candida in the urine of a stable patient means the catheter, not candidaemia.']},

{n:'Bacterial meningitis', al:'meningitis meningococcal pneumococcal', k:'cns',
 sub:'Community-acquired bacterial meningitis',
 when:'Fever, headache, neck stiffness or altered consciousness. Do not wait for the CT or the tap to give the first dose.',
 first:['Ceftriaxone 2 g IV q12h plus vancomycin',
        'Add ampicillin 2 g IV q4h if over 50, pregnant or immunosuppressed — Listeria',
        'Dexamethasone 10 mg IV q6h for 4 days, with or just before the first dose'],
 alt:['Post-neurosurgical or shunt-related: meropenem plus vancomycin',
      'True penicillin anaphylaxis: chloramphenicol or meropenem with vancomycin'],
 dur:'Meningococcus 5–7 days, pneumococcus 10–14, Listeria 21, Gram-negative bacilli 21.',
 drugs:['Ceftriaxone','Vancomycin','Ampicillin','Meropenem','Dexamethasone'],
 notes:['Antibiotics first, imaging second. Every hour of delay costs.',
        'Steroid helps in pneumococcal meningitis and should be started with the antibiotic, not after it.',
        'Meningitis doses are higher than sepsis doses — ceftriaxone goes to 2 g twice daily.']},

{n:'Viral encephalitis', al:'HSV encephalitis encephalitis', k:'cns',
 sub:'Suspected herpes simplex encephalitis',
 when:'Fever with confusion, personality change, seizures or focal signs. Temporal changes on imaging support it but their absence does not exclude it.',
 first:['Acyclovir 10 mg/kg IV q8h on ideal body weight — start on suspicion',
        'Cover bacterial meningitis alongside until the CSF is back'],
 alt:['Consider Japanese encephalitis, dengue and Nipah by season and exposure — supportive care only'],
 dur:'14–21 days for proven HSV. Stop earlier only with a negative PCR taken after 24–48 hours of symptoms.',
 drugs:['Acyclovir IV','Ceftriaxone','Vancomycin'],
 notes:['A negative PCR in the first 24 hours does not exclude HSV. Repeat it before stopping.',
        'Keep the patient well filled — acyclovir crystallises in the tubules.',
        'If the patient deteriorates on day 3, think acyclovir neurotoxicity before assuming treatment failure.']},

{n:'Brain abscess', al:'cerebral abscess subdural empyema', k:'cns',
 sub:'Focal intracranial suppuration',
 when:'Headache, focal deficit and fever, with a ring-enhancing lesion. Fever is absent in up to half.',
 first:['Ceftriaxone 2 g IV q12h plus metronidazole 500 mg IV q8h',
        'Add vancomycin after trauma or neurosurgery'],
 alt:['Immunosuppressed: add cover for Nocardia (cotrimoxazole) and toxoplasma as the picture dictates'],
 dur:'6–8 weeks, guided by imaging.',
 drugs:['Ceftriaxone','Metronidazole','Vancomycin','Meropenem','Cotrimoxazole (TMP-SMX)'],
 notes:['Aspiration gives you the organism and decompresses at once — talk to neurosurgery early.',
        'Steroid only for mass effect, and it delays capsule formation.']},

{n:'Intra-abdominal sepsis — community', al:'peritonitis perforation appendicitis', k:'abdo',
 sub:'Perforation, appendicitis, diverticulitis from outside hospital',
 when:'Peritonism, free gas, or sepsis with an abdominal source.',
 first:['Piperacillin-tazobactam 4.5 g IV q6h',
        'Or ceftriaxone plus metronidazole in a less unwell patient'],
 alt:['Severe sepsis or recent hospital antibiotics: meropenem',
      'Add antifungal cover only for upper GI perforation, recurrent leak or an already colonised patient'],
 dur:'4 days after adequate source control. Longer courses do not help.',
 drugs:['Piperacillin-tazobactam','Ceftriaxone','Metronidazole','Meropenem','Fluconazole','Caspofungin'],
 notes:['Source control is the treatment. Antibiotics buy time for the drain or the theatre, they do not replace it.',
        'Do not give both piperacillin-tazobactam and metronidazole — the anaerobic cover is duplicated.']},

{n:'Intra-abdominal sepsis — hospital or post-operative', al:'anastomotic leak post-op peritonitis', k:'abdo',
 sub:'Leak, collection or tertiary peritonitis in hospital',
 when:'Deterioration after abdominal surgery, a collection on imaging, or persistent sepsis with no other source.',
 first:['Meropenem 1 g IV q8h, plus an echinocandin if Candida is likely'],
 alt:['MDR risk: add colistimethate or use ceftazidime-avibactam by local pattern',
      'Enterococcus in a post-operative leak: add vancomycin or use a regimen that covers it'],
 dur:'Guided by source control and by the clinical course, reviewed daily.',
 drugs:['Meropenem','Caspofungin','Micafungin','Colistimethate (CMS)','Vancomycin','Ceftazidime-avibactam'],
 notes:['Candida grown from a post-operative abdominal drain in an unwell patient is usually worth treating; from a well patient, usually not.',
        'Re-image rather than escalate blindly when the fever will not settle.']},

{n:'Acute cholangitis', al:'biliary sepsis cholangitis obstructive jaundice', k:'abdo',
 sub:'Biliary obstruction with infection',
 when:'Fever, jaundice and right upper quadrant pain, with a dilated biliary tree. Hypotension and confusion make it severe.',
 first:['Piperacillin-tazobactam 4.5 g IV q6h',
        'Or ceftriaxone plus metronidazole in mild disease'],
 alt:['Severe, or previous instrumentation and stents: meropenem'],
 dur:'4–7 days after drainage.',
 drugs:['Piperacillin-tazobactam','Ceftriaxone','Metronidazole','Meropenem'],
 notes:['Drainage within 24 hours in severe disease. No antibiotic clears an obstructed duct.',
        'Ceftriaxone causes biliary sludge — a reason to prefer alternatives on longer courses here.']},

{n:'Spontaneous bacterial peritonitis', al:'SBP ascites infection', k:'abdo',
 sub:'Infected ascites in cirrhosis',
 when:'Ascitic neutrophil count of 250/mm³ or more. Tap every cirrhotic who is admitted unwell, even without abdominal pain.',
 first:['Cefotaxime 2 g IV q8h, or ceftriaxone 2 g IV daily',
        'Albumin 1.5 g/kg on day 1 and 1 g/kg on day 3'],
 alt:['Hospital-acquired or recent quinolone prophylaxis: piperacillin-tazobactam or meropenem'],
 dur:'5–7 days, then secondary prophylaxis.',
 drugs:['Cefotaxime','Ceftriaxone','Piperacillin-tazobactam','Meropenem'],
 notes:['The albumin is not optional — it is what reduces hepatorenal syndrome and death.',
        'Avoid non-selective beta blockers during an episode of SBP.',
        'Repeat the tap at 48 hours if the response is poor; a fall of less than 25% in the neutrophil count means the regimen is wrong.']},

{n:'Necrotising soft tissue infection', al:'necrotising fasciitis Fournier gas gangrene', k:'skin',
 sub:'Surgical emergency with antibiotics alongside',
 when:'Pain out of proportion, rapid progression, skin changes, crepitus, systemic toxicity. If you are considering it, call the surgeon now.',
 first:['Meropenem or piperacillin-tazobactam, plus clindamycin 900 mg IV q8h, plus vancomycin or linezolid'],
 alt:['Add intravenous immunoglobulin in streptococcal toxic shock, where it is available'],
 dur:'Until no further debridement is needed and the patient has stabilised.',
 drugs:['Meropenem','Piperacillin-tazobactam','Clindamycin','Vancomycin','Linezolid'],
 notes:['Clindamycin is there to switch off toxin production, not for its spectrum. Do not leave it out.',
        'Nothing in this card matters as much as getting to theatre.']},

{n:'Cellulitis', al:'skin infection erysipelas', k:'skin',
 sub:'Non-necrotising skin and soft tissue infection',
 when:'Spreading erythema, warmth and tenderness. Look hard for the features that make it necrotising instead.',
 first:['Flucloxacillin 2 g IV q6h, or cefazolin 2 g IV q8h'],
 alt:['MRSA risk or purulence: vancomycin, linezolid or clindamycin',
      'Water or animal exposure, or a diabetic foot: broaden to cover Gram-negatives and anaerobes'],
 dur:'5–7 days, extended if the response is slow.',
 drugs:['Flucloxacillin','Cefazolin','Vancomycin','Linezolid','Clindamycin'],
 notes:['Mark the edge with a pen and date it — it is the cheapest way to see whether the treatment is working.',
        'Bilateral lower limb "cellulitis" is usually venous eczema, not infection.']},

{n:'Catheter-related bloodstream infection', al:'CLABSI line sepsis central line infection', k:'blood',
 sub:'Infection arising from a vascular catheter',
 when:'Fever with no other source in a patient with a line, or a positive blood culture from the line growing sooner than the peripheral one.',
 first:['Vancomycin, plus Gram-negative cover appropriate to the unit (piperacillin-tazobactam or meropenem)',
        'Add an echinocandin if the patient is septic, on parenteral nutrition or has been colonised'],
 alt:['Confirmed S. aureus or Candida: the line comes out, always'],
 dur:'Coagulase-negative staph 5–7 days, S. aureus at least 14 from the first negative culture, Candida 14 from clearance.',
 drugs:['Vancomycin','Piperacillin-tazobactam','Meropenem','Caspofungin','Micafungin','Daptomycin'],
 notes:['Take paired cultures — one from the line, one peripheral — before the first dose.',
        'S. aureus bacteraemia needs an echocardiogram and a search for metastatic foci, not just a course of antibiotics.']},

{n:'Febrile neutropenia', al:'neutropenic sepsis', k:'blood',
 sub:'Fever with a neutrophil count under 0.5 × 10⁹/L',
 when:'A single temperature of 38.3°C, or 38.0°C sustained for an hour, in a neutropenic patient. Treat within the hour.',
 first:['Piperacillin-tazobactam 4.5 g IV q6h, or cefepime 2 g IV q8h, or meropenem'],
 alt:['Add vancomycin for line infection, skin or soft tissue infection, haemodynamic instability or known MRSA',
      'Fever persisting past 4–5 days: add an antifungal and image the chest'],
 dur:'Until the neutrophils recover and the patient has been afebrile for 48 hours.',
 drugs:['Piperacillin-tazobactam','Cefepime','Meropenem','Vancomycin','Caspofungin','Liposomal amphotericin B'],
 notes:['The first dose within an hour matters more than which drug you choose.',
        'Do not add vancomycin reflexively — it does not improve outcome without one of the reasons above.']},

{n:'Sepsis of unknown source', al:'undifferentiated sepsis septic shock empiric', k:'other',
 sub:'When the source has not declared itself yet',
 when:'Sepsis or septic shock with no localising picture after the first examination and the first set of investigations.',
 first:['Piperacillin-tazobactam or meropenem, by how much prior hospital exposure there has been',
        'Add vancomycin if there is a line, hardware, skin source or known MRSA'],
 alt:['Known carbapenem-resistant colonisation: colistimethate plus a partner agent from the start'],
 dur:'Review at 48–72 hours and narrow. Set a stop date on the first day.',
 drugs:['Piperacillin-tazobactam','Meropenem','Vancomycin','Colistimethate (CMS)','Amikacin'],
 notes:['Cultures before antibiotics, antibiotics within the hour, and then keep looking for the source. The source is what kills.',
        'Write the intended stop date in the notes when you start. Courses that have no end date do not get one later.',
        'Malaria, dengue, enteric fever, leptospirosis and scrub typhus all present as undifferentiated sepsis here. A broad antibiotic does not cover any of them.']}

];
