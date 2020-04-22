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

export const processCell = (row, column, value, cells) =>
  value.startsWith('=') ? evaluateFormula(value, cells) : value;

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
