const wordlist = `
about other which their there first would these click price
state email world music after video where books links years
order items group under games could great hotel store terms
right local those using phone forum based black check index
being women today south pages found house photo power while
three total place think north posts media water since guide
board white small times sites level hours image title shall
class still money every visit tools reply value press learn
print stock point sales large table start model human movie
march yahoo going study staff again april never users topic
below party login legal above quote story rates young field
paper girls night texas poker issue range court audio light
write offer given files event china needs might month major
areas space cards child enter share added radio until color
track least trade david green close drive short means daily
beach costs style front parts early miles sound works rules
final adult thing cheap third gifts cover often watch deals
words linux james heart error clear makes india taken known
cases quick whole later basic shows along among death speed
brand stuff japan doing loans shoes entry notes force river
album views plans build types lines apply asked cross weeks
lower union names leave teens woman cable score shown flash
ideas allow homes super asian cause focus rooms voice comes
brown forms glass happy smith thank prior sport ready round
built blood earth nokia italy basis award peter extra rated
quite horse stars lists owner takes bring input agent valid
grand trial units wrote ships metal funds guest seems trust
multi grade panel floor match plant sense stage goods maybe
spain youth break dance apple enjoy block civil steel songs
fixed wrong hands paris fully worth peace coast grant agree
blogs scale stand frame chief gives heard begin royal clean
bible suite vegas chris piece sheet seven older cells looks
calls whose naked lives stone tests buyer steve label scott
canon waste chair phase motor shirt crime count claim patch
santa alone jones saint drugs joint fresh dates upper prime
limit began louis steps shops creek urban tours labor admin
heavy solid theme touch goals serve magic mount smart latin
avoid birth virus abuse facts faith chain moved reach sorry
gamma truth films owned draft chart jesus clubs equal codes
kinds teams funny tried named laser harry taxes mouse brain
dream false falls stats carry hello clips brief ended eight
wants alert queen sweet diego truck votes ocean signs depth
train feeds route frank anime speak query rural judge bytes
fight filed korea banks kelly leads brian miami wales minor
noted spent davis helps cycle sleep scene drink intel rings
henry guess ahead devel delta cisco alpha bonus adobe trees
dress refer babes layer spend clock ratio proof empty maine
ideal specs parks cream boxes hills aware shape irish firms
usage mixed exist wheel angel width noise array greek sharp
occur knows coach kevin plate logic sizes plain costa trail
buddy setup blues scope crazy bears mouth meter fruit mysql
lewis sugar stick allen genre slide exact bound storm micro
dolls paint delay pilot czech novel ultra idaho plays truly
lodge broad swiss sarah clark foods guard newly raise drama
bands lunch audit polls tower yours jason shell solar catch
doubt tasks const doors forth bruce split twice egypt shift
simon marks loved birds saved shots moore treat piano risks
ports teach rapid hairy dutch boots holds pulse metro strip
pearl heads logos honda bills opera asset blank humor lived
tight meant plane meets tampa grace susan adams villa inner
roman taste trips sides turns cache lease proud giant seats
alarm usual angle vinyl worst honor eagle pants nurse quiet
comic crown maker crack picks smoke craft apart blind coins
gross epson actor finds fifth prize dirty wayne alive prove
wings ridge modem larry skill moves throw trend rhode worse
boats tells fiber graph talks bonds fraud roger crash inter
grove spray roads faces mayor yield hence radar lakes diary
kings flags baker shock walls ebony drawn beast dodge pizza
yards woods jokes twiki globe dicke kerry ghost pride keith
linda chile maria brass plaza quest trans booty acres venue
vital excel modes enemy wells opens lucky thick iraqi vista
chips terry flood arena grown jerry smile lands armed laura
tokyo nikon candy pills tiger folks boost icons moral keeps
pound roses bread tough gonna chest billy craig solve nancy
tones sight towns worry reads roles glory saudi fault karen
jimmy rugby fluid barry devil grass marie kenya sized manga
theft swing dated shoot elite poems robot winds gnome roots
noble shore loves loose slots rocks genes hosts atlas feels
ralph corps liver decor texts evans fails aging alice intro
clerk mills jeans fonts favor sigma xhtml aside essay camps
aaron trace packs spoke arrow rough weird holes blade meals
robin strap crowd cloud valve knife shelf liked adopt fotos
outer tales islam nodes seeds cited skype tired steam acute
stood carol stack curve amber trunk waves camel lamps juice
chase sauce beads flows fewer proxy lanka voted bikes gates
slave lycos zdnet combo haven charm basin ranch drunk toner
latex delhi alien broke nepal nylon discs rocky fleet bunch
cents omega civic saver grill grain wanna seeks gains spots
salon turbo thats aimed reset brush spare kodak skirt honey
gauge faced sixth farms cheat sandy macro laugh pitch autos
perry dozen teeth cloth stamp lotus cargo salem likes tapes
zones races maple depot blend julie janet phpbb probe helen
lopez debug chuck ebook bingo minds xanax sunny leeds cedar
blair hopes mason burns pumps mario utils pairs chose blast
tommy brake congo olive cyber clone dicks relay tears oasis
angry lover rolls malta daddy ferry omaha loads motel rally
dying stuck stops vocal organ lemon toxic bench rider butts
bobby sheep wines salad paste katie relax sword sells coral
pixel float colin paths acids dairy admit fancy samoa squad
wages males chaos wheat bases unity bride begun socks essex
fever drums rover flame tanks spell emily annex sudan hints
wired elvis argue arise jamie chess oscar menus canal amino
herbs lying drill bryan hobby tries trick myers drops wider
screw blame fifty uncle jacob randy brick naval donna cabin
eddie fired perth syria klein tires retro anger suits glenn
handy crops guild tribe batch alter ghana edges twins amend
chick thong medal walks booth indie bones breed polar msgid
carey danny patio lloyd beans ellis snake julia berry ought
fixes sends mazda timer tyler verse highs ellen racks nasty
tumor watts forty tubes floyd queue skins exams welsh belly
haiti elder sonic thumb twist ranks debut volvo penny ivory
remix alias newer spice ascii donor trash manor diane disco
endif minus milan shade digit lions pools lyric grave howto
devon saves lobby punch gotta karma betty lucas mardi shake
holly silly mercy fence diana shame fatal flesh jesse qatar
sheer witch cohen puppy kathy smell satin promo tunes lucia
nerve renew locks euros rebel hired hindu kills slope nails
whats rides rehab merit disks condo fairy shaft casio kitty
drain monte fires panic leone onion beats merry scuba verde
dried derby annie derek steal fears tuner alike sagem scout
dealt bucks badge wrist heath lexus realm jenny yemen buses
rouge yeast kenny yukon singh brook wives xerox sorts vsnet
papua armor viral pipes laden aruba merge edgar dubai allan
sperm filme craps frost sally yacht tracy whale shark grows
cliff tract shine wendy diffs ozone pasta serum swift inbox
focal samba wound belle cindy lined boxed cubic spies elect
bunny chevy tions flyer baths emacs climb sparc dover token
kinda dylan belts burke clara flush hayes moses johns jewel
teddy dryer ruled funky joins scary mpegs cakes mixer sbjct
tooth stays drove upset mines logan lance colon lanes purse
align bless crest alloy plots tulsa casey draws bloom loops
surge tahoe souls spank vault wires mails blake orbit niger
bacon paxil spine trout apnic fatty joyce marco isaac oxide
badly scoop sanyo blink carlo tiles tamil fuzzy grams forge
dense brave awful meyer wagon knock peers quilt notre mambo
flour choir blond burst wiley fibre daisy crude bored allah
fares hoped safer marsh ricky theta stake arbor
`
  .split(/ |\n/g)
  .map(word => word.toUpperCase())
  .filter(word => word);

