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
      case "in_MCH":
      case "in_Hct":
      case "in_MCHC":
        break;
      case "in_AST":
      case "in_ALT":
      case "in_ALP":
      case "in_Bil(T)":
      case "in_Bil(D)":
        break;
      case "in_Iron":
      case "in_TIBC":
      case "in_Ferritin":
        // iron_profile();
        testEngine(0);
        break;
      case "in_pH":
      case "in_HCO3":
      case "in_PCO2":
        break;
      case "in_Na":
      case "in_Cl":
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
  let labData = JSON.stringify(labItems);
      if (labData != "" && labData != null) {
        setCookie("labData", labData, 365);
        console.log("set");
      }
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
      currentLabItem.status = timesMax + " &times; Maximum";
    } catch {}
  } else if (value < currentLabItem.min) {
    let timesMin = value / currentLabItem.min;
    if (timesMin <= 0.01) {
      currentLabItem.status = "<0.01 &times; Minimum";
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

function abgMain() {
  let ph = labItems[87].value;
  let hco3 = labItems[88].value;
  let paco2 = labItems[89].value;
  let anionGap = measurements[16].value;
  let anionGapAvailable = measurements[16].used;
  let abgColor = "rgb(3, 82, 156)";
  let path = "";
  let deltaGap = 0,
    deltaRatio = 0;
  if (anionGapAvailable) {
    deltaGap = measurements[19].value;
    deltaRatio = measurements[20].value;
  }
  delete patient[0].signs[0][60];
  delete patient[0].signs[1][60];
  patient[0].signs[2][60] = abgColor;
  if (hco3 == 0 && paco2 == 0 && ph != 0) {
    if (ph > 7.45) {
      path += "pH > 7.45";
      patient[0].signs[0][60] = "Alkalosis";
      patient[0].signs[1][60] = path;
    } else if (ph < 7.35) {
      path += "pH < 7.35";
      patient[0].signs[0][60] = "Acidosis";
      patient[0].signs[1][60] = path;
    }
  } else if (hco3 != 0 && paco2 != 0 && ph != 0) {
    //all three entered
    if (ph <= 7.4) {
      //simple acidosis
      path += "pH &le; 7.4 &#8594 ";
      if (
        hco3 < 25 &&
        (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable))
      ) {
        //normal anion gap or no anion gap entered
        path += "HCO3 < 25 &#8594 ";
        if (paco2 > 45 && hco3 > 22) {
          //respiratory acidosis
          path += "PaCO2 > 45";
          patient[0].signs[0][60] = "Respiratory Acidosis";
          patient[0].signs[1][60] = path;
          return 0;
        }
        let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
        let predictedPaco2High = hco3 * 1.5 + 8 + 2;
        if (paco2 > predictedPaco2High) {
          // met acid + res acid
          path +=
            "PaCO2 > " + predictedPaco2High + " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] = "Metabolic Acidosis + Respiratory Acidosis";
          patient[0].signs[1][60] = path;
          return 0;
        } else if (paco2 < predictedPaco2Low) {
          path +=
            "PaCO2 < " + predictedPaco2Low + " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] =
            "Metabolic Acidosis + Respiratory Alkalosis";
          patient[0].signs[1][60] = path;
          return 0;
        } else {
          path +=
            "PaCO2 in " +
            predictedPaco2Low +
            "-" +
            predictedPaco2High +
            " (Winter's predicted PaCO2 Range)";
          if (!anionGapAvailable) {
            patient[0].signs[0][60] = "Metabolic Acidosis";
          } else {
            patient[0].signs[0][60] = "Metabolic Acidosis with normal AG";
          }
          patient[0].signs[1][60] = path;
          return 0;
        }
      } else if (hco3 < 25 && anionGapAvailable && anionGap > 12) {
        // metabolic and high anion gap
        path += "HCO3 < 25 &#8594 ";
        if (paco2 > 45 && hco3 > 22) {
          //respiratory acidosis
          path += "PaCO2 > 45";
          patient[0].signs[0][60] =
            "Respiratory Acidosis (high anion gap non-compatible)";
          patient[0].signs[1][60] = path;
          return 0;
        }
        let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
        let predictedPaco2High = hco3 * 1.5 + 8 + 2;
        if (paco2 > predictedPaco2High) {
          // met acid + res acid
          path +=
            "PaCO2 > " + predictedPaco2High + " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] =
            "Metabolic Acidosis (high AG) + Respiratory Acidosis";
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
          patient[0].signs[1][60] = path;
          return 0;
        } else if (paco2 < predictedPaco2Low) {
          path +=
            "PaCO2 < " + predictedPaco2Low + " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] =
            "Metabolic Acidosis (high AG) + Respiratory Alkalosis";
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
          patient[0].signs[1][60] = path;
          return 0;
        } else {
          path +=
            "PaCO2 in " +
            predictedPaco2Low +
            "-" +
            predictedPaco2High +
            " (Winter's predicted PaCO2 Range)";
          patient[0].signs[0][60] = "Metabolic Acidosis with High AG";
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
          patient[0].signs[1][60] = path;
          return 0;
        }
      }
    }
    if (ph >= 7.4) {
      path = "pH &ge; 7.4 &#8594 ";
      if (hco3 > 25) {
        path += "HCO3 > 25 &#8594 ";
        //met alkalosis
        if (paco2 < 35 && hco3 < 28) {
          //respiratory alkalosis
          path += "PaCO2 < 35";
          patient[0].signs[0][60] = "Respiratory Alkalosis";
          patient[0].signs[1][60] = path;
          return 0;
        }
        let predictedPaco2Low = hco3 * 0.7 + 20 - 5;
        let predictedPaco2High = hco3 * 0.7 + 20 + 5;
        if (paco2 > predictedPaco2High) {
          // met alkalosis + res acid
          path += "PaCO2 > " + predictedPaco2High + " (predicted PaCO2)";
          patient[0].signs[0][60] =
            "Metabolic Alkalosis + Respiratory Acidosis";
          patient[0].signs[1][60] = path;
          return 0;
        } else if (paco2 < predictedPaco2Low) {
          path += "PaCO2 < " + predictedPaco2Low + " (predicted PaCO2)";
          patient[0].signs[0][60] =
            "Metabolic Alkalosis + Respiratory Alkalosis";
          patient[0].signs[1][60] = path;
          return 0;
        } else {
          path +=
            "PaCO2 in " +
            predictedPaco2Low +
            "-" +
            predictedPaco2High +
            " (predicted PaCO2 Range)";
          patient[0].signs[0][60] = "Metabolic Alkalosis";
          patient[0].signs[1][60] = path;
          return 0;
        }
      }
    }
    if (ph >= 7.35 && ph <= 7.45 && hco3 >= 22 && hco3 <= 28) {
      path = "";
      //ph,paco2,hco3 in normal range but high anion gap
      let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
      let predictedPaco2High = hco3 * 1.5 + 8 + 2;
      if (
        paco2 >= predictedPaco2Low &&
        paco2 <= predictedPaco2High &&
        anionGapAvailable &&
        anionGap > 12
      ) {
        //mixed
        if (deltaGap > 6) {
          path +=
            "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Gap > 6 and &Delta;Ratio > 1";
          patient[0].signs[0][60] =
            "Metabolic Acidosis with High AG + Metabolic Alkalosis (based on both &Delta;Gap and &Delta;Ratio)";
          patient[0].signs[1][60] = path;
        } else if (deltaRatio > 1) {
          path +=
            "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Ratio > 1";
          patient[0].signs[0][60] =
            "Metabolic Acidosis with High AG + Metabolic Alkalosis (based on &Delta;Ratio only)";
          patient[0].signs[1][60] = path;
        } else if (deltaGap < -6) {
          path +=
            "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Gap < -6 and &Delta;Ratio < 1";
          patient[0].signs[0][60] =
            "Metabolic Acidosis with High AG + Metabolic Acidosis with normal AG (based on both &Delta;Gap and &Delta;Ratio)";
          patient[0].signs[1][60] = path;
        } else if (deltaRatio < 1) {
          path +=
            "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Ratio < 1";
          patient[0].signs[0][60] =
            "Metabolic Acidosis with High AG + Metabolic Acidosis with normal AG (based on &Delta;Ratio only)";
          patient[0].signs[1][60] = path;
        }
      } else if (
        paco2 >= predictedPaco2Low &&
        paco2 <= predictedPaco2High &&
        (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
      ) {
        path += "pH, PaCO2, HCO3, and AG are normal";
        patient[0].signs[0][60] = "normal ABG";
        patient[0].signs[1][60] = path;
      } else if (
        paco2 > predictedPaco2High &&
        (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
      ) {
        path +=
          "pH, HCO3, and AG are normal but PaCO2 > " +
          predictedPaco2High +
          " (Winter's predicted PaCO2)";
        patient[0].signs[0][60] = "PaCO2 is higher than predicted value ";
        patient[0].signs[1][60] = path;
      } else if (
        paco2 < predictedPaco2Low &&
        (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
      ) {
        path +=
          "pH, HCO3, and AG are normal but PaCO2 < " +
          predictedPaco2Low +
          " (Winter's predicted PaCO2)";
        patient[0].signs[0][60] = "PaCO2 is lower than predicted value ";
        patient[0].signs[1][60] = path;
      } else {
        path += "pH, PaCO2, HCO3, and AG are not compatible";
        patient[0].signs[0][60] = "non-compatible ABG";
        patient[0].signs[1][60] = path;
      }
    }
  }
}

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
  if (Hb <= 0) {
    return false;
  }
  if (Hb < HbMin) {
    return true;
  } else {
    return false;
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
  if (wbc < wbcMin && labItems[0].entered == 1) peniaCount++;
  if (hb < hbMin && labItems[2].entered == 1) peniaCount++;
  if (plt < pltMin && labItems[7].entered == 1) peniaCount++;
  if (peniaCount > 1) {
    patient[0].signs[0][1] = "Pancytopenia";
    patient[0].signs[1][1] = "two or more lineages are low";
    patient[0].signs[2][1] = "darkslateblue";
    patient[0].signs[3][1] = 1;
    return true;
  } else {
    delete patient[0].signs[0][1];
    delete patient[0].signs[1][1];
    delete patient[0].signs[2][1];
    patient[0].signs[3][1] = 0;
    return false;
  }
}
function anemiaType() {
  let RBC = labItems[1].value; 
  let Hb = labItems[2].value;
  let MCV = labItems[3].value;
  let Hct = labItems[4].value;
  let MCH = labItems[5].value;
  let RDW = labItems[8].value;
  let retic = labItems[11].value;
  let cbc_color = "darkslateblue";
  delete patient[0].signs[0][2];
  delete patient[0].signs[1][2];
  delete patient[0].signs[2][2];

  //anemia algorithm based on RPI and MCV
  let path = "";
  conditionMaker(0);
  if (Hb <= 0) {
    //we need to check this in the function calling this function -
    return 0; //no need to access  //and if there is no hb entered unlike mcv, check for macrocytosis
  }
  if (Hb >= labItems[2].min) {
    path += "Hb > " + labItems[2].min;
    patient[0].signs[0][2] = "no anemia";
    patient[0].signs[1][2] = path;
    patient[0].signs[2][2] = cbc_color;
    return false; //no anemia
  }

  if (Hct > 0 && retic > 0) {
    measurementsCalc(); // to access RPI
  } else {
    // we dont have rpi
  }
  if (MCV > 0) {
    path += "Hb < " + labItems[2].min + " &#8594 ";
    // we have mcv and we approach
    if (genderCoef == 0 || pregnancySituation == 0) {
      //this approach only for non-pregnants
      if (MCV < labItems[3].min) {
        //microcytic anemia
        path += " MCV < " + labItems[3].min;
        patient[0].signs[0][2] = "Microcytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
        //now we have to check Iron profile , RDW , RBC count , MCH , if we have PBS
      } else if (MCV < labItems[3].max) {
        //normocytic anemia
        path += labItems[3].min + " < MCV < " + labItems[3].max;
        patient[0].signs[0][2] = "Normocytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
      } else {
        //macrocytic anemia
        path += " MCV > " + labItems[3].max;
        patient[0].signs[0][2] = "Macrocytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
      }
    }
  } else {
    // we dont have mcv
    path += "Hb < " + labItems[2].min + " and no MCV entered";
    patient[0].signs[0][2] = "Anemia";
    patient[0].signs[1][2] = path;
    patient[0].signs[2][2] = cbc_color;
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

function lftEngine() {
  let liverPanel = [];
  liverPanel[0] = labItems[14].value;
  liverPanel[1] = labItems[14].max;
  liverPanel[2] = labItems[15].value;
  liverPanel[3] = labItems[15].max;
  liverPanel[4] = labItems[16].value;
  liverPanel[5] = labItems[16].max;
  liverPanel[6] = labItems[17].value;
  liverPanel[7] = labItems[17].max;
  liverPanel[8] = labItems[18].value;
  let p_ldh = labItems[80].value;
  let astCoef = liverPanel[0] / liverPanel[1];
  let altCoef = liverPanel[2] / liverPanel[3];
  let alpCoef = liverPanel[4] / liverPanel[5];
  let biltCoef = liverPanel[6] / liverPanel[7];
  let deRitisRatio = measurements[9].value;
  let path = "";
  delete patient[0].signs[0][20];
  delete patient[0].signs[1][20];
  delete patient[0].signs[2][20];
  delete patient[0].signs[0][21];
  delete patient[0].signs[1][21];
  delete patient[0].signs[2][21];
  patternReturnArray = lftPattern(liverPanel);
  if (liverPanel[0] != "" && liverPanel[2] != "" && liverPanel[4] != "") {
    if (astCoef / altCoef > 5 || astCoef / altCoef < 0.2) {
      patient[0].signs[0][20] = "Liver tests not conclusive";
      patient[0].signs[1][20] = "AST and ALT are not compatible with eachother";
      patient[0].signs[2][20] = "darkslategray";
    }
    patient[0].signs[0][21] = patternReturnArray[0];
    patient[0].signs[1][21] = patternReturnArray[1];
    patient[0].signs[2][21] = "darkslategray";

    if (patternReturnArray[0] != "Cholestatic pattern") {
      if (patternReturnArray[0] == "Mixed pattern") {
        path += "Mixed pattern";
      } else {
        path += "Hepato-cellular pattern";
      }
      if (altCoef > 50 || astCoef > 50) {
        path += " &#8594 rise more than 50 times the ULN";
        if (p_ldh > labItems[80].max) {
          path += " and LDH is elevated too";
        }
        patient[0].signs[0][20] = "Ischemic hepatitis";
        patient[0].signs[1][20] = path;
        patient[0].signs[2][20] = "darkslategray";
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
        patient[0].signs[0][20] =
          prefix + "Acute viral or toxin-related hepatits";
        patient[0].signs[1][20] = path;
        patient[0].signs[2][20] = "darkslategray";
      } else if (altCoef > 5 && astCoef > 8) {
        path +=
          " &#8594 AST and ALT rise more than 8 and 5 times the ULN respectively";
        patient[0].signs[0][20] = "Alcoholic fatty liver disease is unlikely";
        patient[0].signs[1][20] = path;
        patient[0].signs[2][20] = "darkslategray";
      } else if (altCoef > 4 && astCoef > 4) {
        path += " &#8594 AST and ALT rise more than 4 times the ULN";
        //ast to alt is complicated here and needs another function
        patient[0].signs[0][20] =
          "Non-alcoholic fatty liver disease is unlikely";
        patient[0].signs[1][20] = path;
        patient[0].signs[2][20] = "darkslategray";
      } else {
        path +=
          " &#8594 AST and ALT rise is " +
          astCoef.toFixed(1) +
          " and " +
          altCoef.toFixed(1) +
          " times the ULN respectively";
        patient[0].signs[0][20] = "Fatty liver disease | chronic Hepatitis";
        patient[0].signs[1][20] = path;
        patient[0].signs[2][20] = "darkslategray";
      }
    }
  } else if (
    liverPanel[0] == "" &&
    liverPanel[2] == "" &&
    liverPanel[4] == ""
  ) {
    return 0;
  } else {
    patient[0].signs[0][20] = "Liver tests not conclusive";
    patient[0].signs[1][20] = "AST and/or ALT and/or ALP not entered";
    patient[0].signs[2][20] = "darkslategray";
  }
}

function lftPattern(liverPanel) {
  let astCoef = liverPanel[0] / liverPanel[1];
  let altCoef = liverPanel[2] / liverPanel[3];
  let alpCoef = liverPanel[4] / liverPanel[5];
  let biltCoef = liverPanel[6] / liverPanel[7];
  let r_value = altCoef / alpCoef;
  let pattern = "";
  let path = "(ALT &#247 ALT ULN) &#247 (ALP &#247 ALP ULN) ";
  if (
    liverPanel[0] > liverPanel[1] ||
    liverPanel[2] > liverPanel[3] ||
    liverPanel[4] > liverPanel[5]
  ) {
    if (r_value >= 5) {
      path += "&ge; 5";
      pattern = "Hepato-cellular pattern";
    } else if (r_value <= 2) {
      path += "&le; 2";
      pattern = "Cholestatic pattern";
    } else {
      path = "2 < " + path + " < 5";
      pattern = "Mixed pattern";
    }
  } else {
    path = "no elevation";
    pattern = "no pattern";
  }
  return [pattern, path];
}

function sodiumMain() {
  let na = measurements[25].value;
  let naMin = Number(labItems[32].min);
  let naMax = Number(labItems[32].max);
  let enteredStatus = labItems[32].entered;
  if (enteredStatus == 1) {
    console.log("na entered");
    return na , naMin;
  }
}

function isHyponatremia() {
  patient[0].signs[3][45] = 0;
  let na = measurements[25].value;
  let naMin = Number(labItems[32].min);
  let enteredStatus = labItems[32].entered;
  if (enteredStatus == 1) {
    conditionMaker(1);
    if (na < naMin) {
      return true;
    } else {
      return false;
    }
  } else return false;
  
}

function serumOsmolarity() {
  let plasmaOsm = Number(labItems[85].value);
  let plasmaOsmEntered = labItems[85].entered;
  let urineOsm = Number(labItems[86].value);
  let urineOsmEntered = labItems[86].entered;
  patient[0].signs[4][41] = "Plasma Osmolarity";
  patient[0].signs[4][43] = "Urine Osmolarity";
  if (plasmaOsmEntered != 1) {
    plasmaOsm = 285;
  }
  if (urineOsmEntered != 1) {
    patient[0].signs[3][43] = undefined;
  }
  if (plasmaOsm< 280) {
    patient[0].signs[3][41] = 1;
  } else {
    patient[0].signs[3][41] = 0;
  }
  if (urineOsm < 100) {
    patient[0].signs[3][43] = 1;
  } else {
    patient[0].signs[3][43] = 0;
  }
  if (urineOsmEntered != 1) {
    patient[0].signs[3][43] = undefined;
  }
}

function severeHypothyroidism() {
  let TSH = Number(labItems[21].value);
  let TSHEntered = labItems[21].entered;
  patient[0].signs[4][30] = "TSH";
  if (TSH > 10) {
    patient[0].signs[3][30] = 1;
  } else {
    patient[0].signs[3][30] = 0;
  }
  if (TSHEntered == 0) {
    patient[0].signs[3][30] = undefined;
  }
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
  abgMain();
  wbcCount();
  folateAndB12();
  isPancytopenia();
  // sodiumMain();
  // iron_profile();
  if (isAnemia()) {
    let resultArray = testEngine(0);
    try {
      signMaker(
        listMaker([...resultArray[0]].map((x) => x.value), "Anemia"),
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
  if (isHyponatremia()) {
    let resultArray = testEngine(1);
    try {
      signMaker(
        listMaker([...resultArray[0]].map((x) => x.value), "Hyponatremia"),
        resultArray[1], //path
        44,
        "rgb(128, 70, 32)"
      );
    } catch {
      delete patient[0].signs[0][44];
      delete patient[0].signs[1][44];
      delete patient[0].signs[2][44];
    }
  } else {
    delete patient[0].signs[0][44];
    delete patient[0].signs[1][44];
    delete patient[0].signs[2][44];
  }
}

function listMaker(array,condition) {
  if (array[0] == undefined) {
    return [undefined, ""];
  }
  let mainString = "Possible explanations for "+ condition+" <br><ul>";
  for (let i = 0; i < array.length; i++) {
    mainString += "<li>" + array[i] + "</li>";
  }
  mainString += "</ul>";
  return mainString;
}

function signMaker(listHTML, path, signID , color) {
  patient[0].signs[0][signID] = listHTML;
  patient[0].signs[1][signID] = path;
  patient[0].signs[2][signID] = color;
}
