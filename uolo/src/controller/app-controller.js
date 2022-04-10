import Question from "../components/Question";

let numberOfQuestions;
const AppControllerFunctions = {
    askQuestionHandler : (questionBag, askQuestion, setDiceCallback) => {
        return (
          <Question 
            question = {questionBag[askQuestion - 1].question} 
            options = {questionBag[askQuestion - 1].options} 
            answer = {questionBag[askQuestion - 1].answer} 
            numberOfQuestion = {numberOfQuestions}

            />
        )
      },
    
      rollDice : (setAskQuestionCallBack, setShowDice, setNewDiceNumberCallback) => {
        const max = 6, min = 1;
        numberOfQuestions = Math.floor(Math.random() * (max - min + 1) + min);
        setAskQuestionCallBack(numberOfQuestions);
        setNewDiceNumberCallback(numberOfQuestions);
        setShowDice(false);
      }
}

export default AppControllerFunctions;