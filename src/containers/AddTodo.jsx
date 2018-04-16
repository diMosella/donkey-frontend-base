import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../state/actions';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        {process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()} MODE` : 'MODE NOT SET'}<br />
        <hr />
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

AddTodo = connect()(AddTodo);

export default AddTodo;
