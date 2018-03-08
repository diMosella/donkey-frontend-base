import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

createStore(todoApp).then((store) => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
});
