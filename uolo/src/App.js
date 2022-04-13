import './App.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AppControllerFunctions from './controller/app-controller';
import AskQuestionContext from './store/ask-question';
import DiceContext from './store/dice';
import commonFunctions from './CommonFunctions';
import MessageBox from './components/MessageBoxComponent';
import GameOver from './components/GameOver';
import Rules from './components/rulesComponent';
import Congratulations from './components/Congratulations';

let mainQuestionBag = [];
const diceArray = [
  '/images/dice/1.jpg', 
  '/images/dice/2.jpg',
  '/images/dice/3.jpg', 
  '/images/dice/4.jpg', 
  '/images/dice/5.jpg',
  '/images/dice/6.jpg',
  '/images/dice/n.png'
];

const wormholes = {
  3: 14,
  78: 39,
  69: 88,
  99: 10,
  25: 45
}

const questionCategory = [9, 27, 19, 18, 22, 10, 17]

function App () {
  const pawnCtx = useContext(PawnContext);
  const askQuestionCtx = useContext(AskQuestionContext);
  const diceCtx = useContext(DiceContext);
  const [showDice, setShowDice] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [showMessageBox, toggleShowMessageBox] = useState({});
  const [gameOver, setGameOver] = useState(false);

  async function fetchQuestions(category) {
    await fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=easy&type=multiple`)
      .then(response => response.json())
        .then(data => {
          const questionArray = data.results.map(function(question) {
            return {
              question: question.question, 
              answer: question.correct_answer,
              status: 1,
              options: question.incorrect_answers
            }
          })
          mainQuestionBag = questionArray;
          
        })
      setShowDice(true);
  }

  useEffect(() => {
    pawnCtx.setNewPawnPosition(1, pawnCtx.index); 
    fetchQuestions(9)
  }, []);

  if (mainQuestionBag === 0) {
    fetchQuestions(questionCategory[0]);
    questionCategory.shift();
  }

  /**************** UI RENDERING FUNCTIONS ****************/

  const renderDice = () => {
    if (showDice) {
      if (diceCtx.number === 7) {
        return (
          <input className = 'dice-with-letter-n' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
            onClick = {() => AppControllerFunctions.rollDice(
              (val) => askQuestionCtx.askNewQuestion(val), 
              (val) => setShowDice(val),
              (val) => diceCtx.setNewDiceNumber(val),
              audioOn)}
               />
        )
      }
      return (
        <input className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
          onClick = {() => AppControllerFunctions.rollDice(
            (val) => askQuestionCtx.askNewQuestion(val), 
            (val) => setShowDice(val),
            (val) => diceCtx.setNewDiceNumber(val),
            audioOn)}
            disabled = {gameOver}
             />
      );
    }
    return <input className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} />;
  }

  const renderGrid = () => {
    return <div className='grid'> <Col wormholes = {wormholes} /> </div>;
  }

  const renderQuestion = () => {
    if (askQuestionCtx.question != 0) {
      return (
        AppControllerFunctions.askQuestionHandler(
          mainQuestionBag.splice(0, 1), 
          (val) => setShowDice(val),
          (val) => setGameOver(val),
          audioOn,
          wormholes
          )
      );
    }
  }

  const toggleAudio = () =>{
    if(!gameOver){
    commonFunctions.playAudioToggleSound();
    audioOn ? setAudioOn(false) : setAudioOn(true)
    }
  }

  const backButton = () => {

  }

  const showBackButtonMessageBox = () => {
    toggleShowMessageBox({
      "Are you really want to go back?" : {
        "YES" : backButton,
        "NO" : () => toggleShowMessageBox({})
      }
    });
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
    if(!gameOver){
      if(audioOn){
          commonFunctions.playAudioToggleSound();
      }
      toggleShowMessageBox({
        "Are you really want to exit?" : {
          "YES" : exit,
          "NO" : () => {toggleShowMessageBox({}) 
          commonFunctions.playAudioToggleSound();}
        }
      });
    }
  }

  const play = () => {
    let div = document.getElementById('header');
    // div.classList.remove('App-header banner');
    div.className = "App-header banner-play-button";
  }

  /**************** MAIN RETURN FUNCTION ****************/
  return (
    <div>
      <div id = 'rules'><Rules /></div>
      <header id = "header" className="App-header">
        <div className='swingimage'>
          <div className='rainbowText'>GK</div> <div>{renderDice()}</div><div className='rainbowText'> LUCK</div>
        </div>
        <div className='mic' onClick={toggleAudio}>
          { audioOn ? <img src='/images/pngwing.com.png'/> : <img src='/images/mute.png'/>}
        </div>
        <div onClick = {showExitMessageBox}> <img className = 'exit-button' src = '/images/exit.png' /> </div>
        
        {Object.keys(showMessageBox).length !== 0 ? 
          <MessageBox 
            msg = {Object.keys(showMessageBox)[0]}
            options = {Object.values(showMessageBox)[0]}
          /> : null}
        
        <div className = 'dice-n-grid'> 
          {renderGrid()}
          {renderQuestion()}
          { gameOver ? <GameOver audioOn={audioOn} showExitMessageBox={showExitMessageBox}/> : null}
          {/* <Congratulations/> */}
        </div>
      </header>
    </div>
  );
}

export default App;
