import { useState, useEffect, useContext } from "react";
import commonFunctions from '../CommonFunctions';
import AskQuestionContext from '../store/ask-question';

const Timer = ({setNextQuestion, answerClicked, question, audioOn}) => {
    const [timer, setTimer] = useState(10);
    const askQuestionCtx = useContext(AskQuestionContext);

    useEffect(() => {
        if(timer === 0) {
            if(audioOn && (!answerClicked)){
                console.log("came");
                commonFunctions.playTimeUpSound();
                return setNextQuestion(true);
            }
            // if(askQuestionCtx.question - 1 > 0){
            //     console.log("coming here");
                
            //}
        }
        let interval;
        if (timer > 0) {
            interval = setInterval(()=>{
                setTimer((prev) => prev-1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [setNextQuestion, timer]);

    useEffect(() => {
        setTimer(10)
    }, [question]);

    return timer;

}
export default Timer;