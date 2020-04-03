
import React from 'react';
import PropTypes from 'prop-types';
import filterTypes from './const/filter';

const Footer = ({ count, activeFilter, onSetFilter, onClearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">
      {`${count} tasks left`}
    </span>
    <ul className="filters">
      {Object.values(filterTypes).map(type => (
        <li key={type}>
          <button
            type="button"
            className={activeFilter === type ? 'selected' : ''}
            onClick={() => onSetFilter(type)}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
    <button
      type="button"
      className="clear-completed"
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
