import { fetchInput } from "./common_ts/inputAccess.ts";

const input = await fetchInput(6);

const groups = input.split("\n\n");

//part1
let numberOfQuestions = 0;
for (let group of groups) {
  const persons = group.split("\n");
  const distinctQuestions = new Set(persons.flatMap((x) => [...x]));
  numberOfQuestions += distinctQuestions.size;
}

//part2
let everyoneAnsweredYes = 0;
for (let group of groups) {
  const people = group.split("\n");

  const peopleAnswers = people.map(x => new Set([...x]))
  const commonAnswers = []

  peopleAnswers[0].forEach(answer => {
    if(peopleAnswers.reduce((prev, cur) => prev && cur.has(answer), true))
      commonAnswers.push(answer)
  })
  everyoneAnsweredYes += commonAnswers.length

  // console.log(commonAnswers.size)
}

console.log(everyoneAnsweredYes)



// console.log(numberOfQuestions);
