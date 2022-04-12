const {
  placeAction,
  moveAction,
  reportAction,
  movePosition,
} = require("../actions");

describe("ACTION TESTS", () => {
  test("it should return null if given invalid data to PlaceAction", () => {
    console.log = jest.fn();
    const result = placeAction("PLACE 6,7,NORTH");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[31m",
      "⛔️ Robot has fall off the table, Please input a valid position. Table dimensions: 5 * 5 ",
      "\x1b[0m"
    );
    expect(result).toEqual(null);
  });
  test("it should return new position if given valid data to PlaceAction", () => {
    const result = placeAction("PLACE3,4,SOUTH");
    expect(result.direction).toEqual("SOUTH");
    expect(result.newPosition[0]).toEqual("3");
    expect(result.newPosition[1]).toEqual("4");
  });

  test("it should return null if given invalid data to moveAction", () => {
    const result = moveAction("MOVE", ["5", "7"], "SOUTH");
    expect(result).toEqual(null);
    const result2 = moveAction("wrong command", ["5", "7"], "SOUTH");
    expect(result2).toEqual(null);
  });
  test("robot should move towards current direction with MOVE command", () => {
    const result = moveAction("MOVE", ["5", "5"], "SOUTH");
    expect(result.direction).toEqual("SOUTH");
    expect(result.newPosition).toEqual(["5", "4"]);
  });
  test("robot should turn to expected direction with LEFT and RIGHT command", () => {
    const result = moveAction("LEFT", ["5", "5"], "SOUTH");
    expect(result.direction).toEqual("EAST");
    expect(result.newPosition).toEqual(["5", "5"]);
    const result2 = moveAction("RIGHT", ["5", "5"], "SOUTH");
    expect(result2.direction).toEqual("WEST");
    expect(result2.newPosition).toEqual(["5", "5"]);
  });

  test("it should console log correct for when pass valid data to ReportAction", () => {
    console.log = jest.fn();
    reportAction(["5", "5"], "SOUTH");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[32m",
      "5,5,SOUTH",
      "\x1b[0m"
    );
  });

  test("it should return correct position if movePosition called with valid data", () => {
    const result = movePosition(["5", "5"], "SOUTH");
    expect(result).toEqual(["5", "4"]);
    const result2 = movePosition(["3", "5"], "WEST");
    expect(result2).toEqual(["2", "5"]);
    const result3 = movePosition(["3", "3"], "NORTH");
    expect(result3).toEqual(["3", "4"]);
    const result4 = movePosition(["3", "3"], "EAST");
    expect(result4).toEqual(["4", "3"]);
  });
});
