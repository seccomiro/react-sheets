import { UPDATE_CELL, SELECT_CELL } from '../actions/types';
import update from 'react-addons-update';

const createCells = () => {
  let rows = [];
  for (let i = 0; i < 10; i++) {
    rows[i] = [];
    for (let j = 0; j < 15; j++) {
      rows[i][j] = '0';
    }
  }
  return rows;
};

const INITIAL_STATE = {
  cells: createCells(),
  test: 1,
  selectedCell: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Using 'var' because of name reusing inside the same context
    case UPDATE_CELL:
      const { row, column, value } = action.payload;
      return update(state, { cells: { [row]: { [column]: { $set: value } } } });
    case SELECT_CELL:
      // var { row, column, selected } = action.payload;
      return {
        ...state,
        selectedCell: { row: action.payload.row, column: action.payload.column }
      };
    default:
      return state;
  }
};
