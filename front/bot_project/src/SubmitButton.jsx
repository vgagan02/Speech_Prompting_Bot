import React from 'react';

const SubmitButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ marginTop: '20px' }}>
      Submit Question
    </button>
  );
};

export default SubmitButton;
