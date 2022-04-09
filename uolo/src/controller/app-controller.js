const AppControllerFunctions = {
    addToPawn : (steps, pawnCtx) => {
        if (pawnCtx.index + steps <= 100) {
          pawnCtx.setNewPawnPosition(pawnCtx.index + steps);
        }
    },
    
    rollDice : () => {
        const max = 6, min = 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default AppControllerFunctions;