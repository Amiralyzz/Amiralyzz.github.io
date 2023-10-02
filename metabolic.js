function dyslipidemia() {
    let totalTG = Number(labItems[100].value);
    let totalChol = Number(labItems[101].value);
    let LDLChol = Number(labItems[102].value);
    let HDLChol = Number(labItems[103].value);
    let totalTGEntered = labItems[100].entered;
    let totalCholEntered = labItems[101].entered;
    let LDLCholEntered = labItems[102].entered;
    let HDLCholEntered = labItems[103].entered;
    let criteriaMet = 0;
    let path = "";
    patient[0].signs[0][50] = undefined;
    patient[0].signs[2][50] = "rgb(102, 30, 52)";
    if (totalTGEntered == 1 && totalTG >= 200) {
      path = "Total Triglycerides &ge; 200";
      criteriaMet++;
    }
    if (totalCholEntered == 1 && totalChol >= 240) {
      if (criteriaMet > 0) path += " and ";
      path += "Total Cholesterol &ge; 240";
      criteriaMet++;
    }
    if (LDLCholEntered == 1 && LDLChol >= 160) {
      if (criteriaMet > 0) path += " and ";
      path += "LDL-C &ge; 240";
      criteriaMet++;
    }
    if (HDLCholEntered == 1 && HDLChol < 40) {
      if (criteriaMet > 0) path += " and ";
      path += "HDL-C Cholesterol < 40";
      criteriaMet++;
    }
    patient[0].signs[1][50] = path;
    if (criteriaMet > 0) {
      patient[0].signs[0][50] = "Dyslipidemia";
      return true;
    }
    return false;
  }

  function diabetesMain() {
    console.log("working");
    conditionMaker(5);
  }