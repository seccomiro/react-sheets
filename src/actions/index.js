import { UPDATE_CELL, SELECT_CELL } from './types';

export const updateCell = (row, column, value) => {
  return { type: UPDATE_CELL, payload: { row, column, value } };
};

export const selectCell = (row, column, selected) => {
  return { type: SELECT_CELL, payload: { row, column, selected } };
};
