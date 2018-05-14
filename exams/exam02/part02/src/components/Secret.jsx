import React from 'react';

const Secret = ({ secret, title }) => {
  return (
    <div className="secret">
      <h1>{title}</h1>
      <h1>Secret Word: {secret}</h1>
    </div>
  );
};

export default Secret;
