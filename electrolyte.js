function sodiumMain() {
    if (isHyponatremia()) {
      let resultArray = testEngine(1);
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
            "Hyponatremia"
          ),
          resultArray[1], //path
          44,
          "rgb(128, 70, 32)"
        );
      } catch {
        delete patient[0].signs[0][44];
        delete patient[0].signs[1][44];
        delete patient[0].signs[2][44];
      }
    } else {
      delete patient[0].signs[0][44];
      delete patient[0].signs[1][44];
      delete patient[0].signs[2][44];
    }
    if (isHypernatremia()) {
      let resultArray = testEngine(2);
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
            "Hypernatremia"
          ),
          resultArray[1], //path
          47,
          "rgb(128, 70, 32)"
        );
      } catch {
        delete patient[0].signs[0][47];
        delete patient[0].signs[1][47];
        delete patient[0].signs[2][47];
      }
    } else {
      delete patient[0].signs[0][47];
      delete patient[0].signs[1][47];
      delete patient[0].signs[2][47];
    }
  }
  
  function isHyponatremia() {
    let na = measurements[25].value;
    let naMin = Number(labItems[32].min);
    let enteredStatus = labItems[32].entered;
    if (enteredStatus == 1) {
      conditionMaker(1); //SIADH
      if (na < naMin) {
        return true;
      } else {
        return false;
      }
    } else return false;
  }
  function isHypernatremia() {
    let na = measurements[25].value;
    let naMax = Number(labItems[32].max);
    let enteredStatus = labItems[32].entered;
    if (enteredStatus == 1) {
      minimalUrineMaximumConcentration();
      urineOsmMoreThan750();
      if (na > naMax) {
        return true;
      } else {
        return false;
      }
    } else return false;
  }
  
  function urineOsmMoreThan750() {
    patient[0].signs[4][49] = "urine osm more than 750";
    patient[0].signs[3][49] = undefined;
    let urineOsm = labItems[86].value;
    let urineOsmEntered = labItems[86].entered;
    if (urineOsmEntered == 1) {
      if (urineOsm > 750) {
        patient[0].signs[3][49] = 1;
      } else {
        patient[0].signs[3][49] = 0;
      }
    }
  }
  function minimalUrineMaximumConcentration() {
    patient[0].signs[4][48] = "urine volume and osmolarity";
    patient[0].signs[3][48] = undefined;
    let urineVolume = labItems[95].value;
    let urineVolumeEntered = labItems[95].entered;
    let urineOsm = labItems[86].value;
    let urineOsmEntered = labItems[86].entered;
    if (urineOsmEntered == 1 && urineVolumeEntered == 1) {
      if (urineVolume < 500 && urineOsm > 800) {
        patient[0].signs[3][48] = 1; //then its not renal
      } else {
        patient[0].signs[3][48] = 0;
      }
    }
  }
  function serumOsmolarity() {
    let plasmaOsm = Number(labItems[85].value);
    let plasmaOsmEntered = labItems[85].entered;
    let urineOsm = Number(labItems[86].value);
    let urineOsmEntered = labItems[86].entered;
    patient[0].signs[4][41] = "Plasma Osmolarity";
    patient[0].signs[4][43] = "Urine Osmolarity";
    if (plasmaOsmEntered != 1) {
      plasmaOsm = 285;
    }
    if (urineOsmEntered != 1) {
      patient[0].signs[3][43] = undefined;
    }
    if (plasmaOsm < 280) {
      patient[0].signs[3][41] = 1;
    } else {
      patient[0].signs[3][41] = 0;
    }
    if (urineOsm < 100) {
      patient[0].signs[3][43] = 1;
    } else {
      patient[0].signs[3][43] = 0;
    }
    if (urineOsmEntered != 1) {
      patient[0].signs[3][43] = undefined;
    }
  }
  
  function severeHypothyroidism() {
    let TSH = Number(labItems[21].value);
    let TSHEntered = labItems[21].entered;
    patient[0].signs[4][30] = "TSH";
    if (TSH > 10) {
      patient[0].signs[3][30] = 1;
    } else {
      patient[0].signs[3][30] = 0;
    }
    if (TSHEntered == 0) {
      patient[0].signs[3][30] = undefined;
    }
  }
  
  function potassiumMain() {
    if (isHypokalemia()) {
      signMaker(
        listMaker(
          [
            "Insulin Excess",
            "Beta2-adrenergic agonists",
            "FHPP",
            "Hyperthyroidism",
            "Barrium Intoxication",
            "Theophyline",
            "Chloroquine",
          ],
          "Potassium Shift"
        ),
        "Potassium Shifts into cells",
        146,
        "rgb(128, 70, 32)"
      );
      if (labItems[82].entered == 0) {
        patient[0].signs[0][403] =
          "For Hypokalemia evaluation, Enter Urine Potassium";
        patient[0].signs[1][403] = "Urine K not Entered";
        patient[0].signs[2][403] = "rgb(128, 70, 32)";
        return true;
      }
      let resultArray = testEngine(3);
      try {
        signMaker(
          listMaker(
            arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
            "Hypokalemia"
          ),
          resultArray[1], //path
          143,
          "rgb(128, 70, 32)"
        );
      } catch {
        patient[0].signs[0][403] = undefined;
        patient[0].signs[1][403] = undefined;
        patient[0].signs[2][403] = undefined;
        patient[0].signs[0][406] = undefined;
        patient[0].signs[1][406] = undefined;
        patient[0].signs[2][406] = undefined;
      }
    } else {
      patient[0].signs[0][403] = undefined;
      patient[0].signs[1][403] = undefined;
      patient[0].signs[2][403] = undefined;
      patient[0].signs[0][406] = undefined;
      patient[0].signs[1][406] = undefined;
      patient[0].signs[2][406] = undefined;
    }
    if (isHyperkalemia()) {
      signMaker(
        listMaker(
          [
            "Hypertonicity (Manitol)",
            "Hyperglycemia",
            "Succinylcholine",
            "Aminocaproic Acid",
            "Digoxin",
            "Beta-Blockers",
            "Metabloic Acidosis",
            "Arginine or Lysine infusion",
            "Hyperkalemic Periodic Paralysis",
            "Low Insulin",
            "Excercise"
          ],
          "Potassium Shift"
        ),
        "Potassium Shifts from cells",
        413,
        "rgb(128, 70, 32)"
      );
      if (global9afludrocortisone == 0) {
        if (labItems[81].entered == 0) {
          patient[0].signs[0][412] =
            "For Hyperkalemia evaluation, Enter Urine Sodium";
          patient[0].signs[1][412] = "Urine Na not Entered";
          patient[0].signs[2][412] = "rgb(128, 70, 32)";
          return true;
        }
        let resultArray = testEngine(4);
        try {
          signMaker(
            listMaker(
              arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
              "Hyperkalemia"
            ),
            resultArray[1], //path
            412,
            "rgb(128, 70, 32)"
          );
        } catch {
          patient[0].signs[0][412] = undefined;
          patient[0].signs[1][412] = undefined;
          patient[0].signs[2][412] = undefined;
          patient[0].signs[0][413] = undefined;
          patient[0].signs[1][413] = undefined;
          patient[0].signs[2][413] = undefined;
        }
      } else {
        if (!measurements[26].used) {
          patient[0].signs[0][412] =
            "For Hyperkalemia evaluation, Enter TTKG";
          patient[0].signs[1][412] = "TTKG not Entered";
          patient[0].signs[2][412] = "rgb(128, 70, 32)";
          return true;
        }
        let resultArray = testEngine(5);
        try {
          signMaker(
            listMaker(
              arrayDuplicateRemover([...resultArray[0]].map((x) => x.value)),
              "Hyperkalemia"
            ),
            resultArray[1], //path
            412,
            "rgb(128, 70, 32)"
          );
        } catch {
          patient[0].signs[0][412] = undefined;
          patient[0].signs[1][412] = undefined;
          patient[0].signs[2][412] = undefined;
          patient[0].signs[0][413] = undefined;
          patient[0].signs[1][413] = undefined;
          patient[0].signs[2][413] = undefined;
        }
      }
    } else {
      patient[0].signs[0][412] = undefined;
      patient[0].signs[1][412] = undefined;
      patient[0].signs[2][412] = undefined;
      patient[0].signs[0][413] = undefined;
      patient[0].signs[1][413] = undefined;
      patient[0].signs[2][413] = undefined;
    }
  }
  function isHyperkalemia() {
    let k = Number(labItems[33].value);
    let kMax = Number(labItems[33].max);
    let kEntered = labItems[33].entered;
    if (kEntered == 1) {
      urineNahyperkalemia(); //[407]
      ttkgHyperkalemia(); //[408]
      gfrHyperkalemia(); //[409] <20 or not
      if (k > kMax) {
        return true;
      }
    } return false;
  }
  function urineNahyperkalemia() {
    patient[0].signs[4][407] = "TTKG";
    patient[0].signs[3][407] = undefined;
    let uNa = labItems[81].value;
    let uNaEntered = labItems[81].entered;
    if (uNaEntered == 1) {
      if (uNa < 25) patient[0].signs[3][407] = 1;
      else patient[0].signs[3][407] = 0;
    }
  }
  function ttkgHyperkalemia() {
    patient[0].signs[4][408] = "TTKG";
    patient[0].signs[3][408] = undefined;
    let ttkg = measurements[26].value;
    if (measurements[26].used) {
      if (ttkg > 8) {
        patient[0].signs[3][408] = 1;
        patient[0].signs[3][410] = 1;
      } else if (ttkg < 5) {
        patient[0].signs[3][408] = -1;
        patient[0].signs[3][410] = 0;
      } else {
        patient[0].signs[3][408] = 0;
        patient[0].signs[3][410] = 0;
      }
    }
  }
  function gfrHyperkalemia() {
    patient[0].signs[4][409] = "GFR";
    patient[0].signs[3][409] = undefined;
    let gfr = measurements[6].value;
    if (measurements[6].used) {
      if (gfr <= 20) patient[0].signs[3][409] = 1;
      else patient[0].signs[3][409] = 0;
    }
  }
  
  function isHypokalemia() {
    let k = Number(labItems[33].value);
    let kMin = Number(labItems[33].min);
    let kEntered = labItems[33].entered;
    if (kEntered == 1) {
      ttkgHypokalemia();
      aldosteroneHypokalemia();
      reninHypokalemia();
      cortisolHypokalemia();
      urineClHypokalemia();
      if (k < kMin) {
        return true;
      } else {
        return false;
      }
    } else return false;
  }
  function ttkgHypokalemia() {
    patient[0].signs[4][400] = "TTKG";
    patient[0].signs[3][400] = undefined;
    let ttkg = measurements[26].value;
    if (measurements[26].used) {
      if (ttkg > 4) patient[0].signs[3][400] = 1;
      else if (ttkg < 2) patient[0].signs[3][400] = -1;
      else patient[0].signs[3][400] = 0;
    }
  }
  function aldosteroneHypokalemia() {
    patient[0].signs[4][402] = "Aldosterone";
    patient[0].signs[3][402] = undefined;
    let aldosterone = Number(labItems[96].value);
    let aldosteroneMax = Number(labItems[96].max);
    let aldosteroneEntered = labItems[96].entered;
    if (aldosteroneEntered == 1) {
      if (aldosterone > aldosteroneMax) {
        patient[0].signs[3][402] = 1;
      } else {
        patient[0].signs[3][402] = 0;
      }
    }
  }
  function reninHypokalemia() {
    patient[0].signs[4][403] = "Renin";
    patient[0].signs[3][403] = undefined;
    let renin = Number(labItems[97].value);
    let reninMax = Number(labItems[97].max);
    let reninEntered = labItems[97].entered;
    if (reninEntered == 1) {
      if (renin > reninMax) {
        patient[0].signs[3][403] = 1;
      } else {
        patient[0].signs[3][403] = 0;
      }
    }
  }
  function cortisolHypokalemia() {
    patient[0].signs[4][404] = "Morning Cortisol";
    patient[0].signs[3][404] = undefined;
    let cortisol = labItems[98].value;
    let cortisolMax = labItems[98].max;
    let cortisolEntered = labItems[98].entered;
    if (cortisolEntered == 1) {
      if (cortisol > cortisolMax) {
        patient[0].signs[3][404] = 1;
      } else {
        patient[0].signs[3][404] = 0;
      }
    }
  }
  function urineClHypokalemia() {
    patient[0].signs[4][405] = "Urine Chloride";
    patient[0].signs[3][405] = undefined;
    let urineChloride = labItems[94].value;
    let urineChlorideEntered = labItems[94].entered;
    if (urineChlorideEntered == 1) {
      if (urineChloride > 20) {
        patient[0].signs[3][405] = 1;
      } else {
        patient[0].signs[3][405] = 0;
      }
    }
  }