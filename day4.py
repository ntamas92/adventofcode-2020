import sys
import os
import re
from common_py import input_access
from functools import partial

def getPassportDict(passportentries):
  entrypattern = re.compile("(?P<fieldType>.*):(?P<fieldValue>.*)")
  
  passportdict = dict()

  for entry in passportentries:
    groupdict = entrypattern.match(entry).groupdict()
    passportdict[groupdict["fieldType"]] = groupdict["fieldValue"]

  return passportdict

def contains_requiredfields(passport : dict):
  requiredfields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", ]
  for field in requiredfields:
    if field not in passport:
      return False
  
  return True

def isvalidpassport(passport: dict):
  if not contains_requiredfields(passport):
    return False

  def isYear(value, lower, upper):
    intvalue = int(value)
    return len(value) == 4 and intvalue >= lower and intvalue <= upper

  def isHeight(value):
    # pylint: disable=anomalous-backslash-in-string
    match = re.compile("^(\d+)(cm|in)$").match(value)
    if match is None:
      return False

    height = int(match.groups()[0]) 
    
    if match.groups()[1] == "cm":
      return height >= 150 and height <= 193
    else:
      return height >= 59 and height <= 76

  def isHairColor(value):
    return re.compile("#[a-f0-9]{6}$").match(value) is not None
  
  def isEyeColor(value):
    return re.compile("^(amb|blu|brn|gry|grn|hzl|oth)$").match(value) is not None
  
  def isPassportId(value):
    return re.compile("^[0-9]{9}$").match(value) is not None

  fieldValidators = {
    "byr": partial(isYear, lower=1920, upper=2002),
    "iyr": partial(isYear, lower=2010, upper=2020),
    "eyr": partial(isYear, lower=2020, upper=2030),
    "hgt": isHeight,
    "hcl": isHairColor,
    "ecl": isEyeColor,
    "pid": isPassportId,
  }

  for key in passport.keys():
    if key in fieldValidators and not fieldValidators[key](passport[key]):
        return False
  
  return True

input = input_access.fetch_input(4)
passportInput = input.split("\n\n")
 
# pylint: disable=anomalous-backslash-in-string
pattern = re.compile("(\S+:\S+)")

passports = [getPassportDict(pattern.findall(passport)) for passport in passportInput]


print("part1: ", list(map(contains_requiredfields, passports)).count(True))
print("part2:",  list(map(isvalidpassport, passports)).count(True))



