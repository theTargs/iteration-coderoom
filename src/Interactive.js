import React, { Component } from 'react';
import { DM } from './DungeonMaster';
import ButtonContainer from './ButtonContainer.js';
import CodingBox from './CodingBox.js';

/**
 * Data needed? Game state 
 * Data to pass down to child component via Context API
 */

class Interactive extends Component {
  render() {
    return (
      <DM.Consumer>
        {context => {
          return (
            <div className="interactive">
              <ButtonContainer />
              <CodingBox />
            </div>
          )}}
      </DM.Consumer>
    );
  }
}

export default Interactive;
