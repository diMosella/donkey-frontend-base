import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

class AddTodo extends PureComponent {
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
    const { onTodoTextSubmit } = this.props;
    if (this.register.length !== 1 || !this.register[0].element.value.trim()) {
      return;
    }
    onTodoTextSubmit(this.register[0].element.value);
    this.register[0].element.value = '';
  }

  render () {
    const { translate } = this.props;
    return <form onSubmit={this.handleSubmit}>
      <input name='todoText' ref={this.registerElement} />
      <button type='submit'>
        {translate('heading.actions.add')}
      </button>
    </form>;
  }
}

AddTodo.propTypes = {
  onTodoTextSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func
};

export default withLocalize(AddTodo);
