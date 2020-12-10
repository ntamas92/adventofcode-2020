import sys
import os
import re

# sys.path.append(os.getcwd() + '/common_py')
# import input_access

from common_py import input_access

input = input_access.fetch_input(2)

lines = input.splitlines(keepends=False)

# pylint: disable=anomalous-backslash-in-string
pattern = re.compile("(\d+)-(\d+) (\w): (\w+)")

def findvalidpasswords(validation_strategy):
  validpasswords = 0

  for line in lines: 
    match = pattern.search(line)
    groups = match.groups()
    first_num = int(groups[0])
    second_num = int(groups[1])
    character = groups[2]
    password = groups[3]

    if validation_strategy(first_num, second_num, character, password):
      validpasswords = validpasswords + 1

  return validpasswords


def first():
    def strategy(min_occurrence, max_occurrence, character, password):
      char_num = password.count(character)
      # char_num = len([x for x in password if x == character])
      return char_num >= min_occurrence and char_num <= max_occurrence
    
    print(findvalidpasswords(strategy))

def second():
  def strategy(first_occurrence, second_occurrence, character, password):
        # != operator between boolean values if effectively an XOR method
        return (password[first_occurrence - 1] == character) != (password[second_occurrence - 1] == character)

  print(findvalidpasswords(strategy))

first()
second()