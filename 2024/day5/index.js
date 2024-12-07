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

const incorrectUpdates = updates.filter((u) => {
  return !u.every(checkUpdate);
});

// console.log(correctUpdates);

const sum = correctUpdates.reduce((acc, curr) => {
  acc += curr[Math.floor(curr.length / 2)];
  return acc;
}, 0);

console.log(sum);

// console.log(incorrectUpdates);

// const misplacedArr = incorrectUpdates.map((u, _, arr) => {
//   const misplacedArr = [];
//   for (const num of u) {
//     const before = instructioins.filter((i) => {
//       return i.indexOf(num) === 1;
//     });

//     before.map((n) => {
//       if (u.includes(n[0]) && u.indexOf(n[0]) > u.indexOf(num)) {
//         misplacedArr.push(n);
//       }
//     });
//   }
//   return misplacedArr;
// });

// console.log(misplacedArr);

// const fixedArr = incorrectUpdates.map((u, index, arr) => {
//   const updatedArr = [...u];
//   do {
//     for (const pair of misplacedArr[index]) {
//       const first = pair[0];
//       const second = pair[1];
//       const firstIndex = updatedArr.indexOf(first);
//       const secondIndex = updatedArr.indexOf(second);
//       const tmp = second;
//       updatedArr[secondIndex] = first;
//       updatedArr[firstIndex] = tmp;
//     }
//   } while (!updatedArr.every(checkUpdate));

//   return updatedArr;
// });

// console.log(fixedArr);

// const part2Sum = fixedArr.reduce((acc, curr) => {
//   acc += curr[Math.floor(curr.length / 2)];
//   return acc;
// }, 0);

// console.log(part2Sum);Vk

function checkUpdate(num, _, arr) {
  const before = instructioins
    .filter((i) => {
      return i.indexOf(num) === 1;
    })
    .map((i) => i[0]);

  if (before.length === 0) return true;

  return before.every((n) => {
    return !arr.includes(n) || arr.indexOf(n) <= arr.indexOf(num);
  });
}
