import React, { Component } from "react";
import { render } from "react-dom";

import { DM } from './DungeonMaster';

class Button extends Component {
  render() {
    return (
      <DM.Consumer>
        {context => {
          return (
            <div>
              <button id="placeholder" className="button" onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.btnLabel}</button>
            </div>
          )}}
      </DM.Consumer>
    );
  }
}

// array of current button
class ButtonContainer extends Component {
  render() {
    return (
      <DM.Consumer>
        {context => {
          if (context.isHidden) {
            return(
              <div>
              <Button btnLabel={context.deskBtn.text} onClick={context.goToDesk} disabled={context.deskBtn.disabled} />
              <Button btnLabel={context.nightstandBtn.text} onClick={context.goToNightstand} disabled={context.nightstandBtn.disabled}/>
              <Button btnLabel={context.bedBtn.text} onClick={context.goToBed} disabled={context.bedBtn.disabled}/>
              {bossBtnVisible}
              {/*<Button btnLabel={context.pauseBtn.text} onClick={context.timerPause}/> TIMER PAUSE BUTTON FOR TESTING */}
            </div>
          );

          // let bossBtnVisible = <Button btnLabel={context.bossBtn.text} onClick={context.challengeBoss} disabled={context.bossBtn.disabled} />;
          // if (context.isHidden) {
          //   bossBtnVisible = <div></div>;
          // }
          // if (context.deskBtn.disabled === true && context.nightstandBtn.disabled === true && context.bedBtn.disabled === true && context.isHidden === true) {
          //   context.toggleHidden();
          // }
          // return (
          //   <div>
          //     {/* ButtonContainer placeholder */}
          //     <Button btnLabel={context.deskBtn.text} onClick={context.goToDesk} disabled={context.deskBtn.disabled} />
          //     <Button btnLabel={context.nightstandBtn.text} onClick={context.goToNightstand} disabled={context.nightstandBtn.disabled}/>
          //     <Button btnLabel={context.bedBtn.text} onClick={context.goToBed} disabled={context.bedBtn.disabled}/>
          //     {bossBtnVisible}
          //   </div>
          // )
        }}
      </DM.Consumer>

    )}
}

export default ButtonContainer;