//register some components;
const playerGuess = document.querySelector('#guess-player-input');
const computerGuess = document.querySelector('#guess-computer-input');
const playerGuessList = document.querySelector('.history-player');
const computerGuessList = document.querySelector('.history-computer');
const guessBtn = document.querySelector('.guess-button');
const message = document.querySelector('#player-guess-message');

//define color;
const rightColor = 'rgba(156, 204, 101, 1)';
const wrongColor = 'rgba(239, 83, 80, 1)';
const hintColor = 'rgba(67,160,71 ,1)';

//set up initial variables
let computerBase;
let playerBase;
let isPlayerWon;
let isComputerWon;
let playerHistory;
let computerHistory;

let isStart;
let isValid;
let count;
let messageStatus;

//these two variables for computer to pick word;
let computerGuessHistory;
let candidateLetter;

//reset the initial variables;
function initialGame() {
  isComputerWon = false;
  computerHistory = [];
  count = 0;
  isStart = false;
  isValid = false;
  isPlayerWon = false;
  playerHistory = [];

  computerGuessHistory = [];
  //inital candidates
  candidateLetter = new Array(26);
  for (let i = 0; i < 26; i++) {
    candidateLetter[String.fromCharCode(65 + i)] = 1;
  }

  showInitialMessage();
}

