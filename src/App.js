import React, { Component } from 'react';
import NewTodo from './components/new-todo';
import TodoList from './components/todo-list';
import Footer from './components/todo-footer';
import filterTypes from './components/const/filter';

class App extends Component {
  state = {
    todos: [],
    activeFilter: filterTypes.all,
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      const todos = JSON.parse(storedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  }

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  }

  filterTodos = () => {
    const { todos, activeFilter } = this.state;

    switch (activeFilter) {
      case filterTypes.all:
        return [...todos];
      case filterTypes.active:
        return todos.filter(todo => !todo.completed);
      case filterTypes.completed:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }

  checkTodo = (id, checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: checked,
        };
      }),
    }));
  }

  toggleAll = () => {
    const { todos } = this.state;

    this.setState((prevState) => {
      if (todos.every(todo => todo.completed)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: false,
          })),
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  }

  render() {
    const { todos, activeFilter } = this.state;
    const filteredTodos = this.filterTodos();
    const checkComplete = todos.every(todo => todo.completed);
    const count = todos.filter(todo => !todo.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>
        <main className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
            checked={checkComplete}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={filteredTodos}
            deleteTodo={this.deleteTodo}
            checkTodo={this.checkTodo}
          />
        </main>
        <Footer
          count={count}
          activeFilter={activeFilter}
          onSetFilter={this.setFilter}
          onClearCompleted={this.clearAllCompleted}
        />
      </section>
    );
  }
}

export default App;
