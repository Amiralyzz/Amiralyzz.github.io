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
  folateAndB12();
  isPancytopenia();
  sodiumMain();
  potassiumMain();
  thyroidMain();
  diabetesMain();
  kidneyMain();
  baseCrAnalysis();
  dyslipidemia();
  pbsMain();
  polycythemiaMain();
  plateletMain();
  wbcMain();
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
