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
var low_icon = "https://cdn-icons-png.flaticon.com/512/892/892624.png";
var high_icon = "https://cdn-icons-png.flaticon.com/512/892/892682.png";
var sup_low_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-211-512.png";
var sup_high_icon =
  "https://www.iconsdb.com/icons/download/red/arrow-149-512.png";
var nl_icon = "https://cdn-icons-png.flaticon.com/128/6785/6785304.png";

var searchbar_show = "none";

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
    for (var j = 0; j < mydata.length; j++) {
      if (mydata[j]["name"] == "Hb") {
        mydata[j]["critmin"] = 9;
        mydata[j]["critmax"] = 25;
      }
      if (mydata[j]["name"] == "Hct") {
        mydata[j]["critmin"] = 28;
        mydata[j]["critmax"] = 67;
      }
    }
  } else {
    for (var j = 0; j < mydata.length; j++) {
      if (mydata[j]["name"] == "Hb") {
        mydata[j]["critmin"] = 7;
        mydata[j]["critmax"] = 18;
      }
      if (mydata[j]["name"] == "Hct") {
        mydata[j]["critmin"] = 20;
        mydata[j]["critmax"] = 55;
      }
    }
  }
  range_maker(selectedAgeGroup);

  for (var j = 0; j < mydata.length; j++) {
    x = Number(mydata[j].value);
    id = mydata[j].input_id;
    check_ranges(x, id);
  }
  tabContent(selectedTabId, selectedLabType);
}

