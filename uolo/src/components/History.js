import { useEffect, useState } from 'react';
import './history.css';
import commonFunctions from '../CommonFunctions';

const History = ({audioOn, setShowHistoryCallback}) => {
    const [score, scoreFetch] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_UOLO_CODERUSH_API_BASE_URL}`,{
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
            scoreFetch(data);
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

    const renderNoDataString = () => {
        if (score.length === 0) {
            return (
                <div className='no-data-string'>Oops! No Data Found ...</div>
            )
        }
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
                {renderNoDataString()}
                <div className='button-container'>
                    <button className='back-button' onClick = {() => {
                        if (audioOn) {
                            commonFunctions.playAudioToggleSound()
                        }
                        setShowHistoryCallback(false);
                    }}>BACK</button>
                </div>
            </div>
        </div>
    )
}

export default History;