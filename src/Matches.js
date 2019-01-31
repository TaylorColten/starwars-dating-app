import React from 'react';
import './Matches.css'


const Matches = (props) => {
  return (
    <div>
      {props.matches.length > 0
        && props.Matches
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