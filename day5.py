from common_py import input_access

input = input_access.fetch_input(5)
boardingPasses = input.rstrip().split("\n")

def mapToBinary(input):
  return "".join(map(lambda c: "1" if c == "B" or c == "R" else "0", input))
  
def convertBinaryToInt(binaryInput):
  return int(binaryInput, 2)

seatsInBinary = map(lambda x: (mapToBinary(x[0:7]), mapToBinary(x[7:])), boardingPasses)

seats = map(lambda seat : (convertBinaryToInt(seat[0]), convertBinaryToInt(seat[1])), seatsInBinary)

seatIds = set(map(lambda seat : seat[0] * 8 + seat[1], seats))

highestSeatId = max(seatIds)
print("part1 highest seat id:", highestSeatId)

for seatId in seatIds:
  if seatId + 2 in seatIds and seatId + 1 not in seatIds:
    print("part2 seat found", seatId + 1)
    break