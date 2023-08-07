var pinnedOrNotArray = [];
var globalAgeYears = 40,
  globalAgeMonths,
  gloalWeightGram = 70000,
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
var pregnancySituation = 0; //0 for not pregnant
var lastPregnancySituation = 0;
var selectedTabId = "test_types_cbc";
var selectedLabType = "cbc";
var lowIcon = "https://cdn-icons-png.flaticon.com/128/8532/8532500.png";
var highIcon = "https://cdn-icons-png.flaticon.com/128/8532/8532463.png";
var sup_low_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-211-512.png";
var sup_high_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-149-512.png";
var normalIcon = "https://cdn-icons-png.flaticon.com/128/1722/1722017.png";

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
  let genderString = ["Male" , "Female"];
  let pregnancyString = ["", "Pregnant ", "Pregnant ","Pregnant "];
  let ageTextbox = document.getElementById("age");
  let ageUnitSelected = document.getElementById("age_unit");
  let ageNumber = ageTextbox.value;
  let ageUnit = ageUnitSelected.value;
  let ageUnitString = "";
  if (ageUnit == "day") ageUnitString= "day";
  if (ageUnit == "mon") ageUnitString= "month";
  if (ageUnit == "year") ageUnitString= "year";
  let ageString = ageNumber + " " + ageUnitString;
  if (Number(ageNumber)>1) ageString += "s";
  let summary = ageString + " " + pregnancyString[pregnancySituation] + genderString[genderCoef/2];
  document.getElementById("patientSummary").innerHTML = summary;
}

function expandInfo() {
  let more_button = document.getElementById("expand_info");
  let info = document.getElementById("gen_a_w_h");
  if (more_button.innerHTML == "change") {
    more_button.innerHTML = "hide";
    info.style.display = "flex";
  } else {
    info.style.display = "none";
    more_button.innerHTML = "change";
  }
}

function gender() {
  let malelogo = "https://cdn-icons-png.flaticon.com/512/3001/3001764.png";
  let femalelogo = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";
  let ageTextbox = document.getElementById("age");
  let ageUnitSelected = document.getElementById("age_unit");
  let ageNumber = Number(ageTextbox.value);
  let ageUnit = ageUnitSelected.value;
  if (genderCoef == 0) {
    document.getElementById("gender").value = "female";
    document.getElementById("gen_logo").src = femalelogo;
    document.getElementById("gen_logo").alt = "female";
    genderCoef = 2;
    if (ageNumber > 12 && ageUnit=="year") {
      pregnancySituation = lastPregnancySituation;
      document.getElementById("preg").disabled = false;
    }
  } else {
    document.getElementById("preg").disabled = true;
    document.getElementById("gender").value = "male";
    document.getElementById("gen_logo").src = malelogo;
    document.getElementById("gen_logo").alt = "male";
    genderCoef = 0;
    lastPregnancySituation = pregnancySituation;
    pregnancySituation = 0;
  }
  ageCalc(); //contains rangeMaker and tabContent and checkRanges
}

