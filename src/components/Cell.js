import React from 'react';
import { connect } from 'react-redux';
import {
  updateCell,
  updateEditingCell,
  editCell,
  nextColumn,
  nextRow,
} from '../actions';
import cellWrapper from './cellWrapper';

class Cell extends React.Component {
  onChange = e => {
    this.props.updateEditingCell(e.target.value);
  };

  onEditCell = e => {
    this.props.editCell(this.props.name, true);
  };

  onKeyDown = e => {
    if (e.which === 9) this.nextElement('Column', e);
    else if (e.which === 13) this.nextElement('Row', e);
  };

  nextElement = (type, e) => {
    e.preventDefault();
    this.props.updateCell(this.props.name, e.target.value);
    this.props[`next${type}`]();
  };

  onBlur = e => {
    this.props.updateCell(this.props.name, e.target.value);
  };

  render() {
    if (
      this.props.selectedCell &&
      this.props.selectedCell.name === this.props.name
    ) {
      return (
        <div className="cell selected">
          <input
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            onFocus={e => e.target.select()}
            onBlur={this.onBlur}
            type="text"
            value={this.props.selectedCell.tempFormula}
            autoFocus
          />
        </div>
      );
    } else {
      return (
        <div className="cell" onClick={this.onEditCell}>
          <div className="test">{this.props.cell.value || '\u00A0'}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const cell = state.sheet.sheet.findCell(ownProps.name);
  return { selectedCell: state.sheet.selectedCell, cell };
};

export default cellWrapper(
  connect(mapStateToProps, {
    updateCell,
    updateEditingCell,
    editCell,
    nextColumn,
    nextRow,
  })(Cell)
);
