import React, { PureComponent, PropTypes } from 'react';

class Todo extends PureComponent {
  render () {
    const { onClick, completed, text } = this.props;
    const style = { textDecoration: completed ? 'line-through' : 'none' };
    return <li
      className='todo' onClick={onClick} style={style}>
      { text }
    </li>;
  }
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
