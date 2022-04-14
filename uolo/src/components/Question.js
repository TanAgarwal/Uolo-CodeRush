import './question.css'
import AskQuestionContext from '../store/ask-question';
import { useContext, useEffect, useState } from 'react';
import PawnContext from '../store/pawn-context';
import commonFunctions from '../CommonFunctions';
import TextToSpeech from './TextToSpeech';
import Timer from './Timer';

let correctAnswer = 0;
let currentQuestion = 1;
let numberOfRetries = 0;
const Question = ({question, options, answer, numberOfQuestion, setDiceCallback, setGameOver, audioOn, wormholes, numberOfChances, toggleShowMessageBoxCallback, name}) => {
    options = options.slice(0, 3);
    options.push(answer);
    options.sort();
    const askQuestionCtx = useContext(AskQuestionContext);
    const pawnCtx = useContext(PawnContext);
    const [styleButton, setStyleButton] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [nextQuestion, setNextQuestion] = useState(false);
    const [buttondisabled, setButtonDisabled] = useState(false);
    const [answerClicked, setAnswerClicked] = useState(false);
    const [answerSelected, setAnswerSelected] = useState(false);
    console.log(answerClicked);

    useEffect(() => {
        if(nextQuestion){
            setButtonDisabled(true);
            setTimeout(()=>{
                setButtonDisabled(false);
                if (askQuestionCtx.question - 1 == 0) {
                    if(correctAnswer === 0) {
                        numberOfRetries += 1;
                        console.log(numberOfRetries)
                        if (numberOfRetries < 3) {
                            toggleShowMessageBoxCallback({
                                "You have not given any correct answer!" : {
                                  "OKAY" : () => toggleShowMessageBoxCallback({})
                                }
                              });
                        }
                        if(numberOfRetries === 3){
                            setGameOver(true);
                        }
                    }
                    if (pawnCtx.index + correctAnswer <= 100) {
                        let newPosition = pawnCtx.index + correctAnswer;
                        if ((pawnCtx.index + correctAnswer) in wormholes) {
                            if (wormholes[pawnCtx.index + correctAnswer] > pawnCtx.index + correctAnswer) {
                                commonFunctions.playGoodWormholeSound();
                                newPosition = wormholes[pawnCtx.index + correctAnswer];
                            } else {
                                commonFunctions.playBadWormholeSound();
                                newPosition = wormholes[pawnCtx.index + correctAnswer];
                            }
                        }
                        pawnCtx.setNewPawnPosition(pawnCtx.index, newPosition);
                        correctAnswer = 0;
                    } else {
                        // TODO: Show Message that you can't move these many turns
                    }
                    currentQuestion = 0;
                    setDiceCallback(true);
                }
                setAnswerClicked(false);
                setAnswerSelected(false);
                console.log(currentQuestion);
                console.log("here:");
                askQuestionCtx.askNewQuestion(askQuestionCtx.question - 1)
                currentQuestion += 1;
            },2000);
        setNextQuestion(false);
    }}, [nextQuestion]);

    const answerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        setNextQuestion(true);
        if (selectedOption === answer) {
            if(audioOn){
                commonFunctions.playCorrectAnswerSound();
            }
           setStyleButton('game-button green');
           correctAnswer += 1;
        } else {
            if(audioOn){
                commonFunctions.playWrongAnswerSound();
            }
            setStyleButton('game-button red');
        }
        setAnswerClicked(true)
        setTimeout(() => {
            setAnswerSelected(true);
        },500)
    }

    return (
        <div className='app'>
            <div className='question-section'>
                <div className='question-count'>
                    <div className='question-number'>
                        <span>Question {currentQuestion}</span>/{numberOfQuestion}
                    </div>
                    <div className='timer'> <Timer setNextQuestion={setNextQuestion} answerClicked={answerClicked} question={question} audioOn={audioOn}/> </div>
                </div>
                <div className='question-text'>{question}</div>
            </div>
            <div className='answer-section'>
                {options.map((answerOption, index) => (
                    <button key={index} disabled={buttondisabled} className={selectedAnswer === answerOption ? styleButton : answerSelected ? answerOption === answer ? 'game-button green' : 'game-button' : 'game-button'} onClick = {() => answerClick(answerOption)}>{answerOption}</button>
                ))}
            </div>
            { audioOn ? <TextToSpeech question={question}/> : null}
            {/* <SpeakToAnswer answerClick={answerClick}/> */}
        </div>
    );
}

export default Question;