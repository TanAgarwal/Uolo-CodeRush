import Question from "../components/Question";
import commonFunctions from '../CommonFunctions';

let numberOfQuestions;
const AppControllerFunctions = {
<<<<<<< Updated upstream
    askQuestionHandler : (questionBag, askQuestion, setDiceCallback, setGameOver, audioOn, wormholes, isOver50Callback) => {
=======
    askQuestionHandler : (questionBag, askQuestion, setDiceCallback, setGameOver, audioOn, wormholes) => {
>>>>>>> Stashed changes
        return (
          <Question 
            question = {questionBag[askQuestion - 1].question} 
            options = {questionBag[askQuestion - 1].options} 
            answer = {questionBag[askQuestion - 1].answer} 
            numberOfQuestion = {numberOfQuestions}
            setDiceCallback = {(val) => setDiceCallback(val)}
            setGameOver = {(val) => setGameOver(val)}
            audioOn = {audioOn}
            wormholes = {wormholes}
            isOver50Callback = {isOver50Callback}
            />
        )
      },
    
      rollDice : (setAskQuestionCallBack, setShowDice, setNewDiceNumberCallback, audioOn) => {
        if(audioOn){
          commonFunctions.playDiceThrowSound();
        }
        const max = 6, min = 1;
        numberOfQuestions = Math.floor(Math.random() * (max - min + 1) + min);
        setAskQuestionCallBack(numberOfQuestions);
        setNewDiceNumberCallback(numberOfQuestions);
        setShowDice(false);
      }
}

export default AppControllerFunctions;