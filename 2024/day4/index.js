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

const XMAS = ["X", "M", "A", "S"];

let vc = 0;
let hc = 0;
let ldc = 0;
let rdc = 0;

/**
 * Check for horizontal XMAS
 * @param {string[]}  letters
 * @param {Number} currentIndex
 * @param {Number} end
 * @param {boolean} reverse
 * @returns {boolean}
 */
function horizontalCheck(letters, currentIndex, end, reverse = false) {
  let i = 1;
  console.log(currentIndex, end);
  const matches = [letters[currentIndex]];
  while (i < end) {
    const next = reverse ? currentIndex - i : currentIndex + i;
    console.log(`next ${next}`);
    if (XMAS[i] !== letters[next]) {
      break;
    } else {
      matches.push(letters[next]);
    }
    i += 1;
  }
  console.log(`horizontal: ${matches}`);
  return matches.length === XMAS.length;
}

/**
 * Check for vertical XMAS
 * @param {string[][]} letters
 * @param {Number} currentIndex
 * @param {Number} verticalIndex
 * @param {Number} end
 * @param {boolean} reverse
 * @returns {boolean}
 */
function verticalCheck(letters, currentIndex, verticalIndex, end, reverse = false) {
  let i = 1;
  //   console.log(`vertical: ${verticalIndex}, pos: ${currentIndex}, end: ${end}`);
  const matches = [letters[verticalIndex][currentIndex]];
  while (i < end) {
    const next = reverse ? verticalIndex - i : verticalIndex + i;
    console.log(`next ${next}`);
    if (XMAS[i] !== letters[next][currentIndex]) {
      break;
    } else {
      matches.push(letters[next][currentIndex]);
    }
    i += 1;
  }
  console.log(`vertical: ${matches}`);
  return matches.length === XMAS.length;
}
/**
 * Check for diagnol XMAS
 * @param {string[][]} letters
 * @param {Number} horizontalIndex
 * @param {Number} verticalIndex
 * @param {Number} end
 * @param {boolean} reverse
 * @returns {boolean}
 */
function leftDiagnolCheck(letters, horizontalIndex, verticalIndex, end, reverse = false) {
  let i = 1;
  //   console.log(`diagnol (vertical): ${verticalIndex}, pos: ${currentIndex}, end: ${end}`);
  const matches = [letters[verticalIndex][horizontalIndex]];
  while (i < end) {
    const nextV = reverse ? verticalIndex - i : verticalIndex + i;
    const nextH = reverse ? horizontalIndex + i : horizontalIndex - i;
    // console.log(`nextV: ${nextV}, nextH: ${nextH} `);
    if (XMAS[i] !== letters[nextV][nextH]) {
      break;
    } else {
      matches.push(letters[nextV][nextH]);
    }
    i += 1;
  }
  console.log(`diagnol: ${matches}`);
  return matches.length === XMAS.length;
}
/**
 * Check for alt diagnol XMAS
 * @param {string[][]} letters
 * @param {Number} horizontalIndex
 * @param {Number} verticalIndex
 * @param {Number} end
 * @param {boolean} reverse
 * @returns {boolean}
 */
function rightDiagnolCheck(letters, horizontalIndex, verticalIndex, end, reverse = false) {
  let i = 1;
  //  console.log(`diagnol (vertical): ${verticalIndex}, pos: ${currentIndex}, end: ${end}`);
  const matches = [letters[horizontalIndex][horizontalIndex]];
  while (i < end) {
    const nextV = reverse ? verticalIndex - i : verticalIndex + i;
    const nextH = reverse ? horizontalIndex - i : horizontalIndex + i;
    // console.log(`nextV: ${nextV}, nextH: ${nextH} `);
    if (XMAS[i] !== letters[nextV][nextH]) {
      break;
    } else {
      matches.push(letters[nextV][nextH]);
    }
    i += 1;
  }
  console.log(`diagnol: ${matches}`);
  return matches.length === XMAS.length;
}

let dc = 0;

let count = 0;

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
  }
}

console.log(`hc: ${hc}, vc: ${vc}, dc: ${dc}`);
count = hc + vc + dc;
console.log(`Count: ${count}`);
