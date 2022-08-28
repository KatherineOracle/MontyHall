/*
Functional component to output if
1) Player won
2) Player lost
3) Player must make first door selection
4) Player must make final door selection

This is based on the the gameStatus and tries props.
*/

const Result = (props) => {
  let instruction = "";

  switch (props.gameStatus) {
    // game status is false = game lost
    case false:
      instruction = "You lost!";
      break;
    // game status is true = game lost
    case true:
      instruction = "You won!";
      break;
    // game status is null = game still in progress
    default:
      switch (props.tries) {
        // zero doors selected
        case 0:
          instruction = "Click a door to start the game.";
          break;
        // one doors selected, therefore time for final choice
        default:
          instruction = "Make your final choice!";
      }
  }

  //output instruction string
  return <span>{instruction}</span>;
};

export default Result;
