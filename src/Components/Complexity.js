import React from 'react';
export default function Complexity(props) {

  return (
    <div className="info">
    <h3 className="infoHead">Complexity:</h3>
    <select name="type" className="difficult"  defaultValue="4" onChange={props.handleChanges}>
      <option value="3">3x3</option>
      <option value="4">4x4</option>
      <option value="5">5x5</option>
    </select>
    </div>
  );

}