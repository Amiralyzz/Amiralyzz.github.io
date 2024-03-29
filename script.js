var pinnedOrNotArray = [];
var globalAgeYears = 40,
  globalAgeMonths,
  globalWeightGram = 70000,
  globalHeightCm = 170,
  genderCoef = 0; //genderCoef=0 male genderCoef=2 female
var globalTSAT = 0;
var ageGroupsArray = [
  "newborn3",
  "newborn14",
  "newborn30",
  "newborn60",
  "infant6",
  "infant1",
  "infant2",
  "child6",
  "child9",
  "child10",
  "teen12",
  "teen18",
  "adult",
];
var selectedAgeGroupIndex = 12;
var selectedAgeGroup = "adult";
var pregnancyStatus = 0; //0 for not pregnant
var lastPregnancyStatus = 0;
var globalSBP = 120;
var globalDBP = 80;
var globalVolumeStatus = 0; //-1 hypo , +1 hyper , 0 euvolumic
var globalSmokingStatus = 0; //-1 former, +1 smoker, 0 never
var globalDiureticStatus = 0; // 0 no 1 yes
var globalRespiratoryChronicity = 0; //0 acute 1 chronic
var globalHepaticEncephalopathy = 0; //0 no 1 yes
var globalDiabetesHistory = 0; //0 no 1 yes
var globalCKDHistory = 0; //0 no 1 yes
var globalBaseCrEntered = false;
var globalBaseCr = 0;
var global9afludrocortisone = 0; //0 not using 1 using
var selectedTabId = "test_types_cbc";
var selectedLabType = "cbc";
var lowIcon = "/Art/low.png";
var highIcon = "/Art/high.png";
var normalIcon = "/Art/normal.png";

var searchbar_show = "none";

function searchBarSize() {
  var searchbar = document.getElementById("searchbar");
  if (searchbar.value.length > 5) {
    searchbar.style.minWidth = (searchbar.value.length + 1) * 25 + "px";
  } else {
    searchbar.style.minWidth = "100px";
  }
  if (searchbar.style.minWidth > "270px") {
    searchbar.style.minWidth = "270px";
    searchbar.style.maxWidth = "1vw";
  }
}

function changeTableCaller() {
  var id = this.id.slice(0, -1);
  if (id != "test_types_cbc") var type = id.slice(11);
  else type = "hemato";
  tabContent(id, type);
  document.body.removeChild(document.getElementById("burger"));
  document.getElementById("show_tab").style.display = "flex";
}

function close() {
  document.body.removeChild(document.getElementById("burger"));
  document.getElementById("show_tab").style.display = "flex";
}
function burgerMenu() {
  document.getElementById("show_tab").style.display = "none";
  var burger_parent = document.createElement("div");
  burger_parent.className = "burger";
  burger_parent.id = "burger";
  document.body.appendChild(burger_parent);

  var tabs = document.getElementsByClassName("tab");
  for (const tab of tabs) {
    if (
      tab.id != "tab_search" &&
      tab.id != "tab_analyse" &&
      tab.id != "show_tab"
    ) {
      var burger_tab = document.createElement("div");
      burger_tab.className = "burger_tab";
      burger_parent.appendChild(burger_tab);
      burger_tab.id = tab.id + "b";
      burger_tab.innerHTML = tab.innerHTML;
      burger_tab.onclick = changeTableCaller;
      var selected = tab.id;
      document.getElementById(selected).style.display = "none";
    }
  }

  var close_btn = document.createElement("label");
  close_btn.innerHTML = "&times";
  close_btn.className = "close_btn";
  close_btn.onclick = close;
  burger_parent.appendChild(close_btn);
}

function summaryMaker() {
  let genderString = ["Male", "Female"];
  let pregnancyString = ["", "Pregnant ", "Pregnant ", "Pregnant "];
  let ageTextbox = document.getElementById("age");
  let ageUnitSelected = document.getElementById("age_unit");
  let ageNumber = ageTextbox.value;
  let ageUnit = ageUnitSelected.value;
  let ageUnitString = "";
  if (ageUnit == "day") ageUnitString = "day";
  if (ageUnit == "mon") ageUnitString = "month";
  if (ageUnit == "year") ageUnitString = "year";
  let ageString = ageNumber + " " + ageUnitString;
  if (Number(ageNumber) > 1) ageString += "s";
  ageString += " old ";
  let summary =
    ageString + pregnancyString[pregnancyStatus] + genderString[genderCoef / 2];
  document.getElementById("patientSummary").innerHTML = summary;
  patient[0].signs[3][45] = 0;
}

