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
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  mybutton = document.getElementById("up");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function up() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function change_table_caller() {
  var id = this.id.slice(0, -1);
  if (id != "test_types_cbc") var type = id.slice(11);
  else type = "hemato";
  change_table(id, type);
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
  change_table(selectedTabId, selectedLabType);
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

  change_table(selectedTabId, selectedLabType);
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
  change_table(selectedTabId, selectedLabType);
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

function change_table(tabId, testCategory) {
  var parentElement = document.getElementById("table_shown");
  if (tabId != "tab_analyse") {
    parentElement.style.display = "grid";
    parentElement.style.flexDirection = "row";
    parentElement.style.whiteSpace = "nowrap";
  }
  var tooltip_text = document.getElementById("tooltip");
  tooltip_text.innerHTML = "";
  parentElement.innerHTML = "";
  var search_bar = document.getElementById("searchbar");
  try {
    document.getElementById("searched").remove();
  } catch {}
  selectedLabType = testCategory;
  selectedTabId = tabId;
  var selectedTab = document.getElementById(tabId);
  var tabs = document.getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.style.opacity = 0.6;
    tab.style.border = "none";
    tab.style.margin = "5px";
  }
  var screen_is_small = document.getElementById("show_tab");

  selectedTab.style.opacity = 1;
  selectedTab.style.borderWidth = "2px";
  selectedTab.style.borderColor = "rgba(255, 255, 255, 0.164)";
  selectedTab.style.borderStyle = "solid";
  selectedTab.style.margin = "5px 3px";

  selectedTab.style.display = "flex";

  if (tabId == "tab_search") {
    var search_val = document.getElementById(testCategory).value;
    var searched_items = document.createElement("div");
    searchbar_show = "block";
    //for saved search items
    searched_items.id = "searched";
    searched_items.style.color = "black";
    parentElement.before(searched_items);
    for (i = 0; i < mydata.length; i++) {
      if (pinnedOrNotArray[i] == 1) {
        var entry = mydata[i];
        var new_div = document.createElement("div");
        new_div.className = "entry_box";
        new_div.style.background = entry.color;
        new_div.id = entry.name;
        new_div.onmouseover = tooltip;
        new_div.onmouseleave = tooltip_remove;
        searched_items.appendChild(new_div);

        var new_label = document.createElement("label");
        new_label.className = "entry_label";
        new_div.appendChild(new_label);

        var new_input = document.createElement("input");
        new_input.className = "entry_input";
        new_input.type = "number";
        new_input.name = entry.name;
        new_input.style.background = entry.color;
        if (entry.value != 0) new_input.value = entry.value;
        new_input.step = entry.step;
        new_div.appendChild(new_input);

        var new_output_frame = document.createElement("div");
        new_output_frame.className = "entry_output_frame";
        new_div.appendChild(new_output_frame);

        var warn_icon = document.createElement("img");
        warn_icon.className = "warning_icon";
        warn_icon.src = "https://cdn-icons-png.flaticon.com/128/595/595067.png";
        warn_icon.style.display = "none";
        new_output_frame.appendChild(warn_icon);

        var out_icon = document.createElement("img");
        out_icon.className = "status_icon";
        new_output_frame.appendChild(out_icon);

        var new_output = document.createElement("div");
        new_output.className = "entry_output_label";
        if (entry.status != 0) new_output.innerHTML = entry.status;
        new_output_frame.appendChild(new_output);

        minArray[i] = entry.min;
        maxArray[i] = entry.max;
        id_maker(i, entry.name);
        inputIdArray[i] = entry.input_id;
        outputIdArray[i] = entry.output_id;
        new_input.id = inputIdArray[i];
        new_output.id = outputIdArray[i];
        warn_icon.id = outputIdArray[i] + "_warn";
        out_icon.id = outputIdArray[i] + "_img";
        out_icon.style.display = "none";

        var min_string, max_string; //what to write in label when it is upto or morethan
        if (minArray[i] == 0) {
          min_string = "< ";
          max_string = maxArray[i] + " ";
        } else if (maxArray[i] == 0) {
          min_string = "> " + minArray[i];
          max_string = " ";
        } else {
          min_string = minArray[i] + " - ";
          max_string = maxArray[i] + " ";
        }
        new_label.innerHTML =
          "<div style='font-size: 2rem;'>" +
          entry.name +
          "</div>" +
          min_string +
          max_string +
          entry.unit.toString();
        if (entry.status == 0) {
          out_icon.style.display = "none";
          warn_icon.style.display = "none";
        } else if (entry.status.slice(-1) == "l") {
          out_icon.style.display = "flex";
          warn_icon.style.display = "flex";
          out_icon.src = nl_icon;
        } else if (entry.status.slice(-1) == "x") {
          out_icon.style.display = "flex";
          warn_icon.style.display = "flex";
          out_icon.src = high_icon;
        } else if (entry.status.slice(-1) == "n") {
          out_icon.style.display = "flex";
          warn_icon.style.display = "flex";
          out_icon.src = low_icon;
        }
        if (critValueArray[i] == 1) {
          warn_icon.style.display = "flex";
        } else {
          warn_icon.style.display = "none";
        }
        new_input.onchange = whenAnInputChanges;
        new_input.onkeyup = whenAnInputChanges;

        var rem_button = document.createElement("img");
        rem_button.className = "rem";
        rem_button.src =
          "https://cdn-icons-png.flaticon.com/128/6342/6342193.png";
        rem_button.id = i;
        new_div.appendChild(rem_button);
        rem_button.onclick = rem_search;
      }
    }

    //for search results
    search_val = new RegExp(document.getElementById("searchbar").value, "i");
    for (i = 0; i < mydata.length; i++) {
      if (
        document.getElementById("searchbar").value != "" &&
        pinnedOrNotArray[i] != 1
      ) {
        if (
          mydata[i]["name"].search(search_val) != -1 ||
          mydata[i]["tooltip"].search(search_val) != -1
        ) {
          var entry = mydata[i];

          var new_div = document.createElement("div");
          new_div.className = "entry_box";
          new_div.style.background = entry.color;
          new_div.id = entry.name;
          new_div.onmouseover = tooltip;
          new_div.onmouseleave = tooltip_remove;
          parentElement.appendChild(new_div);

          var new_label = document.createElement("label");
          new_label.className = "entry_label";
          new_div.appendChild(new_label);

          var min_string, max_string; //what to write in label when it is upto or morethan
          if (minArray[i] == 0) {
            min_string = "< ";
            max_string = maxArray[i] + " ";
          } else if (maxArray[i] == 0) {
            min_string = "> " + minArray[i];
            max_string = " ";
          } else {
            min_string = minArray[i] + " - ";
            max_string = maxArray[i] + " ";
          }
          new_label.innerHTML =
            "<div style='font-size: 2rem;'>" +
            entry.name +
            "</div>" +
            min_string +
            max_string +
            entry.unit.toString();

          var new_input = document.createElement("input");
          new_input.type = "number";
          new_input.className = "entry_input";
          new_input.name = entry.name;
          new_input.style.background = entry.color;
          if (entry.value != 0) new_input.value = entry.value;
          new_input.step = entry.step;
          new_div.appendChild(new_input);

          var new_output_frame = document.createElement("div");
          new_output_frame.className = "entry_output_frame";
          new_div.appendChild(new_output_frame);

          var warn_icon = document.createElement("img");
          warn_icon.className = "warning_icon";
          warn_icon.src =
            "https://cdn-icons-png.flaticon.com/128/595/595067.png";
          warn_icon.style.display = "none";
          new_output_frame.appendChild(warn_icon);

          var out_icon = document.createElement("img");
          out_icon.className = "status_icon";
          new_output_frame.appendChild(out_icon);

          var new_output = document.createElement("div");
          new_output.className = "entry_output_label";
          if (entry.status != 0) new_output.innerHTML = entry.status;
          new_output_frame.appendChild(new_output);

          minArray[i] = entry.min;
          maxArray[i] = entry.max;
          id_maker(i, entry.name);
          inputIdArray[i] = entry.input_id;
          outputIdArray[i] = entry.output_id;
          new_input.id = inputIdArray[i];
          new_output.id = outputIdArray[i];
          out_icon.id = outputIdArray[i] + "_img";
          warn_icon.id = outputIdArray[i] + "_warn";
          out_icon.style.display = "none";
          if (entry.status == 0) {
            out_icon.style.display = "none";
          } else if (entry.status.slice(-1) == "l") {
            out_icon.style.display = "flex";
            out_icon.src = nl_icon;
          } else if (entry.status.slice(-1) == "x") {
            out_icon.style.display = "flex";
            out_icon.src = high_icon;
          } else if (entry.status.slice(-1) == "n") {
            out_icon.style.display = "flex";
            out_icon.src = low_icon;
          }
          if (critValueArray[i] == 1) {
            warn_icon.style.display = "flex";
          } else {
            warn_icon.style.display = "none";
          }
          new_input.onchange = whenAnInputChanges;
          new_input.onkeyup = whenAnInputChanges;

          var add_button = document.createElement("img");
          add_button.className = "add";
          add_button.src =
            "https://cdn-icons-png.flaticon.com/512/2972/2972186.png";
          add_button.id = i;
          add_button.onclick = add_search;
          new_div.appendChild(add_button);
        }
      }
    }
  } else {
    searchbar_show = "none";
  }
  search_bar.style.display = searchbar_show;
  //for usual tabs
  if (testCategory != "searchbar" && testCategory != "analyse") {
    for (i = 0; i < mydata.length; i++) {
      if (mydata[i]["type"] == testCategory) {
        var entry = mydata[i];
        var new_div = document.createElement("div");
        new_div.className = "entry_box";
        new_div.style.background = entry.color;
        new_div.id = entry.name;
        new_div.onmouseover = tooltip;
        new_div.onmouseleave = tooltip_remove;
        parentElement.appendChild(new_div);

        var new_label = document.createElement("label");
        new_label.className = "entry_label";
        new_div.appendChild(new_label);

        var min_string, max_string; //what to write in label when it is upto or morethan
        if (minArray[i] == 0) {
          min_string = "< ";
          max_string = maxArray[i] + " ";
        } else if (maxArray[i] == 0) {
          min_string = "> " + minArray[i];
          max_string = " ";
        } else {
          min_string = minArray[i] + " - ";
          max_string = maxArray[i] + " ";
        }
        new_label.innerHTML =
          "<div style='font-size: 2rem;'>" +
          entry.name +
          "</div>" +
          min_string +
          max_string +
          entry.unit.toString();

        var new_input = document.createElement("input");
        new_input.type = "number";
        new_input.className = "entry_input";
        new_input.name = entry.name;
        new_input.style.background = entry.color;
        if (entry.value != 0) new_input.value = entry.value;
        new_input.step = entry.step;
        new_div.appendChild(new_input);

        var new_output_frame = document.createElement("div");
        new_output_frame.className = "entry_output_frame";
        new_div.appendChild(new_output_frame);

        var warn_icon = document.createElement("img");
        warn_icon.className = "warning_icon";
        warn_icon.src = "https://cdn-icons-png.flaticon.com/128/595/595067.png";
        warn_icon.style.display = "none";
        new_output_frame.appendChild(warn_icon);

        var out_icon = document.createElement("img");
        out_icon.className = "status_icon";
        new_output_frame.appendChild(out_icon);

        var new_output = document.createElement("div");
        new_output.className = "entry_output_label";
        if (entry.status != 0) new_output.innerHTML = entry.status;
        new_output_frame.appendChild(new_output);

        minArray[i] = entry.min;
        maxArray[i] = entry.max;
        id_maker(i, entry.name);
        inputIdArray[i] = entry.input_id;
        outputIdArray[i] = entry.output_id;
        new_input.id = inputIdArray[i];
        new_output.id = outputIdArray[i];
        out_icon.id = outputIdArray[i] + "_img";
        warn_icon.id = outputIdArray[i] + "_warn";
        out_icon.style.display = "none";
        if (entry.status == 0) {
          out_icon.style.display = "none";
        } else if (entry.status.slice(-1) == "l") {
          out_icon.style.display = "flex";
          out_icon.src = nl_icon;
        } else if (entry.status.slice(-1) == "x") {
          out_icon.style.display = "flex";
          out_icon.src = high_icon;
        } else if (entry.status.slice(-1) == "n") {
          out_icon.style.display = "flex";
          out_icon.src = low_icon;
        }
        if (critValueArray[i] == 1) {
          warn_icon.style.display = "flex";
        } else {
          warn_icon.style.display = "none";
        }
        new_input.onchange = whenAnInputChanges;
        new_input.onkeyup = whenAnInputChanges;
      }
    }
  }

  //for analyse
  if (tabId == "tab_analyse") {
    anemiaType();
    iron_profile();
    folate();
    b12();
    calc_measurements();
    parentElement.style.display = "flex";
    parentElement.style.flexDirection = "column";
    parentElement.style.whiteSpace = "normal";
    var measurements_parent = document.createElement("div");
    measurements_parent.className = "measurements_parent";
    parentElement.appendChild(measurements_parent);
    measurements_parent.innerHTML = "Found Measurements: ";
    for (i = 0; i < measurements.length; i++) {
      try {
        if (measurements[i].value != 0) {
          var measurements_section = document.createElement("div");
          measurements_section.id = "measurement" + i;
          measurements_section.className = "measurements_section";
          measurements_section.innerHTML =
            measurements[i].name + "= " + measurements[i].value;
          measurements_parent.appendChild(measurements_section);
          measurements_section.style.backgroundColor = measurements[i].color;
          measurements_section.onmouseover = tooltip;
          measurements_section.onmouseleave = tooltip_remove;
        }
      } catch {}
    }

    var findings_parent = document.createElement("div");
    findings_parent.className = "findings_parent";
    parentElement.appendChild(findings_parent);
    findings_parent.innerHTML = "Findings based on Clinical Guidelines: ";
    for (i = 0; i < patient[0].signs[0].length; i++) {
      var signs_section = document.createElement("div");
      signs_section.className = "signs_section";

      var path_section = document.createElement("div");
      path_section.className = "path_section";
      path_section.id = "path" + i;
      if (patient[0].signs[0][i] != undefined) {
        findings_parent.appendChild(signs_section);
        signs_section.innerHTML = patient[0].signs[0][i];
        signs_section.appendChild(path_section);
        path_section.innerHTML = " + ";
        path_section.onclick = show_path;
        signs_section.style.backgroundColor = patient[0].signs[2][i];
        //signs_section.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
      }
    }
    var statisticsParent = document.createElement("div");
    statisticsParent.className = "statisticsParent";
    parentElement.appendChild(statisticsParent);
    statisticsParent.innerHTML = "Evidence Based Statistics: ";
    for (let i = 0; i < patient[0].statistics[0].length; i++) {
      var statisticsEntry = document.createElement("div");
      statisticsEntry.className = "statisticsEntry";
      if (patient[0].statistics[0][i] != undefined) {
        statisticsParent.appendChild(statisticsEntry);
        statisticsEntry.style.backgroundColor = patient[0].statistics[1][i];
        var statisticsFirstLabel = document.createElement("div");
        statisticsFirstLabel.className = "statisticsFirstLabel";
        statisticsFirstLabel.innerHTML = patient[0].statistics[0][i] + "<br>";
        statisticsEntry.appendChild(statisticsFirstLabel);

        let currentCutoffIndex = statistics[i].currentCutoffIndex;
        let sens = (
          statistics[i].sensitivities[currentCutoffIndex] * 100
        ).toFixed(2);
        let spec = (
          statistics[i].specificities[currentCutoffIndex] * 100
        ).toFixed(2);
        var additionalStatistics = document.createElement("div");
        additionalStatistics.className = "additionalStatistics";
        additionalStatistics.innerHTML =
          "<b>Sensitivity</b> " +
          sens +
          "%<br><b>Specificity</b> " +
          spec +
          "%";
        statisticsEntry.appendChild(additionalStatistics);
      }
    }
    for (let i = 0; i < patient[0].conditions.length; i++) {
      if (patient[0].conditions[i] == 1) {
        var prevalenceParent = document.createElement("div");
        prevalenceParent.className = "prevalenceParent";
        prevalenceParent.style.backgroundColor = conditions[i].color;
        statisticsParent.appendChild(prevalenceParent);
        var prevalencePreLabel = document.createElement("div");
        prevalencePreLabel.className = "prevalencePreLabel";
        prevalenceParent.appendChild(prevalencePreLabel);
        prevalencePreLabel.innerHTML =
          "Prevalence (%) of " + conditions[i].name + " is: ";
        var prevalenceInput = document.createElement("input");
        prevalenceInput.type = "number";
        prevalenceInput.className = "prevalenceInput";
        prevalenceInput.name = conditions[i].name;
        prevalenceInput.id = "prevalence_" + i;
        prevalenceInput.style.backgroundColor = conditions[i].color;
        if (conditions[i].prevalenceValue != 0) {
          prevalenceInput.value = conditions[i].prevalenceValue;
        }
        prevalenceInput.onchange = prevalenceChange;
        prevalenceInput.onkeyup = prevalenceChange;
        prevalenceParent.appendChild(prevalenceInput);
        var prevalencePostLabel = document.createElement("div");
        prevalencePostLabel.className = "prevalencePostLabel";
        prevalenceParent.appendChild(prevalencePostLabel);
        prevalencePostLabel.innerHTML =
          "probability of " + conditions[i].name + " is now: ";
        var prevalenceResult = document.createElement("div");
        prevalenceResult.className = "prevalenceResult";
        if (conditions[i].posteriorDistribution < 1)
          prevalenceResult.innerHTML =
            scientificNumber(conditions[i].posteriorDistribution) + "%";
        else
          prevalenceResult.innerHTML =
            conditions[i].posteriorDistribution.toFixed(2) + "%";
        prevalenceResult.id = "prevalenceResult_" + i;
        prevalenceParent.appendChild(prevalenceResult);
      }
    }
  }
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
  change_table("tab_search", "searchbar");
}

