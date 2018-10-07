import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import '../../styles/header.scss';
import AddTodo from '../../components/AddTodo';
import LanguageList from '../../components/LanguageList';
import { addTodo } from '../../state/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoTextSubmit: (text) => {
      dispatch(addTodo(text));
    }
  };
};

class HeaderLayout extends PureComponent {
  render = () => {
    const { match, translate } = this.props;
    return (
      <div className='headerLayout'>
        <div>
          <aside>{translate('heading.appTitle')}</aside>
          <nav />
          <Route path={`${match.path}todos`} exact component={connect(null, mapDispatchToProps)(AddTodo)} />
          <aside><LanguageList /></aside>
          <aside>{process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()} MODE` : 'MODE NOT SET'}</aside>
        </div>
        <div>
          <nav>
            <NavLink to={match.path} exact activeClassName='active'>{translate('heading.nav.landing')}</NavLink>
            <NavLink to={`${match.path}auth`} activeClassName='active'>{translate('heading.nav.enter')}</NavLink>
            <NavLink to={`${match.path}todos`} exact activeClassName='active'>{translate('heading.nav.list')}</NavLink>
            <NavLink to={`${match.path}todos/completed`} activeClassName='active'>{translate('heading.nav.ready')}</NavLink>
          </nav>
        </div>
      </div>
    );
  }
}

HeaderLayout.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }),
  translate: PropTypes.func
};

export default withLocalize(HeaderLayout);
