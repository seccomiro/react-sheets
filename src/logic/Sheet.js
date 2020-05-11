import Cell from './Cell';
import { cellToIndex } from './cell';

class Sheet {
  constructor({ rows, columns, name }) {
    this.cells = this.createCells(rows, columns);
    this.name = name;
  }

  register(pointingCell, pointedCells) {
    pointedCells
      .map(name => this.findCell(name))
      .forEach(cell => cell.registerListener(pointingCell));
  }

  findCell(name) {
    const index = cellToIndex(name);
    return this.cells[index.row][index.column];
  }

  createCells(rowCount, columnCount) {
    let rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows[i] = [];
      for (let j = 0; j < columnCount; j++) {
        rows[i][j] = new Cell({ sheet: this, formula: 0, value: 0 });
      }
    }
    return rows;
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
}

export default Sheet;
