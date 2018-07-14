import React, {Component} from 'react';
import SquaresIMG from './Components/SquaresIMG';
import GameInfo from './Components/GameInfo';
import Complexity from './Components/Complexity';
import ImageSlider from './Components/Slider';
class GameIMG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      timeStarted: {},
      curImg: '',
      size: 4,
      boardWidth: 320, 
      positions: rightPositions(4),
      moves: 0,
      time: {
        seconds: 0,
        minutes: 0,
      },
    };
    this.imagesURL = [
      require(`./img/chrome.jpg`),
      require(`./img/flower.jpg`),
      require(`./img/vag.jpg`),
      require(`./img/panda.jpg`),
      require(`./img/orange.jpg`),
    ];
    this.imagesURLmob = [
      require(`./img/chrome_mob.jpg`),
      require(`./img/flower_mob.jpg`),
      require(`./img/vag_mob.jpg`),
      require(`./img/panda_mob.jpg`),
      require(`./img/orange_mob.jpg`),
    ]
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
      tempSquares[i] = elem.concat(squaresValues.slice(i*this.state.size, (i+1)*this.state.size));
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

  stopGame() {
    clearInterval(this.timerID);
    this.setState({
      positions: rightPositions(this.state.size),
      started: false,
    });
  } 

  componentWillMount() {
    const size = this.state.size;
    const width = (window.innerWidth < 480 ? 240 : 320) + 4 + size-1;
    const curImg = window.innerWidth < 480 ? this.imagesURLmob[1] : this.imagesURL[1];
    this.setState({
      started: false,
      positions: rightPositions(this.state.size),
      boardWidth: width,
      curImg: curImg, 
    });
  }
  handleClickInfo = (e) => {
    const isDown = e.type === 'mousedown' || e.type === 'touchstart';
    if(isDown) {
      e.target.style.color = '#fff';
      e.target.style.background = '#000';
    } else {
      e.target.style.color = '#000';
      e.target.style.background = '#fff';
    }
    this.setState({
      showOriginal: isDown,
    });
  }
  handleChangeComplexity = (e) => {
    this.stopGame();
    const size = +   e.target.value;
    const width = (window.innerWidth < 480 ? 240 : 320) + 4 + size-1;
    this.setState({
      size: size,
      positions: rightPositions(size),
      boardWidth: width,
    });
  }
  handleChangeImage = (e) => {
    this.stopGame();
    const name = e.target.src;
    if(name) this.setState({
      curImg: name,
    });
  }
  handleClick = (x, y) =>  {

    let squares = this.state.positions.slice();
    squares.forEach((elem,i) => {
      squares[i] = elem.slice();
    });
    //end game
    if(this.state.started && calculateWinner(squares, this.state.size)) return;
    //start game
    if(!this.state.started) {this.startGame(rightPositions(this.state.size)); return;}

    const xNull = squares[y].indexOf(null);
    const yNull = (() => {
      for(let i = 0; i < this.state.size; i++) if(squares[i][x] == null) return i;
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
      if(calculateWinner(squares, this.state.size)) {
        this.stopGame();
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
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 60000) % 60);
    this.setState({
      seconds: seconds,
      minutes: minutes,
    });
  }
  render() {
    return (
      <div className="layout-positioner">
        <Complexity handleChanges={this.handleChangeComplexity}/>
        <GameInfo moves={this.state.moves} time={[this.state.seconds, this.state.minutes]} handleClickInfo={this.handleClickInfo}/>
        <div className="board" style={{width: this.state.boardWidth, height: this.state.boardWidth}}>
          <SquaresIMG 
            positions={this.state.showOriginal? rightPositions(this.state.size) : this.state.positions} 
            handleClick={this.handleClick}
            size={this.state.size}
            boardWidth={this.state.boardWidth}
            imgURL={this.state.curImg}
          />
        </div>
        <ImageSlider images={window.innerWidth < 480 ? this.imagesURLmob : this.imagesURL} handleChangeImage={this.handleChangeImage}/>
      </div>
    );
  }
}
function calculateWinner(squares, size) {
  let win = true;
  let boardSize = size*size;
  let tempSquares = squares.slice();
  tempSquares.forEach((elem,i) => {
    tempSquares[i] = elem.slice();
  });
  if(+size === 5) {
    const row = tempSquares[4];
    if(row[0] === 22 && row[1] === 21 && row[2] === 24 && row[3] === 23) {
      row[0] = 21;
      row[1] = 22;
      row[2] = 23;
      row[3] = 24;
    }
  }
  if(tempSquares[size-1][size-2] === boardSize-2 && tempSquares[size-1][size-3] === boardSize-1) {
    tempSquares[size-1][size-2] = boardSize-1;
    tempSquares[size-1][size-3] = boardSize-2;
  } 
  tempSquares.forEach((row, i) => {
    let rowIsRight = row.every((elem, j) => {
      return elem === ((i*size+j+1 === boardSize)?null:i*size+j+1);
    })
    if(!rowIsRight) win = false;
  });
  return win;
}
function rightPositions(size) {
  let positions = [];
  let i, j;
  for(i = 0; i < size; i++) {
    positions[i] = [];
    for(j = 0; j < size; j++) 
      positions[i].push(i*size + j + 1);
  }
  positions[size-1][size-1] = null;
  return positions;
}
export default GameIMG; 