import os

import google.generativeai as genai

genai.configure(api_key="AIzaSyAmPpGYto4N9vJrSpMJklZN_tNI0UJmTzo")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

chat_session = model.start_chat(history=[])

response = chat_session.send_message("what is cancer?")

print(response.text)