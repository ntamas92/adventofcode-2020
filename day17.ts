import { fetchInput } from "./common_ts/inputAccess.ts";

const input = (await fetchInput(17)).split("\n");

let activeCells : Set<string> = new Set();

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row][col] === "#") {
      activeCells.add([row, col, 0].join(","));
    }
  }
}

console.log(activeCells);

const isCellActive = (x: number, y: number, z: number, activeSet: Set<string>): boolean => {
  return activeSet.has([x, y, z].join(","));
};

const getNeighbouringActiveCells = (x: number, y: number, z: number, activeSet: Set<string>): number => {
  let numActive = 0;
  if(x === 0 && y ===  1 && z === 0){
    console.log()
  }
  for(let i = x - 1; i <= x + 1; i++){
    for(let j = y - 1; j <= y + 1; j++){
      for(let k = z - 1; k <= z + 1; k++){
        if(i === x && j === y && k === z){
          continue;
        }

        if(isCellActive(i, j, k, activeSet)){
          numActive++;
        }
      }
    }
  }

  return numActive;
}

const getBoundaries = (activeSet: Set<string>) => {
  // console.log("activeCells", activeSet)
  const boundaries = []

  for(let i = 0; i < 3; i++){
    
    let firstValue = activeSet.values().next().value
    let lower = firstValue.split(",")[i]
    let upper = lower

    for(const activeCell of activeSet.values()){
      const coord = activeCell.split(",")[i]
      if(lower > +coord)
        lower = +coord
      else if (upper < +coord)
        upper = +coord
    }

    // console.log("lowerupper", lower, upper)
    boundaries.push({lower: lower - 1 , upper: upper + 1})
  }

  return boundaries
}


let boundaries = getBoundaries(activeCells)
let cycles = 0;



while(cycles <= 5){
  const activeInNext : Set<string> = new Set()

  for(let x = boundaries[0].lower; x <= boundaries[0].upper; x++){
    for(let y = boundaries[1].lower; y <= boundaries[1].upper; y++){
      for(let z = boundaries[2].lower; z <= boundaries[2].upper; z++){
        const numActiveNeighbours = getNeighbouringActiveCells(x, y, z, activeCells)
        const isActive = isCellActive(x, y, z, activeCells)

        if(isActive && (numActiveNeighbours === 2 || numActiveNeighbours === 3))
          activeInNext.add([x, y, z].join(","))
        else if(!isActive && numActiveNeighbours === 3)
          activeInNext.add([x, y, z].join(","))
      }
    }
  }

  activeCells = activeInNext
  cycles++
  boundaries = getBoundaries(activeCells)
  console.log("cycle", cycles)
  console.log(activeCells.size)
  // console.log(activeCells.size)
  
}