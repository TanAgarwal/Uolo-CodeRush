import './Component.css'
import AskQuestionContext from '../store/ask-question';
import { useContext, useState } from 'react';
import PawnContext from '../store/pawn-context';
import commonFunctions from '../CommonFunctions';

const Question = ({question, options, answer, numberOfQuestion}) => {
    options = options.slice(0, 3);
    options.push(answer);
    options.sort();
    const askQuestionCtx = useContext(AskQuestionContext);
    const pawnCtx = useContext(PawnContext);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    // const [timeElapsed, setTimeElapsed] = useState(5000);

    const answerClick = (selectedOption) => {
        if (selectedOption === answer) {
            commonFunctions.playCorrectAnswerSound();
            setCorrectAnswer(correctAnswer + 1);
        } else {
            commonFunctions.playWrongAnswerSound();
        }
        if (askQuestionCtx.question - 1 == 0) {
            if (pawnCtx.index + correctAnswer <= 100) {
                pawnCtx.setNewPawnPosition(pawnCtx.index + correctAnswer);
                setCorrectAnswer(0);
                // TODO: check for wormholes
            } else {
                // TODO: Show Message that you can't move these many turns
            }
        }
        // setTimeElapsed(5000);
        askQuestionCtx.askNewQuestion(askQuestionCtx.question - 1);
    }
    // console.log(timeElapsed);
    // if (timeElapsed >= 0) {
    //     setInterval(() => {
    //         setTimeElapsed(timeElapsed - 1000);
    //     }, 1000);
    // }

    return (
        <div className='app'>
            {/* <div className='timer-text'>{timeElapsed / 1000}</div> */}
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {askQuestionCtx.question}</span>/{numberOfQuestion}
                </div>
                <div className='question-text'>{question}</div>
            </div>
            
            <div className='answer-section'>
                {options.map((answerOption, index) => (
                    <button onClick = {() => answerClick(answerOption)}>{answerOption}</button>
                ))}
            </div>
        </div>
    )
}

export default Question;