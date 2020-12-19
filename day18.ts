import { fetchInput } from "./common_ts/inputAccess.ts";

const lines = (await fetchInput(18)).split("\n");

const parsedLines = lines.map(line =>line.split(" ").join("").split(""))

const executeOperation = (lhs: number, operand: string, rhs: number) => {
  if(operand === "*")
    return lhs * rhs
  else if (operand === "+")
    return lhs + rhs
  else throw "unknown operand"
}

const solveSubEquation = (equationPortion: Array<string>) => {
  while(equationPortion.length !== 1){
    const lhs = Number(equationPortion[0])
    const operand = equationPortion[1]
    const rhs = Number(equationPortion[2])
  
    const result = executeOperation(lhs, operand, rhs)
  
    equationPortion.splice(0, 3, result.toString())
  }

  return equationPortion[0]
}

const solveEquation = (equation: Array<string>) => {
  const parentheses = []

  // console.log(equation)
  for (let i = 0; i < equation.length; i++){
    // console.log(i, equation.length)
    if(equation[i] === "(") {
      parentheses.push(i)
    }
    else if(equation[i] === ")"){
      const openingParentheses = parentheses.pop()
      if(openingParentheses === undefined)
        throw Error("Leave me alone i know what i am doing.")
  
      const subOperation = equation.slice(openingParentheses + 1, i)
      const result = solveSubEquation(subOperation)
      equation.splice(openingParentheses, i - openingParentheses + 1, result)
      i = openingParentheses
    }
  }
  
  if(equation.length > 1){
    return solveSubEquation(equation)
  }

  return equation[0]
}

const solvedEquations = parsedLines.map(x => solveEquation(x))
console.log(solvedEquations.map(x => +x).filter(x => !x))
const sum = solvedEquations.reduce((a, e) => a + Number(e), 0)
console.log(sum)