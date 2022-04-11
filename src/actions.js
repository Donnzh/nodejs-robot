const { consoleOutput } = require("./utils");

const placeAction = (inputLine) => {
  const positionInfo = inputLine.slice(5).split(",");
  const [positionX, positionY, direction] = positionInfo;
  const isValid = isValidPlacePosition([positionX, positionY]);

  if (isValid) return { newPosition: [positionX, positionY], direction };
  consoleOutput(
    "red",
    "⛔️ Robot has fall off the table, Please input a valid position. Table dimensions: 5 * 5 "
  );
  return null;
};

const moveAction = (inputLine, position, direction) => {
  let newPosition = [...position];

  if (inputLine === "LEFT" || inputLine === "RIGHT") {
    direction = updateDirection(direction, inputLine);
  }
  if (inputLine === "MOVE") {
    newPosition = movePosition(position, direction);
  }
  const isValid = isValidPlacePosition(newPosition);

  if (isValid) {
    return {
      newPosition,
      direction,
    };
  }
  return null;
};

const reportAction = (position, direction) => {
  let res = `${position[0]},${position[1]},${direction}`;
  consoleOutput("green", res);
  return;
};

const isValidPlacePosition = (position) =>
  position.every((p) => parseInt(p) >= 0 && parseInt(p) <= 5);

const updateDirection = (direction, inputLine) => {
  let newDirection = "";
  switch (direction) {
    case "NORTH":
      newDirection = inputLine === "LEFT" ? "WEST" : "EAST";
      break;
    case "SOUTH":
      newDirection = inputLine === "LEFT" ? "EAST" : "WEST";
      break;
    case "WEST":
      newDirection = inputLine === "LEFT" ? "SOUTH" : "NORTH";
      break;
    case "EAST":
      newDirection = inputLine === "LEFT" ? "NORTH" : "SOUTH";
      break;
  }
  return newDirection;
};

const movePosition = (position, direction) => {
  const newPosition = [...position];
  switch (direction) {
    case "NORTH":
      newPosition[1] = (parseInt(position[1]) + 1).toString();
      break;
    case "WEST":
      newPosition[0] = (parseInt(position[0]) - 1).toString();
      break;
    case "SOUTH":
      newPosition[1] = (parseInt(position[1]) - 1).toString();
      break;
    case "EAST":
      newPosition[0] = (parseInt(position[0]) + 1).toString();
      break;
  }
  return newPosition;
};

module.exports = { placeAction, moveAction, reportAction };
