function ironProfile() {
  var p_hb = labItems[2].value; //p = patient's
  var p_mcv = labItems[3].value;
  var p_mch = labItems[5].value;
  var p_mchc = labItems[6].value;
  var p_crp = labItems[13].value;
  var p_si = labItems[40].value;
  var p_fe = labItems[41].value;
  var p_tibc = labItems[42].value;
  var path = "";
  var bio_color = "rgb(102, 30, 52)";
  if (p_si > 0 && p_tibc > 0) {
    measurementsCalc(); //to calc TSAT
  } else {
    globalTSAT = 0;
  }
  delete patient[0].signs[0][10];
  delete patient[0].signs[1][10];
  delete patient[0].signs[2][10];
  //returns 0 = no assessment, 1 = IDA , 11 = IronStoreDeficiency , 111= IronDeficientEryPoes
  //        2 = ACD , 3 = Thal , 4 = others , 5 = maybe mcv is wrong , 6 = no crp , false = no def
  //        12 = 1 + 2
  conditionMaker(0);
  if (p_fe <= 0) return 0; //we cant assess iron profile without ferritin
  if (p_fe < labItems[41].min) {
    path += "Ferritin < " + labItems[41].min + " &#8594 ";
    //we have IDA , now we have to find the intensity
    if (p_hb <= 0) {
      path += "Hb not entered";
      patient[0].signs[0][10] = "iron storage deficiency (w/o Hb)";
      patient[0].signs[1][10] = path;
      patient[0].signs[2][10] = bio_color;
      return 11; //atleast we have ironStoreDeficiency
    } else {
      if (p_hb < labItems[2].min) {
        path += "Hb < " + labItems[2].min + " &#8594 ";
        if (p_mcv > labItems[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          path += "MCV > " + labItems[3].max;
          patient[0].signs[0][10] =
            "iron deficiency is unlikely with macrocytosis";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 5;
        }
        if (globalTSAT == 0) {
          path += "Serum iron and/or TIBC not entered";
          patient[0].signs[0][10] = "iron storage deficiency (w/o TSAT)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 11; //we have Iron Deficiency
        } else if (globalTSAT <= 10) {
          path += "TSAT < 10";
          patient[0].signs[0][10] = "severe iron deficiency anemia";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 1; //we probably have Iron Deficiency anemia
        } else if (globalTSAT <= 15) {
          path += "TSAT < 15";
          patient[0].signs[0][10] = "mild iron deficiency anemia";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 111; //we probably have iron deficient erythropoesis
        } else if (globalTSAT >= 40) {
          path += "TSAT > 40";
          patient[0].signs[0][10] =
            "iron deficiency doesn't match TSAT (w/o sTfR)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 0; //no assessment
        } else {
          path += "20 < TSAT < 40";
          patient[0].signs[0][10] = "iron deficiency anemia";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 1; //we have Iron Deficiency Anemia
        }
      } else {
        // maybe hb is wrong or has not changed yet
        if (p_mcv > labItems[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          path += "MCV > " + labItems[3].max;
          patient[0].signs[0][10] =
            "iron deficiency is unlikely with macrocytosis";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 5;
        }
        if (globalTSAT == 0) {
          path += "Serum iron and/or TIBC not entered";
          patient[0].signs[0][10] = "iron storage deficiency (w/o TSAT)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 11; //we have Iron Deficiency
        } else if (globalTSAT <= 15) {
          path += "TSAT < 15";
          patient[0].signs[0][10] =
            "probable iron deficiency anemia (w/o sTfR)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 1; //we probably have Iron Deficiency anemia
        } else if (globalTSAT <= 20) {
          path += "TSAT < 20";
          patient[0].signs[0][10] = "iron deficient erythropoesis (w/o sTfR)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 111; //we probably have iron deficient erythropoesis
        } else if (globalTSAT >= 40) {
          path += "TSAT > 40";
          patient[0].signs[0][10] =
            "iron deficiency doesn't match TSAT (w/o sTfR)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 0; //no assessment
        } else {
          path += "20 < TSAT < 40";
          patient[0].signs[0][10] = "iron storage deficiency (w/o sTfR)";
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 11; //we have Iron Deficiency
        }
      }
    }
  } else {
    path += "Ferritin > " + labItems[41].min + " &#8594 ";
    if (p_hb <= 0) {
      //no hb and ferritin is normal
      path += "no Hb entered";
      patient[0].signs[0][10] = "no iron deficiency";
      patient[0].signs[1][10] = path;
      patient[0].signs[2][10] = bio_color;
      return false;
    } else {
      if (p_hb < labItems[2].min) {
        //anemia with nl or elevated ferritin
        path += "Hb < " + labItems[2].min + " &#8594 ";
        //now we check mcv
        if (p_mcv > labItems[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          patient[0].signs[0][10] =
            "iron deficiency is unlikely with macrocytosis";
          path += "MCV > " + labItems[3].max;
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 5;
        } else if (p_mcv > labItems[3].min) {
          path += labItems[3].min + " < MCV < " + labItems[3].max + " &#8594 ";
          //normocytic now we need crp
          if (p_crp <= 0) {
            //we dont have crp
            path += "no CRP entered";
            patient[0].signs[0][10] =
              "iron deficiency anemia unlikely or anemia of chronic disease (w/o CRP)";
            patient[0].signs[1][10] = path;
            patient[0].signs[2][10] = bio_color;
            return 6;
          } else {
            if (p_crp >= labItems[13].max) {
              //inflammation
              path += "CRP > " + labItems[13].max + " &#8594 ";
              if (globalTSAT <= 0) {
                path += "Serum iron and/or TIBC not entered";
                patient[0].signs[0][10] =
                  "iron deficiency anemia or anemia of chronic disease (w/o TSAT)";
                patient[0].signs[1][10] = path;
                patient[0].signs[2][10] = bio_color;
                return 12;
              } else if (globalTSAT <= 20) {
                path += "TSAT < 20";
                patient[0].signs[0][10] =
                  "iron deficiency anemia from other causes (w/o sTfR)";
                patient[0].signs[1][10] = path;
                patient[0].signs[2][10] = bio_color;
                return 4;
              } else if (globalTSAT < 40) {
                path += "TSAT < 40";
                patient[0].signs[0][10] =
                  "anemia of chronic disease from other causes (w/o sTfR)";
                patient[0].signs[1][10] = path;
                patient[0].signs[2][10] = bio_color;
                return 2;
              } else {
                path += "TSAT > 40";
                patient[0].signs[0][10] =
                  "iron deficiency doesn't match TSAT (w/o sTfR)";
                patient[0].signs[1][10] = path;
                patient[0].signs[2][10] = bio_color;
                return 0; //no assessment
              }
            } else {
              // crp nl and ferritin high and mcv nl so no def
              path += "CRP < " + labItems[13].max;
              patient[0].signs[0][10] = "no iron deficiency";
              patient[0].signs[1][10] = path;
              patient[0].signs[2][10] = bio_color;
              return false;
            }
          }
        } else {
          if (p_mcv <= 0) {
            path += "MCV not entered";
            patient[0].signs[0][10] = "iron deficiency unlikely (w/o MCV)";
            patient[0].signs[1][10] = path;
            patient[0].signs[2][10] = bio_color;
            return false; //no def
          } else {
            //microcytic we need crp
            path += "MCV < " + labItems[3].min + " &#8594 ";
            if (p_crp <= 0) {
              //we dont have crp
              path += "CRP not entered";
              patient[0].signs[0][10] =
                "iron deficiency anemia or anemia of chronic disease or thalassemia (w/o CRP)";
              patient[0].signs[1][10] = path;
              patient[0].signs[2][10] = bio_color;
              return 12;
            } else {
              if (p_crp >= labItems[13].max) {
                //inflammation
                path += "CRP > " + labItems[13].max + " &#8594 ";
                if (globalTSAT <= 0) {
                  path += "Serum iron and/or TIBC not entered";
                  patient[0].signs[0][10] =
                    "anemia of chronic disease and/or iron deficiency anemia (w/o TSAT)";
                  patient[0].signs[1][10] = path;
                  patient[0].signs[2][10] = bio_color;
                  return 12;
                } else if (globalTSAT <= 20) {
                  path += "TSAT < 20";
                  patient[0].signs[0][10] =
                    "anemia of chronic disease and/or iron deficiency anemia (w/o sTfR)";
                  patient[0].signs[1][10] = path;
                  patient[0].signs[2][10] = bio_color;
                  return 12;
                } else if (globalTSAT < 40) {
                  path += "TSAT < 40";
                  patient[0].signs[0][10] =
                    "anemia of chronic disease (w/o sTfR)";
                  patient[0].signs[1][10] = path;
                  patient[0].signs[2][10] = bio_color;
                  return 2;
                } else {
                  patient[0].signs[0][10] =
                    "iron deficiency unlikely (w/o sTfR)";
                  path += "TSAT > 40";
                  patient[0].signs[1][10] = path;
                  patient[0].signs[2][10] = bio_color;
                  return 0; //no assessment
                }
              } else {
                // crp nl and ferritin high and mcv low &#8594 check thal
                path += "CRP < " + labItems[13].max;
                patient[0].signs[0][10] = "check for thalassemia";
                patient[0].signs[1][10] = path;
                patient[0].signs[2][10] = bio_color;
                return 3;
              }
            }
          }
        }
      } else {
        //no anemia no low ferritin
        path += "Hb > " + labItems[2].min;
        patient[0].signs[0][10] = "no iron deficiency";
        patient[0].signs[1][10] = path;
        patient[0].signs[2][10] = bio_color;
        return false;
      }
    }
  }
}

function isAnemia() {
  let Hb = Number(labItems[2].value);
  let HbMin = Number(labItems[2].min);
  let HbEntered = labItems[2].entered;
  if (HbEntered == 1 && Hb < HbMin) {
    return true;
  }
  return false;
}
function isPolycytemia() {
  let Hb = Number(labItems[2].value);
  let HbMax = Number(labItems[2].max);
  let HbEntered = labItems[2].entered;
  if (HbEntered == 1 && Hb > HbMax) {
    return true;
  }
  return false;
}
function polycythemiaMain() {
  patient[0].signs[0][12] = undefined;
  patient[0].signs[1][12] = undefined;
  patient[0].signs[2][12] = "darkslateblue";
  let path = "";
  if (isPolycytemia()) {
    path = "high Hb";
    let polycthemiaDDxArray = [
      "Polycythemia Vera",
      "Primary familial and congenital polycythemia",
      "High altitude",
      "Respiratory disorders",
      "Elevated carboxyhemoglobin (eg. smoking)",
      "Cyanotic heart diseases",
      "Renal disorders",
      "Hemoglobinopathies",
      "EPO-secreting tumors",
      "Iatrogenic causes",
    ];
    if (globalVolumeStatus == -1)
      polycthemiaDDxArray.unshift("Severe Dehydration");
    if (
      genderCoef == 0 ||
      isHypertension() ||
      globalSmokingStatus != 0 ||
      globalDiabetesHistory == 1
    ) {
      polycthemiaDDxArray.push("Gaisbock Syndrome (stress polycythemia)");
    }
    try {
      signMaker(
        listMaker(polycthemiaDDxArray, "Polycythemia"),
        path, //path
        12,
        "darkslateblue"
      );
    } catch {
      patient[0].signs[0][12] = undefined;
      patient[0].signs[1][12] = undefined;
    }
  } else {
    patient[0].signs[0][12] = undefined;
    patient[0].signs[1][12] = undefined;
  }
}
function isPancytopenia() {
  patient[0].signs[4][1] = "Pancytopenia";
  let wbc = Number(labItems[0].value);
  let wbcMin = Number(labItems[0].min);
  let hb = Number(labItems[2].value);
  let hbMin = Number(labItems[2].min);
  let plt = Number(labItems[7].value);
  let pltMin = Number(labItems[7].min);
  let peniaCount = 0;
  patient[0].signs[2][1] = "darkslateblue";
  if (wbc < wbcMin && labItems[0].entered == 1) peniaCount++;
  if (hb < hbMin && labItems[2].entered == 1) peniaCount++;
  if (plt < pltMin && labItems[7].entered == 1) peniaCount++;
  if (peniaCount > 1) {
    patient[0].signs[0][1] = "Pancytopenia";
    patient[0].signs[1][1] = "two or more lineages are low";
    patient[0].signs[3][1] = 1;
    return true;
  } else {
    patient[0].signs[0][1] = undefined;
    patient[0].signs[1][1] = undefined;
    patient[0].signs[3][1] = 0;
    return false;
  }
}
function isThrombocytopenia() {
  let plt = Number(labItems[7].value);
  let pltMin = Number(labItems[7].min);
  let pltEntered = labItems[7].entered;
  if (pltEntered == 1 && plt < pltMin) {
    return true;
  }
  return false;
}
function isThrombocytosis() {
  let plt = Number(labItems[7].value);
  let pltMax = Number(labItems[7].max);
  let pltEntered = labItems[7].entered;
  if (pltEntered == 1 && plt > pltMax) {
    return true;
  }
  return false;
}

function isIronDef() {
  let iron = Number(labItems[40].value);
  let ferritin = Number(labItems[41].value);
  let ironMin = Number(labItems[40].min);
  let ferritinMin = Number(labItems[41].min);
  let ironEntered = labItems[40].entered;
  let ferritinEntered = labItems[41].entered;
  if (ferritinEntered == 1 && ferritin < ferritinMin) return true;
  if (ironEntered == 1 && iron < ironMin) return true;
  return false;
}
function plateletMain() {
  let giantPlt = Number(labItems[106].value);
  let INR = Number(labItems[108].value);
  let INRMax = Number(labItems[108].max);
  let INREntered = labItems[108].entered;
  let albumin = Number(labItems[19].value);
  let albuminMin = Number(labItems[19].min);
  let giantPltEntered = labItems[106].entered;
  let albuminEntered = labItems[19].entered;
  let blast = Number(labItems[73].value);
  let blastEntered = labItems[73].entered;
  let ddxArray = [];
  patient[0].signs[0][13] = undefined;
  patient[0].signs[1][13] = undefined;
  if (isThrombocytopenia()) {
    if (giantPltEntered == 1 && giantPlt > 1) {
      ddxArray.push(
        "ITP",
        "Bernard-Soulier syndrome",
        "Hereditary macrothrombocytopenia"
      );
    } else {
      if (globalVolumeStatus == -1) ddxArray.push("Dehydration");
      if (patient[0].signs[3][11] == 1)
        ddxArray.push("B12 or Folate Deficiency");
      if (
        isLiverEnzymesTwiced() ||
        (albuminEntered == 1 && albumin < albuminMin)
      ) {
        if (isAnemia() && genderCoef == 2 && pregnancyStatus != 0) {
          ddxArray.push("HELLP syndrome");
        }
        ddxArray.push("Liver Failure (low thrombopoietin)");
      }

      if (INREntered == 1 && INR > INRMax) {
        ddxArray.push("DIC");
      }
      if (isCrRise()) {
        ddxArray.push("TTP", "HUS");
      }
      if (isAnemia()) {
        ddxArray.push("TTP", "HUS", "Aplastic Anemia", "Leukemia");
      }
      if (isPancytopenia()) {
        ddxArray.push("MDS", "Leukemia");
      }
      ddxArray.push(
        "Assay Interference",
        "ITP",
        "Infection",
        "Sepsis",
        "Bernard-Soulier syndrome",
        "Hypersplenism",
        "SLE",
        "Medication",
        "TTP",
        "HUS",
        "DIC"
      );
    }
    let path = "low Platelet count";
    try {
      signMaker(
        listMaker(arrayDuplicateRemover(ddxArray), "Thrombocytopenia"),
        path,
        13,
        "rgb(83, 102, 30)"
      );
    } catch {
      patient[0].signs[0][13] = undefined;
      patient[0].signs[1][13] = undefined;
    }
  }
  if (isThrombocytosis()) {
    if (blastEntered == 1 && blast > 10) ddxArray.push("CML");
    if (isIronDef()) ddxArray.push("Iron deficiency");
    if (isPolycytemia()) ddxArray.push("Polycythemia Vera");
    if (isAnemia()) ddxArray.push("Primary Myelofibrosis");
    ddxArray.push(
      "Assay Interference",
      "Infection",
      "Tissue damage",
      "chronic Inflammation",
      "Essential Thrombocytosis",
      "Primary Myelofibrosis",
      "Malignancy"
    );
    let path = "high Platelet count";
    try {
      signMaker(
        listMaker(arrayDuplicateRemover(ddxArray), "Thrombocytosis"),
        path,
        13,
        "rgb(83, 102, 30)"
      );
    } catch {
      patient[0].signs[0][13] = undefined;
      patient[0].signs[1][13] = undefined;
    }
  }
}
function anemiaType() {
  let Hb = Number(labItems[2].value);
  let MCV = Number(labItems[3].value);
  let Hct = Number(labItems[4].value);
  let retic = Number(labItems[11].value);
  let HbEntered = Number(labItems[2].entered);
  let MCVEntered = Number(labItems[3].entered);
  let HctEntered = Number(labItems[4].entered);
  let reticEntered = Number(labItems[11].entered);
  let HbMin = Number(labItems[2].min);
  let MCVMin = Number(labItems[3].min);
  let MCVMax = Number(labItems[3].max);
  patient[0].signs[0][2] = undefined;
  patient[0].signs[1][2] = undefined;
  patient[0].signs[2][2] = "darkslateblue";
  patient[0].signs[0][10] = undefined;
  patient[0].signs[1][10] = undefined;
  patient[0].signs[2][10] = "rgb(102, 30, 52)";

  //anemia algorithm based on RPI and MCV
  let path = "";
  conditionMaker(0);
  if (HbEntered == 0) {
    return false;
  }

  if (Hb >= HbMin) {
    path += "Hb > " + HbMin;
    patient[0].signs[0][2] = undefined;
    patient[0].signs[1][2] = undefined;
    return false; //no anemia
  }

  if (MCVEntered == 1) {
    path += "Hb < " + HbMin + " &#8594 ";
    // we have mcv and we approach
    if (MCV < MCVMin) {
      //microcytic anemia
      path += " MCV < " + MCVMin;
      patient[0].signs[0][2] = "Microcytic anemia";
      patient[0].signs[1][2] = path;
      //now we have to check Iron profile , RDW , RBC count , MCH , if we have PBS
    } else if (MCV <= MCVMax) {
      //normocytic anemia
      path += MCVMin + " &ge; MCV &le; " + MCVMax;
      patient[0].signs[0][2] = "Normocytic anemia";
      patient[0].signs[1][2] = path;
    } else {
      //macrocytic anemia
      path += " MCV > " + MCVMax;
      patient[0].signs[0][2] = "Macrocytic anemia";
      patient[0].signs[1][2] = path;
    }
  } else {
    // we dont have mcv
    path += "Hb < " + HbMin + " and no MCV entered";
    patient[0].signs[0][2] = "Anemia";
    patient[0].signs[1][2] = path;
  }
  if (isAnemia()) {
    let resultArray = testEngine(0);
    try {
      signMaker(
        listMaker(
          arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
          "Anemia"
        ),
        resultArray[1], //path
        10,
        "rgb(102, 30, 52)"
      );
    } catch {
      patient[0].signs[0][10] = undefined;
      patient[0].signs[1][10] = undefined;
    }
  } else {
    patient[0].signs[0][10] = undefined;
    patient[0].signs[1][10] = undefined;
  }
  // iron_profile();
}

function folateAndB12() {
  var folate = Number(labItems[43].value);
  var b12 = Number(labItems[44].value);
  var folateMin = Number(labItems[43].min);
  var b12Min = Number(labItems[44].min);
  let path = "";
  delete patient[0].signs[0][11];
  delete patient[0].signs[1][11];
  patient[0].signs[2][11] = "rgb(102, 30, 52)";
  delete patient[0].signs[3][11];
  patient[0].signs[4][11] = "B12 or Folate";

  if (labItems[43].entered == "1") {
    if (folate < folateMin) {
      path += "Folate < " + folateMin;
      if (labItems[44].entered == "1" && b12 < b12Min) {
        path += " &#8594 B12 < " + b12Min;
        patient[0].signs[0][11] = "Folate and B12 deficiency";
        patient[0].signs[1][11] = path;
        patient[0].signs[3][11] = 1;
      } else {
        patient[0].signs[0][11] = "Folate deficiency";
        patient[0].signs[1][11] = path;
        patient[0].signs[3][11] = 1;
      }
    } else if (labItems[44].entered == "1" && b12 < b12Min) {
      path += "B12 < " + b12Min;
      patient[0].signs[0][11] = "B12 deficiency";
      patient[0].signs[1][11] = path;
      patient[0].signs[3][11] = 1;
    } else {
      patient[0].signs[3][11] = 0;
    }
  } else if (labItems[44].entered == "1") {
    if (b12 < b12Min) {
      path += "B12 < " + b12Min;
      patient[0].signs[0][11] = "B12 deficiency";
      patient[0].signs[1][11] = path;
      patient[0].signs[3][11] = 1;
    } else {
      patient[0].signs[3][11] = 0;
    }
  } else {
    patient[0].signs[3][11] = undefined;
  }
}

function pbsMain() {
  // conditionMaker(2);
  // conditionMaker(3);
}

function wbcMain() {
  let blast = Number(labItems[73].value);
  let blastEntered = labItems[73].entered;
  let path = "";
  patient[0].signs[0][0] = undefined;
  patient[0].signs[1][0] = undefined;
  patient[0].signs[2][0] = "rgb(61, 92, 139)";
  if (labItems[0].entered == 0) return 0;
  if (blastEntered == 1) {
    if (blast > 20) {
      path = "Blasts &ge; 20%";
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover(["Acute Leukemia"]),
            "Peripheral Blast"
          ),
          path, //path
          0,
          "rgb(61, 92, 139)"
        );
      } catch {
        patient[0].signs[0][0] = undefined;
        patient[0].signs[1][0] = undefined;
      }
    } else if (blast < 1) {
      path = "Blasts < 1% &#8594 ";
      wbcAnalysis(path);
    } else {
      path = "Blasts < 20%";
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover([
              "Acute Leukemia",
              "Myeloproliferative Neoplasms",
              "Myelodysplasia Syndrome",
              "Reactive Source",
            ]),
            "Peripheral Blast"
          ),
          path, //path
          0,
          "rgb(61, 92, 139)"
        );
      } catch {
        patient[0].signs[0][0] = undefined;
        patient[0].signs[1][0] = undefined;
      }
    }
  } else {
    wbcAnalysis(path);
  }
}

