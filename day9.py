from common_py import input_access

def contains_pair(preambleSet, value):
  for pair in preambleSet:
    if value - int(pair) in preambleSet:
      return True

  return False

input = list(map(lambda x: int(x), input_access.fetch_input(9).rstrip().split("\n")))

preamble = 25
slidingPreamble = set(input[:preamble])

invalid_number = 0
for i in range(preamble, len(input)):
  if not contains_pair(slidingPreamble, input[i]):
    invalid_number = input[i]
    print("found", input[i])
    break

  slidingPreamble.remove(input[i-preamble])
  slidingPreamble.add(input[i])

#part2
low_end, high_end = -1, -1
for i in range(len(input) - 1):
  sum = input[i]
  for j in range(i + 1, len(input)):
    sum = sum + input[j]
    if sum == invalid_number:
      print("found sum", i, j)
      low_end = i
      high_end = j
    elif sum > invalid_number:
      break
  
  if low_end != -1 and high_end != -1:
    break

interval = input[low_end:high_end + 1]
print("minmax: ", min(interval) + max(interval))