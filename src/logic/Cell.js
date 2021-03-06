import { pointedCells, evaluateFormula } from './formula';

class Cell {
  constructor({ sheet, formula = '0', value = '0' }) {
    this.sheet = sheet;
    this.formula = formula;
    this.value = value;
    this.listeners = new Set();
    this.pointedCells = {};
  }

  setFormula(formula) {
    this.formula = formula;
    const cellNames = pointedCells(formula);
    this.pointedCells = this.sheet.register(this, cellNames);
    this.evaluate();
  }

  registerListener(cell) {
    this.listeners.add(cell);
  }

  getName() {
    return this.sheet.getCellName(this);
  }

  isHighlighted(highlightedAreas) {
    return this.sheet.cellIsHighlighted(this.getName(), highlightedAreas);
  }

  evaluate() {
    if (this.formula.startsWith('=')) {
      this.value = evaluateFormula(
        this.formula.substring(1, this.formula.length),
        this.pointedCellParams()
      );
    } else {
      this.value = this.formula;
    }

    this.listeners.forEach(cell => cell.evaluate());
  }

  pointedCellParams() {
    const map = {};
    Object.keys(this.pointedCells).forEach(
      cellName => (map[cellName] = this.pointedCells[cellName].value)
    );
    return map;
  }
}

export default Cell;
