/*
Functional conponent to generate a door.
The class for the prize is allocated 
only to doors that are open. 
*/
import '../css/Door.css';

const Door = (props) => { 
 
  //initialise arrays for door classes and prize classes
  let doorClassArr = ['door'];
  let prizeClassArr = ['prize'];

  //door is open, allocate door open class and the correct prize class
  if(props.isOpen) {
        doorClassArr.push('open');
       if(props.isWinner){
        prizeClassArr.push('money');
       } else {
        prizeClassArr.push('poo'); 
       }
    } 

  //render the door with correct classes and a click event  
  return (    
    <div className={doorClassArr.join(' ')} onClick={() => props.clickHandler(props.doorNumber)}>
        <div className={prizeClassArr.join(' ')}>
        </div>          
    </div>
  );
}

export default Door;
