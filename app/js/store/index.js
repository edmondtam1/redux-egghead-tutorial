import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);


// const allTodos = Object.values(state.byId);
// switch (filter) {
//   case 'all':
//     return allTodos;
//   case 'completed':
//     return allTodos.filter(
//       t => t.completed
//     );
//   case 'active':
//     return allTodos.filter(
//       t => !t.completed
//     );
//   default:
//     throw new Error(`Unknown filter: ${filter}.`);
// }

// const visibilityFilter = (
//   state = 'SHOW_ALL',
//   action
// ) => {
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter;
//     default:
//       return state;
//   }
// };