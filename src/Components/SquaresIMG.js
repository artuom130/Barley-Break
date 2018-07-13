import React from 'react';

function Square(props) {
  
  let boardWidth = props.boardWidth - 4 - props.size+1;
  const left = props.x*(boardWidth / props.size + 1) + 2;
  const top = props.y*(boardWidth / props.size + 1) + 2;
  const width = (boardWidth / props.size);
  const fsize = ((boardWidth / 2) / props.size + 10);
  const lineHeight = (boardWidth / props.size) + "px";
  let imgURL = null;

  switch(props.imgName) {
    case 'chrome' : imgURL = require('../img/chrome.jpg'); break;
    case 'chrome_mob' : imgURL = require('../img/chrome_mob.jpg'); break;
    case 'vag' : imgURL = require('../img/vag.jpg'); break;
    case 'vag_mob' : imgURL = require('../img/vag_mob.jpg'); break;
    case 'flower' : imgURL = require('../img/flower.jpg'); break;
    case 'flower_mob' : imgURL = require('../img/flower_mob.jpg'); break;
    case 'panda' : imgURL = require('../img/panda.jpg'); break;
    case 'panda_mob' : imgURL = require('../img/panda_mob.jpg'); break;
    case 'orange' : imgURL = require('../img/orange.jpg'); break;
    case 'orange_mob' : imgURL = require('../img/orange_mob.jpg'); break;
    default : imgURL = require('../img/flower.jpg');
  }
  const style = {
    left: left,
    top: top,
    width: width,
    height: width,
    fontSize: fsize,
    lineHeight: lineHeight,
    backgroundImage: `url(${imgURL})`,
    backgroundPosition: `${width * -1 * (((props.value - 1) % props.size))}px ${width*-1*Math.floor((props.value - 1) / props.size)}px`,
  }
  return (
    <button onClick={props.onClick} className="squareIMG" style={style}>{props.value}</button>    
  );
}
function SquaresIMG(props) {
  const rows = props.positions.slice();
  const imgName = `${window.innerWidth < 480 ? props.imgName + '_mob' : props.imgName}`;
  const squares = rows.map(
    (elem, y) => {
      return elem.map((elem, x) => {
        return <Square 
          key={elem}
          value={elem} 
          x={x}
          y={y}
          onClick={() => props.handleClick(x, y)}
          size={props.size}
          boardWidth={props.boardWidth}
          imgName={imgName}
        />
      })
    }
  );
  return squares;
}
export default SquaresIMG;