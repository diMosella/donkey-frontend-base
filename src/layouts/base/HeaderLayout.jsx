import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/header.scss';
import AddTodo from '../../components/AddTodo';
import { addTodo } from '../../state/actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoTextSubmit: (text) => {
      dispatch(addTodo(text));
    }
  };
};

class HeaderLayout extends PureComponent {
  render = () => {
    const { match } = this.props;
    return (
      <div className='headerLayout'>
        <div>
          <aside>Simple Todos</aside>
          <nav />
          <Route path={`${match.path}todos`} exact component={connect(mapStateToProps, mapDispatchToProps)(AddTodo)} />
          <aside>{process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()} MODE` : 'MODE NOT SET'}</aside>
        </div>
        <div>
          <nav>
            <NavLink to={match.path} exact activeClassName='active'>Home</NavLink>
            <NavLink to={`${match.path}auth`} activeClassName='active'>Login</NavLink>
            <NavLink to={`${match.path}todos`} exact activeClassName='active'>Todos</NavLink>
            <NavLink to={`${match.path}todos/completed`} exact activeClassName='active'>Completed</NavLink>
          </nav>
        </div>
      </div>
    );
  }
}

HeaderLayout.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default HeaderLayout;
