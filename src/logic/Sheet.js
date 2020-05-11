import Cell from './Cell';

class Sheet {
  // static createSheet({ rows, columns, name }) {
  //   return new Sheet({ rows, columns, name });
  // }

  constructor({ rows, columns, name }) {
    this.cells = this.createCells(rows, columns);
    this.name = name;
  }

  createCells(rowCount, columnCount) {
    let rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows[i] = [];
      for (let j = 0; j < columnCount; j++) {
        rows[i][j] = new Cell({ formula: 0 });
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
