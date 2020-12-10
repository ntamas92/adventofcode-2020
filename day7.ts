import { fetchInput } from "./common_ts/inputAccess.ts";

const lines = (await fetchInput(7)).trimEnd().split("\n");

const inputRegex = /(?<inputColor>[a-zA-Z ]*) bags contain/;
const containmentRegex =
  /(?<numBags>[0-9]+) (?<containedColor>[a-zA-Z ]*) bags?/g;

type ContainmentRule = {
  containedBy: string[];
  contains: { num: number; color: string }[];
};

const containmentRules: { [id: string]: ContainmentRule } = {};

for (const input of lines) {
  const inputColor = input.match(inputRegex)?.groups?.["inputColor"];
  if (inputColor) {
    const containedBags = [];

    for (const containedBagMatch of input.matchAll(containmentRegex)) {
      const containedColor = containedBagMatch.groups?.["containedColor"];
      if (containedColor) {
        const existingRule = containmentRules[containedColor];
        containmentRules[containedColor] = existingRule
          ? {
            ...existingRule,
            containedBy: existingRule.containedBy.concat(inputColor),
          }
          : { contains: [], containedBy: [inputColor] };

        containedBags.push({
          num: Number(containedBagMatch.groups?.["numBags"]),
          color: containedColor,
        });
      }
    }

    containmentRules[inputColor] = containmentRules[inputColor]
      ? { ...containmentRules[inputColor], contains: containedBags }
      : { containedBy: [], contains: containedBags };
  }
}

const canContainShinyGold = new Set();

let possibleContainers = containmentRules["shiny gold"].containedBy;

while (possibleContainers.length !== 0) {
  const containerBag = possibleContainers.pop();
  if (containerBag) {
    canContainShinyGold.add(containerBag);
    possibleContainers = possibleContainers.concat(
      containmentRules[containerBag].containedBy,
    );
  }
}

console.log(canContainShinyGold.size);

//Part2
const numContainedBags = (bag: string) : number => {
  return 1 + containmentRules[bag].contains.map(x => x.num * numContainedBags(x.color)).reduce((a, e) => a + e, 0)
}

console.log(numContainedBags("shiny gold") - 1)