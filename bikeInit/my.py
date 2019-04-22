import os
import json

os.system('mongo < dbinput > result')

with open('result') as f:
    content = f.readlines()
content = content[5:-1]

for record in content:
    record = record[0] + record[48:]
    myjson = json.loads(record)
