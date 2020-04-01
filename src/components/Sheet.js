import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Frag } from 'react-dom';
import Cell from './Cell';
import { indexToRow, columnToIndex, indexToColumn } from '../logic/cell';

class Sheet extends React.Component {
  renderCells() {
    // console.log(this.props.cells.map(row => 'row'));
    // console.log(this.props.cells.map);
    // window.cells = this.props.cells;

    return (
      <table>
        <thead style={{ textAlign: 'right' }}>
          <tr>
            <th>.</th>
            {this.props.cells[0].map((row, i) => (
              <th key={`c${i}`}>{indexToColumn(i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.cells.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <Fragment key={j}>
                  {j === 0 ? <td>{i}</td> : <></>}
                  <td>
                    <Cell row={i} column={j} value={value} />
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
  return { cells: state.sheet.cells };
};

export default connect(mapStateToProps, {})(Sheet);