//check secret word input first bind with onchange function;
function checkValidSecret() {
  if (checkLength() || inputLengthLarger()) {
    setTimeout(limitInputLength, 50);
    if (!isInWordlist()) {
      messageStatus =
        'Unknown word. Choose a different common 5 letter word for them to guess';
      message.style.color = wrongColor;
      isValid = false;
    } else {
      messageStatus = 'Valid word. You can start Game!';
      message.style.color = rightColor;
      isValid = true;
    }
  } else {
    messageStatus = 'Enter a common 5 letter word for them to guess';
    message.style.color = hintColor;
    isValid = false;
  }
}

//check with the guess result bind with click function;
function checkPlayerGuess() {
  if (!isPlayerWon && !isComputerWon) {
    if (inputLengthLarger()) {
      setTimeout(limitInputLength, 50);
    }
    let secret = playerGuess.value.toUpperCase().substring(0, 5);
    if (secret !== computerBase) {
      messageStatus = 'Wrong Word. Try another guess!';
      message.style.color = wrongColor;
    }
  } else {
    messageStatus = isComputerWon
      ? `Computer wins in ${count} turns`
      : `Human wins in ${count} turns`;
    message.style.color = rightColor;
  }
}

//render text color
function renderTextColor() {
  if (checkLength()) {
    playerGuess.style.color = isInWordlist() ? 'green' : 'red';
  } else if (!inputLengthLarger()) {
    playerGuess.style.color = 'white';
  }
}

//initial message for guess time;
function initmessageStatus() {
  if (inputLengthLarger()) {
    setTimeout(limitInputLength, 50);
  } else if (checkLength()) {
    if (!isInWordlist()) {
      messageStatus =
        'Unknown word. Choose a different common 5 letter word to guess';
      message.style.color = wrongColor;
    } else {
      messageStatus = 'Valid word. Make a guess!';
      message.style.color = rightColor;
    }
  } else {
    messageStatus = 'Enter a common 5 letter word to guess';
    message.style.color = hintColor;
  }
  message.innerHTML = messageStatus;
}

//render message area during begin process;
function showInitialMessage() {
  checkValidSecret();
  message.innerHTML = messageStatus;
}

//render message area during guess process;
function showMessage() {
  checkPlayerGuess();
  message.innerHTML = messageStatus;
}

//check the length of input if is illegal;
function inputLengthLarger() {
  return playerGuess.value.length > 5;
}

//check the length of input if equal to 5;
function checkLength() {
  return playerGuess.value.length == 5;
}

//check is in wordlist
function isInWordlist() {
  return wordlist.includes(playerGuess.value.substring(0, 5).toUpperCase());
}

//get computer inputarea value;
function updateComputerInput() {
  computerGuess.value = computerGuessWord();
}

//render history list;
function renderPlayerList() {
  playerGuessList.innerHTML =
    playerHistory.length > 0
      ? generatePlayerList()
      : `<li>No Guesses Made</li>`;
}

function renderComputerList() {
  computerGuessList.innerHTML =
    computerHistory.length > 0
      ? generateComputerList()
      : `<li>No Guesses Made</li>`;
}

//generate list to put in html;
function generatePlayerList() {
  const list = playerHistory.map(element => `<li>${element}</li>`).join('\n');
  return list;
}

function generateComputerList() {
  const list = computerHistory.map(element => `<li>${element}</li>`).join('\n');
  return list;
}

//push to the history array;
function addToPlayerHistory(history) {
  let count = countSameLetter(computerBase, history);
  playerHistory.push(`${history}:  ${count} letters in common`);
  renderPlayerList();
}

