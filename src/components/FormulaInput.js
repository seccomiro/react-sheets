import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateEditingCell,
  updateCell,
  nextColumn,
  nextRow,
  previousColumn,
  previousRow,
  selectFormulaBar,
  selectCell,
} from '../actions';

class FormulaInput extends Component {
  onChange = e => {
    this.props.updateEditingCell(e.target.value);
  };

  onKeyDown = e => {
    if (e.which === 9) this.nextElement('Column', e, false, true);
    else if (e.which === 13) this.nextElement('Row', e, false, true);
    else if (e.which === 27) this.props.selectCell(this.props.name, true);
  };

  nextElement = (type, e, previous = false, save = false) => {
    e.preventDefault();
    const way = previous ? 'previous' : 'next';
    if (save) {
      this.props.updateCell(this.props.name, e.target.value);
    }
    this.props[`${way}${type}`]();
  };

  onFocus = () => {
    if (this.props.atFormulaBar) {
      this.props.selectFormulaBar(true);
    }
  };

  onBlur = e => {
    if (this.props.atFormulaBar) {
      this.props.selectFormulaBar(false);
    }
    this.props.updateCell(this.props.name, e.target.value);
  };

  render() {
    return (
      <input
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        type="text"
        value={this.props.formula}
        autoFocus={!this.props.formulaBarSelected}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    formula: state.sheet.selectedCell.tempFormula,
    name: state.sheet.selectedCell.name,
    formulaBarSelected: state.sheet.selectedCell.formulaBarSelected,
  };
};

export default connect(mapStateToProps, {
  updateEditingCell,
  updateCell,
  nextColumn,
  nextRow,
  previousColumn,
  previousRow,
  selectFormulaBar,
  selectCell,
})(FormulaInput);
