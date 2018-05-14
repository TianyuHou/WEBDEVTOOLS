import React from 'react';

const GuessTurns = ({ turns }) => {
  return (
    <div className="guess-turns">
      <h1>Current Turns : {turns}</h1>
    </div>
  );
};

export default GuessTurns;
