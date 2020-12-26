from common_py import input_access

(player1, player2) = input_access.fetch_input(22).split("\n\n")

player1 = list(map(lambda x: int(x), player1.splitlines()[1:]))
player2 = list(map(lambda x: int(x), player2.splitlines()[1:]))

player1.reverse()
player2.reverse()

turn = 1

while len(player1) > 0 and len(player2) > 0:
  print("round", turn)
  print("p1:", player1)
  print("p2:", player2)
  
  card1 = player1.pop()
  card2 = player2.pop()

  print("drawn cards:", card1, card2)
  print()
  if card1 > card2:
    player1.insert(0, card1)
    player1.insert(0, card2)
  else:
    player2.insert(0, card2)
    player2.insert(0, card1)

  turn = turn + 1

winner = player2 if len(player2) > 0 else player1


result_score = 0
multiplier = len(winner)
for value in reversed(winner):
  result_score = result_score + (multiplier * value)
  multiplier = multiplier - 1

print(result_score)