function rem_search() {
  let id = this.id;
  pinnedOrNotArray[id] = 0;
  change_table("tab_search", "searchbar");
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

var patient = [
  {
    name: "patient 1",
    conditions: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      ["", "", "", "", "", "", "", ""],
    ],
    signs: [[], [], []],
    statistics: [[], []],
  },
];

var statistics = [
  {
    name: "ferritinID",
    labItemName: "Ferritin",
    conditionName: "iron deficiency",
    conditionIndex: 0,
    cutoffs: [30, 15],
    sensitivities: [0.92, 0.57],
    specificities: [0.98, 0.99],
    likelihoodPositive(cutoffIndex) {
      let sens = this.sensitivities[cutoffIndex];
      let spec = this.specificities[cutoffIndex];
      let lrp = sens / (1 - spec);
      return lrp;
    },
    likelihoodNegative(cutoffIndex) {
      let sens = this.sensitivities[cutoffIndex];
      let spec = this.specificities[cutoffIndex];
      let lrn = (1 - sens) / spec;
      return lrn;
    },
    mydataIndex: 41,
    currentLikelihoodRatio: 1,
    currentCutoffIndex: 0,
    color: "rgb(102, 30, 52)",
  },
  {
    name: "HbID",
    labItemName: "Hemoglobin",
    conditionName: "iron deficiency",
    conditionIndex: 0,
    cutoffs: [12.8],
    sensitivities: [0.713],
    specificities: [0.793],
    likelihoodPositive(cutoffIndex) {
      let sens = this.sensitivities[cutoffIndex];
      let spec = this.specificities[cutoffIndex];
      let lrp = sens / (1 - spec);
      return lrp;
    },
    likelihoodNegative(cutoffIndex) {
      let sens = this.sensitivities[cutoffIndex];
      let spec = this.specificities[cutoffIndex];
      let lrn = (1 - sens) / spec;
      return lrn;
    },
    mydataIndex: 2,
    currentLikelihoodRatio: 1,
    currentCutoffIndex: 0,
    color: "darkslateblue",
  },
];

var conditions = [
  {
    name: "iron deficiency",
    statisticsParameteresRelated: [0, 1],
    likelihoodRatio: 1,
    prevalenceValue: 13.5,
    posteriorDistribution: 13.5,
    color: "rgb(102, 30, 52)",
  },
];

var measurements = [
  {
    name: "BMI",
    value: 0,
    color: "rgb(38, 3, 58)",
    tooltip: "Body Mass Index",
  },
  {
    name: "Weight percentile",
    value: 0,
    color: "rgb(38, 3, 58)",
    tooltip: "Weight percentile based on gender and age",
  },
  {
    name: "Height percentile",
    value: 0,
    color: "rgb(38, 3, 58)",
    tooltip: "Height percentile based on gender and age",
  },
  {
    name: "CRC",
    value: 0,
    color: "darkslateblue",
    tooltip: "Corrected Reticulocyte Count",
  },
  {
    name: "RPI",
    value: 0,
    color: "darkslateblue",
    tooltip:
      "Reticulocyte Production Index (use when Polychromasia is present)",
  },
  {
    name: "GFR (CKD-EPI)",
    value: 0,
    color: "rgb(128, 70, 32)",
    tooltip: "Estimated Glomerular Filtration Rate based on CKD-EPI Equations",
  },
  {
    name: "GFR (MDRD)",
    value: 0,
    color: "rgb(128, 70, 32)",
    tooltip: "Estimated Glomerular Filtration Rate based on MDRD Equation",
  },
  {
    name: "GFR (Cockcroft)",
    value: 0,
    color: "rgb(128, 70, 32)",
    tooltip:
      "Estimated Glomerular Filtration Rate based on Cockcroft-Gault Equation",
  },

  {
    name: "TSAT",
    value: 0,
    color: "rgb(102, 30, 52)",
    tooltip: "Transferin saturation (Iron / TIBC)",
  },
];

