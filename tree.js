let algorithms = [
  // [0] = anemia
  [
    {
      "key": "1",
      "value": "Hb low",
      "parent": "",
      "labitemsIndex": "3",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1",
      "value": "MCV low",
      "parent": "1",
      "labitemsIndex": "41",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "MCV normal",
      "parent": "1",
      "labitemsIndex": "41",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11",
      "value": "MCV high",
      "parent": "1",
      "labitemsIndex": "57",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "no Schistocytes",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "11"
    },
    {
      "key": "1100",
      "value": "Folate or B12 normal",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "1"
    },
    {
      "key": "11001",
      "value": "Pancytopenia",
      "parent": "1100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11000",
      "value": "no Pancytopenia",
      "parent": "1100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110010",
      "value": "Macrocytic Anemia (Leukemia, Aplastic Anemia or MDS)",
      "parent": "11001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110000",
      "value": "Macrocytic Anemia (Drugs, Liver , Alcohol , Endocrine)",
      "parent": "11000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1101",
      "value": "Folate or B12 low",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11010",
      "value": "Megaloblastic Anemia",
      "parent": "1101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111",
      "value": "Schistocytes",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110",
      "value": "Hemolysis",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-1",
      "value": "Ferritin low",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-10",
      "value": "Iron deficiency anemia",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "Ferritin normal",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "Marrow damage",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1001",
      "value": "decreased stimulation (Renal disease, Inflammation)",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1-1",
      "value": "Ferritin low",
      "parent": "1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1-10",
      "value": "Iron deficiency anemia",
      "parent": "1-1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-10",
      "value": "Ferritin normal",
      "parent": "1-1",
      "labitemsIndex": "13",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-100",
      "value": "Suspect Thalassemia",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-101",
      "value": "CRP high",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "8",
      "signsIndex": ""
    },
    {
      "key": "1-101-1",
      "value": "TSAT low",
      "parent": "1-101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1010",
      "value": "TSAT normal",
      "parent": "1-101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-101-10",
      "value": "Anemia of chronic disease",
      "parent": "1-101-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-10100",
      "value": "Iron deficiency anemia or Anemia of chronic disease",
      "parent": "1-1010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
  // [1] = hyponatremia
  [
    {
      "key": "1",
      "value": "Corrected Na low",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "41"
    },
    {
      "key": "11",
      "value": "Plasma Osmolarity < 280",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "Pseudohyponatremia (lipids, proteins , etc)",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111",
      "value": "TURP",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "112",
      "value": "Hystrescopy",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "Plasma Osmolarity >280",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "40"
    },
    {
      "key": "101",
      "value": "GFR &le; 15",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1010",
      "value": "Renal Failure",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "GFR > 15",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "42"
    },
    {
      "key": "1001",
      "value": "on diuretics",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10010",
      "value": "Diuretic use",
      "parent": "1001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "not on diuretics",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "45"
    },
    {
      "key": "10001",
      "value": "Edema",
      "parent": "1000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100010",
      "value": "Nephrotic Syndrome",
      "parent": "10001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100011",
      "value": "Cirrhosis",
      "parent": "10001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100012",
      "value": "Heart Failure",
      "parent": "10001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10000",
      "value": "Euvolumic",
      "parent": "1000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "43"
    },
    {
      "key": "1000-1",
      "value": "Hypovolumic",
      "parent": "1000",
      "labitemsIndex": "81",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-1-1",
      "value": "UNa < 25",
      "parent": "1000-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-1-10",
      "value": "External Losses (GI loss, third space loss)",
      "parent": "1000-1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-10",
      "value": "UNa normal ",
      "parent": "1000-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-100",
      "value": "remeasure UNa after another IV Fluid",
      "parent": "1000-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-11",
      "value": "UNa > 40",
      "parent": "1000-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-110",
      "value": "Cerebral Salt Wasting",
      "parent": "1000-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000-111",
      "value": "Primary Adrenal Insufficency",
      "parent": "1000-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100001",
      "value": "Uosm < 100",
      "parent": "10000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000010",
      "value": "Water intoxication",
      "parent": "100001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000011",
      "value": "Beer potomania",
      "parent": "100001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000012",
      "value": "tea and toast diet",
      "parent": "100001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100000",
      "value": "Uosm normal",
      "parent": "10000",
      "labitemsIndex": "81",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000001",
      "value": "UNa > 40",
      "parent": "100000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "30"
    },
    {
      "key": "10000011",
      "value": "TSH > 10",
      "parent": "1000001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100000110",
      "value": "Severe Hypothyroidism",
      "parent": "10000011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10000010",
      "value": "TSH &le; 10",
      "parent": "1000001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100000101",
      "value": "SIADH",
      "parent": "10000010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100000102",
      "value": "Glucocorticoid deficiency",
      "parent": "10000010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100000103",
      "value": "reset osmostat",
      "parent": "10000010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000000",
      "value": "remeasure UNa after another IV Fluid",
      "parent": "100000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
  // [2] = hypernatremia
  [
    {
      "key": "1",
      "value": "Corrected Na high",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "46"
    },
    {
      "key": "11",
      "value": "ECF volume increased",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "Administration of Hypertonic Na",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "ECF volume not increased",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "48"
    },
    {
      "key": "101",
      "value": "Urine volume < 500 and Urine Osmolarity > 800",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1010",
      "value": "Insensible water loss",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1011",
      "value": "GI water loss",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1012",
      "value": "Remote renal water loss",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "Urine not minimal volume while maximal concentration",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "49"
    },
    {
      "key": "1001",
      "value": "Urine osmolarity > 750",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "42"
    },
    {
      "key": "10010",
      "value": "Osmotic Diuresis",
      "parent": "1001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10011",
      "value": "Diuretics",
      "parent": "1001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "Urine osmolarity &le; 750",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10000",
      "value": "Diabetes Insipidus (central or nephrogenic)",
      "parent": "1000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
  // [3] = hypokalemia
  [
    {
      "key": "1",
      "value": "K low",
      "parent": "",
      "labitemsIndex": "82",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "Urine K &le; 15",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "61"
    },
    {
      "key": "101",
      "value": "Metabolic Acidosis",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "ABG normal",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "Profuse sweating",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-1",
      "value": "Metabolic Alkalosis",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11",
      "value": "urine K > 15",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "140"
    },
    {
      "key": "110",
      "value": "TTKG normal",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1100",
      "value": "Renal wasting",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11-1",
      "value": "TTKG < 2",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11-10",
      "value": "Osmotic diuresis",
      "parent": "11-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111",
      "value": "TTKG > 4",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "141"
    },
    {
      "key": "1111",
      "value": "High BP",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "142"
    },
    {
      "key": "11111",
      "value": "Aldosterone High",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "143"
    },
    {
      "key": "111111",
      "value": "Renin High",
      "parent": "11111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111110",
      "value": "Renal Arteris Stenosis",
      "parent": "111111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111111",
      "value": "Renin Secreting Tumor",
      "parent": "111111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111112",
      "value": "Malignant HTN",
      "parent": "111111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111110",
      "value": "Renin not High",
      "parent": "11111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111100",
      "value": "Primary Aldosteronism",
      "parent": "111110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111101",
      "value": "Familial HyperAldosteronism I",
      "parent": "111110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11110",
      "value": "Aldosterone not High",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "144"
    },
    {
      "key": "111101",
      "value": "Cortisol High",
      "parent": "11110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111010",
      "value": "Cushing's Syndrome",
      "parent": "111101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111100",
      "value": "Cortisol not High",
      "parent": "11110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111000",
      "value": "Liddle's Syndrome",
      "parent": "111100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111001",
      "value": "Licorice",
      "parent": "111100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111002",
      "value": "Syndrome of Apparent Mineralocorticoid Excess",
      "parent": "111100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110",
      "value": "no High BP",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "61"
    },
    {
      "key": "11100",
      "value": "Variable Acid Base status",
      "parent": "1110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111000",
      "value": "Non-reabsorbable Anions other than Bicarbonate",
      "parent": "11100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11101",
      "value": "Metabolic Acidosis",
      "parent": "1110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "62"
    },
    {
      "key": "111011",
      "value": "high AG",
      "parent": "11101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110110",
      "value": "DKA",
      "parent": "111011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110111",
      "value": "Amphotericin B",
      "parent": "111011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110112",
      "value": "Acetazolamide",
      "parent": "111011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111010",
      "value": "normal AG",
      "parent": "11101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110100",
      "value": "Distal RTA",
      "parent": "111010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110101",
      "value": "Proximal RTA",
      "parent": "111010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-1",
      "value": "Metabolic Alkalosis",
      "parent": "1110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "145"
    },
    {
      "key": "1110-10",
      "value": "Urine Chloride low",
      "parent": "1110-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-100",
      "value": "Vomiting",
      "parent": "1110-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-101",
      "value": "Chloride Diarrhea",
      "parent": "1110-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-11",
      "value": "Urine Chloride > 20",
      "parent": "1110-1",
      "labitemsIndex": "",
      "measurementsIndex": "27",
      "signsIndex": ""
    },
    {
      "key": "1110-110",
      "value": "Ca/Cr Ratio normal",
      "parent": "1110-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-1100",
      "value": "Thiazide Diuretics",
      "parent": "1110-110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-1101",
      "value": "Gitelman's Syndrome",
      "parent": "1110-110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-111",
      "value": "Ca/Cr Ratio > 0.2",
      "parent": "1110-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-1110",
      "value": "Loop Diuretics",
      "parent": "1110-111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110-1111",
      "value": "Bartter's Syndrome",
      "parent": "1110-111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ]
];
class TreeNode {
  constructor(
    key,
    value = key,
    parent = null,
    labitemsIndex,
    measurementsIndex,
    signsIndex
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.labitemsIndex = labitemsIndex;
    this.measurementsIndex = measurementsIndex;
    this.signsIndex = signsIndex;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor(key, value = key, labitemsIndex, measurementsIndex, signsIndex) {
    this.root = new TreeNode(
      key,
      value,
      null,
      labitemsIndex,
      measurementsIndex,
      signsIndex
    );
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, key, value = key, labitemsIndex, measurementsIndex, signsIndex) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(
          new TreeNode(key, value, node, labitemsIndex, measurementsIndex, signsIndex)
        );
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  findLeavesFrom(parentNodeKey) {
    let leaves = [];
    for (let node of this.preOrderTraversal()) {
      if (node.key.startsWith(parentNodeKey)) {
        if (node.isLeaf) leaves.push(node);
      }
    }
    return leaves;
  }
}

function testEngine(key) {
  let selectedTreeIndex = key;
  const tree = new Tree(
    algorithms[selectedTreeIndex][0].key,
    algorithms[selectedTreeIndex][0].value,
    algorithms[selectedTreeIndex][0].labitemsIndex,
    algorithms[selectedTreeIndex][0].measurementsIndex,
    algorithms[selectedTreeIndex][0].signsIndex
  );
  let algorithmLength = algorithms[selectedTreeIndex].length;
  for (let i = 1; i < algorithmLength; i++) {
    tree.insert(
      algorithms[selectedTreeIndex][i].parent,
      algorithms[selectedTreeIndex][i].key,
      algorithms[selectedTreeIndex][i].value,
      algorithms[selectedTreeIndex][i].labitemsIndex,
      algorithms[selectedTreeIndex][i].measurementsIndex,
      algorithms[selectedTreeIndex][i].signsIndex
    );
  }

  let leaves = [];
  let keyString = "1";
  let path = "";
  while (true) {
    let node = tree.find(keyString);
    let item = {};
    try {
      if (keyString != "1") {
        path += " &#8594 " + node.value;
      } else {
        path += node.value;
      }

      if (node.labitemsIndex != "") {
        item = labItems[node.labitemsIndex];
      } else if (node.measurementsIndex != "") {
        item = measurements[node.measurementsIndex];
      } else if (node.signsIndex != "") {
        let value = patient[0].signs[3][node.signsIndex];
        let min = -1;
        let name = patient[0].signs[4][node.signsIndex];
        if (value == -1) min= -0.5;
        let entered = 0;
        if (value != undefined) {
          entered = 1;
        }
        item = {
          "name": name,
          "entered": entered,
          "value": value,
          "min": min,
          "max": 0.5 
        }
      }
      else {
        leaves = tree.findLeavesFrom(keyString);
        return [leaves, path];
      }
      if (item.entered == 0) {
        path += " &#8594 " + item.name + " not entered";
        leaves = tree.findLeavesFrom(keyString);
        if (keyString == "1") {
          return [undefined, undefined];
        }
        return [leaves, path];
      }
      if (item.used === false) {
        path += " &#8594 " + item.name + " not entered";
        leaves = tree.findLeavesFrom(keyString);
        if (keyString == "1") {
          return [undefined, undefined];
        }
        return [leaves, path];
      }
      let value = Number(item.value);
      let max = Number(item.max);
      let min = Number(item.min);

      if (item.max == "") {
        if (item.min == "") {
          return [leaves, path];
        } else if (value < min) {
          keyString += "-1";
        } else {
          keyString += "0";
        }
      } else {
        if (value > max) {
          keyString += "1";
        } else if (item.min == "") {
            keyString += "0";
        } else if (value < min) {
          keyString += "-1";
        } else {
          keyString += "0";
        }
          
      }
      


      // if (Number(item.value) > Number(item.max)) {
      //   keyString += "1";
      // } else if (Number(item.value) < Number(item.min)) {
      //   keyString += "-1";
      // } else {
      //   keyString += "0";
      // }
      //   leaves = tree.findLeavesFrom("1-10");
      // console.log([...leaves].map((x) => x.value));
    } catch {
      return [undefined, undefined];
    }
  }
}
