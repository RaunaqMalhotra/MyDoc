import requests
import json
import pandas as pd

app_id = "flgms9gJdGVz8nwOg5qczmHAAIVARyUaZBQjaPV7"
api_key = "xR4LZgOVC9yMaV3RLAL8wlmLITVQse1iz40CNtXI"
class_name = "Symptoms"  

headers = {
    "X-Parse-Application-Id": app_id,
    "X-Parse-REST-API-Key": api_key,
    "Content-Type": "application/json"
}

response = requests.get(f"https://parseapi.back4app.com/classes/{class_name}", headers=headers)
data = response.json()

results = data['results']

df = pd.DataFrame(results)
df.to_csv('symptoms.csv', index=False)

