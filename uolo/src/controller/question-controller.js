import commonFunctions from "../CommonFunctions";

const answerClick = (selectedOption, answer, ) => {
    if (selectedOption === answer) {
        commonFunctions.playCorrectAnswerSound();
        correctAnswer++;
    } else {
        commonFunctions.playWrongAnswerSound();
    }
    if (askQuestionCtx.question - 1 == 0) {
        if (pawnCtx.index + correctAnswer <= 100) {
            pawnCtx.setNewPawnPosition(pawnCtx.index + correctAnswer);
            // TODO: check for wormholes
        } else {
            // TODO: Show Message that you can't move these many turns
        }
        correctAnswer = 0;
        setDice(true);
    }
    // setTimeElapsed(5000);
    askQuestionCtx.askNewQuestion(askQuestionCtx.question - 1);
}

export default answerClick;