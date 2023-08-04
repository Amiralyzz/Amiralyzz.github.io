var parentElement = document.getElementById("table_shown");
function tabContent(tabId, testCategory) {
  if (tabId != "tab_analyse") {
    parentElement.style.display = "grid";
    parentElement.style.flexDirection = "row";
    parentElement.style.whiteSpace = "nowrap";
  } else {
    parentElement.style.display = "flex";
    parentElement.style.flexDirection = "column";
    parentElement.style.whiteSpace = "normal";
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
    for (let index = 0; index < labItems.length; index++) {
      if (pinnedOrNotArray[index] == 1) {
        searched_items.appendChild(buildUsualEntry(index));
        unpinButtonMaker(index, labItems[index].name);
      }
    }

    //for search results
    search_val = new RegExp(document.getElementById("searchbar").value, "i");
    for (let index = 0; index < labItems.length; index++) {
      if (
        document.getElementById("searchbar").value != "" &&
        pinnedOrNotArray[index] != 1
      ) {
        if (
          labItems[index]["name"].search(search_val) != -1 ||
          labItems[index]["tooltip"].search(search_val) != -1
        ) {
          parentElement.appendChild(buildUsualEntry(index));
          pinButtonMaker(index, labItems[index].name);
        }
      }
    }
  } else {
    searchbar_show = "none";
  }
  search_bar.style.display = searchbar_show;

  //for usual tabs
  if (testCategory != "searchbar" && testCategory != "analyse") {
    for (let index = 0; index < labItems.length; index++) {
      if (labItems[index]["type"] == testCategory) {
        parentElement.appendChild(buildUsualEntry(index));
      }
    }
  }
  //for analyse
  if (tabId == "tab_analyse") {
    analyseTab();
  }
}

