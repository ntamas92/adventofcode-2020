
import { fetchInput } from "./common/inputAccess.ts";

const input = await fetchInput(1);
const numbers = input.split("\n").filter(x => x.length > 0).map((x) => parseInt(x));

const first = () => {
  const numberSet = new Set<number>();

  for(const num of numbers) {
    if (numberSet.has(2020 - num)) {
      console.log(`Found pair: {${num}, ${2020 - num}}. Multiplied: ${num * (2020-num)}`);
    }
    numberSet.add(num);
  }
}

const second = () => {
  const numberSet = new Set<number>();

  for(const [firstIndex, firstNumber] of numbers.entries()) {
    for(const [secondIndex, secondNumber] of numbers.entries()) {
      if(firstIndex !== secondIndex){
        const thirdNumberCandidate = 2020 - firstNumber - secondNumber;

        if(thirdNumberCandidate > 0 && numberSet.has(thirdNumberCandidate)){
          const multiplied = firstNumber * secondNumber * thirdNumberCandidate
          console.log(`Found triple: {${firstNumber}, ${secondNumber}, ${thirdNumberCandidate}}. Multiplied: ${multiplied}`);
          return;
        }

        numberSet.add(secondNumber);
      }
    }
  }
}

first();
second();