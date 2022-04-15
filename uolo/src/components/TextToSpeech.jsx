import { useSpeechSynthesis } from 'react-speech-kit';
import { useEffect } from 'react';

const TextToSpeech = ({question}) => {
    const {speak} =  useSpeechSynthesis();
  useEffect(() => {
      console.log(question);
      speak({text:question});
  },[question])
  
}

export default TextToSpeech;
