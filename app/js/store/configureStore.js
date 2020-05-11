import todos from './index';
// import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// const logger = (store) =>
//   // store.dispatch is a callback
//   // this wraps the uncalled function with logging capability
//   (next) => {
//     if (!console.group) return next;

//     return (action) => {
//       console.group(action.type);
//       console.log('%c prev state', 'color: blue', store.getState());
//       console.log('%c action', 'color: yellow', action);
//       const returnValue = next(action);
//       console.log('%c next state', 'color: green', store.getState());
//       console.groupEnd(action.type);
//       return returnValue;
//     }
//   };

// invoked in order of middleware -> takes store -> takes dispatch
// fn -> takes action for dispatch fn -> returns sync or async call
// const promise = (store) =>
//   // this wraps the function in a promise handler
//   // allowing store.dispatch to take a promise `action`,
//   // otherwise it'll dispatch the sync function action
//   (next) => (action) => {
//     if (typeof action.then === 'function') {
//       return action.then(next);
//     }
//     return next(action);
//   };

// by wrapping functions with middlewares, every action passed
// to a dispatch will call these middlewares first
// currently store.dispatch is:
// promise(store)(logger(store)(store.actualDispatch))

// hence when we call it with an action, the function chain is:
// promise(store)(logger(store)(store.actualDispatch))(action)
// which resolves to
// promise(store)(logger(store)(next))(action)
// logger(store)(next)(action) resolves to (next)(action) or (next(action)) according to if/else above

// so the middleware function chain now becomes:
// promise(store)(next(action))
// which returns the sync or async result of next(action)

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch));
// };
// REFACTOR: applyMiddleware from 'redux'

// only plain object actions reach logger then reach reducers
// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function' ?
//   // pass store.dispatch as arg to actionFn
//   action(store.dispatch, store.getState) :
//   // pass action as arg to next dispatchFn
//   next(action);

const configureStore = () => {
  // this causes promise to resolve before logging is done
  // const middlewares = [promise];
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  // createStore(reducers, persistedState, enhancers);
  // middleware is last argument known as 'enhancer'
  return createStore(
    todos,
    // persistedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;