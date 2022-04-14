import './cell.css';

const Cell = ({index, wormholes}) => {
    if (index in wormholes) {
        if (wormholes[index] < index) {
            return (
                <div id = {index} className = 'cell'>
                    <div className='rotate'><img alt = "Bad Wormhole" className = 'wormhole' src="images/bad-wormhole.jpeg" /></div>
                </div>
            )
        } else {
            return (
                <div id = {index} className = 'cell'>
                    <div className='rotate'><img alt = "Good Wormhole" className = 'wormhole' src="images/good-wormhole.jpeg" /></div>
                </div>
            )
        }
    } else if (index === 100) {
        return (
            <div id = {index} className = 'finish' />
        )
    } 
    else {
        return (
            <div id = {index} className = 'cell' > {index} </div>
        )
    }
}

export default Cell;