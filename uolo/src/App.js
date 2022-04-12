import './App.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AppControllerFunctions from './controller/app-controller';
import AskQuestionContext from './store/ask-question';
import DiceContext from './store/dice';
import commonFunctions from './CommonFunctions';
<<<<<<< Updated upstream
import MessageBox from './components/MessageBoxComponent';
=======
>>>>>>> Stashed changes
import GameOver from './components/GameOver';

let questionBag = [];
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
<<<<<<< Updated upstream
  const [showMessageBox, toggleShowMessageBox] = useState({});
  const [over50, isOver50] = useState(false);
=======
>>>>>>> Stashed changes
  const [gameOver, setGameOver] = useState(false);

  async function fetchQuestions(category) {
    await fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=easy&type=multiple`)
      .then(response => response.json())
        .then(data => {
          const questionArray = data.results.map(function(question) {
            if (!question.question.includes(';')) {
              return {
                question: question.question, 
                answer: question.correct_answer,
                status: 1,
                options: question.incorrect_answers
              }
            }
          })
          questionBag = questionArray;
        })
      setShowDice(true);
  }

  useEffect(() => {
    pawnCtx.setNewPawnPosition(pawnCtx.index); 
    fetchQuestions(9)
  }, []);

  if (over50) {
    fetchQuestions(questionCategory[0]);
    questionCategory.shift();
  }

  /**************** UI RENDERING FUNCTIONS ****************/

  const renderDice = () => {
    if (showDice) {
      if (diceCtx.number == 7) {
        return (
          <input className = 'dice-with-letter-n' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
            onClick = {() => AppControllerFunctions.rollDice(
              (val) => askQuestionCtx.askNewQuestion(val), 
              (val) => setShowDice(val),
              (val) => diceCtx.setNewDiceNumber(val),
              audioOn)} />
        )
      }
      return (
        <input className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
          onClick = {() => AppControllerFunctions.rollDice(
            (val) => askQuestionCtx.askNewQuestion(val), 
            (val) => setShowDice(val),
            (val) => diceCtx.setNewDiceNumber(val),
            audioOn)} />
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
          questionBag, 
          askQuestionCtx.question,
          (val) => setShowDice(val),
          (val) => setGameOver(val),
          audioOn,
          wormholes,
          (val) => isOver50(val)
          )
      );
    }
  }

  const toggleAudio = () =>{
    commonFunctions.playAudioToggleSound();
    audioOn ? setAudioOn(false) : setAudioOn(true)
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
    window.open("about:blank", "_self");
    window.close();
  }

  const showExitMessageBox = () => {
    toggleShowMessageBox({
      "Are you really want to exit?" : {
        "YES" : exit,
        "NO" : () => toggleShowMessageBox({})
      }
    });
  }

  /**************** MAIN RETURN FUNCTION ****************/
  return (
      <header id = "header" className="App-header">
        <div className='swingimage'>
          <div className='rainbowText'>GK</div> <div>{renderDice()}</div><div className='rainbowText'> LUCK</div>
        </div>
        <div className='mic' onClick={toggleAudio}>
          { audioOn ? <img src='/images/speaker.png'/> : <img src='/images/mute.png'/>}
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
        </div>
        { gameOver ? <GameOver audioOn={audioOn} /> : null}
      </header>
  );
}

export default App;
