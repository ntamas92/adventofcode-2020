import { fetchInput } from "./common_ts/inputAccess.ts";

const inputString = await fetchInput(11);

let inputMatrix = inputString.split("\n").map((x) => [...x]);

const countOccupied = (row: number, column: number, lookFarAway? : boolean) => {
  let numNeighbors = 0;
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = column - 1; y <= column + 1; y++) {
      if (x === row && y === column) {
        continue;
      }

      if (x < 0 || x >= inputMatrix.length || y < 0 || y >= inputMatrix[x].length) {
        continue;
      }

        if(lookInDirection(row, column, { rowStep:x - row, columnStep:y - column }, lookFarAway)){
        numNeighbors++;
      }
    }
  }
  return numNeighbors;
};

const lookInDirection = (row: number, column: number, direction: {rowStep:number, columnStep:number}, lookFarAway? : boolean) : boolean => {
  const nextRow = row + direction.rowStep
  const nextColumn = column + direction.columnStep

  if (nextRow < 0 || nextRow >= inputMatrix.length || nextColumn < 0 || nextColumn >= inputMatrix[nextRow].length){
    return false
  }

  if(inputMatrix[nextRow][nextColumn].startsWith("#"))
    return true
  
  if(inputMatrix[nextRow][nextColumn].startsWith("L"))
    return false

  return lookFarAway ? lookInDirection(nextRow, nextColumn, direction, lookFarAway) : false
}

//# -> occupied seat
//L -> empty seat
//. -> no seat
//#L -> occupied seat which will be empty
//L# -> empty seat which will be occupied
const runSimulation = (seatOccupationTolerance: number, lookFarAway: boolean) => {
  let changesInTurn = 0;
  let numTurns = 0;
  do {
    changesInTurn = 0;
    for (let row = 0; row < inputMatrix.length; row++) {
      for (let column = 0; column < inputMatrix[row].length; column++) {
        if (inputMatrix[row][column].startsWith("L")) {
          const occupiedNeighbors = countOccupied(row, column, lookFarAway);
          if (occupiedNeighbors === 0) {
            inputMatrix[row][column] += "#";
            changesInTurn++;
          }
        } else if (inputMatrix[row][column].startsWith("#")) {
          
          const occupiedNeighbors = countOccupied(row, column, lookFarAway);

          if (occupiedNeighbors >= seatOccupationTolerance) {
            inputMatrix[row][column] += "L";
            changesInTurn++;
          }
        }
      }
    }

    inputMatrix = inputMatrix.map((row) => [...row.map((char) => char[char.length - 1])]);
    numTurns++;
  } while (changesInTurn > 0);

  console.log(inputMatrix.reduce((a, row) => a + row.reduce((aa, char) => aa + (char === "#" ? 1 : 0), 0), 0))
}

// console.table(inputMatrix)
runSimulation(4, false)
runSimulation(5, true)