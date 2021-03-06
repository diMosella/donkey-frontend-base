import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends PureComponent {
  render () {
    const { todos, onTodoClick } = this.props;
    return <ul className='todo-list'>
      { todos.map(todo =>
        <Todo key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)} />
      ) }
    </ul>;
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