function neutropeniaSeverity() {
  let ANC = Number(measurements[10].value);
  let ANCEntered = measurements[10].used;
  if (ANCEntered && ANC < 1500) {
    if(ANC > 1000) {
      return 1;
    } else if (ANC > 500) {
      return 2;
    } else if (ANC > 200) {
      return 3;
    } else {
      return 4;
    }
  }
  return false;
}
function isNeutropenia() {
  let ANC = Number(measurements[10].value);
  let ANCEntered = measurements[10].used;
  if (ANCEntered && ANC < 1500) {
    return true;
  }
  return false;
}
function isNeutrophilia() {
  let ANC = Number(measurements[10].value);
  let ANCEntered = measurements[10].used;
  if (ANCEntered && ANC > 7700) {
    return true;
  }
  return false;
}
function isLymphocytosis() {
  let ALC = Number(measurements[11].value);
  let ALCEntered = measurements[11].used;
  if (ALCEntered && ALC > 4000) {
    return true;
  }
  return false;
}
function isMonocytosis() {
  let AMC = Number(measurements[12].value);
  let AMCEntered = measurements[12].used;
  if (AMCEntered && AMC > 1000) {
    return true;
  }
  return false;
}
function isEosinophilia() {
  let AEC = Number(measurements[13].value);
  let AECEntered = measurements[13].used;
  if (AECEntered && AEC > 500) {
    return true;
  }
  return false;
}
function isBasophilia() {
  let ABC = Number(measurements[14].value);
  let ABCEntered = measurements[14].used;
  if (ABCEntered && ABC > 300) {
    return true;
  }
  return false;
}
function isBandemia() {
  let bands = Number(labItems[50].value);
  let bandsEntered = labItems[50].entered;
  if (bandsEntered == 1 && bands >= 10) {
    return true;
  }
  return false;
}

