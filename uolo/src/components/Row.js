import Cell from "./Cell"
import './Component.css';

const createRow = (index) => {
    return (
        <Cell index = {index} />    
    )
}

const Row = ({index, isOdd}) => {
    let rowArray = [];
    if (isOdd) {
        for (let i = 1; i <= 10; i++) {
            rowArray.push(createRow(index));
            index++;
        }
    } else {
        index += 9;
        for (let i = 10; i >= 1; i--) {
            rowArray.push(createRow(index));
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