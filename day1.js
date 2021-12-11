const fs = require("fs");

const createArrayFromString = string => {
  return string.split("\n");
};

const createIntegersFromStringArray = stringArray => {
  return stringArray.map(num => parseInt(num));
};

const formatNumbers = numbers => {
  let arrayOfStringNumbers = createArrayFromString(numbers);
  return createIntegersFromStringArray(arrayOfStringNumbers);
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

const depthMeasurements = getDataFromFile();
console.log(calculateDepthIncreases(depthMeasurements));

module.exports = getDataFromFile;