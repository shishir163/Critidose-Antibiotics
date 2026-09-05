/* ============================================================
   CritiDose — theory and reference
   Version 1.0  ·  Step 4
   ------------------------------------------------------------
   Sources: see the "Where these numbers come from" page in the app.
   ------------------------------------------------------------
   Nothing here calculates anything. These are the pages you open
   to check something, or to settle an argument on the round.

   Record shape
   ------------
   n   title
   al  aliases for search
   k   group: bugs | drugs | resistance | practice
   sub one line
   b   blocks, rendered in order:
       {h:'subheading'}
       {p:'paragraph'}
       {li:['point','point']}
       {tbl:{head:[...], rows:[[...],[...]]}}
       {note:'the caution'}
       {drugs:['Name','Name']}   -> tappable, opens the dosing page
   ============================================================ */

var THEORY_VERSION = '1.0';

var TGROUPS = [
  ['bugs',       'Bacteriology', '#34D399'],
  ['drugs',      'The drugs',    '#22D3EE'],
  ['resistance', 'Resistance',   '#F87171'],
  ['practice',   'Practice',     '#A78BFA']
];

var THEORY = [

{n:'Where these numbers come from', al:'references sources evidence citation guideline', k:'practice',
 sub:'Read this before you trust anything else in the app',
 b:[
  {p:'This app was written by an AI assistant working from its training, not by transcribing a guideline line by line. A number of the higher-risk items have since been checked against the sources below and corrected where they were wrong. The rest have not been verified one by one.'},
  {note:'Treat every dose here as a prompt to think, not as an authority. When the number matters, open your own reference or your unit protocol. You are the prescriber, and this app carries no responsibility for what is written on the chart.'},
  {h:'Checked against the source'},
  {tbl:{head:['Item','Source'],
   rows:[
    ['Colistimethate maintenance ladder, loading dose, CRRT and dialysis dosing','Tsuji et al, International Consensus Guidelines for the Optimal Use of the Polymyxins, Pharmacotherapy 2019; dosing table from Nation et al, Clin Infect Dis 2017'],
    ['Vancomycin AUC 400–600, loading 20–35 mg/kg, no trough-only dosing','Rybak et al, revised consensus guideline, ASHP / IDSA / PIDS / SIDP, Clin Infect Dis 2020'],
    ['Ceftazidime-avibactam renal bands','AVYCAZ prescribing information and FDA clinical pharmacology review'],
    ['Anidulafungin, micafungin, caspofungin and amphotericin B doses','IDSA candidiasis guideline 2016, and the product information'],
    ['Posaconazole IV loading and the cyclodextrin caution','Noxafil product information'],
    ['Paracetamol — the SNAP 12-hour regimen alongside the 21-hour','Bateman et al, Lancet 2014; Pettie et al, eClinicalMedicine 2019; current UK practice'],
    ['NEWS2 parameters and thresholds','Royal College of Physicians, NEWS2, 2017'],
    ['SOFA','Vincent et al, Intensive Care Med 1996'],
    ['Child-Pugh','Pugh et al, Br J Surg 1973']]}},
  {h:'The general sources behind the rest'},
  {li:['Antibiotic doses and renal adjustment — Sanford Guide, The Renal Drug Handbook, and product information.',
       'Empiric therapy cards — IDSA/ATS community-acquired pneumonia 2019 and hospital-acquired pneumonia 2016; IDSA intra-abdominal, meningitis, candidiasis and febrile neutropenia guidelines; EASL for decompensated cirrhosis; Surviving Sepsis Campaign.',
       'The ESBL point about piperacillin-tazobactam — the MERINO trial.',
       'Protocols — UK Kidney Association for hyperkalaemia, JBDS for diabetic ketoacidosis, NICE and ILAE for status epilepticus, King\u2019s College criteria for paracetamol liver failure, Baveno for variceal bleeding, Resuscitation Council for anaphylaxis, WHO SEARO for snake bite, WHO for dengue.',
       'Infusion ranges and dilutions — standard critical care references and common unit practice. Your unit\u2019s own concentration always wins, which is why the dilution box is editable.']},
  {h:'What this means in practice'},
  {li:['Where the app and your unit protocol disagree, follow your unit protocol and write the difference in the note box on that drug.',
       'Where the app and a current guideline disagree, the app is wrong. Tell whoever maintains it.',
       'The training behind this content runs to mid-2026. Anything published after that is not in here.']}
 ]},

{n:'How bacteria are classified', al:'gram stain classification bacteriology cocci bacilli', k:'bugs',
 sub:'The map behind every empiric choice',
 b:[
  {p:'Everything starts with the Gram stain and the shape. Once you know which of the four boxes an organism sits in, the antibiotic choice narrows to a handful before any sensitivity report arrives.'},
  {h:'Gram-positive cocci'},
  {tbl:{head:['Organism','Where it comes from','Usual cover'],
   rows:[
    ['Staphylococcus aureus (MSSA)','Skin, line, endocarditis, bone','Flucloxacillin, cefazolin'],
    ['Staphylococcus aureus (MRSA)','Same, but hospital or prior colonisation','Vancomycin, linezolid, daptomycin'],
    ['Coagulase-negative staph','Lines, prosthetic material. Often a contaminant','Vancomycin, once you believe it'],
    ['Streptococcus pneumoniae','Community pneumonia, meningitis','Ceftriaxone, benzylpenicillin'],
    ['Streptococcus pyogenes','Cellulitis, necrotising fasciitis, toxic shock','Benzylpenicillin plus clindamycin'],
    ['Enterococcus faecalis','Abdomen, urine, endocarditis','Ampicillin'],
    ['Enterococcus faecium / VRE','Hospital, heavily treated patients','Linezolid, daptomycin']]}},
  {h:'Gram-negative bacilli'},
  {tbl:{head:['Organism','Where it comes from','Usual cover'],
   rows:[
    ['Escherichia coli','Urine, abdomen, biliary','Ceftriaxone, or a carbapenem if ESBL'],
    ['Klebsiella pneumoniae','Hospital pneumonia, urine, liver abscess','By sensitivity — ESBL and CRE are common here'],
    ['Pseudomonas aeruginosa','Ventilated patients, burns, bronchiectasis','Pip-tazo, cefepime, ceftazidime, meropenem'],
    ['Acinetobacter baumannii','Ventilated ICU patients, almost always MDR','Colistin, high-dose sulbactam, minocycline'],
    ['Proteus, Enterobacter, Serratia, Citrobacter','Hospital, urine, abdomen','AmpC risk — cefepime or a carbapenem'],
    ['Stenotrophomonas maltophilia','Emerges on carbapenems','Cotrimoxazole, minocycline, levofloxacin'],
    ['Haemophilus influenzae','COPD exacerbation, community pneumonia','Ceftriaxone, co-amoxiclav'],
    ['Salmonella typhi','Enteric fever — a common cause of undifferentiated fever here','Ceftriaxone, azithromycin']]}},
  {h:'Anaerobes'},
  {li:['Bacteroides fragilis and the rest of the gut anaerobes — below the diaphragm.',
       'Peptostreptococcus, Fusobacterium, oral flora — above the diaphragm, and in aspiration and dental sepsis.',
       'Clostridioides difficile — antibiotic-associated colitis, treated with oral vancomycin, not the intravenous route.',
       'Covered by metronidazole, piperacillin-tazobactam, carbapenems, clindamycin, moxifloxacin, ampicillin-sulbactam.']},
  {h:'Atypicals'},
  {p:'Mycoplasma, Chlamydophila, Legionella. No cell wall worth attacking, so beta-lactams do nothing. They need a macrolide, a tetracycline or a respiratory quinolone. This is why azithromycin is added in severe community pneumonia and not left out.'},
  {note:'Gram-positive cocci in a blood culture from a line are staphylococci until proven otherwise. Gram-negative bacilli in a ventilated ICU patient are Pseudomonas, Klebsiella or Acinetobacter until proven otherwise. Treat the likely, then narrow.'}
 ]},

{n:'What covers what', al:'spectrum coverage grid which antibiotic', k:'bugs',
 sub:'Organism first, then the drugs that reach it',
 b:[
  {h:'MRSA'},
  {drugs:['Vancomycin','Teicoplanin','Linezolid','Daptomycin','Tigecycline','Cotrimoxazole (TMP-SMX)','Clindamycin']},
  {p:'Linezolid reaches the lung better than vancomycin. Daptomycin is inactivated by surfactant and must never be used for pneumonia.'},
  {h:'Pseudomonas aeruginosa'},
  {drugs:['Piperacillin-tazobactam','Cefepime','Ceftazidime','Meropenem','Imipenem-cilastatin','Ciprofloxacin','Amikacin','Colistimethate (CMS)','Ceftazidime-avibactam','Aztreonam']},
  {p:'Ertapenem, ceftriaxone, cefotaxime, ampicillin-sulbactam and moxifloxacin do not cover it. Neither does tigecycline.'},
  {h:'ESBL-producing Enterobacterales'},
  {drugs:['Meropenem','Imipenem-cilastatin','Ertapenem','Piperacillin-tazobactam','Fosfomycin IV','Amikacin']},
  {p:'A carbapenem is the reliable answer in severe infection. Piperacillin-tazobactam is acceptable in a urinary source with a low inoculum, and unreliable in bacteraemia.'},
  {h:'Carbapenem-resistant organisms'},
  {drugs:['Colistimethate (CMS)','Polymyxin B','Ceftazidime-avibactam','Tigecycline','Minocycline IV','Ampicillin-sulbactam','Fosfomycin IV','Amikacin']},
  {p:'Almost always a combination, and almost always guided by the sensitivity report rather than by a card. Ceftazidime-avibactam covers KPC and OXA-48 but not NDM.'},
  {h:'Anaerobes'},
  {drugs:['Metronidazole','Piperacillin-tazobactam','Meropenem','Ertapenem','Clindamycin','Moxifloxacin','Ampicillin-sulbactam','Amoxicillin-clavulanate']},
  {h:'Atypicals'},
  {drugs:['Azithromycin','Levofloxacin','Moxifloxacin','Doxycycline','Ciprofloxacin']},
  {h:'Candida'},
  {drugs:['Fluconazole','Caspofungin','Micafungin','Anidulafungin','Liposomal amphotericin B','Amphotericin B deoxycholate','Voriconazole']},
  {p:'C. krusei is intrinsically fluconazole-resistant and C. glabrata is often resistant. An echinocandin is the safe first move in an unstable or azole-exposed patient.'},
  {note:'Two drugs from the same family added together buys nothing. Metronidazole beside piperacillin-tazobactam, or beside a carbapenem, is the commonest example on any ward round.'}
 ]},

{n:'Antibiotic classes by mechanism', al:'mechanism of action classes beta lactam', k:'drugs',
 sub:'Why the families behave the way they do',
 b:[
  {tbl:{head:['Mechanism','Families','What follows from it'],
   rows:[
    ['Cell wall synthesis','Penicillins, cephalosporins, carbapenems, monobactams, glycopeptides','Time-dependent killing. Extending the infusion helps. Useless against atypicals, which have no wall.'],
    ['Protein synthesis, 30S','Aminoglycosides, tetracyclines','Aminoglycosides are concentration-dependent: big dose, long interval. Tetracyclines are static.'],
    ['Protein synthesis, 50S','Macrolides, clindamycin, linezolid, chloramphenicol','Mostly static, and they switch off toxin production — the reason clindamycin goes into necrotising fasciitis.'],
    ['DNA gyrase','Quinolones','Concentration-dependent. Excellent oral absorption, so an early switch is realistic.'],
    ['Folate pathway','Cotrimoxazole','Two drugs working in sequence on the same pathway.'],
    ['Cell membrane','Polymyxins, daptomycin','Rapid killing, and the toxicity follows the membrane — kidney for polymyxins, muscle for daptomycin.'],
    ['RNA polymerase','Rifampicin','Penetrates biofilm, and resistance appears within days if it is used alone.']]}},
  {h:'Cidal or static'},
  {p:'Bactericidal: beta-lactams, glycopeptides, aminoglycosides, quinolones, metronidazole, daptomycin, polymyxins. Bacteriostatic: macrolides, tetracyclines, clindamycin, linezolid, cotrimoxazole.'},
  {p:'The distinction matters in endocarditis, meningitis and neutropenia. Everywhere else the outcome data does not support choosing on this basis alone.'}
 ]},

{n:'Resistance mechanisms', al:'ESBL AmpC KPC NDM OXA MRSA VRE carbapenemase', k:'resistance',
 sub:'What the name on the report actually means',
 b:[
  {h:'ESBL'},
  {p:'An extended-spectrum beta-lactamase destroys penicillins and cephalosporins including ceftriaxone and ceftazidime. Carbapenems still work. Piperacillin-tazobactam works in vitro but disappoints in bacteraemia — the MERINO trial settled that.'},
  {h:'AmpC'},
  {p:'A chromosomal enzyme in Enterobacter, Serratia, Citrobacter, Providencia and Morganella. It can be induced during treatment, so an organism that starts sensitive to ceftriaxone becomes resistant on day four. Use cefepime or a carbapenem from the start in serious infection.'},
  {h:'Carbapenemases'},
  {tbl:{head:['Enzyme','Common in','What still works'],
   rows:[
    ['KPC','Klebsiella','Ceftazidime-avibactam, meropenem-vaborbactam'],
    ['OXA-48','Klebsiella, E. coli','Ceftazidime-avibactam'],
    ['NDM and other metallo-enzymes','Widespread in South Asia','Ceftazidime-avibactam plus aztreonam, colistin, tigecycline'],
    ['OXA-23 and relatives','Acinetobacter','Colistin, high-dose sulbactam, minocycline']]}},
  {note:'Ceftazidime-avibactam does not cover NDM. Given that metallo-enzymes are common in this region, a carbapenem-resistant isolate should not be assumed to respond to it without the molecular result or a sensitivity.'},
  {h:'MRSA'},
  {p:'An altered penicillin-binding protein, so every beta-lactam fails, not only the anti-staphylococcal ones. Glycopeptides, linezolid and daptomycin remain.'},
  {h:'VRE'},
  {p:'Altered cell wall target. Linezolid and daptomycin are the practical options.'},
  {h:'How resistance is driven'},
  {li:['Courses that run longer than they need to.',
       'Escalation without de-escalation — the day-3 review that never happens.',
       'Under-dosing in renal failure, which exposes the organism to a sub-lethal level.',
       'Treating colonisation. A positive tracheal aspirate in a patient who is otherwise well is not an indication.']}
 ]},

{n:'Carbapenems compared', al:'meropenem imipenem ertapenem comparison', k:'drugs',
 sub:'They are not interchangeable',
 b:[
  {tbl:{head:['','Meropenem','Imipenem','Ertapenem'],
   rows:[
    ['Pseudomonas','Yes','Yes','No'],
    ['Acinetobacter','Yes','Yes','No'],
    ['ESBL','Yes','Yes','Yes'],
    ['Seizure risk','Lower','Highest','Low'],
    ['Dosing','q8h','q6–8h','q24h'],
    ['CNS infection','Preferred','Avoid','No']]}},
  {p:'Ertapenem once daily is convenient and is the right drug for an ESBL urinary or biliary source in a stable patient. It is the wrong drug for ventilator-associated pneumonia, and that substitution is a recurring error.'},
  {drugs:['Meropenem','Imipenem-cilastatin','Ertapenem']}
 ]},

{n:'Quinolones compared', al:'ciprofloxacin levofloxacin moxifloxacin comparison', k:'drugs',
 sub:'Three drugs that behave quite differently',
 b:[
  {tbl:{head:['','Ciprofloxacin','Levofloxacin','Moxifloxacin'],
   rows:[
    ['Pseudomonas','Best of the three','Some','No'],
    ['Pneumococcus','Weak','Good','Good'],
    ['Anaerobes','No','No','Yes'],
    ['Urine levels','Good','Good','Poor'],
    ['Renal adjustment','Yes','Yes','None'],
    ['QT effect','Least','Middle','Most']]}},
  {li:['Moxifloxacin needs no renal adjustment, which makes it useful when the kidneys have failed — but never for a urinary source.',
       'All three prolong QT, cause tendon rupture, and cause delirium in the elderly.',
       'Absorption is destroyed by antacids, sucralfate, calcium and enteral feed. Separate the doses by two hours.']},
  {drugs:['Ciprofloxacin','Levofloxacin','Moxifloxacin']}
 ]},

{n:'Beta-lactam allergy', al:'penicillin allergy cross reactivity anaphylaxis', k:'practice',
 sub:'Most labelled allergies are not allergies',
 b:[
  {p:'About nine in ten patients labelled penicillin-allergic tolerate penicillin on testing. The label itself causes harm: broader agents, more C. difficile, more MRSA, worse outcomes.'},
  {h:'Ask two questions'},
  {li:['What happened? Rash alone, nausea or a childhood story is not an allergy that should change the drug in sepsis.',
       'When? Anaphylaxis, angio-oedema, bronchospasm or a severe skin reaction is the group that matters.']},
  {h:'If the reaction was genuinely severe'},
  {tbl:{head:['Need','Give'],
   rows:[
    ['Gram-negative cover','Aztreonam, ciprofloxacin, amikacin'],
    ['Gram-positive cover','Vancomycin, linezolid, clindamycin'],
    ['Anaerobes','Metronidazole, clindamycin'],
    ['Meningitis','Chloramphenicol or meropenem, with vancomycin']]}},
  {p:'Cross-reactivity between penicillins and third or fourth generation cephalosporins is around 1–2%, and with carbapenems under 1%. Aztreonam has essentially none, which is why it is the fallback in true anaphylaxis.'},
  {drugs:['Aztreonam','Vancomycin','Linezolid','Ciprofloxacin','Clindamycin']}
 ]},

{n:'PK and PD in the critically ill', al:'pharmacokinetics extended infusion Vd augmented clearance', k:'practice',
 sub:'Why the textbook dose is often the wrong dose here',
 b:[
  {h:'Time-dependent versus concentration-dependent'},
  {p:'Beta-lactams kill by the time their concentration stays above the MIC. Extending the infusion — piperacillin-tazobactam over 4 hours, meropenem over 3 — raises that time without raising the dose, and it matters most in septic shock and against a high-MIC organism.'},
  {p:'Aminoglycosides kill by peak concentration. That is why a large once-daily dose beats a divided one, and why the first dose must never be cut.'},
  {h:'Volume of distribution rises in sepsis'},
  {p:'Capillary leak and fluid resuscitation expand the volume for hydrophilic drugs — beta-lactams, aminoglycosides, vancomycin, colistin. The loading dose has to be larger, not smaller, and it is never reduced for renal function. Under-loading vancomycin and colistin is the commonest dosing error in an ICU.'},
  {h:'Augmented renal clearance'},
  {p:'CrCl above 130 mL/min in young trauma, burns and septic patients with good hearts. These patients clear the drug faster than the interval allows, and the failure looks like resistance. Take the top of the range and extend the infusion.'},
  {h:'Hypoalbuminaemia'},
  {p:'Highly protein-bound drugs — ceftriaxone, ertapenem, teicoplanin — have more free drug and faster clearance when albumin is low, so the effect is shorter than expected.'},
  {note:'Renal failure changes how fast a drug leaves. It does not change how much it takes to fill the patient. That single sentence explains why the loading dose is never adjusted.'}
 ]},

{n:'Antibiotics with no renal adjustment', al:'CKD safe renal failure no adjustment', k:'practice',
 sub:'The list worth remembering when the kidneys are gone',
 b:[
  {drugs:['Ceftriaxone','Linezolid','Metronidazole','Clindamycin','Azithromycin','Moxifloxacin','Doxycycline','Minocycline IV','Tigecycline','Caspofungin','Micafungin','Anidulafungin','Rifampicin','Liposomal amphotericin B','Amphotericin B deoxycholate']},
  {p:'Polymyxin B belongs here too, and it is the one people get wrong: unlike colistimethate, it is not adjusted for renal function at all.'},
  {note:'No renal adjustment is not the same as no renal harm. Liposomal amphotericin needs no dose change and is still nephrotoxic. Watch the creatinine anyway.'},
  {drugs:['Polymyxin B']}
 ]},

{n:'Antibiotics in pregnancy', al:'pregnancy safe teratogenic obstetric', k:'practice',
 sub:'What is safe, what is avoided',
 b:[
  {h:'Generally safe'},
  {drugs:['Ceftriaxone','Cefotaxime','Cefuroxime','Cefazolin','Ampicillin','Amoxicillin-clavulanate','Piperacillin-tazobactam','Meropenem','Azithromycin','Clindamycin','Metronidazole','Oseltamivir']},
  {h:'Use only when the alternative is worse'},
  {li:['Aminoglycosides — fetal ototoxicity, though a single dose in sepsis is usually judged acceptable.',
       'Vancomycin — widely used, limited data, monitor levels.',
       'Cotrimoxazole — avoid in the first trimester (folate antagonism) and near term (kernicterus).',
       'Fluconazole — high-dose in the first trimester is teratogenic; a single 150 mg dose is not.']},
  {h:'Avoid'},
  {li:['Quinolones — cartilage effects in animal work.',
       'Tetracyclines including tigecycline — teeth and bone.',
       'Chloramphenicol near term — grey baby syndrome.']},
  {note:'Metronidazole in the first trimester is often refused out of habit. The evidence does not support the fear, and untreated sepsis is the greater risk.'}
 ]},

{n:'How long to treat', al:'duration short course stop date', k:'practice',
 sub:'Shorter courses, in almost every trial',
 b:[
  {tbl:{head:['Infection','Duration'],
   rows:[
    ['Community pneumonia','5 days if responding'],
    ['Hospital and ventilator pneumonia','7 days, including Pseudomonas'],
    ['Intra-abdominal, after source control','4 days'],
    ['Pyelonephritis','7 days'],
    ['Cellulitis','5–6 days'],
    ['Gram-negative bacteraemia','7 days'],
    ['S. aureus bacteraemia','14 days minimum, longer if complicated'],
    ['Candidaemia','14 days from the first negative culture'],
    ['Meningitis','5–21 days by organism'],
    ['Endocarditis, bone, brain abscess','Weeks — a different conversation']]}},
  {p:'Write the intended stop date on the day you start. Courses without an end date do not acquire one later; they are simply continued by whoever is on next.'},
  {note:'Procalcitonin can support stopping earlier. It is not a reason to start, and it does not overrule an unwell patient.'}
 ]},

{n:'Blood cultures and sampling', al:'culture sampling contamination', k:'practice',
 sub:'Getting an answer worth acting on',
 b:[
  {li:['Two sets from two separate sites before the first dose. One set halves the yield.',
       'Volume matters more than anything else — 8–10 mL per bottle in an adult.',
       'Paired peripheral and line cultures when a catheter infection is suspected; the line growing more than two hours earlier points to the line.',
       'A single bottle growing coagulase-negative staph is usually contamination. The same organism in both sets is not.',
       'Send a respiratory sample before starting, not after. Two hours of antibiotic can turn a culture negative.']},
  {note:'Do not delay the first dose to complete the sampling in a patient in shock. Take what you can in the time you have.'}
 ]},

{n:'Steroid equivalence', al:'steroid conversion prednisolone dexamethasone hydrocortisone', k:'drugs',
 sub:'The table behind the converter in Calculators',
 b:[
  {tbl:{head:['Steroid','Equivalent dose','Anti-inflammatory','Mineralocorticoid','Duration'],
   rows:[
    ['Hydrocortisone','20 mg','1','1','8–12 hr'],
    ['Cortisone','25 mg','0.8','0.8','8–12 hr'],
    ['Prednisolone','5 mg','4','0.6','12–36 hr'],
    ['Methylprednisolone','4 mg','5','0.5','12–36 hr'],
    ['Triamcinolone','4 mg','5','0','12–36 hr'],
    ['Deflazacort','6 mg','4','0.5','12–36 hr'],
    ['Dexamethasone','0.75 mg','25','0','36–72 hr'],
    ['Betamethasone','0.6 mg','30','0','36–72 hr']]}},
  {li:['Septic shock and adrenal crisis need hydrocortisone, because the mineralocorticoid effect is part of the treatment.',
       'Cerebral oedema and airway oedema need dexamethasone, because it has none of it.',
       'The equivalence table converts anti-inflammatory potency only. It says nothing about how quickly the HPA axis will recover.']},
  {note:'Any patient on the equivalent of 5 mg prednisolone daily for more than three weeks may need stress dosing during critical illness.'}
 ]},

{n:'Antifungals — what to reach for', al:'antifungal candida aspergillus echinocandin azole', k:'drugs',
 sub:'Four decisions, in order',
 b:[
  {h:'Is it Candida or a mould?'},
  {p:'Candida grows in blood cultures and comes from the gut, lines and the abdomen. Aspergillus and mucor do not grow in blood cultures and come from the airway and the sinuses.'},
  {h:'Is the patient stable, and azole-naive?'},
  {p:'Stable, no recent azole, likely C. albicans: fluconazole. Unstable, or azole-exposed, or the species is unknown: an echinocandin.'},
  {drugs:['Fluconazole','Caspofungin','Micafungin','Anidulafungin']},
  {p:'Between the echinocandins there is little to choose on efficacy. Anidulafungin needs no renal or hepatic adjustment and has the fewest interactions; caspofungin is reduced in Child-Pugh B; micafungin sits between the two.'},
  {h:'Aspergillus'},
  {p:'Voriconazole, with levels. Below CrCl 50 the intravenous vehicle accumulates, so switch to the oral route.'},
  {drugs:['Voriconazole','Liposomal amphotericin B']},
  {h:'Mucormycosis'},
  {p:'Liposomal amphotericin at 5–10 mg/kg plus surgery. Voriconazole has no activity against it, and a patient deteriorating on voriconazole with sinus disease should raise the question. Posaconazole is the step-down and salvage option, and conventional amphotericin B deoxycholate is the fallback where the liposomal form is not available — at a real cost in kidney injury.'},
  {drugs:['Posaconazole','Amphotericin B deoxycholate']},
  {note:'Candida in the urine or in a tracheal aspirate of a stable patient is colonisation. Treating it is one of the commonest unnecessary prescriptions in an ICU.'}
 ]}

];
