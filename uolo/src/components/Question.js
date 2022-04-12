import './question.css'
import AskQuestionContext from '../store/ask-question';
import { useContext, useEffect, useState } from 'react';
import PawnContext from '../store/pawn-context';
import commonFunctions from '../CommonFunctions';
import TextToSpeech from './TextToSpeech';
import Timer from './Timer';

let correctAnswer = 0;
let currentQuestion = 1;
const Question = ({question, options, answer, numberOfQuestion, setDiceCallback, audioOn, wormholes}) => {
    options = options.slice(0, 3);
    options.push(answer);
    options.sort();
    const askQuestionCtx = useContext(AskQuestionContext);
    const pawnCtx = useContext(PawnContext);
    const [styleButton, setStyleButton] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [nextQuestion, setNextQuestion] = useState(false);
    
    useEffect(() => {
        if(nextQuestion){
            setTimeout(()=>{
                if (askQuestionCtx.question - 1 == 0) {
                    if (pawnCtx.index + correctAnswer <= 100) {
                        pawnCtx.setNewPawnPosition(pawnCtx.index + correctAnswer);
                        if ((pawnCtx.index + correctAnswer) in wormholes) {
                            if (wormholes[pawnCtx.index + correctAnswer] > pawnCtx) {
                                commonFunctions.playGoodWormholeSound();
                            } else {
                                commonFunctions.playBadWormholeSound();
                            }
                            pawnCtx.setNewPawnPosition(wormholes[pawnCtx.index + correctAnswer]);
                        }
                        correctAnswer = 0;
                        currentQuestion = 1;
                    } else {
                        // TODO: Show Message that you can't move these many turns
                    }
                    setDiceCallback(true);
                }
                currentQuestion += 1;
                askQuestionCtx.askNewQuestion(askQuestionCtx.question - 1);
            },2000);
        setNextQuestion(false);
    }}, [nextQuestion]);

    const answerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        if (selectedOption === answer) {
            if(audioOn){
           commonFunctions.playCorrectAnswerSound();
            }
           setStyleButton('game-button green');
           correctAnswer += 1;
           setNextQuestion(true);
        } else {
            if(audioOn){
            commonFunctions.playWrongAnswerSound();
            }
            setStyleButton('game-button red');
            setNextQuestion(true);
        }
    }

    return (
        <div className='app'>
            <div className='question-section'>
                <div className='question-count'>
                    <div className='question-number'>
                        <span>Question {currentQuestion}</span>/{numberOfQuestion}
                    </div>
                    <div className='timer'> <Timer setNextQuestion={setNextQuestion} question={question} audioOn={audioOn}/> </div>
                </div>
                <div className='question-text'>{question}</div>
            </div>
            <div className='answer-section'>
                {options.map((answerOption, index) => (
                    <button key={index} className={selectedAnswer === answerOption ? styleButton : 'game-button'} onClick = {() => answerClick(answerOption)}>{answerOption}</button>
                ))}
            </div>
            { audioOn ? <TextToSpeech question={question}/> : null}
        </div>
    );
}

export default Question;