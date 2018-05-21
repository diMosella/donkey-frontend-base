import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorizeUser } from '../../state/actions';
import Login from '../../components/Login';

const mapStateToProps = (state) => {
  return {
    authorized: state.user.authorized,
    name: state.user.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserNameSubmit: (userName) => {
      dispatch(authorizeUser(userName));
    }
  };
};

class UnauthorizedLayout extends PureComponent {
  render () {
    return <div className='unauthorizedLayout'>
      <Switch>
        <Route path='/auth/login' component={connect(mapStateToProps, mapDispatchToProps)(Login)} />
        <Redirect to='/auth/login' />
      </Switch>
    </div>;
  }
}

export default UnauthorizedLayout;
