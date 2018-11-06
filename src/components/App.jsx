import React, { PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import DonkeyErrorBoundary from '../containers/DonkeyErrorBoundary';

const ProjectComponent = lazy(() =>
  import(/* webpackChunkName: 'project' */ __PROJECT_FEATURE__
    ? `../project/${__PROJECT_MAIN_COMPONENT__}`
    : '../layouts/base/BaseLayout')
);

class App extends PureComponent {
  render () {
    const { store } = this.props;
    return <Provider store={store}>
      <LocalizeProvider store={store}>
        <Router>
          <DonkeyErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path='/' component={props => <ProjectComponent {...props} />} />
            </Suspense>
          </DonkeyErrorBoundary>
        </Router>
      </LocalizeProvider>
    </Provider>;
  }
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(App);
