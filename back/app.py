from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'sk-proj-p4v0aaNevIigqbcRIGRWT3BlbkFJpUgsc9QOqT1NQRsHvlZ7'

@app.route('/ask', methods=['POST'])
def ask_openai():
    data = request.json
    prompt = data.get('prompt', '')

    try:
        response = openai.Completion.create(
            model='text-davinci-003',
            prompt=prompt,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
