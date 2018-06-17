import React, {Component} from 'react';
import Squares from './Components/Squares'
import GameInfo from './Components/GameInfo';



class Game extends Component {
  constructor(props) {
    super(props);
    this.rightPositions = [
      [ 1,  2,  3,    4],
      [ 5,  6,  7,    8],
      [ 9, 10, 11,   12],
      [13, 14, 15, null],
      // [ 9, 10, 15,   11],
      // [13, 14, null, 12],
    ];
    this.state = {
      started: false,
      timeStarted: {},
      positions: this.rightPositions,
      moves: 0,
      time: {
        seconds: 0,
        minutes: 0,
      },
    }
  }
  startGame(squares) { 
    let squaresValues = [];
    let tempSquares = squares.slice();
    tempSquares.forEach((elem,i) => {
      tempSquares[i] = elem.slice();
    });
    tempSquares.forEach((elem) => {
      squaresValues = squaresValues.concat(elem);
    });
    squaresValues.sort((a,b) => (Math.random() - 0.5));
    tempSquares.forEach((elem, i) => {
      tempSquares[i].splice(0,elem.length);
      tempSquares[i] = elem.concat(squaresValues.slice(i*4, (i+1)*4));
    });
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({ 
      started: true, 
      timeStarted: new Date(),
      moves: 0,
      seconds: 0,
      minutes: 0,
      positions: tempSquares, 
    }); 
  }
  handleClick = (x, y) =>  {
    // console.log(`--- clicked btn ${elem} pos (${x}, ${y})`);
    let squares = [];
    for(let i = 0; i < 4; i++) squares[i] = this.state.positions[i].slice();
    // if(!this.state.started) this.startGame(squares);
    if(calculateWinner(squares)) return;

    // where null
    const xNull = squares[y].indexOf(null);
    const yNull = (() => {
      for(let i = 0; i < 4; i++) if(squares[i][x] == null) return i;
      return -1;
    })();
    if (~xNull) {
      if(xNull > x) {for(let i = xNull; i > x; i--) squares[y][i] = squares[y][i-1];}
      else {for(let i = xNull; i < x; i++) squares[y][i] = squares[y][i+1];}
      squares[y][x] = null;
    }
    else if (~yNull) {
      if (yNull > y) {for(let i = yNull; i > y; i--) squares[i][x] = squares[i-1][x];}
      else {for(let i = yNull; i < y; i++) squares[i][x] = squares[i+1][x]}
      squares[y][x] = null;
    }    
    if(~xNull || ~yNull) {
      if(calculateWinner(squares)) {
        clearInterval(this.timerID);
        this.setState({
          positions: this.rightPositions,
          started: false,
        });
      }
      else {
        this.setState({
          positions: squares,
          moves: this.state.moves + 1,
        });
      }
    }
  }
  tick() {
    const diff = new Date() - this.state.timeStarted;
    const seconds = Math.round((diff / 1000) % 60);
    const minutes = Math.round((diff / 60000) % 60);
    console.log('tick',  minutes,seconds);
    this.setState({
      seconds: seconds,
      minutes: minutes,
    });
  }
  render() {
    
    
    return (
      <div>
        <GameInfo moves={this.state.moves} time={[this.state.seconds, this.state.minutes]}/>
        <div className="board">
          <Squares positions={this.state.positions} handleClick={this.handleClick}/>
          {this.state.started ? null : <button className="start" onClick={() => {this.startGame(this.rightPositions)}}>Start</button>}
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  let win = true;
  let tempSquares = squares.slice();
  tempSquares.forEach((elem,i) => {
    tempSquares[i] = elem.slice();
  });
  if(tempSquares[3][1] === 15 && tempSquares[3][2] === 14) {
    tempSquares[3][1] = 14;
    tempSquares[3][2] = 15;
  } 
  tempSquares.forEach((row, i) => {
    let rowIsRight = row.every((elem, j) => {
      return elem === ((i*4+j+1 === 16)?null:i*4+j+1);
    })
    if(!rowIsRight) win = false;
  });
  return win;
}
export default Game; 