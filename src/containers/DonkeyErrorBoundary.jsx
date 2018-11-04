import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DonkeyErrorBoundary extends PureComponent {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error) {
    console.log('[ Donkey ]: will render fallback since an error has been thrown', JSON.stringify(error));
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    console.warn('[ Donkey ]: an error has been thrown', JSON.stringify(error), JSON.stringify(info));
  }

  render () {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError
      ? <h1>[ Donkey ]: something went wrong.</h1>
      : children;
  }
}

DonkeyErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default DonkeyErrorBoundary;
