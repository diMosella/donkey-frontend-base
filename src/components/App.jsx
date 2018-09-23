import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { BaseLayout } from '../layouts';

class App extends PureComponent {
  render () {
    const { store } = this.props;
    return <Provider store={store}>
      <LocalizeProvider store={store}>
        <Router>
          <Route path='/' component={BaseLayout} />
        </Router>
      </LocalizeProvider>
    </Provider>;
  }
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(App);
