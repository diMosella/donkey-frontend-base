import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialize, addTranslationForLanguage, getTranslate } from 'react-localize-redux';
import '../../styles/base.scss';
import { AVAILABLE_LANGUAGES_INITIAL_STATE } from '../../state/reducers';
import { HeaderLayout, UnauthorizedLayout } from '../';
import AuthorizedRoute from '../../containers/AuthorizedRoute';
import VisibleTodoList from '../../containers/VisibleTodoList';
import CompletedTodoList from '../../containers/CompletedTodoList';
import Welcome from '../../components/Welcome';
import Footer from '../../components/Footer';

const mapDispatchToProps = (dispatch) => {
  return {
    initializeAvailableLanguages: (defaultLanguage) => {
      dispatch(initialize({
        languages: AVAILABLE_LANGUAGES_INITIAL_STATE,
        options: { defaultLanguage: defaultLanguage }
      }));
    },
    addTranslationsForLanguage: (translations, language) => {
      dispatch(addTranslationForLanguage(translations, language));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.localize)
  };
};

class BaseLayout extends PureComponent {
  constructor (props) {
    super(props);
    props.initializeAvailableLanguages('en');
  }

  componentDidMount = () => {
    const { addTranslationsForLanguage } = this.props;
    addTranslationsForLanguage({ 'appTitle': 'Simpel activiteitenlijstje' }, 'du');
    addTranslationsForLanguage({ 'appTitle': 'Simple Todos' }, 'en');
  }

  render = () => {
    const { match } = this.props;
    return <div className='baseLayout'>
      <header>
        <Route component={connect(mapStateToProps)(HeaderLayout)} />
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
  initializeAvailableLanguages: PropTypes.func,
  addTranslationsForLanguage: PropTypes.func,
  match: PropTypes.shape({
    path: PropTypes.string
  })
};

export default connect(null, mapDispatchToProps)(BaseLayout);
