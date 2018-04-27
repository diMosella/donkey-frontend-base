import { List, Map } from 'immutable';

const todo = (state = Map({}), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return Map({
        id: action.id,
        text: action.text,
        completed: false
      });
    case 'TOGGLE_TODO':
      if (state.get('id') !== action.id) {
        return state;
      }

      return state.update('completed', completed => !completed);
    default:
      return state;
  }
};

const todos = (state = List([]), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.push(
        todo(undefined, action)
      );
    case 'TOGGLE_TODO':
      return state.map(todoItemState =>
        todo(todoItemState, action)
      );
    default:
      return state;
  }
};

export default todos;
