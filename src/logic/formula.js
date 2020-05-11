import { evaluate } from 'mathjs';

export const operators = /([+,*,/,=,\-,(,)])/g;

export const pointedCells = formula => {
  const presentCells = formula.split(operators).filter(e => isCell(e));
  return [...new Set(presentCells)];
};

export const isCell = value => !isNumber(value);

export const isNumber = value => !isNaN(value);

export const evaluateFormula = (formula, params) => evaluate(formula, params);
