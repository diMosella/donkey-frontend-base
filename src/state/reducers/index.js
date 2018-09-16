import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';
import todos from './todos';
import visibility from './visibility';
import user from './user';
import { AVAILABLE_LANGUAGES_INITIAL_STATE as initialState } from './locale';

// Named languages, for
export const AVAILABLE_LANGUAGES_INITIAL_STATE = initialState;

const todoApp = combineReducers({
  todos,
  visibility,
  user,
  localize: localizeReducer
});

export default todoApp;
