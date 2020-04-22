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

export const processCell = (row, column, value, cells) => {
  if (value.startsWith('=')) {
    return evaluateFormula(value, cells);
  }
  return value;
};

export const indexToColumn = i => letters[i];

export const columnToIndex = column => letters.indexOf(column.toUpperCase());

export const indexToCell = (iRow, iColumn) =>
  `${indexToColumn(iColumn)}${iRow + 1}`;

export const cellToIndex = cell => {
  const column = columnToIndex(cell[0]);
  const row = parseInt(cell[1]) - 1;
  return { row, column };
};

const evaluateFormula = (formula, cells) => {
  const operators = /([+,*,/,=,-,(,)])/g;
  return formula.split(operators).map(e => {
    const val = e.trim();
    if (val === '' || val === '=') return '';
    if (isNumber(val)) return val;
    if (val.match(operators)) return val;
    const cell = cellToIndex(val);
    const cellValue = cells[cell.row][cell.column].value;
    return eval(cellValue);
  });
};

const isNumber = value => !isNaN(value);
