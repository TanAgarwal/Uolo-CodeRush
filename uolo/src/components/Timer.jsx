import { useState, useEffect } from "react";
import commonFunctions from '../CommonFunctions';

const Timer = ({setNextQuestion, selectedAnswer, question, audioOn}) => {
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if(timer === 0)
        {
            if(audioOn && (selectedAnswer === null)){
            console.log("came");
            commonFunctions.playTimeUpSound();
            }
            return setNextQuestion(true);
        }
        const interval = setInterval(()=>{
            setTimer((prev) => prev-1);
        }, 1000);
        return () => clearInterval(interval);
    }, [setNextQuestion, timer, selectedAnswer]);

    useEffect(() => {
        setTimer(10)
    }, [question]);

    return timer;

}
export default Timer;