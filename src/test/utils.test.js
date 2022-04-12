const { consoleOutput, isValidInput } = require("../utils");

describe("UTILS TESTS", () => {
  test("it should return false if given invalid input to isValidInput in first round", () => {
    console.log = jest.fn();
    const result = isValidInput(true, "PLACEad 6,7,NORTH");
    expect(result).toEqual(false);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[31m",
      "⛔️ First command should be like 'PLACE, PositionX, PositionY, Direction', e.g 'PLACE 5,5,NORTH'",
      "\x1b[0m"
    );
  });

  test("it should return false if given invalid input to isValidInput after first round", () => {
    console.log = jest.fn();
    const result = isValidInput(false, "UP AND DOWN");
    expect(result).toEqual(false);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[31m",
      "⛔️ Please input a valid command: MOVE, LEFT, RIGHT, REPORT, or reposition the Robot using 'PLACE X,Y,Direction'",
      "\x1b[0m"
    );
  });

  test("it should return true if pass correct place data to isValidInput", () => {
    const result = isValidInput(true, "PLACE4,5,NORTH");
    expect(result).toEqual(true);
  });
  test("it should return true if pass correct move data to isValidInput", () => {
    const result = isValidInput(false, "MOVE");
    expect(result).toEqual(true);
  });
  test("it should return true if pass correct turn data to isValidInput", () => {
    const result = isValidInput(false, "LEFT");
    const result2 = isValidInput(false, "RIGHT");
    const result3 = isValidInput(false, "UP");
    expect(result).toEqual(true);
    expect(result2).toEqual(true);
    expect(result3).toEqual(false);
  });

  test("it should console log correct text and color using consoleOutput", () => {
    console.log = jest.fn();
    consoleOutput("red", "red color text");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[31m",
      "red color text",
      "\x1b[0m"
    );
    consoleOutput("green", "red color text");
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[32m",
      "red color text",
      "\x1b[0m"
    );
  });
});
