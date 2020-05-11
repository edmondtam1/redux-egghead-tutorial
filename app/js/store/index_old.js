// import { combineReducers } from 'redux';
// import todos, * as fromTodos from './todos';

// const todoApp = combineReducers({
//   todos,
//   // visibilityFilter
// });

// // default export is always reducer function
// // `selectors`: any named exports starting with "get" prepare the data to be prepared by the UI
// // Dan Abramov: export selectors with related reducers. They let you decouple views and action creators from state shape.
// export default todoApp;

// export const getVisibleTodos = (state, filter) =>
//   // here we control what to pass down to `todos.getVisibleTodos`
//   // instead of in the 
//   fromTodos.getVisibleTodos(state.todos, filter);