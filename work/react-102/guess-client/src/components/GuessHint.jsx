import React from 'react';
import config from '../guess-config';

const GuessHint = ({ hint, isValid }) => {
  const color = isValid ? config.colors.valid : config.colors.error;

  const textColor = {
    color: color
  };
  return (
    <h3 style={textColor} className="input-error">
      {hint}
    </h3>
  );
};

export default GuessHint;
