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
      case "in_AST":
      case "in_ALT":
      case "in_ALP":
      case "in_Bil(T)":
      case "in_Bil(D)":
        lft_engine();
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

function minIsNotBiggerThanMax(x, id) {
  try {
    if (id == "in_Bil(D)") {
      var bilt_val = labItems[17].value;
      if (x > bilt_val && bilt_val != 0) {
        x = bilt_val;
        document.getElementById("in_Bil(D)").value = x;
      }
    } else if (id == "in_Bil(T)") {
      var bild_val = labItems[18].value;
      if (x < bild_val) {
        document.getElementById("in_Bil(D)").value = x;
      }
    } else {
    }
  } catch {}
}

function check_ranges(x, id) {
  var currentLabItem = labItems.find((o) => o.input_id === id.toString());
  minIsNotBiggerThanMax(x, id);
  if (x > currentLabItem.max && currentLabItem.max != 0) {
    y = x / currentLabItem.max;
    try {
      document.getElementById(currentLabItem.output_id + "_img").src =
        high_icon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
    } catch {}
  } else if (x < currentLabItem.min) {
    y = x / currentLabItem.min;
    try {
      document.getElementById(currentLabItem.output_id + "_img").src = low_icon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
    } catch {}
  } else {
    y = -1;
    try {
      document.getElementById(currentLabItem.output_id + "_img").src = nl_icon;
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "flex";
    } catch {}
  }
  let decimalPoint = 0;
  let st = percentileFinder(x, currentLabItem.min, currentLabItem.max);
  if (st >= 1) {
    decimalPoint = 0;
  }
  else {
    let decimalValue = Math.ceil(-1 * Math.log10(st));
    if (decimalValue < 3) {
        decimalPoint = decimalValue;
    } else {
        decimalPoint = 2;
    }
    console.log(st, decimalPoint, decimalValue)
  }
  st = st.toFixed(decimalPoint);
  if (x != "") {
    currentLabItem.status = "% = " + st.toString();
  }
  try {
    if (x > currentLabItem.critmax && currentLabItem.critmax != 0) {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "flex";
      critValueArray[j] = 1;
    } else if (x < currentLabItem.critmin && x != 0) {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "flex";
      critValueArray[j] = 1;
    } else {
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "none";
      critValueArray[j] = 0;
    }
  } catch {}
  currentLabItem.value = x;
  try {
    document.getElementById(currentLabItem.output_id).innerHTML =
      currentLabItem.status;
  } catch {}
  if (x == 0) {
    try {
      document.getElementById(currentLabItem.output_id).innerHTML = "";
      document.getElementById(currentLabItem.output_id + "_img").style.display =
        "none";
      document.getElementById(
        currentLabItem.output_id + "_warn"
      ).style.display = "none";
    } catch {}
    currentLabItem.status = 0;
  }
}
function cbc_autocomplete() {
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
    check_ranges(c_hct, "in_Hct");
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
    check_ranges(c_mch, "in_MCH");
    if (mcv_isnotzero) {
      c_mchc = (p_hb * 100) / c_hct;
      c_mchc = c_mchc.toFixed(1);
      labItems[6].value = c_mchc;
      try {
        document.getElementById("in_MCHC").value = c_mchc;
      } catch {}
      check_ranges(c_mchc, "in_MCHC");
    }
  }
}

function iron_profile() {
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
  var p_hb = labItems[2].value;
  if (p_hb <= 0) {
    return false;
  }
  if (p_hb < labItems[2].min) {
    return true;
  } else {
    return false;
  }
}

function anemiaType() {
  var p_rbc = labItems[1].value; //p = patient's
  var p_hb = labItems[2].value;
  var p_mcv = labItems[3].value;
  var p_hct = labItems[4].value;
  var p_mch = labItems[5].value;
  var p_rdw = labItems[8].value;
  var p_retic = labItems[11].value;
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
  if (p_hb >= labItems[2].min) {
    path += "Hb > " + labItems[2].min;
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
    path += "Hb < " + labItems[2].min + " &#8594 ";
    // we have mcv and we approach
    if (genderCoef == 0 || preg_situation == 0) {
      //this approach only for non-pregnants
      if (p_mcv < labItems[3].min) {
        //microcytic anemia
        path += " MCV < " + labItems[3].min;
        patient[0].signs[0][2] = "Microcytic anemia";
        patient[0].signs[1][2] = path;
        patient[0].signs[2][2] = cbc_color;
        //now we have to check Iron profile , RDW , RBC count , MCH , if we have PBS
      } else if (p_mcv < labItems[3].max) {
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

  iron_profile();
}

function folate() {
  var p_fol = labItems[43].value;
  var p_b12 = labItems[44].value;

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

  if (p_fol < labItems[43].min) {
    if (p_b12 < labItems[44].min && p_b12 > 0) {
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
  var p_b12 = labItems[44].value;
  var p_fol = labItems[43].value;
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
  if (p_b12 < labItems[44].min) {
    if (p_fol < labItems[43].min && p_fol > 0) {
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

function lft_engine() {
  let p_ast = labItems[14].value;
  let p_alt = labItems[15].value;
  let p_alp = labItems[16].value;
  let p_bilt = labItems[17].value;
  let p_bild = labItems[18].value;
  let liverPanel = [];
  liverPanel[0] = p_ast;
  liverPanel[1] = labItems[14].max;
  liverPanel[2] = p_alt;
  liverPanel[3] = labItems[15].max;
  liverPanel[4] = p_alp;
  liverPanel[5] = labItems[16].max;

  let lftString = new RegExp(/pattern/, "i");
  for (i = 0; i < patient[0].signs[0].length; i++) {
    if (lftString.test(patient[0].signs[0][i])) {
      delete patient[0].signs[0][i];
      delete patient[0].signs[1][i];
      delete patient[0].signs[2][i];
    }
  }
  patternReturnArray = lft_pattern(liverPanel, p_bilt, p_bild);
  if (liverPanel[0] != "" && liverPanel[2] != "" && liverPanel[4] != "") {
    patient[0].signs[0][30] = patternReturnArray[0];
    patient[0].signs[1][30] = patternReturnArray[1];
    patient[0].signs[2][30] = "darkslategray";
  }
}

function lft_pattern(liverPanel, bilt, bild) {
  let altCoef = liverPanel[2] / liverPanel[3];
  let alpCoef = liverPanel[4] / liverPanel[5];
  let r_value = altCoef / alpCoef;
  let pattern = "";
  let path = "(ALT &#247 ALT ULN) &#247 (ALP &#247 ALP ULN) ";
  if (
    liverPanel[0] > liverPanel[1] &&
    liverPanel[2] > liverPanel[3] &&
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
    path = "not all enzymes are elevated";
    pattern = "no pattern";
  }
  return [pattern, path];
}

function percentileFinder(x, min, max) {
  min = Number(min);
  max = Number(max);
  x = Number(x);
  let mean = (max + min) / 2;
  let standardDeviation = (max - mean) / 2;
  let z_score = (x - mean) / standardDeviation;
  let percentile = ztable_finder(z_score) * 100;
  return percentile;
}

function engineMain() {
  anemiaType();
  lft_engine();
  iron_profile();
  folate();
  b12();
  calc_measurements();
}
