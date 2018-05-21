import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import AuthorizedRoute from '../containers/AuthorizedRoute';
import { BaseLayout, UnauthorizedLayout } from '../layouts';

class App extends PureComponent {
  render () {
    const { store } = this.props;
    return <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/auth' component={UnauthorizedLayout} />
          <AuthorizedRoute path='/' component={BaseLayout} />
          <Redirect to='/auth' />
        </Switch>
      </Router>
    </Provider>;
  }
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(App);
