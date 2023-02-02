var minArray = [],
  maxArray = [],
  inputIdArray = [],
  outputIdArray = [],
  pinnedOrNotArray = [],
  critValueArray = [];
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
var preg_situation = 0; //0 for not pregnant
var selectedTabId = "test_types_cbc";
var selectedLabType = "cbc";
var low_icon = "/Art/downArrow.png";
var high_icon = "/Art/upArrow.png";
var sup_low_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-211-512.png";
var sup_high_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-149-512.png";
var nl_icon = "/Art/normal.png";

var searchbar_show = "none";

function searchBarSize() {
  var searchbar = document.getElementById('searchbar');
  if(searchbar.value.length > 5) {
    searchbar.style.minWidth = ((searchbar.value.length + 1) * 25) + 'px'; 
  }
  else {
    searchbar.style.minWidth = '100px';
  }
  if (searchbar.style.minWidth > '270px') {
    searchbar.style.minWidth = '270px';
    searchbar.style.maxWidth = '1vw';
  }
}

function change_table_caller() {
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
function burger_menu() {
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
      burger_tab.onclick = change_table_caller;
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

function expand_info() {
  var more_button = document.getElementById("expand_info");
  var info = document.getElementById("gen_a_w_h");
  if (more_button.innerHTML == "show") {
    more_button.innerHTML = "hide";
    info.style.display = "flex";
  } else {
    info.style.display = "none";
    more_button.innerHTML = "show";
  }
}

function gender() {
  var malelogo = "https://cdn-icons-png.flaticon.com/512/3001/3001764.png";
  var femalelogo = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";
  if (genderCoef == 0) {
    document.getElementById("preg").disabled = false;
    document.getElementById("gender").value = "female";
    document.getElementById("gen_logo").src = femalelogo;
    document.getElementById("gen_logo").alt = "female";
    genderCoef = 2;
  } else {
    document.getElementById("preg").disabled = true;
    document.getElementById("gender").value = "male";
    document.getElementById("gen_logo").src = malelogo;
    document.getElementById("gen_logo").alt = "male";
    genderCoef = 0;
  }
  age_calc();
}

function change_table_caller() {
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
function burger_menu() {
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
      burger_tab.onclick = change_table_caller;
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

function expand_info() {
  var more_button = document.getElementById("expand_info");
  var info = document.getElementById("gen_a_w_h");
  if (more_button.innerHTML == "show") {
    more_button.innerHTML = "hide";
    info.style.display = "flex";
  } else {
    info.style.display = "none";
    more_button.innerHTML = "show";
  }
}

function gender() {
  var malelogo = "https://cdn-icons-png.flaticon.com/512/3001/3001764.png";
  var femalelogo = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";
  if (genderCoef == 0) {
    document.getElementById("preg").disabled = false;
    document.getElementById("gender").value = "female";
    document.getElementById("gen_logo").src = femalelogo;
    document.getElementById("gen_logo").alt = "female";
    genderCoef = 2;
  } else {
    document.getElementById("preg").disabled = true;
    document.getElementById("gender").value = "male";
    document.getElementById("gen_logo").src = malelogo;
    document.getElementById("gen_logo").alt = "male";
    genderCoef = 0;
  }
  age_calc();
}


function pregnancy() {
  preg_val = document.getElementById("preg").value;
  switch (preg_val) {
    case "preg1":
      preg_situation = 0;
    case "preg2":
      preg_situation = 1;
    case "preg3":
      preg_situation = 2;
    case "preg4":
      preg_situation = 3;
  }
}

function age_calc() {
  var age_txtbox = document.getElementById("age");
  var age_unit_selected = document.getElementById("age_unit");
  var inp = Number(age_txtbox.value);
  var age_unit = age_unit_selected.value;
  if (inp < 0) {
    age_txtbox.value = 0;
    inp = 0;
  }
  if (age_unit == "day") {
    if (inp > 60) {
      age_txtbox.value = 60;
      inp = 60;
    }
    if (inp <= 3) {
      selectedAgeGroupIndex = 0;
    } else if (inp <= 14) {
      selectedAgeGroupIndex = 1;
    } else if (inp <= 30) {
      selectedAgeGroupIndex = 2;
    } else {
      selectedAgeGroupIndex = 3;
    }
    globalAgeYears = 0;
    globalAgeMonths = Math.floor(inp / 30);
  }
  if (age_unit == "mon") {
    if (inp < 1) {
      age_txtbox.value = 1;
      inp = 1;
    }
    if (inp >= 36) {
      age_txtbox.value = 36;
      inp = 36;
    }
    if (inp <= 6) {
      selectedAgeGroupIndex = 4;
    } else if (inp <= 12) {
      selectedAgeGroupIndex = 5;
    } else if (inp < 36) {
      selectedAgeGroupIndex = 6;
    } else {
      selectedAgeGroupIndex = 7;
    }
    globalAgeMonths = inp;
    globalAgeYears = Math.floor(inp / 12);
  }
  if (age_unit == "year") {
    if (inp < 1) {
      inp = 1;
    }
    if (inp > 139) {
      age_txtbox.value = 139;
      inp = 139;
    }
    globalAgeYears = inp;
    if (inp < 2) {
      selectedAgeGroupIndex = 5;
      globalAgeMonths = 12;
    } else if (inp < 3) {
      selectedAgeGroupIndex = 6;
      globalAgeMonths = 24;
    } else if (inp == 3) {
      selectedAgeGroupIndex = 7;
      globalAgeMonths = 36;
    } else if (inp <= 6) {
      selectedAgeGroupIndex = 7;
    } else if (inp <= 9) {
      selectedAgeGroupIndex = 8;
    } else if (inp <= 10) {
      selectedAgeGroupIndex = 9;
    } else if (inp <= 12) {
      selectedAgeGroupIndex = 10;
    } else if (inp <= 18) {
      selectedAgeGroupIndex = 11;
    } else {
      selectedAgeGroupIndex = 12;
    }
    globalAgeYears = inp;
  }
  selectedAgeGroup = ageGroupsArray[selectedAgeGroupIndex];

  //to correct crit min and max for Hb and Hct
  if (
    selectedAgeGroupIndex == 0 ||
    selectedAgeGroupIndex == 1 ||
    selectedAgeGroupIndex == 2
  ) {
    for (var j = 0; j < labItems.length; j++) {
      if (currentLabItem["name"] == "Hb") {
        currentLabItem["critmin"] = 9;
        currentLabItem["critmax"] = 25;
      }
      if (currentLabItem["name"] == "Hct") {
        currentLabItem["critmin"] = 28;
        currentLabItem["critmax"] = 67;
      }
    }
  } else {
    for (var j = 0; j < labItems.length; j++) {
      if (currentLabItem["name"] == "Hb") {
        currentLabItem["critmin"] = 7;
        currentLabItem["critmax"] = 18;
      }
      if (currentLabItem["name"] == "Hct") {
        currentLabItem["critmin"] = 20;
        currentLabItem["critmax"] = 55;
      }
    }
  }
  range_maker(selectedAgeGroup);

  for (var j = 0; j < labItems.length; j++) {
    x = Number(currentLabItem.value);
    id = currentLabItem.input_id;
    check_ranges(x, id);
  }

  tabContent(selectedTabId, selectedLabType);

}

function range_maker(key) {
  var i = 0;
  for (var data of labItems) {
    var array = data[key].slice(1, -1).split(","); //making key an array like ["1","2"]
    minArray[i] = array[genderCoef];
    maxArray[i] = array[genderCoef + 1];
    data.min = array[genderCoef];
    data.max = array[genderCoef + 1];
    i++;
  }
}

function weight_calc() {
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

function height_calc() {
  var height_txtbox = document.getElementById("height");
  var height_select = document.getElementById("height_unit");
  var inp = Number(height_txtbox.value);
  var height_unit = height_select.value;
  if (inp < 0) {
    height_txtbox.value = 0;
    inp = 0;
  }
  if (height_unit == "cm") {
    if (inp > 270) {
      height_txtbox.value = 270;
      inp = 270;
    }
    globalHeightCm = inp;
  }
  if (height_unit == "ft") {
    var feet = height_txtbox.value.slice(0, 1);
    var inch = height_txtbox.value.slice(1);
    if (feet < 0) {
      feet = 0;
    }
    if (inch >= 12) {
      inch = 11;
    }
    // if(inch = "") {
    //     inch = 0;
    // }
    if (height_txtbox.value.length == 1) {
      inch = 0;
      height_txtbox.value = feet;
    } else if (height_txtbox.value.length > 1) {
      height_txtbox.value = feet + inch;
    } else {
      feet = 0;
      inch = 0;
    }
    globalHeightCm = feet * 30.48 + inch * 2.54;
  }

  tabContent(selectedTabId, selectedLabType);


}

function bmi_calc() {
  if (gloalWeightGram <= 0) gloalWeightGram = 0;
  if (globalHeightCm != 0) {
    var bmi =
      gloalWeightGram / 1000 / (globalHeightCm / 100) / (globalHeightCm / 100);
    //document.getElementById("bmi_val").innerHTML = bmi.toFixed(1);
  }
  if (globalHeightCm == 0) {
    var bmi = gloalWeightGram / 1000 / (1 / 100) / (1 / 100);
    //document.getElementById("bmi_val").innerHTML = bmi.toFixed(1);
  }
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
function tooltip_remove() {
  var tootltip_text = document.getElementById("tooltip");
  tootltip_text.innerHTML = "";
}




function show_path() {
  id = this.id.slice(4);
  if (document.getElementById(this.id).innerHTML == " + ") {
    document.getElementById(this.id).innerHTML =
      patient[0].signs[1][Number(id)];
  } else {
    document.getElementById(this.id).innerHTML = " + ";
  }
}

function add_search() {
  let id = this.id;
  pinnedOrNotArray[id] = 1;
  tabContent("tab_search", "searchbar");
}

function rem_search() {
  let id = this.id;
  pinnedOrNotArray[id] = 0;
  tabContent("tab_search", "searchbar");
}

function prevalenceChange() {
  let x = Number(this.value);
  let index = this.id.slice(11);
  conditions[index].prevalenceValue = x;
  PosteriorCalc(index);
}

function PosteriorCalc(ind) {
  let index = statistics[ind].conditionIndex;
  let prevalenceValue = conditions[index].prevalenceValue;
  let currentLikelihoodRatio = 1;
  for (let i in conditions[index].statisticsParameteresRelated) {
    currentLikelihoodRatio =
      currentLikelihoodRatio * statistics[i].currentLikelihoodRatio;
  }
  let currentRatio = prevalenceValue / (100 - prevalenceValue);
  let posteriorRatio = currentRatio * currentLikelihoodRatio;
  let posteriorDistribution = (100 / (1 + posteriorRatio)) * posteriorRatio;
  conditions[index].posteriorDistribution = posteriorDistribution;
  try {
    if (posteriorDistribution < 1)
      document.getElementById("prevalenceResult_" + index).innerHTML =
        scientificNumber(posteriorDistribution) + "%";
    else
      document.getElementById("prevalenceResult_" + index).innerHTML =
        posteriorDistribution.toFixed(2) + "%";
  } catch {}
}

function whenAnInputChanges() {
  x = Number(this.value);
  id = this.id;
  if (x < 0) {
    x = 0;
  }
  if (x != 0) {
    switch (id) {
      // case in_WBC :
      case "in_RBC":
      case "in_Hb":
      case "in_MCV":
        cbc_autocomplete();
        anemiaType();
        break;
      case "in_MCH":
      case "in_Hct":
      case "in_MCHC":
        anemiaType();
        break;
      case "in_Iron":
      case "in_TIBC":
      case "in_Ferritin":
        iron_profile();
        break;
      default:
    }
  }

  check_ranges(x, id);
}


function show_path() {
  id = this.id.slice(4);
  if (document.getElementById(this.id).innerHTML == " + ") {
    document.getElementById(this.id).innerHTML =
      patient[0].signs[1][Number(id)];
  } else {
    document.getElementById(this.id).innerHTML = " + ";
  }
}

function add_search() {
  let id = this.id;
  pinnedOrNotArray[id] = 1;
  tabContent("tab_search", "searchbar");
}

function rem_search() {
  let id = this.id;
  pinnedOrNotArray[id] = 0;
  tabContent("tab_search", "searchbar");
}





function id_maker(i, name) {
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

function calc_measurements() {
  //bmi
  if (gloalWeightGram <= 0) gloalWeightGram = 0;
  if (globalHeightCm != 0) {
    var bmi =
      gloalWeightGram / 1000 / (globalHeightCm / 100) / (globalHeightCm / 100);
    measurements[0].value = bmi.toFixed(2);
  }
  if (globalHeightCm == 0) {
    var bmi = 0;
    measurements[0].value = bmi;
  }

  //gfr
  cr_val = labItems[30].value;
  if (cr_val == 0 || gloalWeightGram == 0) {
    gfr_cg = 0;
    gfr_mdrd = 0;
    gfr_ckd = 0;
  } else {
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

  //CRC
  var hct_val = labItems[4].value;
  var retic_val = labItems[11].value;
  var crc_val = 0;
  var normal_hct_gender = 45 - genderCoef * 2.5;
  if (hct_val <= 0 || retic_val <= 0) {
    crc = 0;
  } else {
    crc = retic_val * (hct_val / normal_hct_gender);
  }
  measurements[3].value = crc.toFixed(2);

  //RPI

  var maturation = 0,
    rpi = 0;
  if (hct_val >= 40) {
    maturation = 1;
  } else if (hct_val >= 30) {
    maturation = 1.5;
  } else if (hct_val >= 20) {
    maturation = 2;
  } else {
    maturation = 2.5;
  }
  if (hct_val <= 0 || retic_val <= 0) {
    rpi = 0;
  } else {
    rpi = ((hct_val / 45) * retic_val) / maturation;
  }
  measurements[4].value = rpi.toFixed(2);

  //TSAT
  var iron_val = labItems[40].value;
  var tibc_val = labItems[42].value;
  if (iron_val > 0 && tibc_val > 0) {
    globalTSAT = (iron_val / tibc_val) * 100;
    measurements[8].value = globalTSAT.toFixed(2);
  }

  //Percentiles
  weightPercentileCalc();
  heightPercentileCalc();

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
    measurements[2].value = 0;
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
    measurements[1].value = 0;
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
    measurements[2].value = 0;
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
    measurements[1].value = 0;
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
}


