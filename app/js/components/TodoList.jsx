import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions'; // import all actions
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../store';
import FetchError from './FetchError';

const Todo = ({
  onClick,
  completed,
  text
}) => (
    <li
      onClick={onClick}
      style={{
        textDecoration:
          completed ?
            'line-through' :
            'none'
      }}
      className={
        completed ?
          'completed' :
          ''
      }
    >
      {text}
    </li>
  );

const TodoList = ({
  todos,
  onTodoClick
}) => (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  );

// container component that enhances TodoList presentation component
// with the data fetching logic
class VisibleTodoList extends Component {
  // componentDidMount only runs once
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    // REFACTOR: const { filter, receiveTodos } = this.props;

    // destructure filter and fetchTodos from actions
    // requestTodos, 
    const { filter, fetchTodos } = this.props;
    // REFACTOR: fetchTodos(filter).then(todos =>
    // receiveTodos(filter, todos)
    // );
    // requestTodos(filter);
    fetchTodos(filter).then(() => console.log('done!'));
  }

  render() {
    // actions are injected into the props by connected
    const { toggleTodo, todos, isFetching, errorMessage } = this.props;
    // Object.keys(rest): history,location,match,staticContext,todos,filter,fetchTodos,addTodo
    // console.log('render: ' + Object.keys(rest));
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

// using withRouter, can access params through ownProps.params
// typical usage: function mapStateToProps(state) {
//   return { todos: state.todos }
// }
const mapStateToProps = (state, { match: { params: { filter } } }) => {
  // previously ownProps.filter
  filter = filter || 'all';
  // Object.keys(state): byId,listByFilter
  // console.log('mapStateToProps:' + Object.keys(state));
  // returns an object with props
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter), // uses selector in store/index.js
    // pass in the filter too so that container component can filter
    filter
  }
};
// const mapDispatchToProps = (
//   dispatch
// ) => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id));
//   }
// });
// connect(mapStateToProps, mapDispatchToProps(presentationComponent)
// const mapStateToProps = (
// state
// ) => {
//   return {
//     todos: getVisibleTodos(
//       state.todos,
//     )
//   };
// };
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // mapDispatchToProps unnecessary
  // the common case where action creator arguments match the callback prop arguments
  // REFACTOR: by destructuring * as actions from './actions',
  // we can simply pass actions as all dispatches
  // { onTodoClick: toggleTodo, receiveTodos } 
  actions
)(VisibleTodoList));

export default VisibleTodoList;