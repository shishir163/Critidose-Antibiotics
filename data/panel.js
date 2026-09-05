/* ============================================================
   CritiDose — molecular resistance panel
   Version 1.0
   ------------------------------------------------------------
   Sources: IDSA Guidance on the Treatment of Antimicrobial-Resistant
   Gram-Negative Infections (2024, updated 2026). Panel performance
   figures from published BioFire FilmArray PN validation studies.
   ------------------------------------------------------------
   This module turns a molecular panel result into a list of
   suggestions about the antibiotics already running. It cannot
   replace a culture and sensitivity, and it is built so that the
   reasons are visible rather than hidden behind an answer.

   The central limitation, stated once here and again in the app:
   a multiplex PCR panel does NOT tell you which organism carries
   which gene. With more than one Gram-negative organism and any
   carbapenemase gene, attribution is a guess.
   ============================================================ */

var PANEL_VERSION = '1.0';

/* which of the newer agents your unit can actually get hold of.
   The user can change these in the app; these are the defaults. */
var STOCK = {
  'Ceftazidime-avibactam': true,
  'Aztreonam-avibactam':   true,
  'Colistimethate (CMS)':  true,
  'Polymyxin B':           true,
  'Ampicillin-sulbactam':  true,
  'Minocycline IV':        true,
  'Tigecycline':           true,
  'Cefiderocol':           false,
  'Sulbactam-durlobactam': false
};

/* ---------- organisms the panel reports ---------- */
var PORGS = [
  ['acineto','Acinetobacter calcoaceticus-baumannii complex','acineto'],
  ['kleb',   'Klebsiella pneumoniae group',                   'entero'],
  ['ecoli',  'Escherichia coli',                              'entero'],
  ['entero', 'Enterobacter cloacae complex',                  'ampc'],
  ['serratia','Serratia marcescens',                          'ampc'],
  ['proteus','Proteus spp.',                                  'entero'],
  ['klebaero','Klebsiella aerogenes',                          'ampc'],
  ['kleboxy','Klebsiella oxytoca',                             'entero'],
  ['pseudo', 'Pseudomonas aeruginosa',                        'pseudo'],
  ['saureus','Staphylococcus aureus',                         'saureus'],
  ['haemo',  'Haemophilus influenzae',                        'other'],
  ['morax',  'Moraxella catarrhalis',                         'other'],
  ['spneum', 'Streptococcus pneumoniae',                      'strep'],
  ['spyo',   'Streptococcus pyogenes',                        'strep'],
  ['sagal',  'Streptococcus agalactiae',                      'strep']
];

/* ---------- genes ---------- */
var PGENES = [
  ['ctxm','CTX-M','esbl',
   'Extended-spectrum beta-lactamase. Predicts resistance to penicillins, cephalosporins including ceftriaxone and ceftazidime, and aztreonam.',
   'Only detects CTX-M. TEM and SHV type ESBLs are missed, so a negative CTX-M does not exclude ESBL.'],
  ['kpc','KPC','carbapenemase',
   'A class A carbapenemase. Predicts resistance to all carbapenems and to all the older beta-lactams.',
   'Ceftazidime-avibactam remains active.'],
  ['ndm','NDM','mbl',
   'A metallo-beta-lactamase. Predicts resistance to every beta-lactam including the carbapenems and including ceftazidime-avibactam.',
   'Aztreonam is the one beta-lactam the enzyme cannot destroy, but a co-produced ESBL or AmpC usually destroys it instead — which is why it needs avibactam alongside.'],
  ['vim','VIM','mbl',
   'A metallo-beta-lactamase. Same practical consequence as NDM.',
   'Ceftazidime-avibactam does not cover it.'],
  ['imp','IMP','mbl',
   'A metallo-beta-lactamase. Same practical consequence as NDM.',
   'Ceftazidime-avibactam does not cover it.'],
  ['oxa48','OXA-48-like','carbapenemase',
   'A class D carbapenemase. Predicts carbapenem resistance, often with only weak cephalosporin hydrolysis on its own.',
   'Ceftazidime-avibactam is the preferred agent. A co-produced ESBL is common, so the cephalosporins usually fail anyway.'],
  ['meca','mecA/C and MREJ','mrsa',
   'Methicillin resistance in Staphylococcus aureus. Every beta-lactam fails, not only the anti-staphylococcal ones.',
   'Only meaningful when S. aureus is also detected. Detected alone, it usually comes from a coagulase-negative staphylococcus that the panel does not report.']
];

