import React from 'react';

const InputField = ({ transcript }) => {
  return (
    <div>
      <textarea
        value={transcript}
        readOnly
        rows={5}
        cols={50}
        placeholder="Your transcribed text will appear here..."
      />
    </div>
  );
};

export default InputField;
