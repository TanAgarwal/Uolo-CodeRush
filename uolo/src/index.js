import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PawnContextProvider} from './store/pawn-context';
import {AskQuestionContextProvider} from './store/ask-question';
import {DiceContextProvider} from './store/dice';

ReactDOM.render(
  <DiceContextProvider>
    <PawnContextProvider>
      <AskQuestionContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </AskQuestionContextProvider>    
    </PawnContextProvider>
  </DiceContextProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
