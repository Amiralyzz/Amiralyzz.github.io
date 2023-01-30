function tabContent(tabId, testCategory) {
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