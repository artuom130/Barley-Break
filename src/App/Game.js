import React, {Component} from 'react';
import GameInfo from './GameInfo';

function Square(props) {
  const position = {
    left: (props.x*101+2),
    top: (props.y*101+2),
  }
  return (
    <button onClick={() => props.onClick(props.value, props.x, props.y)} className="square" style={position}>{props.value}</button>    
  );
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.rightPositions = [
      [ 1,  2,  3,    4],
      [ 5,  6,  7,    8],
      // [ 9, 10, 11,   12],
      // [13, 14, 15, null],
      [ 9, 10, 15,   11],
      [13, 14, null, 12],
    ];
    this.state = {
      started: false,
      positions: this.rightPositions,
      moves: 0,
      wins: [],
    }
    this.time = new Date();
  }
  startGame(squares) { 
    let squaresValues = [];
    squares.forEach((elem) => {
      squaresValues = squaresValues.concat(elem);
    });
    squaresValues.sort((a,b) => (Math.random() - 0.5));
    squares.forEach((elem, i) => {
      squares[i].splice(0,elem.length);
      squares[i] = elem.concat(squaresValues.slice(i*4, (i+1)*4));

    });
    this.setState({ 
      started: true, 
      positions: squares, 
    }); 
  }
  handleClick(elem, x, y) {
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
        alert('won');
        this.setState({
          positions: this.rightPositions,
          moves: 0,
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
  render() {
    const rows = this.state.positions.slice();
    const squares = rows.map(
      (elem, y) => {
        return elem.map((elem, x) => {
          return <Square 
            key={elem}
            value={elem} 
            x={x}
            y={y}
            onClick={() => this.handleClick(elem, x, y)}
          />
        })
      }
    );
    // console.log('---', calculateWinner(squares));
    // console.log(squares);

    // console.log('---', 'squares');
    return (
      <div>
        <GameInfo moves={this.state.moves} time={this.time}/>
        <div className="board">
          {squares}
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