import React from 'react';
import config from '../guess-config';

const GuessInput = ({ guess, onUpdateGuess, onSubmit, enabled, isValid }) => {
  const onChange = e => {
    const upper = e.target.value.toUpperCase();
    onUpdateGuess(upper);
  };

  const onClick = e => {
    if (e.key === 'Enter' && isValid) {
      onSubmit();
    }
  };

  const color = isValid ? config.colors.valid : config.colors.error;

  const textColor = {
    color: color
  };

  return (
    <input
      style={textColor}
      placeholder="Please guess a word !"
      className="guess-input"
      value={guess}
      onChange={onChange}
      onKeyPress={onClick}
      disabled={enabled}
    />
  );
};

export default GuessInput;
