import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import appReducers from './state/reducers';
import App from './components/App';

const store = process.env.NODE_ENV === 'development'
  ? createStore(
    appReducers,
    // preloadedstate,
    devToolsEnhancer()
  )
  : createStore(appReducers);

document.addEventListener('DOMContentLoaded', event => {
  render(
    <App store={store} />,
    document.querySelector('#app')
  );
});
