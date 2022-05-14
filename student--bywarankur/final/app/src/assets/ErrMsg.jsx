import React from 'react';
import exceptions from '../services/exceptions';

const ErrMsg = ({ err }) => {
  return (
    <div className="err-container">
      { err ? <p className="err-msg">{exceptions[err] || err}</p> : ''}
    </div>
  );
};

export default ErrMsg;