import React, { Component } from 'react';
import GuessList from './components/GuessList';
import Header from './components/Header';
import Secret from './components/Secret';
import StartBtn from './components/StartBtn';
import {
  getSecret,
  deleteSecret,
  updateGuess,
  getAlfredGuess,
  getBarbaraGuess
} from './selectors/restService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alfredSecret: '',
      barbaraSecret: '',
      alfredId: '',
      barbaraId: '',
      alfredGuess: '',
      barbaraGuess: '',
      alfredMatched: 0,
      barbaraMatched: 0,
      alfredWon: false,
      barbaraWon: false,
      btnName: 'Start',
      alfredHistory: [],
      barbaraHistory: [],
      winMessage: '',
      disabled: false,
      round: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    if (!this.state.alfredWon && !this.state.barbaraWon) {
      try {
        const obj = await getSecret();
        await this.setState({
          alfredSecret: obj.alfred.secret,
          barbaraSecret: obj.barbara.secret,
          alfredId: obj.alfred.id,
          barbaraId: obj.barbara.id,
          disabled: true
        });
        while (!this.state.alfredWon && !this.state.barbaraWon) {
          await this.handleUpdate(
            this.state.alfredId,
            this.state.alfredMatched,
            this.state.barbaraId,
            this.state.barbaraMatched
          );
          await this.handleAlfredGet(
            this.state.barbaraId,
            this.state.alfredGuess
          );
          if (this.state.alfredWon) {
            await this.handleAlfredHistory();
            break;
          }
          await this.handleBarbaraGet(
            this.state.alfredId,
            this.state.barbaraGuess
          );
          await this.handleAlfredHistory();
          await this.handleBarbaraHistory();
        }
        this.handleRemove(this.state.alfredId, this.state.barbaraId);
        this.showWon();
      } catch (err) {
        console.log(err);
      }
    } else {
      this.init();
    }
  }

  async handleBarbaraHistory() {
    await this.setState({
      barbaraHistory: [
        ...this.state.barbaraHistory,
        {
          matched: this.state.barbaraMatched,
          guess: this.state.barbaraGuess
        }
      ]
    });
  }

  async handleAlfredHistory() {
    await this.setState({
      alfredHistory: [
        ...this.state.alfredHistory,
        {
          matched: this.state.alfredMatched,
          guess: this.state.alfredGuess
        }
      ]
    });
  }

  showWon() {
    this.setState({
      winMessage: this.state.alfredWon ? 'Alfred Won' : 'Barbara Won',
      disabled: false,
      btnName: 'New Game'
    });
  }

  async init() {
    await this.setState({
      alfredSecret: '',
      barbaraSecret: '',
      alfredId: '',
      barbaraId: '',
      alfredGuess: '',
      barbaraGuess: '',
      alfredMatched: 0,
      barbaraMatched: 0,
      alfredWon: false,
      barbaraWon: false,
      btnName: 'Start',
      alfredHistory: [],
      barbaraHistory: [],
      winMessage: '',
      round: 0
    });
    this.handleClick();
  }

  async handleRemove(alfredId, barbaraId) {
    try {
      await deleteSecret(alfredId, barbaraId);
    } catch (err) {
      console.log(err);
    }
  }

  async handleUpdate(alfredId, alfredMatched, barbaraId, barbaraMatched) {
    try {
      const obj = await updateGuess(
        alfredId,
        alfredMatched,
        barbaraId,
        barbaraMatched
      );
      await this.setState(prevState => {
        return {
          alfredGuess: obj.alfredGuess.guess,
          barbaraGuess: obj.barbaraGuess.guess,
          round: prevState.round + 1
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleAlfredGet(barbaraId, alfredGuess) {
    try {
      const obj = await getAlfredGuess(barbaraId, alfredGuess);
      await this.setState({
        alfredMatched: obj.alfredGuessRes.matched,
        alfredWon: obj.alfredGuessRes.hasWon
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleBarbaraGet(alfredId, barbaraGuess) {
    try {
      const obj = await getBarbaraGuess(alfredId, barbaraGuess);
      await this.setState({
        barbaraMatched: obj.barbaraGuessRes.matched,
        barbaraWon: obj.barbaraGuessRes.hasWon
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Header
          header="Guess Word"
          winMessage={this.state.winMessage}
          round={this.state.round}
        />

        <StartBtn
          click={this.handleClick}
          name={this.state.btnName}
          disabled={this.state.disabled}
        />
        <div className="list-column">
          <div className="list">
            <Secret secret={this.state.alfredSecret} title="Alfred" />
            <GuessList history={this.state.alfredHistory} />
          </div>
          <div className="list">
            <Secret secret={this.state.barbaraSecret} title="Barbara" />
            <GuessList history={this.state.barbaraHistory} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
