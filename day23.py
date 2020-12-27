input = list(map(lambda x: int(x), "739862541"))

class LinkedListNode:
  def __init__(self, value):
    self.value = value
    self.next = None
    

maxval = max(input)
input = input + list(range(maxval + 1, 1000001))
maxval = max(input)

head = LinkedListNode(input[0])
prev = head

for i in range(1, len(input)):
  curr = LinkedListNode(input[i])
  prev.next = curr
  prev = curr

prev.next = head

nodeDict = dict()
nodeDict[head.value] = head


curr = head.next
while curr != head:
  nodeDict[curr.value] = curr
  curr = curr.next

current_node = head
moves = 1
# print(input)

def remove_slice(node):
  result = node.next
  node.next = node.next.next.next.next
  result.next.next.next = None
  return result

def containsval(node, value):
  while node is not None:
    if node.value == value:
      return True
    node = node.next
  
  return False

while moves <= 10000000:
  if moves % 100000 == 0:
    print(moves)

  
  slice = remove_slice(current_node)
  
  destinationvalue = current_node.value - 1
  while containsval(slice, destinationvalue) or destinationvalue == 0:
    destinationvalue = destinationvalue - 1
    if destinationvalue <= 0:
      destinationvalue = maxval
    
  destination_node = nodeDict[destinationvalue]

  destinationnext = destination_node.next
  destination_node.next = slice
  slice.next.next.next = destinationnext

  current_node = current_node.next
  moves = moves + 1
  # print(input)

nodeofone = nodeDict[1]

print("numbers after one: ", nodeofone.next.value, nodeofone.next.next.value)
