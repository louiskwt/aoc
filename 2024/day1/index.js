import {createReadStream} from "node:fs";
import * as readline from "node:readline/promises";

const leftArr = [];
const rightArr = [];

async function processLineByLine() {
  const fileStream = createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const lineLen = line.length;
    const left = line.slice(0, 5);
    const right = line.slice(lineLen - 5, lineLen);
    leftArr.push(Number(left));
    rightArr.push(Number(right));
  }
}

await processLineByLine();

function sortArray(left, right) {
  return {
    sortedLeft: left.sort((a, b) => a - b),
    sortedRight: right.sort((a, b) => a - b),
  };
}

const {sortedLeft, sortedRight} = sortArray(leftArr, rightArr);

const totalDistance = sortedLeft.reduce((acc, currentLocation, currentIndex) => {
  acc += Math.abs(currentLocation - sortedRight[currentIndex]);
  return acc;
}, 0);

console.log(totalDistance);
