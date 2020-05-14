import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { indexToRow, indexToColumn, sameColumn, sameRow } from '../logic/cell';

class Sheet extends React.Component {
  renderCells() {
    return (
      <table className="sheet-table">
        <thead style={{ textAlign: 'right' }}>
          <tr>
            <th className="column-header"></th>
            {this.props.cells[0].map((cell, i) => (
              <th
                key={`c${i}`}
                className={`column-header ${
                  sameColumn(this.props.selectedCell?.name, cell.getName())
                    ? 'selected'
                    : ''
                }`}
              >
                <div>{indexToColumn(i)}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.cells.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <Fragment key={j}>
                  {j === 0 ? (
                    <th
                      className={`row-header ${
                        sameRow(this.props.selectedCell?.name, cell.getName())
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <div>{indexToRow(i)}</div>
                    </th>
                  ) : (
                    <></>
                  )}
                  <td
                    className={
                      this.props.selectedCell?.name === cell.getName()
                        ? 'selected'
                        : ''
                    }
                  >
                    <Cell name={cell.getName()} />
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.renderCells()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cells: state.sheet.sheet.cells,
    selectedCell: state.sheet.selectedCell,
  };
};

export default connect(mapStateToProps, {})(Sheet);
