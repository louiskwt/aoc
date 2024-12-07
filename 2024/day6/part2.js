import {readFile} from "fs";

readFile("example.txt", "utf-8", (err, data) => {
  const input = data.split("\n").map((r) => r.split(""));

  const guardPos = {x: 0, y: 0, d: 0};
  const rows = input.length;
  const cols = input[0].length;
  const block = "#";
  let loopCount = 0;

  // find guard position
  for (let i = 0; i < rows; i++) {
    if (input[i].includes("^")) {
      guardPos.x = i;
      guardPos.y = input[i].indexOf("^");
    }
  }

  const {x: startX, y: startY, d: startDirection} = guardPos;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // skip if it's already an obstacle or guard
      if (input[i][j] !== ".") continue;

      input[i][j] = "#";

      if (hasEnterLoop(input, rows, cols, startX, startY, startDirection)) loopCount++;

      input[i][j] = ".";
    }
  }
  console.log(loopCount);
});

function hasEnterLoop(input, rows, cols, startX, startY, startDirection) {
  const directions = [
    {dx: -1, dy: 0}, // up
    {dx: 0, dy: 1}, // right
    {dx: 1, dy: 0}, // down
    {dx: 0, dy: -1}, // left
  ];

  let x = startX;
  let y = startY;
  let d = startDirection;

  const visited = new Set();

  while (true) {
    const state = `${x},${y},${d}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);

    const nextX = x + directions[d].dx;
    const nextY = y + directions[d].dy;

    if (nextX < 0 || nextX >= rows || nextY === cols || nextY < 0) return false;

    if (input[nextX][nextY] === "#") {
      d = (d + 1) % 4;
    } else {
      x = nextX;
      y = nextY;
    }
  }
}
