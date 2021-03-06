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
    },

    playTimeUpSound : () => {
        SoundPlay('/audio/time-up.mp3');
    },

    playPawnMoveSound : () => {
        SoundPlay('/audio/pawn-move.mp3');
    },

    playGoodWormholeSound : () => {
        SoundPlay('/audio/good-wormhole.mp3');
    },

    playBadWormholeSound : () => {
        SoundPlay('/audio/bad-wormhole.mp3')
    },

    playAudioToggleSound : () => {
        SoundPlay('/audio/mouse-click.mp3');
    },

    playGameOverSound : () => {
        SoundPlay('/audio/game-over.mp3');
    },

    playVictorySound : () => {
        SoundPlay('/audio/victory-sound.mp3');
    },

    playGameStartSound : () => {
        SoundPlay('/audio/game-start.mp3');
    }

}

export default commonFunctions;