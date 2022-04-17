import './styles/app.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AskQuestionContext from './store/ask-question';
import DiceContext from './store/dice';
import commonFunctions from './CommonFunctions';
import MessageBox from './components/MessageBoxComponent';
import GameOver from './components/GameOver';
import Rules from './components/RulesComponent';
import Victory from './components/Victory';
import History from './components/History';
import Question from "./components/Question";

let numberOfQuestions;
let numberOfChances = 0;
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

const questionCategory = [9, 15, 11, 22, 12, 23]

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
  const [showHistory, setShowHistory] = useState(false);
const [muteButton, setMuteButton] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  async function fetchQuestions(category) {
    await fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=easy&type=multiple&encode=url3986`)
      .then(response => response.json())
        .then(data => {
          const questionArray = data.results.map(function(question) {
            return {
              question: decodeURIComponent(question.question), 
              answer: decodeURIComponent(question.correct_answer),
              options: (decodeURIComponent(question.incorrect_answers)).split(",")
            }
          })
          mainQuestionBag = questionArray;
        })
  }

  useEffect(() => {
    pawnCtx.setNewPawnPosition(1, pawnCtx.index);
    setShowDice(true);
  }, []);
  
  useEffect(() => {
    if (mainQuestionBag.length <= 6) {
      fetchQuestions(questionCategory[0]);
      questionCategory.shift();
    }
  }, [mainQuestionBag.length <= 6 && mainQuestionBag.length != 0]);

  useEffect(() => {
    //const postHistory = () =>{
      if(numberOfChances !== 0){
        fetch(process.env.REACT_APP_UOLO_CODERUSH_API_BASE_URL,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, numberOfChances: numberOfChances})
        }).then(() => {})
      }
  //}
  }, [win]);

  if(pawnCtx.index === 100) {
    setWin(true);
    pawnCtx.index = 0;
    //postHistory();
  }

  const rollDice = () => {
    if(audioOn){
      commonFunctions.playDiceThrowSound();
    }
    numberOfChances = numberOfChances + 1;
    const max = 6, min = 1;
    numberOfQuestions = Math.floor(Math.random() * (max - min + 1) + min);
    askQuestionCtx.askNewQuestion(numberOfQuestions);
    diceCtx.setNewDiceNumber(numberOfQuestions);
    setShowDice(false);
    setMuteButton(false);
  }

  /**************** UI RENDERING FUNCTIONS ****************/

  const renderDice = () => {
    if (showDice) {
      if (diceCtx.number === 7) {
        return (
          <input 
            alt = "N And Dice" 
            className = 'dice-with-letter-n' 
            type = 'image' 
            src = {`${diceArray[diceCtx.number - 1]}`} 
            onClick = {rollDice}
            disabled = {gameOver || win}
          />
        )
      }
      return (
        <input 
          alt = "Dice" 
          className = 'dice' 
          type = 'image' 
          src = {`${diceArray[diceCtx.number - 1]}`} 
          onClick = {rollDice}
          disabled = {gameOver || win}
        />
      );
    }
    return <input alt = "Dice" className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} />;
  }

  const renderGrid = () => {
    return <div className='grid'> <Col wormholes = {wormholes} /> </div>;
  }

  const renderQuestion = () => {
    if (askQuestionCtx.question !== 0) {
      let questionBag = mainQuestionBag.splice(0, 1)
      return (
        <Question 
            question = {questionBag[0].question} 
            options = {questionBag[0].options} 
            answer = {questionBag[0].answer} 
            numberOfQuestion = {numberOfQuestions}
            setDiceCallback = {(val) => setShowDice(val)}
            setGameOver = {(val) => setGameOver(val)}
            audioOn = {audioOn}
            wormholes = {wormholes}
            toggleShowMessageBoxCallback = {(val) => toggleShowMessageBox(val)}
            setMuteButton = {(val) => setMuteButton(val)}
            />
      );
    }
  }

  const renderRules = () => {
    return (
      <div id = 'rules'>
        <Rules 
          name = {name} 
          setNameCallback = {(val) => setName(val)} 
          toggleShowMessageBoxCallback = {(val) => toggleShowMessageBox(val)}
          setFirstTimeCallback = {(val) => setFirstTime(val)}
          firstTime = {firstTime}
          />
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
          { audioOn ? <img className='mic' alt = "Mute" src='/images/unmute.png'/> : <img className='mic-mute' alt = "Unmute" src='/images/mute.png'/>}
        </div>
    )
  }

  const renderHelpButton = () => {
    return (
      <div onClick = {() => {
        if(!gameOver && !win){
          if (audioOn) {
            commonFunctions.playAudioToggleSound()
          }
          var element = document.getElementById("rules");
          element.style.display = "block";
        }
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
        <GameOver audioOn={audioOn} toggleShowMessageBox={toggleShowMessageBox} setShowHistory={setShowHistory}/>
      )
    }
  }

  const renderVictoryBox = () => {
    if (win) {
      return (
        <Victory audioOn={audioOn} toggleShowMessageBox={toggleShowMessageBox} setShowHistory={setShowHistory}/>
      )
    }
  }

  const renderScoreBoard = () => {
    if (showHistory) {
      return (
        <History audioOn = {audioOn} setShowHistoryCallback = {(val) => setShowHistory(val)} />
      )
    }
  }

  const renderScoreBoardButton = () => {
    return (
      <div onClick = {() => {
        if(!gameOver && !win){
          if (audioOn) {
            commonFunctions.playAudioToggleSound()
          }
          setShowHistory(true);
        }
      }}> 
        <img alt = "Score Board Button" className = 'score-board-button' src = '/images/history-icon.png' /> 
      </div>
    )
  }

  /**************** LOGICAL FUNCTIONS ****************/

  const toggleAudio = () =>{
    if(!gameOver && !win && muteButton){
    commonFunctions.playAudioToggleSound();
    audioOn ? setAudioOn(false) : setAudioOn(true)
    }
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
    if(!gameOver && !win){
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
