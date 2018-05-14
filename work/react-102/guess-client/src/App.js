import React, { Component } from 'react';

import GuessTitle from './components/GuessTitle';
import GuessTurns from './components/GuessTurns';
import GuessInput from './components/GuessInput';
import GuessMsg from './components/GuessMsg';
import GuessHint from './components/GuessHint';
import GuessBtn from './components/GuessBtn';
import GuessList from './components/GuessList';

import { isInWordlist, checkLength, checkInput } from './selectors/checkValid';
import { getList, getSecret, tryGuess } from './selectors/restService';
import { pickErrorMessage } from './selectors/errorMsg';

import config from './guess-config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      secret: '',
      playerWon: false,
      isValid: false,
      guess: '',
      hint: '',
      message: '',
      btnLabel: 'GUESS',
      turns: 0,
      history: [],
      error: ''
    };

    this.updateGuess = this.updateGuess.bind(this);
    this.clickFunc = this.clickFunc.bind(this);
  }

  //initialize wordList and secret;
  componentWillMount() {
    this.fetchWordList();
    this.fetchSecret();
  }

  //get initialize wordList to help client side check the word;
  fetchWordList() {
    getList()
      .then(list => this.handleList(list))
      .catch(e => this.handleError(e));
  }

  //get secret word id at first and send it with guess word help server to check whether correct.
  fetchSecret() {
    getSecret()
      .then(secret => this.handleSecret(secret))
      .catch(e => this.handleError(e));
  }

  //send guess word with secret id to the server.
  fetchGuess() {
    tryGuess(this.state.guess, this.state.secret)
      .then(res => this.handleGuess(res))
      .catch(e => this.handleError(e));
  }

  handleGuess(res) {
    if (res) {
      console.log(res);
      this.checkWon(res.win);
      this.updateTurns();
      this.setState({
        history: [
          ...this.state.history,
          {
            count: res.count,
            guess: this.state.guess
          }
        ],
        guess: '',
        hint: '',
        isValid: res.win
      });
    }
  }

  handleList(wordList = []) {
    this.setState({ wordList });
  }

  handleSecret(secret = '') {
    this.setState({ secret });
  }

  handleError(e) {
    this.setState({
      error: e
    });
  }

  //update input and state
  updateGuess(guess) {
    const str = guess.substring(0, 5);
    this.checkValid(str);
    this.updateHint(str);
    this.setState({ guess: str });
  }

  //validate the input
  checkValid(guess) {
    this.setState({
      isValid: checkInput(guess, this.state.wordList)
    });
  }

  //update turns
  updateTurns() {
    this.setState(prevState => {
      return {
        turns: prevState.turns + 1
      };
    });
  }

  //update hint
  updateHint(guess) {
    if (checkLength(guess)) {
      if (isInWordlist(guess, this.state.wordList)) {
        this.setState({
          hint: config.hint.valid
        });
      } else {
        this.setState({
          hint: config.hint.unknow
        });
      }
    } else {
      this.setState({
        hint: config.hint.error
      });
    }
  }

  //initialize the state after reset
  init() {
    this.setState({
      wordList: [],
      secret: '',
      playerWon: false,
      isValid: false,
      guess: '',
      hint: '',
      message: '',
      btnLabel: 'GUESS',
      turns: 0,
      history: [],
      error: ''
    });
    this.fetchWordList();
    this.fetchSecret();
  }

  //check if player was won and set state
  checkWon(res) {
    if (res) {
      this.setState({
        playerWon: true,
        btnLabel: 'RESET',
        message: config.message.win
      });
    } else {
      this.setState({
        message: config.message.wrong
      });
    }
  }

  //combine the click function
  clickFunc() {
    if (this.state.playerWon) {
      this.init();
    } else {
      this.fetchGuess();
    }
  }

  clearError() {
    const code = this.state.error;
    this.setState({
      error: ''
    });
    switch (code) {
      case 'getSecret-fail':
        this.fetchSecret();
        break;
      case 'getList-fail':
        this.fetchWordList();
        break;
      default:
    }
  }

  render() {
    const code = this.state.error;
    let message = pickErrorMessage(code);
    if (message) {
      message = (
        <div className="error-message">
          <p>{message}</p>
          <button onClick={() => this.clearError()}>Got it</button>
        </div>
      );
      if (code === 'getSecret-fail' || code === 'getList-fail') {
        return <div>{message}</div>;
      }
    }

    return (
      <div>
        {message}
        <GuessTitle title="Guess Game!" />
        <GuessTurns turns={this.state.turns} />
        <div className="guess-container">
          <GuessInput
            guess={this.state.guess}
            onUpdateGuess={this.updateGuess}
            onSubmit={this.clickFunc}
            enabled={this.state.playerWon}
            isValid={this.state.isValid}
          />
          <GuessHint hint={this.state.hint} isValid={this.state.isValid} />
          <GuessBtn
            label={this.state.btnLabel}
            onClick={this.clickFunc}
            isDisabled={this.state.isValid}
          />
          <GuessMsg message={this.state.message} />
        </div>
        <GuessList history={this.state.history} />
      </div>
    );
  }
}

export default App;
