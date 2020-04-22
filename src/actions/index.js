import {
  UPDATE_CELL,
  SELECT_CELL,
  NEXT_ROW,
  NEXT_COLUMN,
  UPDATE_EDITING_CELL,
} from './types';

export const updateCell = (row, column, value) => {
  return { type: UPDATE_CELL, payload: { row, column, value } };
};

export const updateEditingCell = value => {
  return { type: UPDATE_EDITING_CELL, payload: value };
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
