import React, {Component} from 'react'
import './App.css';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ""
    };
    this.createNewTodo = this.createNewTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  pluralize(todos) {
    return todos.length === 0 || todos.length > 1 ?
      "items" :
      "item";
  }

  generateId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line no-mixed-operators
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  createNewTodo(event) {
    if(event.key === "Enter" && event.target.value) {
      const updatedTodos = [{value: event.target.value.trim(), completed: false, id: this.generateId()}].concat(this.state.todos);
      this.setState({todos: updatedTodos, inputValue: ""});
    }
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input onKeyDown={this.createNewTodo} onChange={this.handleChange} className="new-todo" value={this.state.inputValue} placeholder="What is to be done?" autoFocus />
        </header>
  
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.state.todos.map(todo =>
            <li key={todo.id}>
              <div className="view">
                <input className="toggle" type="checkbox" {...todo.completed && "checked"}/>
                <label>{todo.value}</label>
                <button className="destroy"></button>
              </div>
              {/* <input className="edit" value="Create a TodoMVC template" /> */}
            </li>
            )}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">{this.state.todos.length} {this.pluralize(this.state.todos)} left</span>
          <ul className="filters">
          <li>
              <a className="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
        </footer>
      </section>
    );
  }

  
}

export default App;
