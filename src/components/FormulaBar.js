import React from 'react';
import FormulaInput from './FormulaInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const FormulaBar = () => (
  <div className="formula-bar">
    <div className="icon">
      <FontAwesomeIcon icon={faCalculator} />
    </div>
    <FormulaInput atFormulaBar={true} />
  </div>
);

export default FormulaBar;
