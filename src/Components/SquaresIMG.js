import React from 'react';

function Square(props) {
  
  let boardWidth = props.boardWidth - 4 - props.size+1;
  const left = props.x*(boardWidth / props.size + 1) + 2;
  const top = props.y*(boardWidth / props.size + 1) + 2;
  const width = (boardWidth / props.size);
  const fsize = ((boardWidth / 2) / props.size + 10);
  const lineHeight = (boardWidth / props.size) + "px";
  const style = {
    left: left,
    top: top,
    width: width,
    height: width,
    fontSize: fsize,
    lineHeight: lineHeight,
    backgroundImage: `url(${props.imgURL})`,
    backgroundPosition: `${width * -1 * (((props.value - 1) % props.size))}px ${width*-1*Math.floor((props.value - 1) / props.size)}px`,
  }
  return (
    <button onClick={props.onClick} className="squareIMG" style={style}>{props.value}</button>    
  );
}
function SquaresIMG(props) {
  const rows = props.positions.slice();
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
          imgURL={props.imgURL}
        />
      })
    }
  );
  return squares;
}
export default SquaresIMG;