import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PawnContextProvider} from './store/pawn-context';
import {AskQuestionContextProvider} from './store/ask-question';
import {DiceContextProvider} from './store/dice';
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <DiceContextProvider>
    <PawnContextProvider>
      <AskQuestionContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </AskQuestionContextProvider>    
    </PawnContextProvider>
  </DiceContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
