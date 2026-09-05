/* ============================================================
   CritiDose — respiratory panel interpretation
   Version 1.0
   ------------------------------------------------------------
   Built to match the two reports this hospital issues:
     URT  — Respiratory (URT) Panel PCR, nasal swab, real-time PCR
     PN   — BioFire FilmArray Pneumonia Panel, tracheal aspirate

   Sources: IDSA/ATS community-acquired pneumonia 2019 and
   hospital-acquired/ventilator-associated pneumonia 2016; IDSA
   guidance on antimicrobial-resistant Gram-negative infections;
   published FilmArray PN validation studies for the semi-quantitative
   thresholds. Not every line has been checked against a source —
   see the references page.

   The point of this module is as much about what NOT to start as
   what to add. Most positives on a respiratory panel do not need
   an antibiotic.

   Record shape
   ------------
   n      organism as the report prints it
   g      group: virus | atypical | bacteria
   act    treat | depends | usually-no
   why    one line — why it sits in that bucket
   drugs  1-3 suggestions, names matching antibiotics.js
   note   the thing that decides it at the bedside
   ============================================================ */

var RESP_VERSION = '1.0';

/* which organisms appear on which report, in report order */
var RPANELS = [
  ['pn','BioFire Pneumonia (PN)','Tracheal aspirate or BAL',
   ['acineto','entcloacae','ecoli','haemo','klebaero','kleboxy','kleb','morax','proteus','pseudo','serratia','saureus',
    'sagal','spneum','spyo',
    'chlamydia','legionella','mycoplasma',
    'adeno','coronacommon','hmpv','rhino','fluA','fluB','mers','piv','rsv']],
  ['urt','Respiratory (URT) Panel','Nasal swab',
   ['adeno','boca','sars2','cov229e','covhku1','covnl63','covoc43','hmpv','fluA','fluB',
    'piv1','piv2','piv3','piv4','rsv','rhino',
    'spneum','spyo','legionella','mycoplasma','chlamydia','haemo','morax','pertussis']]
];

