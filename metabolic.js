function dyslipidemia() {
  let totalTG = Number(labItems[100].value);
  let totalChol = Number(labItems[101].value);
  let LDLChol = Number(labItems[102].value);
  let HDLChol = Number(labItems[103].value);
  let totalTGEntered = labItems[100].entered;
  let totalCholEntered = labItems[101].entered;
  let LDLCholEntered = labItems[102].entered;
  let HDLCholEntered = labItems[103].entered;
  let criteriaMet = 0;
  let path = "";
  patient[0].signs[0][50] = undefined;
  patient[0].signs[2][50] = "rgb(102, 30, 52)";
  if (totalTGEntered == 1 && totalTG >= 200) {
    path = "Total Triglycerides &ge; 200";
    criteriaMet++;
  }
  if (totalCholEntered == 1 && totalChol >= 240) {
    if (criteriaMet > 0) path += " and ";
    path += "Total Cholesterol &ge; 240";
    criteriaMet++;
  }
  if (LDLCholEntered == 1 && LDLChol >= 160) {
    if (criteriaMet > 0) path += " and ";
    path += "LDL-C &ge; 240";
    criteriaMet++;
  }
  if (HDLCholEntered == 1 && HDLChol < 40) {
    if (criteriaMet > 0) path += " and ";
    path += "HDL-C Cholesterol < 40";
    criteriaMet++;
  }
  patient[0].signs[1][50] = path;
  if (criteriaMet > 0) {
    patient[0].signs[0][50] = "Dyslipidemia";
    return true;
  }
  return false;
}

function diabetesMain() {
  let FBS = Number(labItems[35].value);
  let FBSEntered = labItems[35].entered;
  let OGTT = Number(labItems[37].value);
  let OGTTEntered = labItems[37].entered;
  let HbA1c = Number(labItems[36].value);
  let HbA1cEntered = labItems[36].entered;
  let FBSPath = FBSEntered == 1 && FBS > 125 ? "FBS > 125" : "";
  let OGTTPath = OGTTEntered == 1 && OGTT > 200 ? "OGTT > 200" : "";
  let HbA1cPath = HbA1cEntered == 1 && HbA1c > 6.4 ? "HbA1c > 6.4" : "";
  let prefix1 = "";
  let prefix2 = "";
  prefix1 = prefix1Maker(FBSPath, OGTTPath);
  prefix2 = prefix2Maker(FBSPath, OGTTPath, HbA1cPath);
  patient[0].signs[0][51] = undefined;
  patient[0].signs[2][51] = "rgb(102, 30, 52)";
  if (globalDiabetesHistory == 0) {
    if (FBSEntered == 1 && FBS > 200) {
      patient[0].signs[0][51] =
        "Diabetes Mellitus (if the patient has symptoms)";
      patient[0].signs[1][51] = "FBS > 200";
    } else {
      if (isDiabetes()) {
        patient[0].signs[0][51] = "Diabetes Mellitus (recheck tests)";
        patient[0].signs[1][51] =
          FBSPath + prefix1 + OGTTPath + prefix2 + HbA1cPath;
      } else if (isPrediabetes()) {
        FBSPath = FBSEntered == 1 && FBS > 100 ? "FBS > 100" : "";
        OGTTPath = OGTTEntered == 1 && OGTT > 140 ? "OGTT > 140" : "";
        HbA1cPath = HbA1cEntered == 1 && HbA1c > 5.7 ? "HbA1c > 5.7" : "";
        prefix1 = prefix1Maker(FBSPath, OGTTPath);
        prefix2 = prefix2Maker(FBSPath, OGTTPath, HbA1cPath);

        patient[0].signs[0][51] = "Prediabetes (recheck tests)";
        patient[0].signs[1][51] =
          FBSPath + prefix1 + OGTTPath + prefix2 + HbA1cPath;
      } else {
      }
    }

    hba1cStatistics();
  } else {
    diabetesControl();
  }
}

