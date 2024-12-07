import {readFileSync} from "fs";
const input = readFileSync("./example.txt").toString().split("\n");

console.log(input);

const guardPos = {x: 0, y: 0, d: "U"};
const row = input.length;
const col = input[0].length;
const block = "#";

// find guard position
for (let i = 0; i < row; i++) {
  if (input[i].includes("^")) {
    guardPos.x = i;
    guardPos.y = input[i].indexOf("^");
  }
}

const {x: startX, y: startY} = guardPos;

let visitedPosition = [];

do {
  const {x: gx, y: gy, d: gd} = guardPos;

  visitedPosition.push({x: guardPos.x, y: guardPos.y});

  if (gd === "U") {
    if (gx - 1 < 0) break;

    if (input[gx - 1][gy] !== block) {
      // update pos
      guardPos.x = gx - 1;
    } else {
      guardPos.y = gy + 1;
      guardPos.d = "R";
    }
    continue;
  }

  if (gd === "R") {
    if (gy + 1 === col) break;

    if (gy + 1 < col && input[gx][gy + 1] !== block) {
      guardPos.y = gy + 1;
    } else {
      guardPos.x = gx + 1;
      guardPos.d = "D";
    }
    continue;
  }

  if (gd === "D") {
    if (gx + 1 === row) break;

    if (input[gx + 1][gy] !== block) {
      guardPos.x = gx + 1;
    } else {
      guardPos.y = gy - 1;
      guardPos.d = "L";
    }
    continue;
  }
  if (gd === "L") {
    if (gy - 1 < 0) break;

    if (input[gx][gy - 1] !== block) {
      guardPos.y = gy - 1;
    } else {
      guardPos.x = gx - 1;
      guardPos.d = "U";
    }
    continue;
  }
} while (guardPos.x >= 0 && guardPos.y >= 0 && guardPos.x < row && guardPos.y < col);

console.log(visitedPosition.length - 1);

const uniqueVisitedPositions = Array.from(new Set(visitedPosition.map((obj) => JSON.stringify(obj)))).map((str) => JSON.parse(str));
// console.log(uniqueVisitedPositions);
// console.log(uniqueVisitedPositions.length);

console.log(looped);

function hasEnteredLoop(visitedPositions) {
  // Get the current set of visited positions
  const currentVisitedPositions = new Set(visitedPositions.map((pos) => JSON.stringify(pos)));

  // Check if the size of the current set is the same as the previous set
  // If it's the same, it means the guard has entered a loop
  return currentVisitedPositions.size === visitedPositions.length;
}
