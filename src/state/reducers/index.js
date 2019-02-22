// import { combineReducers } from 'redux';
// import { localizeReducer } from 'react-localize-redux';
import importedReducerRegistry, { EVENTS as IMPORTED_EVENTS } from './reducerRegistry';
// import todos from './todos';
// import visibility from './visibility';
// import user from './user';
import { LOCALIZE_INITIAL_STATE as localizeInitialState } from './locale';

export const LOCALIZE_INITIAL_STATE = localizeInitialState;
export const EVENTS = IMPORTED_EVENTS;
export const reducerRegistry = importedReducerRegistry;

// const appReducers = combineReducers({
//   todos,
//   visibility,
//   user,
//   localize: localizeReducer
// });
// const appReducers = (registeredReducers = {}) => combineReducers(registeredReducers);

// export default appReducers;
