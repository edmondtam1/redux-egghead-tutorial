const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      // corresponds to objects with todos schema
      ...action.response.entities.todos,
    };
  }
  return state;
  // switch (action.type) {
  //   // case 'ADD_TODO':
  //   // case 'TOGGLE_TODO':
  //   //   return {
  //   //     ...state,
  //   //     [action.id]: todo(state[action.id], action)
  //   //   };
  //   // REFACTOR
  //   case 'FETCH_TODOS_SUCCESS':
  //     const nextState = { ...state };
  //     action.response.forEach(todo => {
  //       nextState[todo.id] = todo;
  //     });
  //     return nextState;
  //   case 'ADD_TODO_SUCCESS':
  //     const obj = { ...state, [action.response.id]: action.response };
  //     delete obj.error;
  //     return obj;
  //   case 'ADD_TODO_FAILURE':
  //     return { ...state, error: action.message };
  //   default:
  //     return state;
  // }
};

export default byId;

export const getTodo = (state, id) => state[id];
export const getErrorMessage = (state) => state.byId.error;