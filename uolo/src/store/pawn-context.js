import {createContext, useState} from 'react';
 
const PawnContext = createContext({ 
    index: 1,
    setNewPawnPosition: (index) => {}
}); 

export const PawnContextProvider = props => {
    const [pawnPosition, setPawnPosition] = useState(1);
    
    const setNewPawnPosition = (index) => {
        let pawnDiv = document.getElementById(pawnPosition);
        pawnDiv.innerHTML = "";
        pawnDiv = document.getElementById(index);
        pawnDiv.innerHTML += "<div id = 'pawn' class = 'pawn' />";
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