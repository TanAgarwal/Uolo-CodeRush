import Row from "./Row";

const createCol = (i, isOdd, wormholes) => {
    return (
        <Row key = {`row-${i}`} index = {i} isOdd = {isOdd} wormholes = {wormholes} />
    )
}

const Col = ({wormholes}) => {
    let colArray = [];
    let isOdd = true;
    for (let i = 1; i <= 100; i += 10) {
        colArray.push(createCol(i, isOdd, wormholes));
        isOdd = !isOdd;
    }
    return (
        <div>
            {colArray}
        </div>
    )
}

export default Col;