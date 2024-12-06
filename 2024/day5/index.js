import {createReadStream} from "node:fs";
import * as readline from "node:readline/promises";

async function processInstructions() {
  const fileStream = createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const instructioins = [];
  const updates = [];

  for await (const line of rl) {
    if (line.includes("|")) {
      instructioins.push(line.split("|").map((n) => Number(n)));
    } else {
      if (line.length > 0) {
        updates.push(line.split(",").map((n) => Number(n)));
      }
    }
  }
  return {
    instructioins,
    updates,
  };
}

const {instructioins, updates} = await processInstructions();

console.log(instructioins, updates);

const correctUpdates = updates.filter((u) => {
  return u.every(checkUpdate);
});

console.log(correctUpdates);

const sum = correctUpdates.reduce((acc, curr) => {
  acc += curr[Math.floor(curr.length / 2)];
  return acc;
}, 0);

console.log(sum);

function checkUpdate(num, _, arr) {
  const before = instructioins
    .filter((i) => {
      return i.indexOf(num) === 1;
    })
    .map((i) => i[0]);

  // console.log("before: ", before, arr);

  if (before.length === 0) return true;

  return before.every((n) => {
    return !arr.includes(n) || arr.indexOf(n) <= arr.indexOf(num);
  });
}
