import React from 'react';
function Square(props) {
  const left = window.innerWidth < 480 ? (props.x*(240 / props.size + 1)+2) : (props.x*81+2);
  const top = window.innerWidth < 480 ? (props.y*(240 / props.size + 1)+2) : (props.y*81+2);
  const width = window.innerWidth < 480 ? (240 / props.size) : 80;
  const height = window.innerWidth < 480 ? (240 / props.size) : 80;
  const fsize = window.innerWidth < 480 ? (120 / props.size + 10) : 50;
  const lineHeight = (window.innerWidth < 480 ? (120 / props.size + 1) : 50) + "px";

  const style = {
    left: left,
    top: top,
    width: width,
    height: height,
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
        />
      })
    }
  );
  return squares;
}
export default Squares;