import './App.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AppControllerFunctions from './controller/app-controller';
import AskQuestionContext from './store/ask-question';
import DiceContext from './store/dice';

let questionBag = [];
function App () {
  const pawnCtx = useContext(PawnContext);
  const askQuestionCtx = useContext(AskQuestionContext);
  const diceCtx = useContext(DiceContext);
  const [showDice, setShowDice] = useState(true);
  const diceArray = [
    './static/images/dice/1.jpg', 
    './static/images/dice/2.jpg',
    './static/images/dice/3.jpg', 
    './static/images/dice/4.jpg', 
    './static/images/dice/5.jpg',
    './static/images/dice/6.jpg'
  ];

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

  return (
    <div className="App">
      <header id = "header" className="App-header">
        <div className = 'dice-n-grid'>
        {showDice ? 
          <input type = 'image' src = {`url(${diceArray[diceCtx.number - 1]})`} 
          onClick = {() => AppControllerFunctions.rollDice(
            (val) => askQuestionCtx.askNewQuestion(val), 
            (val) => setShowDice(val),
            (val) => diceCtx.setNewDiceNumber(val))} />: 
            <button> <img src = {`"url(${diceArray[diceCtx.number - 1]})"`} /> </button>}
          <Col />
        </div>
        {askQuestionCtx.question != 0 ? AppControllerFunctions.askQuestionHandler(
          questionBag, 
          askQuestionCtx.question,
          (val) => setShowDice(val)) : null}
      </header>
    </div>
  );
}

export default App;
