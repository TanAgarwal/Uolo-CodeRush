import {Howl, Howler} from 'howler';
import correctAnswerSound from './static/audio/correct-answer.mp3'
import wrongAnswerSound from './static/audio/wrong-answer.mp3'

const SoundPlay = src => {
    const sound = new Howl({src});
    sound.play();
}

Howler.volume(1.0);

const commonFunctions = {
    playCorrectAnswerSound : () => {
        SoundPlay(correctAnswerSound);
    },
    
    playWrongAnswerSound : () => {
        SoundPlay(wrongAnswerSound);
    }
}

export default commonFunctions;