function addToComputerHistory(history) {
  let count = countSameLetter(playerBase, history);
  computerHistory.push(`${history}:  ${count} letters in common`);
  renderComputerList();
}

//limit input length;
function limitInputLength() {
  playerGuess.value = playerGuess.value.substring(0, 5);
  disableBth();
}

//check 'Enter' press;
function checkEnterPressing() {
  if (window.event.keyCode === 13 && !guessBtn.disabled) {
    clickFunc();
  }
}

//uppercase the input;
function transformToUpper() {
  playerGuess.value = playerGuess.value.toUpperCase();
}

//disable the button depend on the length of input and valid input;
function disableBth() {
  if (checkLength() && isInWordlist()) {
    guessBtn.removeAttribute('disabled');
  } else {
    guessBtn.setAttribute('disabled', 'disabled');
  }
}

//clear the input;
function clearInput() {
  playerGuess.value = '';
}

function clearComputerInput() {
  computerGuess.value = '';
}

//check if someone is won;
function checkWon() {
  isPlayerWon = playerGuess.value.toUpperCase() === computerBase;
  isComputerWon = computerGuess.value === playerBase;
}

//reset the btn name;
function resetBtn() {
  if (isPlayerWon || isComputerWon) {
    guessBtn.innerHTML = 'RESET';
    playerGuess.setAttribute('disabled', 'disabled');
  } else {
    guessBtn.innerHTML = 'GUESS';
    guessBtn.setAttribute('disabled', 'disabled');
    playerGuess.removeAttribute('disabled');
  }
}

//init Btn settings;
function initBtn() {
  guessBtn.innerHTML = 'BEGIN';
  guessBtn.setAttribute('disabled', 'disabled');
  playerGuess.removeAttribute('disabled');
}

//randomly simulate the computer to guess a word from list;
function computerGuessWord() {
  let idx;
  let canBeAnswer = false;
  while (!canBeAnswer) {
    idx = Math.floor(Math.random() * wordlist.length);
    //check if has guessed before and check if has letter not in the candidate lists;
    if (computerGuessHistory.includes(idx)) continue;

    let i = 0;
    for (let letter of wordlist[idx]) {
      if (candidateLetter[letter] == 1) i++;
      else break;
    }
    canBeAnswer = i === wordlist[idx].length;
  }

  //check if have no same letter then all of these letters can't be picked next time;
  if (countSameLetter(wordlist[idx], playerBase) == 0) {
    for (letter of wordlist[idx]) {
      candidateLetter[letter] = 0;
    }
  }
  computerGuessHistory.push(idx);
  return wordlist[idx];
}

//count the same letters;
function countSameLetter(base, word) {
  let dic = [];
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
}

//get the computer base word;
function pickWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

//onChange function for the input listener;
function checkInput() {
  transformToUpper();
  if (!isStart) {
    showInitialMessage();
  } else {
    initmessageStatus();
  }
  renderTextColor();
  disableBth();
}

//when the secret word is valid and click the begin button call this function;
function initStart() {
  if (isValid) {
    isStart = true;
    computerBase = pickWord(wordlist);
    console.log(computerBase);
    playerBase = playerGuess.value;
    console.log(playerBase);
    guessBtn.innerHTML = 'GUESS';
    guessBtn.setAttribute('disabled', 'disabled');
    clearInput();
    initmessageStatus();
  }
}

//click event function depend on if is won;
function clickFunc() {
  if (!isStart) {
    initStart();
  } else if (!isPlayerWon && !isComputerWon) {
    count++;
    updateComputerInput();
    addToPlayerHistory(playerGuess.value);
    addToComputerHistory(computerGuess.value);
    checkWon();
    showMessage();
    resetBtn();
    clearInput();
  } else {
    initialGame();
    renderPlayerList();
    renderComputerList();
    initBtn();
    clearComputerInput();
  }
}

//add Click func for the button;
function addClickEvent() {
  guessBtn.addEventListener('click', clickFunc);
}

//add change func for the input area;
function addChangeEvent() {
  playerGuess.addEventListener('input', checkInput);
  playerGuess.addEventListener('keypress', checkEnterPressing);
}

//start the game;
initialGame();
addClickEvent();
addChangeEvent();
renderPlayerList();
renderComputerList();
