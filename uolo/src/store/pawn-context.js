import {createContext, useState} from 'react';
import commonFunctions from '../CommonFunctions';
import '../pawn.css';

const PawnContext = createContext({ 
    index: 97,
    setNewPawnPosition: (oldIndex, newIndex, audioOn) => {}
}); 

const pawnOrientation = (index) => {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(index)) {
        return 'pawn-right';
    } else if ([11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(index)) {
        return 'pawn-left';
    } else if ([21, 22, 23, 24, 25, 26, 27, 28, 29, 30].includes(index)) {
        return 'pawn1-right';
    } else if ([31, 32, 33, 34, 35, 36, 37, 38, 39, 40].includes(index)) {
        return 'pawn1-left';
    } else if ([41, 42, 43, 44, 45, 46, 47, 48, 49, 50].includes(index)) {
        return 'pawn2-right';
    } else if ([51, 52, 53, 54, 55, 56, 57, 58, 59, 60].includes(index)) {
        return 'pawn2-left';
    } else if ([61, 62, 63, 64, 65, 66, 67, 68, 69, 70].includes(index)) {
        return 'pawn3-right';
    } else if ([71, 72, 73, 74, 75, 76, 77, 78, 79, 80].includes(index)) {
        return 'pawn3-left';
    } else if ([81, 82, 83, 84, 85, 86, 87, 88, 89, 90].includes(index)) {
        return 'pawn4-right';
    } else if ([91, 92, 93, 94, 95, 96, 97, 98, 99, 100].includes(index)) {
        return 'pawn4-left';
    }
}

export const PawnContextProvider = props => {
    const [pawnPosition, setPawnPosition] = useState(1);
    
    const setNewPawnPosition = (oldIndex, newIndex, audioOn) => {
        let pawnDiv = document.getElementById(oldIndex);
        pawnDiv.innerHTML = `<div id = ${oldIndex} > ${oldIndex} </div>`;
        pawnDiv = document.getElementById(newIndex);
        pawnDiv.innerHTML = `<div id = ${newIndex} class = ${pawnOrientation(newIndex)} />`;
        if (newIndex !== oldIndex && audioOn) {
            commonFunctions.playPawnMoveSound();
        }
        setPawnPosition(newIndex);
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