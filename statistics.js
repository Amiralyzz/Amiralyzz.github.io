function prevalenceChange() {
  let x = Number(this.value);
  let index = this.id.slice(11);
  console.log(index);
  conditions[index].prevalenceValue = x;
  posteriorCalc(index);
}

function posteriorCalc(ind) {
  // let conditionIndex = statistics[ind].conditionIndex;
  let conditionIndex = ind;
  let prevalenceValue = conditions[conditionIndex].prevalenceValue;
  let currentLikelihoodRatio = 1;
  let parameters = conditions[conditionIndex].statisticsParameteresRelated;
  for (let i = 0; i < parameters.length; i++) {
    let statisticsLikelihoodRatio =
      statistics[parameters[i]].currentLikelihoodRatio;
    currentLikelihoodRatio = currentLikelihoodRatio * statisticsLikelihoodRatio;
  }
  let currentRatio = prevalenceValue / (100 - prevalenceValue);
  let posteriorRatio = currentRatio * currentLikelihoodRatio;
  let posteriorDistribution = (100 / (1 + posteriorRatio)) * posteriorRatio;
  if (currentLikelihoodRatio == Infinity) posteriorDistribution= 100;
  conditions[conditionIndex].posteriorDistribution = posteriorDistribution;
  try {
    if (posteriorDistribution < 1)
      document.getElementById("prevalenceResult_" + conditionIndex).innerHTML =
        scientificNumber(posteriorDistribution) + "%";
    else
      document.getElementById("prevalenceResult_" + conditionIndex).innerHTML =
        posteriorDistribution.toFixed(2) + "%";
  } catch {}
}

function conditionMaker(conditionIndex) {
  let parameters = conditions[conditionIndex].statisticsParameteresRelated;
  let oneWereMet = 0;
  for (let index = 0; index < parameters.length; index++) {
    if (statisticsMaker(parameters[index])) oneWereMet = 1;
  }
  if (oneWereMet == 1) {
    patient[0].conditions[conditionIndex] = 1;
  } else {
    patient[0].conditions[conditionIndex] = 0;
  }
}

function statisticsMaker(parameterIndex) {
  let value = 0;
  let statisticsItem = statistics[parameterIndex];
  let enteredStatus = 0;
  let mydataItem = {};
  if (statisticsItem.myDataIndex >= 0) {
    mydataItem = labItems[statisticsItem.myDataIndex];
    enteredStatus = Number(mydataItem.entered);
  } else {
    mydataItem = measurements[statisticsItem.myDataIndex * -1];
    usedStatus = mydataItem.used;
    if (usedStatus) {
      enteredStatus = 1;
    } else {
      enteredStatus = 0;
    }
  }
  
  value = Number(mydataItem.value);
  if (enteredStatus == 1) {
    patient[0].statistics[0][parameterIndex] = statisticsCalc(parameterIndex);
    patient[0].statistics[1][parameterIndex] = statistics[parameterIndex].color;
    return true;
  } else {
    statistics[parameterIndex].currentLikelihoodRatio = 1;
    patient[0].statistics[0][parameterIndex] = undefined;
    patient[0].statistics[1][parameterIndex] = undefined;
    return false;
  }
}

