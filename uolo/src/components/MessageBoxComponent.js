const createOptions = (value, key) => {
    return (
        <button key = {key} className = 'messageBoxOptions' onClick={value}> {key} </button>
    )
}

const renderOptions = (option) => {
    let options = [];
    for (const [key, value] of Object.entries(option)) {
        options.push(createOptions(value, key));
    }
    return options;
}

const MessageBox = ({msg, options}) => {
    return (
        <div className="messageBox">
            <div className="messageBoxText">{msg}</div>
                <div className="messageBoxOptionsDiv">
                    {renderOptions(options)}
                </div>
        </div>
    );
}

export default MessageBox;