var RORG = {

/* ---------------- VIRUSES ---------------- */
fluA:{n:'Influenza A', g:'virus', act:'treat',
  why:'A treatable virus, and the one positive on this panel that most often changes management.',
  drugs:['Oseltamivir'],
  note:'Start it even beyond 48 hours in a ventilated or deteriorating patient — the late-treatment data in severe influenza still favours treating. Severe disease in ICU is often given 150 mg twice daily, though the evidence for the double dose is thin. Add bacterial cover only if there is a real second hit: consolidation, purulent secretions, a rising procalcitonin. Post-influenza S. aureus pneumonia is the one worth remembering.'},

fluB:{n:'Influenza B', g:'virus', act:'treat',
  why:'Same as influenza A for treatment purposes.',
  drugs:['Oseltamivir'],
  note:'Often milder in adults but not reliably so. Treat a ventilated patient the same way.'},

sars2:{n:'SARS-CoV-2 (COVID-19)', g:'virus', act:'depends',
  why:'Treatment depends on how sick the patient is, not on the PCR alone.',
  drugs:['Dexamethasone'],
  note:'Dexamethasone 6 mg daily only if the patient needs oxygen or ventilation — in a patient on room air it does harm. Antivirals and immunomodulators depend on what your hospital stocks and how long the symptoms have run. A positive PCR weeks after an infection can be residual RNA, not active disease.'},

mers:{n:'MERS coronavirus', g:'virus', act:'depends',
  why:'No specific proven therapy, but the public health consequences are immediate.',
  drugs:[],
  note:'Isolate, inform infection control and public health the same day, and take a travel and camel-contact history. Supportive care is the treatment.'},

coronacommon:{n:'Coronavirus (seasonal)', g:'virus', act:'usually-no',
  why:'229E, HKU1, NL63 and OC43 are common cold viruses. No specific therapy exists.',
  drugs:[],
  note:'This result is not SARS-CoV-2 and the panel reports them separately. Supportive care.'},
cov229e:{n:'Coronavirus 229E', g:'virus', act:'usually-no',
  why:'A common cold coronavirus. No specific therapy.', drugs:[],
  note:'Supportive care. Not SARS-CoV-2.'},
covhku1:{n:'Coronavirus HKU1', g:'virus', act:'usually-no',
  why:'A common cold coronavirus. No specific therapy.', drugs:[],
  note:'Supportive care. Not SARS-CoV-2.'},
covnl63:{n:'Coronavirus NL63', g:'virus', act:'usually-no',
  why:'A common cold coronavirus. No specific therapy.', drugs:[],
  note:'Supportive care. Not SARS-CoV-2.'},
covoc43:{n:'Coronavirus OC43', g:'virus', act:'usually-no',
  why:'A common cold coronavirus. No specific therapy.', drugs:[],
  note:'Supportive care. Not SARS-CoV-2.'},

rsv:{n:'Respiratory syncytial virus', g:'virus', act:'usually-no',
  why:'No antiviral with proven benefit in adults.',
  drugs:[],
  note:'Real cause of severe disease in the elderly and in COPD, but the treatment is oxygen, bronchodilators and time. Ribavirin is reserved for transplant and haematology patients, on specialist advice.'},

rhino:{n:'Rhinovirus / Enterovirus', g:'virus', act:'usually-no',
  why:'The commonest positive on any respiratory panel. No specific therapy.',
  drugs:[],
  note:'Can be shed for weeks after a mild illness. A rhinovirus positive in a ventilated patient is often incidental. It is not a reason to start or continue an antibiotic — and if nothing else is positive, it is a reason to reconsider one.'},

hmpv:{n:'Human metapneumovirus', g:'virus', act:'usually-no',
  why:'No specific antiviral.',
  drugs:[],
  note:'Behaves like RSV. Supportive care; steroid and bronchodilator if there is wheeze.'},

piv:{n:'Parainfluenza virus', g:'virus', act:'usually-no',
  why:'No specific antiviral.',
  drugs:[],
  note:'Causes croup and laryngotracheitis. Nebulised adrenaline and steroid for stridor; nothing else changes.'},
piv1:{n:'Parainfluenza virus 1', g:'virus', act:'usually-no',
  why:'No specific antiviral.', drugs:[], note:'Croup and laryngotracheitis. Supportive care.'},
piv2:{n:'Parainfluenza virus 2', g:'virus', act:'usually-no',
  why:'No specific antiviral.', drugs:[], note:'Croup and laryngotracheitis. Supportive care.'},
piv3:{n:'Parainfluenza virus 3', g:'virus', act:'usually-no',
  why:'No specific antiviral.', drugs:[], note:'The one most likely to cause lower respiratory disease in adults, but still no antiviral.'},
piv4:{n:'Parainfluenza virus 4', g:'virus', act:'usually-no',
  why:'No specific antiviral.', drugs:[], note:'Usually a mild upper respiratory illness.'},

adeno:{n:'Adenovirus', g:'virus', act:'depends',
  why:'Usually self-limiting, occasionally severe in the immunocompromised.',
  drugs:[],
  note:'No treatment in an immunocompetent adult. Cidofovir or brincidofovir is considered in transplant and haematology patients on specialist advice only. Can be shed for a long time after infection.'},

boca:{n:'Bocavirus', g:'virus', act:'usually-no',
  why:'Frequently found alongside something else. No specific therapy.',
  drugs:[],
  note:'Its role as a sole pathogen in adults is doubtful. Look for the other cause before accepting it as the answer.'},

/* ---------------- ATYPICAL BACTERIA ---------------- */
legionella:{n:'Legionella pneumophila', g:'atypical', act:'treat',
  why:'A true pathogen. A positive is meaningful and the treatment is specific.',
  drugs:['Levofloxacin','Azithromycin'],
  note:'Beta-lactams do nothing — if the patient is on ceftriaxone alone, that is the gap. Levofloxacin is preferred in severe disease. Treat 7\u201310 days, longer if immunosuppressed. Notify infection control: it points to a water source.'},

mycoplasma:{n:'Mycoplasma pneumoniae', g:'atypical', act:'treat',
  why:'No cell wall, so every beta-lactam fails.',
  drugs:['Azithromycin','Doxycycline','Levofloxacin'],
  note:'If the patient is improving on a beta-lactam alone, question whether this is the pathogen. Extrapulmonary features \u2014 haemolysis, rash, neurological signs \u2014 support it being real.'},

chlamydia:{n:'Chlamydia pneumoniae', g:'atypical', act:'treat',
  why:'Another atypical that beta-lactams cannot touch.',
  drugs:['Doxycycline','Azithromycin'],
  note:'Often a mild, drawn-out illness. Rarely the sole cause of ICU-level pneumonia \u2014 look for a second pathogen.'},

pertussis:{n:'Bordetella pertussis', g:'atypical', act:'treat',
  why:'Treatment shortens transmission even when it does not shorten the cough.',
  drugs:['Azithromycin'],
  note:'Azithromycin 500 mg on day 1 then 250 mg for 4 days. The antibiotic barely changes the illness once the paroxysmal stage has started \u2014 the reason to treat is to stop the patient infecting others. Droplet precautions, and prophylaxis for household contacts and any infant exposed.'},

/* ---------------- BACTERIA ---------------- */
spneum:{n:'Streptococcus pneumoniae', g:'bacteria', act:'treat',
  why:'The commonest bacterial cause of community pneumonia.',
  drugs:['Ceftriaxone','Benzylpenicillin','Amoxicillin-clavulanate'],
  note:'Narrow to benzylpenicillin once sensitivity confirms it. Add a macrolide in severe disease for the atypical cover and the anti-inflammatory effect. On a nasal swab this may be upper airway carriage rather than pneumonia \u2014 up to 1 in 10 healthy adults carry it.'},

spyo:{n:'Streptococcus pyogenes', g:'bacteria', act:'treat',
  why:'Group A strep. Uniformly penicillin-sensitive, and capable of rapid deterioration.',
  drugs:['Benzylpenicillin','Clindamycin','Ceftriaxone'],
  note:'Add clindamycin in severe or necrotising disease and in toxic shock \u2014 it suppresses toxin production. Look hard for a soft tissue source.'},

saureus:{n:'Staphylococcus aureus', g:'bacteria', act:'depends',
  why:'A real pathogen in ventilated and post-influenza patients, and a common coloniser otherwise.',
  drugs:['Flucloxacillin','Linezolid','Vancomycin'],
  note:'The mecA/MREJ result decides the drug: mecA detected means linezolid or vancomycin, and linezolid reaches the lung better. mecA not detected means flucloxacillin or cefazolin, which beat vancomycin for MSSA. Take blood cultures \u2014 S. aureus in the chest often means S. aureus in the blood.'},

haemo:{n:'Haemophilus influenzae', g:'bacteria', act:'depends',
  why:'A genuine cause of exacerbation and pneumonia, and also a normal upper airway resident.',
  drugs:['Ceftriaxone','Amoxicillin-clavulanate'],
  note:'On a nasal swab this is usually carriage. On a tracheal aspirate at high copy number in a patient with a new infiltrate, treat it. Many strains produce beta-lactamase, so plain amoxicillin is not enough.'},

morax:{n:'Moraxella catarrhalis', g:'bacteria', act:'depends',
  why:'Mostly a coloniser; a real pathogen in COPD exacerbation.',
  drugs:['Amoxicillin-clavulanate','Ceftriaxone'],
  note:'Almost all strains produce beta-lactamase. Treat it in a COPD exacerbation with purulent sputum; ignore it in a well patient with an incidental swab.'},

sagal:{n:'Streptococcus agalactiae', g:'bacteria', act:'depends',
  why:'Group B strep. Rarely the cause of pneumonia in adults.',
  drugs:['Benzylpenicillin','Ceftriaxone'],
  note:'Consider it real in diabetes, cirrhosis and the elderly. Otherwise look for another explanation before treating.'},

kleb:{n:'Klebsiella pneumoniae group', g:'bacteria', act:'depends',
  why:'A leading cause of hospital pneumonia here, and a frequent airway coloniser.',
  drugs:['Meropenem','Piperacillin-tazobactam','Ceftriaxone'],
  note:'Copy number and the clinical picture decide it. Choose the drug by the resistance genes: CTX-M means a carbapenem, NDM means the carbapenem will not work either \u2014 open the resistance side of this module.'},

ecoli:{n:'Escherichia coli', g:'bacteria', act:'depends',
  why:'Can cause hospital pneumonia; often present at low copy number without causing disease.',
  drugs:['Ceftriaxone','Piperacillin-tazobactam','Meropenem'],
  note:'At 10\u2074 copies in a ventilated patient who is stable, this is colonisation. Choose the drug by the resistance genes.'},

kleboxy:{n:'Klebsiella oxytoca', g:'bacteria', act:'depends',
  why:'Behaves like K. pneumoniae but is less often the true pathogen.',
  drugs:['Piperacillin-tazobactam','Meropenem'],
  note:'Carries a chromosomal beta-lactamase that can make it look resistant to piperacillin-tazobactam.'},

klebaero:{n:'Klebsiella aerogenes', g:'bacteria', act:'depends',
  why:'An AmpC organism despite the Klebsiella name.',
  drugs:['Cefepime','Meropenem'],
  note:'AmpC can be induced during treatment, so an isolate that starts ceftriaxone-sensitive turns resistant by day four. Use cefepime or a carbapenem from the start in serious infection.'},

entcloacae:{n:'Enterobacter cloacae complex', g:'bacteria', act:'depends',
  why:'The classic AmpC producer.',
  drugs:['Cefepime','Meropenem'],
  note:'Never rely on ceftriaxone here, whatever the sensitivity report says on day one.'},

serratia:{n:'Serratia marcescens', g:'bacteria', act:'depends',
  why:'AmpC producer, and often a coloniser of ventilator circuits.',
  drugs:['Cefepime','Meropenem'],
  note:'Same AmpC caution as Enterobacter. Frequently colonises without causing disease \u2014 be sure before treating.'},

proteus:{n:'Proteus spp.', g:'bacteria', act:'depends',
  why:'More often a urinary than a respiratory pathogen.',
  drugs:['Ceftriaxone','Piperacillin-tazobactam'],
  note:'Intrinsically resistant to tigecycline and to colistin \u2014 worth knowing if the patient is already on either.'},

pseudo:{n:'Pseudomonas aeruginosa', g:'bacteria', act:'depends',
  why:'A major cause of ventilator-associated pneumonia, and an equally common coloniser.',
  drugs:['Piperacillin-tazobactam','Cefepime','Meropenem'],
  note:'Treat when there is a new infiltrate, fever and purulent secretions \u2014 not for a positive alone. Run the beta-lactam as an extended infusion. Check the resistance genes before assuming a carbapenem will work.'},

acineto:{n:'Acinetobacter calcoaceticus-baumannii complex', g:'bacteria', act:'depends',
  why:'In this unit it is usually multidrug-resistant, and it colonises ventilated airways heavily.',
  drugs:['Ampicillin-sulbactam','Polymyxin B','Minocycline IV'],
  note:'The hardest call on the report. High copy number with a new infiltrate and clinical deterioration is infection; a high copy number in a stable patient is colonisation, and treating it drives resistance. If you do treat, combination therapy is the rule \u2014 open the resistance side of this module.'}

};

