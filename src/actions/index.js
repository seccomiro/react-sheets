import {
  UPDATE_CELL,
  SELECT_CELL,
  NEXT_ROW,
  NEXT_COLUMN,
  UPDATE_EDITING_CELL,
  EDIT_CELL,
} from './types';

export const updateCell = (cellName, formula) => {
  return { type: UPDATE_CELL, payload: { cellName, formula } };
};

export const updateEditingCell = value => {
  return { type: UPDATE_EDITING_CELL, payload: value };
};

export const selectCell = (name, selected) => {
  return { type: SELECT_CELL, payload: { name, selected } };
};

export const editCell = (name, selected) => {
  return { type: EDIT_CELL, payload: { name, selected } };
};

export const nextRow = () => {
  return { type: NEXT_ROW };
};

export const nextColumn = () => {
  return { type: NEXT_COLUMN };
};
