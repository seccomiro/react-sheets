import {
  UPDATE_CELL,
  SELECT_CELL,
  NEXT_COLUMN,
  NEXT_ROW,
} from '../actions/types';
import update from 'react-addons-update';

const createCells = (rowCount, columnCount) => {
  let rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows[i] = [];
    for (let j = 0; j < columnCount; j++) {
      rows[i][j] = '0';
    }
  }
  return rows;
};

const INITIAL_STATE = {
  cells: createCells(10, 26),
  size: { rows: 10, columns: 26 },
  test: 1,
  selectedCell: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CELL:
      const { row, column, value } = action.payload;
      return update(state, { cells: { [row]: { [column]: { $set: value } } } });
    case SELECT_CELL:
      return {
        ...state,
        selectedCell: action.payload.selected
          ? { row: action.payload.row, column: action.payload.column }
          : undefined,
      };
    case NEXT_COLUMN:
      const nextColumn =
        state.selectedCell.column === state.size.columns - 1
          ? 0
          : state.selectedCell.column + 1;
      return {
        ...state,
        selectedCell: { ...state.selectedCell, column: nextColumn },
      };
    case NEXT_ROW:
      const nextRow =
        state.selectedCell.row === state.size.rows - 1
          ? 0
          : state.selectedCell.row + 1;
      return {
        ...state,
        selectedCell: { ...state.selectedCell, row: nextRow },
      };
    default:
      return state;
  }
};
