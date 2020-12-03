import { fetchInput } from "./common_ts/inputAccess.ts";

const input = await fetchInput(3);

const lines = input.split("\n");
const lineLength = lines[0].length;

const first = () => {
  console.log(countTrees(1, 3));
};

const second = () => {
  const slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];

  console.log(slopes.map((slope) => countTrees(slope[0], slope[1])).reduce((a, b) => a * b, 1));
};

const countTrees = (verticalSlope: number, horizontalSlope: number): number => {
  let y = 0;
  let x = 0;
  let treeCount = 0;
  while (x < lines.length) {
    if (lines[x][y % lineLength] === "#") {
      treeCount++;
    }

    x += verticalSlope;
    y = (y + horizontalSlope) % lineLength;
  }

  return treeCount;
};

first();
second();
