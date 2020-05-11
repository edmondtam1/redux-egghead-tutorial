import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import Footer from './Footer.jsx';

const TodoApp = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
);
TodoApp.propTypes = {
  match: PropTypes.object,
};

const AppRoot = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:filter?" render={props => <TodoApp {...props} />} />
    </BrowserRouter>
  </Provider>
);

export default AppRoot; 