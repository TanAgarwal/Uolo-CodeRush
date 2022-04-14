const createOptions = (value, key, setShowDiceCallback) => {
    return (
        <button key = {key} className = 'messageBoxOptions' onClick={
            () => {
                value();
                setShowDiceCallback(true);
            }}> {key} </button>
    )
}

const renderOptions = (option, setShowDiceCallback) => {
    let options = [];
    for (const [key, value] of Object.entries(option)) {
        options.push(createOptions(value, key, setShowDiceCallback));
    }
    return options;
}

const MessageBox = ({msg, options, setShowDiceCallback}) => {
    setShowDiceCallback(false);
    return (
        <div className="messageBox">
            <div className="messageBoxText">{msg}</div>
                <div className="messageBoxOptionsDiv">
                    {renderOptions(options, setShowDiceCallback)}
                </div>
        </div>
    );
}

export default MessageBox;