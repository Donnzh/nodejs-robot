#!/usr/bin/env node
const { openStdin } = require("process");
const { isValidInput, isPlaceCommand, robotDescription } = require("./utils");
const { placeAction, moveAction, reportAction } = require("./actions");

const initialize = () => {
  const stdin = openStdin();
  let position = [0, 0];
  let direction = null;
  let firstRound = true;
  stdin.addListener("data", (data) => {
    const command = data.toString().trim().replace(/ /g, "");
    const isValid = isValidInput(firstRound, command);

    if (isValid) {
      firstRound = false;
      if (isPlaceCommand(command)) {
        const placeResult = placeAction(command, position, direction);
        if (placeResult) {
          position = placeResult.newPosition;
          direction = placeResult.direction;
        }
      } else if (command === "REPORT") {
        reportAction(position, direction);
      } else {
        const moveResult = moveAction(command, position, direction);
        if (moveResult) {
          direction = moveResult.direction;
          position = moveResult.newPosition;
        }
      }
    }
  });
};

const start = () => {
  robotDescription();
  initialize();
};

start();
