import {createContext, useState} from 'react';
 
const AskQuestionContext = createContext({ 
    question: 0,
    askQuestion: (index) => {}
}); 

export const AskQuestionContextProvider = props => {
    const [question, askQuestion] = useState(0);
    
    const askNewQuestion = (index) => {
        console.log("I M IN CONTEXT!");
        askQuestion(index);
    }
    
    const context = {
        question,
        askNewQuestion
    };
    
    return <AskQuestionContext.Provider value = {context}>
        {props.children}
    </AskQuestionContext.Provider>
}

export default AskQuestionContext;