/* ---------- what each gene knocks out ----------
   'no'         = treat as inactive
   'unreliable' = may test susceptible but has failed in practice, or
                  depends on a co-produced enzyme the panel cannot see  */
var HITS = {
  ctxm: {
    'Ceftriaxone':'no', 'Cefotaxime':'no', 'Ceftazidime':'no', 'Cefepime':'no',
    'Cefuroxime':'no', 'Cefazolin':'no', 'Ampicillin':'no', 'Aztreonam':'no',
    'Amoxicillin-clavulanate':'no', 'Ampicillin-sulbactam':'no',
    'Piperacillin-tazobactam':'unreliable', 'Cefoperazone-sulbactam':'unreliable',
    'Ciprofloxacin':'unreliable', 'Levofloxacin':'unreliable', 'Cotrimoxazole (TMP-SMX)':'unreliable'
  },
  kpc: {
    'Meropenem':'no', 'Imipenem-cilastatin':'no', 'Ertapenem':'no',
    'Piperacillin-tazobactam':'no', 'Cefepime':'no', 'Ceftazidime':'no',
    'Ceftriaxone':'no', 'Cefotaxime':'no', 'Aztreonam':'no', 'Cefoperazone-sulbactam':'no'
  },
  ndm: {
    'Meropenem':'no', 'Imipenem-cilastatin':'no', 'Ertapenem':'no',
    'Piperacillin-tazobactam':'no', 'Cefepime':'no', 'Ceftazidime':'no',
    'Ceftriaxone':'no', 'Cefotaxime':'no', 'Cefoperazone-sulbactam':'no',
    'Ceftazidime-avibactam':'no', 'Aztreonam':'unreliable'
  },
  vim: {
    'Meropenem':'no', 'Imipenem-cilastatin':'no', 'Ertapenem':'no',
    'Piperacillin-tazobactam':'no', 'Cefepime':'no', 'Ceftazidime':'no',
    'Ceftazidime-avibactam':'no', 'Aztreonam':'unreliable'
  },
  imp: {
    'Meropenem':'no', 'Imipenem-cilastatin':'no', 'Ertapenem':'no',
    'Piperacillin-tazobactam':'no', 'Cefepime':'no', 'Ceftazidime':'no',
    'Ceftazidime-avibactam':'no', 'Aztreonam':'unreliable'
  },
  oxa48: {
    'Meropenem':'no', 'Imipenem-cilastatin':'no', 'Ertapenem':'no',
    'Piperacillin-tazobactam':'no', 'Ampicillin':'no', 'Amoxicillin-clavulanate':'no',
    'Ceftriaxone':'unreliable', 'Cefotaxime':'unreliable', 'Ceftazidime':'unreliable', 'Cefepime':'unreliable'
  },
  meca: {
    'Flucloxacillin':'no', 'Cefazolin':'no', 'Ampicillin':'no', 'Benzylpenicillin':'no',
    'Amoxicillin-clavulanate':'no', 'Ampicillin-sulbactam':'no', 'Cefuroxime':'no'
  }
};

/* ---------- what to reach for, by organism class and mechanism ----------
   first    preferred, in order
   add      partner agents for a combination
   avoid    what IDSA specifically advises against here
   note     the thing that decides it at the bedside            */
