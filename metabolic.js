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
    "'><img src='https://cdn-icons-png.flaticon.com/128/1323/1323734.png' alt='Reference' class='referenceIcon'></a>";
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
  let text = "Diabetes Management Targets <ul>" + FBSText + OGTTText + TGText + LDLText + HDLText + "</ul>";
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
  preEclampsiaMain();
}
function hba1cStatistics() {
  let FBSEntered = labItems[35].entered;
  let HbA1cEntered = labItems[36].entered;
  if (pregnancyStatus == 0) {
    if (FBSEntered == 0) {
      conditionMaker(5); //HBA1c to FBS>125
    } else if (HbA1cEntered == 1) {
      labItems[36].entered = 0;
      conditionMaker(5);
      labItems[36].entered = 1;
      if (isDiabetes()) {
        labItems[36].entered = 0;
        conditionMaker(6);
        labItems[36].entered = 1;
        labItems[36].entered = 0;
        conditionMaker(7);
        labItems[36].entered = 1;
        return 0;
      }
    }
  }
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
      "'><img src='https://cdn-icons-png.flaticon.com/128/1323/1323734.png' alt='Reference' class='referenceIcon'></a>";
    patient[0].signs[0][420] = "PreEclampsia " + referenceHTML;
    patient[0].signs[1][420] =
      "> 20 weeks of Gestation + new onset HTN " +
      proteinuriaPath +
      creatininePath +
      thrombocytopeniaPath +
      liverPath;
  }
}
function isPreEclampsia() {
  let creatinine = Number(labItems[30].value);
  let urineProtein = Number(labItems[80].value);
  if (pregnancyStatus > 1) {
    if (globalSBP >= 140 || globalDBP >= 90) {
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
