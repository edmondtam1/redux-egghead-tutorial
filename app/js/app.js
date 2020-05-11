import ReactDOM from 'react-dom';
import React from 'react';
import AppRoot from './components/AppRoot.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(< AppRoot store={store} />,
  document.getElementById('app-root')
);