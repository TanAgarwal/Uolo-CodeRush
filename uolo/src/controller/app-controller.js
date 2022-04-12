import Question from "../components/Question";
import commonFunctions from '../CommonFunctions';

let numberOfQuestions;
const AppControllerFunctions = {
    askQuestionHandler : (questionBag, askQuestion, setDiceCallback, wormholes) => {
        return (
          <Question 
            question = {questionBag[askQuestion - 1].question} 
            options = {questionBag[askQuestion - 1].options} 
            answer = {questionBag[askQuestion - 1].answer} 
            numberOfQuestion = {numberOfQuestions}
            setDice = {(val) => setDiceCallback(val)}
            wormholes = {wormholes}
            />
        )
      },
    
      rollDice : (setAskQuestionCallBack, setShowDice, setNewDiceNumberCallback) => {
        commonFunctions.playDiceThrowSound();
        const max = 6, min = 1;
        numberOfQuestions = Math.floor(Math.random() * (max - min + 1) + min);
        setAskQuestionCallBack(numberOfQuestions);
        setNewDiceNumberCallback(numberOfQuestions);
        setShowDice(false);
      }
}

export default AppControllerFunctions;