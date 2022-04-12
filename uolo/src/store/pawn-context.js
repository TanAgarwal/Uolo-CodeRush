import {createContext, useState} from 'react';
import commonFunctions from '../CommonFunctions';

const PawnContext = createContext({ 
    index: 1,
    setNewPawnPosition: (index) => {}
}); 

export const PawnContextProvider = props => {
    const [pawnPosition, setPawnPosition] = useState(1);
    
    const setNewPawnPosition = (index) => {
        let pawnDiv = document.getElementById(pawnPosition);
        pawnDiv.innerHTML = `<div id = ${pawnPosition} className = 'cell' > ${pawnPosition} </div>`;
        pawnDiv = document.getElementById(index);
        pawnDiv.innerHTML = `<div id = ${index} class = 'pawn' />`;
        if (index != pawnPosition) {
            commonFunctions.playPawnMoveSound();
        }
        setPawnPosition(index);
    }
    
    const context = {
        index: pawnPosition,
        setNewPawnPosition
    };
    
    return <PawnContext.Provider value = {context}>
        {props.children}
    </PawnContext.Provider>
}

export default PawnContext;