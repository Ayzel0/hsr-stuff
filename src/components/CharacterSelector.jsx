import charBaseStats from '../data/charBaseStats.json'
import '../styles/CharacterSelector.css'

const CharacterSelector = ({ onCharacterSelect }) => {
  return (
    <div className='character-selector'>
      <div className='selector-buttons'>
        {charBaseStats.map((character, index) => (
          <div key={index} onClick={() => onCharacterSelect(character)} className='character-select-box'>
            <div className='text'>
              <p>{character.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterSelector;