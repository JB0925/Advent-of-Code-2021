const fs = require("fs");
const ZERO = "0";
const ONE = "1";

const createArrayFromString = string => {
  return string.split("\n").filter(line => line !== "");
};
  
const getDataFromFile = () => {
  return createArrayFromString(fs.readFileSync("day3input.txt", "utf-8"));
};

const addOrSubtractFromTotal = (binaryDigit, binaryTallyObject, key) => {
  if (binaryDigit === ZERO) binaryTallyObject[key] -= 1;
  else binaryTallyObject[key] += 1;
};

const calculateGammaValue = binaryObject => {
  let gamma = "";
  for (let key in binaryObject) {
    if (binaryObject[key] < 0) gamma += "0";
    else gamma += "1";
  };

  return gamma;
};

const calculateEpsilonValue = gammaValue => {
  let epsilon = "";
  for (let binaryDigit of gammaValue) {
    if (binaryDigit === ZERO) epsilon += ONE;
    else epsilon += ZERO;
  };

  return epsilon;
};

const calculateBinaryTallies = binaryArray => {
  let binaryTallies = {
    0: 0, 1: 0, 2: 0, 3: 0,
    4: 0, 5: 0, 6: 0, 7: 0,
    8: 0, 9: 0, 10: 0, 11: 0
  };

  for (let binaryString of binaryArray) {
    binaryString.split("").map((bit, idx) => addOrSubtractFromTotal(bit, binaryTallies, idx));
  };

  return binaryTallies;
};

const convertFromBinaryToDecimal = binaryString => {
  let decimalConversion = 0;
  let startingIndex = 11;

  for (let digit of binaryString) {
    if (digit === ONE) {
      decimalConversion += (2 ** startingIndex);
    };

    startingIndex--;
  };

  return decimalConversion;
};

const binaryData = getDataFromFile();
const binaryObject = calculateBinaryTallies(binaryData);
const binaryGamma = calculateGammaValue(binaryObject);
const binaryEpsilon = calculateEpsilonValue(binaryGamma);
const decimalGamma = convertFromBinaryToDecimal(binaryGamma);
const decimalEpsilon = convertFromBinaryToDecimal(binaryEpsilon);
console.log(decimalGamma * decimalEpsilon);
