import React, {useEffect} from 'react';
import '../styles/victory.css'
import commonFunctions from '../CommonFunctions';

const Victory = ({ audioOn, toggleShowMessageBox, setShowHistory }) =>{

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
    window.location.reload(true)
}

const handleClickScores = () => {
    if(audioOn)
    {
        commonFunctions.playAudioToggleSound();
    }
    setShowHistory(true);
}

const exit = () => {
    if(audioOn){
        commonFunctions.playAudioToggleSound();
    }
    setTimeout(() => {
      window.open("about:blank", "_self");
      window.close();
    },2000)
  }
  
const showExitMessageBox = () => {
      if(audioOn){
          commonFunctions.playAudioToggleSound();
      }
      toggleShowMessageBox({
        "Do you really want to exit?" : {
          "YES" : exit,
          "NO" : () => {toggleShowMessageBox({}) 
          commonFunctions.playAudioToggleSound();}
        }
      });
  }

return(
    <div className='victory'>
        <div className='you-won'>
            YOU WON!
        </div>
        <div className='tag-line' >'Luck matched your GK'</div>
        <div className='buttons'>
            <button className='game-button scores' onClick={handleClickScores}><i className="fa fa-list"/> Scores</button>
            <button className='game-button retry' onClick={handleClickReplay}><i className="fa fa-repeat"/> Replay</button>
            <button className='game-button exit' onClick={showExitMessageBox}><i className="fa fa-close"/>Exit</button>
        </div>

    </div>
)
}

export default Victory;
