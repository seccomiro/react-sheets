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
      const selectedClass = `${this.props.selected ? 'selected' : ''} ${
        this.props.editing ? 'editing' : ''
      } ${this.props.highlighted ? 'highlighted' : ''}`;

      return (
        <td className={selectedClass}>
          <div className={`cell-wrapper ${selectedClass}`}>
            <ChildComponent
              {...this.props}
              selected={this.props.selected}
              editing={this.props.editing}
              highlighted={this.props.highlighted}
            />
            {this.showSquare()}
          </div>
        </td>
      );
    }
  }

  return CellWrapper;
};
