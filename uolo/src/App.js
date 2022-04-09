import './App.css';
import {useContext, useEffect, useState} from 'react';
import PawnContext from './store/pawn-context';
import Col from "./components/Col";
import AppControllerFunctions from './controller/app-controller';
import Question from './components/Question';

let questionBag = [];
let numberOfQuestions = [];
function App () {
  const pawnCtx = useContext(PawnContext);
  const [askQuestion, setAskQuestion] = useState(0);
  const [showDice, setShowDice] = useState(false);
  
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
  
  const askQuestionHandler = () => {
    return (
      <Question 
        question = {questionBag[askQuestion - 1].question} 
        options = {questionBag[askQuestion - 1].options} 
        answer = {questionBag[askQuestion - 1].answer} 
        numberOfQuestion = {numberOfQuestions}
        questionNumber = {askQuestion}
        setAskQuestionCallBack = {setAskQuestion}
        />
    )
  }

  const rollDice = () => {
    numberOfQuestions = AppControllerFunctions.rollDice();
    setAskQuestion(numberOfQuestions);
    setShowDice(false);
  }

  return (
    <div className="App">
      <header id = "header" className="App-header">
        <Col />
        {showDice ? 
        <button onClick = {() => rollDice()}>ROLL DICE</button> : null}
        {askQuestion != 0 ? askQuestionHandler() : null}
      </header>
    </div>
  );
}

export default App;
