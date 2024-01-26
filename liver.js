function lftEngine() {
  let AST = Number(labItems[14].value);
  let ALT = Number(labItems[15].value);
  let ALP = Number(labItems[16].value);
  let BilT = Number(labItems[17].value);
  let BilD = Number(labItems[18].value);
  let albumin = Number(labItems[19].value);
  let GGT = Number(labItems[20].value);
  let LDH = Number(labItems[80].value);
  let PT = Number(labItems[107].value);
  let INR = Number(labItems[108].value);
  let ASTMax = Number(labItems[14].max);
  let ALTMax = Number(labItems[15].max);
  let ALPMax = Number(labItems[16].max);
  let BilTMax = Number(labItems[17].max);
  let albuminMax = Number(labItems[19].max);
  let GGTMax = Number(labItems[20].max);
  let ASTEntered = labItems[14].entered;
  let ALTEntered = labItems[15].entered;
  let ALPEntered = labItems[16].entered;
  let BilTEntered = labItems[17].entered;
  let BilDEntered = labItems[18].entered;
  let albuminEntered = labItems[19].entered;
  let GGTEntered = labItems[20].entered;
  let LDHEntered = labItems[80].entered;
  let PTEntered = labItems[107].entered;
  let INREntered = labItems[108].entered;
  let astCoef = AST / ASTMax;
  let altCoef = ALT / ALTMax;
  let alpCoef = ALP / ALPMax;
  let biltCoef = BilT / BilTMax;
  let deRitisRatio = measurements[9].value;
  let path = "";
  patient[0].signs[0][20] = undefined;
  patient[0].signs[1][20] = undefined;
  patient[0].signs[2][20] = "darkslategray";
  patient[0].signs[0][21] = undefined;
  patient[0].signs[1][21] = undefined;
  patient[0].signs[2][21] = "darkslategray";
  patient[0].signs[0][23] = undefined;
  patient[0].signs[1][23] = undefined;
  patient[0].signs[2][23] = "darkslategray";
  patient[0].signs[0][24] = undefined;
  patient[0].signs[1][24] = undefined;
  patient[0].signs[2][24] = "darkslategray";
  patient[0].signs[4][22] = "Bilirubin"; // direct or not
  patient[0].signs[3][22] = undefined;
  if (ASTEntered == 1 && ALTEntered == 1 && ALPEntered == 1) {
    if (astCoef / altCoef > 5 || astCoef / altCoef < 0.2) {
      patient[0].signs[0][20] = "Liver tests not conclusive";
      patient[0].signs[1][20] = "AST and ALT are not compatible";
      patient[0].signs[2][20] = "darkslategray";
      return false;
    }
    if (astCoef > 10 || altCoef > 10) {
      //acute liver injury
      if (INREntered == 1 && INR > 1.5 && globalHepaticEncephalopathy == 1) {
        //acute liver failure
        path =
          "Marked Transaminase elevation and INR > 1.5 and Hepatic Encephalopathy";
        patient[0].signs[0][20] = "Acute Liver Failure";
        patient[0].signs[1][20] = path;
        let resultArray = testEngine(9);
        try {
          signMaker(
            listMaker(
              arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
              "Acute Liver Failure"
            ),
            resultArray[1], //path
            21,
            "darkslategray"
          );
        } catch {
          patient[0].signs[0][21] = undefined;
          patient[0].signs[1][21] = undefined;
        }
        return true;
      }
    }
    let patternReturnArray = lftPattern(AST, ASTMax, ALT, ALTMax, ALP, ALPMax);
    patient[0].signs[0][24] = patternReturnArray[0];
    patient[0].signs[1][24] = patternReturnArray[1];

    if (patternReturnArray[0] != "Cholestatic pattern") {
      if (patternReturnArray[0] == "Mixed pattern") {
        path += "Mixed pattern";
        let rValue = altCoef / alpCoef;
        if (rValue > 4) {
          hepatocellularPattern(astCoef, altCoef, deRitisRatio, LDH, path);
        } else if (altCoef > 25) {
          hepatocellularPattern(astCoef, altCoef, deRitisRatio, LDH, path);
        } else if (rValue < 3) {
          path += " &#8594 Prominent ALP Elevation";
            patient[0].signs[0][20] =
              "Cholelastitic Injury more probable";
            patient[0].signs[1][20] = path;
          cholestaticPattern();
        } else {
            patient[0].signs[0][20] =
              "Both Cholestatic and Hepatocellular Injury possible";
            patient[0].signs[1][20] = path;
          mixedPattern();
        }
      } else {
        path += "Hepato-cellular pattern";
        hepatocellularPattern(astCoef, altCoef, deRitisRatio, LDH, path);
      }
    } else {
      if (astCoef < 3 && altCoef < 3) {
        //isolated ALP elevation
        if (GGTEntered == 1) {
          if (GGT < GGTMax) {
            //bone origin
            path = "Cholestatic Pattern &#8594 GGT not elevated";
            patient[0].signs[0][20] =
              "ALP elevation is not likely of Hepatic origin";
            patient[0].signs[1][20] = path;
            let resultArray = testEngine(13);
            try {
              signMaker(
                listMaker(
                  arrayDuplicateRemover(
                    [...resultArray[0]].map((x) => x.value)
                  ),
                  "High Bone Turnover"
                ),
                resultArray[1], //path
                21,
                "darkslategray"
              );
            } catch {
              patient[0].signs[0][21] = undefined;
              patient[0].signs[1][21] = undefined;
            }
            return true;
          }
        }
        path = "Cholestatic Pattern &#8594 GGT not Entered";
            patient[0].signs[0][20] =
              "ALP elevation can be of Bone and Hepatic origin";
            patient[0].signs[1][20] = path;
        cholestaticPattern();
      }
      cholestaticPattern();
    }
  } else if (ASTEntered == 0 && ALTEntered == 0 && ALPEntered == 0) {
    if (BilTEntered == 0 || BilDEntered == 0) {
      return 0;
    }
    if (BilT > BilTMax) {
      //isolated Hyperbilirubinemia
      if (isDirectHyperbilirubinemia(BilT, BilD)) {
        patient[0].signs[3][22] = 1;
      } else {
        patient[0].signs[3][22] = 0;
      }
      let resultArray = testEngine(7);
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
            "Hyperbilirubinemia"
          ),
          resultArray[1], //path
          23,
          "darkslategray"
        );
      } catch {
        patient[0].signs[0][23] = undefined;
        patient[0].signs[1][23] = undefined;
      }
    } else {
      patient[0].signs[0][23] = undefined;
      patient[0].signs[1][23] = undefined;
    }
  } else {
    patient[0].signs[0][20] = "Liver tests not conclusive";
    patient[0].signs[1][20] = "AST and/or ALT and/or ALP not entered";
  }
}

