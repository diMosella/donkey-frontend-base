import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

class Login extends PureComponent {
  constructor (props) {
    super(props);
    this.registerElement = this.registerElement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.register = [];
  }

  /**
   * Registers the category child DOM elements, as it's necessary to interact with them
   * @param {HTMLElement} element The element to register
   */
  registerElement (element) {
    const name = element ? (element.name || element.props.name) : null;
    if (name) {
      this.register.push({ name: name, element: element });
    }
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { onUserNameSubmit, history } = this.props;
    if (this.register.length !== 1 || !this.register[0].element.value.trim()) {
      return;
    }
    onUserNameSubmit(this.register[0].element.value);
    history.push('/todos');
    this.register[0].element.value = '';
  }

  handleClick (evt) {
    evt.preventDefault();
    const { logOut, history } = this.props;
    logOut();
    history.push('/');
    this.register[0].element.value = '';
  }

  render () {
    const { authorized, name, translate } = this.props;
    return <div>
      <h1>{translate('main.login.title')}</h1>
      <span>{translate(`main.login.status.${authorized ? 'true' : 'false'}`, { name: name ? ` ${name}` : '' })}</span>
      <form onSubmit={this.handleSubmit}>
        <input name='userName' ref={this.registerElement} disabled={authorized} />
        <button type='submit' disabled={authorized}>
          {translate('main.login.actions.enter')}
        </button>
      </form>
      <button onClick={this.handleClick} disabled={!authorized}>
        {translate('main.login.actions.exit')}
      </button>
    </div>;
  }
}

Login.propTypes = {
  onUserNameSubmit: PropTypes.func,
  logOut: PropTypes.func,
  authorized: PropTypes.bool,
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  translate: PropTypes.func
};

export default withLocalize(Login);