function expandInfo() {
  let more_button = document.getElementById("expand_info");
  let info = document.getElementById("gen_a_w_h");
  if (more_button.innerHTML == "change") {
    more_button.innerHTML = "hide";
    info.style.display = "grid";
    if (window.innerWidth < 800) {
      info.style.gridTemplateColumns = "auto auto";
    } else {
      info.style.gridTemplateColumns = "auto auto auto auto";
    }
  } else {
    info.style.display = "none";
    more_button.innerHTML = "change";
  }
}

function gender() {
  let malelogo = "/Art/male.png";
  let femalelogo = "/Art/female.png";
  let ageTextbox = document.getElementById("age");
  let ageUnitSelected = document.getElementById("age_unit");
  let ageNumber = Number(ageTextbox.value);
  let ageUnit = ageUnitSelected.value;
  if (genderCoef == 0) {
    document.getElementById("gender").value = "female";
    document.getElementById("gen_logo").src = femalelogo;
    document.getElementById("gen_logo").alt = "female";
    genderCoef = 2;
    if (ageNumber > 12 && ageUnit == "year") {
      pregnancyStatus = lastPregnancyStatus;
      document.getElementById("preg").disabled = false;
    }
  } else {
    document.getElementById("preg").disabled = true;
    document.getElementById("gender").value = "male";
    document.getElementById("gen_logo").src = malelogo;
    document.getElementById("gen_logo").alt = "male";
    genderCoef = 0;
    lastPregnancyStatus = pregnancyStatus;
    pregnancyStatus = 0;
  }
  refresh();
}

function pregnancy() {
  let pregnancyVal = document.getElementById("preg").value;
  switch (pregnancyVal) {
    case "notPregnant":
      pregnancyStatus = 0;
      break;
    case "firstTrimester":
      pregnancyStatus = 1;
      break;
    case "secondTrimester":
      pregnancyStatus = 2;
      break;
    case "thirdTrimester":
      pregnancyStatus = 3;
      break;
    default:
  }
  refresh();
}

function ageCalc() {
  let ageTextbox = document.getElementById("age");
  let ageUnitSelected = document.getElementById("age_unit");
  let ageNumber = Number(ageTextbox.value);
  let ageUnit = ageUnitSelected.value;
  if (ageNumber < 0) {
    ageTextbox.value = 0;
    ageNumber = 0;
  }
  if (ageUnit == "day") {
    lastPregnancyStatus = pregnancyStatus;
    pregnancyStatus = 0;
    document.getElementById("preg").disabled = true;
    if (ageNumber > 60) {
      ageTextbox.value = 60;
      ageNumber = 60;
    }
    if (ageNumber <= 3) {
      selectedAgeGroupIndex = 0;
    } else if (ageNumber <= 14) {
      selectedAgeGroupIndex = 1;
    } else if (ageNumber <= 30) {
      selectedAgeGroupIndex = 2;
    } else {
      selectedAgeGroupIndex = 3;
    }
    globalAgeYears = 0;
    globalAgeMonths = Math.floor(ageNumber / 30);
  }
  if (ageUnit == "mon") {
    lastPregnancyStatus = pregnancyStatus;
    pregnancyStatus = 0;
    document.getElementById("preg").disabled = true;
    if (ageNumber < 1) {
      ageTextbox.value = 1;
      ageNumber = 1;
    }
    if (ageNumber >= 36) {
      ageTextbox.value = 36;
      ageNumber = 36;
    }
    if (ageNumber <= 6) {
      selectedAgeGroupIndex = 4;
    } else if (ageNumber <= 12) {
      selectedAgeGroupIndex = 5;
    } else if (ageNumber < 36) {
      selectedAgeGroupIndex = 6;
    } else {
      selectedAgeGroupIndex = 7;
    }
    globalAgeMonths = ageNumber;
    globalAgeYears = Math.floor(ageNumber / 12);
  }
  if (ageUnit == "year") {
    if (ageNumber < 1) {
      ageNumber = 1;
    }
    if (ageNumber > 139) {
      ageTextbox.value = 139;
      ageNumber = 139;
    }
    globalAgeYears = ageNumber;
    if (ageNumber < 12) {
      lastPregnancyStatus = pregnancyStatus;
      pregnancyStatus = 0;
      document.getElementById("preg").disabled = true;
    } else if (genderCoef == 2) {
      document.getElementById("preg").disabled = false;
    }
    if (ageNumber < 2) {
      selectedAgeGroupIndex = 5;
      globalAgeMonths = 12;
    } else if (ageNumber < 3) {
      selectedAgeGroupIndex = 6;
      globalAgeMonths = 24;
    } else if (ageNumber == 3) {
      selectedAgeGroupIndex = 7;
      globalAgeMonths = 36;
    } else if (ageNumber <= 6) {
      selectedAgeGroupIndex = 7;
    } else if (ageNumber <= 9) {
      selectedAgeGroupIndex = 8;
    } else if (ageNumber <= 10) {
      selectedAgeGroupIndex = 9;
    } else if (ageNumber <= 12) {
      selectedAgeGroupIndex = 10;
    } else if (ageNumber <= 18) {
      selectedAgeGroupIndex = 11;
    } else {
      selectedAgeGroupIndex = 12;
    }
    globalAgeYears = ageNumber;
  }
  selectedAgeGroup = ageGroupsArray[selectedAgeGroupIndex];

  //to correct crit min and max for Hb and Hct
  if (
    selectedAgeGroupIndex == 0 ||
    selectedAgeGroupIndex == 1 ||
    selectedAgeGroupIndex == 2
  ) {
    for (let j = 0; j < labItems.length; j++) {
      if (labItems[j]["name"] == "Hb") {
        labItems[j]["critmin"] = 9;
        labItems[j]["critmax"] = 25;
      }
      if (labItems[j]["name"] == "Hct") {
        labItems[j]["critmin"] = 28;
        labItems[j]["critmax"] = 67;
      }
    }
  } else {
    for (let j = 0; j < labItems.length; j++) {
      if (labItems[j]["name"] == "Hb") {
        labItems[j]["critmin"] = 7;
        labItems[j]["critmax"] = 18;
      }
      if (labItems[j]["name"] == "Hct") {
        labItems[j]["critmin"] = 20;
        labItems[j]["critmax"] = 55;
      }
    }
  }
  refresh();
}

