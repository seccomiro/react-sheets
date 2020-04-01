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
  'Z'
];

export const processCell = (row, column, value) => {
  if (value.startsWith('=')) {
    return 'Formula';
  }
  return value;
};

export const indexToColumn = i => {
  return letters[i];
};

export const columnToIndex = column => {
  return letters.findIndex(column);
};

export const indexToCell = (iRow, iColumn) => {
  return `${indexToColumn(iColumn)}${iRow}`;
};

export const cellToIndex = cell => {
  const column = columnToIndex(cell[0]);
  const row = cell.splice(1);
  return { row, column };
};
