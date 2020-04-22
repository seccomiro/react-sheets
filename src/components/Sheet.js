import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { indexToRow, indexToColumn } from '../logic/cell';

class Sheet extends React.Component {
  renderCells() {
    return (
      <table>
        <thead style={{ textAlign: 'right' }}>
          <tr>
            <th>.</th>
            {this.props.cells[0].map((row, i) => (
              <th
                key={`c${i}`}
                className={
                  this.props.selectedCell?.column === i ? 'selected' : ''
                }
              >
                {indexToColumn(i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.cells.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <Fragment key={j}>
                  {j === 0 ? (
                    <th
                      className={
                        this.props.selectedCell?.row === i ? 'selected' : ''
                      }
                    >
                      {indexToRow(i)}
                    </th>
                  ) : (
                    <></>
                  )}
                  <td>
                    <Cell row={i} column={j} />
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
  return { cells: state.sheet.cells, selectedCell: state.sheet.selectedCell };
};

export default connect(mapStateToProps, {})(Sheet);