function statisticsCalc(labItemIndex) {
  let labItem = statistics[labItemIndex];
  let mydataItem = {};
  if (labItem.myDataIndex >= 0) {
    mydataItem = labItems[labItem.myDataIndex];
  } else {
    mydataItem = measurements[labItem.myDataIndex * -1];
  }
  let cutoffsLength = labItem.cutoffs.length;
  let currentLikelihoodRatio = 1;
  let message = "";
  if (labItem.lessIsBad) {
    for (let i = cutoffsLength - 1; i >= 0; i--) {
      if (Number(mydataItem.value) < Number(labItem.cutoffs[i])) {
        currentLikelihoodRatio = likelihoodPositive(i, labItemIndex).toFixed(1);
        message =
          labItem.labItemName +
          " < " +
          labItem.cutoffs[i] +
          " &#8594 chance of " +
          labItem.conditionName;
        if (currentLikelihoodRatio == 0) {
          message += " is zero";
        } else if (currentLikelihoodRatio == 1) {
          message += " doesn't change";
        } else if (currentLikelihoodRatio == Infinity) {
          message += " is 100%";
        } else {
          message +=
            " is " +
            scientificNumber(currentLikelihoodRatio) +
            " times higher now";
        }
        statistics[labItemIndex].currentLikelihoodRatio =
          currentLikelihoodRatio;
        statistics[labItemIndex].currentCutoffIndex = i;
        posteriorCalc(statistics[labItemIndex].conditionIndex);
        return message;
      }
    }
    currentLikelihoodRatio = likelihoodNegative(0, labItemIndex);
    message =
      labItem.labItemName +
      " &ge; " +
      labItem.cutoffs[0] +
      " &#8594 chance of " +
      labItem.conditionName;
    if (currentLikelihoodRatio == 0) {
      message += " is zero";
    } else if (currentLikelihoodRatio == 1) {
      message += " doesn't change";
    } else if (currentLikelihoodRatio == Infinity) {
      message += " is 100%";
    } else {
      message +=
        " is " + scientificNumber(currentLikelihoodRatio) + " times lower now";
    }
  }
  if (!labItem.lessIsBad) {
    for (let i = cutoffsLength - 1; i >= 0; i--) {
      if (Number(mydataItem.value) > Number(labItem.cutoffs[i])) {
        currentLikelihoodRatio = likelihoodPositive(i, labItemIndex).toFixed(1);
        message =
          labItem.labItemName +
          " > " +
          labItem.cutoffs[i] +
          " &#8594 chance of " +
          labItem.conditionName;
        if (currentLikelihoodRatio == 0) {
          message += " is zero";
        } else if (currentLikelihoodRatio == 1) {
          message += " doesn't change";
        } else if (currentLikelihoodRatio == Infinity) {
          message += " is 100%";
        } else {
          message +=
            " is " +
            scientificNumber(currentLikelihoodRatio) +
            " times higher now";
        }
        statistics[labItemIndex].currentLikelihoodRatio =
          currentLikelihoodRatio;
        statistics[labItemIndex].currentCutoffIndex = i;
        posteriorCalc(statistics[labItemIndex].conditionIndex);
        return message;
      }
    }
    currentLikelihoodRatio = likelihoodNegative(0, labItemIndex);
    message =
      labItem.labItemName +
      " &le; " +
      labItem.cutoffs[0] +
      " &#8594 chance of " +
      labItem.conditionName;
    if ((currentLikelihoodRatio == 0)) {
      message += " is zero";
    } else if ((currentLikelihoodRatio == 1)) {
      message += " doesn't change";
    } else if (currentLikelihoodRatio == Infinity) {
      message += " is 100%";
    }else {
      message +=
        " is " + scientificNumber(currentLikelihoodRatio) + " times lower now";
    }
  }
  statistics[labItemIndex].currentLikelihoodRatio = currentLikelihoodRatio;
  statistics[labItemIndex].currentCutoffIndex = 0;
  posteriorCalc(statistics[labItemIndex].conditionIndex);
  return message;
}

function calculateMean(values) {
  const mean = values.reduce((sum, current) => sum + current) / values.length;
  return mean;
}

function calculateSD(values) {
  const average = calculateMean(values);
  const squareDiffs = values.map((value) => {
    const diff = value - average;
    return diff * diff;
  });
  const variance = calculateMean(squareDiffs);
  return Math.sqrt(variance);
}

function likelihoodNegative(cutoffIndex, labItemIndex) {
  let sens = statistics[labItemIndex].sensitivities[cutoffIndex];
  let spec = statistics[labItemIndex].specificities[cutoffIndex];
  let lrn = (1 - sens) / spec;
  return lrn;
}
function likelihoodPositive(cutoffIndex, labItemIndex) {
  let sens = statistics[labItemIndex].sensitivities[cutoffIndex];
  let spec = statistics[labItemIndex].specificities[cutoffIndex];
  let lrp = sens / (1 - spec);
  return lrp;
}
