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
    console.log(`Registering listener (${cell})...`);
    this.listeners.add(cell);
  }

  evaluate() {
    console.log('Being evaluated...');

    // debugger;
    if (this.formula.startsWith('=')) {
      this.value = evaluateFormula(
        this.formula.substring(1, this.formula.length),
        this.pointedCellParams()
      );
    } else {
      this.value = this.formula;
    }
    console.log(this.value);

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
