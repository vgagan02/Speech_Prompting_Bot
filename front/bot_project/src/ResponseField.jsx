import React from 'react';

const ResponseField = ({ response }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>OpenAI Response</h2>
      <textarea
        value={response}
        readOnly
        style={{ width: '100%', height: '150px' }}
      />
    </div>
  );
};

export default ResponseField;
