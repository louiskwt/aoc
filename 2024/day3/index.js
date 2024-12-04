import {createReadStream} from "node:fs";
import * as readline from "node:readline/promises";

async function processInstructions() {
  const fileStream = createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let fileContent = "";

  for await (const line of rl) {
    fileContent += line;
  }
  return fileContent;
}

const instruction = await processInstructions();

console.log(instruction);

// massage the instructioins with regex by replacing everything outside of mul(xx, xx) with ' '
const cleanedInstructions = instruction.match(/mul\(\d+\,\d+\)|do\(\)|don't\(\)/gm);

console.log(cleanedInstructions);

let sum = 0;
let enabled = true;

for (const instruction of cleanedInstructions) {
  // handle do & don't
  if (instruction === "don't()") {
    enabled = false;
  }
  if (instruction === "do()") {
    enabled = true;
  }

  if (enabled && instruction !== "do()" && instruction !== "don't()") {
    const numbers = instruction.match(/\d+/g);
    sum += numbers[0] * numbers[1];
  }
}

console.log(sum);
