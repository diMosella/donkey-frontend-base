import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { PureComponent, Suspense, lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: 'project1' */ './routes/Home'));
const About = lazy(() => import(/* webpackChunkName: 'project2' */'./routes/About'));

class App extends PureComponent {
  render () {
    return <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>;
  }
};

export default App;
