import React from 'react';

const StartBtn = ({ name, click, disabled }) => {
  return (
    <div className="button">
      <button onClick={click} disabled={disabled}>
        {name}
      </button>
    </div>
  );
};

export default StartBtn;
