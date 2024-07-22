import React from 'react';

const InputField = ({ transcript }) => {
  return (
    <input
      type="text"
      value={transcript}
      readOnly
      style={{ width: '80%', marginRight: '10px' }}
    />
  );
};

export default InputField;
