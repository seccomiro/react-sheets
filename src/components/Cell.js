import React from 'react';
import { connect } from 'react-redux';
import {
  updateCell,
  updateEditingCell,
  selectCell,
  nextColumn,
  nextRow,
} from '../actions';

class Cell extends React.Component {
  onChange = e => {
    this.props.updateEditingCell(e.target.value);
  };

  onSelectCell = e => {
    this.props.selectCell(this.props.row, this.props.column, true);
  };

  onKeyDown = e => {
    if (e.which === 9) {
      e.preventDefault();
      this.props.updateCell(this.props.row, this.props.column, e.target.value);
      this.props.nextColumn();
    } else if (e.which === 13) {
      e.preventDefault();
      this.props.updateCell(this.props.row, this.props.column, e.target.value);
      this.props.nextRow();
    }
  };

  onBlur = e => {
    this.props.updateCell(this.props.row, this.props.column, e.target.value);
  };

  render() {
    if (
      this.props.selectedCell &&
      this.props.selectedCell.row === this.props.row &&
      this.props.selectedCell.column === this.props.column
    ) {
      return (
        <div style={{ width: '30px', height: '20px', textAlign: 'right' }}>
          <input
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            onFocus={e => e.target.select()}
            onBlur={this.onBlur}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              textAlign: 'right',
            }}
            type="text"
            value={this.props.selectedCell.tempFormula}
            autoFocus
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ width: '30px', height: '20px', textAlign: 'right' }}
          onClick={this.onSelectCell}
        >
          {this.props.cell.value}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const cell = state.sheet.cells[ownProps.row][ownProps.column];
  return { selectedCell: state.sheet.selectedCell, cell };
};

export default connect(mapStateToProps, {
  updateCell,
  updateEditingCell,
  selectCell,
  nextColumn,
  nextRow,
})(Cell);
