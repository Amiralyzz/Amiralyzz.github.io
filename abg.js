function abgMain() {
    let ph = Number(labItems[87].value);
    let hco3 = Number(labItems[88].value);
    let paco2 = Number(labItems[89].value);
    let phEntered = labItems[87].entered;
    let hco3Entered = labItems[88].entered;
    let paco2Entered = labItems[89].entered;
    let anionGap = measurements[16].value;
    let anionGapAvailable = measurements[16].used;
    let abgColor = "rgb(3, 82, 156)";
    let path = "";
    let deltaGap = 0,
      deltaRatio = 0;
    patient[0].signs[4][61] = "ABG not Decisive or ";
    patient[0].signs[3][61] = undefined;
    patient[0].signs[4][62] = "Anion Gap";
    patient[0].signs[3][62] = undefined;
    if (anionGapAvailable) {
      deltaGap = measurements[19].value;
      deltaRatio = measurements[20].value;
    }
    delete patient[0].signs[0][60];
    delete patient[0].signs[1][60];
    patient[0].signs[2][60] = abgColor;
    if (hco3Entered == 0 && paco2Entered == 0 && phEntered == 1) {
      if (ph > 7.45) {
        path += "pH > 7.45";
        patient[0].signs[0][60] = "Alkalosis";
        patient[0].signs[1][60] = path;
        patient[0].signs[3][61] = -1;
      } else if (ph < 7.35) {
        path += "pH < 7.35";
        patient[0].signs[0][60] = "Acidosis";
        patient[0].signs[1][60] = path;
        patient[0].signs[3][61] = 1;
      }
    } else if (hco3Entered == 1 && paco2Entered == 1 && phEntered == 1) {
      //all three entered
      //first lets check consistency
      let equationPH = 6.1 + Math.log10(hco3 / 0.03 / paco2);
      if (Math.abs(ph - equationPH) > 0.1) {
        path += "pH should be [6.1 + HCO3 / (0.03 * PaCO2)]";
        patient[0].signs[0][60] = "ABG not Consistent";
        patient[0].signs[1][60] = path;
        return 0;
      }
      if (ph <= 7.4) {
        //simple acidosis
        path += "pH &le; 7.4 &#8594 ";
        if (paco2 > 40) {
          path += "PaCO2 > 40 &#8594 ";
          //respiratory acidosis
          let predictedHCO3Low = 0;
          let predictedHCO3High = 0;
          if (globalRespiratoryChronicity == 0) {
            //acute respiratory
            predictedHCO3High = 25 + (paco2 - 40) / 10 + 3;
            predictedHCO3Low = 25 + (paco2 - 40) / 10 - 3;
            if (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable)) {
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Alkalosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = -1;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] = "Respiratory Acidosis";
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            } else if (anionGapAvailable && anionGap > 12) {
              path += "AG > 12 &#8594 ";
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = undefined;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] =
                "Respiratory Acidosis + Metabolic Acidosis (high AG)";
              path = abgDeltaCalc(deltaGap, deltaRatio, path);
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            }
          } else {
            //chronic respiratory
            predictedHCO3High = 25 + ((paco2 - 40) / 10) * 4 + 3;
            predictedHCO3Low = 25 + ((paco2 - 40) / 10) * 4 - 3;
            if (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable)) {
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Alkalosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = -1;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] = "Respiratory Acidosis";
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            } else if (anionGapAvailable && anionGap > 12) {
              path += "AG > 12 &#8594 ";
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = undefined;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Acidosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] =
                "Respiratory Acidosis + Metabolic Acidosis (high AG)";
              path = abgDeltaCalc(deltaGap, deltaRatio, path);
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            }
          }
        } else if (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable)) {
          //normal anion gap or no anion gap entered
          path += "PaCO2 &le; 40 &#8594 ";
          patient[0].signs[3][61] = 1;
          patient[0].signs[3][62] = 0;
          let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
          let predictedPaco2High = hco3 * 1.5 + 8 + 2;
          if (paco2 > predictedPaco2High) {
            // met acid + res acid
            path +=
              "PaCO2 > " + predictedPaco2High + " (Winter's predicted PaCO2)";
            patient[0].signs[0][60] = "Metabolic Acidosis + Respiratory Acidosis";
            patient[0].signs[1][60] = path;
            return 0;
          } else if (paco2 < predictedPaco2Low) {
            path +=
              "PaCO2 < " + predictedPaco2Low + " (Winter's predicted PaCO2)";
            patient[0].signs[0][60] =
              "Metabolic Acidosis + Respiratory Alkalosis";
            patient[0].signs[1][60] = path;
            return 0;
          } else {
            path +=
              "PaCO2 in " +
              predictedPaco2Low +
              "-" +
              predictedPaco2High +
              " (Winter's predicted PaCO2 Range)";
            if (!anionGapAvailable) {
              patient[0].signs[0][60] = "Metabolic Acidosis";
            } else {
              patient[0].signs[0][60] = "Metabolic Acidosis with normal AG";
            }
            patient[0].signs[1][60] = path;
            return 0;
          }
        } else if (anionGapAvailable && anionGap > 12) {
          // metabolic and high anion gap
          path += "PaCO2 &le; 40 &#8594 ";
          let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
          let predictedPaco2High = hco3 * 1.5 + 8 + 2;
          patient[0].signs[3][61] = 1;
          patient[0].signs[3][62] = 1;
          if (paco2 > predictedPaco2High) {
            // met acid + res acid
            path +=
              "PaCO2 > " + predictedPaco2High + " (Winter's predicted PaCO2)";
            patient[0].signs[0][60] =
              "Metabolic Acidosis (high AG) + Respiratory Acidosis";
            path = abgDeltaCalc(deltaGap, deltaRatio, path);
            patient[0].signs[1][60] = path;
            return 0;
          } else if (paco2 < predictedPaco2Low) {
            path +=
              "PaCO2 < " + predictedPaco2Low + " (Winter's predicted PaCO2)";
            patient[0].signs[0][60] =
              "Metabolic Acidosis (high AG) + Respiratory Alkalosis";
            path = abgDeltaCalc(deltaGap, deltaRatio, path);
            patient[0].signs[1][60] = path;
            return 0;
          } else {
            path +=
              "PaCO2 in " +
              predictedPaco2Low +
              "-" +
              predictedPaco2High +
              " (Winter's predicted PaCO2 Range)";
            patient[0].signs[0][60] = "Metabolic Acidosis with High AG";
            path = abgDeltaCalc(deltaGap, deltaRatio, path);
            patient[0].signs[1][60] = path;
            return 0;
          }
        }
      }
      if (ph >= 7.4) {
        path = "pH &ge; 7.4 &#8594 ";
        if (paco2 < 40) {
          path += "PaCO2 < 40 &#8594 ";
          //Respiratory Alkalosis
          let predictedHCO3Low = 0;
          let predictedHCO3High = 0;
          if (globalRespiratoryChronicity == 0) {
            //acute respiratory
            predictedHCO3High = 25 - ((paco2 - 40) / 10) * 2 + 0.1;
            predictedHCO3Low = 25 - ((paco2 - 40) / 10) * 2 - 0.1;
            if (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable)) {
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Alkalosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = -1;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] = "Respiratory Alkalosis";
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            } else if (anionGapAvailable && anionGap > 12) {
              path += "AG > 12 &#8594 ";
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = undefined;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] =
                "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
              path = abgDeltaCalc(deltaGap, deltaRatio, path);
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            }
          } else {
            //chronic respiratory
            predictedHCO3High = 25 - ((paco2 - 40) / 10) * 5 + 0.1;
            predictedHCO3Low = 25 - ((paco2 - 40) / 10) * 5 - 0.1;
            if (!anionGapAvailable || (anionGap <= 12 && anionGapAvailable)) {
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Alkalosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = -1;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis";
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] = "Respiratory Alkalosis";
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            } else if (anionGapAvailable && anionGap > 12) {
              path += "AG > 12 &#8594 ";
              if (hco3 > predictedHCO3High) {
                path += "HCO3 > " + predictedHCO3High + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = undefined;
                return 0;
              }
              if (hco3 < predictedHCO3Low) {
                path += "HCO3 < " + predictedHCO3Low + " (Predicted HCO3)";
                patient[0].signs[0][60] =
                  "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
                path = abgDeltaCalc(deltaGap, deltaRatio, path);
                patient[0].signs[1][60] = path;
                patient[0].signs[3][61] = 1;
                return 0;
              }
              path +=
                "HCO3 in Predicted Range (" +
                predictedHCO3Low +
                " - " +
                predictedHCO3High +
                ")";
              patient[0].signs[0][60] =
                "Respiratory Alkalosis + Metabolic Acidosis (high AG)";
              path = abgDeltaCalc(deltaGap, deltaRatio, path);
              patient[0].signs[1][60] = path;
              patient[0].signs[3][61] = 0;
              return 0;
            }
          }
        } else {
          path += "PaCO2 &ge; 40 &#8594 ";
          //met alkalosis
          let predictedPaco2High = 40 + ((hco3 - 25) / 10) * 6 + 0.1;
          let predictedPaco2Low = 40 + ((hco3 - 25) / 10) * 6 - 0.1;
          patient[0].signs[3][61] = -1;
          if (paco2 > predictedPaco2High) {
            // met alkalosis + res acid
            path += "PaCO2 > " + predictedPaco2High + " (predicted PaCO2)";
            patient[0].signs[0][60] =
              "Metabolic Alkalosis + Respiratory Acidosis";
            patient[0].signs[1][60] = path;
            return 0;
          } else if (paco2 < predictedPaco2Low) {
            path += "PaCO2 < " + predictedPaco2Low + " (predicted PaCO2)";
            patient[0].signs[0][60] =
              "Metabolic Alkalosis + Respiratory Alkalosis";
            patient[0].signs[1][60] = path;
            return 0;
          } else {
            path +=
              "PaCO2 in " +
              predictedPaco2Low +
              "-" +
              predictedPaco2High +
              " (predicted PaCO2 Range)";
            patient[0].signs[0][60] = "Metabolic Alkalosis";
            patient[0].signs[1][60] = path;
            return 0;
          }
        }
      }
      if (ph >= 7.35 && ph <= 7.45 && hco3 >= 22 && hco3 <= 28) {
        path = "";
        //ph,paco2,hco3 in normal range but high anion gap
        let predictedPaco2Low = hco3 * 1.5 + 8 - 2; //winter formula
        let predictedPaco2High = hco3 * 1.5 + 8 + 2;
        if (
          paco2 >= predictedPaco2Low &&
          paco2 <= predictedPaco2High &&
          anionGapAvailable &&
          anionGap > 12
        ) {
          //mixed
          if (deltaGap > 6) {
            path +=
              "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Gap > 6 and &Delta;Ratio > 1";
            patient[0].signs[0][60] =
              "Metabolic Acidosis with High AG + Metabolic Alkalosis (based on both &Delta;Gap and &Delta;Ratio)";
            patient[0].signs[1][60] = path;
            patient[0].signs[3][61] = 1;
            patient[0].signs[3][62] = 1;
          } else if (deltaRatio > 1) {
            path +=
              "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Ratio > 1";
            patient[0].signs[0][60] =
              "Metabolic Acidosis with High AG + Metabolic Alkalosis (based on &Delta;Ratio only)";
            patient[0].signs[1][60] = path;
            patient[0].signs[3][61] = 1;
            patient[0].signs[3][62] = 1;
          } else if (deltaGap < -6) {
            path +=
              "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Gap < -6 and &Delta;Ratio < 1";
            patient[0].signs[0][60] =
              "Metabolic Acidosis with High AG + Metabolic Acidosis with normal AG (based on both &Delta;Gap and &Delta;Ratio)";
            patient[0].signs[1][60] = path;
            patient[0].signs[3][61] = 1;
            patient[0].signs[3][62] = 1;
          } else if (deltaRatio < 1) {
            path +=
              "pH, PaCO2, and HCO3 are normal &#8594 AG > 12 &#8594 &Delta;Ratio < 1";
            patient[0].signs[0][60] =
              "Metabolic Acidosis with High AG + Metabolic Acidosis with normal AG (based on &Delta;Ratio only)";
            patient[0].signs[1][60] = path;
            patient[0].signs[3][61] = 1;
            patient[0].signs[3][62] = 1;
          }
        } else if (
          paco2 >= predictedPaco2Low &&
          paco2 <= predictedPaco2High &&
          (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
        ) {
          path += "pH, PaCO2, HCO3, and AG are normal";
          patient[0].signs[0][60] = "normal ABG";
          patient[0].signs[1][60] = path;
          patient[0].signs[3][61] = 0;
          patient[0].signs[3][62] = 0;
        } else if (
          paco2 > predictedPaco2High &&
          (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
        ) {
          path +=
            "pH, HCO3, and AG are normal but PaCO2 > " +
            predictedPaco2High +
            " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] = "PaCO2 is higher than predicted value ";
          patient[0].signs[1][60] = path;
        } else if (
          paco2 < predictedPaco2Low &&
          (!anionGapAvailable || (anionGapAvailable && anionGap <= 12))
        ) {
          path +=
            "pH, HCO3, and AG are normal but PaCO2 < " +
            predictedPaco2Low +
            " (Winter's predicted PaCO2)";
          patient[0].signs[0][60] = "PaCO2 is lower than predicted value ";
          patient[0].signs[1][60] = path;
          patient[0].signs[3][61] = 0;
          patient[0].signs[3][62] = 0;
        } else {
          path += "pH, PaCO2, HCO3, and AG are not compatible";
          patient[0].signs[0][60] = "non-compatible ABG";
          patient[0].signs[1][60] = path;
        }
      }
    }
  }