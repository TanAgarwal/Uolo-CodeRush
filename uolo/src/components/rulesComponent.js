import './rules.css';

const Rules = () => {

    const handlePlayButton = () => {
        var element = document.getElementById("rules");
        element.style.display = "none";
    }

    return (
        <div className='rules-container'>
            <div className = 'rules'>
                <div className='swingimageRules'><div className='rainbowTextRules'>GK 'N' LUCK GUIDE</div></div>
                <ul className='rules-text'>
                    <li>Click on 'N' in the top header to start the game.</li>
                    <li>Number of question will be equal to the number that came on dice.</li>
                    <li>Number of steps pawn takes will be equal to number of correct answers.</li>
                    <li>Failing to answer even a single question in three consecutive dice throws will lead to Game Over.</li>
                    <li>For each question, you will be given 10 seconds to answer, failing to answer in time will be considered as wrong answer.</li>
                    <li>Entering the wormhole will take you to different step of the game.</li>
                </ul>
            </div>
            <button className='play-button' onClick={handlePlayButton}>PLAY</button>
        </div>
    )
}

export default Rules;