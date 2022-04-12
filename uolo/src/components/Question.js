import './question.css'
import AskQuestionContext from '../store/ask-question';
import { useContext, useEffect, useState } from 'react';
import PawnContext from '../store/pawn-context';
import commonFunctions from '../CommonFunctions';
import { useSpeechSynthesis } from 'react-speech-kit';
import TextToSpeech from './TextToSpeech';
import Timer from './Timer';

let correctAnswer = 0;
const Question = ({question, options, answer, numberOfQuestion, setDiceCallback, wormholes}) => {
    options = options.slice(0, 3);
    options.push(answer);
    options.sort();
    const askQuestionCtx = useContext(AskQuestionContext);
    const pawnCtx = useContext(PawnContext);
    const [styleButton, setStyleButton] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [nextQuestion, setNextQuestion] = useState(false);
    const {speak} = useSpeechSynthesis();
    console.log(wormholes);
    useEffect(() => {
        if(nextQuestion){
            console.log('called');
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
                    } else {
                        // TODO: Show Message that you can't move these many turns
                    }
                }
                askQuestionCtx.askNewQuestion(askQuestionCtx.question - 1);
            },2000);
        setNextQuestion(false);
    }}, [nextQuestion]);

    const answerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        if (selectedOption === answer) {
           commonFunctions.playCorrectAnswerSound();
           setStyleButton('game-button green');
           correctAnswer += 1;
           setNextQuestion(true);
        } else {
            commonFunctions.playWrongAnswerSound();
            setStyleButton('game-button red');
            setNextQuestion(true);
        }
    }

    return (
        <div className='app'>
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {askQuestionCtx.question}</span>/{numberOfQuestion}
                </div>
                <div className='timer'> <Timer setNextQuestion={setNextQuestion} question={question} /> </div>
            <TextToSpeech question={question}/>
                <div className='question-text'>{question}</div>
            </div>
            <div className='answer-section'>
                {options.map((answerOption, index) => (
                    <button key={index} className={selectedAnswer === answerOption ? styleButton : 'game-button'} onClick = {() => answerClick(answerOption)}>{answerOption}</button>
                ))}
            </div>
            {/* <div>{handleSpeech(question)}</div> */}
        </div>
    )
}

export default Question;