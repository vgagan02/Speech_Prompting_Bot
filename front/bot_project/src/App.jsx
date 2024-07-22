import React from 'react';
import SpeechToTextContainer from './SpeechToTextContainer';

const App = () => {
  const deepgramApiKey = 'b92a68265e5141e89b6af5ae607316e0fdecfe7a'; 
  const openaiApiKey = 'sk-proj-p4v0aaNevIigqbcRIGRWT3BlbkFJpUgsc9QOqT1NQRsHvlZ7';

  return (
    <div>
      <SpeechToTextContainer apiKey1={deepgramApiKey} openaiApiKey={openaiApiKey} />
    </div>
  );
};

export default App;
