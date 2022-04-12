import Cell from "./Cell"
import './Component.css';

const createRow = (index, wormholes) => {
    return (
        <Cell key = {`cell-${index}`} index = {index} wormholes = {wormholes} />    
    )
}

const Row = ({index, isOdd, wormholes}) => {
    let rowArray = [];
    if (isOdd) {
        for (let i = 1; i <= 10; i++) {
            rowArray.push(createRow(index, wormholes));
            index++;
        }
    } else {
        index += 9;
        for (let i = 10; i >= 1; i--) {
            rowArray.push(createRow(index, wormholes));
            index--;
        }
    }
    return (
        <div className="row">
            {rowArray}
        </div>
    )
}

export default Row;