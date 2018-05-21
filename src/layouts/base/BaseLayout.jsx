import React, { PureComponent } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import '../../styles/base.scss';
import { HeaderLayout } from '../';
import VisibleTodoList from '../../containers/VisibleTodoList';
import CompletedTodoList from '../../containers/CompletedTodoList';
import Footer from '../../components/Footer';

class BaseLayout extends PureComponent {
  render = () =>
    <div className='baseLayout'>
      <header>
        <Route component={HeaderLayout} />
      </header>
      <main>
        <Switch>
          <Route path='/' exact component={VisibleTodoList} />
          <Route path='/completed' component={CompletedTodoList} />
        </Switch>
      </main>
      <footer>
        <Route path='/' exact component={Footer} />
      </footer>
    </div>;
}

export default withRouter(BaseLayout);
