import React from 'react';
import { connect } from 'react-redux';
import { updateCell, selectCell } from '../actions';
import { processCell } from '../logic/cell';

class Cell extends React.Component {
  onChange = e => {
    this.props.updateCell(this.props.row, this.props.column, e.target.value);
  };

  onSelectCell = e => {
    this.props.selectCell(this.props.row, this.props.column, true);
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
            onChange={this.onChange}
            onFocus={e => e.target.select()}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              textAlign: 'right'
            }}
            type="text"
            value={this.props.value}
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

export default connect(mapStateToProps, { updateCell, selectCell })(Cell);