var weightAgeInfantJSON = [
  {
    Age: "0",
    L: "1.815151075",
    M: "3.530203168",
    S: "0.152385273",
    L2: "1.509187507",
    M2: "3.39918645",
    S2: "0.142106724",
    "": "",
  },
  {
    Age: "0.5",
    L: "1.547523128",
    M: "4.003106424",
    S: "0.146025021",
    L2: "1.357944315",
    M2: "3.79752846",
    S2: "0.138075916",
    "": "",
  },
  {
    Age: "1.5",
    L: "1.068795548",
    M: "4.879525083",
    S: "0.136478767",
    L2: "1.105537708",
    M2: "4.544776513",
    S2: "0.131733888",
    "": "",
  },
  {
    Age: "2.5",
    L: "0.695973505",
    M: "5.672888765",
    S: "0.129677511",
    L2: "0.902596648",
    M2: "5.230584214",
    S2: "0.126892697",
    "": "",
  },
  {
    Age: "3.5",
    L: "0.41981509",
    M: "6.391391982",
    S: "0.124717085",
    L2: "0.734121414",
    M2: "5.859960798",
    S2: "0.123025182",
    "": "",
  },
  {
    Age: "4.5",
    L: "0.219866801",
    M: "7.041836432",
    S: "0.121040119",
    L2: "0.590235275",
    M2: "6.437587751",
    S2: "0.119840911",
    "": "",
  },
  {
    Age: "5.5",
    L: "0.077505598",
    M: "7.630425182",
    S: "0.1182712",
    L2: "0.464391566",
    M2: "6.967850457",
    S2: "0.117166868",
    "": "",
  },
  {
    Age: "6.5",
    L: "-0.02190761",
    M: "8.162951035",
    S: "0.116153695",
    L2: "0.352164071",
    M2: "7.454854109",
    S2: "0.11489384",
    "": "",
  },
  {
    Age: "7.5",
    L: "-0.0894409",
    M: "8.644832479",
    S: "0.114510349",
    L2: "0.250497889",
    M2: "7.902436186",
    S2: "0.112949644",
    "": "",
  },
  {
    Age: "8.5",
    L: "-0.1334091",
    M: "9.081119817",
    S: "0.113217163",
    L2: "0.15724751",
    M2: "8.314178377",
    S2: "0.11128469",
    "": "",
  },
  {
    Age: "9.5",
    L: "-0.1600954",
    M: "9.476500305",
    S: "0.11218624",
    L2: "0.070885725",
    M2: "8.693418423",
    S2: "0.109863709",
    "": "",
  },
  {
    Age: "10.5",
    L: "-0.17429685",
    M: "9.835307701",
    S: "0.111354536",
    L2: "-0.00968493",
    M2: "9.043261854",
    S2: "0.10866078",
    "": "",
  },
  {
    Age: "11.5",
    L: "-0.1797189",
    M: "10.16153567",
    S: "0.110676413",
    L2: "-0.085258",
    M2: "9.366593571",
    S2: "0.10765621",
    "": "",
  },
  {
    Age: "12.5",
    L: "-0.179254",
    M: "10.45885399",
    S: "0.110118635",
    L2: "-0.15640945",
    M2: "9.666089185",
    S2: "0.106834517",
    "": "",
  },
  {
    Age: "13.5",
    L: "-0.17518447",
    M: "10.7306256",
    S: "0.109656941",
    L2: "-0.22355869",
    M2: "9.944226063",
    S2: "0.106183085",
    "": "",
  },
  {
    Age: "14.5",
    L: "-0.16932268",
    M: "10.97992482",
    S: "0.109273653",
    L2: "-0.28701346",
    M2: "10.20329397",
    S2: "0.105691242",
    "": "",
  },
  {
    Age: "15.5",
    L: "-0.1631139",
    M: "11.20955529",
    S: "0.10895596",
    L2: "-0.34699919",
    M2: "10.4454058",
    S2: "0.105349631",
    "": "",
  },
  {
    Age: "16.5",
    L: "-0.15770999",
    M: "11.4220677",
    S: "0.108694678",
    L2: "-0.40368918",
    M2: "10.67250698",
    S2: "0.105149754",
    "": "",
  },
  {
    Age: "17.5",
    L: "-0.15402279",
    M: "11.61977698",
    S: "0.108483324",
    L2: "-0.45721877",
    M2: "10.88638558",
    S2: "0.105083666",
    "": "",
  },
  {
    Age: "18.5",
    L: "-0.15276214",
    M: "11.80477902",
    S: "0.108317416",
    L2: "-0.50770077",
    M2: "11.08868151",
    S2: "0.105143752",
    "": "",
  },
  {
    Age: "19.5",
    L: "-0.15446658",
    M: "11.9789663",
    S: "0.108193944",
    L2: "-0.55523599",
    M2: "11.28089537",
    S2: "0.105322575",
    "": "",
  },
  {
    Age: "20.5",
    L: "-0.15952202",
    M: "12.14404334",
    S: "0.108110954",
    L2: "-0.59992113",
    M2: "11.46439708",
    S2: "0.10561278",
    "": "",
  },
  {
    Age: "21.5",
    L: "-0.16817926",
    M: "12.30154103",
    S: "0.108067236",
    L2: "-0.64185418",
    M2: "11.64043402",
    S2: "0.106007025",
    "": "",
  },
  {
    Age: "22.5",
    L: "-0.1805668",
    M: "12.45283028",
    S: "0.108062078",
    L2: "-0.6811381",
    M2: "11.81013895",
    S2: "0.106497957",
    "": "",
  },
  {
    Age: "23.5",
    L: "-0.19670196",
    M: "12.59913494",
    S: "0.108095077",
    L2: "-0.71788283",
    M2: "11.97453748",
    S2: "0.107078197",
    "": "",
  },
  {
    Age: "24.5",
    L: "-0.21650121",
    M: "12.74154396",
    S: "0.108166005",
    L2: "-0.75220617",
    M2: "12.13455528",
    S2: "0.107740346",
    "": "",
  },
  {
    Age: "25.5",
    L: "-0.23979048",
    M: "12.88102276",
    S: "0.108274705",
    L2: "-0.78423359",
    M2: "12.2910249",
    S2: "0.108477009",
    "": "",
  },
  {
    Age: "26.5",
    L: "-0.26631585",
    M: "13.01842382",
    S: "0.108421024",
    L2: "-0.81409743",
    M2: "12.44469237",
    S2: "0.109280822",
    "": "",
  },
  {
    Age: "27.5",
    L: "-0.29575496",
    M: "13.1544966",
    S: "0.108604769",
    L2: "-0.8419355",
    M2: "12.59622335",
    S2: "0.110144488",
    "": "",
  },
  {
    Age: "28.5",
    L: "-0.32772936",
    M: "13.28989667",
    S: "0.108825681",
    L2: "-0.86788939",
    M2: "12.74620911",
    S2: "0.111060814",
    "": "",
  },
  {
    Age: "29.5",
    L: "-0.36181746",
    M: "13.42519408",
    S: "0.109083423",
    L2: "-0.89210264",
    M2: "12.89517218",
    S2: "0.112022758",
    "": "",
  },
  {
    Age: "30.5",
    L: "-0.39756808",
    M: "13.56088113",
    S: "0.109377581",
    L2: "-0.91471881",
    M2: "13.04357164",
    S2: "0.113023466",
    "": "",
  },
  {
    Age: "31.5",
    L: "-0.43452025",
    M: "13.69737858",
    S: "0.109707646",
    L2: "-0.93587966",
    M2: "13.19180827",
    S2: "0.114056316",
    "": "",
  },
  {
    Age: "32.5",
    L: "-0.47218875",
    M: "13.83504622",
    S: "0.110073084",
    L2: "-0.95572344",
    M2: "13.34022934",
    S2: "0.115114952",
    "": "",
  },
  {
    Age: "33.5",
    L: "-0.51012309",
    M: "13.97418199",
    S: "0.110473238",
    L2: "-0.97438101",
    M2: "13.48913357",
    S2: "0.116193337",
    "": "",
  },
  {
    Age: "34.5",
    L: "-0.54788557",
    M: "14.1150324",
    S: "0.1109074",
    L2: "-0.99198075",
    M2: "13.63877446",
    S2: "0.11728575",
    "": "",
  },
  {
    Age: "35.5",
    L: "-0.5850701",
    M: "14.25779618",
    S: "0.111374787",
    L2: "-1.00864074",
    M2: "13.78936547",
    S2: "0.118386847",
    "": "",
  },
  {
    Age: "36",
    L: "-0.60333785",
    M: "14.32994444",
    S: "0.111620652",
    L2: "-1.01665314",
    M2: "13.86507382",
    S2: "0.118939087",
    "": "",
  },
];
var heightAgeInfantJSON = [
  {
    Age: "0",
    L: "1.267004226",
    M: "49.98888408",
    S: "0.053112191",
    L2: "-1.295960857",
    M2: "49.28639612",
    S2: "0.05008556",
    "": "",
  },
  {
    Age: "0.5",
    L: "0.511237696",
    M: "52.6959753",
    S: "0.048692684",
    L2: "-0.809249882",
    M2: "51.68358057",
    S2: "0.046818545",
    "": "",
  },
  {
    Age: "1.5",
    L: "-0.45224446",
    M: "56.62842855",
    S: "0.04411683",
    L2: "-0.050782985",
    M2: "55.28612813",
    S2: "0.0434439",
    "": "",
  },
  {
    Age: "2.5",
    L: "-0.990594599",
    M: "59.60895343",
    S: "0.041795583",
    L2: "0.476851407",
    M2: "58.09381906",
    S2: "0.041716103",
    "": "",
  },
  {
    Age: "3.5",
    L: "-1.285837689",
    M: "62.07700027",
    S: "0.040454126",
    L2: "0.843299612",
    M2: "60.45980763",
    S2: "0.040705173",
    "": "",
  },
  {
    Age: "4.5",
    L: "-1.43031238",
    M: "64.2168641",
    S: "0.039633879",
    L2: "1.097562257",
    M2: "62.53669656",
    S2: "0.040079765",
    "": "",
  },
  {
    Age: "5.5",
    L: "-1.47657547",
    M: "66.1253149",
    S: "0.039123813",
    L2: "1.272509641",
    M2: "64.40632762",
    S2: "0.039686845",
    "": "",
  },
  {
    Age: "6.5",
    L: "-1.456837849",
    M: "67.8601799",
    S: "0.038811994",
    L2: "1.390428859",
    M2: "66.11841553",
    S2: "0.039444555",
    "": "",
  },
  {
    Age: "7.5",
    L: "-1.391898768",
    M: "69.45908458",
    S: "0.038633209",
    L2: "1.466733925",
    M2: "67.70574419",
    S2: "0.039304738",
    "": "",
  },
  {
    Age: "8.5",
    L: "-1.29571459",
    M: "70.94803912",
    S: "0.038546833",
    L2: "1.512301976",
    M2: "69.19123614",
    S2: "0.03923711",
    "": "",
  },
  {
    Age: "9.5",
    L: "-1.177919048",
    M: "72.34586111",
    S: "0.038526262",
    L2: "1.534950767",
    M2: "70.59163924",
    S2: "0.039221665",
    "": "",
  },
  {
    Age: "10.5",
    L: "-1.045326049",
    M: "73.6666541",
    S: "0.038553387",
    L2: "1.540390875",
    M2: "71.91961673",
    S2: "0.039244672",
    "": "",
  },
  {
    Age: "11.5",
    L: "-0.902800887",
    M: "74.92129717",
    S: "0.038615501",
    L2: "1.532852892",
    M2: "73.1850104",
    S2: "0.03929642",
    "": "",
  },
  {
    Age: "12.5",
    L: "-0.753908107",
    M: "76.11837536",
    S: "0.038703461",
    L2: "1.51550947",
    M2: "74.39564379",
    S2: "0.039369875",
    "": "",
  },
  {
    Age: "13.5",
    L: "-0.601263523",
    M: "77.26479911",
    S: "0.038810557",
    L2: "1.490765028",
    M2: "75.5578544",
    S2: "0.039459832",
    "": "",
  },
  {
    Age: "14.5",
    L: "-0.446805039",
    M: "78.36622309",
    S: "0.038931784",
    L2: "1.460458255",
    M2: "76.67685871",
    S2: "0.039562382",
    "": "",
  },
  {
    Age: "15.5",
    L: "-0.291974772",
    M: "79.4273405",
    S: "0.039063356",
    L2: "1.426006009",
    M2: "77.75700986",
    S2: "0.039674542",
    "": "",
  },
  {
    Age: "16.5",
    L: "-0.13784767",
    M: "80.45209492",
    S: "0.039202382",
    L2: "1.388507095",
    M2: "78.80198406",
    S2: "0.03979401",
    "": "",
  },
  {
    Age: "17.5",
    L: "0.014776155",
    M: "81.44383603",
    S: "0.039346629",
    L2: "1.348818127",
    M2: "79.81491852",
    S2: "0.039918994",
    "": "",
  },
  {
    Age: "18.5",
    L: "0.165304169",
    M: "82.40543643",
    S: "0.039494365",
    L2: "1.307609654",
    M2: "80.79851532",
    S2: "0.040048084",
    "": "",
  },
  {
    Age: "19.5",
    L: "0.313301809",
    M: "83.33938063",
    S: "0.039644238",
    L2: "1.265408149",
    M2: "81.75512092",
    S2: "0.040180162",
    "": "",
  },
  {
    Age: "20.5",
    L: "0.458455471",
    M: "84.24783394",
    S: "0.039795189",
    L2: "1.222627732",
    M2: "82.6867881",
    S2: "0.04031434",
    "": "",
  },
  {
    Age: "21.5",
    L: "0.600544631",
    M: "85.13269658",
    S: "0.039946388",
    L2: "1.179594365",
    M2: "83.59532461",
    S2: "0.040449904",
    "": "",
  },
  {
    Age: "22.5",
    L: "0.739438953",
    M: "85.9956488",
    S: "0.040097181",
    L2: "1.136564448",
    M2: "84.48233206",
    S2: "0.040586283",
    "": "",
  },
  {
    Age: "23.5",
    L: "0.875000447",
    M: "86.8381751",
    S: "0.04024706",
    L2: "1.093731947",
    M2: "85.34923624",
    S2: "0.040723015",
    "": "",
  },
  {
    Age: "24.5",
    L: "1.00720807",
    M: "87.66160934",
    S: "0.040395626",
    L2: "1.051272912",
    M2: "86.1973169",
    S2: "0.040859727",
    "": "",
  },
  {
    Age: "25.5",
    L: "0.837251351",
    M: "88.45247282",
    S: "0.040577525",
    L2: "1.041951175",
    M2: "87.09026318",
    S2: "0.041142161",
    "": "",
  },
  {
    Age: "26.5",
    L: "0.681492975",
    M: "89.22326434",
    S: "0.040723122",
    L2: "1.012592236",
    M2: "87.95714182",
    S2: "0.041349399",
    "": "",
  },
  {
    Age: "27.5",
    L: "0.538779654",
    M: "89.97549228",
    S: "0.040833194",
    L2: "0.970541909",
    M2: "88.7960184",
    S2: "0.041500428",
    "": "",
  },
  {
    Age: "28.5",
    L: "0.407697153",
    M: "90.71040853",
    S: "0.040909059",
    L2: "0.921129988",
    M2: "89.6055115",
    S2: "0.041610508",
    "": "",
  },
  {
    Age: "29.5",
    L: "0.286762453",
    M: "91.42907762",
    S: "0.040952433",
    L2: "0.868221392",
    M2: "90.38476689",
    S2: "0.041691761",
    "": "",
  },
  {
    Age: "30.5",
    L: "0.174489485",
    M: "92.13242379",
    S: "0.04096533",
    L2: "0.81454413",
    M2: "91.13341722",
    S2: "0.04175368",
    "": "",
  },
  {
    Age: "31.5",
    L: "0.069444521",
    M: "92.82127167",
    S: "0.040949976",
    L2: "0.761957977",
    M2: "91.8515436",
    S2: "0.041803562",
    "": "",
  },
  {
    Age: "32.5",
    L: "-0.029720564",
    M: "93.49637946",
    S: "0.040908737",
    L2: "0.711660228",
    M2: "92.5396352",
    S2: "0.041846882",
    "": "",
  },
  {
    Age: "33.5",
    L: "-0.124251789",
    M: "94.15846546",
    S: "0.040844062",
    L2: "0.664323379",
    M2: "93.19854429",
    S2: "0.041887626",
    "": "",
  },
  {
    Age: "34.5",
    L: "-0.215288396",
    M: "94.80822923",
    S: "0.040758431",
    L2: "0.620285102",
    M2: "93.82945392",
    S2: "0.041928568",
    "": "",
  },
  {
    Age: "35.5",
    L: "-0.30385434",
    M: "95.44636981",
    S: "0.040654312",
    L2: "0.57955631",
    M2: "94.43382278",
    S2: "0.041971514",
    "": "",
  },
];
var weightAgeJSON = [
  {
    Age: "3",
    L: "-0.621319726",
    M: "14.40262749",
    S: "0.111874514",
    L2: "-1.024471278",
    M2: "13.94108332",
    S2: "0.119491669",
    "": "",
  },
  {
    Age: "4",
    L: "-0.915241589",
    M: "16.31676727",
    S: "0.11995532",
    L2: "-1.177029925",
    M2: "15.87823668",
    S2: "0.131802186",
    "": "",
  },
  {
    Age: "5",
    L: "-1.000453886",
    M: "18.48592413",
    S: "0.129879257",
    L2: "-1.287691525",
    M2: "18.02313904",
    S2: "0.141190842",
    "": "",
  },
  {
    Age: "6",
    L: "-1.087471249",
    M: "20.77769565",
    S: "0.139142773",
    L2: "-1.326763834",
    M2: "20.33635961",
    S2: "0.149589838",
    "": "",
  },
  {
    Age: "7",
    L: "-1.236497304",
    M: "23.16741888",
    S: "0.147337375",
    L2: "-1.265548787",
    M2: "22.86804258",
    S2: "0.159693163",
    "": "",
  },
  {
    Age: "8",
    L: "-1.351813296",
    M: "25.75256528",
    S: "0.155973912",
    L2: "-1.127684095",
    M2: "25.7570168",
    S2: "0.172147043",
    "": "",
  },
  {
    Age: "9",
    L: "-1.339405453",
    M: "28.68130005",
    S: "0.166659247",
    L2: "-0.970685789",
    M2: "29.14291171",
    S2: "0.185201039",
    "": "",
  },
  {
    Age: "10",
    L: "-1.206688407",
    M: "32.08799062",
    S: "0.17892874",
    L2: "-0.846872805",
    M2: "33.06392318",
    S2: "0.195947008",
    "": "",
  },
  {
    Age: "11",
    L: "-1.019277299",
    M: "36.07262569",
    S: "0.190029545",
    L2: "-0.787374433",
    M2: "37.39088668",
    S2: "0.201971282",
    "": "",
  },
  {
    Age: "12",
    L: "-0.836961905",
    M: "40.67443658",
    S: "0.196591612",
    L2: "-0.807599577",
    M2: "41.82797963",
    S2: "0.202298783",
    "": "",
  },
  {
    Age: "13",
    L: "-0.698166437",
    M: "45.81336172",
    S: "0.196662115",
    L2: "-0.915513542",
    M2: "45.98368656",
    S2: "0.197363191",
    "": "",
  },
  {
    Age: "14",
    L: "-0.631876912",
    M: "51.23096332",
    S: "0.190808471",
    L2: "-1.111606122",
    M2: "49.49075409",
    S2: "0.188559804",
    "": "",
  },
  {
    Age: "15",
    L: "-0.665609025",
    M: "56.49095862",
    S: "0.181665781",
    L2: "-1.376478254",
    M2: "52.13568193",
    S2: "0.177946804",
    "": "",
  },
  {
    Age: "16",
    L: "-0.801993069",
    M: "61.09536847",
    S: "0.172459052",
    L2: "-1.651248208",
    M2: "53.94543725",
    S2: "0.168124538",
    "": "",
  },
  {
    Age: "17",
    L: "-0.973244762",
    M: "64.69961427",
    S: "0.16564009",
    L2: "-1.838091576",
    M2: "55.18216811",
    S2: "0.161752634",
    "": "",
  },
  {
    Age: "18",
    L: "-1.066224038",
    M: "67.28992603",
    S: "0.161922819",
    L2: "-1.850946286",
    M2: "56.22969564",
    S2: "0.16036959",
    "": "",
  },
  {
    Age: "19",
    L: "-1.023291946",
    M: "69.19467288",
    S: "0.160138158",
    L2: "-1.693267093",
    M2: "57.35175792",
    S2: "0.163138124",
    "": "",
  },
  {
    Age: "20",
    L: "-0.91648762",
    M: "70.59761453",
    S: "0.161476792",
    L2: "-1.51336185",
    M2: "58.21897289",
    S2: "0.166644749",
    "": "",
  },
];
var heightAgeJSON = [
  {
    Age: "3",
    L: "-0.390918369",
    M: "95.27359106",
    S: "0.04053412",
    L2: "0.54198094",
    M2: "94.21335709",
    S2: "0.042017509",
    "": "",
  },
  {
    Age: "4",
    L: "0.827636736",
    M: "102.5104735",
    S: "0.041344257",
    L2: "0.225705996",
    M2: "101.033927",
    S2: "0.043259907",
    "": "",
  },
  {
    Age: "5",
    L: "1.266367398",
    M: "109.1751441",
    S: "0.042593311",
    L2: "-0.057729947",
    M2: "107.9566031",
    S2: "0.044276588",
    "": "",
  },
  {
    Age: "6",
    L: "1.137442868",
    M: "115.6608862",
    S: "0.043673359",
    L2: "-0.219069129",
    M2: "115.0054978",
    S2: "0.044963636",
    "": "",
  },
  {
    Age: "7",
    L: "0.753244292",
    M: "122.0305342",
    S: "0.044403374",
    L2: "-0.210210748",
    M2: "121.7616844",
    S2: "0.045460702",
    "": "",
  },
  {
    Age: "8",
    L: "0.455267507",
    M: "128.1237104",
    S: "0.045127088",
    L2: "-0.079283065",
    M2: "127.8262759",
    S2: "0.045968169",
    "": "",
  },
  {
    Age: "9",
    L: "0.415687443",
    M: "133.7344759",
    S: "0.046217028",
    L2: "0.08414848",
    M2: "133.1303527",
    S2: "0.04688401",
    "": "",
  },
  {
    Age: "10",
    L: "0.505564115",
    M: "138.8234114",
    S: "0.047610108",
    L2: "0.284748919",
    M2: "138.2111552",
    S2: "0.048704503",
    "": "",
  },
  {
    Age: "11",
    L: "0.487939275",
    M: "143.7303663",
    S: "0.048937694",
    L2: "0.744289752",
    M2: "144.2609497",
    S2: "0.050524236",
    "": "",
  },
  {
    Age: "12",
    L: "0.420919142",
    M: "149.3088178",
    S: "0.049947823",
    L2: "1.303044695",
    M2: "151.4865636",
    S2: "0.048599314",
    "": "",
  },
  {
    Age: "13",
    L: "0.816239713",
    M: "156.4098858",
    S: "0.050333444",
    L2: "1.242968236",
    M2: "157.3436995",
    S2: "0.043859135",
    "": "",
  },
  {
    Age: "14",
    L: "1.670433444",
    M: "164.1418486",
    S: "0.04894519",
    L2: "0.95657215",
    M2: "160.4776996",
    S2: "0.041022401",
    "": "",
  },
  {
    Age: "15",
    L: "2.205180153",
    M: "170.139255",
    S: "0.045889585",
    L2: "0.895569834",
    M2: "161.8979913",
    S2: "0.040083845",
    "": "",
  },
  {
    Age: "16",
    L: "2.113023423",
    M: "173.6100518",
    S: "0.043085685",
    L2: "0.941145943",
    M2: "162.5689958",
    S2: "0.039820663",
    "": "",
  },
  {
    Age: "17",
    L: "1.724738292",
    M: "175.340954",
    S: "0.041408129",
    L2: "0.999505539",
    M2: "162.9238449",
    S2: "0.039732048",
    "": "",
  },
  {
    Age: "18",
    L: "1.399999187",
    M: "176.1850208",
    S: "0.04064364",
    L2: "1.047571238",
    M2: "163.1307866",
    S2: "0.039687311",
    "": "",
  },
  {
    Age: "19",
    L: "1.229163362",
    M: "176.6178621",
    S: "0.040391101",
    L2: "1.083315329",
    M2: "163.2590052",
    S2: "0.039657339",
    "": "",
  },
  {
    Age: "20",
    L: "1.167279219",
    M: "176.8492322",
    S: "0.040369574",
    L2: "1.108046193",
    M2: "163.338251",
    S2: "0.039636316",
    "": "",
  },
];

