function whenAnInputChanges() {
  let value = Number(this.value);
  let enteredStatus = true;
  if (this.value === "") {
    enteredStatus = false;
  }
  let id = this.id;
  if (enteredStatus) {
    switch (id) {
      case "in_WBC":
      case "in_Neu":
      case "in_Lym":
      case "in_Mono":
      case "in_Eos":
      case "in_Bas":
        checkIfWBCDiffsAreLessThanHundred();
        break;
      case "in_RBC":
      case "in_Hb":
      case "in_MCV":
        cbcAutoComplete();
        break;
      case "in_PT":
        ptToINR(0);
        break;
      case "in_INR":
        ptToINR(1);
        break;
      case "in_PT-control":
        ptToINR(0);
        break;

      default:
    }
  }

  checkRanges(value, id, enteredStatus);
}

function minIsNotBiggerThanMax(x, id) {
  try {
    if (id == "in_Bil(D)") {
      var bilt_val = Number(labItems[17].value);
      if (x > bilt_val && bilt_val != 0) {
        x = bilt_val;
        document.getElementById("in_Bil(D)").value = x;
      }
    } else if (id == "in_Bil(T)") {
      var bild_val = Number(labItems[18].value);
      if (x < bild_val) {
        document.getElementById("in_Bil(D)").value = x;
      }
    } else {
    }
  } catch {}
}

function checkRanges(value, id, enteredStatus) {
  // let labData = JSON.stringify(labItems);
  // if (labData != "" && labData != null) {
  //   writeData(labData);
  // }
  var currentLabItem = labItems.find((o) => o.input_id === id.toString());
  minIsNotBiggerThanMax(value, id);
  if (!enteredStatus) {
    try {
      document.getElementById(currentLabItem.output_id).innerHTML = "";
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "none";
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "none";
    } catch {}
    currentLabItem.status = 0;
    currentLabItem.value = 0;
    currentLabItem.entered = 0;
    return 0;
  } else {
    currentLabItem.entered = 1;
  }
  let decimalPoint = 0;
  let percentile = percentileFinder(
    value,
    currentLabItem.min,
    currentLabItem.max
  );
  if (percentile >= 1) {
    decimalPoint = 0;
  } else {
    let decimalValue = Math.ceil(-1 * Math.log10(percentile));
    if (decimalValue < 3) {
      decimalPoint = decimalValue;
    } else {
      decimalPoint = 2;
    }
  }
  percentile = percentile.toFixed(decimalPoint);
  if (enteredStatus) {
    currentLabItem.status = "%ile = " + percentile.toString();
  }
  if (value > currentLabItem.max && currentLabItem.max != 0) {
    let timesMax = (value / currentLabItem.max).toFixed(1);
    try {
      document.getElementById(currentLabItem.output_id + "_img").src = highIcon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
      if (timesMax > 500) {
        currentLabItem.status = " > 500 &times; Maximum";
      } else {
        currentLabItem.status = timesMax + " &times; Maximum";
      }
    } catch {}
  } else if (value < currentLabItem.min) {
    let timesMin = value / currentLabItem.min;
    if (timesMin < 0.01) {
      currentLabItem.status = " < 0.01 &times; Minimum";
    } else {
      currentLabItem.status = timesMin.toFixed(2) + " &times; Minimum";
    }
    try {
      document.getElementById(currentLabItem.output_id + "_img").src = lowIcon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
    } catch {}
  } else {
    try {
      document.getElementById(currentLabItem.output_id + "_img").src =
        normalIcon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
    } catch {}
  }
  try {
    if (value > currentLabItem.critmax && currentLabItem.critmax != 0) {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "flex";
    } else if (value < currentLabItem.critmin && currentLabItem.entered != 0) {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "flex";
    } else {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "none";
    }
  } catch {}
  currentLabItem.value = value;
  try {
    document.getElementById(currentLabItem.output_id).innerHTML =
      currentLabItem.status;
  } catch {}
}
function cbcAutoComplete() {
  try {
    var p_rbc = Number(document.getElementById("in_RBC").value); //p = patient's
  } catch {
    var p_rbc = labItems[1].value;
  }
  try {
    var p_hb = Number(document.getElementById("in_Hb").value);
  } catch {
    var p_hb = labItems[2].value;
  }
  try {
    var p_mcv = Number(document.getElementById("in_MCV").value);
  } catch {
    var p_mcv = labItems[3].value;
  }
  var c_hct, c_mch, c_mchc, mcv_isnotzero;
  if (p_rbc == 0) return 0;
  if (p_mcv != 0) {
    mcv_isnotzero = true;
    c_hct = (p_rbc * p_mcv) / 10;
    c_hct = c_hct.toFixed(1);
    labItems[4].value = c_hct;
    try {
      document.getElementById("in_Hct").value = c_hct;
    } catch {}
    checkRanges(c_hct, "in_Hct", true);
  } else {
    mcv_isnotzero = false;
  }
  if (p_hb != 0) {
    c_mch = (p_hb * 10) / p_rbc;
    c_mch = c_mch.toFixed(1);
    labItems[5].value = c_mch;
    try {
      document.getElementById("in_MCH").value = c_mch;
    } catch {}
    checkRanges(c_mch, "in_MCH", true);
    if (mcv_isnotzero) {
      c_mchc = (p_hb * 100) / c_hct;
      c_mchc = c_mchc.toFixed(1);
      labItems[6].value = c_mchc;
      try {
        document.getElementById("in_MCHC").value = c_mchc;
      } catch {}
      checkRanges(c_mchc, "in_MCHC", true);
    }
  }
}

