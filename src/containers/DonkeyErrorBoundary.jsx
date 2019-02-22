import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import donkeyLog from '../utils/donkey-log';

class DonkeyErrorBoundary extends PureComponent {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error) {
    donkeyLog.info('will render fallback since an error has been thrown', JSON.stringify(error, null, 2));
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    donkeyLog.warning('an error has been thrown', JSON.stringify(error, null, 2), JSON.stringify(info, null, 2));
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
