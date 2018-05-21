import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthorizedRoute extends PureComponent {
  render () {
    const { component : Component, authorizationPending, authorized, ...rest } = this.props;
    console.log('pr', this.props);
    return (
      <Route {...rest} render={(props) => {
        if (authorizationPending) {
          return <div>Loading...</div>;
        }
        return authorized
          ? <Component {...props} />
          : <Redirect to='/auth/login' />;
      }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorizationPending: state.user.authorizationPending,
    authorized: state.user.authorized
  };
};

AuthorizedRoute.propTypes = {
  component: PropTypes.func,
  authorizationPending: PropTypes.bool,
  authorized: PropTypes.bool
};

export default connect(mapStateToProps)(AuthorizedRoute);
