import React, { useState, useRef } from 'react';
import InputField from './InputField';
import ListenButton from './ListenButton';
import ResponseField from './ResponseField';
import { Configuration, OpenAI } from 'openai';

// Create a configuration for the OpenAI client with API key directly provided
const openai = new OpenAI({
  apiKey: 'your_openai_api_key',  // Replace this with your actual API key
});

const SpeechToTextContainer = ({ apiKey1 }) => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startListening = async () => {
    if (!listening) {
      setListening(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!MediaRecorder.isTypeSupported('audio/webm')) {
          alert('Browser not supported');
          return;
        }

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`, ['token', apiKey1]);

        socket.onopen = () => {
          mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0 && socket.readyState === 1) {
              socket.send(event.data);
            }
          });
          mediaRecorder.start(1000);
        };

        socket.onmessage = (message) => {
          const received = JSON.parse(message.data);
          const newTranscript = received.channel.alternatives[0].transcript;
          if (newTranscript && received.is_final) {
            setTranscript((prev) => prev + newTranscript + ' ');
          }
        };

        socket.onclose = () => {
          console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        socketRef.current = socket;
        mediaRecorderRef.current = mediaRecorder;
      } catch (error) {
        console.error('Error accessing microphone or setting up WebSocket:', error);
      }
    } else {
      setListening(false);
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
      if (socketRef.current) socketRef.current.close();

      // Send the transcript to OpenAI once listening is stopped
      submitQuestion(transcript);
    }
  };

  const submitQuestion = async (question) => {
    if (!question.trim()) return;

    try {
      const response = await openai.Completions.create({
        model: 'text-davinci-003',
        prompt: question,
        max_tokens: 150,
      });

      const answer = response.choices[0].text.trim();
      setResponse(answer);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Speech to Text</h1>
      <InputField transcript={transcript} />
      <ListenButton listening={listening} onClick={startListening} />
      <ResponseField response={response} />
    </div>
  );
};

export default SpeechToTextContainer;
