import { connect } from 'react-redux';
import { toggleTodo } from '../state/actions';

import TodoList from '../components/TodoList';

const mapStateToProps = (state) => {
  return {
    todos: state.todos.filter(todo => todo.completed)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

const CompletedTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default CompletedTodoList;
