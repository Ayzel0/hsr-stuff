import { useState, useEffect, useRef } from 'react';
import '../styles/Turns.css';

const Turns = ({ bins }) => {
  return (
    <div className='turns'>
      <h1>Action List</h1>
      {bins.length !== 0 && bins.map((bin, index) => (
        <div key={index}>
          <h2>Bin {index + 1} (Range: {bin.min} - {bin.max})</h2>
          {bin.characters.map((character, index) => (
            <div key={index}>
              <p>{character.name}</p>
              <p>{character.elapsedAV}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Turns;