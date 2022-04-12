const consoleOutput = (color, text) => {
  let displayColor = "";
  let defaultColor = "\x1b[0m";
  switch (color) {
    case "red":
      displayColor = "\x1b[31m";
      break;
    case "green":
      displayColor = "\x1b[32m";
      break;
    case "cyan":
      displayColor = "\x1b[46m";
      break;
    case "yellow":
      displayColor = "\x1b[33m";
      break;
    default:
      displayColor = "\x1b[0m";
      break;
  }
  console.log(displayColor, text, defaultColor);
  return;
};

const isValidInput = (firstRound, inputs) => {
  const placeRegExp = /PLACE[0-5],[0-5],(NORTH|WEST|EAST|SOUTH)/g;
  const otherRegExp = /(MOVE|LEFT|RIGHT|REPORT)/g;
  if (firstRound) {
    const isValid = placeRegExp.test(inputs);
    if (!isValid) {
      consoleOutput(
        "red",
        "⛔️ First command should be like 'PLACE, PositionX, PositionY, Direction', e.g 'PLACE 5,5,NORTH'"
      );
    }
    return isValid;
  } else {
    const isValid = otherRegExp.test(inputs) || placeRegExp.test(inputs);
    if (!isValid) {
      consoleOutput(
        "red",
        "⛔️ Please input a valid command: MOVE, LEFT, RIGHT, REPORT, or reposition the Robot using 'PLACE X,Y,Direction'"
      );
    }
    return isValid;
  }
};

const isPlaceCommand = (command) => command.includes("PLACE");

const robotDescription = () => {
  consoleOutput("cyan", "welcome to the game of Toy Robot");
  consoleOutput(
    "yellow",
    "Your first command will place Robot in a 5*5 table. e.g. PLACE 3,3,NORTH"
  );
  consoleOutput(
    "yellow",
    "You can move the Robot to its facing direction by type 'MOVE'"
  );
  consoleOutput(
    "yellow",
    "Type 'LEFT' or 'RIGHT' will let the The Robot turn its directions "
  );
  consoleOutput("green", "Type 'REPORT' to get current position");
  return;
};

module.exports = {
  consoleOutput,
  isValidInput,
  isPlaceCommand,
  robotDescription,
};