function lftPattern(AST, ASTMax, ALT, ALTMax, ALP, ALPMax) {
  let altCoef = ALT / ALTMax;
  let alpCoef = ALP / ALPMax;
  let rValue = altCoef / alpCoef;
  let pattern = "";
  let path = "(ALT &#247 ALT ULN) &#247 (ALP &#247 ALP ULN) ";
  if (AST > ASTMax || ALT > ALTMax || ALP > ALPMax) {
    if (rValue >= 5) {
      path += "&ge; 5";
      pattern = "Hepato-cellular pattern";
    } else if (rValue <= 2) {
      path += "&le; 2";
      pattern = "Cholestatic pattern";
    } else {
      path = "2 < " + path + " < 5 and is " + rValue.toFixed(1);
      pattern = "Mixed pattern";
    }
  } else {
    path = "no elevation";
    pattern = "no pattern";
  }
  return [pattern, path];
}
function cholestaticPattern() {
  let resultArray = testEngine(12);
  try {
    signMaker(
      listMaker(
        arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
        "Cholestatic Liver Injury"
      ),
      resultArray[1], //path
      21,
      "darkslategray"
    );
  } catch {
    patient[0].signs[0][21] = undefined;
    patient[0].signs[1][21] = undefined;
  }
}
function mixedPattern() {
  let resultArray = testEngine(11);
  try {
    signMaker(
      listMaker(
        arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
        "Mixed Pattern Liver Injury"
      ),
      resultArray[1], //path
      21,
      "darkslategray"
    );
  } catch {
    patient[0].signs[0][21] = undefined;
    patient[0].signs[1][21] = undefined;
  }
}
function hepatocellularPattern(astCoef, altCoef, deRitisRatio, LDH, path) {
  if (altCoef > 50 || astCoef > 50) {
    path += " &#8594 rise more than 50 times the ULN";
    if (LDH > labItems[80].max) {
      path += " and LDH is elevated too";
    }
    patient[0].signs[0][20] = "Ischemic hepatitis";
    patient[0].signs[1][20] = path;
  } else if (altCoef > 25 || astCoef > 25) {
    path += " &#8594 rise more than 25 times the ULN";
    //virals can be checked here
    let prefix = "";
    if (deRitisRatio > 2) {
      prefix = "Fulminant ";
      path += " &#8594 De Ritis ratio is more than 2";
    } else if (deRitisRatio < 1) {
      prefix = "Resolving ";
      path += " &#8594 De Ritis ratio is less than 1";
    }
    patient[0].signs[0][20] = prefix + "Acute viral or toxin-related hepatits";
    patient[0].signs[1][20] = path;
  } else if (astCoef > 15 || altCoef > 15) {
    //marked elevation
    path += " &#8594 Marked Transaminase elevation";
    patient[0].signs[0][20] = "Acute Liver Injury";
    patient[0].signs[1][20] = path;
    let resultArray = testEngine(9);
    try {
      signMaker(
        listMaker(
          arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
          "Acute Liver Injury"
        ),
        resultArray[1], //path
        21,
        "darkslategray"
      );
    } catch {
      patient[0].signs[0][21] = undefined;
      patient[0].signs[1][21] = undefined;
    }
    return true;
  } else {
    path += " &#8594 Mild to Moderate Transaminase elevation";
    patient[0].signs[0][20] = "Hepatocellular Disease";
    patient[0].signs[1][20] = path;
    let resultArray = testEngine(10);
    try {
      signMaker(
        listMaker(
          arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
          "Hepatocellular Disease"
        ),
        resultArray[1], //path
        21,
        "darkslategray"
      );
    } catch {
      patient[0].signs[0][21] = undefined;
      patient[0].signs[1][21] = undefined;
    }
    return true;
  }
}

