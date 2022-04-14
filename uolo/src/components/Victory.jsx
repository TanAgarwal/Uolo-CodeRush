import React, {useEffect} from 'react';
import './victory.css'
import commonFunctions from '../CommonFunctions';

const Victory = ({ audioOn, showExitMessageBox }) =>{

useEffect(() => {
    if(audioOn)
    {
        commonFunctions.playVictorySound();
    }
}, [])

const handleClickReplay = () => {
    if(audioOn)
    {
        commonFunctions.playAudioToggleSound();
    }
    setTimeout(() => {
        window.location.reload(true)
    },2000)
}
return(
    <div className='victory'>
        <div className='you-won'>
            YOU WON!
        </div>
        <div className='tag-line' >'Luck matched your GK'</div>
        <div className='buttons'>
            <button className='game-button retry' onClick={handleClickReplay}><i className="fa fa-repeat"/> Replay</button>
            <button className='game-button exit' onClick={showExitMessageBox}><i className="fa fa-close"/>Exit</button>
        </div>

    </div>
)
}

export default Victory;
