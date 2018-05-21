import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import '../../styles/header.scss';
import AddTodo from '../../containers/AddTodo';

class HeaderLayout extends PureComponent {
  render = () => {
    const { match } = this.props;
    console.log('Env', process.env.NODE_ENV);
    return (
      <div className='headerLayout'>
        <aside>{process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()} MODE` : 'MODE NOT SET'}</aside>
        <nav>
          <NavLink to='/' exact activeClassName='active'>Home</NavLink>
          <NavLink to='/completed' exact activeClassName='active'>Completed</NavLink>
        </nav>
        <Route path={match.path} exact component={AddTodo} />
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
