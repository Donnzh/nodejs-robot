## Toy Robot

Toy Robot is a nodejs cli reflect a robot moving on a square table, of dimension 5 units \* 5 units.
There are no other obstructions on the table surface. The robot is free to roam around the surface of the table without falling.

## Getting Start

The nodejs version require for this cli is `Node.js 12.x` or above.

1. Install dependencies: `yarn install`
2. Start the robot from file: `yarn start`

or

1. Install cli globally: `npm i -g`
2. Start the robot: `toy-robot`;

## Commands

1. First command should be the place command that position the robot in the table e.g. `PLACE 4,5,SOUTH`, any invalid command or command cause the robot out of table will not passed.

2. Second command can be `MOVE`,`LEFT`,`RIGHT`, which will make the robot move forward as facing direction or turn to left or right. Robot will not move if the command cause it fall off the table.

3. Command `REPORT` can be use to print the current position anytime after first command.

4. Robot position can be replaced by place command.

## Test

`yarn test` will run the unit testing.
