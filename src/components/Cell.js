import React from 'react';
import { connect } from 'react-redux';
import { updateCell, selectCell, nextColumn, nextRow } from '../actions';
import { processCell } from '../logic/cell';

class Cell extends React.Component {
  onChange = e => {
    this.props.updateCell(this.props.row, this.props.column, e.target.value);
  };

  onSelectCell = e => {
    this.props.selectCell(this.props.row, this.props.column, true);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.selectCell(this.props.row, this.props.column, false);
  };

  onKeyUp = e => {
    if (e.which === 9) {
      e.preventDefault();
      this.props.nextColumn();
    } else if (e.which === 13) {
      e.preventDefault();
      this.props.nextRow();
    }
  };

  render() {
    if (
      this.props.selectedCell &&
      this.props.selectedCell.row === this.props.row &&
      this.props.selectedCell.column === this.props.column
    ) {
      return (
        <div style={{ width: '30px', height: '20px', textAlign: 'right' }}>
          <form onSubmit={this.onSubmit}>
            <input
              onKeyDown={this.onKeyUp}
              onChange={this.onChange}
              onFocus={e => e.target.select()}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                textAlign: 'right',
              }}
              type="text"
              value={this.props.value}
              autoFocus
            />
          </form>
        </div>
      );
    } else {
      return (
        <div
          style={{ width: '30px', height: '20px', textAlign: 'right' }}
          onClick={this.onSelectCell}
        >
          {processCell(this.props.row, this.props.column, this.props.value)}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state.sheet);

  return { selectedCell: state.sheet.selectedCell };
};

export default connect(mapStateToProps, {
  updateCell,
  selectCell,
  nextColumn,
  nextRow,
})(Cell);
