import './cell.css';

const Cell = ({index, wormholes}) => {
    if (index in wormholes) {
        if (wormholes[index] < index) {
            return (
                <div id = {index} className = 'cell'>
                    <div className='rotate'><img src="images/bad-wormhole.jpeg" width="70" height="70" /></div>
                </div>
            )
        } else {
            return (
                <div id = {index} className = 'cell'>
                    <div className='rotate'><img src="images/good-wormhole.jpeg" width="70" height="70" /></div>
                </div>
            )
        }
    } else {
        return (
            <div id = {index} className = 'cell' > {index} </div>
        )
    }
}

export default Cell;