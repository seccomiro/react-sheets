import { evaluate } from 'mathjs';
import merge from 'deepmerge';
import _ from 'lodash';
import rfdc from 'rfdc';
const clone = rfdc();

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
  const cellMap = clone(cells);
  cellMap.changes = {};
  cellMap.dependentChanges = {};
  const cellData = evaluateCell(row, column, value, cellMap);
  // debugger;
  cellMap.changes[row][column].formula = { $set: value };
  // cellMap.changes[row][column].$set.formula = value;
  // cellMap.dependents = cellMap[row][column].dependents;

  const mergedChanges = merge(cellMap.changes, cellMap.dependentChanges);
  // debugger;

  return {
    value: cellData,
    changes: mergedChanges,
    // changes: cellMap.changes,
    // dependents: cellMap.dependentChanges,
  };
  // return cellData;
};

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

const evaluateFormula = (row, column, formula, cells) => {
  const operators = /([+,*,/,=,\-,(,)])/g;
  const openFormula = formula
    .split(operators)
    .map(e => {
      const val = e.trim();
      if (val === '' || val === '=') return '';
      if (isNumber(val) || val.match(operators)) return val;
      const cellIndexes = cellToIndex(val);
      const cell = cells[cellIndexes.row][cellIndexes.column];

      const targetPush = { row, column };
      // debugger;
      cell.dependents.push(targetPush);

      if (cells.dependentChanges[cellIndexes.row]) {
        if (cells.dependentChanges[cellIndexes.row][cellIndexes.column]) {
          if (
            cells.dependentChanges[cellIndexes.row][cellIndexes.column]
              .dependents
          ) {
            if (
              cells.dependentChanges[cellIndexes.row][cellIndexes.column].$push
            ) {
              cells.dependentChanges[cellIndexes.row][
                cellIndexes.column
              ].dependents.$push.push(targetPush);
            } else {
              cells.dependentChanges[cellIndexes.row][
                cellIndexes.column
              ].dependents.$push = [targetPush];
            }
          } else {
            cells.dependentChanges[cellIndexes.row][
              cellIndexes.column
            ].dependents = {};
            cells.dependentChanges[cellIndexes.row][
              cellIndexes.column
            ].dependents.$push = [targetPush];
          }
        } else {
          cells.dependentChanges[cellIndexes.row][cellIndexes.column] = {};
          cells.dependentChanges[cellIndexes.row][
            cellIndexes.column
          ].dependents = {};
          cells.dependentChanges[cellIndexes.row][
            cellIndexes.column
          ].dependents.$push = [targetPush];
        }
      } else {
        cells.dependentChanges[cellIndexes.row] = {};
        cells.dependentChanges[cellIndexes.row][cellIndexes.column] = {};
        cells.dependentChanges[cellIndexes.row][
          cellIndexes.column
        ].dependents = {};
        cells.dependentChanges[cellIndexes.row][
          cellIndexes.column
        ].dependents.$push = [targetPush];
      }

      const cellValue = evaluateCell(
        cellIndexes.row,
        cellIndexes.column,
        cell.formula,
        cells
      );
      return cellValue;
    })
    .join('');
  return evaluate(openFormula);
};

const isNumber = value => !isNaN(value);

const evaluateCell = (row, column, value, cells) => {
  if (!value.startsWith('=')) {
    // cells.changes[row] = { [column]: { $set: { value, formula: value } } };
    cells.changes[row] = {
      [column]: { value: { $set: value }, formula: { $set: value } },
    };
    evaluateDependents(row, column, cells);
    return value;
  }
  const newValue = evaluateFormula(row, column, value, cells);
  cells[row][column].value = newValue;
  cells.changes[row] = { [column]: { value: { $set: newValue } } };
  // debugger;

  evaluateDependents(row, column, cells);

  return newValue;
};

const evaluateDependents = (row, column, cells) => {
  const dependents = _.uniqWith(cells[row][column].dependents, _.isEqual);
  dependents.forEach(d =>
    evaluateCell(d.row, d.column, cells[d.row][d.column].formula, cells)
  );
};