function diabetesControl() {
  let FBS = Number(labItems[35].value);
  let FBSEntered = labItems[35].entered;
  let OGTT = Number(labItems[37].value);
  let OGTTEntered = labItems[37].entered;
  let HbA1c = Number(labItems[36].value);
  let HbA1cEntered = labItems[36].entered;
  let TG = Number(labItems[100].value);
  let LDL = Number(labItems[102].value);
  let HDL = Number(labItems[103].value);
  let TGEntered = labItems[100].entered;
  let LDLEntered = labItems[102].entered;
  let HDLEntered = labItems[103].entered;
  let FBSText = "<li> FBS not Entered </li>";
  let OGTTText = "<li> OGTT not Entered </li>";
  let TGText = "<li> TG not Entered </li>";
  let LDLText = "<li> LDL not Entered </li>";
  let HDLText = "<li> HDL not Entered </li>";
  let FBSPath = "FBS not Entered";
  let OGTTPath = " + OGTT not Entered";
  let TGPath = " + TG not Entered";
  let LDLPath = " + LDL not Entered";
  let HDLPath = " + HDL not Entered";
  patient[0].signs[0][51] = undefined;
  patient[0].signs[2][51] = "rgb(102, 30, 52)";
  patient[0].signs[0][52] = undefined;
  patient[0].signs[2][52] = "rgb(102, 30, 52)";
  let hba1cTargetReference =
    "https://diabetesjournals.org/care/article/42/Supplement_1/S61/30946/6-Glycemic-Targets-Standards-of-Medical-Care-in";
  let referenceHTML =
    "<a target='_blank' href='" +
    hba1cTargetReference +
    "'><img src='/Art/link.png' alt='Reference' class='referenceIcon'></a>";
  if (HbA1cEntered == 1) {
    if (HbA1c > 7) {
      patient[0].signs[0][51] =
        "HbA1c higher than general Target" + referenceHTML;
      patient[0].signs[1][51] = "HbA1c > 7";
    } else if (HbA1c > 6) {
      patient[0].signs[0][51] = "HbA1c in general Target" + referenceHTML;
      patient[0].signs[1][51] = "6 < HbA1c &le; 7";
    } else {
      patient[0].signs[0][51] =
        "HbA1c lower than general Target" + referenceHTML;
      patient[0].signs[1][51] = "HbA1c &le; 6";
    }
  } else {
    patient[0].signs[0][51] = undefined;
  }
  if (FBSEntered == 1) {
    if (FBS > 130) {
      FBSText = "<li> FBS is High </li>";
      FBSPath = "FBS > 130 ";
    } else if (FBS >= 80) {
      FBSText = "<li> FBS is in range </li>";
      FBSPath = "80 &le; FBS &le; 130 ";
    } else {
      FBSText = "<li> FBS is low </li>";
      FBSPath = "FBS < 80 ";
    }
  }
  if (OGTTEntered == 1) {
    if (OGTT > 180) {
      OGTTText = "<li> OGTT is High </li>";
      OGTTPath = "+ OGTT > 180 ";
    } else if (OGTT >= 100) {
      OGTTText = "<li> OGTT is in range </li>";
      OGTTPath = "+ 100 &le; OGTT &le; 180 ";
    } else {
      OGTTText = "<li> OGTT is low </li>";
      OGTTPath = "+ OGTT < 100 ";
    }
  }
  if (TGEntered == 1) {
    if (TG > 150) {
      TGText = "<li> TG is High </li>";
      TGPath = "+ TG > 150 ";
    } else {
      TGText = "<li> TG is in range </li>";
      TGPath = "+ TG &le; 150 ";
    }
  }
  if (LDLEntered == 1) {
    if (LDL > 100) {
      LDLText = "<li> LDL is High </li>";
      LDLPath = "+ LDL > 100 ";
    } else {
      LDLText = "<li> LDL is in range </li>";
      LDLPath = "+ LDL &le; 100 ";
    }
  }
  if (HDLEntered == 1) {
    if (genderCoef == 0) {
      if (HDL < 40) {
        HDLText = "<li> HDL is low </li>";
        HDLPath = "+ HDL < 40 ";
      } else {
        HDLText = "<li> HDL is in range </li>";
        HDLPath = "+ HDL &ge; 40 ";
      }
    } else {
      if (HDL < 50) {
        HDLText = "<li> HDL is low </li>";
        HDLPath = "+ HDL < 50 ";
      } else {
        HDLText = "<li> HDL is in range </li>";
        HDLPath = "+ HDL &ge; 50 ";
      }
    }
  }
  let text =
    "Diabetes Management Targets <ul>" +
    FBSText +
    OGTTText +
    TGText +
    LDLText +
    HDLText +
    "</ul>";
  let path = FBSPath + OGTTPath + TGPath + LDLPath + HDLPath;
  patient[0].signs[0][52] = text;
  patient[0].signs[1][52] = path;
}
function prefix1Maker(FBSPath, OGTTPath) {
  let prefix1 = "";
  if (FBSPath == "") {
    prefix1 == "";
  } else if (OGTTPath != "") {
    prefix1 = " + ";
  } else {
    prefix1 == "";
  }
  return prefix1;
}
function prefix2Maker(FBSPath, OGTTPath, HbA1cPath) {
  let prefix2 = "";
  if (HbA1cPath != "") {
    if (OGTTPath != "") {
      prefix2 = " + ";
    } else if (FBSPath != "") {
      prefix2 = " + ";
    } else {
      prefix2 == "";
    }
  } else {
    prefix2 == "";
  }
  return prefix2;
}
function isPrediabetes() {
  if (globalDiabetesHistory == 1) return true;
  if (isDiabetes()) return false;
  let FBS = Number(labItems[35].value);
  let FBSEntered = labItems[35].entered;
  let OGTT = Number(labItems[37].value);
  let OGTTEntered = labItems[37].entered;
  let HbA1c = Number(labItems[36].value);
  let HbA1cEntered = labItems[36].entered;
  if (FBSEntered == 1 && FBS > 100) return true;
  if (HbA1cEntered == 1 && HbA1c > 5.7) return true;
  if (OGTTEntered == 1 && OGTT > 140) return true;
  return false;
}
function isDiabetes() {
  if (globalDiabetesHistory == 1) return true;
  let FBS = Number(labItems[35].value);
  let FBSEntered = labItems[35].entered;
  let OGTT = Number(labItems[37].value);
  let OGTTEntered = labItems[37].entered;
  let HbA1c = Number(labItems[36].value);
  let HbA1cEntered = labItems[36].entered;
  if (FBSEntered == 1 && FBS > 125) return true;
  if (HbA1cEntered == 1 && HbA1c > 6.4) return true;
  if (OGTTEntered == 1) {
    if (FBSEntered == 1 && FBS <= 100) return false;
    if (HbA1cEntered == 1 && HbA1c <= 5.7) return false;
    if (OGTT > 200) return true;
  }
  return false;
}
function kidneyMain() {
  isProteinuria();
  preEclampsiaMain();
  ckdStaging();
  proteinuriaStaging();
  urineVolume();
}
function proteinuriaStaging() {
  let urineProtein = Number(labItems[80].value);
  let urineProteinEntered = labItems[80].value;
  patient[0].signs[0][423] = undefined;
  patient[0].signs[1][423] = undefined;
  patient[0].signs[2][423] = "rgb(128, 70, 32)";
  if (urineProteinEntered == 0) return 0;
  let path = "";
  if (urineProtein >= 3500) {
    path = "Urine protein &ge; 3500 mg/day";
    patient[0].signs[0][423] = "Nephrotic range Proteinuria";
    patient[0].signs[1][423] = path;
  } else if (urineProtein >=150) {
    path = "Urine protein > 150 mg/day";
    patient[0].signs[0][423] = "abnormal Proteinuria";
    patient[0].signs[1][423] = path;
  }
}
function urineVolume() {
  let urineVolume = Number(labItems[95].value);
  let urineVolumeEntered = labItems[95].entered;
  let kg = globalWeightGram / 1000;
  patient[0].signs[0][424] = undefined;
  patient[0].signs[1][424] = undefined;
  patient[0].signs[2][424] = "rgb(128, 70, 32)";
  if (urineVolumeEntered == 0) return 0;
  let path = "";
  if (globalAgeYears < 1) {
    // olig <1 ml/kg/hr
    let minimumUrineVolumeOliguria = 24 * 1 * kg;
    if (urineVolume < minimumUrineVolumeOliguria) {
      path = "Urine volume < " + minimumUrineVolumeOliguria.toFixed(0);
      patient[0].signs[0][424] = "Oliguria";
      patient[0].signs[1][424] = path;
    }
    let maximumUrineVolume = 24 * 3 * kg;
    if (urineVolume > maximumUrineVolume) {
      path = "Urine volume > " + maximumUrineVolume.toFixed(0);
      patient[0].signs[0][424] = "Polyuria";
      patient[0].signs[1][424] = path;
    }
  } else if (globalAgeYears < 18) {
    // olig <0.5 ml/kg/hr
    let minimumUrineVolumeOliguria = 24 * 0.5 * kg;
    if (urineVolume < minimumUrineVolumeOliguria) {
      path = "Urine volume < " + minimumUrineVolumeOliguria.toFixed(0);
      patient[0].signs[0][424] = "Oliguria";
      patient[0].signs[1][424] = path;
    }
    let maximumUrineVolume = 24 * 3 * kg;
    if (urineVolume > maximumUrineVolume) {
      path = "Urine volume > " + maximumUrineVolume.toFixed(0);
      patient[0].signs[0][424] = "Polyuria";
      patient[0].signs[1][424] = path;
    }
  } else {
    if (urineVolume < 400) {
      path = "Urine volume < 400";
      patient[0].signs[0][424] = "Oliguria";
      patient[0].signs[1][424] = path;
    }
    if (urineVolume > 3000) {
      path = "Urine volume > 3000";
      patient[0].signs[0][424] = "polyuria";
      patient[0].signs[1][424] = path;
    }
  }
}
function ckdStaging() {
  patient[0].signs[0][422] = undefined;
  patient[0].signs[1][422] = undefined;
  patient[0].signs[2][422] = "rgb(128, 70, 32)";
  if (!globalBaseCrEntered || globalCKDHistory == 0) return 0;
  let ckdStage = "";
  let globalGFR = gfrCKD(globalBaseCr);
  if (globalGFR >= 90) ckdStage = "G1";
  else if (globalGFR >= 60) ckdStage = "G2";
  else if (globalGFR >= 45) ckdStage = "G3a";
  else if (globalGFR >= 30) ckdStage = "G3b";
  else if (globalGFR >= 15) ckdStage = "G4";
  else ckdStage = "G5";
  patient[0].signs[0][422] = "CKD Stage: " + ckdStage;
  patient[0].signs[1][422] = "based on Base GFR";
}
function baseCrAnalysis() {
  let crEntered = labItems[30].entered;
  let baseCr = globalBaseCr;
  measurements[29].used = false;
  measurements[30].used = false;
  measurements[31].used = false;
  if (!globalBaseCrEntered) {
    if (crEntered == 1 && globalCKDHistory == 0) {
      akiAnalyse();
    }
    return 0;
  }
  measurements[31].used = true;
  measurements[31].value = gfrCKD(baseCr).toFixed(2);
  if (crEntered == 1) {
    let currentCr = Number(labItems[30].value);
    let percentIncrease = (currentCr / baseCr - 1) * 100;
    let difference = currentCr - baseCr;
    measurements[29].used = true;
    measurements[30].used = true;
    measurements[29].value = percentIncrease.toFixed(0);
    measurements[30].value = difference.toFixed(2);
    if (globalCKDHistory == 0) akiAnalyse();
    if (globalCKDHistory == 1) ckdAnalyse();
  }
  return false;
}
function ckdAnalyse() {
  let crDif = measurements[30].value;
  patient[0].signs[0][421] = undefined;
  patient[0].signs[1][421] = undefined;
  patient[0].signs[2][421] = "rgb(128, 70, 32)";
  let path = "";
  if (crDif >= 0.3) {
    path = "Cr increased &ge; 0.3";
    patient[0].signs[0][421] = "Acute on Chronic Kidney Injury";
    patient[0].signs[1][421] = path;
    return 0;
  }
}
function akiAnalyse() {
  // ckd is off
  let crPercent = measurements[29].value;
  let crDif = measurements[30].value;
  let currentCr = Number(labItems[30].value);
  patient[0].signs[0][421] = undefined;
  patient[0].signs[1][421] = undefined;
  patient[0].signs[2][421] = "rgb(128, 70, 32)";
  let path = "";
  if (currentCr >= 4 && crDif >= 0.5) {
    path = "Cr &ge; 4";
    patient[0].signs[0][421] = "Acute Kidney Injury (RIFLE: Failure)";
    patient[0].signs[1][421] = path;
    return 0;
  }
  if (crPercent >= 200) {
    path = "Cr rise &ge; ×3";
    patient[0].signs[0][421] = "Acute Kidney Injury (RIFLE: Failure)";
    patient[0].signs[1][421] = path;
    return 0;
  }
  if (crPercent >= 100) {
    path = "Cr rise &ge; ×2";
    patient[0].signs[0][421] = "Acute Kidney Injury (RIFLE: Injury)";
    patient[0].signs[1][421] = path;
    return 0;
  }
  if (crPercent >= 50) {
    path = "Cr rise &ge; ×1.5";
    patient[0].signs[0][421] = "Acute Kidney Injury (RIFLE: Risk)";
    patient[0].signs[1][421] = path;
    return 0;
  }
  if (crDif >= 0.3) {
    path = "Cr increased &ge; 0.3";
    patient[0].signs[0][421] = "Acute Kidney Injury (RIFLE: Risk)";
    patient[0].signs[1][421] = path;
    return 0;
  }
  ckdCheck();
}
function ckdCheck() {
  patient[0].signs[0][422] = undefined;
  patient[0].signs[1][422] = undefined;
  patient[0].signs[2][422] = "rgb(128, 70, 32)";
  if (measurements[6].value < 60) {
    patient[0].signs[0][422] =
      "Probable CKD (GFR(MDRD) is " + measurements[6].value + " )";
    patient[0].signs[1][422] = "GFR < 60";
  }
}
function isCrRise() {
  let creatinine = Number(labItems[30].value);
  let creatinineMax = Number(labItems[30].max);
  let creatinineEntered = labItems[30].max;
  if (creatinineEntered == 1 && creatinine > creatinineMax) return true;
  return false;
}
function isProteinuria() {
  let urineProtein = Number(labItems[80].value);
  let urineProteinEntered = labItems[80].value;
  if (urineProteinEntered == 1) {
    if (urineProtein > 150) return true;
  }
  return false;
}
function hba1cStatistics() {
  if (pregnancyStatus == 1) {
    conditionMaker(6); //GDM first trimester
  } else {
    labItems[36].entered = 0;
    conditionMaker(6);
    labItems[36].entered = 1;
  }
  if (pregnancyStatus == 2) {
    conditionMaker(7); //GDM second trimester
  } else {
    labItems[36].entered = 0;
    conditionMaker(7);
    labItems[36].entered = 1;
  }
}
function preEclampsiaMain() {
  let creatinine = Number(labItems[30].value);
  let urineProtein = Number(labItems[80].value);
  patient[0].signs[0][420] = undefined;
  patient[0].signs[1][420] = undefined;
  patient[0].signs[2][420] = "rgb(128, 70, 32)";
  let preEclampsiaReference =
    "https://www.labce.com/spg1839185_american_college_of_obstetricians_and_gynecologist.aspx";
  if (isPreEclampsia()) {
    let proteinuriaPath = urineProtein > 300 ? " + Proteinuria" : "";
    let creatininePath = creatinine > 1.1 ? " + Cr rise" : "";
    let thrombocytopeniaPath = isThrombocytopenia()
      ? " + Thrombocytopenia"
      : "";
    let liverPath = isLiverEnzymesTwiced() ? " + Liver enzymes rise" : "";
    let referenceHTML =
      "<a target='_blank' href='" +
      preEclampsiaReference +
      "'><img src='/Art/link.png' alt='Reference' class='referenceIcon'></a>";
    patient[0].signs[0][420] = "PreEclampsia " + referenceHTML;
    patient[0].signs[1][420] =
      "> 20 weeks of Gestation + new onset HTN " +
      proteinuriaPath +
      creatininePath +
      thrombocytopeniaPath +
      liverPath;
  }
}
function isHypertension() {
  if (globalSBP >= 140 || globalDBP >= 90) return true;
  return false;
}
function isPreEclampsia() {
  let creatinine = Number(labItems[30].value);
  let urineProtein = Number(labItems[80].value);
  if (pregnancyStatus > 1) {
    if (isHypertension()) {
      if (
        urineProtein > 300 ||
        isThrombocytopenia() ||
        creatinine > 1.1 ||
        isLiverEnzymesTwiced()
      ) {
        return true;
      }
    }
  }
  return false;
}
function isLiverEnzymesTwiced() {
  let AST = Number(labItems[14].value);
  let ALT = Number(labItems[15].value);
  let ASTMax = Number(labItems[14].max);
  let ALTMax = Number(labItems[15].max);
  let ASTEntered = labItems[14].entered;
  let ALTEntered = labItems[15].entered;
  if (ASTEntered == 1 && ALTEntered == 1) {
    if (AST > 2 * ASTMax || ALT > 2 * ALTMax) {
      return true;
    }
  }
  return false;
}

