import React, {Component} from 'react';

class GameInfo extends Component {
  render() {
    return (
      <div className="info">
        <h2>Ходы: {this.props.moves}</h2>
        <h2>Время: {this.props.time.toLocalTimeString}</h2>
      </div>
    );
  }
}
export default GameInfo;