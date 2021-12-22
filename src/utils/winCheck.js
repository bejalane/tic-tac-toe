const checkCells = (cellsArr) => {
    if(cellsArr[0] === 0) return false;
    return cellsArr.every(val => val === cellsArr[0]);
}

const checkDraw = (arr) => {
    return !arr.some(el => el === 0);
}

const getWinCellsIndexes = (lineType, index, arr) => {
    const cells = [];
    switch(lineType) {
        case LINE_TYPE.ROW:
            arr.forEach(((val, i) => cells.push(`${index}-${i}`)));
            break;
        case LINE_TYPE.COLUMN:
            arr.forEach(((val, i) => cells.push(`${i}-${index}`)));
            break;
        case LINE_TYPE.F_DIAGONAL:
            arr.forEach(((val, i) => cells.push(`${i}-${i}`)));
            break;
        case LINE_TYPE.S_DIAGONAL:
            arr.forEach(((val, i) => cells.push(`${i}-${arr.length - 1 - i}`)));
            break;
        default:
            break;
    }
    return {cells, state: RESULT_STATE.WIN}
}

export const RESULT_STATE = {
    WIN: 'win',
    DRAW: 'draw'
}

export const LINE_TYPE = {
    ROW: 'raw',
    COLUMN: 'column',
    F_DIAGONAL: 'first diagonal',
    S_DIAGONAL: 'second diagonal',
}

export const winCheck = (field, rowIndex, colIndex) => {
    const horizontalArray = field[rowIndex];
    if(checkCells(horizontalArray)) return getWinCellsIndexes(LINE_TYPE.ROW, rowIndex, field[rowIndex]);

    const verticalArray = field.map(row => row[colIndex]);
    if(checkCells(verticalArray)) return getWinCellsIndexes(LINE_TYPE.COLUMN, colIndex, field[rowIndex]);

    const firstDiagonalArray = field.map((row, i) => row[i]);
    const secondDiagonalArray = field.map((row, i) => row[2 - i]);
    if(checkCells(firstDiagonalArray)) return getWinCellsIndexes(LINE_TYPE.F_DIAGONAL, rowIndex, field[rowIndex]);
    if(checkCells(secondDiagonalArray)) return getWinCellsIndexes(LINE_TYPE.S_DIAGONAL, rowIndex, field[rowIndex]);

    const drawArray = field.flat();
    if(checkDraw(drawArray)) return {state: RESULT_STATE.DRAW};

    return false;
}