input = [15,12,0,14,3,1]

numberOccurrences = dict()

for (index, x) in enumerate(input):
  numberOccurrences[x] = [index + 1]

lastNumber = input[-1]

turn = len(input) + 1
while  turn <= 30000000:
  if len(numberOccurrences[lastNumber]) == 1:
    numberToSay = 0
  else:
    numberToSay = numberOccurrences[lastNumber][-1] - numberOccurrences[lastNumber][-2]

  if numberToSay not in numberOccurrences:
    numberOccurrences[numberToSay] = [turn]
  else:
    numberOccurrences[numberToSay].append(turn)

  lastNumber = numberToSay
  turn = turn + 1

print(lastNumber)