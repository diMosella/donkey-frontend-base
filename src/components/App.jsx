import React, { PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import DonkeyErrorBoundary from '../containers/DonkeyErrorBoundary';
import BaseLayout from '../layouts/base/BaseLayout';

console.log(typeof lazy, typeof Suspense);
console.log('isProj', JSON.stringify(__PROJECT_FEATURE__));
console.log('projMain', __PROJECT_MAIN_COMPONENT__, JSON.stringify(__PROJECT_MAIN_COMPONENT__));
// const ProjectComponent = lazy(() => import(/* webpackChunkName: 'project' */ JSON.stringify(__PROJECT_MAIN_COMPONENT__)));
const ProjectComponent = lazy(() => import(/* webpackChunkName: 'project' */ '../../../donkey-frontend-example-todo/src/containers/App'));

// const ProjectComponent = lazy(() => import(/* webpackChunkName: 'project2' */'./routes/About'));

class App extends PureComponent {
  render () {
    const { store } = this.props;
    return <Provider store={store}>
      <LocalizeProvider store={store}>
        <Router>
          {__PROJECT_FEATURE__
            ? <DonkeyErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <Route path='/' component={props => <ProjectComponent {...props} />} />
              </Suspense>
            </DonkeyErrorBoundary>
            : <Route path='/' component={BaseLayout} />
          }
        </Router>
      </LocalizeProvider>
    </Provider>;
  }
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(App);
