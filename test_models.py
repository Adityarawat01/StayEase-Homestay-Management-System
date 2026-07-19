import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(r"backend/.env")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

working_models = []
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        try:
            model = genai.GenerativeModel(m.name)
            res = model.generate_content("hello")
            print(f"{m.name} -> SUCCESS!")
            working_models.append(m.name)
        except Exception as e:
            pass # print(f"{m.name} -> FAILED: {str(e)[:50]}")

print("WORKING MODELS:", working_models)
