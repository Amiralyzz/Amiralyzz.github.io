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
function conditionMaker(conditionIndex) {
  let parameters = conditions[conditionIndex].statisticsParameteresRelated;
  let oneWereMet = 0;
  for (let parameter in parameters) {
    if (statisticsMaker(parameter)) oneWereMet = 1;
  }
  if (oneWereMet == 1) patient[0].conditions[conditionIndex] = 1;
  else patient[0].conditions[conditionIndex] = 0;
}

function statisticsMaker(labItemIndex) {
  if (labItems[statistics[labItemIndex].mydataIndex].value > 0) {
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
  let mydataItem = labItems[labItem.mydataIndex];
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
