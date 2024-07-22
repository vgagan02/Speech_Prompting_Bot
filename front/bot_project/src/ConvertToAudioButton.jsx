import React from 'react';

const ConvertToAudioButton = ({ response }) => {
  const handleConvertToAudio = () => {
    if (!response.trim()) return;

    const speech = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(speech);
  };

  return (
    <button onClick={handleConvertToAudio}>
      Convert To Audio
    </button>
  );
};

export default ConvertToAudioButton;
