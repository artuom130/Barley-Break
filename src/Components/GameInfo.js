import React from 'react';

function GameInfo(props) {
  const seconds = props.time[0] < 10 ? '0' + props.time[0] : props.time[0];
  const minutes = props.time[1] < 10 ? '0' + props.time[1] : props.time[1];
  const time = seconds ? (minutes + ':' + seconds) : '00:00';
 return (
      <div className="info">
        <h3>Moves: {props.moves}</h3>
        <h3>Time: {time}</h3>
        <button className="showOriginal" 
          onMouseDown={props.handleClickInfo} 
          onMouseUp={props.handleClickInfo}
          onTouchStart={props.handleClickInfo}
          onTouchEnd={props.handleClickInfo}
        >?</button>
      </div>
  );
}
export default GameInfo;