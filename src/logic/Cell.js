import { pointedCells, evaluateFormula } from './formula';

class Cell {
  constructor({ sheet, formula = '0', value = '0' }) {
    this.sheet = sheet;
    this.formula = formula;
    this.value = value;
    this.listeners = new Set();
    this.pointedCells = new Set();
  }

  setFormula(formula) {
    this.formula = formula;
    const cellNames = pointedCells(formula);
    this.sheet.register(this, cellNames);
    this.evaluate();
  }

  registerListener(cell) {
    this.listeners.add(cell);
  }

  evaluate() {
    this.value = evaluateFormula(this.formula, {});
    this.listeners.forEach(cell => cell.evaluate());
  }
}

export default Cell;
