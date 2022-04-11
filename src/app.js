#!/usr/bin/env node
const { openStdin } = require("process");
const { isValidInput, isPlaceCommand, robotDescription } = require("./utils");
const { placeAction, moveAction, reportAction } = require("./actions");

const initialize = () => {
  const stdin = openStdin();
  let position = [0, 0];
  let direction = null;
  let round = 0;
  stdin.addListener("data", (data) => {
    const inputLine = data.toString().trim().replaceAll(" ", "");
    const isValid = isValidInput(round, inputLine);

    if (isValid) {
      round++;
      if (isPlaceCommand(inputLine)) {
        const placeResult = placeAction(inputLine, position, direction);
        if (placeResult) {
          position = placeResult.newPosition;
          direction = placeResult.direction;
        }
      } else if (inputLine === "REPORT") {
        reportAction(position, direction);
      } else {
        const moveResult = moveAction(inputLine, position, direction);
        if (moveResult) {
          direction = moveResult.direction;
          position = moveResult.newPosition;
        }
      }
    }
  });
};

const toyStart = () => {
  robotDescription();
  initialize();
};

toyStart();