function analyseTab() {
  engineMain();
  var measurements_parent = document.createElement("div");
  measurements_parent.className = "measurements_parent";
  parentElement.appendChild(measurements_parent);
  measurements_parent.innerHTML =
    "<img src='https://cdn-icons-png.flaticon.com/128/1225/1225656.png'  class='logo_table'  alt='measure'/> Found Measurements: ";
  for (i = 0; i < measurements.length; i++) {
    try {
      if (measurements[i].used) {
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
  findings_parent.innerHTML =
    "<img src='https://cdn-icons-png.flaticon.com/128/4251/4251962.png'  class='logo_table'  alt='guideline'/> Findings based on Clinical Guidelines: ";
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
  statisticsParent.innerHTML =
    "<div style='display: block'> <img src='https://cdn-icons-png.flaticon.com/128/9596/9596720.png'  class='logo_table'  alt='ebm'/> Evidence Based Statistics: </div>";
  for (let i = 0; i < patient[0].statistics[0].length; i++) {
    var statisticsEntry = document.createElement("div");
    statisticsEntry.className = "statisticsEntry";
    if (patient[0].statistics[0][i] != undefined) {
      statisticsParent.appendChild(statisticsEntry);
      statisticsEntry.style.backgroundColor = patient[0].statistics[1][i];
      var statisticsFirstLabel = document.createElement("div");
      statisticsFirstLabel.className = "statisticsFirstLabel";
      let reference = statistics[i].reference;
      let referenceHTML =
        "<a target='_blank' href='" +
        reference +
        "'><img src='https://cdn-icons-png.flaticon.com/128/1323/1323734.png' alt='Reference' class='referenceIcon'></a>";
      statisticsFirstLabel.innerHTML =
        patient[0].statistics[0][i] + referenceHTML + "<br>";
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
        "<b>Sensitivity</b> " + sens + "%<br><b>Specificity</b> " + spec + "%";
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

function buildUsualEntry(index) {
  {
    var entry = labItems[index];

    var entryParent = document.createElement("div");
    entryParent.className = "entry_box";
    entryParent.style.background = entry.color;
    entryParent.id = entry.name;
    entryParent.onmouseover = tooltip;
    entryParent.onmouseleave = tooltip_remove;

    entryParent.appendChild(labelParentMaker(entry));

    var new_input = document.createElement("input");
    new_input.type = "number";
    new_input.className = "entry_input";
    new_input.name = entry.name;
    new_input.style.background = entry.color;
    if (entry.entered != 0) new_input.value = entry.value;
    new_input.step = entry.step;
    entryParent.appendChild(new_input);

    var new_output_frame = document.createElement("div");
    new_output_frame.className = "entry_output_frame";
    entryParent.appendChild(new_output_frame);

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

    id_maker(index, entry.name);
    new_input.id = entry.input_id;
    new_output.id = entry.output_id;
    out_icon.id = entry.output_id + "_img";
    warn_icon.id = entry.output_id + "_warn";
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
    if (critValueArray[index] == 1) {
      warn_icon.style.display = "flex";
    } else {
      warn_icon.style.display = "none";
    }
    new_input.onchange = whenAnInputChanges;
    new_input.onkeyup = whenAnInputChanges;

    return entryParent;
  }
}

function labelParentMaker(entry) {
  var labelParent = document.createElement("div");
  labelParent.className = "labelParent";

  var entryNameLabel = document.createElement("label");
  entryNameLabel.className = "entryNameLabel";
  entryNameLabel.style.fontSize = "2rem";
  entryNameLabel.innerHTML = entry.name;
  labelParent.appendChild(entryNameLabel);

  var limitsParent = document.createElement("div");
  limitsParent.className = "limitsParent";
  limitsParent.style.width = "auto";
  var lowerLimitLabel = document.createElement("div");
  lowerLimitLabel.className = "lowerLimitLabel";
  var upperLimitLabel = document.createElement("div");
  upperLimitLabel.className = "upperLimitLabel";
  var unitLabel = document.createElement("div");
  unitLabel.className = "unitLabel";
  unitLabel.innerHTML = " " + entry.unit;
  var minmaxArray = [];
  minmaxArray = labelMaker(entry);
  lowerLimitLabel.innerHTML = minmaxArray[0];
  upperLimitLabel.innerHTML = minmaxArray[1];
  if (minmaxArray[1] === "> ") {
    limitsParent.appendChild(upperLimitLabel);
    limitsParent.appendChild(lowerLimitLabel);
  } else {
    limitsParent.appendChild(lowerLimitLabel);
    limitsParent.appendChild(upperLimitLabel);
  }
  limitsParent.appendChild(unitLabel);
  limitsParent.onclick = limitsExpand;
  limitsParent.id = "limit" + entry.name;
  labelParent.appendChild(limitsParent);
  limitsParent.style.display = "flex";
  return labelParent;
}

function limitsExpand() {
  let id = this.id;
  if (id.slice(0, 12) == "limitchanged") return false;
  let index = id.slice(5);
  var entry = labItems.find((o) => o.name === index.toString());
  let limitsParent = document.getElementById(id);
  this.style.display = "block";
  this.style.width = "150px";
  var lowerLimitParent = document.createElement("div");
  lowerLimitParent.className = "lowerLimitParent";
  var lowerLimitLabel = document.createElement("label");
  lowerLimitLabel.className = "lowerLimitLabel";
  lowerLimitLabel.innerHTML = "min:";
  var lowerLimitInput = document.createElement("input");
  lowerLimitInput.className = "lowerLimitInput";
  lowerLimitInput.id = "lowerLimitInput" + entry.name;
  lowerLimitInput.name = "lowerLimitInput";
  lowerLimitInput.style.backgroundColor = entry.color;
  lowerLimitLabel.htmlFor = "lowerLimitInput";
  lowerLimitInput.value = entry.min;
  lowerLimitParent.appendChild(lowerLimitLabel);
  lowerLimitParent.appendChild(lowerLimitInput);

  var upperLimitParent = document.createElement("div");
  upperLimitParent.className = "upperLimitParent";
  var upperLimitLabel = document.createElement("label");
  upperLimitLabel.className = "upperLimitLabel";
  upperLimitLabel.innerHTML = "max:";
  var upperLimitInput = document.createElement("input");
  upperLimitInput.className = "upperLimitInput";
  upperLimitInput.id = "upperLimitInput" + entry.name;
  upperLimitInput.name = "upperLimitInput";
  upperLimitInput.style.backgroundColor = entry.color;
  upperLimitLabel.htmlFor = "upperLimitInput";
  upperLimitInput.value = entry.max;
  upperLimitParent.appendChild(upperLimitLabel);
  upperLimitParent.appendChild(upperLimitInput);

  var unitParent = document.createElement("div");
  unitParent.className = "unitParent";
  var unitLabel = document.createElement("label");
  unitLabel.className = "unitLabel";
  unitLabel.innerHTML = "unit: " + entry.unit;
  var closeButton = document.createElement("button");
  closeButton.className = "closeButton";
  closeButton.id = "closeButton" + entry.name;
  closeButton.onclick = limitCollapse;
  closeButton.style.backgroundColor = entry.color;
  closeButton.innerHTML = "save";
  unitParent.appendChild(unitLabel);
  unitParent.appendChild(closeButton);
  limitsParent.id = "limitchanged";
  limitsParent.children[0].replaceWith(lowerLimitParent);
  limitsParent.children[1].replaceWith(upperLimitParent);
  limitsParent.children[2].replaceWith(unitParent);
}

function limitCollapse() {
  let index = this.id.slice(11);
  minIsNotBiggerThanMaxForLimits(index);
  var entry = labItems.find((o) => o.name === index.toString());
  let entryParent = document.getElementById(entry.name);
  let minElementId = "lowerLimitInput" + entry.name;
  let maxElementId = "upperLimitInput" + entry.name;
  let minElement = document.getElementById(minElementId);
  let maxElement = document.getElementById(maxElementId);
  entry.min = Number(minElement.value);
  entry.max = Number(maxElement.value);
  let entryInput = Number(document.getElementById(entry.input_id).value);
  if (document.getElementById(entry.input_id).value != "")
    check_ranges(entryInput, entry.input_id);
  entryParent.firstElementChild.replaceWith(labelParentMaker(entry));
}

function minIsNotBiggerThanMaxForLimits(entryName) {
  let minElementId = "lowerLimitInput" + entryName;
  let maxElementId = "upperLimitInput" + entryName;
  let minElement = document.getElementById(minElementId);
  let maxElement = document.getElementById(maxElementId);
  if (
    Number(minElement.value) > Number(maxElement.value) &&
    Number(maxElement.value) != 0
  ) {
    minElement.value = maxElement.value;
  }
}

function labelMaker(entry) {
  let min_string = "",
    max_string = "";
  if (entry.min == 0) {
    min_string = "< ";
    max_string = entry.max + " ";
  } else if (entry.max == 0) {
    min_string = entry.min;
    max_string = "> ";
  } else {
    min_string = entry.min + " - ";
    max_string = entry.max + " ";
  }
  return [min_string, max_string];
}

function pinButtonMaker(index, entryId) {
  var pinButton = document.createElement("img");
  pinButton.className = "add";
  pinButton.src = "https://cdn-icons-png.flaticon.com/512/2972/2972186.png";
  pinButton.id = index;
  pinButton.onclick = add_search;
  document.getElementById(entryId).appendChild(pinButton);
}

function unpinButtonMaker(index, entryId) {
  var rem_button = document.createElement("img");
  rem_button.className = "rem";
  rem_button.src = "https://cdn-icons-png.flaticon.com/128/6342/6342193.png";
  rem_button.id = index;
  document.getElementById(entryId).appendChild(rem_button);
  rem_button.onclick = rem_search;
}