function thyroidMain() {
  let TSH = Number(labItems[21].value);
  let FT4 = Number(labItems[22].value);
  let T4 = Number(labItems[23].value);
  let FT3 = Number(labItems[24].value);
  let T3 = Number(labItems[25].value);
  let RIU = Number(labItems[26].value);
  let TBG = Number(labItems[28].value);
  let TSHEntered = labItems[21].entered;
  let FT4Entered = labItems[22].entered;
  let T4Entered = labItems[23].entered;
  let FT3Entered = labItems[24].entered;
  let T3Entered = labItems[25].entered;
  let RIUEntered = labItems[26].entered;
  let TBGEntered = labItems[28].entered;
  let TSHMax = Number(labItems[21].max);
  let FT4Max = Number(labItems[22].max);
  let T4Max = Number(labItems[23].max);
  let FT3Max = Number(labItems[24].max);
  let T3Max = Number(labItems[25].max);
  let RIUMax = Number(labItems[26].max);
  let TBGMax = Number(labItems[28].max);
  let TSHMin = Number(labItems[21].min);
  let FT4Min = Number(labItems[22].min);
  let T4Min = Number(labItems[23].min);
  let FT3Min = Number(labItems[24].min);
  let T3Min = Number(labItems[25].min);
  let RIUMin = Number(labItems[26].min);
  let TBGMin = Number(labItems[28].min);
  patient[0].signs[4][300] = "TSH"; //TSH not low
  patient[0].signs[3][300] = undefined;
  patient[0].signs[4][301] = "TSH"; //TSH not high
  patient[0].signs[3][301] = undefined;
  patient[0].signs[4][302] = "Free T4"; //FT4 not low
  patient[0].signs[3][302] = undefined;
  patient[0].signs[4][303] = "Free T4"; //FT4 not high
  patient[0].signs[3][303] = undefined;
  patient[0].signs[4][304] = "Free T3"; //FT3 not low
  patient[0].signs[3][304] = undefined;
  patient[0].signs[4][305] = "Free T3"; //FT3 not high
  patient[0].signs[3][305] = undefined;
  patient[0].signs[4][306] = "Total T4"; //Total T4 not high
  patient[0].signs[3][306] = undefined;
  patient[0].signs[4][307] = "Total T4 and Total T3 non-compatible or "; //Total T3 or T4
  patient[0].signs[3][307] = undefined;
  patient[0].signs[4][308] = "TBG"; // TBG not high
  patient[0].signs[3][308] = undefined;
  patient[0].signs[4][309] = "TBG"; // TBG not low
  patient[0].signs[3][309] = undefined;

  if (TSHEntered == 1) {
    if (TSH < TSHMin) {
      patient[0].signs[3][300] = 0;
      patient[0].signs[3][301] = 1;
    } else if (TSH > TSHMax) {
      patient[0].signs[3][300] = 1;
      patient[0].signs[3][301] = 0;
    } else {
      patient[0].signs[3][300] = 1;
      patient[0].signs[3][301] = 1;
    }
  }
  if (FT4Entered == 1) {
    if (FT4 < FT4Min) {
      patient[0].signs[3][302] = 0;
      patient[0].signs[3][303] = 1;
    } else if (FT4 > FT4Max) {
      patient[0].signs[3][302] = 1;
      patient[0].signs[3][303] = 0;
    } else {
      patient[0].signs[3][302] = 1;
      patient[0].signs[3][303] = 1;
    }
  }
  if (FT3Entered == 1) {
    if (FT3 < FT3Min) {
      patient[0].signs[3][304] = 0;
      patient[0].signs[3][305] = 1;
    } else if (FT3 > FT3Max) {
      patient[0].signs[3][304] = 1;
      patient[0].signs[3][305] = 0;
    } else {
      patient[0].signs[3][304] = 1;
      patient[0].signs[3][305] = 1;
    }
  }
  if (T4Entered == 1) {
    if (T4 > T4Max) {
      patient[0].signs[3][306] = 0;
    } else {
      patient[0].signs[3][306] = 1;
    }
  }
  if (T3Entered == 1 && T4Entered == 1) {
    if (T4 > T4Max) {
      if (T3 >= T3Min) {
        patient[0].signs[3][307] = 1;
      }
    } else if (T4 < T4Min) {
      if (T3 <= T3Max) {
        patient[0].signs[3][307] = -1;
      }
    } else {
      if (T3 > T3Max) {
        patient[0].signs[3][307] = 1;
      } else if (T3 < T3Min) {
        patient[0].signs[3][307] = -1;
      } else {
        patient[0].signs[3][307] = 0;
      }
    }
  }
  if (TBGEntered == 1) {
    if (TBG > TBGMax) {
      patient[0].signs[3][308] = 0;
      patient[0].signs[3][309] = 1;
    } else if (TBG < TBGMin) {
      patient[0].signs[3][308] = 1;
      patient[0].signs[3][309] = 0;
    } else {
      patient[0].signs[3][308] = 1;
      patient[0].signs[3][309] = 1;
    }
  }
  patient[0].signs[0][31] = undefined;
  patient[0].signs[1][31] = undefined;
  patient[0].signs[2][31] = undefined;
  if (RIUEntered == 1 && FT4Entered == 1) {
    if (FT4 > FT4Max && RIU < RIUMin) {
      try {
        signMaker(
          listMaker(
            [
              "Subacute Thyroiditis",
              "Factitious Thyroiditis",
              "Viral or Post-partum Thyroiditis",
              "Increased Exogenous Iodine Intake",
            ],
            "RIU"
          ),
          "Thyrotoxicosis and Low RIU",
          31,
          "rgb(65, 87, 65)"
        );
      } catch {
        delete patient[0].signs[0][31];
        delete patient[0].signs[1][31];
        delete patient[0].signs[2][31];
      }
    }
  }

  if (TSHEntered == 1 && FT4Entered == 1) {
    let resultArray = testEngine(6);
    // resultArray[0] = arrayDuplicateRemover(resultArray[0]);
    try {
      signMaker(
        listMaker(
          arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
          "Thyroid Function Tests"
        ),
        resultArray[1], //path
        30,
        "rgb(65, 87, 65)"
      );
    } catch {
      patient[0].signs[0][30] = undefined;
      patient[0].signs[1][30] = undefined;
    }
  } else {
    patient[0].signs[0][30] = undefined;
    patient[0].signs[1][30] = undefined;
  }
}
