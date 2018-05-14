const base = 'PARTS';
const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];

function samePosNumLetters(word, guess) {
  let samePosNum = 0;
  let i = 0;
  while (i < word.length && i < guess.length) {
    if (word[i] === guess[i]) {
      samePosNum++;
    }
    i++;
  }
  return samePosNum;
}

function countSameLetters(word, guess) {
  let sameLetterNum = 0;
  let dic = [];
  for (let letter of word) {
    if (!dic[letter]) dic[letter] = 0;
    dic[letter]++;
  }

  for (let letter of guess) {
    if (dic[letter] && dic[letter] > 0) {
      sameLetterNum++;
      dic[letter]--;
    }
  }

  return sameLetterNum;
}

guesses.forEach(guess => {
  let pos = samePosNumLetters(base, guess);
  pos = pos == false ? 0 : pos;
  let count = countSameLetters(base, guess);
  console.log(base + '\t' + guess + '\t' + pos + '\t' + count);
});
