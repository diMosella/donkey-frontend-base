import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addTodo } from '../state/actions';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <aside>{process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()} MODE` : 'MODE NOT SET'}</aside>
      <span />
      <form onSubmit={evt => {
        evt.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        <input ref={node => {
          input = node;
        }} />
        <button type='submit'>
          Add Todo
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
};

AddTodo = withRouter(connect()(AddTodo));

export default AddTodo;
