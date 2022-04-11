import { useSpeechSynthesis } from 'react-speech-kit';
import { useEffect} from 'react';

function TextToSpeech({question}) {
  const {speak} = useSpeechSynthesis();

  useEffect(() => {
    speak({text:question})
  }, [question])

}

export default TextToSpeech;
