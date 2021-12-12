const fs = require("fs");

const createArrayFromString = string => {
  return string.split("\n").filter(n => n !== "");
};

const createIntegerArrayFromStringArray = stringArray => {
  return stringArray.map(num => parseInt(num));
};

const formatNumbers = numbers => {
  let arrayOfStringNumbers = createArrayFromString(numbers);
  return createIntegerArrayFromStringArray(arrayOfStringNumbers);
};

const getDataFromFile = () => {
  return formatNumbers(fs.readFileSync("day1input.txt", "utf-8"));
};

const calculateDepthIncreases = depthMeasurements => {
  let total = 0;
  let previousMeasurement = depthMeasurements[0];

  for (let currentMeasurement of depthMeasurements) {
    if (currentMeasurement > previousMeasurement) total++;

    previousMeasurement = currentMeasurement;
  };

  return total;
};

const initialThreeDepthSum = depthMeasurements => {
  return depthMeasurements.slice(0,3).reduce((prev, cur) => prev + cur, 0);
};

const calculateDepthIncreasesThreeAtATime = depthMeasurements => {
  let total = 0;
  let previousThreeDepthSum = initialThreeDepthSum(depthMeasurements);
  let ENDPOINT = depthMeasurements.length - 2;
  
  for (let i = 0; i < ENDPOINT; i++) {
    let j = i + 1;
    let k = i + 2;
    let currentThreeDepthSum = depthMeasurements[i] + depthMeasurements[j] + depthMeasurements[k];

    if (currentThreeDepthSum > previousThreeDepthSum) total++;

    previousThreeDepthSum = currentThreeDepthSum;
  }

  return total;
};

const depthMeasurements = getDataFromFile();
console.log(calculateDepthIncreases(depthMeasurements));
console.log(calculateDepthIncreasesThreeAtATime(depthMeasurements))

module.exports = getDataFromFile;