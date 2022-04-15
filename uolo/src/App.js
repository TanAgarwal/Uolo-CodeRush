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
import Victory from './components/Victory';
import History from './components/History';

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
  4: 14,
  9: 31,
  20: 38,
  29: 84,
  40: 59,
  63: 81,
  71: 91,
  17: 7,
  60: 18,
  68: 49,
  87: 24,
  93: 73,
  99: 46
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
  const [win, setWin] = useState(false);
  const [name, setName] = useState('');

  async function fetchQuestions(category) {
    await fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=easy&type=multiple`)
      .then(response => response.json())
        .then(data => {
          const questionArray = data.results.map(function(question) {
            return {
              question: question.question, 
              answer: question.correct_answer,
              options: question.incorrect_answers
            }
          })
          mainQuestionBag = questionArray;
          mainQuestionBag = mainQuestionBag.filter(question => !question.question.includes(';') && !question.answer.includes(';'));
        })
      setShowDice(true);
  }

  useEffect(() => {
    pawnCtx.setNewPawnPosition(1, pawnCtx.index); 
    fetchQuestions(9);
  }, []);
  
  if (mainQuestionBag.length <= 6) {
    async function getQuestion () {
      await fetchQuestions(questionCategory[0]);
    }
    getQuestion();
    questionCategory.shift();
  }

  /**************** UI RENDERING FUNCTIONS ****************/

  const renderDice = () => {
    if (showDice) {
      if (diceCtx.number === 7) {
        return (
          <input alt = "N And Dice" className = 'dice-with-letter-n' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
            onClick = {() => AppControllerFunctions.rollDice(
              (val) => askQuestionCtx.askNewQuestion(val), 
              (val) => setShowDice(val),
              (val) => diceCtx.setNewDiceNumber(val),
              audioOn)}
               />
        )
      }
      return (
        <input alt = "Dice" className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
          onClick = {() => AppControllerFunctions.rollDice(
            (val) => askQuestionCtx.askNewQuestion(val), 
            (val) => setShowDice(val),
            (val) => diceCtx.setNewDiceNumber(val),
            audioOn)}
            disabled = {gameOver}
             />
      );
    }
    return <input alt = "Dice" className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} />;
  }

  const renderGrid = () => {
    return <div className='grid'> <Col wormholes = {wormholes} /> </div>;
  }

  const renderQuestion = () => {
    console.log("came to app.js");
    if (askQuestionCtx.question !== 0) {
      return (
        AppControllerFunctions.askQuestionHandler(
          mainQuestionBag.splice(0, 1), 
          (val) => setShowDice(val),
          (val) => setGameOver(val),
          audioOn,
          wormholes,
          (val) => toggleShowMessageBox(val),
          name
          )
      );
    }
  }

  const renderRules = () => {
    return (
      <div id = 'rules'>
        <Rules 
          name = {name} 
          setNameCallback = {(val) => setName(val)} 
          toggleShowMessageBoxCallback = {(val) => toggleShowMessageBox(val)} />
      </div>
    )
  }

  const renderGameHeading = () => {
    return (
        <div className='swingimage'>
          <div className='rainbowText'>GK</div> <div>{renderDice()}</div><div className='rainbowText'> LUCK</div>
        </div>
    )
  }

  const renderMuteButton = () => {
    return (
      <div onClick={toggleAudio}>
          { audioOn ? <img className='mic' alt = "Mute" src='/images/pngwing.com.png'/> : <img className='mic-mute' alt = "Unmute" src='/images/mute.png'/>}
        </div>
    )
  }

  const renderHelpButton = () => {
    return (
      <div onClick = {() => {
        var element = document.getElementById("rules");
        element.style.display = "block";
      }}> 
        <img alt = "Help Button" className = 'help-button' src = '/images/help.png' /> 
      </div>
    )
  }

  const renderExitButton = () => {
    return (
      <div onClick = {showExitMessageBox}> 
        <img alt = "Exit Button" className = 'exit-button' src = '/images/exit.png' /> 
      </div>
    )
  }

  const renderMessageBox = () => {
    if (Object.keys(showMessageBox).length !== 0) {
      return (
        <MessageBox 
          msg = {Object.keys(showMessageBox)[0]}
          options = {Object.values(showMessageBox)[0]}
          setShowDiceCallback = {(val) => setShowDice(val)}
        />
      )
    }
  }

  const renderGaveOverBox = () => {
    if (gameOver) {
      return (
        <GameOver audioOn={audioOn} toggleShowMessageBox={toggleShowMessageBox}/>
      )
    }
  }

  const renderVictoryBox = () => {
    if (win) {
      return (
        <Victory audioOn={audioOn} toggleShowMessageBox={toggleShowMessageBox}/>
      )
    }
  }

  const renderScoreBoard = () => {
    return (
      <History audioOn = {audioOn} />
    )
  }

  const renderScoreBoardButton = () => {
    return (
      <div onClick = {() => {
        if (audioOn) {
          commonFunctions.playAudioToggleSound()
        }
        var element = document.getElementById("history");
        element.style.display = "block";
      }}> 
        <img alt = "Score Board Button" className = 'score-board-button' src = '/images/history-icon.png' /> 
      </div>
    )
  }

  /**************** LOGICAL FUNCTIONS ****************/

  const toggleAudio = () =>{
    if(!gameOver){
    commonFunctions.playAudioToggleSound();
    audioOn ? setAudioOn(false) : setAudioOn(true)
    }
  }

  const backButton = () => {}

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
  if(pawnCtx.index === 100) {
    setWin(true);
  }
  /**************** MAIN RETURN FUNCTION ****************/
  return (
    <div>
      {renderRules()}
      {renderScoreBoard()}
      <header id = "header" className="App-header">
        {renderGameHeading()}
        {renderScoreBoardButton()}
        {renderMuteButton()}
        {renderHelpButton()}
        {renderExitButton()}
        {renderMessageBox()}
        <div className = 'dice-n-grid'> 
          {renderGrid()}
          {renderQuestion()}
          {renderGaveOverBox()}
          {renderVictoryBox()}
        </div>
      </header>
    </div>
  );
}

export default App;
