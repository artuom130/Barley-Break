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
    this.state = {
      started: false,
      positions: [
        [ 1,  2,  3,    4],
        [ 5,  6,  7,    8],
        [ 9, 10, 11,   12],
        [13, 14, 15, null],
      ],
      moves: 0,
    }
    // [15,  2,  6, 13],
    //     [5,  3,  7,  8],
    //     [9, 10, 14, 12],
    //     [4, 11, 1, null],
    this.time = new Date();
  }
  
  handleClick(elem, x, y) {
    // console.log(`--- clicked btn ${elem} pos (${x}, ${y})`);
    let squares = [];
    for(let i = 0; i < 4; i++) squares[i] = this.state.positions[i].slice();
    //if (calculateWinner(squares)) return;
    console.log(squares);
    // if(!this.state.started) this.startGame(squares);
    console.log(squares);
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
    // console.log(`row = ${yNull}, column = ${xNull}`);
    // console.log('---', calculateWinner(squares));
    if(~xNull || ~yNull) {
      this.setState({
        positions: squares,
        moves: this.state.moves + 1,
      });
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
    console.log('---', calculateWinner(squares));
    console.log(squares);

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
  squares.forEach((row, i) => {
    let kek = row.every((elem, j) => {
      return elem === ((i*4+j+1 === 16)?null:i*4+j+1);
    })
    if(!kek) win = false;
  });
  return win;
}
export default Game; 