function refresh() {
  rangeMaker(selectedAgeGroup);
  for (let j = 0; j < labItems.length; j++) {
    let value = Number(labItems[j].value);
    let id = labItems[j].input_id;
    let enteredStatus = false;
    if (labItems[j].entered == 1) enteredStatus = true;
    checkRanges(value, id, enteredStatus);
  }
  tabContent(selectedTabId, selectedLabType);
  summaryMaker();
}
function rangeMaker(key) {
  patient[0].signs[4][42] = "Diuretic use";
  let pregKey = "";
  if (pregnancyStatus == 1) {
    pregKey = "firstTrim";
  } else if (pregnancyStatus == 2) {
    pregKey = "secondTrim";
  } else if (pregnancyStatus == 3) {
    pregKey = "thirdTrim";
  }
  for (let labItem of labItems) {
    if (
      pregnancyStatus != 0 &&
      labItem["firstTrim"] != "" &&
      labItem["secondTrim"] != "" &&
      labItem["thirdTrim"] != ""
    ) {
      let array = labItem[pregKey].slice(1, -1).split(","); //making key an array like ["1","2"]
      labItem.min = array[0];
      labItem.max = array[1];
    } else {
      let array = labItem[key].slice(1, -1).split(","); //making key an array like ["1","2"]
      labItem.min = array[genderCoef];
      labItem.max = array[genderCoef + 1];
    }
  }

  for (let measurement of measurements) {
    if (measurement.minArray === "" && measurement.maxArray === "") {
    } else if (measurement.maxArray === "") {
      let array = measurement.minArray.slice(1, -1).split(",");
      measurement.min = array[genderCoef / 2];
    } else if (measurement.minArray === "") {
      let array = measurement.maxArray.slice(1, -1).split(",");
      measurement.max = array[genderCoef / 2];
    } else {
      let array = measurement.minArray.slice(1, -1).split(",");
      measurement.min = array[genderCoef / 2];
      let maxArray = measurement.maxArray.slice(1, -1).split(",");
      measurement.max = maxArray[genderCoef / 2];
    }
  }
}

function weightCalc() {
  var weightTextbox = document.getElementById("weight");
  var weightUnitSelect = document.getElementById("weight_unit");
  var weight = Number(weightTextbox.value);
  var weightUnit = weightUnitSelect.value;
  if (weight < 0) {
    weightTextbox.value = 0;
    weight = 0;
  }
  if (weightUnit == "kg") {
    if (weight > 500) {
      weightTextbox.value = 500;
      weight = 500;
    }
    globalWeightGram = weight * 1000;
  }
  if (weightUnit == "gr") {
    if (weight > 10000) {
      weightTextbox.value = 10000;
      weight = 10000;
    }
    globalWeightGram = weight;
  }
  if (weightUnit == "lb") {
    if (weight > 1000) {
      weightTextbox.value = 1000;
      weight = 1000;
    }
    globalWeightGram = weight * 453.592;
  }
  tabContent(selectedTabId, selectedLabType);
}

