const wordList = require('../wordlist');

const wordListService = {
  all: () => {
    return wordList;
  },

  pickWord: () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  },

  countSameLetter: (base, word) => {
    let dic = [];
    // base = base.toUpperCase();
    // word = word.toUpperCase();
    for (let letter of base) {
      if (!dic[letter]) dic[letter] = 0;
      dic[letter]++;
    }
    let count = 0;
    for (let letter of word) {
      if (dic[letter] && dic[letter] > 0) {
        dic[letter]--;
        count++;
      }
    }
    return count;
  },

  pickGuess: (matched, guessList) => {
    if (matched === 0) {
      if (guessList.list.length === 0) {
        //inital candidates
        for (let i = 0; i < 26; i++) {
          guessList.candidateLetter[String.fromCharCode(65 + i)] = 1;
        }
      } else {
        //if no same letter then all of these letters can't be picked next time;
        for (letter of guessList.list[guessList.list.length - 1]) {
          guessList.candidateLetter[letter] = 0;
        }
      }
    }
    let canBeAnswer = false;
    let guess = '';
    while (!canBeAnswer) {
      guess = wordList[Math.floor(Math.random() * wordList.length)];
      //check if has guessed before and check if has letter not in the candidate lists;
      if (guessList.list.includes(guess)) continue;

      let i = 0;
      for (let letter of guess) {
        if (guessList.candidateLetter[letter] == 1) i++;
        else break;
      }
      canBeAnswer = i === guess.length;
    }
    guessList.list.push(guess);
    return guess;
  },

  hashCode: str => {
    let hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
};

module.exports = wordListService;
