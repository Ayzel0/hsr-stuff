import { useState, useEffect, useRef } from 'react';
import React from 'react';
import SelectedCharacters from './SelectedCharacters';
import CharacterSelector from './CharacterSelector';
import Turns from './Turns';
import ActionController from './ActionController'
import '../styles/RotationBuilder.css';

const RotationBuilder = () => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characterActions, setCharacterActions] = useState([]);
  const [bins, setBins] = useState([
    {
      min: 0,
      max: 150,
      characters: []
    }
  ]);

  const lastProcessedIndex = useRef(0);

  useEffect(() => {
    if (characterActions.length > lastProcessedIndex.current) {
      let updatedBins = [...bins];
      for (let i = lastProcessedIndex.current; i < characterActions.length; i++) {
        const character = characterActions[i];
        if (character.elapsedAV > updatedBins[updatedBins.length-1].max) {
          updatedBins.push({
            min: updatedBins[updatedBins.length - 1].max,
            max: updatedBins[updatedBins.length - 1].max + 100,
            characters: []
          });
        }
        for (let bin of updatedBins) {
          if (character.elapsedAV >= bin.min && character.elapsedAV < bin.max) {
            bin.characters.push(character);
            break;
          }
        }
        lastProcessedIndex.current = i + 1;
      }
      setBins(updatedBins);
    }
  }, [characterActions]);

  const resetBins = () => {
    setBins([{
      min: 0,
      max: 150,
      characters: []
    }]);
    lastProcessedIndex.current = 0;
  }

  const resetCharactersOnTeam = () => {
    setSelectedCharacters([]);
    setCharacterActions([]);
    resetBins();
  }

  const handleCharacterSelect = (character) => {
    if(selectedCharacters.includes(character)) {
      setSelectedCharacters((prevCharacters) => prevCharacters.filter(element => element !== character));
    } else if((selectedCharacters.length < 4)) {
      setSelectedCharacters((prevCharacters) => [...prevCharacters, character]);
    }
  }

  const adjustSpeed = (character, adjustment) => {
    setSelectedCharacters(prevCharacters =>
      prevCharacters.map(ch => 
        ch === character
          ? { ...ch, speed: ch.speed + adjustment }
          : ch
      )
    );
  };

  const AVListUpdate = (charName, elapsedActionValue) => {
    if (characterActions.length === 0) {
      setCharacterActions([{
        name: charName,
        elapsedAV: elapsedActionValue
      }])
    } else {
      setCharacterActions(prevActions => [
        ...prevActions, 
        {
          name: charName,
          elapsedAV: elapsedActionValue + prevActions[prevActions.length - 1].elapsedAV
        }
      ]);
    }
  }

  return (
    <div>
      <CharacterSelector onCharacterSelect={handleCharacterSelect} />
      <div className='reset-tools'>
        <button onClick={() => resetCharactersOnTeam()} className='reset-button'>Reset Team</button>
      </div>
      <div className='character-turn-display'>
        <SelectedCharacters characterList={selectedCharacters} adjustSpeed={adjustSpeed} />
        <ActionController characterList={selectedCharacters} updateCharActions={AVListUpdate}/>
        <Turns bins={bins} />
      </div>
    </div>
  )
}

export default RotationBuilder;