function heightCalc() {
  var heightTextbox = document.getElementById("height");
  var heightUnitSelect = document.getElementById("height_unit");
  var height = Number(heightTextbox.value);
  var heightUnit = heightUnitSelect.value;
  if (height < 0) {
    heightTextbox.value = 0;
    height = 0;
  }
  if (heightUnit == "cm") {
    if (height > 270) {
      heightTextbox.value = 270;
      height = 270;
    }
    globalHeightCm = height;
  }
  if (heightUnit == "ft") {
    var feet = heightTextbox.value.slice(0, 1);
    var inch = heightTextbox.value.slice(1);
    if (feet < 0) {
      feet = 0;
    }
    if (inch >= 12) {
      inch = 11;
    }
    if (heightTextbox.value.length == 1) {
      inch = 0;
      heightTextbox.value = feet;
    } else if (heightTextbox.value.length > 1) {
      heightTextbox.value = feet + inch;
    } else {
      feet = 0;
      inch = 0;
    }
    globalHeightCm = feet * 30.48 + inch * 2.54;
  }
  tabContent(selectedTabId, selectedLabType);
}

function volume() {
  let volumeStatus = document.getElementById("volume").value;
  patient[0].signs[4][45] = "Volume status";
  patient[0].signs[4][46] = "hypervolume or not";
  patient[0].signs[4][411] = "hypovolume or not";
  if (volumeStatus == "euvolumic") {
    globalVolumeStatus = 0;
    patient[0].signs[3][45] = 0;
    patient[0].signs[3][46] = 0;
    patient[0].signs[3][411] = 0;
  }
  if (volumeStatus == "hypovolumic") {
    globalVolumeStatus = -1;
    patient[0].signs[3][45] = -1;
    patient[0].signs[3][46] = 0;
    patient[0].signs[3][411] = 1;
  }
  if (volumeStatus == "hypervolumic") {
    globalVolumeStatus = 1;
    patient[0].signs[3][45] = 1;
    patient[0].signs[3][46] = 1;
    patient[0].signs[3][411] = 0;
  }
  refresh();
}
function smoke() {
  let smokeStatus = document.getElementById("smoke").value;
  if (smokeStatus == "never") globalSmokingStatus = 0;
  if (smokeStatus == "smoker") globalSmokingStatus = 1;
  if (smokeStatus == "former") globalSmokingStatus = -1;
  refresh();
}
function diuretic() {
  let diureticStatus = document.getElementById("diuretic").value;
  patient[0].signs[4][42] = "Diuretic use";
  if (diureticStatus == "no") {
    globalDiureticStatus = 0;
    patient[0].signs[3][42] = 0;
  }
  if (diureticStatus == "yes") {
    globalDiureticStatus = 1;
    patient[0].signs[3][42] = 1;
  }
  refresh();
}
function respiratoryDisorder() {
  let chronicityStatus = document.getElementById("respiratoryDisorder").value;
  if (chronicityStatus == "acute") {
    globalRespiratoryChronicity = 0;
  }
  if (chronicityStatus == "chronic") {
    globalRespiratoryChronicity = 1;
  }
  refresh();
}
function diabetes() {
  let diabetesStatus = document.getElementById("diabetes").value;
  if (diabetesStatus == "no") {
    globalDiabetesHistory = 0;
  }
  if (diabetesStatus == "yes") {
    globalDiabetesHistory = 1;
  }
  refresh();
}
function ckdHistory() {
  let ckdStatus = document.getElementById("ckd").value;
  if (ckdStatus == "no") {
    globalCKDHistory = 0;
  }
  if (ckdStatus == "yes") {
    globalCKDHistory = 1;
  }
  refresh();
}
function baseCr() {
  let baseCrTextbox = document.getElementById("baseCr");
  let baseCr = Number(baseCrTextbox.value);
  if (baseCrTextbox.value === "" || baseCr <= 0) {
    globalBaseCrEntered = false;
  } else {
    globalBaseCrEntered = true;
    globalBaseCr = baseCr;
  }
  baseCrAnalysis();
  refresh();
}
function hepaticEncephalopathy() {
  let encephalopathyStatus = document.getElementById(
    "hepaticEncephalopathy"
  ).value;
  if (encephalopathyStatus == "no") {
    globalHepaticEncephalopathy = 0;
  }
  if (encephalopathyStatus == "yes") {
    globalHepaticEncephalopathy = 1;
  }
  refresh();
}
function nineAlphaFludrocortisone() {
  let cortisoneUse = document.getElementById("9a-Fludrocortisone").value;
  if (cortisoneUse == "notUsing") {
    global9afludrocortisone = 0;
    console.log("not using");
  }
  if (cortisoneUse == "using") {
    global9afludrocortisone = 1;
    console.log("using");
  }
  refresh();
}
function startup() {
  patient[0].signs[3][42] = 0; //diuretic
  patient[0].signs[3][45] = 0; //volume
  patient[0].signs[3][46] = 0; //hyper or not
  patient[0].signs[4][411] = 0; //hypo or not
  patient[0].signs[3][401] = 0; //BP
  patient[0].signs[4][2] == 0; //diff entered or not
}

