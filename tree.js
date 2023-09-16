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
      "labitemsIndex": "63",
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
      "signsIndex": "400"
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
      "signsIndex": "401"
    },
    {
      "key": "1111",
      "value": "High BP",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "402"
    },
    {
      "key": "11111",
      "value": "Aldosterone High",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "403"
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
      "signsIndex": "404"
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
      "signsIndex": "405"
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
  ],
  // [4] = hyperkalemia without 9-a-fludrocortisone
  [
    {
      "key": "1",
      "value": "K high",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "407"
    },
    {
      "key": "11",
      "value": "UNa < 25",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "Decreased distal Na delivery",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "UNa &ge; 25",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "408"
    },
    {
      "key": "101",
      "value": "TTKG > 8",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "409"
    },
    {
      "key": "1011",
      "value": "GFR &le; 20",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10110",
      "value": "Advanced Kidney Failure",
      "parent": "1011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1010",
      "value": "GFR > 20",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "411"
    },
    {
      "key": "10100",
      "value": "ECV not compatible",
      "parent": "1010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "101000",
      "value": "ECV reduced",
      "parent": "10100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10101",
      "value": "ECV reduced",
      "parent": "1010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "101010",
      "value": "ECV reduced",
      "parent": "10101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": " 5 &ge; TTKG &le; 8",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "Reduced Tubular Flow",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-1",
      "value": "TTKG < 5",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "409"
    },
    {
      "key": "10-11",
      "value": "GFR &le; 20",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-110",
      "value": "Wrong Cr Input",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-10",
      "value": "9alpha-Fludrocortisone must be used",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-100",
      "value": "Evaluate again after 9a-Fludrocortisone use",
      "parent": "10-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
  // [5] = hyperkalemia with 9-a-fludrocortisone
  [
    {
      "key": "1",
      "value": "K high",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "410"
    },
    {
      "key": "11",
      "value": "TTKG > 8",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "403"
    },
    {
      "key": "111",
      "value": "Renin high",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110",
      "value": "Primary Adrenal Insufficiency",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111",
      "value": "Isolated Aldosterone Deficiency",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1112",
      "value": "Heparin / LMWH",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1113",
      "value": "ACE-I / ARB",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1114",
      "value": "Ketoconazole",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "Renin low",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1100",
      "value": "Diabetes Mellitus",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1101",
      "value": "Acute GN",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1102",
      "value": "TIN",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1103",
      "value": "PHA - type II",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1104",
      "value": "NSAIDs",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1105",
      "value": "Beta-Blockers",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "TTKG < 8",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "Drugs (Amiloride, Sprinolactone, Triamterene, Trimethprim, Pentamidine, Eplerenone, Drospirenone, Calcineurine Inhibitors)",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "101",
      "value": "TIN",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "102",
      "value": "Urinary Tract Obstruction",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "103",
      "value": "PHA - type I",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "104",
      "value": "PHA - type II",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "105",
      "value": "Sickle Cell Disease",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "106",
      "value": "Renal Transplant",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "107",
      "value": "SLE",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
  // [6] = TFT
  [
    {
      "key": "1",
      "value": "TFT",
      "parent": "",
      "labitemsIndex": "22",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "Free T4 normal",
      "parent": "1",
      "labitemsIndex": "21",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-1",
      "value": "TSH low",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "305"
    },
    {
      "key": "10-10",
      "value": "Free T3 high",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-100",
      "value": "T3 Thyrotoxicosis",
      "parent": "10-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-11",
      "value": "Free T3 not high",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-110",
      "value": "Subclinical Hyperthyroidism",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-111",
      "value": "recent treatment of Hyperthyroidism",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-112",
      "value": "Streoids",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-113",
      "value": "Dopamine",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-114",
      "value": "Assay Interference",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-115",
      "value": "Sick Euthyroid Syndrome ",
      "parent": "10-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "101",
      "value": "TSH high",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1010",
      "value": "Subclinical Hypothyroidism",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1011",
      "value": "Poor Thyroxine Compliance",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1012",
      "value": "Thyroxine Malabsorption",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1013",
      "value": "Amiodarone",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1014",
      "value": "Assay Interference",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1015",
      "value": "Sick Euthyroid Syndrome Recovery Phase",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1016",
      "value": "TSH resistance",
      "parent": "101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "TSH normal",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "307"
    },
    {
      "key": "1000",
      "value": "Total T3 and T4 normal",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10000",
      "value": "Normal TFT",
      "parent": "1000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1001",
      "value": "Total T3 or T4 high",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "308"
    },
    {
      "key": "10010",
      "value": "TBG high",
      "parent": "1001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100100",
      "value": "Compatible with Increased Thyroid Binding Globulin",
      "parent": "10010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10011",
      "value": "TBG not high",
      "parent": "1001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100110",
      "value": "Familial Dysalbuminemic Hyperthyroxinemia",
      "parent": "10011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100111",
      "value": "Transthyretin Increased or Mutated",
      "parent": "10011",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100-1",
      "value": "Total T3 or T4 low",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "309"
    },
    {
      "key": "100-10",
      "value": "TBG low",
      "parent": "100-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100-100",
      "value": "Compatible with Decreased Thyroid Binding Globulin",
      "parent": "100-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100-11",
      "value": "TBG not low",
      "parent": "100-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100-110",
      "value": "Normal TFT",
      "parent": "100-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11",
      "value": "Free T4 high",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "300"
    },
    {
      "key": "111",
      "value": "TSH not low",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "306"
    },
    {
      "key": "1110",
      "value": "Total T4 high",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11100",
      "value": "Familial Dysalbuminemic Hyperthyroxinemia",
      "parent": "1110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1111",
      "value": "Total T4 normal",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11110",
      "value": "Assay Interference",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11111",
      "value": "TSH secreting Pituitary Adenoma",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11112",
      "value": "Thyroid Hormone Resistance",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11113",
      "value": "Disorder of Thyroid Hormone transport or metabolism",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11114",
      "value": "Amiodarone",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11115",
      "value": "Heparine",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11116",
      "value": "Sick Euthyroid Syndrome ",
      "parent": "1111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "TSH low",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1100",
      "value": "Graves' Disease",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1101",
      "value": "Toxic multinodualr Goitre",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1102",
      "value": "Toxic adenoma",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1103",
      "value": "Thyroiditis (Post-viral, Post-partum)",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1104",
      "value": "Excess Iodine Intake",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1105",
      "value": "Congenital Hyperthyroidism",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1106",
      "value": "Amiodarone",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1",
      "value": "Free T4 low",
      "parent": "1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "301"
    },
    {
      "key": "1-10",
      "value": "TSH high",
      "parent": "1-1",
      "labitemsIndex": "29",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-101",
      "value": "Anti-TPO Positive",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1010",
      "value": "Auto-immune Hypothroidism (Hashimoto's Disease or Atrophic Auto-immune)",
      "parent": "1-101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-100",
      "value": "Anti-TPO Negative",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1000",
      "value": "Post-radioiodine therapy",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1001",
      "value": "Post Thyroidectomy",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1002",
      "value": "Hypothyroid phase of Thyroiditis",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1003",
      "value": "Lithium, Anti-thyroid Drugs, Amiodarone",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1004",
      "value": "Thyrosine Kinase Inhibitors",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1005",
      "value": "Iodine Deficiency or Excess",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1006",
      "value": "Neck Irridation",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1007",
      "value": "Riedel's Thyroiditis",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1008",
      "value": "Thyroid Infiltration (Tumor, Amyloid)",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1009",
      "value": "Congenital Hypothyroidism",
      "parent": "1-100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-11",
      "value": "TSH not high",
      "parent": "1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-110",
      "value": "Sick Euthyroid Syndrome",
      "parent": "1-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-111",
      "value": "Central Hypothyroidism",
      "parent": "1-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-112",
      "value": "Isolated TSH deficiency",
      "parent": "1-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-113",
      "value": "Assay Interference",
      "parent": "1-11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "",
      "value": "",
      "parent": "",
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
