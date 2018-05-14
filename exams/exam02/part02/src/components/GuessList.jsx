import React from 'react';

const GuessList = ({ history }) => {
  const historyList = history.map(({ matched, guess }, index) => {
    return (
      <li key={index}>
        {guess}: {matched} letters in common
      </li>
    );
  });

  return (
    <div className="history-container">
      <hr />
      <h2 className="history-title">History Guesses</h2>
      <ul className="history-list">{historyList}</ul>
    </div>
  );
};

export default GuessList;
