import React from 'react';
import './Matches.css'


const Matches = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.type === 'match' ? 'pink' : 'gray',
      }}
    >
      {props.matches.length > 0
        && props.matches
          .map((character, index) => {
            return (
              <li
                className={'App-li'}
                key={index}
              >
                {character.name}
              </li>
            )
          })
      }
    </div>
  );
}
 export default Matches;