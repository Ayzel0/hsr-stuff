import { useState, useEffect } from 'react';
import '../styles/SelectedCharacters.css';
import charBaseStats from '../data/charBaseStats.json';

const SelectedCharacters = ({ characterList, adjustSpeed, resetTeam }) => {
  const findCharacterSpeed = (characterName) => {
    const character = charBaseStats.find((char) => char.name === characterName);
    if(character) {
      return character.speed;
    }
  };

  return (
    <div className='selected-characters'>
      <h1 className='title'>Team Lineup</h1>
      {characterList.map((character, index) => (
        <div key={index} className='character'>
          <p>{character.name}</p>
          <div className='speed-adjust-input'>
            <p>Starting Speed: {character.speed}</p>
            <button onClick={() => adjustSpeed(character, -10)}>-10</button>
            <button onClick={() => adjustSpeed(character, -1)}>-1</button>
            <button onClick={() => adjustSpeed(character, 1)}>+1</button>
            <button onClick={() => adjustSpeed(character, 10)}>+10</button>
            <button onClick={() => adjustSpeed(character, findCharacterSpeed(character.name) - character.speed)}>Reset</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelectedCharacters;