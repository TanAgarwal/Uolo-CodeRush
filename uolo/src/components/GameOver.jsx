import React, {useEffect} from 'react';
import '../styles/question.css'
import commonFunctions from '../CommonFunctions';

const GameOver = ({ audioOn, toggleShowMessageBox, setShowHistory}) =>{

useEffect(() => {
    if(audioOn)
    {
        commonFunctions.playGameOverSound();
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
    <div className='game-over'>
        <div className='game-over-text'>
            Game Over
        </div>
        <img className='image' src='/images/crying.gif'/>
        <div className='gameover-buttons'>
            <button className='game-button scores' onClick={handleClickScores}><i className="fa fa-list"/> Scores</button>
            <button className='game-button retry' onClick={handleClickReplay}><i className="fa fa-repeat"/> Replay</button>
            <button className='game-button exit' onClick={showExitMessageBox}><i className="fa fa-close"/>Exit</button>
        </div>

    </div>
)
}

export default GameOver;
