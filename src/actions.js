const { consoleOutput } = require("./utils");

const placeAction = (command) => {
  const positionInfo = command.slice(5).split(",");
  const [positionX, positionY, direction] = positionInfo;
  const isValid = isValidPlacePosition([positionX, positionY]);

  if (isValid) return { newPosition: [positionX, positionY], direction };
  consoleOutput(
    "red",
    "⛔️ Robot has fall off the table, Please input a valid position. Table dimensions: 5 * 5 "
  );
  return null;
};

const moveAction = (command, position, direction) => {
  let newPosition = [...position];

  if (command === "LEFT" || command === "RIGHT") {
    direction = updateDirection(direction, command);
  }
  if (command === "MOVE") {
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

const updateDirection = (direction, command) => {
  let newDirection = "";
  switch (direction) {
    case "NORTH":
      newDirection = command === "LEFT" ? "WEST" : "EAST";
      break;
    case "SOUTH":
      newDirection = command === "LEFT" ? "EAST" : "WEST";
      break;
    case "WEST":
      newDirection = command === "LEFT" ? "SOUTH" : "NORTH";
      break;
    case "EAST":
      newDirection = command === "LEFT" ? "NORTH" : "SOUTH";
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

module.exports = { placeAction, moveAction, reportAction, movePosition };
