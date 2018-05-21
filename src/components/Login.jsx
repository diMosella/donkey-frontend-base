import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Login extends PureComponent {
  constructor (props) {
    super(props);
    this.registerElement = this.registerElement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    history.push('/');
    this.register[0].element.value = '';
  }

  render () {
    const { authorized, name } = this.props;
    return <div>
      <h1>Login page</h1>
      <span>{`Hello ${name} you are ${authorized ? 'truely' : 'not'} authorized.`}</span>
      <form onSubmit={this.handleSubmit}>
        <input name='userName' ref={this.registerElement} />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>;
  }
}

Login.propTypes = {
  onUserNameSubmit: PropTypes.func,
  authorized: PropTypes.bool,
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default Login;
