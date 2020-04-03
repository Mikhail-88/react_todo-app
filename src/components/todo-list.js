import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todo-item';

const TodoList = ({ todos, deleteTodo, checkTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteTodo={() => deleteTodo(todo.id)}
        checkTodo={checked => checkTodo(todo.id, checked)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};

export default TodoList;