/* ---------------- interpretation rules ---------------- */
var RESP_RULES = {
  urtCaveat:'This is a nasal swab. A virus found here is reasonable evidence of that virus. A bacterium found here \u2014 pneumococcus, Haemophilus, Moraxella \u2014 is usually upper airway carriage and does NOT establish pneumonia. Legionella, Mycoplasma, Chlamydia and pertussis are the exceptions: those are meaningful wherever they are found.',
  pnCaveat:'This is a lower respiratory sample, so the organisms are relevant \u2014 but it cannot separate infection from colonisation. Most ventilated airways are colonised. Treat the patient, the infiltrate and the trend, not the report.',
  copyNote:'Semi-quantitative copy numbers help but do not decide. Around 10\u2077 usually indicates a dominant organism; 10\u2074 in a stable patient is usually colonisation. The clinical picture outranks both.',
  virusOnly:'Viruses positive and no bacterial target detected. In a patient who is not deteriorating and has no consolidation, this is the result that supports stopping or narrowing the antibiotics rather than adding to them.',
  allNegative:'Nothing detected. The negative predictive value of these panels is their strongest feature \u2014 reported around 92\u201396% for the bacterial targets. A completely negative panel in a patient on broad antibiotics is a genuine prompt to review whether infection is the right diagnosis at all.',
  postFlu:'Influenza with S. aureus on the same report is the classic post-influenza bacterial pneumonia. Treat both \u2014 this combination carries a high mortality and is regularly missed.',
  atypicalGap:'An atypical organism is on this report. Beta-lactams do not cover it. Check that something on the list \u2014 a macrolide, a tetracycline or a respiratory quinolone \u2014 is actually running.'
};
