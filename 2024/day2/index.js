import {createReadStream} from "node:fs";
import * as readline from "node:readline/promises";

async function processReportLine() {
  const fileStream = createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const reportLines = [];

  for await (const line of rl) {
    const values = line.split(" ").map((v) => Number(v));
    reportLines.push(values);
  }
  return reportLines;
}

const reports = await processReportLine();

console.log(reports);

function checkIncreasing(num, index, arr) {
  if (!index) return true;
  const prev = arr[index - 1];
  return num > arr[index - 1] && num - prev <= 3;
}

function checkDecreasing(num, index, arr) {
  if (!index) return true;
  const prev = arr[index - 1];
  return num < prev && prev - num <= 3;
}

const safeReports = reports.filter((r) => {
  if (r.every(checkIncreasing) || r.every(checkDecreasing)) {
    return r;
  }
});

console.log(safeReports.length);
