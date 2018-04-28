import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

class TodoList extends PureComponent {
  render () {
    const { todos, onTodoClick } = this.props;
    return <ul className='todo-list'>
      { todos.valueSeq().map(todo =>
        <Todo key={todo.get('id')}
          completed={todo.get('completed')}
          text={todo.get('text')}
          onClick={() => onTodoClick(todo.get('id'))} />
      ) }
    </ul>;
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
