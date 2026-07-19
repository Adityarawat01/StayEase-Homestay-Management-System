import requests

try:
    res = requests.post("http://localhost:5000/api/ai/chat", json={"message": "I want a roomstay in manali"})
    print("STATUS:", res.status_code)
    try:
        print("RESPONSE:", res.json())
    except:
        print("TEXT:", res.text)
except Exception as e:
    print("ERROR:", e)
