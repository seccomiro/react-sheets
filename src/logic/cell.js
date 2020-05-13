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