function wbcCount() {
  let wbcTotalVal = labItems[0].value;
  let wbcMaxVal = labItems[0].max;
  let wbcMinVal = labItems[0].min;
  let path = "";
  let cbcColor = "darkslateblue";
  delete patient[0].signs[0][0];
  delete patient[0].signs[1][0];
  delete patient[0].signs[2][0];
  if (labItems[0].entered == 0) return 0;
  if (wbcTotalVal > wbcMaxVal) {
    path += "WBC > " + wbcMaxVal;
    patient[0].signs[0][0] = "Leukocytosis";
    patient[0].signs[1][0] = path;
    patient[0].signs[2][0] = cbcColor;
  } else if (wbcTotalVal < wbcMinVal) {
    path += "WBC < " + wbcMinVal;
    patient[0].signs[0][0] = "Leukopenia";
    patient[0].signs[1][0] = path;
    patient[0].signs[2][0] = cbcColor;
  }
}
function abgDeltaCalc(deltaGap, deltaRatio, path) {
  if (deltaGap > 6) {
    path += " &#8594 &Delta;Gap > 6 and &Delta;Ratio > 1";
    patient[0].signs[0][60] +=
      " + Metabolic Alkalosis (based on both &Delta;Gap and &Delta;Ratio)";
  } else if (deltaRatio > 1) {
    path += " &#8594 Delta Ratio > 1";
    patient[0].signs[0][60] +=
      " + Metabolic Alkalosis (based on &Delta;Ratio only)";
  } else if (deltaGap < -6) {
    path += " &#8594 &Delta;Gap < -6 and &Delta;Ratio < 1";
    patient[0].signs[0][60] +=
      " + Metabolic Acidosis (normal AG) (based on both &Delta;Gap and &Delta;Ratio)";
  } else if (deltaRatio < 1) {
    path += " &#8594 &Delta;Ratio < 1";
    patient[0].signs[0][60] +=
      " + Metabolic Acidosis (normal AG) (based on &Delta;Ratio only)";
  }
  return path;
}

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
      delete patient[0].signs[0][30];
      delete patient[0].signs[1][30];
      delete patient[0].signs[2][30];
    }
  } else {
    delete patient[0].signs[0][30];
    delete patient[0].signs[1][30];
    delete patient[0].signs[2][30];
  }
}
function pbsMain() {
  conditionMaker(2);
  conditionMaker(3);
}
function percentileFinder(input, min, max) {
  min = Number(min);
  max = Number(max);
  input = Number(input);
  let mean = (max + min) / 2;
  let standardDeviation = (max - mean) / 2;
  let z_score = (input - mean) / standardDeviation;
  let percentile = 0;
  try {
    percentile = ztable_finder(z_score) * 100;
  } catch {}
  return percentile;
}

function engineMain() {
  //activates when user goes to analyse tab
  measurementsCalc();
  serumOsmolarity();
  severeHypothyroidism();
  anemiaType();
  lftEngine();
  viralMain();
  abgMain();
  wbcCount();
  folateAndB12();
  isPancytopenia();
  sodiumMain();
  potassiumMain();
  thyroidMain();
  dyslipidemia();
  pbsMain();
  // iron_profile();
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
      delete patient[0].signs[0][10];
      delete patient[0].signs[1][10];
      delete patient[0].signs[2][10];
    }
  } else {
    delete patient[0].signs[0][10];
    delete patient[0].signs[1][10];
    delete patient[0].signs[2][10];
  }
}

function listMaker(array, condition) {
  if (array[0] == undefined) {
    return [undefined, ""];
  }
  let mainString = "Possible explanations for " + condition + " <br><ul>";
  for (let i = 0; i < array.length; i++) {
    mainString += "<li>" + array[i] + "</li>";
  }
  mainString += "</ul>";
  return mainString;
}

function signMaker(listHTML, path, signID, color) {
  patient[0].signs[0][signID] = listHTML;
  patient[0].signs[1][signID] = path;
  patient[0].signs[2][signID] = color;
}

function arrayDuplicateRemover(array) {
  let noDuplicateArray = [...new Set(array)];
  return noDuplicateArray;
}
