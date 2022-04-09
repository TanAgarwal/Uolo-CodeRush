import './Component.css'

const Question = ({question, options, answer, numberOfQuestion, questionNumber, setAskQuestionCallBack}) => {
    options = options.slice(0, 3);
    options.push(answer);
    options.sort();

    const answerClick = (selectedOption) => {
        if (selectedOption === answer) {
        } else {

        }
        setAskQuestionCallBack(questionNumber - 1);
    }

    return (
        <div className='app'>
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {questionNumber}</span>/{numberOfQuestion}
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