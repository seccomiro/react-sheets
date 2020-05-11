class Cell {
  constructor({ formula = '0', value = '0' }) {
    this.formula = formula;
    this.value = value;
    this.dependents = [];
  }
}

export default Cell;
