import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, deleteTodo, checkTodo }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div>
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        onChange={({ target }) => checkTodo(target.checked)}
        checked={todo.completed}
      />
      <label
        htmlFor={todo.id}
        className={todo.completed ? 'checked' : ''}
      >
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={deleteTodo}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};

export default TodoItem;
