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
const cleanedInstructions = instruction.match(/mul\(\d+\,\d+\)/gm);

console.log(cleanedInstructions);

const sum = cleanedInstructions.reduce((acc, curr) => {
  const numbers = curr.match(/\d+/g);
  const product = numbers[0] * numbers[1];
  acc += product;
  return acc;
}, 0);

console.log(sum);
