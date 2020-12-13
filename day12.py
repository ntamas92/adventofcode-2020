from common_py import input_access
import re

def parse_command(commandstr):
  pattern = re.compile("([NSEWLRF])([0-9]+)")
  match = pattern.match(commandstr)
  return (match.groups()[0], int(match.groups()[1]))


input = input_access.fetch_input(12).rstrip().splitlines()

input = list(map(parse_command, input))

transformations = dict({
  "N" : (-1, 0),
  "S" : (1, 0),
  "E" : (0, 1),
  "W" : (0, -1),
})

directions = dict({
  "N": 0,
  "S": 180,
  "E": 90,
  "W": 270,
})

reverseDirections = {value:key for key,value in directions.items()}

def part1():
  ship_position = (0, 0)
  ship_direction = "E"

  def move_ship(direction, value):
    move_vector = [value*x for x in transformations[direction]]

    return [sum(x) for x in zip(ship_position, move_vector)]

  for step in input:
    (action, value) = step
    if action in transformations.keys():
      ship_position = move_ship(action, value)
    elif action in ["L", "R"]:
      direction_prefix = 1 if action == "R" else -1
      ship_direction = reverseDirections[(directions[ship_direction] + (value * direction_prefix)) % 360]
    else:
      ship_position = move_ship(ship_direction, value)
  
  print(ship_position, ship_direction, abs(ship_position[0]) + abs(ship_position[1]))

part1()

def part2():
  ship_position = (0, 0)
  # ship_direction = "E"
  waypoint_position = (-1, 10)

  def move_position(position, scalar, direction):
    move_vector = [scalar*x for x in direction]
    return [sum(x) for x in zip(position, move_vector)]

  for step in input:
    (action, value) = step
    if action in transformations.keys():
      waypoint_position = move_position(waypoint_position, value, transformations[action])
    elif action in ["L", "R"]:
      (waypoint_x, waypoint_y) = waypoint_position
      if action+str(value) in ["R90", "L270"]:
        (waypoint_x, waypoint_y) = (waypoint_y, -1 * waypoint_x)
      elif action+str(value) in ["L90", "R270"]:
        (waypoint_x, waypoint_y) = (-1 * waypoint_y, waypoint_x)
      elif value == 180:
        (waypoint_x, waypoint_y) = (-1 * waypoint_x, -1 * waypoint_y)
      waypoint_position = (waypoint_x, waypoint_y) 
      # direction_prefix = 1 if action == "R" else -1
      # ship_direction = reverseDirections[(directions[ship_direction] + (value * direction_prefix)) % 360]
    else:
      ship_position = move_position(ship_position, value, waypoint_position)

  print(abs(ship_position[0]) + abs(ship_position[1]))  

part2()