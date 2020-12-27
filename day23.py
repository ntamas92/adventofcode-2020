input = list(map(lambda x: int(x), "739862541"))

def takeSlice(lst, start, length):
  start = start % len(lst)
  stop = (start + length) % len(lst)

  if (start <= stop):
    return (lst[start:stop], lst[:start] + lst[stop:])
  else:
    return (lst[start:] + lst[:stop], lst[stop: start])

# print(takeSlice(input, 6, 3))


current_index = 0
moves = 1
# print(input)

while moves <= 100:
  currentcup = input[current_index]
  (slice, remainder) = takeSlice(input, current_index + 1, 3)
  # print(slice, remainder)
  
  destinationcup = currentcup - 1
  while destinationcup in slice or destinationcup == 0:
    destinationcup = destinationcup - 1
    if destinationcup <= 0:
      destinationcup = max(input)
    
  destination_index = remainder.index(destinationcup)
  print(destinationcup)

  originalremainderlen = len(remainder)
  for i in range(len(slice)): 
    remainder.insert(i + destination_index + 1, slice[i]) 

  input = remainder

  
  current_index = (input.index(currentcup) + 1) % len(input)
  moves = moves + 1
  print(input)

indexofone = input.index(1)

result = input[indexofone + 1:] + input[:indexofone]
print(result)