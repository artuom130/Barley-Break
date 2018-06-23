import React from 'react';
function Square(props) {
  const position = {
    left: (props.x*81+2),
    top: (props.y*81+2),
  }
  return (
    <button onClick={props.onClick} className="square" style={position}>{props.value}</button>    
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
        />
      })
    }
  );
  return squares;
}
export default Squares;