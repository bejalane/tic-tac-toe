import React, {useState} from 'react';
import {RESULT_STATE, winCheck} from '../utils/winCheck';

const Game = () => {
    const cleanState = [
        [0,0,0], 
        [0,0,0], 
        [0,0,0],
    ];
    const [field, setField] = useState(cleanState);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [victory, setVictory] = useState(null);
    const [draw, setDraw] = useState(null);
    const [winCells, setWinCells] = useState(null);

    const onCellClick = (rowIndex, cellIndex) => {
        const currentCell = field[rowIndex][cellIndex];
        if(currentCell === 0 && !victory && !draw) {
            const newField = JSON.parse(JSON.stringify(field));
            newField[rowIndex][cellIndex] = currentPlayer;
            setField(newField);
            const result = winCheck(newField, rowIndex, cellIndex);
            if(result) {
                if(result.state === RESULT_STATE.DRAW) {
                    setDraw(true);
                } else {
                    setWinCells(result.cells);
                    setVictory(currentPlayer);
                }
            } else {
                setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
            }
        }
    }

    const getCellValue = (cell, rowIndex, cellIndex) => {
        let value;
        switch(cell){
            case 1:
                value = 'X';
                break;
            case 2:
                value = 'O';
                break;
            default:
                value = ' ';
                break;
        }
        if(victory) {
            const checkCellNumber = winCells.includes(`${rowIndex}-${cellIndex}`);
            return <div className={checkCellNumber ? 'cell win' : 'cell'}>{value}</div>
        } else {
            return <div className="cell">{value}</div>
        }
    }

    const renderRow = (row, rowIndex) => {
        return <div style={{display: 'flex'}} key={rowIndex}>
            {row.map((cell, cellIndex) => {
                return <div 
                    key={cellIndex}
                    onClick={() => onCellClick(rowIndex, cellIndex)}
                >{getCellValue(cell, rowIndex, cellIndex)}</div>
            })}
        </div>
    }

    const reset = () => {
        setField(cleanState);
        setCurrentPlayer(1);
        setVictory(null);
        setDraw(null);
        setWinCells(null);
    }

    return (<div>
        {!victory && !draw && <h1>Player {currentPlayer} moves:</h1>}
        {victory && <h1>Player {currentPlayer} won!</h1>}
        {draw && <h1>DRAW!</h1>}
        <div className="field">
            {field.map((row, i) => {
                return renderRow(row, i);
            })}
        </div>
        <button className="reset" onClick={reset}>Restart</button>
    </div>)

}

export default Game;