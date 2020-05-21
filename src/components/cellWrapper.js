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
      const className = `${this.props.selected ? 'selected' : ''} ${
        this.props.editing ? 'editing' : ''
      }`;
      return (
        <td className={className}>
          <div className={`cell-wrapper ${className}`}>
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