function bmiCalc() {
  let bmi = 0;
  let bsa = 0;
  let bsa2 = 0;
  if (globalWeightGram <= 0) globalWeightGram = 0;
  if (globalHeightCm > 0) {
    measurements[0].used = true;
    measurements[23].used = true;
    measurements[24].used = true;
    bmi =
      globalWeightGram / 1000 / (globalHeightCm / 100) / (globalHeightCm / 100);
    bsa = Math.sqrt(((globalWeightGram / 1000) * globalHeightCm) / 3600);
    if (genderCoef == 0) {
      bsa2 =
        0.000579479 *
        Math.pow(globalWeightGram / 1000, 0.38) *
        Math.pow(globalHeightCm, 1.24);
    } else {
      bsa2 =
        0.000975482 *
        Math.pow(globalWeightGram / 1000, 0.46) *
        Math.pow(globalHeightCm, 1.08);
    }
  } else {
    measurements[0].used = false;
    measurements[23].used = false;
    measurements[24].used = false;
  }
  measurements[0].value = bmi.toFixed(1);
  measurements[23].value = bsa.toFixed(3);
  measurements[24].value = bsa2.toFixed(3);
}

function tooltip() {
  var tooltip_text = document.getElementById("tooltip");
  for (const entry of labItems) {
    if (entry.name == this.id) {
      tooltip_text.innerHTML = entry.tooltip;
    }
  }
  measurements_RE = new RegExp(/measurement/, "i");
  if (measurements_RE.test(this.id)) {
    tooltip_text.innerHTML = measurements[this.id.slice(11)].tooltip;
  }
}

function tooltipRemove() {
  var tootltip_text = document.getElementById("tooltip");
  tootltip_text.innerHTML = "";
}

function showPath() {
  id = this.id.slice(4);
  if (document.getElementById(this.id).innerHTML == " + ") {
    document.getElementById(this.id).innerHTML =
      patient[0].signs[1][Number(id)];
  } else {
    document.getElementById(this.id).innerHTML = " + ";
  }
}

function addSearch() {
  let id = this.id;
  pinnedOrNotArray[id] = 1;
  tabContent("tab_search", "searchbar");
}

function removeSearch() {
  let id = this.id;
  pinnedOrNotArray[id] = 0;
  tabContent("tab_search", "searchbar");
}

function idMaker(i, name) {
  labItems[i].input_id = "in_" + name.toString();
  labItems[i].output_id = "out_" + name.toString();
}

function scientificNumber(numberString) {
  const numInSciNot = {};
  let number = Number(numberString);
  if (number == 0) return "0";
  [numInSciNot.coefficient, numInSciNot.exponent] = number
    .toExponential()
    .split("e")
    .map((item) => Number(item));
  return (
    numInSciNot.coefficient.toFixed(1) +
    " &#215 10 <sup>" +
    numInSciNot.exponent +
    "</sup> "
  );
}

function measurementsCalc() {
  bmiCalc();
  gfrCalc();
  reticCalc();
  tsatCalc();
  astAltCalc();
  weightPercentileCalc();
  heightPercentileCalc();
  wbcCalc();
  anionGapCalc();
  oxygenCalc();
  naCaCalc();
  ttkgCalc();
  caCrCalc();
  osmGapCalc();
}
function bloodPressure() {
  let SBPTextbox = document.getElementById("SBP");
  let DBPTextbox = document.getElementById("DBP");
  let SBP = Number(SBPTextbox.value);
  let DBP = Number(DBPTextbox.value);
  if (SBP < DBP) {
    DBP = SBP;
    DBPTextbox.value = SBP;
  }
  globalSBP = SBP;
  globalDBP = DBP;
  patient[0].signs[4][401] = "Blood Pressure";
  patient[0].signs[3][401] = undefined;
  if (SBP != 0 && DBP != 0) {
    if (SBP >= 130) patient[0].signs[3][401] = 1;
    else patient[0].signs[3][401] = 0;
  }
  refresh();
}
function caCrCalc() {
  let urineCa = Number(labItems[83].value);
  let urineCaEntered = Number(labItems[83].entered);
  let urineCr = Number(labItems[84].value);
  let urineCrEntered = Number(labItems[84].entered);
  if (urineCaEntered + urineCrEntered == 2) {
    let caCrRatio = urineCa / urineCr;
    measurements[27].value = caCrRatio.toFixed(2);
    measurements[27].used = true;
  } else {
    measurements[27].used = false;
  }
}
function correctedCa(calcium) {
  let albumin = Number(labItems[19].value);
  let albuminEntered = labItems[19].entered;
  if(albuminEntered == 0) return calcium;
  let correctedCalcium = (4 - albumin) * 0.8 + calcium;
  return correctedCalcium;
}
function ttkgCalc() {
  let k = Number(labItems[33].value);
  let kEntered = Number(labItems[33].entered);
  let urineK = Number(labItems[82].value);
  let urineKEntered = Number(labItems[82].entered);
  let plasmaOsm = Number(labItems[85].value);
  let plasmaOsmEntered = Number(labItems[85].entered);
  let urineOsm = Number(labItems[86].value);
  let urineOsmEntered = Number(labItems[86].entered);
  if (kEntered + urineKEntered + plasmaOsmEntered + urineOsmEntered == 4) {
    let ttkg = (urineK * plasmaOsm) / (k * urineOsm);
    measurements[26].value = ttkg.toFixed(1);
    measurements[26].used = true;
  } else {
    measurements[26].used = false;
  }
}
function naCaCalc() {
  let na = Number(labItems[32].value);
  let naEntered = labItems[32].entered;
  let calcium = Number(labItems[104].value);
  let calciumEntered = labItems[104].entered;
  let albumin = Number(labItems[19].value);
  let albuminEntered = labItems[19].entered;
  measurements[21].used = false;
  if (calciumEntered == 1) {
    measurements[21].value = correctedCa(calcium);
    measurements[21].used = true;
  } 
  if (naEntered == 0) {
    measurements[25].used = false;
    measurements[25].value = 0;
    return 0;
  }
  let glucose = Number(labItems[35].value);
  let glucoseEntered = labItems[35].entered;
  if (glucoseEntered == 0) glucose = 100;
  na = na + (2 * (glucose - 100)) / 100;
  measurements[25].value = na;
  measurements[25].used = true;
}

