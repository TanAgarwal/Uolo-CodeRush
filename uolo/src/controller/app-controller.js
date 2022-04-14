import Question from "../components/Question";
import commonFunctions from '../CommonFunctions';

let numberOfQuestions;
let numberOfChances = 0;
const AppControllerFunctions = {
    askQuestionHandler : (questionBag, setDiceCallback, setGameOver, audioOn, wormholes) => {
        return (
          <Question 
            question = {questionBag[0].question} 
            options = {questionBag[0].options} 
            answer = {questionBag[0].answer} 
            numberOfQuestion = {numberOfQuestions}
            setDiceCallback = {(val) => setDiceCallback(val)}
            setGameOver = {(val) => setGameOver(val)}
            audioOn = {audioOn}
            wormholes = {wormholes}
            numberOfChances = {numberOfChances}
            />
        )
      },
    
      rollDice : (setAskQuestionCallBack, setShowDice, setNewDiceNumberCallback, audioOn) => {
        if(audioOn){
          commonFunctions.playDiceThrowSound();
        }
        numberOfChances = numberOfChances + 1;
        const max = 6, min = 1;
        numberOfQuestions = Math.floor(Math.random() * (max - min + 1) + min);
        setAskQuestionCallBack(numberOfQuestions);
        setNewDiceNumberCallback(numberOfQuestions);
        setShowDice(false);
      }
}

export default AppControllerFunctions;