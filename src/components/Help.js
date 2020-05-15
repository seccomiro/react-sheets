import React from 'react';

const Help = () => (
  <div className="help">
    <p>
      This app is a work in progress by{' '}
      <a
        href="https://www.linkedin.com/in/diegostiehl"
        rel="noopener noreferrer"
        target="_blank"
      >
        Diego Stiehl
      </a>
      . You can see its code here:{' '}
      <a
        href="https://github.com/seccomiro/react-sheets"
        rel="noopener noreferrer"
        target="_blank"
      >
        https://github.com/seccomiro/react-sheets
      </a>
      .
    </p>
    <p>At this point in time you can:</p>
    <ul>
      <li>
        Navigate through cells (enabling editing of them) using <em>TAB</em>,{' '}
        <em>ENTER</em>, <em>arrows</em> and <em>mouse</em>.
      </li>
      <li>
        Edit cells using <em>F2</em> and <em>ENTER</em>.
      </li>
      <li>
        Cancel editing using <em>ESC</em>.
      </li>
      <li>
        Type numeric values, like <em>10</em> or <em>99.56</em> at any available
        cell.
      </li>
      <li>
        Type simple math formulas using the cells, like:{' '}
        <em>=A1+(B2/C3)*D5-10</em> (try to avoid circular references because
        it's not solved yet).
      </li>
      <li>
        Edit the values of cells yout pointed on any formula and watch the{' '}
        <em>automatic recalculation</em> of the entire spreadsheet.
        <ul>
          <li>
            Tip: Try to write a formula that depends on two cells that have
            formulas that depends on other cells that have regular numbers asnd,
            after that, change these regular numbers.
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default Help;
