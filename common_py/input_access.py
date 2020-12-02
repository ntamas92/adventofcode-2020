import os
import requests

from pathlib import Path  # Python 3.6+ only
from dotenv import load_dotenv

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

access_token = os.getenv("ACCESS_TOKEN")

if access_token is None:
  raise Exception("Access token not found")

def fetch_input(day) -> str:
  cache_dir = "./inputCache"

  if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)
  
  cache_file_path = f"{cache_dir}/day{day}.txt"

  if os.path.exists(cache_file_path):
    file = open(cache_file_path)
    content = file.read()
    file.close()
    return content


  uri = f"https://adventofcode.com/2020/day/{day}/input"
  cookies = {'session': access_token}
  response = requests.get(uri, cookies=cookies)

  input = response.text

  file = open(cache_file_path, mode="w")
  file.write(input)
  file.close()

  return input

if __name__ == "__main__":
    print(fetch_input(1))