function oxygenCalc() {
  let PaCO2 = labItems[89].value;
  let FIO2 = labItems[92].value / 100;
  let airPressure = labItems[93].value;
  let waterPressure = 47;

  if (FIO2 != 0 && airPressure != 0 && PaCO2 != 0) {
    measurements[22].used = true;
    let PIO2 = FIO2 * (airPressure - waterPressure);
    let PAO2 = PIO2 - PaCO2 / 0.8;
    measurements[22].value = PAO2.toFixed(1);
  } else {
    measurements[22].used = false;
  }
}
function osmGapCalc() {
  let na = Number(labItems[32].value);
  let bun = Number(labItems[31].value);
  let glucose = Number(labItems[35].value);
  let plasmaOsm = Number(labItems[85].value);
  let naEntered = labItems[32].entered;
  let bunEntered = labItems[31].entered;
  let glucoseEntered = labItems[35].entered;
  let plasmaOsmEntered = labItems[85].entered;
  if (naEntered + bunEntered + glucoseEntered == 3) {
    let calculatedOsm = na * 2 + glucose / 18 + bun / 2.8;
    let osmGap = plasmaOsm - calculatedOsm;
    measurements[28].used = true;
    measurements[28].value = osmGap.toFixed(2);
  } else {
    measurements[28].used = false;
  }
}
function anionGapCalc() {
  let na = Number(labItems[32].value);
  let naEntered = labItems[32].entered;
  let k = Number(labItems[33].value);
  let ph = Number(labItems[87].value);
  let hco3 = Number(labItems[88].value);
  let hco3Entered = labItems[88].entered;
  let paco2 = Number(labItems[89].value);
  let cl = Number(labItems[90].value);
  let clEntered = labItems[90].entered;
  let baseExcess = 0.02786 * paco2 * 10 ** (ph - 6.1) + 13.77 * ph - 124.58;
  let deltaAnionGap = 0;
  let deltaHco3 = 25 - hco3;
  if (deltaHco3 == 0) deltaHco3 = 0.1;
  let anionGap = 0,
    anionGapPotassium = 0;
  if (naEntered != 0 && hco3Entered != 0 && clEntered != 0) {
    anionGap = na - (cl + hco3);
    deltaAnionGap = anionGap - 12;
    anionGapPotassium = na + k - (cl + hco3);
    measurements[16].value = anionGap.toFixed(1);
    measurements[16].used = true;
    measurements[17].value = anionGapPotassium.toFixed(1);
    measurements[17].used = true;
    measurements[19].value = (deltaAnionGap - deltaHco3).toFixed(1);
    measurements[20].value = (deltaAnionGap / deltaHco3).toFixed(1);
    measurements[19].used = true;
    measurements[20].used = true;
  } else {
    measurements[16].value = 0;
    measurements[16].used = false;
    measurements[17].value = 0;
    measurements[17].used = false;
    measurements[19].used = false;
    measurements[20].used = false;
  }
  if (paco2 != 0 && ph != 0) {
    measurements[18].used = true;
    measurements[18].value = baseExcess.toFixed(2);
  } else {
    measurements[18].used = false;
  }
}
function wbcCalc() {
  let wbcTotalVal = labItems[0].value;
  let neuVal = labItems[45].value;
  let lymVal = labItems[46].value;
  let monVal = labItems[47].value;
  let eosVal = labItems[48].value;
  let basVal = labItems[49].value;
  let bandVal = labItems[50].value;
  let neuEntered = labItems[45].entered;
  let lymEntered = labItems[46].entered;
  let monEntered = labItems[47].entered;
  let eosEntered = labItems[48].entered;
  let basEntered = labItems[49].entered;
  let bandEntered = labItems[50].entered;
  patient[0].signs[3][2] = "WBC differentials";
  if (neuEntered == 1) {
    measurements[10].used = true;
  } else {
    measurements[10].used = false;
  }
  if (lymEntered == 1) {
    measurements[11].used = true;
  } else {
    measurements[11].used = false;
  }
  if (monEntered == 1) {
    measurements[12].used = true;
  } else {
    measurements[12].used = false;
  }
  if (eosEntered == 1) {
    measurements[13].used = true;
  } else {
    measurements[13].used = false;
  }
  if (basEntered == 1) {
    measurements[14].used = true;
  } else {
    measurements[14].used = false;
  }
  if (bandEntered == 1) {
    measurements[15].used = true;
  } else {
    measurements[15].used = false;
  }
  measurements[10].value = (0.01 * neuVal * wbcTotalVal).toFixed(1);
  measurements[11].value = (0.01 * lymVal * wbcTotalVal).toFixed(1);
  measurements[12].value = (0.01 * monVal * wbcTotalVal).toFixed(1);
  measurements[13].value = (0.01 * eosVal * wbcTotalVal).toFixed(1);
  measurements[14].value = (0.01 * basVal * wbcTotalVal).toFixed(1);
  measurements[15].value = (0.01 * bandVal * wbcTotalVal).toFixed(1);
  if (
    !measurements[10].used &&
    !measurements[11].used &&
    !measurements[12].used &&
    !measurements[13].used &&
    !measurements[14].used &&
    !measurements[15].used
  ) {
    patient[0].signs[4][2] = 0;
  } else {
    patient[0].signs[4][2] = 1;
  }
}