function wbcAnalysis(path) {
  let wbcTotal = Number(labItems[0].value);
  let wbcMax = Number(labItems[0].max);
  let wbcMin = Number(labItems[0].min);
  if (wbcMax > 15000) {
    patient[0].signs[0][0] = "Wrong Input for WBC max";
    patient[0].signs[1][0] = "value set for WBC max is too high";
    return false;
  }
  if (wbcTotal > wbcMax) {
    path += "WBC > " + wbcMax;
    try {
      signMaker(
        listMaker(arrayDuplicateRemover(leukocytosisDDxDecider()), "Leukocytosis"),
        path,
        0,
        "rgb(61, 92, 139)"
      );
    } catch {
      patient[0].signs[0][0] = undefined;
      patient[0].signs[1][0] = undefined;
    }
  } else if (wbcTotal < wbcMin) {
    path += "WBC < " + wbcMin;
    try {
      signMaker(
        listMaker(arrayDuplicateRemover(leukopeniaDDxDecider()), "Leukopenia"),
        path,
        0,
        "rgb(61, 92, 139)"
      );
    } catch {
      patient[0].signs[0][0] = undefined;
      patient[0].signs[1][0] = undefined;
    }
    

  }
}

function leukocytosisDDxDecider() {
  let wbcTotal = Number(labItems[0].value);
  let wbcMax = Number(labItems[0].max);
  let wbcMin = Number(labItems[0].min);
  let ddxArray = [];
  let mildLeukocytosisDDx = [
    "Infection",
    "Corticosteroids",
    "NSAIDs",
    "Antibiotics",
    "Allergies",
    "Tissue Ischemia",
    "Connective tissue diseases",
    "Malignancies",
    "Hemorrhage",
  ];

  let severeLeukocytosisDDx = [
    "Infections",
    "Malignancy",
    "Corticosteroids",
    "Minocycline",
    "Ethylene Glycol",
    "Hemorrhage",
  ];
  let neutrophiliaDDx = [
    "Infections",
    "Chronic Inflammation",
    "Corticosteroids",
    "Beta-Agonist",
    "GCSF",
    "Splenectomy",
    "Congenital",
    "Malignancy",
  ];
  let lymphocytosisDDx = [
    "Infections",
    "Viral Infections",
    "Allergies",
    "Parasites",
    "Autoimmune Disease",
    "Splenectomy",
    "Stress",
    "Vaccine",
    "Malignancy",
  ]; //hyperthyro hypocort
  let basophiliaDDx = [
    "Infections",
    "Allergies",
    "IBD",
    "Autoimmune Disease",
    "Malignancy",
  ];
  let monocytosisDDx = [
    "Autoimmune Disease",
    "Infections",
    "Splenectomy",
    "MI",
    "Malignancy",
  ];
  let eosinophiliaDDx = [
    "Allergies",
    "TIN",
    "Autoimmune Disease",
    "Fungi",
    "Parasites",
    "Idiopathic Hypereosinophilic Syndrome",
    "Cholesterol emboli",
    "Radiation",
    "Malignancy",
  ]; // hypo adrenal
  if (wbcTotal > 50000) {
    neutrophiliaDDx = neutrophiliaDDx.concat([
      "CML",
      "CNL",
      "CMML",
      "Myelofibrosis",
    ]);
    lymphocytosisDDx = lymphocytosisDDx.concat([
      "CLL",
      "Non-Hodgkin Lymphoma",
      "Monoclonal B-Lymphocytosis",
      "T-cell Lymphoma",
      "Large granular lymphocytic leukemia",
      "Multiple Myeloma",
      "Amyloidosis",
    ]);
    basophiliaDDx = basophiliaDDx.concat(["CML", "CBL", "Myelofibrosis"]);
    monocytosisDDx = monocytosisDDx.concat(["CML", "CMML", "Myelofibrosis"]);
    eosinophiliaDDx = eosinophiliaDDx.concat([
      "CML",
      "CEL",
      "Systemic Mastocytosis",
    ]);
    if (isPolycytemia()) {
      neutrophiliaDDx.push("PV");
      basophiliaDDx.push("PV");
      monocytosisDDx.push("PV");
    }
    if (isThrombocytosis()) {
      neutrophiliaDDx.push("ET");
      basophiliaDDx.push("ET");
      monocytosisDDx.push("ET");
    }
  }
  if (pregnancyStatus != 0) {
    mildLeukocytosisDDx.unshift("Pregnancy");
    neutrophiliaDDx.unshift("Pregnancy");
  }
  if (globalSmokingStatus != 0) {
    mildLeukocytosisDDx.push("Smoking");
    neutrophiliaDDx.push("Smoking");
  }
  if (measurements[0].used && measurements[0].value >= 25) {
    mildLeukocytosisDDx.push("Obesity");
    neutrophiliaDDx.push("Obesity");
  }
  if (patient[0].signs[4][2] == 0) {
    //no differential entered
    if (
      isPancytopenia() ||
      wbcTotal > 30000 ||
      isAnemia() ||
      isThrombocytopenia() ||
      isThrombocytosis()
    ) {
      ddxArray = severeLeukocytosisDDx;
    } else {
      ddxArray = mildLeukocytosisDDx;
    }
  } else {
    if (isNeutrophilia()) {
      ddxArray = ddxArray.concat(neutrophiliaDDx);
    }
    if (isLymphocytosis()) {
      ddxArray = ddxArray.concat(lymphocytosisDDx);
    }
    if (isBasophilia()) {
      ddxArray = ddxArray.concat(basophiliaDDx);
    }
    if (isEosinophilia()) {
      ddxArray = ddxArray.concat(eosinophiliaDDx);
    }
    if (isMonocytosis()) {
      ddxArray = ddxArray.concat(monocytosisDDx);
    }
    if (ddxArray.length == 0) {
      if (
        isPancytopenia() ||
        wbcTotal > 30000 ||
        isAnemia() ||
        isThrombocytopenia() ||
        isThrombocytosis()
      ) {
        ddxArray = severeLeukocytosisDDx;
      } else {
        ddxArray = mildLeukocytosisDDx;
      }
    }
  }
  return ddxArray;
}
function leukopeniaDDxDecider() {
  let wbcTotal = Number(labItems[0].value);
  let wbcMin = Number(labItems[0].min);
  let ddxArray = [];
  let standardDDx = [
    "Infections",
    "Medications",
    "Autoimmune Diseases",
    "Hypersplenism",
    "Leukemia",
    "Lymphoma",
    "Myelodysplasia",
  ]
  if(isAnemia()) {
    standardDDx.push("Aplastic Anemia");
  }
  if(patient[0].signs[3][11] == 1) {
    
    standardDDx.unshift("B12 or folate deficiency");
  }
  return standardDDx;
}