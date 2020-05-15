import {
  UPDATE_CELL,
  EDIT_CELL,
  NEXT_COLUMN,
  NEXT_ROW,
  UPDATE_EDITING_CELL,
  SELECT_CELL,
  PREVIOUS_COLUMN,
  PREVIOUS_ROW,
} from '../actions/types';
import update from 'react-addons-update';
import Sheet from '../logic/Sheet';

const INITIAL_STATE = {
  sheet: new Sheet({ rows: 9, columns: 26, name: 'Sheet 1' }),
  selectedCell: { name: 'A1', editing: false, tempFormula: '' },
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
      const { cellName, formula } = action.payload;
      /**
       * I know! We're mutating the state inside the store here.
       * This will be fixed as formula change tracking process is well defined.
       * By now, we need this to have every cell value updated.
       */
      state.sheet.updateCell(cellName, formula);

      return state;
    case SELECT_CELL:
      return {
        ...state,
        selectedCell: action.payload.selected
          ? {
              name: action.payload.name,
              tempFormula: state.sheet.findCell(action.payload.name).formula,
              editing: false,
            }
          : undefined,
      };
    case EDIT_CELL:
      return {
        ...state,
        selectedCell: action.payload.selected
          ? {
              name: action.payload.name,
              tempFormula:
                action.payload.value ||
                state.sheet.findCell(action.payload.name).formula,
              editing: true,
            }
          : undefined,
      };
    case NEXT_COLUMN:
      const nextColumnName = state.sheet.nextColumn(state.selectedCell.name);
      const nextColumnFormula = state.sheet.findCell(nextColumnName).formula;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          name: nextColumnName,
          tempFormula: nextColumnFormula,
          editing: false,
        },
      };
    case NEXT_ROW:
      const nextRowName = state.sheet.nextRow(state.selectedCell.name);
      const nextRowFormula = state.sheet.findCell(nextRowName).formula;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          name: nextRowName,
          tempFormula: nextRowFormula,
          editing: false,
        },
      };
    case PREVIOUS_COLUMN:
      const previousColumnName = state.sheet.previousColumn(
        state.selectedCell.name
      );
      const previousColumnFormula = state.sheet.findCell(previousColumnName)
        .formula;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          name: previousColumnName,
          tempFormula: previousColumnFormula,
          editing: false,
        },
      };
    case PREVIOUS_ROW:
      const previousRowName = state.sheet.previousRow(state.selectedCell.name);
      const previousRowFormula = state.sheet.findCell(previousRowName).formula;
      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          name: previousRowName,
          tempFormula: previousRowFormula,
          editing: false,
        },
      };
    default:
      return state;
  }
};
