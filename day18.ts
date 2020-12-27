import { fetchInput } from "./common_ts/inputAccess.ts";

const lines = (await fetchInput(18)).trimEnd().split("\n");

const parsedLines = lines.map(line =>line.split(" ").join("").split(""))

const executeOperation = (lhs: number, operand: string, rhs: number) => {
  if(operand === "*")
    return lhs * rhs
  else if (operand === "+")
    return lhs + rhs
  else throw "unknown operand" + operand
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

const solvePrecedentedSubEquation = (equationPortion: Array<string>) => {
  let index = 0
  // console.log("precedented:", equationPortion)
  while(index + 2 < equationPortion.length && equationPortion.length > 1){
    const lhs = Number(equationPortion[index])
    const operand = equationPortion[index + 1]
    const rhs = Number(equationPortion[index + 2])
    
    // console.log(index, equationPortion, `${lhs} ${operand} ${rhs}`)

    if(operand === "*")
      index = index + 2
    else {
      const result = executeOperation(lhs, operand, rhs)
      equationPortion.splice(index, 3, result.toString())
    }
  }

  if(equationPortion.length === 1)
    return equationPortion[0]
  
  return solveSubEquation(equationPortion)
}

const solveEquation = (equation: Array<string>) => {
  equation = [...equation]
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
      const result = solvePrecedentedSubEquation(subOperation)
      equation.splice(openingParentheses, i - openingParentheses + 1, result)
      i = openingParentheses
    }
  }
  
  if(equation.length > 1){
    return solvePrecedentedSubEquation(equation)
  }

  return equation[0]
}

const solvedEquations = [...parsedLines].map(x => solveEquation(x))
console.log(solvedEquations.map(x => +x))
const sum = solvedEquations.reduce((a, e) => a + Number(e), 0)
console.log(sum)