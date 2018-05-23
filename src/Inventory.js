import React, { Component } from "react";
import { DM } from './DungeonMaster';

class Inventory extends Component {
    render() {
        return (
          <DM.Consumer>
            {context => (
              // this is where any work happens that requires state. DungeonMaster's "this.state" can be reffered to as "context" here
                <div className="inventory">
                    <div className="name-inventory">Inventory:</div>
                    <p className="name-inventory">Keys Collected: {context.keysCollected} / 3</p>
                </div>
            )}
          </DM.Consumer>
        );
    }
}

export default Inventory;