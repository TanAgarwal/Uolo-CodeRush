import './rules.css';
import commonFunctions from '../CommonFunctions';

const Rules = ({name, setNameCallback, toggleShowMessageBoxCallback}) => {
    const handlePlayButton = () => {
        commonFunctions.playAudioToggleSound();
        if (name !== '') {
            var element = document.getElementById("rules");
            element.style.display = 'none';
        } else {
            document.getElementById("rules-play-button").disabled = true;
            toggleShowMessageBoxCallback({
                "Please Enter Your Name": {
                    "OKAY": () => {
                        document.getElementById("rules-play-button").disabled = false;
                        commonFunctions.playAudioToggleSound();
                        toggleShowMessageBoxCallback({})
                    }
                }    
            })
        }
    }

    return (
        <div className='rules-container'>
            <div className = 'rules'>
                <input type="text" id="fname" name="fname" className='name-input' placeholder='Enter you name ...'
                    value={name} 
                    onChange={evt => setNameCallback(evt.target.value)}
                />
                <div className='heading'>HOW TO PLAY</div>
                <ul className='rules-text'>
                    <li>Click on <img alt = "N" className = 'rules-img' src = '/images/dice/n.png'/> in the top header to start the game.</li>
                    <li>Number of question will be equal to the number that came on dice.</li>
                    <li>Number of steps pawn takes will be equal to number of correct answers.</li>
                    <li>There will be different types of pawn depending on the stage you are on</li>
                        <ul>
                            <li><img alt = "You are a toddler" className = 'rules-img' src = '/images/pawn/pawn-right.png'/> If you are between 1 to 20</li>
                            <li><img alt = "You are a young boy" className = 'rules-img' src = '/images/pawn/pawn1-right.png'/>If you are between 21 to 40</li> 
                            <li><img alt = "You are a grown up boy" className = 'rules-img' src = '/images/pawn/pawn2-right.png'/>If you are between 41 to 60</li> 
                            <li><img alt = "You are a young man" className = 'rules-img' src = '/images/pawn/pawn3-right.png'/>If you are between 61 to 80</li> 
                            <li><img alt = "You are a grown up man" className = 'rules-img' src = '/images/pawn/pawn4-right.png'/>If you are between 81 to 90</li>   
                        </ul>
                    <li>Failing to answer even a single question in three consecutive dice throws will lead to Game Over.</li>
                    <li>For each question, you will be given 10 seconds to answer, failing to answer in time will be considered as wrong answer.</li>
                    <li>Entering the <img alt = "Good Wormhole" className = 'rules-img rotate-rules-img' src = '/images/good-wormhole.jpeg' /> will take you to forwards in the game.</li>
                    <li>Entering the <img alt = "Bad Wormhole" className = 'rules-img rotate-rules-img' src = '/images/bad-wormhole.jpeg' /> will take you to behind in the game.</li>
                    <li>Your goal is to reach <img alt = "Finish Gif" className = 'rules-img' src = '/images/finish.gif' /></li>
                </ul>
            </div>
            <button id = 'rules-play-button' className='play-button' onClick={handlePlayButton}>PLAY</button>
        </div>
    )
}

export default Rules;