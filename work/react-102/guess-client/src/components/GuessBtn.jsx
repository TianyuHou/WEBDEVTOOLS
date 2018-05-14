import React from 'react';

const GuessBtn = ({ onClick, label, isDisabled }) => {
  return (
    <button className="guess-button" onClick={onClick} disabled={!isDisabled}>
      {label}
    </button>
  );
};

export default GuessBtn;
