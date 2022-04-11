import {Howl, Howler} from 'howler';

const SoundPlay = src => {
    const sound = new Howl({src});
    sound.play();
}

Howler.volume(1.0);

const commonFunctions = {
    playCorrectAnswerSound : () => {
        SoundPlay('/audio/correct-answer.mp3');
    },
    
    playWrongAnswerSound : () => {
        SoundPlay('/audio/wrong-answer.mp3');
    },

    playDiceThrowSound : () => {
        SoundPlay('/audio/dice-throw.mp3');
    }
}

export default commonFunctions;