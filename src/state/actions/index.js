let nextTodoId = 0;

export const ACTION_TYPES = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  AUTHORIZE_USER: 'AUTHORIZE_USER'
};

export const KNOWN_USERS = {
  Wim: 'Wim'
};

export const VISIBILITY_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const addTodo = (text) => {
  return {
    type: ACTION_TYPES.ADD_TODO,
    id: nextTodoId++,
    text
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: ACTION_TYPES.SET_VISIBILITY_FILTER,
    filter
  };
};

export const toggleTodo = (id) => {
  return {
    type: ACTION_TYPES.TOGGLE_TODO,
    id
  };
};

export const authorizeUser = (userName) => {
  return {
    type: ACTION_TYPES.AUTHORIZE_USER,
    userName
  };
};
