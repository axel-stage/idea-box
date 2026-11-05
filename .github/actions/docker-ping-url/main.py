import os
import time

import requests


def ping_url(url: str, delay: int, max_trials: int) -> bool:
    trials: int = 0
    while trials < max_trials:
      try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"Website url {url} is reachable")
            return True
      except requests.ConnectionError:
          print(f"Website url {url} is unreachable. Retrying in {delay} seconds...")
          time.sleep(delay)
      except requests.exceptions.MissingSchema:
          print(f"Website format {url} is not valid.")
      trials += 1
    return False

def run() -> None:
    url = os.getenv("INPUT_URL")
    delay = os.getenv("INPUT_DELAY")
    max_trials = os.getenv("INPUT_MAX_TRIALS")
    website_reachable = ping_url(url, delay, max_trials)
    if website_reachable:
        raise Exception(f"Website {url} is unreachable!")
    print(f"Website {url} is reachable!")

if __name__ == "__main__":
  run()
