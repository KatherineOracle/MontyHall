/*
 Functional conponent to generate a reset button 
 with a click event. 
*/

const Reset = (props) => {
  return <button onClick={() => props.clickHandler()}>Play again</button>;
};

export default Reset;
