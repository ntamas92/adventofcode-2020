import { fetchInput } from "./common_ts/inputAccess.ts";

let input = await fetchInput(14);

const convertToBinary = (n: number) : string =>  {
  let binary = "";
  while(Math.ceil(n/2) > 0){
      binary = n%2 + binary;
      n = Math.floor(n/2);
  }
  
  while(binary.length < 36)
    binary = "0" + binary

  return binary;
}

const applyMask = (value:string, mask:string): string => {
  console.log("beforeapply", value)  
  const asd = value.split("").map((x, ind) => mask[ind] === "X" ? x : mask[ind]).join("")
  console.log("afterapply", asd)
  return asd
}

const convertFromBinary = (valueInBinary : string): number => parseInt(valueInBinary, 2)

const inputInstructions = input.trimEnd().split("mask = ").flatMap((x) => {
  const [mask, ...rawCommands] = x.split("\n");
  const commands = rawCommands.map(y => {
    const groups = /mem\[(?<address>[0-9]+)\] = (?<value>[0-9]+)/.exec(y)?.groups
    
    return {mask, address: Number(groups?.["address"]), value: Number(groups?.["value"])}
  }).filter(x => x.address || x.address === 0)
  
  return commands
});


let memory : { [id: string] : number } = {}
inputInstructions.forEach(x => memory[x.address] = convertFromBinary(applyMask(convertToBinary(x.value), x.mask)))
console.log(Object.keys(memory).map(x => memory[x]).reduce((a, e) => a + e, 0))


console.log("Part2")
memory = {}

const extractFloatingBits = (valueWithFloatingBits: string): string[] => {
  if(valueWithFloatingBits.length === 1){
    return valueWithFloatingBits[0] === "X" ? ["0", "1"] : [valueWithFloatingBits[0]]
  }

  const firstChar = valueWithFloatingBits[0]
  const rest = extractFloatingBits(valueWithFloatingBits.slice(1));
  
  if(firstChar === "X") {
    return rest.map(x => "0" + x).concat(rest.map(x => "1" + x))
  }
  else {
    return rest.map(x => firstChar + x);
  }
}

const applyMask2 = (value:string, mask:string): string => {
  const asd = value.split("").map((x, ind) => {
    if(mask[ind] === "0")
      return x
    else 
      return mask[ind]
  }).join("")
  return asd
}


inputInstructions.forEach(x => {
  // console.log("mask:", x.mask)
  // console.log("addr:", convertToBinary(x.address))
  const maskedAddress = applyMask2(convertToBinary(x.address), x.mask)
  // console.log("mskd:", maskedAddress)
  const floatingBitsExtracted = extractFloatingBits(maskedAddress)
  // console.log(floatingBitsExtracted)
  floatingBitsExtracted.forEach(addr => memory[convertFromBinary(addr)] = x.value)
})

// console.log(memory)
console.log(Object.keys(memory).map(x => memory[x]).reduce((a, e) => a + e, 0))
