const isInWordlist = (word, wordList) => {
  return wordList.includes(word);
};

const checkLength = word => {
  return word.length >= 5;
};

const checkInput = (word, wordList) => {
  return isInWordlist(word, wordList) && checkLength(word);
};
export { isInWordlist, checkLength, checkInput };
