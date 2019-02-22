import React from 'react';
import { render } from 'react-dom';
import configureStore from './state/config';
import App from './components/App';

const store = configureStore();

document.addEventListener('DOMContentLoaded', event => {
  render(
    <App store={store} />,
    document.querySelector('#app')
  );
});
