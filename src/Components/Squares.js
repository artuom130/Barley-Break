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
  }
  return (
    <button onClick={props.onClick} className="square" style={style}>{props.value}</button>    
  );
}
function Squares(props) {
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
        />
      })
    }
  );
  return squares;
}
export default Squares;