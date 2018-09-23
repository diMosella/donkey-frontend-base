import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';
import todos from './todos';
import visibility from './visibility';
import user from './user';
import { LOCALIZE_INITIAL_STATE as localizeInitialState } from './locale';

export const LOCALIZE_INITIAL_STATE = localizeInitialState;

const todoApp = combineReducers({
  todos,
  visibility,
  user,
  localize: localizeReducer
});

export default todoApp;
