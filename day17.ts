import { fetchInput } from "./common_ts/inputAccess.ts";

const input = (await fetchInput(17)).split("\n");

let activeCells : Set<string> = new Set();

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row][col] === "#") {
      activeCells.add([row, col, 0, 0].join(","));
    }
  }
}

console.log(activeCells);

const isCellActive = (x: number, y: number, z: number, w: number, activeSet: Set<string>): boolean => {
  return activeSet.has([x, y, z, w].join(","));
};

const getNeighbouringActiveCells = (x: number, y: number, z: number, w: number, activeSet: Set<string>): number => {
  let numActive = 0;
  if(x === 0 && y ===  1 && z === 0){
    console.log()
  }
  for(let i = x - 1; i <= x + 1; i++){
    for(let j = y - 1; j <= y + 1; j++){
      for(let k = z - 1; k <= z + 1; k++){
        for(let l = w - 1; l <= w + 1; l++){
          if(i === x && j === y && k === z && l === w){
            continue;
          }

          if(isCellActive(i, j, k, l, activeSet)){
            numActive++;
          }
        }
      }
    }
  }

  return numActive;
}

const getBoundaries = (activeSet: Set<string>) => {
  // console.log("activeCells", activeSet)
  const boundaries = []

  for(let i = 0; i < 4; i++){
    
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
        for(let w = boundaries[3].lower; w <= boundaries[3].upper; w++){
          const numActiveNeighbours = getNeighbouringActiveCells(x, y, z, w, activeCells)
          const isActive = isCellActive(x, y, z, w, activeCells)

          if(isActive && (numActiveNeighbours === 2 || numActiveNeighbours === 3))
            activeInNext.add([x, y, z, w].join(","))
          else if(!isActive && numActiveNeighbours === 3)
            activeInNext.add([x, y, z, w].join(","))
        }
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