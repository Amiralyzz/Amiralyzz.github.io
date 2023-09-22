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
    patient[0].signs[2][1] = "darkslateblue";
    if (wbc < wbcMin && labItems[0].entered == 1) peniaCount++;
    if (hb < hbMin && labItems[2].entered == 1) peniaCount++;
    if (plt < pltMin && labItems[7].entered == 1) peniaCount++;
    if (peniaCount > 1) {
      patient[0].signs[0][1] = "Pancytopenia";
      patient[0].signs[1][1] = "two or more lineages are low";
  
      patient[0].signs[3][1] = 1;
      return true;
    } else {
      patient[0].signs[0][1] = undefined;
      patient[0].signs[1][1] = undefined;
      patient[0].signs[3][1] = 0;
      return false;
    }
  }
  function anemiaType() {
    let Hb = Number(labItems[2].value);
    let MCV = Number(labItems[3].value);
    let Hct = Number(labItems[4].value);
    let retic = Number(labItems[11].value);
    let HbEntered = Number(labItems[2].entered);
    let MCVEntered = Number(labItems[3].entered);
    let HctEntered = Number(labItems[4].entered);
    let reticEntered = Number(labItems[11].entered);
    let HbMin = Number(labItems[2].min);
    let MCVMin = Number(labItems[3].min);
    let MCVMax = Number(labItems[3].max);
    patient[0].signs[0][2] = undefined;
    patient[0].signs[1][2] = undefined;
    patient[0].signs[2][2] = "darkslateblue";
  
    //anemia algorithm based on RPI and MCV
    let path = "";
    conditionMaker(0);
    if (HbEntered == 0) {
      return false; 
    }
  
    if (Hb >= HbMin) {
      path += "Hb > " + HbMin;
      patient[0].signs[0][2] = "no anemia";
      patient[0].signs[1][2] = path;
      return false; //no anemia
    }
  
    if (MCVEntered == 1) {
      path += "Hb < " + HbMin + " &#8594 ";
      // we have mcv and we approach
      if (MCV < MCVMin) {
        //microcytic anemia
        path += " MCV < " + MCVMin;
        patient[0].signs[0][2] = "Microcytic anemia";
        patient[0].signs[1][2] = path;
        //now we have to check Iron profile , RDW , RBC count , MCH , if we have PBS
      } else if (MCV <= MCVMax) {
        //normocytic anemia
        path += MCVMin + " &ge; MCV &le; " + MCVMax;
        patient[0].signs[0][2] = "Normocytic anemia";
        patient[0].signs[1][2] = path;
      } else {
        //macrocytic anemia
        path += " MCV > " + MCVMax;
        patient[0].signs[0][2] = "Macrocytic anemia";
        patient[0].signs[1][2] = path;
      }
    } else {
      // we dont have mcv
      path += "Hb < " + HbMin + " and no MCV entered";
      patient[0].signs[0][2] = "Anemia";
      patient[0].signs[1][2] = path;
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

  function pbsMain() {
    conditionMaker(2);
    conditionMaker(3);
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