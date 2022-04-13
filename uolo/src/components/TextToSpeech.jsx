import { useSpeechSynthesis } from 'react-speech-kit';
import { useEffect } from 'react';

const TextToSpeech = ({question}) => {
  const {speak} = useSpeechSynthesis();

  async function speakQuestion()
  {
      await speak({text:question});
  }
  
  useEffect(() => {
      console.log(question);
      speakQuestion();
  }, [question]);

}

export default TextToSpeech;
