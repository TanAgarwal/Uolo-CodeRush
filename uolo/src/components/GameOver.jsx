import React, {useEffect} from 'react';
import './question.css'
import commonFunctions from '../CommonFunctions';

const GameOver = ({audioOn}) =>{

useEffect(() => {
    if(audioOn)
    {
        commonFunctions.playGameOverSound();
    }
})
return(
    <div className='game-over'>
        <div className='game-over-text'>
            Game Over
        </div>
        <div className='buttons'>
            <button className='game-button green'>Retry</button>
            <button className='game-button orange'>Exit</button>
        </div>

    </div>
)
}

export default GameOver;
