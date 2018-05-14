import React from 'react';

const Header = ({ header, winMessage, round }) => {
  return (
    <div className="header">
      <h1>{header}</h1>
      <h2>Round: {round}</h2>
      <h3>{winMessage}</h3>
    </div>
  );
};

export default Header;