function isDirectHyperbilirubinemia(BilT, BilD) {
  return BilD / BilT > 0.15;
}

function ptToINR(isINRChanged) {
  let PT = Number(labItems[107].value);
  let INR = Number(labItems[108].value);
  let PTc = Number(labItems[110].value);
  let PTEntered = labItems[107].entered;
  let INREntered = labItems[108].entered;
  let PTcEntered = labItems[110].entered;
  if (PTcEntered == 1) {
    if (isINRChanged == 0 && PTEntered == 1) {
      INR = (PT / PTc).toFixed(1);
      document.getElementById("in_INR").value = INR;
      labItems[108].value = INR;
      labItems[108].entered = 1;
    }
    if (isINRChanged == 1 && INREntered == 1) {
      PT = (INR * PTc).toFixed(1);
      document.getElementById("in_PT").value = PT;
      labItems[107].value = PT;
      labItems[107].entered = PT;
    }
  }
}
function viralMain() {
  let HbSAg = Number(labItems[111].value);
  let HbSAb = Number(labItems[112].value);
  let HAVAb = Number(labItems[113].value);
  let HBcAb = Number(labItems[114].value);
  let HCVAb = Number(labItems[115].value);
  let HBeAg = Number(labItems[116].value);
  let HBeAb = Number(labItems[117].value);
  let HbSAgMax = Number(labItems[111].max);
  let HbSAbMax = Number(labItems[112].max);
  let HAVAbMax = Number(labItems[113].max);
  let HBcAbMax = Number(labItems[114].max);
  let HCVAbMax = Number(labItems[115].max);
  let HBeAgMax = Number(labItems[116].max);
  let HBeAbMax = Number(labItems[117].max);
  let HbSAgMin = Number(labItems[111].min);
  let HbSAbMin = Number(labItems[112].min);
  let HAVAbMin = Number(labItems[113].min);
  let HBcAbMin = Number(labItems[114].min);
  let HCVAbMin = Number(labItems[115].min);
  let HBeAgMin = Number(labItems[116].min);
  let HBeAbMin = Number(labItems[117].min);
  let HbSAgEntered = labItems[111].entered;
  let HbSAbEntered = labItems[112].entered;
  let HAVAbEntered = labItems[113].entered;
  let HBcAbEntered = labItems[114].entered;
  let HCVAbEntered = labItems[115].entered;
  let HBeAgEntered = labItems[116].entered;
  let HBeAbEntered = labItems[117].entered;

  patient[0].signs[0][200] = undefined; //HAV
  patient[0].signs[1][200] = undefined;
  patient[0].signs[2][200] = "darkslategray";
  patient[0].signs[0][201] = undefined; //HBV
  patient[0].signs[1][201] = undefined;
  patient[0].signs[2][201] = "darkslategray";
  patient[0].signs[0][202] = undefined; //HCV
  patient[0].signs[1][202] = undefined;
  patient[0].signs[2][202] = "darkslategray";

  if (HAVAbEntered == 1) {
    if (HAVAb > HAVAbMax) {
      patient[0].signs[0][200] = "Acute Hepatitis A";
      patient[0].signs[1][200] = "HAV Ab IgM > " + HAVAbMax;
    } else if (HAVAb < HAVAbMin) {
      patient[0].signs[0][200] = "Negative for Hepatitis A";
      patient[0].signs[1][200] = "HAV Ab IgM < " + HAVAbMin;
    } else {
      patient[0].signs[0][200] = "HAV Ab IgM must be repeated";
      patient[0].signs[1][200] = HAVAbMin + " < HAV Ab IgM < " + HAVAbMax;
    }
  }
  if (HbSAgEntered == 1) {
    let resultArray = testEngine(8);
    try {
      signMaker(
        listMaker(
          arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
          "Hepatitis B Markers"
        ),
        resultArray[1], //path
        201,
        "darkslategray"
      );
    } catch {
      patient[0].signs[0][201] = undefined;
      patient[0].signs[1][201] = undefined;
    }
  } else {
    patient[0].signs[0][201] = undefined;
    patient[0].signs[1][201] = undefined;
  }

  if (HCVAbEntered == 1) {
    if (HCVAb > HCVAbMax) {
      patient[0].signs[0][202] = "Acute Hepatitis C";
      patient[0].signs[1][202] = "HCV Ab > " + HCVAbMax;
    } else if (HCVAb < HCVAbMin) {
      patient[0].signs[0][202] = "Negative for Hepatitis C";
      patient[0].signs[1][202] = "HCV Ab < " + HCVAbMin;
    } else {
      patient[0].signs[0][202] = "HCV Ab must be repeated";
      patient[0].signs[1][202] = HCVAbMin + " < HCV Ab < " + HCVAbMax;
    }
  }
}
