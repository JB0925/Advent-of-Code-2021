const fs = require("fs");

const updateDirectionalTotals = ({ direction, distance, aim }, distanceObject) => {
  if (direction !== "forward") return;

  distanceObject.horizontal += distance;
  distanceObject.vertical += (aim * distance);
  
};

const calculateAim = ({ direction, distance, aim }) => {
  if (direction === "forward") return aim;
  if (direction === "up") return aim - distance;
  return aim + distance;
};

const createArrayFromString = string => {
  return string.split("\n").filter(line => line !== "");
};

const getDataFromFile = () => {
  return createArrayFromString(fs.readFileSync("day2input.txt", "utf-8"));
};

const getDirectionAndDistanceFromLine = line => {
    let [direction, distance] = line.split(" ");
    return [direction, +distance];
};

const determineFinalPosition = shipDirections => {
  let aim = 0;
  let finalDestination = {
    horizontal: 0,
    vertical: 0
  };

  for (let line of shipDirections) {
    let [direction, distance] = getDirectionAndDistanceFromLine(line);
    aim = calculateAim({ direction, distance, aim });
    updateDirectionalTotals({ direction, distance, aim }, finalDestination);
  };

  const { horizontal, vertical } = finalDestination;
  return horizontal * vertical;
};

const directions = getDataFromFile();
console.log(determineFinalPosition(directions));