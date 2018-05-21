import { connect } from 'react-redux';
import { VISIBILITY_FILTERS, toggleTodo } from '../state/actions';

import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VISIBILITY_FILTERS.SHOW_ALL:
      return todos;
    case VISIBILITY_FILTERS.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibility.filter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
