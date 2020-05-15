import React from 'react';
import { connect } from 'react-redux';
import {
  updateCell,
  updateEditingCell,
  editCell,
  selectCell,
  nextColumn,
  nextRow,
  previousColumn,
  previousRow,
} from '../actions';
import cellWrapper from './cellWrapper';

class Cell extends React.Component {
  componentDidMount() {
    if (this.field) {
      this.field.focus();
    }
  }

  componentDidUpdate() {
    if (this.field) {
      this.field.focus();
    }
  }

  onChange = e => {
    this.props.updateEditingCell(e.target.value);
  };

  onEditCell = e => {
    this.props.editCell(this.props.name, true);
  };

  onSelectCell = e => {
    this.props.selectCell(this.props.name, true);
  };

  onEditingKeyDown = e => {
    if (e.which === 9) this.nextElement('Column', e, false, true);
    else if (e.which === 13) this.nextElement('Row', e, false, true);
    else if (e.which === 37) this.nextElement('Column', e, true, true);
    else if (e.which === 38) this.nextElement('Row', e, true, true);
    else if (e.which === 39) this.nextElement('Column', e, false, true);
    else if (e.which === 40) this.nextElement('Row', e, false, true);
    else if (e.which === 27) this.props.selectCell(this.props.name, true);
  };

  onSelectedKeyDown = e => {
    if (e.which === 113 || e.which === 13) {
      e.preventDefault();
      this.props.editCell(this.props.name, true);
    } else if (e.which === 9) this.nextElement('Column', e);
    else if (e.which === 37) this.nextElement('Column', e, true);
    else if (e.which === 38) this.nextElement('Row', e, true);
    else if (e.which === 39) this.nextElement('Column', e);
    else if (e.which === 40) this.nextElement('Row', e);
    else if (this.printableKey(e.which)) {
      e.preventDefault();
      this.props.editCell(this.props.name, true, this.printableKey(e.which));
    }
  };

  nextElement = (type, e, previous = false, save = false) => {
    e.preventDefault();
    const way = previous ? 'previous' : 'next';
    if (save) {
      this.props.updateCell(this.props.name, e.target.value);
    }
    this.props[`${way}${type}`]();
  };

  printableKey(key) {
    // return (
    // // OLD
    // (key > 47 && key < 58) || // number keys
    // key === 32 ||
    // (key > 64 && key < 91) || // letter keys
    // (key > 95 && key < 112) || // numpad keys
    // (key > 185 && key < 193) || // ;=,-./` (in order)
    // (key > 218 && key < 223) // [\]' (in order)
    // // NEW
    // (key >= 48 && key <= 90) ||
    // (key >= 96 && key <= 111) ||
    // (key >= 186 && key <= 222)
    // );

    // Only letters, numbers and equal for now
    if (key >= 48 && key <= 90) {
      return String.fromCharCode(key);
    } else if (key >= 96 && key <= 105) {
      return String.fromCharCode(key - 48);
    } else if (key === 187) {
      return '=';
    }
    return false;
  }

  onBlur = e => {
    this.props.updateCell(this.props.name, e.target.value);
  };

  render() {
    if (this.props.selected) {
      if (this.props.editing) {
        return (
          <div className="cell selected">
            <input
              onKeyDown={this.onEditingKeyDown}
              onChange={this.onChange}
              onBlur={this.onBlur}
              type="text"
              value={this.props.selectedCell.tempFormula}
              autoFocus
            />
          </div>
        );
      } else {
        return (
          <div
            ref={field => (this.field = field)}
            className="cell selected"
            onClick={this.onSelectCell}
            onDoubleClick={this.onEditCell}
            onKeyDown={this.onSelectedKeyDown}
            tabIndex="0"
          >
            <div>{this.props.cell.value || '\u00A0'}</div>
          </div>
        );
      }
    } else {
      return (
        <div
          className="cell"
          onClick={this.onSelectCell}
          onDoubleClick={this.onEditCell}
        >
          <div>{this.props.cell.value || '\u00A0'}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const cell = state.sheet.sheet.findCell(ownProps.name);
  return { selectedCell: state.sheet.selectedCell, cell };
};

export default cellWrapper(
  connect(mapStateToProps, {
    updateCell,
    updateEditingCell,
    editCell,
    selectCell,
    nextColumn,
    nextRow,
    previousColumn,
    previousRow,
  })(Cell)
);
