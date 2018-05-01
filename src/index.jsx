import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './state/reducers';
import App from './components/App';

const store = createStore(todoApp);

document.addEventListener('DOMContentLoaded', event => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
});
