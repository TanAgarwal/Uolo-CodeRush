import Row from "./Row";

const createCol = (i, isOdd) => {
    return (
        <Row index = {i} isOdd = {isOdd} />
    )
}

const Col = () => {
    let colArray = [];
    let isOdd = true;
    for (let i = 1; i <= 100; i += 10) {
        colArray.push(createCol(i, isOdd));
        isOdd = !isOdd;
    }
    return (
        <div>
            {colArray}
        </div>
    )
}

export default Col;