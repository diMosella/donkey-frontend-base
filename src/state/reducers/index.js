import { combineReducers } from 'redux';
import todos from './todos';
import visibility from './visibility';
import user from './user';

const todoApp = combineReducers({
  todos,
  visibility,
  user
});

export default todoApp;
