from common_py import input_access

(player1, player2) = input_access.fetch_input(22).split("\n\n")

player1 = list(map(lambda x: int(x), player1.splitlines()[1:]))
player2 = list(map(lambda x: int(x), player2.splitlines()[1:]))

player1.reverse()
player2.reverse()

def calculatedeckhash(player1, player2):
  return str(player1) + str(player2)

def recursiveCombat(player1, player2):
  turn = 1
  existingsetups = set()

  while len(player1) > 0 and len(player2) > 0:
    deckhash = calculatedeckhash(player1, player2)

    if deckhash in existingsetups:
      print("Infinite game prevention, player1 wins", deckhash)
      return (1, player1)

    existingsetups.add(deckhash)

    # print("round", turn)
    # print("p1:", player1)
    # print("p2:", player2)
    
    card1 = player1.pop()
    card2 = player2.pop()

    if len(player1) >= card1 and len(player2) >= card2:
      (winnerId, winnerDeck) = recursiveCombat(player1[-card1:], player2[-card2:])

      if winnerId == 1:
        player1.insert(0, card1)
        player1.insert(0, card2)
      else:
        player2.insert(0, card2)
        player2.insert(0, card1)

    else:
      if card1 > card2:
        player1.insert(0, card1)
        player1.insert(0, card2)
      else:
        player2.insert(0, card2)
        player2.insert(0, card1)

  winnerId = 2 if len(player2) > 0 else 1
  winnerDeck = player2 if len(player2) > 0 else player1
  return (winnerId, winnerDeck)


(winnerId, winnerDeck) = recursiveCombat(player1, player2)
result_score = 0
multiplier = len(winnerDeck)
for value in reversed(winnerDeck):
  result_score = result_score + (multiplier * value)
  multiplier = multiplier - 1

print(winnerId)
print(winnerDeck)
print(result_score)