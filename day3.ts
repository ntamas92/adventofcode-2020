import { fetchInput } from "./common_ts/inputAccess.ts";

const input = await fetchInput(3)

const lines = input.split("\n")
const lineLength = lines[0].length;

const first = () => {
  let encounteredTrees = 0;

  for(let i = 0; i < lines.length; i++) {
    if(lines[i][(i * 3) % lineLength] === "#"){
      encounteredTrees++
    }
  }
  
  console.log(encounteredTrees)
}

const second = () => {
  let sledOptions : Array<{strategy:(line:string, lineIndex:number) => boolean, count:number}> = [
    {strategy: (line, lineIndex) => line[lineIndex % lineLength] === "#", count: 0},
    {strategy: (line, lineIndex) => line[(lineIndex * 3) % lineLength] === "#", count: 0},
    {strategy: (line, lineIndex) => line[(lineIndex * 5) % lineLength] === "#", count: 0},
    {strategy: (line, lineIndex) => line[(lineIndex * 7) % lineLength] === "#", count: 0},
    {strategy: (line, lineIndex) => lineIndex % 2 === 0 ? line[(lineIndex / 2) % lineLength] === "#" : false, count: 0},
  ]

  for(let i = 0; i < lines.length; i++) {
    sledOptions.forEach(option => {
      if(option.strategy(lines[i], i))
        option.count++
    })
  }

  console.log(sledOptions.map(x => x.count).reduce((a, b)=> a * b, 1))
}

first()
second()



