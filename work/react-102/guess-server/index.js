const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000 || process.env.PORT;

const wordListService = require('./public/wordListService');

app.use(express.static('public'));
app.use(bodyParser.json({ extended: true, type: '*/*' }));

//send whole wordList help client side to check valid input;
app.get('/wordList', (req, res) => {
  res.send(wordListService.all());
});

//assume there are mutiple clients so need to send secret Id to each client.
app.get('/secret', (req, res) => {
  const secret = wordListService.pickWord();
  //if you want to see the secret word on the backend console, uncomment the code below;
  // console.log('secret word: ' + wordListService.idList()[secret]);
  res.send(JSON.stringify(secret));
});

//check guess with secret Id;
app.post('/compareGuess', (req, res) => {
  const word = req.body.guess;
  if (!wordListService.checkString(word)) {
    res.status(460).end();
  } else if (!wordListService.checkLength(word)) {
    res.status(461).end();
  } else {
    const hashGuess = wordListService.hashCode(word);
    if (wordListService.idList().hasOwnProperty(hashGuess)) {
      const hashBase = req.body.secret;
      const win = hashGuess === hashBase;
      const base = wordListService.idList()[hashBase];
      const guess = wordListService.idList()[hashGuess];
      const count = wordListService.countSameLetter(base, guess);
      res.send(JSON.stringify({ win, count }));
    } else {
      res.status(462).end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
