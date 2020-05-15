import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default ChildComponent => {
  class CellWrapper extends Component {
    showSquare() {
      if (this.props.selected && !this.props.editing) {
        return <div className="cell-square"></div>;
      }
    }

    render() {
      return (
        <td className={this.props.selected ? 'selected' : ''}>
          <div className="cell-wrapper">
            <ChildComponent
              {...this.props}
              selected={this.props.selected}
              editing={this.props.editing}
            />
            {this.showSquare()}
          </div>
        </td>
      );
    }
  }

  return CellWrapper;
};
