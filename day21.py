from common_py import input_access

class Food:
  def __init__(self, inputStr):
    
    (ingredients, allergens) = inputStr.rstrip(")").split("(contains")

    self.ingredients = set(map(lambda ingredient: ingredient.strip(), ingredients.strip().split(" ")))
    self.allergens = set(map(lambda allergen: allergen.strip(), allergens.strip().split(",")))

foods = list(map(lambda lineStr: Food(lineStr), input_access.fetch_input(21).splitlines()))

notfound_allergens = set()
allergen_ingredients = dict()


for food in foods:
  for allergen in food.allergens:
    notfound_allergens.add(allergen)


while len(notfound_allergens) > 0:
  print(notfound_allergens)
  for (index, allergen) in enumerate(notfound_allergens):
    foodscontainingallergen = list(filter(lambda food: allergen in food.allergens, foods))
    intersected_ingredients = foodscontainingallergen[0].ingredients
    for food in foodscontainingallergen:
      intersected_ingredients = intersected_ingredients.intersection(food.ingredients)
    
    if len(intersected_ingredients) == 1:
      exact_ingredient = intersected_ingredients.pop()
      for food in foods:
        if exact_ingredient in food.ingredients:
          food.ingredients.remove(exact_ingredient)
        if allergen in food.allergens:
          food.allergens.remove(allergen)
      
      allergen_ingredients[allergen] = exact_ingredient
      notfound_allergens.remove(allergen)
      break
      
print(allergen_ingredients)


ingredientsleft = 0

for food in foods:
  ingredientsleft = ingredientsleft + len(food.ingredients)

print(ingredientsleft)

sortedstuff = list(allergen_ingredients[x] for x in sorted(allergen_ingredients))
print(",".join(sortedstuff))

print(sorted(allergen_ingredients))