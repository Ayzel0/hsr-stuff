import { useState, useEffect } from 'react';
import '../styles/ActionController.css';

const ActionController = ( {characterList, updateCharActions} ) => {
  const [charStats, setCharStats] = useState([]);

  useEffect(() => {
    const newActionValues = characterList.map(character => {
      return {
        name: character.name,
        speed: character.speed,
        currentAV: 10000/character.speed
      };
    }).sort((a, b) => a.currentAV - b.currentAV);

    setCharStats(newActionValues);
  }, [characterList])

  const advanceAction = (AV_amt) => {
    updateCharActions(charStats[0].name, AV_amt);

    let newActionValues = [...charStats];

    // Subtract AV_amt from every character's currentAV, and add AV_amt to the first character's currentAV.
    newActionValues = newActionValues.map((character, index) => ({
      ...character,
      currentAV: index === 0 ? 10000/character.speed : character.currentAV - AV_amt,
    }));

    newActionValues = newActionValues.sort((a, b) => a.currentAV - b.currentAV);

    setCharStats(newActionValues);
  }

  return (
    <div className='action-controller'>
      <h1>Action Controller</h1>
      <div>
        {charStats.length > 0 &&
          charStats.map((character, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <p>Acting Character: {character.name}</p>
                  <p>Current Action Value: {character.currentAV - charStats[0].currentAV}</p>
                  <p>Previous Action Value: {character.currentAV}</p>
                  <button onClick={() => advanceAction(charStats[0].currentAV)}>Take Action</button>
                </div>
              )
            } else {
              return (
                <div key={index}>
                  <p>Character: {character.name}</p>
                  <p>Current Action Value: {character.currentAV - charStats[0].currentAV}</p>
                  <p>Previous Action Value: {character.currentAV}</p>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default ActionController;