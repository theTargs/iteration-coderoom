import React, { Component } from "react";

const DM = React.createContext();

var blob = new Blob([
  `onmessage = function (e) { console.log('Message received from main script');

  // console.log(e.data.code);

// may need to do some special parsing
// This eval's the code and defines the function in our scope
// eval(e.data.code);

try {
    eval(e.data.code); 
} catch (e) {
    if (e instanceof SyntaxError) {
        postMessage('no');
    }
}

let passed = true; //assuming they are passing
let val;
switch (e.data.challenge) {
  case 1: //MVP ... they need to write a function that will find an element in an array and return the index
    passed = true; //assuming they are passing

try {
  val = findInArray(['a', 'b', 'c'], 'b');
} catch (e) {
  postMessage('no');
}

    if ( val !== 1) {
      passed = false;
      break;
    }

    try {
      val = findInArray([1, 2, 3], 1);
    } catch (e) {
      postMessage('no');
    }
    if ( val !== 0) {
      passed = false;
      break;
    }

    break;
  case 2:

    break;

  default:
    break;
}

let msg = passed ? 'yes' : 'no';
postMessage(msg);}`
]);

var blobURL = window.URL.createObjectURL(blob);
var myWorker = new Worker(blobURL);

let seconds = 0;
let timerOn = false;

class DungeonMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      checkpoint: [0, [0, 0, 0]],
      isHidden: true,
      keysCollected: 0,
      totalTime: 0,
      seconds: 0,
      timerOn: false,
      incrementTime: () => {
        this.setState({timerOn: true});
        seconds++;
      },
      timerStart: () => {
        this.timeoutID = window.setTimeout(() => {this.state.incrementTime(); this.state.timerStart()}, 1000);
        console.log(seconds); 
        this.setState({seconds: seconds}); 
      },

      Timer: () => {
        this.state.timerStart();    
      },

      timerPause: () => {
        this.setState({timerOn: false});
        window.clearTimeout(this.timeoutID);
        console.log('pause pressed', this.state.seconds);
      },

      text: {
        introText:
          "You wake up to find yourself in a dimly lit room. Wondering where you are you start to explore your small surroundings...",
        deskText:
          "You head to the desk and search amongst the scattered sheets of paper: ",
        nightstandText:
          "Wondering what might be inside you open the nightstand drawer: ",
        bedText:
          "Hoping no monsters attack, you cautiously peek under the bed: ",
        completionText:
          "Congratulations on completion of the challenge. You received a key!",
        bossChallengeText:
          "You have collected all the keys to unlock the door. Time for the Boss battle!",
        bossDefeatText:
          "CONGRATULATIONS!!! You have succesfully defeated the Boss Challenge and ESCAPED!!!"
      },

      activeNarrative: ['You wake up to find yourself in a dimly lit room. Wondering where you are you start to explore your small surroundings...you notice that the desk drawer looks like a good place to find a hint!'],

      promptText: '',
      deskBtn: {disabled: false, text: 'Check Desk'},
      nightstandBtn: {disabled: false, text: 'Open Nightstand Drawer'},
      bedBtn: {disabled: false, text: 'Look Under Bed'},
      bossBtn: {disabled: false, text: 'Challenge Boss'},
      pauseBtn: {disabled: false, text: 'Pause timer'},
            

      goToDesk: () => {
        // start the game
        this.state.gameStarted = true;
        // here we add the relevant narrative text to the active narrative array
        this.state.activeNarrative.unshift(this.state.text.deskText);

        this.setState({
          challengePrompt:
            "Write a function that accepts an array and a value as parameters. It will return the index of the value in the array"
        });

        // reset challengeResponseText to an empty string at beginning of challenge
        this.setState({ challengeResponseText: "" });

        // set deskBtn disabled so it's greyed out

        this.setState({deskBtn: {disabled: true, text: 'Check Desk' }});

        //set timer
        if (this.state.timerOn === true) return
        else {this.state.Timer();
        this.state.timerOn = true;};

        //set next compiler default screen
        this.setState({ startingCode: `function () => {
            
        }`});
      },
      goToNightstand: function() {
        console.log(this.state.startingCode);
        // start the game
        this.state.gameStarted = true;
        // here we add the relevant narrative text to the active narrative array
        this.state.activeNarrative.unshift(this.state.text.nightstandText);
        // reset challengeResponseText to an empty string at beginning of challenge
        this.setState({ challengeResponseText: "" });
        //provide a new challenge prompt
        this.setState({ challengePrompt: "Write a string that evaluates to wilbur:"
        }),

        this.setState({nightstandBtn: {disabled: true, text: 'Open Nightstand Drawer'}});
        if (this.state.timerOn === true) return
        else {this.state.Timer();
          this.setState({timerOn: true});};

        //set next compiler default screen
        this.setState({ startingCode:
          `function () => {
            
          }`});
      },
      goToBed: function() {
        console.log(this.state.startingCode);
        // start the game
        this.state.gameStarted = true;

        // here we add the relevant narrative text to the active narrative array
        this.state.activeNarrative.unshift(this.state.text.bedText);
        //new prompt
        this.setState({
          challengePrompt:
            "write WILBUR IS THE BEST:"
        });
        // reset challengeResponseText to an empty string at beginning of challenge
        this.setState({ challengeResponseText: "" });
        // set bedBtn disabled so it's greyed out

        this.setState({bedBtn: {disabled: true, text: 'Look Under Bed'}});
        if (this.state.timerOn === true) return
        else {this.state.Timer();
        this.state.timerOn = true;};
        //set next compiler default screen
        this.setState({ startingCode:
          `function () => {
            
          }`});
      },
      challengeBoss: function() {
        // here we add the relevant narrative text to the active narrative array
        this.state.activeNarrative.unshift(this.state.text.bossChallengeText);
        // reset challengeResponseText to an empty string at beginning of challenge
        this.setState({ challengeResponseText: "" });
        // set bedBtn disabled so it's greyed out
      },
      bossChallengeCompleted: function() {
        // here we add the relevant narrative text to the active narrative array
        this.state.activeNarrative.unshift(this.state.bossDefeatText);
        // we also need to redirect the player to the winner screen

        //total time - pause the timer, which will update the state
        this.state.timerPause();
        //update state.totalTime --> is this necessary?
        this.setState({totalTime: seconds});
        console.log(this.state.totalTime);
      },
      toggleHidden: function() {
        this.setState({ isHidden: false });
      },
      challengeActive: true,
      challengePrompt: "",
      
      
      challengeResponseText: "",

      submitTest: function(code) {
        // console.log(`submitTest: submitting code to web worker, sending datatype: ${typeof code}.\nCode to submit: ${code}`);
        // console.log(myWorker);
        if (this.state.gameStarted)
          myWorker.postMessage({ code: code, challenge: 1 });
      },
    };

    this.state.incrementTime = this.state.incrementTime.bind(this);
    this.state.timerStart = this.state.timerStart.bind(this);
    this.state.timerPause = this.state.timerPause.bind(this);
    this.state.Timer = this.state.Timer.bind(this);
    this.state.goToDesk = this.state.goToDesk.bind(this);
    this.state.goToBed = this.state.goToBed.bind(this);
    this.state.goToNightstand = this.state.goToNightstand.bind(this);
    this.state.challengeBoss = this.state.challengeBoss.bind(this);
    this.state.bossChallengeCompleted = this.state.bossChallengeCompleted.bind(this);
    this.state.submitTest = this.state.submitTest.bind(this);
    this.state.toggleHidden = this.state.toggleHidden.bind(this);
    myWorker.onmessage = e => {
      //console.log( e.data, "NO!!" );

      if (e.data === 'yes') {
       // console.log("made it in!");
        this.state.activeNarrative.push(this.state.text.completionText);
        this.setState({keysCollected: this.state.keysCollected + 1});
        this.setState({challengeResponseText: 'Nice one!'});
      } else if (e.data === 'no') {
        this.setState({challengeResponseText: 'Try again bud...'});

      }
      //console.log('Message received from worker');
      // DEMO: just change the url on success or failure of one challenge
      // if (e.data === 'yes') window.URL('/win.html');
      // else window.URL('/lose.html');
    };

    // bind in-state functions here
  }

  render() {
    return <DM.Provider value={this.state}>{this.props.children}</DM.Provider>;
  }
}

export { DungeonMaster, DM };
