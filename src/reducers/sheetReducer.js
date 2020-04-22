import {
  UPDATE_CELL,
  SELECT_CELL,
  NEXT_COLUMN,
  NEXT_ROW,
  UPDATE_EDITING_CELL,
} from '../actions/types';
import update from 'react-addons-update';
import { processCell } from '../logic/cell';

const createCells = (rowCount, columnCount) => {
  let rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows[i] = [];
    for (let j = 0; j < columnCount; j++) {
      rows[i][j] = { formula: '0', value: '0' };
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
    case UPDATE_EDITING_CELL:
      return update(state, {
        selectedCell: {
          // $set: { tempFormula: action.payload },
          tempFormula: { $set: action.payload },
        },
      });
    case UPDATE_CELL:
      const { row, column, value } = action.payload;
      return update(state, {
        cells: {
          [row]: {
            [column]: {
              $set: {
                formula: state.selectedCell.tempFormula,
                value: processCell(row, column, value, state.cells),
              },
            },
          },
        },
      });
    case SELECT_CELL:
      return {
        ...state,
        selectedCell: action.payload.selected
          ? {
              row: action.payload.row,
              column: action.payload.column,
              tempFormula:
                state.cells[action.payload.row][action.payload.column].formula,
            }
          : undefined,
      };
    case NEXT_COLUMN:
      const nextColumn =
        state.selectedCell.column === state.size.columns - 1
          ? 0
          : state.selectedCell.column + 1;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          column: nextColumn,
          tempFormula: state.cells[state.selectedCell.row][nextColumn].formula,
        },
      };
    case NEXT_ROW:
      const nextRow =
        state.selectedCell.row === state.size.rows - 1
          ? 0
          : state.selectedCell.row + 1;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          row: nextRow,
          tempFormula: state.cells[nextRow][state.selectedCell.column].formula,
        },
      };
    default:
      return state;
  }
};
