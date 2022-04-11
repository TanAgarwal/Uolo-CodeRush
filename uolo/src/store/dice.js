import {createContext, useState} from 'react';
 
const DiceContext = createContext({ 
    number: 1,
    setNewDiceNumber: (diceNumber) => {}
}); 

export const DiceContextProvider = props => {
    const [diceNumber, setDiceNumber] = useState(1);
    
    const setNewDiceNumber = (diceNumber) => {
        setDiceNumber(diceNumber);
    }
    
    const context = {
        number: diceNumber,
        setNewDiceNumber
    };
    
    return <DiceContext.Provider value = {context}>
        {props.children}
    </DiceContext.Provider>
}

export default DiceContext;