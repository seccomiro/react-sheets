const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const indexToColumn = i => letters[i];

export const columnToIndex = column => letters.indexOf(column.toUpperCase());

export const rowToIndex = row => parseInt(row) - 1;

export const indexToRow = i => i + 1;

export const indexToCell = (iRow, iColumn) =>
  `${indexToColumn(iColumn)}${indexToRow(iRow)}`;

export const cellToIndex = cell => ({
  row: rowToIndex(cell[1]),
  column: columnToIndex(cell[0]),
});

export const sameRow = (cellName1, cellName2) =>
  cellName1 &&
  cellName2 &&
  cellToIndex(cellName1).row === cellToIndex(cellName2).row;

export const sameColumn = (cellName1, cellName2) =>
  cellName1 &&
  cellName2 &&
  cellToIndex(cellName1).column === cellToIndex(cellName2).column;
