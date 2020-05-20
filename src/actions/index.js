import {
  UPDATE_CELL,
  SELECT_CELL,
  NEXT_ROW,
  NEXT_COLUMN,
  UPDATE_EDITING_CELL,
  EDIT_CELL,
  PREVIOUS_ROW,
  PREVIOUS_COLUMN,
  SELECT_FORMULA_BAR,
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

export const editCell = (name, selected, value) => {
  return { type: EDIT_CELL, payload: { name, selected, value } };
};

export const nextRow = () => {
  return { type: NEXT_ROW };
};

export const nextColumn = () => {
  return { type: NEXT_COLUMN };
};

export const previousRow = () => {
  return { type: PREVIOUS_ROW };
};

export const previousColumn = () => {
  return { type: PREVIOUS_COLUMN };
};

export const selectFormulaBar = (entering = true) => {
  return { type: SELECT_FORMULA_BAR, payload: { entering } };
};