function checkIfWBCDiffsAreLessThanHundred() {
  var wbcDiff = [];
  let totalVal = 0;
  let labIndex = 45; //differentials start from [45]
  while (labIndex < 51) {
    let diff = labItems[labIndex].value;
    if (diff >= 100) {
      labItems[labIndex].value = 0;
      diff = 0;
      let inputID = labItems[labIndex].input_id;
      document.getElementById(inputID).value = 0;
    }
    totalVal += diff;
    if (totalVal > 100) {
      totalVal -= diff;
      labItems[labIndex].value = 0;
      diff = 0;
      let inputID = labItems[labIndex].input_id;
      document.getElementById(inputID).value = 0;
    }
    labIndex++;
  }
}

function gfrCalc() {
  let creatinine = labItems[30].value;
  patient[0].signs[4][40] = "GFR";
  let gfr_cg = 0;
  let gfr_mdrd = 0;
  let gfr_ckd = 0;
  if (creatinine == 0 || globalWeightGram == 0) {
    measurements[5].used = false;
    measurements[6].used = false;
    measurements[7].used = false;
    patient[0].signs[3][40] = undefined;
    return 0;
  } else {
    measurements[5].used = true;
    measurements[6].used = true;
    measurements[7].used = true;
    let coef_cg = 1; //for male
    let coef_mdrd = 1;
    if (genderCoef == 2) {
      //for female
      coef_cg = 0.85;
      coef_mdrd = 0.742;
    }
    gfr_cg =
      ((140 - globalAgeYears) * (globalWeightGram / 1000) * coef_cg) /
      (72 * creatinine);
    gfr_mdrd =
      175 * creatinine ** -1.154 * globalAgeYears ** -0.203 * coef_mdrd;
    gfr_ckd = gfrCKD(creatinine);
  }
  measurements[5].value = gfr_ckd.toFixed(3);
  measurements[6].value = gfr_mdrd.toFixed(3);
  measurements[7].value = gfr_cg.toFixed(3);
  if (gfr_ckd <= 15) {
    patient[0].signs[3][40] = 1;
  } else {
    patient[0].signs[3][40] = 0;
  }
}
function gfrCKD(creatinine) {
  if (creatinine == 0) return 0;
  let GFR = 0;
  let coef = 1;
  let coefK = 0.9;
  let coefA = -0.302;
  if (genderCoef == 2) {
    //for female
    coef = 1.012;
    coefK = 0.7;
    coefA = -0.241;
  }
  let crToK = creatinine / coefK;
  let crToKMin = 0;
  let crToKMax = 0;
  if (crToK > 1) {
    crToKMin = 1;
    crToKMax = crToK;
  } else {
    crToKMin = crToK;
    crToKMax = 1;
  }
  GFR =
    142 *
    crToKMin ** coefA *
    crToKMax ** -1.2 *
    0.9938 ** globalAgeYears *
    coef;
  return GFR;
}
function reticCalc() {
  measurements[3].used = false;
  measurements[4].used = false;
  let hct = labItems[4].value;
  let retic = labItems[11].value;
  let hctEntered = labItems[4].entered;
  let reticEntered = labItems[11].entered;
  if (hctEntered == 0 || reticEntered == 0) {
    return 0;
  }
  let crcVal = 0;
  let rbcMaturation = 0,
    rpiVal = 0;
  let normalHctGender = 45 - genderCoef * 2.5;
  if (hct >= 40) {
    rbcMaturation = 1;
  } else if (hct >= 30) {
    rbcMaturation = 1.5;
  } else if (hct >= 20) {
    rbcMaturation = 2;
  } else {
    rbcMaturation = 2.5;
  }
  measurements[3].used = true;
  measurements[4].used = true;
  crcVal = retic * (hct / normalHctGender);
  rpiVal = ((hct / 45) * retic) / rbcMaturation;

  measurements[3].value = crcVal.toFixed(2);
  measurements[4].value = rpiVal.toFixed(2);
}
function tsatCalc() {
  var iron_val = labItems[40].value;
  var tibc_val = labItems[42].value;
  if (iron_val > 0 && tibc_val > 0) {
    globalTSAT = (iron_val / tibc_val) * 100;
    measurements[8].value = globalTSAT.toFixed(2);
    measurements[8].used = true;
  } else {
    measurements[8].used = false;
  }
}
function astAltCalc() {
  let p_ast = labItems[14].value;
  let p_alt = labItems[15].value;
  let astAltRatio = 0;
  if (p_ast <= 0 || p_alt <= 0) {
    astAltRatio = 0;
    measurements[9].used = false;
  } else {
    astAltRatio = p_ast / p_alt;
    measurements[9].used = true;
  }
  measurements[9].value = astAltRatio.toFixed(1);
}
function heightPercentileCalc() {
  if (globalAgeYears <= 3) {
    if (globalAgeMonths == 0) {
      var currentAgeObject = heightAgeInfantJSON.find(
        (o) => o.Age === globalAgeMonths.toString()
      );
    } else {
      var currentAgeObject = heightAgeInfantJSON.find(
        (o) => o.Age === (globalAgeMonths - 0.5).toString()
      );
    }
  } else if (globalAgeYears <= 20) {
    var currentAgeObject = heightAgeJSON.find(
      (o) => o.Age === globalAgeYears.toString()
    );
  } else {
    measurements[33].used = false;
    measurements[2].used = false;
    return 0;
  }
  let L = "",
    M = "",
    S = "";
  if (genderCoef == 0) {
    L = currentAgeObject.L;
    M = currentAgeObject.M;
    S = currentAgeObject.S;
  } else {
    L = currentAgeObject.L2;
    M = currentAgeObject.M2;
    S = currentAgeObject.S2;
  }
  let heightZScore = ((globalHeightCm / M) ** L - 1) / (S * L);
  let heightPercentile = ztable_finder(heightZScore) * 100;
  let meanHeight = Number(M);
  measurements[33].used = true;
  measurements[33].value = meanHeight.toFixed(1);
  measurements[2].value = heightPercentile.toFixed(2);
  measurements[2].used = true;
}
function weightPercentileCalc() {
  if (globalAgeYears <= 3) {
    if (globalAgeMonths != 36 && globalAgeMonths != 0) {
      var currentAgeObject = weightAgeInfantJSON.find(
        (o) => o.Age === (globalAgeMonths + 0.5).toString()
      );
    } else {
      var currentAgeObject = weightAgeInfantJSON.find(
        (o) => o.Age === globalAgeMonths.toString()
      );
    }
  } else if (globalAgeYears <= 20) {
    var currentAgeObject = weightAgeJSON.find(
      (o) => o.Age === globalAgeYears.toString()
    );
  } else {
    measurements[32].used = false;
    measurements[1].used = false;
    return 0;
  }
  let L = "",
    M = "",
    S = "";
  if (genderCoef == 0) {
    L = currentAgeObject.L;
    M = currentAgeObject.M;
    S = currentAgeObject.S;
  } else {
    L = currentAgeObject.L2;
    M = currentAgeObject.M2;
    S = currentAgeObject.S2;
  }
  var weightKg = globalWeightGram / 1000;
  var weightZScore = ((weightKg / M) ** L - 1) / (S * L);
  var weightPercentile = ztable_finder(weightZScore) * 100;
  let meanWeight = Number(M);
  measurements[32].used = true;
  measurements[32].value = meanWeight.toFixed(1);
  measurements[1].value = weightPercentile.toFixed(2);
  measurements[1].used = true;
}
