function lftEngine() {
    let AST = labItems[14].value;
    let ASTMax = labItems[14].max;
    let ASTEntered = labItems[14].entered;
    let ALT = labItems[15].value;
    let ALTMax = labItems[15].max;
    let ALTEntered = labItems[15].entered;
    let ALP = labItems[16].value;
    let ALPMax = labItems[16].max;
    let ALPEntered = labItems[16].entered;
    let BilT = labItems[17].value;
    let BilTMax = labItems[17].max;
    let BilTEntered = labItems[17].entered;
    let BilD = labItems[18].value;
    let BilTEnteredEntered = labItems[18].entered;
    let LDH = labItems[80].value;
    let LDHEntered = labItems[80].entered;
    let astCoef = AST / ASTMax;
    let altCoef = ALT / ALTMax;
    let alpCoef = ALP / ALPMax;
    let biltCoef = BilT / BilTMax;
    let deRitisRatio = measurements[9].value;
    let path = "";
    delete patient[0].signs[0][20];
    delete patient[0].signs[1][20];
    delete patient[0].signs[2][20];
    delete patient[0].signs[0][21];
    delete patient[0].signs[1][21];
    delete patient[0].signs[2][21];
    let patternReturnArray = lftPattern(liverPanel);
    if (ASTEntered == 1 && ALTEntered == 1 && ALPEntered == 1) {
      if (astCoef / altCoef > 5 || astCoef / altCoef < 0.2) {
        patient[0].signs[0][20] = "Liver tests not conclusive";
        patient[0].signs[1][20] = "AST and ALT are not compatible";
        patient[0].signs[2][20] = "darkslategray";
      }
      patient[0].signs[0][21] = patternReturnArray[0];
      patient[0].signs[1][21] = patternReturnArray[1];
      patient[0].signs[2][21] = "darkslategray";
  
      if (patternReturnArray[0] != "Cholestatic pattern") {
        if (patternReturnArray[0] == "Mixed pattern") {
          path += "Mixed pattern";
        } else {
          path += "Hepato-cellular pattern";
        }
        if (altCoef > 50 || astCoef > 50) {
          path += " &#8594 rise more than 50 times the ULN";
          if (LDH > labItems[80].max) {
            path += " and LDH is elevated too";
          }
          patient[0].signs[0][20] = "Ischemic hepatitis";
          patient[0].signs[1][20] = path;
          patient[0].signs[2][20] = "darkslategray";
        } else if (altCoef > 25 || astCoef > 25) {
          path += " &#8594 rise more than 25 times the ULN";
          //virals can be checked here
          let prefix = "";
          if (deRitisRatio > 2) {
            prefix = "Fulminant ";
            path += " &#8594 De Ritis ratio is more than 2";
          } else if (deRitisRatio < 1) {
            prefix = "Resolving ";
            path += " &#8594 De Ritis ratio is less than 1";
          }
          patient[0].signs[0][20] =
            prefix + "Acute viral or toxin-related hepatits";
          patient[0].signs[1][20] = path;
          patient[0].signs[2][20] = "darkslategray";
        } else if (altCoef > 5 && astCoef > 8) {
          path +=
            " &#8594 AST and ALT rise more than 8 and 5 times the ULN respectively";
          patient[0].signs[0][20] = "Alcoholic fatty liver disease is unlikely";
          patient[0].signs[1][20] = path;
          patient[0].signs[2][20] = "darkslategray";
        } else if (altCoef > 4 && astCoef > 4) {
          path += " &#8594 AST and ALT rise more than 4 times the ULN";
          //ast to alt is complicated here and needs another function
          patient[0].signs[0][20] =
            "Non-alcoholic fatty liver disease is unlikely";
          patient[0].signs[1][20] = path;
          patient[0].signs[2][20] = "darkslategray";
        } else {
          path +=
            " &#8594 AST and ALT rise is " +
            astCoef.toFixed(1) +
            " and " +
            altCoef.toFixed(1) +
            " times the ULN respectively";
          patient[0].signs[0][20] = "Fatty liver disease or chronic Hepatitis";
          patient[0].signs[1][20] = path;
          patient[0].signs[2][20] = "darkslategray";
        }
      }
    } else if (
      AST == "" &&
      ALT == "" &&
      ALP == ""
    ) {
      return 0;
    } else {
      patient[0].signs[0][20] = "Liver tests not conclusive";
      patient[0].signs[1][20] = "AST and/or ALT and/or ALP not entered";
      patient[0].signs[2][20] = "darkslategray";
    }
  }
  
  function lftPattern(AST,ASTMax,ALT,ALTMax,ALP,ALPMax) {
    let altCoef = ALT / ALTMax;
    let alpCoef = ALP / ALPMax;
    let rValue = altCoef / alpCoef;
    let pattern = "";
    let path = "(ALT &#247 ALT ULN) &#247 (ALP &#247 ALP ULN) ";
    if (
      AST > ASTMax ||
      ALT > ALTMax ||
      ALP > ALPMax
    ) {
      if (rValue >= 5) {
        path += "&ge; 5";
        pattern = "Hepato-cellular pattern";
      } else if (rValue <= 2) {
        path += "&le; 2";
        pattern = "Cholestatic pattern";
      } else {
        path = "2 < " + path + " < 5";
        pattern = "Mixed pattern";
      }
    } else {
      path = "no elevation";
      pattern = "no pattern";
    }
    return [pattern, path];
  }