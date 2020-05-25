import {
  UPDATE_CELL,
  EDIT_CELL,
  NEXT_COLUMN,
  NEXT_ROW,
  UPDATE_EDITING_CELL,
  SELECT_CELL,
  PREVIOUS_COLUMN,
  PREVIOUS_ROW,
  SELECT_FORMULA_BAR,
  DELETE_CELL_CONTENTS,
} from '../actions/types';
import update from 'react-addons-update';
import Sheet from '../logic/Sheet';

const initialSheet = new Sheet({ rows: 9, columns: 26, name: 'Sheet 1' });
const firstCell = initialSheet.findCell('A1');

const INITIAL_STATE = {
  sheet: initialSheet,
  selectedCell: {
    name: firstCell.getName(),
    editing: false,
    tempFormula: firstCell.formula,
    formulaBarSelected: false,
  },
  highlightedAreas: [
    {
      start: firstCell.getName(),
      end: firstCell.getName(),
      cells: [firstCell],
      cellNames: [firstCell.getName()],
    },
  ],
  forceReload: Math.random(),
};

INITIAL_STATE.highlightedAreas.single = true;

const singleHighlight = highlightedAreas =>
  highlightedAreas.length === 1 &&
  highlightedAreas[0].start === highlightedAreas[0].end;

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
      const { shift, ctrl } = action.payload.options;
      let { highlightedAreas } = state;

      if (shift && ctrl) {
      } else if (shift) {
        const start = state.selectedCell.name;
        const end = action.payload.name;
        const { cells, cellNames } = state.sheet.findCells(start, end);
        const newArea = { start, end, cells, cellNames };
        highlightedAreas = [newArea];
      } else if (ctrl) {
        const newArea = {
          start: action.payload.name,
          end: action.payload.name,
          cells: [state.sheet.findCell(action.payload.name)],
          cellNames: [action.payload.name],
        };
        highlightedAreas.push(newArea);
      } else {
        const newArea = {
          start: action.payload.name,
          end: action.payload.name,
          cells: [state.sheet.findCell(action.payload.name)],
          cellNames: [action.payload.name],
        };
        highlightedAreas = [newArea];
      }
      highlightedAreas.single = singleHighlight(highlightedAreas);

      return {
        ...state,
        selectedCell: action.payload.selected
          ? {
              name: action.payload.name,
              tempFormula: state.sheet.findCell(action.payload.name).formula,
              editing: false,
              formulaBarSelected: false,
            }
          : undefined,
        highlightedAreas,
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
              formulaBarSelected: false,
            }
          : undefined,
      };
    case SELECT_FORMULA_BAR:
      return update(state, {
        selectedCell: {
          formulaBarSelected: { $set: action.payload.entering },
        },
      });
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
          formulaBarSelected: false,
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
          formulaBarSelected: false,
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
          formulaBarSelected: false,
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
          formulaBarSelected: false,
        },
      };
    case DELETE_CELL_CONTENTS:
      /**
       * See UPDATE_CELL's explanation
       */
      const cellNames = [
        ...new Set(state.highlightedAreas.map(a => a.cellNames).flat()),
      ];
      state.sheet.updateCells(cellNames, '');
      return { ...state, forceReload: Math.random() };
    default:
      return state;
  }
};