var ZTABLE = {
  z: [0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0],
  "-3.4": [
    0.0002, 0.0003, 0.0003, 0.0003, 0.0003, 0.0003, 0.0003, 0.0003, 0.0003,
    0.0003,
  ],
  "-3.3": [
    0.0003, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0005, 0.0005,
    0.0005,
  ],
  "-3.2": [
    0.0005, 0.0005, 0.0005, 0.0006, 0.0006, 0.0006, 0.0006, 0.0006, 0.0007,
    0.0007,
  ],
  "-3.1": [
    0.0007, 0.0007, 0.0008, 0.0008, 0.0008, 0.0008, 0.0009, 0.0009, 0.0009,
    0.001,
  ],
  "-3.0": [
    0.001, 0.001, 0.0011, 0.0011, 0.0011, 0.0012, 0.0012, 0.0013, 0.0013,
    0.0013,
  ],
  "-2.9": [
    0.0014, 0.0014, 0.0015, 0.0015, 0.0016, 0.0016, 0.0017, 0.0018, 0.0018,
    0.0019,
  ],
  "-2.8": [
    0.0019, 0.002, 0.0021, 0.0021, 0.0022, 0.0023, 0.0023, 0.0024, 0.0025,
    0.0026,
  ],
  "-2.7": [
    0.0026, 0.0027, 0.0028, 0.0029, 0.003, 0.0031, 0.0032, 0.0033, 0.0034,
    0.0035,
  ],
  "-2.6": [
    0.0036, 0.0037, 0.0038, 0.0039, 0.004, 0.0041, 0.0043, 0.0044, 0.0045,
    0.0047,
  ],
  "-2.5": [
    0.0048, 0.0049, 0.0051, 0.0052, 0.0054, 0.0055, 0.0057, 0.0059, 0.006,
    0.0062,
  ],
  "-2.4": [
    0.0064, 0.0066, 0.0068, 0.0069, 0.0071, 0.0073, 0.0075, 0.0078, 0.008,
    0.0082,
  ],
  "-2.3": [
    0.0084, 0.0087, 0.0089, 0.0091, 0.0094, 0.0096, 0.0099, 0.0102, 0.0104,
    0.0107,
  ],
  "-2.2": [
    0.011, 0.0113, 0.0116, 0.0119, 0.0122, 0.0125, 0.0129, 0.0132, 0.0136,
    0.0139,
  ],
  "-2.1": [
    0.0143, 0.0146, 0.015, 0.0154, 0.0158, 0.0162, 0.0166, 0.017, 0.0174,
    0.0179,
  ],
  "-2.0": [
    0.0183, 0.0188, 0.0192, 0.0197, 0.0202, 0.0207, 0.0212, 0.0217, 0.0222,
    0.0228,
  ],
  "-1.9": [
    0.0233, 0.0239, 0.0244, 0.025, 0.0256, 0.0262, 0.0268, 0.0274, 0.0281,
    0.0287,
  ],
  "-1.8": [
    0.0294, 0.0301, 0.0307, 0.0314, 0.0322, 0.0329, 0.0336, 0.0344, 0.0351,
    0.0359,
  ],
  "-1.7": [
    0.0367, 0.0375, 0.0384, 0.0392, 0.0401, 0.0409, 0.0418, 0.0427, 0.0436,
    0.0446,
  ],
  "-1.6": [
    0.0455, 0.0465, 0.0475, 0.0485, 0.0495, 0.0505, 0.0516, 0.0526, 0.0537,
    0.0548,
  ],
  "-1.5": [
    0.0559, 0.0571, 0.0582, 0.0594, 0.0606, 0.0618, 0.063, 0.0643, 0.0655,
    0.0668,
  ],
  "-1.4": [
    0.0681, 0.0694, 0.0708, 0.0721, 0.0735, 0.0749, 0.0764, 0.0778, 0.0793,
    0.0808,
  ],
  "-1.3": [
    0.0823, 0.0838, 0.0853, 0.0869, 0.0885, 0.0901, 0.0918, 0.0934, 0.0951,
    0.0968,
  ],
  "-1.2": [
    0.0985, 0.1003, 0.102, 0.1038, 0.1056, 0.1075, 0.1093, 0.1112, 0.1131,
    0.1151,
  ],
  "-1.1": [
    0.117, 0.119, 0.121, 0.123, 0.1251, 0.1271, 0.1292, 0.1314, 0.1335, 0.1357,
  ],
  "-1.0": [
    0.1379, 0.1401, 0.1423, 0.1446, 0.1469, 0.1492, 0.1515, 0.1539, 0.1562,
    0.1587,
  ],
  "-0.9": [
    0.1611, 0.1635, 0.166, 0.1685, 0.1711, 0.1736, 0.1762, 0.1788, 0.1814,
    0.1841,
  ],
  "-0.8": [
    0.1867, 0.1894, 0.1922, 0.1949, 0.1977, 0.2005, 0.2033, 0.2061, 0.209,
    0.2119,
  ],
  "-0.7": [
    0.2148, 0.2177, 0.2206, 0.2236, 0.2266, 0.2296, 0.2327, 0.2358, 0.2389,
    0.242,
  ],
  "-0.6": [
    0.2451, 0.2483, 0.2514, 0.2546, 0.2578, 0.2611, 0.2643, 0.2676, 0.2709,
    0.2743,
  ],
  "-0.5": [
    0.2776, 0.281, 0.2843, 0.2877, 0.2912, 0.2946, 0.2981, 0.3015, 0.305,
    0.3085,
  ],
  "-0.4": [
    0.3121, 0.3156, 0.3192, 0.3228, 0.3264, 0.33, 0.3336, 0.3372, 0.3409,
    0.3446,
  ],
  "-0.3": [
    0.3483, 0.352, 0.3557, 0.3594, 0.3632, 0.3669, 0.3707, 0.3745, 0.3783,
    0.3821,
  ],
  "-0.2": [
    0.3829, 0.3897, 0.3936, 0.3974, 0.4013, 0.4052, 0.409, 0.4129, 0.4168,
    0.4207,
  ],
  "-0.1": [
    0.4247, 0.4286, 0.4325, 0.4364, 0.4404, 0.4443, 0.4483, 0.4522, 0.4562,
    0.4602,
  ],
  "0.0": [
    0.4641, 0.4681, 0.4721, 0.4761, 0.4801, 0.484, 0.488, 0.492, 0.496, 0.5,
  ],
};

