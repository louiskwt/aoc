import {createReadStream} from "node:fs";
import * as readline from "node:readline/promises";

async function processLetters() {
  const fileStream = createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const letterLines = [];

  for await (const line of rl) {
    letterLines.push(line.split(""));
  }
  return letterLines;
}

const letterLines = await processLetters();

/**
 * AAMXMASASMXSAMXXSAMSAMXXSXMMSMMSXSASXSXSSSXSAMXXXSXMASXMAMMASAMXAXAXMXMSSMMSXSASXSAMXXMASMXSMMMMMXXMAXXSXXXAXMSAMXSMXMSXSAMXMXMSXMMXSMXMXSMS
 * AXMASXMAASAMMMSMSAMSAMXMAXMAAAMXMASAAMMMAAAMMXMASMAMAMASMSAASXMAXMMXASAMXAAAMSAMMMAMMMXMASASAXXASMMMMSAMMMXMASXMASMSMMMAMMMMMAXXAMXAXMAMSAAA
 * XMSMMAMXMMSMAAAAMAMSAMXAMAMSSSMXAMMMSMAMMMMMSASXAXAMASXMAAMXXMSMXSAMXSMMSMMSMMAMASAMMAAXSMMSAMSMMAAAMMAMAASMMMXMMXMASAMAMSMSSSSSSMMXSXMXAMXM
 * SAMXSAMSXMASMSSMSMMMMMMAMMMMAMASMXSAAMSMMAMXSASMSSXSASMMSMMMSMAAAXAAAXAAMAMXASMMMSASXSMSMMXMXMAXMSMSSSSMSMXAASMMAASAMXSASAAXAAMXAASMMASAMXAX
 */

console.log(letterLines);

const totalLength = letterLines.length;

let vc = 0;
let hc = 0;
let ldc = 0;
let rdc = 0;

let dc = 0;

let count = 0;

let xmasCount = 0;

for (let r = 0; r < totalLength; r++) {
  const lineLen = letterLines[r].length;
  for (let c = 0; c < lineLen; c++) {
    // horizontal
    if (c + 3 < lineLen && letterLines[r][c] === "X" && letterLines[r][c + 1] === "M" && letterLines[r][c + 2] === "A" && letterLines[r][c + 3] === "S") hc += 1;
    if (c + 3 < lineLen && letterLines[r][c] === "S" && letterLines[r][c + 1] === "A" && letterLines[r][c + 2] === "M" && letterLines[r][c + 3] === "X") hc += 1;
    // vertical
    if (r + 3 < totalLength && letterLines[r][c] === "X" && letterLines[r + 1][c] === "M" && letterLines[r + 2][c] === "A" && letterLines[r + 3][c] === "S") vc += 1;
    if (r + 3 < totalLength && letterLines[r][c] === "S" && letterLines[r + 1][c] === "A" && letterLines[r + 2][c] === "M" && letterLines[r + 3][c] === "X") vc += 1;
    // right diagnol
    if (r + 3 < totalLength && c + 3 < lineLen && letterLines[r][c] === "X" && letterLines[r + 1][c + 1] === "M" && letterLines[r + 2][c + 2] === "A" && letterLines[r + 3][c + 3] === "S") dc += 1;
    if (r - 3 >= 0 && c + 3 < lineLen && letterLines[r][c] === "X" && letterLines[r - 1][c + 1] === "M" && letterLines[r - 2][c + 2] === "A" && letterLines[r - 3][c + 3] === "S") dc += 1;
    // reverse diagnol
    if (r + 3 < totalLength && c + 3 < lineLen && letterLines[r][c] === "S" && letterLines[r + 1][c + 1] === "A" && letterLines[r + 2][c + 2] === "M" && letterLines[r + 3][c + 3] === "X") dc += 1;
    if (r - 3 >= 0 && c + 3 < lineLen && letterLines[r][c] === "S" && letterLines[r - 1][c + 1] === "A" && letterLines[r - 2][c + 2] === "M" && letterLines[r - 3][c + 3] === "X") dc += 1;

    // part 2
    // M . S
    //   A
    // M   S

    // S . M
    //   A
    // S . M

    // S . S
    //   A
    // M . M

    // M . M
    //   A
    // S . S

    if (r + 2 < totalLength && c + 2 < lineLen && letterLines[r][c] === "M" && letterLines[r][c + 2] === "S" && letterLines[r + 1][c + 1] === "A" && letterLines[r + 2][c] === "M" && letterLines[r + 2][c + 2] === "S") xmasCount += 1;
    if (r + 2 < totalLength && c + 2 < lineLen && letterLines[r][c] === "S" && letterLines[r][c + 2] === "M" && letterLines[r + 1][c + 1] === "A" && letterLines[r + 2][c] === "S" && letterLines[r + 2][c + 2] === "M") xmasCount += 1;
    if (r + 2 < totalLength && c + 2 < lineLen && letterLines[r][c] === "S" && letterLines[r][c + 2] === "S" && letterLines[r + 1][c + 1] === "A" && letterLines[r + 2][c] === "M" && letterLines[r + 2][c + 2] === "M") xmasCount += 1;
    if (r + 2 < totalLength && c + 2 < lineLen && letterLines[r][c] === "M" && letterLines[r][c + 2] === "M" && letterLines[r + 1][c + 1] === "A" && letterLines[r + 2][c] === "S" && letterLines[r + 2][c + 2] === "S") xmasCount += 1;
  }
}

console.log(`hc: ${hc}, vc: ${vc}, dc: ${dc}`);
count = hc + vc + dc;
console.log(`Count: ${count}`);
console.log(`xmas: ${xmasCount}`);
