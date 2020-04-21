import { UPDATE_CELL, SELECT_CELL, NEXT_ROW, NEXT_COLUMN } from './types';

export const updateCell = (row, column, value) => {
  return { type: UPDATE_CELL, payload: { row, column, value } };
};

export const selectCell = (row, column, selected) => {
  return { type: SELECT_CELL, payload: { row, column, selected } };
};

export const nextRow = () => {
  return { type: NEXT_ROW };
};

export const nextColumn = () => {
  return { type: NEXT_COLUMN };
};
