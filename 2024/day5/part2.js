import {readFileSync} from "fs";

function main() {
  const input = readFileSync("./input.txt").toString().split("\n");

  const rules = {};
  const updates = [];

  // process input
  for (const line of input) {
    if (line.includes("|")) {
      const [prevPage, page] = line.split("|");
      rules[page] = rules[page] ? [...rules[page], prevPage] : [prevPage];
    } else if (line) {
      updates.push(line.split(","));
    }
  }
  let sum = 0;

  // loop over the updates
  for (const update of updates) {
    // check the update against the rule to see if not valid according to rules
    if (!isValidUpdate(update, rules)) {
      // ... make a copy to loop over
      for (const page of [...update]) {
        const targetPage = findRightPlace(update, page, rules);
        if (targetPage) {
          // move if targetPage found
          movePage(update, page, targetPage);
        }
      }
      console.log(update);
      sum += Number(update[Math.floor(update.length / 2)]);
    }
  }
  console.log(sum);
}

main();

function isValidUpdate(updateArr, rules) {
  for (const page of updateArr) {
    for (const prevPage of rules[page] ?? []) {
      if (updateArr.indexOf(prevPage) > updateArr.indexOf(page)) {
        return false;
      }
    }
  }
  return true;
}

function findRightPlace(pageArr, page, rules) {
  const prevPages = rules[page] ?? [];
  const prevIndices = prevPages.map((page) => pageArr.indexOf(page));
  const targetIndex = Math.max(...prevIndices);
  return targetIndex > pageArr.indexOf(page) ? pageArr[targetIndex] : 0;
}

// move page
function movePage(pageArr, page, targetPage) {
  // remove
  pageArr.splice(pageArr.indexOf(page), 1);
  // insert
  pageArr.splice(pageArr.indexOf(targetPage) + 1, 0, page);
}
