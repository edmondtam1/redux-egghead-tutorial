import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsFetching } from '../store/createList';

// export const requestTodos = (filter) => ();

// this returns an action object
// const receiveTodos = (filter, response) => ();

// REFACTOR: allow function to take another callback to handle promises
// now fetchTodos returns a function as an action, rather than a plain object as an action
// a function as an action is a thunk
// export const fetchTodos = (filter) =>
//   api.fetchTodos(filter).then(response =>
//     receiveTodos(filter, response)
//   );
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return Promise.resolve();
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  // don't use .then().catch() because there may be an error in
  // a reducer or component while handling this action
  // which is then accidentally displayed to the user
  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos),
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      })
    });
};

// returns a thunk
export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(
    response =>
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    }),
    error =>
    dispatch({
      type: 'ADD_TODO_FAILURE',
      message: error.message || 'Couldn\'t add todo.',
    })
  );

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  });

// export const addTodo = (text) => ({
//   type: 'ADD_TODO',
//   id: v4(),
//   text
// });

// export const toggleTodo = (id) => ({
//   type: 'TOGGLE_TODO',
//   id
// });