function ztable_finder(zscore) {
  zscore = parseFloat(zscore);

  if (isNaN(zscore)) {
    throw new TypeError("zscore is not a valid number");
  }

  var yZscore = -3.4;
  var xZscore = 0.09;

  if (zscore === 0) {
    return 0.5;
  }

  if (zscore > 0) {
    if (zscore > 3.49) {
      return 1;
    }

    zscore = Math.floor(zscore * 100) / 100;
    yZscore = Math.floor(zscore * 10) / 10;
    yZscore = -yZscore;
  } else {
    if (zscore < -3.49) {
      return 0;
    }

    zscore = Math.ceil(zscore * 100) / 100;
    yZscore = Math.ceil(zscore * 10) / 10;
  }
  xZscore = Math.abs(Math.round((zscore % yZscore) * 10000) / 10000);

  var z100 = isNaN(xZscore) ? Math.abs(zscore) : xZscore;
  var z10 = yZscore === 0 ? "0.0" : yZscore.toFixed(1);
  var col = ZTABLE.z.indexOf(z100);
  var perc = ZTABLE[z10][col];

  if (zscore > 0) {
    perc = Math.round((1 - perc) * 10000) / 10000;
  }

  return perc;
}

var mydata = [
  {
    name: "WBC",
    tooltip: "White Blood Cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[9000,30000,9000,30000]",
    newborn14: "[9000,30000,9000,30000]",
    newborn30: "[9000,30000,9000,30000]",
    newborn60: "[6000,14000,6000,14000]",
    infant6: "[6000,14000,6000,14000]",
    infant1: "[6000,14000,6000,14000]",
    infant2: "[6000,14000,6000,14000]",
    child6: "[4000,12000,4000,12000]",
    child9: "[4000,12000,4000,12000]",
    child10: "[4000,10500,4000,10500]",
    teen12: "[4000,10500,4000,10500]",
    teen18: "[4000,10500,4000,10500]",
    adult: "[4000,10500,4000,10500]",
    step: "100",
    unit: "/&#181L",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "2,000",
    critmax: "30,000",
    input_id: "",
    output_id: "",
  },
  {
    name: "RBC",
    tooltip: "Red Blood Cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[4.1,6.7,4.1,6.7]",
    newborn14: "[4.1,6.7,4.1,6.7]",
    newborn30: "[4.1,6.7,4.1,6.7]",
    newborn60: "[3.8,5.4,3.8,5.4]",
    infant6: "[3.8,5.4,3.8,5.4]",
    infant1: "[3.8,5.4,3.8,5.4]",
    infant2: "[3.8,5.4,3.8,5.4]",
    child6: "[4,5.3,4,5.3]",
    child9: "[4,5.3,4,5.3]",
    child10: "[4,5.3,4,5.3]",
    teen12: "[4.2,5.6,4.1,5.3]",
    teen18: "[4.2,5.6,4.1,5.3]",
    adult: "[4.7,6,3.8,5.2]",
    step: "0.1",
    unit: "mil/&#181L",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Hb",
    tooltip: "Hemoglobin",
    value: "",
    min: "",
    max: "",
    newborn3: "[14,22,14,22]",
    newborn14: "[14,22,14,22]",
    newborn30: "[14,22,14,22]",
    newborn60: "[10.5,14,10.5,14]",
    infant6: "[10.5,14,10.5,14]",
    infant1: "[10.5,14,10.5,14]",
    infant2: "[10.5,14,10.5,14]",
    child6: "[11.5,14.5,11.5,14.5]",
    child9: "[11.5,14.5,11.5,14.5]",
    child10: "[11.5,14.5,11.5,14.5]",
    teen12: "[12.5,16.1,12.0,15]",
    teen18: "[12.5,16.1,12.0,15]",
    adult: "[13.5,17,11.4,15.1]",
    step: "0.1",
    unit: "g/dL",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "7",
    critmax: "18",
    input_id: "",
    output_id: "",
  },
  {
    name: "MCV",
    tooltip: "Mean Corpuscular Volume",
    value: "",
    min: "",
    max: "",
    newborn3: "[90,123,90,123]",
    newborn14: "[90,123,90,123]",
    newborn30: "[90,123,90,123]",
    newborn60: "[90,123,90,123]",
    infant6: "[77,115,77,115]",
    infant1: "[74,108,74,108]",
    infant2: "[74,108,74,108]",
    child6: "[70,86,70,86]",
    child9: "[75,87,75,87]",
    child10: "[75,87,75,87]",
    teen12: "[75,87,75,87]",
    teen18: "[77,95,77,95]",
    adult: "[80,98,80,98]",
    step: "1",
    unit: "fL",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Hct",
    tooltip: "Hematocrit",
    value: "",
    min: "",
    max: "",
    newborn3: "[42,66,42,66]",
    newborn14: "[42,66,42,66]",
    newborn30: "[42,66,42,66]",
    newborn60: "[32,44,32,44]",
    infant6: "[32,44,32,44]",
    infant1: "[32,44,32,44]",
    infant2: "[32,44,32,44]",
    child6: "[33,43,33,43]",
    child9: "[33,43,33,43]",
    child10: "[33,43,33,43]",
    teen12: "[36,47,35,45]",
    teen18: "[36,47,35,45]",
    adult: "[38,51,36,46]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "20",
    critmax: "55",
    input_id: "",
    output_id: "",
  },
  {
    name: "MCH",
    tooltip: "Mean Corpuscular Hemoglobin",
    value: "",
    min: "",
    max: "",
    newborn3: "[26,34,26,34]",
    newborn14: "[26,34,26,34]",
    newborn30: "[26,34,26,34]",
    newborn60: "[26,34,26,34]",
    infant6: "[26,34,26,34]",
    infant1: "[26,34,26,34]",
    infant2: "[26,34,26,34]",
    child6: "[26,34,26,34]",
    child9: "[26,34,26,34]",
    child10: "[26,34,26,34]",
    teen12: "[26,34,26,34]",
    teen18: "[26,34,26,34]",
    adult: "[26,34,26,34]",
    step: "1",
    unit: "pg",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "MCHC",
    tooltip: "Mean Corpuscular Hemoglobin Concentration",
    value: "",
    min: "",
    max: "",
    newborn3: "[32,36,32,36]",
    newborn14: "[32,36,32,36]",
    newborn30: "[32,36,32,36]",
    newborn60: "[32,36,32,36]",
    infant6: "[32,36,32,36]",
    infant1: "[32,36,32,36]",
    infant2: "[32,36,32,36]",
    child6: "[32,36,32,36]",
    child9: "[32,36,32,36]",
    child10: "[32,36,32,36]",
    teen12: "[32,36,32,36]",
    teen18: "[32,36,32,36]",
    adult: "[32,36,32,36]",
    step: "1",
    unit: "g/dL",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Plt",
    tooltip: "Platelets",
    value: "",
    min: "",
    max: "",
    newborn3: "[150000,600000,150000,600000]",
    newborn14: "[150000,600000,150000,600000]",
    newborn30: "[150000,600000,150000,600000]",
    newborn60: "[150000,600000,150000,600000]",
    infant6: "[150000,600000,150000,600000]",
    infant1: "[150000,600000,150000,600000]",
    infant2: "[150000,500000,150000,500000]",
    child6: "[150000,500000,150000,500000]",
    child9: "[150000,500000,150000,500000]",
    child10: "[150000,500000,150000,500000]",
    teen12: "[150000,450000,150000,450000]",
    teen18: "[150000,450000,150000,450000]",
    adult: "[150000,450000,150000,450000]",
    step: "1,000",
    unit: "/&#181L",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "20,000",
    critmax: "1,000,000",
    input_id: "",
    output_id: "",
  },
  {
    name: "RDW",
    tooltip: "Red blood cells Distribution Width",
    value: "",
    min: "",
    max: "",
    newborn3: "[11,15,11,15]",
    newborn14: "[11,15,11,15]",
    newborn30: "[11,15,11,15]",
    newborn60: "[11,15,11,15]",
    infant6: "[11,15,11,15]",
    infant1: "[11,15,11,15]",
    infant2: "[11,15,11,15]",
    child6: "[11,15,11,15]",
    child9: "[11,15,11,15]",
    child10: "[11,15,11,15]",
    teen12: "[11,15,11,15]",
    teen18: "[11,15,11,15]",
    adult: "[11,15,11,15]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "MPV",
    tooltip: "Mean Platelet Volume",
    value: "",
    min: "",
    max: "",
    newborn3: "[8.5,13,8.5,13]",
    newborn14: "[8.5,13,8.5,13]",
    newborn30: "[8.5,13,8.5,13]",
    newborn60: "[8.5,13,8.5,13]",
    infant6: "[8.5,13,8.5,13]",
    infant1: "[8.5,13,8.5,13]",
    infant2: "[8.5,13,8.5,13]",
    child6: "[8.5,13,8.5,13]",
    child9: "[8.5,13,8.5,13]",
    child10: "[8.5,13,8.5,13]",
    teen12: "[8.5,13,8.5,13]",
    teen18: "[8.5,13,8.5,13]",
    adult: "[8.5,13,8.5,13]",
    step: "0.1",
    unit: "fL",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "NRBC",
    tooltip: "Nucleated Red Blood Cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,3,0,3]",
    newborn14: "[0,0,0,0]",
    newborn30: "[0,0,0,0]",
    newborn60: "[0,0,0,0]",
    infant6: "[0,0,0,0]",
    infant1: "[0,0,0,0]",
    infant2: "[0,0,0,0]",
    child6: "[0,0,0,0]",
    child9: "[0,0,0,0]",
    child10: "[0,0,0,0]",
    teen12: "[0,0,0,0]",
    teen18: "[0,0,0,0]",
    adult: "[0,0,0,0]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Retic",
    tooltip: "Reticulocyte Count",
    value: "",
    min: "",
    max: "",
    newborn3: "[2.5,6.5,2.5,6.5]",
    newborn14: "[2.5,6.5,2.5,6.5]",
    newborn30: "[0.5,2.5,0.5,2.5]",
    newborn60: "[0.5,2.5,0.5,2.5]",
    infant6: "[0.5,2.5,0.5,2.5]",
    infant1: "[0.5,2.5,0.5,2.5]",
    infant2: "[0.5,2.5,0.5,2.5]",
    child6: "[0.5,2.5,0.5,2.5]",
    child9: "[0.5,2.5,0.5,2.5]",
    child10: "[0.5,2.5,0.5,2.5]",
    teen12: "[0.5,2.5,0.5,2.5]",
    teen18: "[0.5,2.5,0.5,2.5]",
    adult: "[0.5,2.5,0.5,2.5]",
    step: "1",
    unit: "/&#181L",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "ESR",
    tooltip: "Erythrocyte Sedimentation Rate",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,15,0,20]",
    newborn14: "[0,15,0,20]",
    newborn30: "[0,15,0,20]",
    newborn60: "[0,15,0,20]",
    infant6: "[0,15,0,20]",
    infant1: "[0,15,0,20]",
    infant2: "[0,15,0,20]",
    child6: "[0,15,0,20]",
    child9: "[0,15,0,20]",
    child10: "[0,15,0,20]",
    teen12: "[0,15,0,20]",
    teen18: "[0,15,0,20]",
    adult: "[0,15,0,20]",
    step: "1",
    unit: "mm/hr",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "CRP",
    tooltip: "C-Reactive Protein",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "AST",
    tooltip: "Aspartate transaminase or SGOT",
    value: "",
    min: "",
    max: "",
    newborn3: "[17,59,14,36]",
    newborn14: "[17,59,14,36]",
    newborn30: "[17,59,14,36]",
    newborn60: "[17,59,14,36]",
    infant6: "[17,59,14,36]",
    infant1: "[17,59,14,36]",
    infant2: "[17,59,14,36]",
    child6: "[17,59,14,36]",
    child9: "[17,59,14,36]",
    child10: "[17,59,14,36]",
    teen12: "[17,59,14,36]",
    teen18: "[17,59,14,36]",
    adult: "[17,59,14,36]",
    step: "1",
    unit: "IU/L",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "ALT",
    tooltip: "Alanine transaminase or SGPT",
    value: "",
    min: "",
    max: "",
    newborn3: "[21,72,9,52]",
    newborn14: "[21,72,9,52]",
    newborn30: "[21,72,9,52]",
    newborn60: "[21,72,9,52]",
    infant6: "[21,72,9,52]",
    infant1: "[21,72,9,52]",
    infant2: "[21,72,9,52]",
    child6: "[21,72,9,52]",
    child9: "[21,72,9,52]",
    child10: "[21,72,9,52]",
    teen12: "[21,72,9,52]",
    teen18: "[21,72,9,52]",
    adult: "[21,72,9,52]",
    step: "1",
    unit: "IU/L",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "ALP",
    tooltip: "Alkaline Phosphatase",
    value: "",
    min: "",
    max: "",
    newborn3: "[100,300,100,300]",
    newborn14: "[100,300,100,300]",
    newborn30: "[100,300,100,300]",
    newborn60: "[100,300,100,300]",
    infant6: "[100,300,100,300]",
    infant1: "[100,300,100,300]",
    infant2: "[100,300,100,300]",
    child6: "[100,300,100,300]",
    child9: "[100,300,100,300]",
    child10: "[100,300,100,300]",
    teen12: "[100,300,100,300]",
    teen18: "[100,300,100,300]",
    adult: "[38,126,38,126]",
    step: "1",
    unit: "IU/L",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Bil(T)",
    tooltip: "Total Bilirubin",
    value: "",
    min: "",
    max: "",
    newborn3: "[0.2,1.3,0.2,1.3]",
    newborn14: "[0.2,1.3,0.2,1.3]",
    newborn30: "[0.2,1.3,0.2,1.3]",
    newborn60: "[0.2,1.3,0.2,1.3]",
    infant6: "[0.2,1.3,0.2,1.3]",
    infant1: "[0.2,1.3,0.2,1.3]",
    infant2: "[0.2,1.3,0.2,1.3]",
    child6: "[0.2,1.3,0.2,1.3]",
    child9: "[0.2,1.3,0.2,1.3]",
    child10: "[0.2,1.3,0.2,1.3]",
    teen12: "[0.2,1.3,0.2,1.3]",
    teen18: "[0.2,1.3,0.2,1.3]",
    adult: "[0.2,1.3,0.2,1.3]",
    step: "0.1",
    unit: "mg/dL",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Bil(D)",
    tooltip: "Direct (Conjugated) Bilirubin",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,0.3,0,0.3]",
    newborn14: "[0,0.3,0,0.3]",
    newborn30: "[0,0.3,0,0.3]",
    newborn60: "[0,0.3,0,0.3]",
    infant6: "[0,0.3,0,0.3]",
    infant1: "[0,0.3,0,0.3]",
    infant2: "[0,0.3,0,0.3]",
    child6: "[0,0.3,0,0.3]",
    child9: "[0,0.3,0,0.3]",
    child10: "[0,0.3,0,0.3]",
    teen12: "[0,0.3,0,0.3]",
    teen18: "[0,0.3,0,0.3]",
    adult: "[0,0.3,0,0.3]",
    step: "0.1",
    unit: "mg/dL",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Alb",
    tooltip: "Total Albumin",
    value: "",
    min: "",
    max: "",
    newborn3: "[3.5,5,3.5,5]",
    newborn14: "[3.5,5,3.5,5]",
    newborn30: "[3.5,5,3.5,5]",
    newborn60: "[3.5,5,3.5,5]",
    infant6: "[3.5,5,3.5,5]",
    infant1: "[3.5,5,3.5,5]",
    infant2: "[3.5,5,3.5,5]",
    child6: "[3.5,5,3.5,5]",
    child9: "[3.5,5,3.5,5]",
    child10: "[3.5,5,3.5,5]",
    teen12: "[3.5,5,3.5,5]",
    teen18: "[3.5,5,3.5,5]",
    adult: "[3.5,5,3.5,5]",
    step: "0.1",
    unit: "IU/L",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "GGT",
    tooltip: "Gamma-glutamyl transferase",
    value: "",
    min: "",
    max: "",
    newborn3: "[12,73,12,43]",
    newborn14: "[12,73,12,43]",
    newborn30: "[12,73,12,43]",
    newborn60: "[12,73,12,43]",
    infant6: "[12,73,12,43]",
    infant1: "[12,73,12,43]",
    infant2: "[12,73,12,43]",
    child6: "[12,73,12,43]",
    child9: "[12,73,12,43]",
    child10: "[12,73,12,43]",
    teen12: "[12,73,12,43]",
    teen18: "[12,73,12,43]",
    adult: "[12,73,12,43]",
    step: "1",
    unit: "IU/L",
    status: "0",
    color: "darkslategrey",
    type: "lft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "TSH",
    tooltip: "Thyroid Stimulating Hormone",
    value: "",
    min: "",
    max: "",
    newborn3: "[0.47,4.68,0.47,4.68]",
    newborn14: "[0.47,4.68,0.47,4.68]",
    newborn30: "[0.47,4.68,0.47,4.68]",
    newborn60: "[0.47,4.68,0.47,4.68]",
    infant6: "[0.47,4.68,0.47,4.68]",
    infant1: "[0.47,4.68,0.47,4.68]",
    infant2: "[0.47,4.68,0.47,4.68]",
    child6: "[0.47,4.68,0.47,4.68]",
    child9: "[0.47,4.68,0.47,4.68]",
    child10: "[0.47,4.68,0.47,4.68]",
    teen12: "[0.47,4.68,0.47,4.68]",
    teen18: "[0.47,4.68,0.47,4.68]",
    adult: "[0.47,4.68,0.47,4.68]",
    step: "0.1",
    unit: "mIU/L",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "FT4",
    tooltip: "Free Thyroxin",
    value: "",
    min: "",
    max: "",
    newborn3: "[0.78,2.19,0.78,2.19]",
    newborn14: "[0.78,2.19,0.78,2.19]",
    newborn30: "[0.78,2.19,0.78,2.19]",
    newborn60: "[0.78,2.19,0.78,2.19]",
    infant6: "[0.78,2.19,0.78,2.19]",
    infant1: "[0.78,2.19,0.78,2.19]",
    infant2: "[0.78,2.19,0.78,2.19]",
    child6: "[0.78,2.19,0.78,2.19]",
    child9: "[0.78,2.19,0.78,2.19]",
    child10: "[0.78,2.19,0.78,2.19]",
    teen12: "[0.78,2.19,0.78,2.19]",
    teen18: "[0.78,2.19,0.78,2.19]",
    adult: "[0.78,2.19,0.78,2.19]",
    step: "0.1",
    unit: "ng/dL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "T4",
    tooltip: "Total Thyroxin",
    value: "",
    min: "",
    max: "",
    newborn3: "[5.5,11,5.5,11]",
    newborn14: "[5.5,11,5.5,11]",
    newborn30: "[5.5,11,5.5,11]",
    newborn60: "[5.5,11,5.5,11]",
    infant6: "[5.5,11,5.5,11]",
    infant1: "[5.5,11,5.5,11]",
    infant2: "[5.5,11,5.5,11]",
    child6: "[5.5,11,5.5,11]",
    child9: "[5.5,11,5.5,11]",
    child10: "[5.5,11,5.5,11]",
    teen12: "[5.5,11,5.5,11]",
    teen18: "[5.5,11,5.5,11]",
    adult: "[5.5,11,5.5,11]",
    step: "1",
    unit: "&#181g/dL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "FT3",
    tooltip: "Free Triiodothyronine",
    value: "",
    min: "",
    max: "",
    newborn3: "[2.3,4.2,2.3,4.2]",
    newborn14: "[2.3,4.2,2.3,4.2]",
    newborn30: "[2.3,4.2,2.3,4.2]",
    newborn60: "[2.3,4.2,2.3,4.2]",
    infant6: "[2.3,4.2,2.3,4.2]",
    infant1: "[2.3,4.2,2.3,4.2]",
    infant2: "[2.3,4.2,2.3,4.2]",
    child6: "[2.3,4.2,2.3,4.2]",
    child9: "[2.3,4.2,2.3,4.2]",
    child10: "[2.3,4.2,2.3,4.2]",
    teen12: "[2.3,4.2,2.3,4.2]",
    teen18: "[2.3,4.2,2.3,4.2]",
    adult: "[2.3,4.2,2.3,4.2]",
    step: "0.1",
    unit: "pg/dL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "T3",
    tooltip: "Total Triiodothyronine",
    value: "",
    min: "",
    max: "",
    newborn3: "[80,180,80,180]",
    newborn14: "[80,180,80,180]",
    newborn30: "[80,180,80,180]",
    newborn60: "[80,180,80,180]",
    infant6: "[80,180,80,180]",
    infant1: "[80,180,80,180]",
    infant2: "[80,180,80,180]",
    child6: "[80,180,80,180]",
    child9: "[80,180,80,180]",
    child10: "[80,180,80,180]",
    teen12: "[80,180,80,180]",
    teen18: "[80,180,80,180]",
    adult: "[80,180,80,180]",
    step: "1",
    unit: "ng/dL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "RIA",
    tooltip: "Radioactive Iodine Uptake",
    value: "",
    min: "",
    max: "",
    newborn3: "[5,30,5,30]",
    newborn14: "[5,30,5,30]",
    newborn30: "[5,30,5,30]",
    newborn60: "[5,30,5,30]",
    infant6: "[5,30,5,30]",
    infant1: "[5,30,5,30]",
    infant2: "[5,30,5,30]",
    child6: "[5,30,5,30]",
    child9: "[5,30,5,30]",
    child10: "[5,30,5,30]",
    teen12: "[5,30,5,30]",
    teen18: "[5,30,5,30]",
    adult: "[5,30,5,30]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "TSI",
    tooltip: "Thyroid-stimulating Immunoglobulin",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,130,0,130]",
    newborn14: "[0,130,0,130]",
    newborn30: "[0,130,0,130]",
    newborn60: "[0,130,0,130]",
    infant6: "[0,130,0,130]",
    infant1: "[0,130,0,130]",
    infant2: "[0,130,0,130]",
    child6: "[0,130,0,130]",
    child9: "[0,130,0,130]",
    child10: "[0,130,0,130]",
    teen12: "[0,130,0,130]",
    teen18: "[0,130,0,130]",
    adult: "[0,130,0,130]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "TBG",
    tooltip: "Thyroxine-binding Globulin",
    value: "",
    min: "",
    max: "",
    newborn3: "[12,27,12,27]",
    newborn14: "[12,27,12,27]",
    newborn30: "[12,27,12,27]",
    newborn60: "[12,27,12,27]",
    infant6: "[12,27,12,27]",
    infant1: "[12,27,12,27]",
    infant2: "[12,27,12,27]",
    child6: "[12,27,12,27]",
    child9: "[12,27,12,27]",
    child10: "[12,27,12,27]",
    teen12: "[12,27,12,27]",
    teen18: "[12,27,12,27]",
    adult: "[12,27,12,27]",
    step: "1",
    unit: "&#181g/mL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Tg",
    tooltip: "Thyroglobulin",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,20,0,20]",
    newborn14: "[0,20,0,20]",
    newborn30: "[0,20,0,20]",
    newborn60: "[0,20,0,20]",
    infant6: "[0,20,0,20]",
    infant1: "[0,20,0,20]",
    infant2: "[0,20,0,20]",
    child6: "[0,20,0,20]",
    child9: "[0,20,0,20]",
    child10: "[0,20,0,20]",
    teen12: "[0,20,0,20]",
    teen18: "[0,20,0,20]",
    adult: "[0,20,0,20]",
    step: "1",
    unit: "ng/mL",
    status: "0",
    color: "rgb(65, 87, 65)",
    type: "tft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Cr",
    tooltip: "Serum Creatinine",
    value: "",
    min: "",
    max: "",
    newborn3: "[0.66,1.25,0.52,1.04]",
    newborn14: "[0.66,1.25,0.52,1.04]",
    newborn30: "[0.66,1.25,0.52,1.04]",
    newborn60: "[0.66,1.25,0.52,1.04]",
    infant6: "[0.66,1.25,0.52,1.04]",
    infant1: "[0.66,1.25,0.52,1.04]",
    infant2: "[0.66,1.25,0.52,1.04]",
    child6: "[0.66,1.25,0.52,1.04]",
    child9: "[0.66,1.25,0.52,1.04]",
    child10: "[0.66,1.25,0.52,1.04]",
    teen12: "[0.66,1.25,0.52,1.04]",
    teen18: "[0.66,1.25,0.52,1.04]",
    adult: "[0.66,1.25,0.52,1.04]",
    step: "0.1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(128, 70, 32)",
    type: "kft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "BUN",
    tooltip: "Blood Urea Nitrogen",
    value: "",
    min: "",
    max: "",
    newborn3: "[9,20,7,17]",
    newborn14: "[9,20,7,17]",
    newborn30: "[9,20,7,17]",
    newborn60: "[9,20,7,17]",
    infant6: "[9,20,7,17]",
    infant1: "[9,20,7,17]",
    infant2: "[9,20,7,17]",
    child6: "[9,20,7,17]",
    child9: "[9,20,7,17]",
    child10: "[9,20,7,17]",
    teen12: "[9,20,7,17]",
    teen18: "[9,20,7,17]",
    adult: "[9,20,7,17]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(128, 70, 32)",
    type: "kft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Na",
    tooltip: "Serum Sodium",
    value: "",
    min: "",
    max: "",
    newborn3: "[137,145,137,145]",
    newborn14: "[137,145,137,145]",
    newborn30: "[137,145,137,145]",
    newborn60: "[137,145,137,145]",
    infant6: "[137,145,137,145]",
    infant1: "[137,145,137,145]",
    infant2: "[137,145,137,145]",
    child6: "[137,145,137,145]",
    child9: "[137,145,137,145]",
    child10: "[137,145,137,145]",
    teen12: "[137,145,137,145]",
    teen18: "[137,145,137,145]",
    adult: "[137,145,137,145]",
    step: "1",
    unit: "mmol/L",
    status: "0",
    color: "rgb(128, 70, 32)",
    type: "kft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "K",
    tooltip: "Serum Potassium",
    value: "",
    min: "",
    max: "",
    newborn3: "[3.5,5.1,3.5,5.1]",
    newborn14: "[3.5,5.1,3.5,5.1]",
    newborn30: "[3.5,5.1,3.5,5.1]",
    newborn60: "[3.5,5.1,3.5,5.1]",
    infant6: "[3.5,5.1,3.5,5.1]",
    infant1: "[3.5,5.1,3.5,5.1]",
    infant2: "[3.5,5.1,3.5,5.1]",
    child6: "[3.5,5.1,3.5,5.1]",
    child9: "[3.5,5.1,3.5,5.1]",
    child10: "[3.5,5.1,3.5,5.1]",
    teen12: "[3.5,5.1,3.5,5.1]",
    teen18: "[3.5,5.1,3.5,5.1]",
    adult: "[3.5,5.1,3.5,5.1]",
    step: "0.1",
    unit: "mmol/L",
    status: "0",
    color: "rgb(128, 70, 32)",
    type: "kft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Uric Acid",
    tooltip: "Uric Acid",
    value: "",
    min: "",
    max: "",
    newborn3: "[3.5,8.5,2.5,6.2]",
    newborn14: "[3.5,8.5,2.5,6.2]",
    newborn30: "[3.5,8.5,2.5,6.2]",
    newborn60: "[3.5,8.5,2.5,6.2]",
    infant6: "[3.5,8.5,2.5,6.2]",
    infant1: "[3.5,8.5,2.5,6.2]",
    infant2: "[3.5,8.5,2.5,6.2]",
    child6: "[3.5,8.5,2.5,6.2]",
    child9: "[3.5,8.5,2.5,6.2]",
    child10: "[3.5,8.5,2.5,6.2]",
    teen12: "[3.5,8.5,2.5,6.2]",
    teen18: "[3.5,8.5,2.5,6.2]",
    adult: "[3.5,8.5,2.5,6.2]",
    step: "0.1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(128, 70, 32)",
    type: "kft",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "FBS",
    tooltip: "Serum Glucose",
    value: "",
    min: "",
    max: "",
    newborn3: "[70,100,70,100]",
    newborn14: "[70,100,70,100]",
    newborn30: "[70,100,70,100]",
    newborn60: "[70,100,70,100]",
    infant6: "[70,100,70,100]",
    infant1: "[70,100,70,100]",
    infant2: "[70,100,70,100]",
    child6: "[70,100,70,100]",
    child9: "[70,100,70,100]",
    child10: "[70,100,70,100]",
    teen12: "[70,100,70,100]",
    teen18: "[70,100,70,100]",
    adult: "[70,100,70,100]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "60",
    critmax: "400",
    input_id: "",
    output_id: "",
  },
  {
    name: "TG",
    tooltip: "Total Triglycerid",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,150,0,150]",
    newborn14: "[0,150,0,150]",
    newborn30: "[0,150,0,150]",
    newborn60: "[0,150,0,150]",
    infant6: "[0,150,0,150]",
    infant1: "[0,150,0,150]",
    infant2: "[0,150,0,150]",
    child6: "[0,150,0,150]",
    child9: "[0,150,0,150]",
    child10: "[0,150,0,150]",
    teen12: "[0,150,0,150]",
    teen18: "[0,150,0,150]",
    adult: "[0,150,0,150]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Chol",
    tooltip: "Total Cholestrol",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,200,0,200]",
    newborn14: "[0,200,0,200]",
    newborn30: "[0,200,0,200]",
    newborn60: "[0,200,0,200]",
    infant6: "[0,200,0,200]",
    infant1: "[0,200,0,200]",
    infant2: "[0,200,0,200]",
    child6: "[0,200,0,200]",
    child9: "[0,200,0,200]",
    child10: "[0,200,0,200]",
    teen12: "[0,200,0,200]",
    teen18: "[0,200,0,200]",
    adult: "[0,200,0,200]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "LDL",
    tooltip: "Low Density Lipoprotein",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,140,0,140]",
    newborn14: "[0,140,0,140]",
    newborn30: "[0,140,0,140]",
    newborn60: "[0,140,0,140]",
    infant6: "[0,140,0,140]",
    infant1: "[0,140,0,140]",
    infant2: "[0,140,0,140]",
    child6: "[0,140,0,140]",
    child9: "[0,140,0,140]",
    child10: "[0,140,0,140]",
    teen12: "[0,140,0,140]",
    teen18: "[0,140,0,140]",
    adult: "[0,140,0,140]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "HDL",
    tooltip: "High Density Lipoprotein",
    value: "",
    min: "",
    max: "",
    newborn3: "[40,0,40,0]",
    newborn14: "[40,0,40,0]",
    newborn30: "[40,0,40,0]",
    newborn60: "[40,0,40,0]",
    infant6: "[40,0,40,0]",
    infant1: "[40,0,40,0]",
    infant2: "[40,0,40,0]",
    child6: "[40,0,40,0]",
    child9: "[40,0,40,0]",
    child10: "[40,0,40,0]",
    teen12: "[40,0,40,0]",
    teen18: "[40,0,40,0]",
    adult: "[40,0,40,0]",
    step: "1",
    unit: "mg/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Iron",
    tooltip: "Serum Iron",
    value: "",
    min: "",
    max: "",
    newborn3: "[50,150,50,150]",
    newborn14: "[50,150,50,150]",
    newborn30: "[50,150,50,150]",
    newborn60: "[50,150,50,150]",
    infant6: "[50,150,50,150]",
    infant1: "[50,150,50,150]",
    infant2: "[50,150,50,150]",
    child6: "[50,150,50,150]",
    child9: "[50,150,50,150]",
    child10: "[50,150,50,150]",
    teen12: "[50,150,50,150]",
    teen18: "[50,150,50,150]",
    adult: "[50,150,50,150]",
    step: "1",
    unit: "&#181g/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Ferritin",
    tooltip: "Serum Ferritin",
    value: "",
    min: "",
    max: "",
    newborn3: "[30,200,15,150]",
    newborn14: "[30,200,15,150]",
    newborn30: "[30,200,15,150]",
    newborn60: "[30,200,15,150]",
    infant6: "[30,200,15,150]",
    infant1: "[30,200,15,150]",
    infant2: "[30,200,15,150]",
    child6: "[30,200,15,150]",
    child9: "[30,200,15,150]",
    child10: "[30,200,15,150]",
    teen12: "[30,200,15,150]",
    teen18: "[30,200,15,150]",
    adult: "[30,200,15,150]",
    step: "1",
    unit: "ng/mL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "TIBC",
    tooltip: "Total Iron Binding Capacity",
    value: "",
    min: "",
    max: "",
    newborn3: "[250,310,250,310]",
    newborn14: "[250,310,250,310]",
    newborn30: "[250,310,250,310]",
    newborn60: "[250,310,250,310]",
    infant6: "[250,310,250,310]",
    infant1: "[250,310,250,310]",
    infant2: "[250,310,250,310]",
    child6: "[250,310,250,310]",
    child9: "[250,310,250,310]",
    child10: "[250,310,250,310]",
    teen12: "[250,310,250,310]",
    teen18: "[250,310,250,310]",
    adult: "[250,310,250,310]",
    step: "1",
    unit: "&#181g/dL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Folate",
    tooltip: "Serum Vitamin B9 (Folate)",
    value: "",
    min: "",
    max: "",
    newborn3: "[1.8,9,1.8,9]",
    newborn14: "[1.8,9,1.8,9]",
    newborn30: "[1.8,9,1.8,9]",
    newborn60: "[1.8,9,1.8,9]",
    infant6: "[1.8,9,1.8,9]",
    infant1: "[1.8,9,1.8,9]",
    infant2: "[1.8,9,1.8,9]",
    child6: "[1.8,9,1.8,9]",
    child9: "[1.8,9,1.8,9]",
    child10: "[1.8,9,1.8,9]",
    teen12: "[1.8,9,1.8,9]",
    teen18: "[1.8,9,1.8,9]",
    adult: "[1.8,9,1.8,9]",
    step: "0.1",
    unit: "ng/mL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "B12",
    tooltip: "Serum Vitamin B12 (Cobalamin)",
    value: "",
    min: "",
    max: "",
    newborn3: "[200,800,200,800]",
    newborn14: "[200,800,200,800]",
    newborn30: "[200,800,200,800]",
    newborn60: "[200,800,200,800]",
    infant6: "[200,800,200,800]",
    infant1: "[200,800,200,800]",
    infant2: "[200,800,200,800]",
    child6: "[200,800,200,800]",
    child9: "[200,800,200,800]",
    child10: "[200,800,200,800]",
    teen12: "[200,800,200,800]",
    teen18: "[200,800,200,800]",
    adult: "[200,800,200,800]",
    step: "1",
    unit: "pg/mL",
    status: "0",
    color: "rgb(102, 30, 52)",
    type: "bio",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Neutrophils",
    tooltip: "Neutrophils percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[30,50,30,50]",
    newborn14: "[30,50,30,50]",
    newborn30: "[30,50,30,50]",
    newborn60: "[30,50,30,50]",
    infant6: "[30,50,30,50]",
    infant1: "[30,50,30,50]",
    infant2: "[30,50,30,50]",
    child6: "[30,50,30,50]",
    child9: "[30,50,30,50]",
    child10: "[30,50,30,50]",
    teen12: "[30,50,30,50]",
    teen18: "[30,50,30,50]",
    adult: "[30,50,30,50]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Lymphocytes",
    tooltip: "Lymphocytes percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[40,55,40,55]",
    newborn14: "[40,55,40,55]",
    newborn30: "[40,55,40,55]",
    newborn60: "[40,55,40,55]",
    infant6: "[40,55,40,55]",
    infant1: "[40,55,40,55]",
    infant2: "[40,55,40,55]",
    child6: "[40,55,40,55]",
    child9: "[40,55,40,55]",
    child10: "[40,55,40,55]",
    teen12: "[40,55,40,55]",
    teen18: "[40,55,40,55]",
    adult: "[40,55,40,55]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Monocytes",
    tooltip: "Monocytes percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,5,0,5]",
    newborn14: "[0,5,0,5]",
    newborn30: "[0,5,0,5]",
    newborn60: "[0,5,0,5]",
    infant6: "[0,5,0,5]",
    infant1: "[0,5,0,5]",
    infant2: "[0,5,0,5]",
    child6: "[0,5,0,5]",
    child9: "[0,5,0,5]",
    child10: "[0,5,0,5]",
    teen12: "[0,5,0,5]",
    teen18: "[0,5,0,5]",
    adult: "[0,5,0,5]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Eosinophiles",
    tooltip: "Eosinophiles percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,2,0,2]",
    newborn14: "[0,2,0,2]",
    newborn30: "[0,2,0,2]",
    newborn60: "[0,2,0,2]",
    infant6: "[0,2,0,2]",
    infant1: "[0,2,0,2]",
    infant2: "[0,2,0,2]",
    child6: "[0,2,0,2]",
    child9: "[0,2,0,2]",
    child10: "[0,2,0,2]",
    teen12: "[0,2,0,2]",
    teen18: "[0,2,0,2]",
    adult: "[0,2,0,2]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Basophils",
    tooltip: "Basophils percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Bands",
    tooltip: "Band cells percentage",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,5,0,5]",
    newborn14: "[0,5,0,5]",
    newborn30: "[0,5,0,5]",
    newborn60: "[0,5,0,5]",
    infant6: "[0,5,0,5]",
    infant1: "[0,5,0,5]",
    infant2: "[0,5,0,5]",
    child6: "[0,5,0,5]",
    child9: "[0,5,0,5]",
    child10: "[0,5,0,5]",
    teen12: "[0,5,0,5]",
    teen18: "[0,5,0,5]",
    adult: "[0,5,0,5]",
    step: "1",
    unit: "%",
    status: "0",
    color: "darkslateblue",
    type: "hemato",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Bite",
    tooltip: "Bite cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Helmet",
    tooltip: "Helmet cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Schistocytes",
    tooltip: "Schistocytes",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Target",
    tooltip: "Target cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Mushroom",
    tooltip: "Mushroom-shaped cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Burr",
    tooltip: "Burr cells (echinocytes , ...)",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Spur",
    tooltip: "Acanthocytes (spur cells)",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Basket",
    tooltip: "Basket cells (blister cells)",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Tear",
    tooltip: "Tear drop cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Howell-jolly",
    tooltip: "Howell-Jolly bodies",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Heinz",
    tooltip: "Heinz bodies",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "B-strippling",
    tooltip: "Basophilic strippling",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Cobot",
    tooltip: "Cobot rings",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Hb-crystals",
    tooltip: "Hemoglobin crystals",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Ghosts",
    tooltip: "Red cell ghosts",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(139, 61, 104)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Atyp-lym",
    tooltip: "Atypical Lymphocytes",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Hyperseg-N",
    tooltip: "Hypersegmented neutrophiles",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Hyposeg-N",
    tooltip: "Hyposegmented neutrophiles",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Dohle",
    tooltip: "Dohle bodies",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Smudge",
    tooltip: "Smudge cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Blast",
    tooltip: "Blasts",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Auer",
    tooltip: "Auer rods",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Sezary",
    tooltip: "Sezary cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Plasmocytes",
    tooltip: "Plasma cells",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(61, 92, 139)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
  {
    name: "Giant-plt",
    tooltip: "Giant platelets",
    value: "",
    min: "",
    max: "",
    newborn3: "[0,1,0,1]",
    newborn14: "[0,1,0,1]",
    newborn30: "[0,1,0,1]",
    newborn60: "[0,1,0,1]",
    infant6: "[0,1,0,1]",
    infant1: "[0,1,0,1]",
    infant2: "[0,1,0,1]",
    child6: "[0,1,0,1]",
    child9: "[0,1,0,1]",
    child10: "[0,1,0,1]",
    teen12: "[0,1,0,1]",
    teen18: "[0,1,0,1]",
    adult: "[0,1,0,1]",
    step: "1",
    unit: "%",
    status: "0",
    color: "rgb(83, 102, 30)",
    type: "pbs",
    critmin: "0",
    critmax: "0",
    input_id: "",
    output_id: "",
  },
];
