from common_py import input_access

class Rule:
  def __init__(self, ruleStr):
    ruleParts = list(map(lambda part: part.strip(), ruleStr.split(":")))
    self.ruleId = int(ruleParts[0])
    
    if ruleParts[1].startswith("\""):
      self.terminalCharacter = ruleParts[1][1]
      self.subRules = None
    else:
      self.terminalCharacter = None
      self.subRules = list(map(lambda rulePart: list(map(lambda ruleNum : int(ruleNum), rulePart.strip().split(" "))), ruleParts[1].split("|")))

(rules, input) = input_access.fetch_input(19).split("\n\n")

rules = list(map(lambda ruleStr: Rule(ruleStr), rules.splitlines()))
input = input.splitlines()

rules = {rule.ruleId : rule for rule in rules}

test = input[0]

ruleQueue = rules[0].subRules[:]

def doesRuleMatch(rule, word):
  if rule.terminalCharacter is not None:
    # Rule is terminal rule
    if word[0] == rule.terminalCharacter:
      return (True, word[1:])
    else:
      return (False, word[0:])

  for subRuleSet in rule.subRules:
    remaining = word
    match = True
    for subRule in subRuleSet:
      (match, remaining) = doesRuleMatch(rules[subRule], remaining)
      if not match:
        break
    
    if match:
      return (match, remaining)

  return (False, remaining)


validNum = 0
for line in input:
  (match, remaining) = doesRuleMatch(rules[0], line)
  if match and len(remaining) == 0:
    validNum = validNum + 1

print(validNum)
