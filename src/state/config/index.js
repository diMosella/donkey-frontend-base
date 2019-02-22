import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducerRegistry, EVENTS } from './state/reducers';

export default function configureStore (initialState) {
  const store = process.env.NODE_ENV === 'development'
    ? createStore(
      reducerRegistry.compose,
      // preloadedstate,
      devToolsEnhancer()
    )
    : createStore(reducerRegistry.compose);

  reducerRegistry.addEventListener(EVENTS.CHANGE, registeredReducers => {
    store.replaceReducer(registeredReducers);
  });

  return store;
};
