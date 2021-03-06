import Cell from './Cell';
import { cellToIndex, indexToCell } from './cell';

class Sheet {
  constructor({ rows, columns, name }) {
    this.cellNames = new Map();
    this.cells = this.createCells(rows, columns);
    this.name = name;
  }

  register(pointingCell, pointedCellNames) {
    pointedCellNames
      .map(name => this.findCell(name))
      .forEach(cell => cell.registerListener(pointingCell));
    return this.cellMap(pointedCellNames);
  }

  cellMap(cellNames) {
    const map = {};
    cellNames.forEach(name => {
      const cell = this.findCell(name);
      map[name] = cell;
    });
    return map;
  }

  findCell(name) {
    const index = cellToIndex(name);
    return this.cells[index.row][index.column];
  }

  findCells(startName, endName) {
    const start = cellToIndex(startName);
    const end = cellToIndex(endName);
    const loop = {
      row: {
        start: start.row <= end.row ? start.row : end.row,
        end: start.row <= end.row ? end.row : start.row,
      },
      column: {
        start: start.column <= end.column ? start.column : end.column,
        end: start.column <= end.column ? end.column : start.column,
      },
    };
    const cells = [];
    const cellNames = [];
    for (let row = loop.row.start; row <= loop.row.end; row++) {
      for (let col = loop.column.start; col <= loop.column.end; col++) {
        const cell = this.cells[row][col];
        cells.push(cell);
        cellNames.push(cell.getName());
      }
    }
    return { cells, cellNames };
  }

  cellIsHighlighted(name, highlightedAreas) {
    return !!highlightedAreas.find(a => a.cellNames.includes(name));
  }

  updateCell(name, formula) {
    this.findCell(name).setFormula(formula);
  }

  updateCells(cellNames, formula) {
    cellNames.forEach(name => this.updateCell(name, formula));
  }

  createCells(rowCount, columnCount) {
    let rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows[i] = [];
      for (let j = 0; j < columnCount; j++) {
        const cell = new Cell({ sheet: this, formula: '', value: '' });
        rows[i][j] = cell;
        this.cellNames.set(cell, indexToCell(i, j));
      }
    }
    return rows;
  }

  getCellName(cell) {
    return this.cellNames.get(cell);
  }

  size() {
    return { rows: this.rows(), columns: this.columns() };
  }

  rows() {
    return this.cells.length;
  }

  columns() {
    return this.cells[0].length;
  }

  nextRow(cellName) {
    const cell = cellToIndex(cellName);
    const nextRow = cell.row === this.rows() - 1 ? 0 : cell.row + 1;
    return indexToCell(nextRow, cell.column);
  }

  nextColumn(cellName) {
    const cell = cellToIndex(cellName);
    const nextColumn = cell.column === this.columns() - 1 ? 0 : cell.column + 1;
    return indexToCell(cell.row, nextColumn);
  }

  previousRow(cellName) {
    const cell = cellToIndex(cellName);
    const previousRow = cell.row === 0 ? this.rows() - 1 : cell.row - 1;
    return indexToCell(previousRow, cell.column);
  }

  previousColumn(cellName) {
    const cell = cellToIndex(cellName);
    const previousColumn =
      cell.column === 0 ? this.columns() - 1 : cell.column - 1;
    return indexToCell(cell.row, previousColumn);
  }
}

export default Sheet;
