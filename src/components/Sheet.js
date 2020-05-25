import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { indexToRow, indexToColumn, sameColumn, sameRow } from '../logic/cell';
import FormulaBar from './FormulaBar';

class Sheet extends React.Component {
  renderCells() {
    console.log(this.props.highlightedAreas.single);
    return (
      <div className="sheet">
        <FormulaBar />
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
                    <Cell
                      name={cell.getName()}
                      selected={
                        this.props.selectedCell?.name === cell.getName()
                      }
                      editing={
                        this.props.selectedCell?.name === cell.getName() &&
                        this.props.selectedCell.editing
                      }
                      highlighted={cell.isHighlighted(
                        this.props.highlightedAreas
                      )}
                      singleHighlight={
                        cell.isHighlighted(this.props.highlightedAreas) &&
                        this.props.highlightedAreas.single
                      }
                    />
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    highlightedAreas: state.sheet.highlightedAreas,
  };
};

export default connect(mapStateToProps, {})(Sheet);
