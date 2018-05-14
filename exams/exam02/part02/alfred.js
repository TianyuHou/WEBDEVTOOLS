const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configPort = require('./src/config.json').alfred;
const port = configPort.substring(configPort.lastIndexOf(':') + 1);
const PORT = port || process.env.PORT;

app.use(bodyParser.json({ extended: true, type: '*/*' }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const wordListService = require('./service/wordListService');
let secretList = {};
let timeStamp = {};
let idList = [];
let guessList = {};

app.post('/game', (req, res) => {
  let secret = wordListService.pickWord();
  let id = wordListService.hashCode(secret);
  while (idList.includes(id)) {
    secret = wordListService.pickWord();
    id = wordListService.hashCode(secret);
  }
  guessList[id] = {
    list: [],
    candidateLetter: []
  };
  secretList[id] = secret;
  timeStamp[id] = Date.now();
  idList.push(id);
  res.json({ secret, id });
});

app.get('/game/:id/guess/:guess', (req, res) => {
  const id = req.params.id;
  const guess = req.params.guess;
  const matched = wordListService.countSameLetter(secretList[id], guess);
  timeStamp[id] = Date.now();
  res.json({
    matched,
    hasWon: guess === secretList[id]
  });
});

app.delete('/game/:id', (req, res) => {
  const id = req.params.id;
  idList = idList.filter(data => data != id);
  delete secretList[id];
  delete guessList[id];
  delete timeStamp[id];
  res.end();
});

app.put('/game/:id/guessed', (req, res) => {
  const id = req.params.id;
  const matched = req.body.matched;
  const guess = wordListService.pickGuess(matched, guessList[id]);
  timeStamp[id] = Date.now();
  res.json({ guess });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
