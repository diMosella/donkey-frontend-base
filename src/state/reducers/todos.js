import produce from 'immer';
import { ACTION_TYPES } from '../actions';

/**
 * Initial state needed to provide base data structure
 */
const TODO_INITIAL_STATE = {
  id: null,
  text: null,
  completed: false
};

const todo = (state = TODO_INITIAL_STATE, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case ACTION_TYPES.ADD_TODO:
        draftState.id = action.id;
        draftState.text = action.text;
        break;
      case ACTION_TYPES.TOGGLE_TODO:
        if (draftState.id === action.id) {
          draftState.completed = !state.completed;
        }
        break;
    }
  });

const todos = (state = [], action) =>
  produce(state, draftState => {
    switch (action.type) {
      case ACTION_TYPES.ADD_TODO:
        draftState.push(todo(undefined, action));
        break;
      case ACTION_TYPES.TOGGLE_TODO:
        const itemIndex = draftState.findIndex(item => item.id === action.id);
        draftState[itemIndex] = todo(draftState[itemIndex], action);
        break;
    }
  });

export default todos;
