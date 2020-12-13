from common_py import input_access
import math
import functools

input = input_access.fetch_input(13).rstrip().splitlines()

departure_time = int(input[0])
bus_schedule = input[1].split(",")

closest_departures = list(map(lambda dep: "x" if dep == "x" else ( math.floor((departure_time / int(dep))) + 1) * int(dep), bus_schedule))

min_arrival_index = -1
min_arrival_value = 0

for (index, item) in enumerate(closest_departures):
  if item != "x":
    if min_arrival_index == -1 or int(item) < min_arrival_value:
      min_arrival_value = item
      min_arrival_index = index

print("part1:", int(bus_schedule[min_arrival_index]) * (min_arrival_value - departure_time))


# Part 2
buses_with_index = list(filter(lambda pair : pair[1] != "x", enumerate(bus_schedule)))

(maxind, maxval) = max(buses_with_index, key=lambda x: int(x[1]))
maxval = int(maxval)

buses_index_shifted = list(map(lambda indexvalue: (indexvalue[0] - maxind, int(indexvalue[1])), buses_with_index))

step = 1
longest_match = 0
longest_match_index = -1
i = 0
timestamp = 0

while True:
  timestamp = i * maxval
  match = 0
  
  for (index, value) in buses_index_shifted:
    if (timestamp + index) % value == 0:
      match = match + 1
    else:
      break

  if(match == len(buses_index_shifted)):
    print("Found it:", timestamp - maxind)
    break

  if match == longest_match:
    print("longest match found again, len:", longest_match, "i:", i, ", diff:", i - longest_match_index, "timestamp:", timestamp)
    step = i - longest_match_index
    longest_match_index = i
  elif match > longest_match:
    longest_match_index = i
    longest_match = match
    print("New longest match: ", longest_match)

  i = i + step