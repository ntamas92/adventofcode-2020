from common_py import input_access

input = input_access.fetch_input(8)
commands = list(map(lambda s : s.split(" "), input.rstrip().split("\n")))


def executeCode(instructions): 
  # print(commands)
  pointer, globalValue = 0, 0

  visitedInstructions = set()

  while pointer < len(instructions):
    if pointer in visitedInstructions:
      raise IndexError(globalValue)

    visitedInstructions.add(pointer)

    instruction = instructions[pointer][0]
    value = int(instructions[pointer][1])

    if instruction == "nop":
      pointer = pointer + 1
    elif instruction == "acc":
      globalValue += value
      pointer = pointer + 1
    elif instruction == "jmp":
      pointer = pointer + value
  
  return globalValue

try:
  executeCode(commands)
except IndexError as e:
  print(e)


# Part2
nop_jmp_indices = []
for i in range(len(commands)):
  if commands[i][0] == "nop" or commands[i][0] == "jmp":
    nop_jmp_indices.append(i)

for index in nop_jmp_indices:
  modified_commands = list(map(lambda listitem : list(listitem), commands))
  modified_commands[index][0] = "jmp" if modified_commands[index][0] == "nop" else "nop"
  try:
    result = executeCode(modified_commands)
    print("kiralysag", result)
  except IndexError as e:
    continue