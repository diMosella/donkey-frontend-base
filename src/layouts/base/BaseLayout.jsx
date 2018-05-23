import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../../styles/base.scss';
import { HeaderLayout, UnauthorizedLayout } from '../';
import AuthorizedRoute from '../../containers/AuthorizedRoute';
import VisibleTodoList from '../../containers/VisibleTodoList';
import CompletedTodoList from '../../containers/CompletedTodoList';
import Welcome from '../../components/Welcome';
import Footer from '../../components/Footer';

class BaseLayout extends PureComponent {
  render = () => {
    const { match } = this.props;
    return <div className='baseLayout'>
      <header>
        <Route component={HeaderLayout} />
      </header>
      <main>
        <Switch>
          <Route path={match.path} exact component={Welcome} />
          <Route path={`${match.path}auth`} component={UnauthorizedLayout} />
          <AuthorizedRoute path={`${match.path}todos/:completed`} component={CompletedTodoList} />
          <AuthorizedRoute path={`${match.path}todos`} component={VisibleTodoList} />
          <Redirect to='/auth' />
        </Switch>
      </main>
      <footer>
        <Route path={`${match.path}todos`} component={Footer} />
      </footer>
    </div>;
  }
}

BaseLayout.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  })
};

export default BaseLayout;
