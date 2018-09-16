import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import todoApp from './state/reducers';
import App from './components/App';

const store = createStore(todoApp);

document.addEventListener('DOMContentLoaded', event => {
  render(
    <App store={store} />,
    document.querySelector('#app')
  );
});
