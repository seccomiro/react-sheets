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
      rows[i][j] = { formula: '0', value: '0', dependents: [] };
    }
  }
  return rows;
};

const INITIAL_STATE = {
  cells: createCells(9, 26),
  size: { rows: 9, columns: 26 },
  test: 1,
  selectedCell: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EDITING_CELL:
      return update(state, {
        selectedCell: {
          tempFormula: { $set: action.payload.toUpperCase() },
        },
      });
    case UPDATE_CELL:
      const { row, column, value } = action.payload;
      const cellData = processCell(row, column, value, state.cells);
      return update(state, {
        cells: cellData.changes,
        /* {
          ...cellData.changes,
          [row]: {
            [column]: {
              dependents: {
                $set: cellData.dependents,
              },
            },
          },
        },*/
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