function pregnancy() {
  let pregnancyVal = document.getElementById("preg").value;
  switch (pregnancyVal) {
    case "notPregnant":
      pregnancySituation = 0;
      break;
    case "firstTrimester":
      pregnancySituation = 1;
      break;
    case "secondTrimester":
      pregnancySituation = 2;
      break;
    case "thirdTrimester":
      pregnancySituation = 3;
      break;
    default:
  }
  ageCalc(); //contains rangeMaker and tabContent and checkRanges
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
    lastPregnancySituation = pregnancySituation;
    pregnancySituation = 0;
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
    lastPregnancySituation = pregnancySituation;
    pregnancySituation = 0;
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
    if (ageNumber<12) {
      lastPregnancySituation = pregnancySituation;
      pregnancySituation = 0;
      document.getElementById("preg").disabled = true;
    } else if(genderCoef==2){
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
  let pregKey = "";
  if (pregnancySituation == 1) {
    pregKey = "firstTrim";
  } else if (pregnancySituation == 2) {
    pregKey = "secondTrim";
  } else if (pregnancySituation == 3) {
    pregKey = "thirdTrim";
  }
  for (let labItem of labItems) {
    if (
      pregnancySituation != 0 &&
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
  var weight_txtbox = document.getElementById("weight");
  var weight_select = document.getElementById("weight_unit");
  var inp = Number(weight_txtbox.value);
  var weight_unit = weight_select.value;
  if (inp < 0) {
    weight_txtbox.value = 0;
    inp = 0;
  }
  if (weight_unit == "kg") {
    if (inp > 500) {
      weight_txtbox.value = 500;
      inp = 500;
    }
    gloalWeightGram = inp * 1000;
  }
  if (weight_unit == "gr") {
    if (inp > 10000) {
      weight_txtbox.value = 10000;
      inp = 10000;
    }
    gloalWeightGram = inp;
  }
  if (weight_unit == "lb") {
    if (inp > 1000) {
      weight_txtbox.value = 1000;
      inp = 1000;
    }
    gloalWeightGram = inp * 453.592;
  }
  tabContent(selectedTabId, selectedLabType);
}

function heightCalc() {
  var heightTextbox = document.getElementById("height");
  var height_select = document.getElementById("height_unit");
  var inp = Number(heightTextbox.value);
  var heightUnit = height_select.value;
  if (inp < 0) {
    heightTextbox.value = 0;
    inp = 0;
  }
  if (heightUnit == "cm") {
    if (inp > 270) {
      heightTextbox.value = 270;
      inp = 270;
    }
    globalHeightCm = inp;
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

function bmiCalc() {
  let bmi = 0;
  let bsa = 0;
  if (gloalWeightGram <= 0) gloalWeightGram = 0;
  if (globalHeightCm > 0) {
    measurements[0].used = true;
    measurements[23].used = true;
    bmi =
      gloalWeightGram / 1000 / (globalHeightCm / 100) / (globalHeightCm / 100);
    bsa = Math.sqrt(((gloalWeightGram / 1000) * globalHeightCm) / 3600);
  } else {
    measurements[0].used = false;
    measurements[23].used = false;
  }
  measurements[0].value = bmi.toFixed(1);
  measurements[23].value = bsa.toFixed(3);
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

function prevalenceChange() {
  let x = Number(this.value);
  let index = this.id.slice(11);
  conditions[index].prevalenceValue = x;
  posteriorCalc(index);
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

function scientificNumber(number) {
  const numInSciNot = {};
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
function anionGapCalc() {
  let na = labItems[32].value;
  let k = labItems[33].value;
  let ph = labItems[87].value;
  let hco3 = labItems[88].value;
  let paco2 = labItems[89].value;
  let cl = labItems[90].value;
  let baseExcess = 0.02786 * paco2 * 10 ** (ph - 6.1) + 13.77 * ph - 124.58;
  let deltaAnionGap = 0;
  let deltaHco3 = 25 - hco3;
  if (deltaHco3 == 0) deltaHco3 = 0.1;
  let anionGap = 0,
    anionGapPotassium = 0;
  if (na != 0 && hco3 != 0 && cl != 0) {
    anionGap = na - (cl + hco3);
    deltaAnionGap = anionGap - 12;
    anionGapPotassium = na + k - (cl + hco3);
    measurements[16].value = anionGap;
    measurements[16].used = true;
    measurements[17].value = anionGapPotassium;
    measurements[17].used = true;
    measurements[19].value = deltaAnionGap - deltaHco3;
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
  if (neuVal > 0) {
    measurements[10].used = true;
  } else {
    measurements[10].used = false;
  }
  if (lymVal > 0) {
    measurements[11].used = true;
  } else {
    measurements[11].used = false;
  }
  if (monVal > 0) {
    measurements[12].used = true;
  } else {
    measurements[12].used = false;
  }
  if (eosVal > 0) {
    measurements[13].used = true;
  } else {
    measurements[13].used = false;
  }
  if (basVal > 0) {
    measurements[14].used = true;
  } else {
    measurements[14].used = false;
  }
  if (bandVal > 0) {
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
  let cr_val = labItems[30].value;
  if (cr_val == 0 || gloalWeightGram == 0) {
    gfr_cg = 0;
    gfr_mdrd = 0;
    gfr_ckd = 0;
    measurements[5].used = false;
    measurements[6].used = false;
    measurements[7].used = false;
  } else {
    measurements[5].used = true;
    measurements[6].used = true;
    measurements[7].used = true;
    var coef_cg = 1; //for male
    var coef_mdrd = 1;
    var coef_ckd = 1;
    var coef_ckd_k = 0.9;
    var coef_ckd_a = -0.302;
    if (genderCoef == 2) {
      //for female
      coef_cg = 0.85;
      coef_mdrd = 0.742;
      coef_ckd = 1.012;
      coef_ckd_k = 0.7;
      coef_ckd_a = -0.241;
    }
    gfr_cg =
      ((140 - globalAgeYears) * (gloalWeightGram / 1000) * coef_cg) /
      (72 * cr_val);
    gfr_mdrd = 175 * cr_val ** -1.154 * globalAgeYears ** -0.203 * coef_mdrd;
    var cr_to_k = cr_val / coef_ckd_k;
    if (cr_to_k > 1) {
      cr_to_k_min = 1;
      cr_to_k_max = cr_to_k;
    } else {
      cr_to_k_min = cr_to_k;
      cr_to_k_max = 1;
    }
    gfr_ckd =
      142 *
      cr_to_k_min ** coef_ckd_a *
      cr_to_k_max ** -1.2 *
      0.9938 ** globalAgeYears *
      coef_ckd;
  }
  measurements[5].value = gfr_ckd.toFixed(3);
  measurements[6].value = gfr_mdrd.toFixed(3);
  measurements[7].value = gfr_cg.toFixed(3);
}
function reticCalc() {
  var hct_val = labItems[4].value;
  var retic_val = labItems[11].value;
  var crcVal = 0;
  var rbcMaturation = 0,
    rpiVal = 0;
  var normal_hct_gender = 45 - genderCoef * 2.5;
  if (hct_val >= 40) {
    rbcMaturation = 1;
  } else if (hct_val >= 30) {
    rbcMaturation = 1.5;
  } else if (hct_val >= 20) {
    rbcMaturation = 2;
  } else {
    rbcMaturation = 2.5;
  }
  if (hct_val <= 0 || retic_val <= 0) {
    crcVal = 0;
    rpiVal = 0;
    measurements[3].used = false;
    measurements[4].used = false;
  } else {
    measurements[3].used = true;
    measurements[4].used = true;
    crcVal = retic_val * (hct_val / normal_hct_gender);
    rpiVal = ((hct_val / 45) * retic_val) / rbcMaturation;
  }
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
    measurements[2].used = false;
    return 0;
  }
  if (genderCoef == 0) {
    var L = currentAgeObject.L;
    var M = currentAgeObject.M;
    var S = currentAgeObject.S;
  } else {
    var L = currentAgeObject.L2;
    var M = currentAgeObject.M2;
    var S = currentAgeObject.S2;
  }
  var heightZScore = ((globalHeightCm / M) ** L - 1) / (S * L);
  var heightPercentile = ztable_finder(heightZScore) * 100;
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
    measurements[1].used = false;
    return 0;
  }
  if (genderCoef == 0) {
    var L = currentAgeObject.L;
    var M = currentAgeObject.M;
    var S = currentAgeObject.S;
  } else {
    var L = currentAgeObject.L2;
    var M = currentAgeObject.M2;
    var S = currentAgeObject.S2;
  }
  var weightKg = gloalWeightGram / 1000;
  var weightZScore = ((weightKg / M) ** L - 1) / (S * L);
  var weightPercentile = ztable_finder(weightZScore) * 100;
  measurements[1].value = weightPercentile.toFixed(2);
  measurements[1].used = true;
}
