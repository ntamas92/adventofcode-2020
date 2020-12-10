import { fetchInput } from "./common_ts/inputAccess.ts";

const day10input = await fetchInput(10);

const inputNumbers = day10input.split("\n").map(Number);

const inputSet = new Set(inputNumbers);

if (inputNumbers.length !== inputSet.size) {
  throw "Input contains duplicate adapters";
}

let currentJoltage = 0;
let numSteps = [0, 0, 0]

while (inputSet.size !== 0) {
  let modified = false
  for(let i = 0; i < numSteps.length; i++){
    const nextAdapterJoltage = currentJoltage + i + 1
    if(inputSet.has(nextAdapterJoltage)){
      numSteps[i]++;
      currentJoltage = nextAdapterJoltage
      inputSet.delete(nextAdapterJoltage)
      modified = true
      break
    }
  }
  if(!modified){
    throw "Not adaptable " + currentJoltage
  }
}

console.log(numSteps[0] * (numSteps[2] + 1))

//second part
const sortedAdapter = [0].concat(inputNumbers.sort((a, b) => a - b))
const numPaths = Array(sortedAdapter.length).fill(0)
numPaths[0] = numPaths[1] = 1;

for(let i  = 2; i < sortedAdapter.length; i++){
  if(i > 0 && (sortedAdapter[i-3] >= sortedAdapter[i] - 3)){
    numPaths[i] = numPaths[i - 3] + numPaths[i - 2] + numPaths[i - 1]
  }
  else if(sortedAdapter[i-2] >= sortedAdapter[i] - 2){
    numPaths[i] = numPaths[i - 2] + numPaths[i - 1]
  }
  else numPaths[i] = numPaths[i - 1]
}

console.log(numPaths[numPaths.length - 1])