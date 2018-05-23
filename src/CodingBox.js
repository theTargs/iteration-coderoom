import React, { Component } from "react";
import { render } from "react-dom";
import { DM } from './DungeonMaster';
import CodeMirror from 'react-codemirror'
import '../node_modules/codemirror/mode/javascript/javascript'
import "./codemirror.css";

class CodeMirrorApp extends Component {
  constructor (props) {
      super(props);
      this.state = {
        code: this.props.startingCode,
      }
      this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(newCode) {
      this.setState({code: newCode});
  }
  componentDidMount() {
    
  }

  render() {
    let mirrorVal = this.state.code;
      const options = {
          lineNumbers: true,
          mode: 'javascript'
      };
      return(
          <div>
              <CodeMirror value={mirrorVal} onChange={this.handleChange} options={options}/>
              <div id="challenge-options">
                <button id="code-btn" onClick={() => this.props.submitTest(this.state.code)}>Submit Code!</button>
                <div>{this.props.challengeResponseText}</div>
              </div>
          </div>
      );
  }
}

class CodingBox extends Component {
  componentDidMount() {
    // setInterval(() => this.forceUpdate(), 1000)
  }

  render() {
    return (
      <DM.Consumer>
        {context => {
<<<<<<< HEAD
          if (!context.challengeActive) return <div className="coding-wrapper">Awaiting challenge...</div>

=======
          if (!context.gameStarted) return <div className="coding-wrapper">Start your adventure to continue...<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>
          // var doc = editor.getDoc();
          // console.log(doc);
          // console.log(doc.getValue());
>>>>>>> bb74d545121f6808ca57d35cbe19bc04c9de734f
          return (
            <div className="coding-wrapper">
              <center><div id="challenge-text">{context.challengePrompt}</div></center>
              <CodeMirrorApp
                submitTest={context.submitTest}
                startingCode={context.startingCode} 
                challengeResponseText={context.challengeResponseText}/>
            </div>
            )
        }}
      </DM.Consumer>
    ) 
  }
}

export default CodingBox;
