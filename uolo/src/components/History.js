import { useEffect, useState } from 'react';
import './history.css';

const History = () => {
    const [score, scoreFetch] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_UOLO_CODERUSH_API_BASE_URL}`,{
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
            scoreFetch(data.data);
            });
    }, [])

    const createRowInScoreBoard = (rowData, index) => {
        return (
            <tr key = {index}>
                <td>{index + 1}</td>
                <td>{rowData.name}</td>
                <td>{rowData.numberOfChances}</td>
            </tr>
        )
    } 

    const renderData = () => {
        let rowData = [];
        for (let i = 0; i < score.length; i++) {
            rowData.push(createRowInScoreBoard(score[i], i));
        }
        return rowData;
    }

    return (
        <div id = "history" className="history-container">
            <div className='blur-container'>
                <div className='caption'>Leader board</div>
                <div className='table-container'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                            {renderData()}
                        </tbody>
                    </table>
                </div>
                <div className='button-container'>
                    <button className='back-button' onClick = {() => {
                        var element = document.getElementById("history");
                        element.style.display = 'none';
                    }}>BACK</button>
                </div>
            </div>
        </div>
    )
}

export default History;