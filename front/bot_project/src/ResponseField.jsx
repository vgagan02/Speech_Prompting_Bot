import React from 'react';
import ConvertToAudioButton from './ConvertToAudioButton';

const ResponseField = ({ response }) => {
  return (
    <div>
      <h2>Response:</h2>
      <textarea
        value={response}
        readOnly
        rows={5}
        cols={50}
        placeholder="The response from the model will appear here..."
      />
      <ConvertToAudioButton response={response} />
    </div>
  );
};

export default ResponseField;
