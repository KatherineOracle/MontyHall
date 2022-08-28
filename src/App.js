/*
App Class-based/Stateful component demonstrating the Monty Hall problem
https://en.wikipedia.org/wiki/Monty_Hall_problem

This compnenet assembles a the game comprising:
1) constructor
2) handleDoorClick 
3) handleReset
4) renderDoors
5) reset
6) Render function
*/
import React from "react";
import "./css/App.css";
import Door from "./components/Door";
import Reset from "./components/Reset";
import Result from "./components/Result";

class App extends React.Component {

  /*1. constructor 
    runs when component mounts
    set initial state and binds the two click event handlers 
  */
  constructor(props) {
    super(props);
    this.handleDoorClick = this.handleDoorClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = this.reset();
    this.doors = [1, 2, 3];
  }


  /* 2. Door click handler 
    We pass in the number of the door that was clicked [1-3] 
    as a variable
  */
  handleDoorClick(doorNumber) {

    //stop immediately if the game is already won or lost 
    if (this.state.status != null) {
      return;
    }

    //increment click count    
    let tryCount = this.state.tries + 1;


    if (tryCount === 1) {
      //on the first click we don't want to open the selected door or the winning door  
      let notthesedoors = [doorNumber, this.state.winningDoor];
       
      //filter out the  door that isn't in the array above 
      const doorsRemaining = this.doors.filter(
        (x) => notthesedoors.indexOf(x) === -1
      );

      //update state  
      this.setState((prevState) => ({
        openDoor: doorsRemaining[0],
        tries: tryCount,
      }));
    } else {
      //this is the second/final click

      //TRUE: door clicked = winning door 
      //FALSE: door clicked != winning door 
      const status = doorNumber === this.state.winningDoor;

      //update state  
      this.setState((prevState) => ({
        tries: tryCount,
        status: status,
      }));
    }
  }

  /* 3. Handle click on reset button
        Refresh the state
  */  
  handleReset() {
    this.setState((prevState) => this.reset());
  }

  /* 4. Function to build list of three doors based on state
        If the game is finished all doors are open
  */    
  renderDoors() {
    let doors = this.doors;
    if (this.state.status === null) {
      return doors.map((door) => (
        <Door
          key={"door" + door}
          doorNumber={door}
          isWinner={this.state.winningDoor === door}
          isOpen={this.state.openDoor === door}
          clickHandler={this.handleDoorClick}
        />
      ));
    } else {
      return doors.map((door) => (
        <Door
          key={"door" + door}
          doorNumber={door}
          isWinner={this.state.winningDoor === door}
          isOpen={true}
          clickHandler={this.handleDoorClick}
        />
      ));
    }
  }

  /* 5. Reset = refresh the state for new game
  State setn back to defaults with a new random winning door number (1,2 or 3).
  This happens when component mounts or when the reset button is clicked
  */     
  reset() {
    return {
      winningDoor: Math.floor(Math.random() * 3) + 1,
      selectedDoor: null,
      openDoor: null,
      tries: 0,
      status: null,
    };
  }  

  /* 6. Render 
  return output to the root component.
  Output comprises
  a) header - game title
  b) A Result component - output instruction to user
  c) A Reset component - a button that restarts the game
  d) Three door components
  */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Let's play Monty Hall</h1>
        </header>
        <main>
          <Result gameStatus={this.state.status} tries={this.state.tries} />
          <Reset clickHandler={this.handleReset} />
          <hr />
          <div className="doors">{this.renderDoors()}</div>
        </main>
      </div>
    );
  }
}

export default App;
