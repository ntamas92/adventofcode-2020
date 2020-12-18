from common_py import input_access
import re
input = input_access.fetch_input(16).split("\n\n")

class Rule:
  def __init__(self, inputDict):
    self.name = inputDict["fieldName"]
    self.lowerFirst = int(inputDict["lowerFirst"])
    self.upperFirst = int(inputDict["upperFirst"])
    self.lowerSecond = int(inputDict["lowerSecond"])
    self.upperSecond = int(inputDict["upperSecond"])
    self.indices = []
  
  def print(self):
     print(str(self.indices) + " " + self.name)

  def is_applicable(self, value):
    return (value >= self.lowerFirst and value <= self.upperFirst) or (value >= self.lowerSecond and value <= self.upperSecond)

  def find_own_index(self, tickets):
    index = 0

    while index < len(tickets[0]):
      everythingChecks = True
      for i in range(len(tickets)):
        if not self.is_applicable(tickets[i][index]):
          everythingChecks = False
      
      if everythingChecks:
        self.indices.append(index + 1)
      
      index = index + 1

def parseTicketToList(ticketString):
  return list(map(lambda item: int(item), ticketString.split(",")))

regex = re.compile("(?P<fieldName>.*): (?P<lowerFirst>[0-9]+)-(?P<upperFirst>[0-9]+) or (?P<lowerSecond>[0-9]+)-(?P<upperSecond>[0-9]+)")

rules = list(map(lambda line : Rule(regex.match(line).groupdict()), input[0].splitlines()))


nearbyTickets = list(input[2].splitlines()[1:])
nearbyTickets = list(map(lambda ticketString: parseTicketToList(ticketString), nearbyTickets))
# print(nearbyTickets)


validTickets = []
invalidTicketSum = 0
for i in range(len(nearbyTickets)):
  isValid = True
  for j in range(len(nearbyTickets[i])):
    isAccepted = False
    for k in range(len(rules)):
      if rules[k].is_applicable(nearbyTickets[i][j]):
        isAccepted = True
    
    if not isAccepted:
      invalidTicketSum = invalidTicketSum + nearbyTickets[i][j]
      isValid = False
  
  if isValid:
    validTickets.append(nearbyTickets[i])
    

print("part1:" , invalidTicketSum)

myticket = parseTicketToList(input[1].splitlines()[1])
print(myticket)
validTickets.append(myticket)

print(len(validTickets))

foundIndices = []

for rule in rules:
  rule.find_own_index(validTickets)
  rule.print()

foundIndices = []

while len(rules) != 0:
  exactRule = list(filter(lambda rule: len(rule.indices) == 1, rules))[0]
  # exactRule.print()
  foundIndices.append(exactRule)
  rules.remove(exactRule)
  for rule in rules:
    rule.indices.remove(exactRule.indices[0])


departureRules = filter(lambda rule: "departure" in rule.name, foundIndices)
departureRuleIndices = map(lambda rule: rule.indices[0], departureRules)


product = 1
for index in departureRuleIndices:
  product = myticket[index - 1] * product

print(product)

# print(list(map(lambda rule: rule.print(), rules)))