import React from 'react';

const GuessList = ({ history }) => {
  const historyList = history.map(({ count, guess }, index) => {
    return (
      <li key={index}>
        {guess}: {count} letters in common
      </li>
    );
  });

  return (
    <div className="history-container">
      <hr />
      <h2>History Guesses</h2>
      <ul className="history-list">{historyList}</ul>
    </div>
  );
};

export default GuessList;