var REGIMENS = {
  entero: {
    esbl:   {first:['Meropenem','Ertapenem'], add:[], avoid:['Piperacillin-tazobactam','Cefepime'],
             note:'A carbapenem is the answer for severe infection. Piperacillin-tazobactam failed against a carbapenem in the MERINO trial for bloodstream infection, so it is not a substitute here. Ertapenem is reasonable for a urinary or biliary source in a stable patient.'},
    kpc:    {first:['Ceftazidime-avibactam'], add:[], avoid:['Meropenem','Imipenem-cilastatin','Ertapenem'],
             note:'Ceftazidime-avibactam is the preferred agent for KPC. Monotherapy is appropriate once susceptibility is confirmed.'},
    oxa48:  {first:['Ceftazidime-avibactam'], add:['Tigecycline','Minocycline IV'],
             avoid:['Meropenem','Imipenem-cilastatin','Ertapenem'],
             note:'Ceftazidime-avibactam is preferred for OXA-48. Tetracyclines are alternatives only for infection outside the bloodstream and urinary tract.'},
    mbl:    {first:['Aztreonam-avibactam'], add:['Ceftazidime-avibactam','Aztreonam','Tigecycline','Minocycline IV'],
             avoid:['Meropenem','Imipenem-cilastatin','Ertapenem','Ceftazidime-avibactam','Piperacillin-tazobactam'],
             note:'Aztreonam-avibactam is the preferred agent for NDM and the other metallo-enzymes. Where it is not stocked, ceftazidime-avibactam plus aztreonam given together is the recognised substitute — the avibactam in one protects the aztreonam in the other. Ceftazidime-avibactam alone does NOT cover NDM.'}
  },
  pseudo: {
    esbl:   {first:['Piperacillin-tazobactam','Cefepime','Meropenem'], add:[], avoid:[],
             note:'Treat by susceptibility. ESBL genes matter less in Pseudomonas than the organism\u2019s own AmpC and porin changes.'},
    kpc:    {first:['Ceftazidime-avibactam'], add:['Colistimethate (CMS)','Polymyxin B'], avoid:['Meropenem','Imipenem-cilastatin'],
             note:'Ceftazidime-avibactam where susceptible. Emergent resistance on treatment happens in around one in five isolates, so repeat the culture if the patient stalls.'},
    oxa48:  {first:['Ceftazidime-avibactam'], add:['Colistimethate (CMS)','Polymyxin B'], avoid:['Meropenem','Imipenem-cilastatin'],
             note:'Ceftazidime-avibactam where susceptible.'},
    mbl:    {first:['Colistimethate (CMS)','Polymyxin B'], add:['Amikacin'],
             avoid:['Meropenem','Imipenem-cilastatin','Ceftazidime-avibactam','Piperacillin-tazobactam','Cefepime','Ceftazidime'],
             note:'Cefiderocol is the preferred agent for metallo-enzyme producing Pseudomonas and is not stocked here. That leaves a polymyxin-based regimen, and the sensitivity report matters more than usual — chase it. Aztreonam-avibactam is not reliable against Pseudomonas the way it is against Enterobacterales.'}
  },
  acineto: {
    any:    {first:['Ampicillin-sulbactam'], add:['Polymyxin B','Colistimethate (CMS)','Minocycline IV','Tigecycline'],
             avoid:['Meropenem','Imipenem-cilastatin','Rifampicin'],
             note:'Sulbactam-durlobactam with a carbapenem is the preferred regimen and is not stocked here. The alternative is high-dose ampicillin-sulbactam — 27 g daily in total, which is 18 g ampicillin and 9 g sulbactam — combined with at least one other agent. IDSA advises against a carbapenem alone, against rifamycins, and against nebulised antibiotics as the sole treatment. Combination therapy is the rule in CRAB, not the exception.'}
  },
  saureus: {
    mrsa:   {first:['Linezolid','Vancomycin'], add:[],
             avoid:['Flucloxacillin','Cefazolin','Daptomycin'],
             note:'Linezolid reaches the lung better than vancomycin in pneumonia. Daptomycin is inactivated by surfactant and must never be used for a lung source.'},
    mssa:   {first:['Flucloxacillin','Cefazolin'], add:[], avoid:[],
             note:'mecA not detected has a very high negative predictive value. If the patient is on vancomycin or linezolid purely as empiric MRSA cover, this is the result that lets you stop it.'}
  }
};

/* ---------- how much to trust the result ---------- */
var PANEL_CAVEATS = [
  'The panel does not say which organism carries which gene. With more than one Gram-negative organism on the report and any carbapenemase gene, the attribution below is inference, not fact.',
  'A negative gene result is the strong half of this test. Reported sensitivity and negative predictive value for the resistance targets approach 100%, so "Not Detected" is a reasonable basis for stopping a drug.',
  'A positive gene result is the weak half. Positive predictive value against culture has been reported as low as 25\u201341% in some series, higher in others. A gene can be present and not expressed.',
  'The panel cannot distinguish colonisation from infection. A tracheal aspirate growing organisms in a patient who is not deteriorating does not need treating.',
  'CTX-M is the only ESBL target. TEM and SHV type enzymes are missed entirely.',
  'Nothing here replaces the culture and sensitivity. Treat this as a bridge for the 48 hours before the plate is read.'
];
