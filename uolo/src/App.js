import './App.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AppControllerFunctions from './controller/app-controller';
import AskQuestionContext from './store/ask-question';
import DiceContext from './store/dice';

let questionBag = [];
const diceArray = [
  '/images/dice/1.jpg', 
  '/images/dice/2.jpg',
  '/images/dice/3.jpg', 
  '/images/dice/4.jpg', 
  '/images/dice/5.jpg',
  '/images/dice/6.jpg'
];

function App () {
  const pawnCtx = useContext(PawnContext);
  const askQuestionCtx = useContext(AskQuestionContext);
  const diceCtx = useContext(DiceContext);
  const [showDice, setShowDice] = useState(true);

  useEffect(() => {
    pawnCtx.setNewPawnPosition(pawnCtx.index);
    fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple')
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
          questionBag = questionArray;
        })
        setShowDice(true);
  }, []);

  /**************** UI RENDERING FUNCTIONS ****************/

  const renderDice = () => {
    if (showDice) {
      return (
        <input className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} 
          onClick = {() => AppControllerFunctions.rollDice(
            (val) => askQuestionCtx.askNewQuestion(val), 
            (val) => setShowDice(val),
            (val) => diceCtx.setNewDiceNumber(val))} />
      );
    }
    return <input className = 'dice' type = 'image' src = {`${diceArray[diceCtx.number - 1]}`} />;
  }

  const renderGrid = () => {
    return <div className='grid'> <Col /> </div>;
  }

  const renderQuestion = () => {
    if (askQuestionCtx.question != 0) {
      return (
        AppControllerFunctions.askQuestionHandler(
          questionBag, 
          askQuestionCtx.question,
          (val) => setShowDice(val))
      );
    }
  }

  /**************** MAIN RETURN FUNCTION ****************/
  return (
      <header id = "header" className="App-header">
        <div className='swingimage'>GK 'n' LUCK</div>
        <div className = 'dice-n-grid'>
          {renderDice()}
          {renderGrid()}
        </div>
          {renderQuestion()}
      </header>
  );
}

export default App;