function range_maker(key) {
  var i = 0;
  for (var data of mydata) {
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
  for (const entry of mydata) {
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

function check_ranges(x, id) {
  for (var j = 0; j < mydata.length; j++) {
    if (id == mydata[j].input_id) {
      try {
        if (id == "in_Bil(D)") {
          var bilt_val = mydata[17].value;
          if (x > bilt_val && bilt_val != 0) {
            x = bilt_val;
            document.getElementById("in_Bil(D)").value = x;
          }
        } else if (id == "in_Bil(T)") {
          var bild_val = mydata[18].value;
          if (x < bild_val) {
            document.getElementById("in_Bil(D)").value = x;
          }
        }
      } catch {}
      if (x > maxArray[j] && maxArray[j] != 0) {
        y = x / maxArray[j];
        st = " &#215 max";
        try {
          document.getElementById(outputIdArray[j] + "_img").src = high_icon;
          document.getElementById(outputIdArray[j] + "_img").style.display =
            "flex";
        } catch {}
      } else if (x < minArray[j]) {
        y = x / minArray[j];
        st = " &#215 min";
        try {
          document.getElementById(outputIdArray[j] + "_img").src = low_icon;
          document.getElementById(outputIdArray[j] + "_img").style.display =
            "flex";
        } catch {}
      } else {
        y = -1;
        st = "Normal";
        try {
          document.getElementById(outputIdArray[j] + "_img").src = nl_icon;
          document.getElementById(outputIdArray[j] + "_img").style.display =
            "flex";
        } catch {}
      }
      if (x != "" && y != -1) {
        mydata[j].status = y.toFixed(2) + st;
      }
      if (x != "" && y == -1) {
        mydata[j].status = st;
      }
      try {
        if (x > mydata[j]["critmax"] && mydata[j]["critmax"] != 0) {
          document.getElementById(outputIdArray[j] + "_warn").style.display =
            "flex";
          critValueArray[j] = 1;
        } else if (x < mydata[j]["critmin"] && x != 0) {
          document.getElementById(outputIdArray[j] + "_warn").style.display =
            "flex";
          critValueArray[j] = 1;
        } else {
          document.getElementById(outputIdArray[j] + "_warn").style.display =
            "none";
          critValueArray[j] = 0;
        }
      } catch {}
      mydata[j].value = x;
      //document.getElementById(in_id[j]).value = x;
      try {
        document.getElementById(outputIdArray[j]).innerHTML = mydata[j].status;
      } catch {}
      if (x == 0) {
        try {
          document.getElementById(outputIdArray[j]).innerHTML = "";
          document.getElementById(outputIdArray[j] + "_img").style.display =
            "none";
          document.getElementById(outputIdArray[j] + "_warn").style.display =
            "none";
        } catch {}
        mydata[j].status = 0;
      }
      break;
    }
  }
}

function id_maker(i, name) {
  mydata[i].input_id = "in_" + name.toString();
  mydata[i].output_id = "out_" + name.toString();
}

function cbc_autocomplete() {
  try {
    var p_rbc = Number(document.getElementById("in_RBC").value); //p = patient's
  } catch {
    var p_rbc = mydata[1].value;
  }
  try {
    var p_hb = Number(document.getElementById("in_Hb").value);
  } catch {
    var p_hb = mydata[2].value;
  }
  try {
    var p_mcv = Number(document.getElementById("in_MCV").value);
  } catch {
    var p_mcv = mydata[3].value;
  }
  var c_hct, c_mch, c_mchc, mcv_isnotzero;
  if (p_rbc == 0) return 0;
  if (p_mcv != 0) {
    mcv_isnotzero = true;
    c_hct = (p_rbc * p_mcv) / 10;
    c_hct = c_hct.toFixed(1);
    mydata[4].value = c_hct;
    try {
      document.getElementById("in_Hct").value = c_hct;
    } catch {}
    check_ranges(c_hct, "in_Hct");
  } else {
    mcv_isnotzero = false;
  }
  if (p_hb != 0) {
    c_mch = (p_hb * 10) / p_rbc;
    c_mch = c_mch.toFixed(1);
    mydata[5].value = c_mch;
    try {
      document.getElementById("in_MCH").value = c_mch;
    } catch {}
    check_ranges(c_mch, "in_MCH");
    if (mcv_isnotzero) {
      c_mchc = (p_hb * 100) / c_hct;
      c_mchc = c_mchc.toFixed(1);
      mydata[6].value = c_mchc;
      try {
        document.getElementById("in_MCHC").value = c_mchc;
      } catch {}
      check_ranges(c_mchc, "in_MCHC");
    }
  }
}

function iron_profile() {
  var p_hb = mydata[2].value; //p = patient's
  var p_mcv = mydata[3].value;
  var p_mch = mydata[5].value;
  var p_mchc = mydata[6].value;
  var p_crp = mydata[13].value;
  var p_si = mydata[40].value;
  var p_fe = mydata[41].value;
  var p_tibc = mydata[42].value;
  var path = "";
  var bio_color = "rgb(102, 30, 52)";
  if (p_si > 0 && p_tibc > 0) {
    calc_measurements(); //to calc TSAT
  } else {
    globalTSAT = 0;
  }
  var signsLenght = patient[0].signs[0].length;
  //to remove previous irons
  var iron_string1 = new RegExp(/iron/, "i");
  var iron_string2 = new RegExp(/chronic/, "i");
  var iron_string3 = new RegExp(/MCV/, "i");
  var iron_string4 = new RegExp(/thalassemia/, "i");
  for (i = 0; i < signsLenght; i++) {
    if (
      iron_string1.test(patient[0].signs[0][i]) ||
      iron_string2.test(patient[0].signs[0][i]) ||
      iron_string3.test(patient[0].signs[0][i]) ||
      iron_string4.test(patient[0].signs[0][i])
    ) {
      delete patient[0].signs[0][i];
      delete patient[0].signs[1][i];
      delete patient[0].signs[2][i];
    }
  }
  //returns 0 = no assessment, 1 = IDA , 11 = IronStoreDeficiency , 111= IronDeficientEryPoes
  //        2 = ACD , 3 = Thal , 4 = others , 5 = maybe mcv is wrong , 6 = no crp , false = no def
  //        12 = 1 + 2
  statisticsMaker(0);
  conditionMaker(0);
  if (p_fe <= 0) return 0; //we cant assess iron profile without ferritin
  if (p_fe < mydata[41].min) {
    path += "Ferritin < " + mydata[41].min + " &#8594 ";
    //we have IDA , now we have to find the intensity
    if (p_hb <= 0) {
      path += "Hb not entered";
      patient[0].signs[0][10] = "iron storage deficiency (w/o Hb)";
      patient[0].signs[1][10] = path;
      patient[0].signs[2][10] = bio_color;
      return 11; //atleast we have ironStoreDeficiency
    } else {
      if (p_hb < mydata[2].min) {
        path += "Hb < " + mydata[2].min + " &#8594 ";
        if (p_mcv > mydata[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          path += "MCV > " + mydata[3].max;
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
        if (p_mcv > mydata[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          path += "MCV > " + mydata[3].max;
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
    path += "Ferritin > " + mydata[41].min + " &#8594 ";
    if (p_hb <= 0) {
      //no hb and ferritin is normal
      path += "no Hb entered";
      patient[0].signs[0][10] = "no iron deficiency";
      patient[0].signs[1][10] = path;
      patient[0].signs[2][10] = bio_color;
      return false;
    } else {
      if (p_hb < mydata[2].min) {
        //anemia with nl or elevated ferritin
        path += "Hb < " + mydata[2].min + " &#8594 ";
        //now we check mcv
        if (p_mcv > mydata[3].max) {
          //we have macrocytosis so no deficiency , but maybe it is false!
          patient[0].signs[0][10] =
            "iron deficiency is unlikely with macrocytosis";
          path += "MCV > " + mydata[3].max;
          patient[0].signs[1][10] = path;
          patient[0].signs[2][10] = bio_color;
          return 5;
        } else if (p_mcv > mydata[3].min) {
          path += mydata[3].min + " < MCV < " + mydata[3].max + " &#8594 ";
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
            if (p_crp >= mydata[13].max) {
              //inflammation
              path += "CRP > " + mydata[13].max + " &#8594 ";
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
              path += "CRP < " + mydata[13].max;
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
            path += "MCV < " + mydata[3].min + " &#8594 ";
            if (p_crp <= 0) {
              //we dont have crp
              path += "CRP not entered";
              patient[0].signs[0][10] =
                "iron deficiency anemia or anemia of chronic disease or thalassemia (w/o CRP)";
              patient[0].signs[1][10] = path;
              patient[0].signs[2][10] = bio_color;
              return 12;
            } else {
              if (p_crp >= mydata[13].max) {
                //inflammation
                path += "CRP > " + mydata[13].max + " &#8594 ";
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
                path += "CRP < " + mydata[13].max;
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
        path += "Hb > " + mydata[2].min;
        patient[0].signs[0][10] = "no iron deficiency";
        patient[0].signs[1][10] = path;
        patient[0].signs[2][10] = bio_color;
        return false;
      }
    }
  }
}

function isAnemia() {
  var p_hb = mydata[2].value;
  if (p_hb <= 0) {
    return false;
  }
  if (p_hb < mydata[2].min) {
    return true;
  } else {
    return false;
  }
}

function anemiaType() {
  var p_rbc = mydata[1].value; //p = patient's
  var p_hb = mydata[2].value;
  var p_mcv = mydata[3].value;
  var p_hct = mydata[4].value;
  var p_mch = mydata[5].value;
  var p_rdw = mydata[8].value;
  var p_retic = mydata[11].value;
  var cbc_color = "darkslateblue";
  //to remove previous anemias
  anemia_string = new RegExp(/anemia/, "i");
  for (i = 0; i < patient[0].signs[0].length; i++) {
    if (anemia_string.test(patient[0].signs[0][i])) {
      delete patient[0].signs[0][i];
      delete patient[0].signs[1][i];
      delete patient[0].signs[2][i];
    }
  }

  //anemia algorithm based on RPI and MCV
  path = "";
  statisticsMaker(1);
  conditionMaker(0);
  if (p_hb <= 0) {
    //we need to check this in the function calling this function -
    return 0; //no need to access  //and if there is no hb entered unlike mcv, check for macrocytosis
  }
  if (p_hb >= mydata[2].min) {
    path += "Hb > " + mydata[2].min;
    patient[0].signs[0][2] = "no anemia";
    patient[0].signs[1][2] = path;
    patient[0].signs[2][2] = cbc_color;
    return false; //no anemia
  }

  if (p_hct > 0 && p_retic > 0) {
    calc_measurements(); // to access RPI
  } else {
    // we dont have rpi
  }
  if (p_mcv > 0) {
    path += "Hb < " + mydata[2].min + " &#8594 ";
    // we have mcv and we approach
    if (genderCoef == 0 || preg_situation == 0) {
      //this approach only for non-pregnants
      if (p_mcv < mydata[3].min) {
        //microcytic anemia
        path += " MCV < " + mydata[3].min;
        patient[0].signs[0][2] = "Microcytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
        //now we have to check Iron profile , RDW , RBC count , MCH , if we have PBS
      } else if (p_mcv < mydata[3].max) {
        //normocytic anemia
        path += mydata[3].min + " < MCV < " + mydata[3].max;
        patient[0].signs[0][2] = "Normocytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
      } else {
        //macrocytic anemia
        path += " MCV > " + mydata[3].max;
        patient[0].signs[0][2] = "Macrocytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
      }
    }
  } else {
    // we dont have mcv
    path += "Hb < " + mydata[2].min + " and no MCV entered";
    patient[0].signs[0][2] = "Anemia";
    patient[0].signs[1][2] = path;
    patient[0].signs[2][2] = cbc_color;
  }

  iron_profile();
}

function folate() {
  var p_fol = mydata[43].value;
  var p_b12 = mydata[44].value;

  if (p_fol <= 0) return false;
  //to remove previous signs
  folate_string = new RegExp(/folate/, "i");
  for (i = 0; i < patient[0].signs[0].length; i++) {
    if (folate_string.test(patient[0].signs[0][i])) {
      delete patient[0].signs[0][i];
      delete patient[0].signs[1][i];
      delete patient[0].signs[2][i];
    }
  }

  if (p_fol < mydata[43].min) {
    if (p_b12 < mydata[44].min && p_b12 > 0) {
      patient[0].signs[0][11] = "folate and b12 deficiency";
      return true;
    } else {
      patient[0].signs[0][11] = "folate deficiency";
      return true;
    }
  } else {
    return false;
  }
}

function b12() {
  var p_b12 = mydata[44].value;
  var p_fol = mydata[43].value;
  if (p_b12 <= 0) return false;
  //to remove previous signs
  b12_string = new RegExp(/b12/, "i");
  for (i = 0; i < patient[0].signs[0].length; i++) {
    if (b12_string.test(patient[0].signs[0][i])) {
      delete patient[0].signs[0][i];
      delete patient[0].signs[1][i];
      delete patient[0].signs[2][i];
    }
  }
  if (p_b12 < mydata[44].min) {
    if (p_fol < mydata[43].min && p_fol > 0) {
      patient[0].signs[0][11] = "folate and b12 deficiency";
      return true;
    } else {
      patient[0].signs[0][11] = "b12 deficiency";
      return true;
    }
  } else {
    return false;
  }
}

function conditionMaker(conditionIndex) {
  let parameters = conditions[conditionIndex].statisticsParameteresRelated;
  let oneWereMet = 0 ;
  for (let parameter in parameters) {
    if(statisticsMaker(parameter)) oneWereMet=1;
  }
  if (oneWereMet == 1) patient[0].conditions[conditionIndex] = 1 ;
  else patient[0].conditions[conditionIndex] = 0;
}

function statisticsMaker(labItemIndex) {
  if (mydata[statistics[labItemIndex].mydataIndex].value > 0) {
    patient[0].statistics[0][labItemIndex] = statisticsCalc(labItemIndex);
    patient[0].statistics[1][labItemIndex] = statistics[labItemIndex].color;
    return 1;
  } else {
    statistics[labItemIndex].currentLikelihoodRatio = 1;
    delete patient[0].statistics[0][labItemIndex];
    delete patient[0].statistics[1][labItemIndex];
    return 0;
  }
}

function statisticsCalc(labItemIndex) {
  let labItem = statistics[labItemIndex];
  let mydataItem = mydata[labItem.mydataIndex];
  let cutoffsLength = labItem.cutoffs.length;
  let currentLikelihoodRatio = 1;
  let message = "";
  if (mydataItem.value <= 0) return 0;
  for (let i = cutoffsLength - 1; i >= 0; i--) {
    if (mydataItem.value < labItem.cutoffs[i]) {
      currentLikelihoodRatio = labItem.likelihoodPositive(i).toFixed(1);
      message =
        labItem.labItemName +
        " < " +
        labItem.cutoffs[i] +
        " &#8594 chance of " +
        labItem.conditionName +
        " is " +
        currentLikelihoodRatio +
        " times higher now";
      statistics[labItemIndex].currentLikelihoodRatio = currentLikelihoodRatio;
      statistics[labItemIndex].currentCutoffIndex = i;
      PosteriorCalc(labItemIndex);
      return message;
    }
  }
  currentLikelihoodRatio = labItem.likelihoodNegative(0);
  message =
    labItem.labItemName +
    " > " +
    labItem.cutoffs[0] +
    " &#8594 chance of " +
    labItem.conditionName +
    " is " +
    scientificNumber(currentLikelihoodRatio) +
    " times lower now";
  statistics[labItemIndex].currentLikelihoodRatio = currentLikelihoodRatio;
  statistics[labItemIndex].currentCutoffIndex = 0;
  PosteriorCalc(labItemIndex);
  return message;
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

  // var power = Math.floor(Math.log10(number));
  // var m = (number * 10 ^ power).toFixed(1);
  // return m.toString() + ' &#215 10<sup>' + power.toString() + '</sup>';
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
  cr_val = mydata[30].value;
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
  var hct_val = mydata[4].value;
  var retic_val = mydata[11].value;
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
  var iron_val = mydata[40].value;
  var tibc_val = mydata[42].value;
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


