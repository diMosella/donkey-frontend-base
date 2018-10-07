import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

class Welcome extends PureComponent {
  render () {
    const { translate } = this.props;
    return <div className='page'>
      <h1>{translate('main.welcome.title')}</h1>
      <p>{translate('main.welcome.text')}</p>
    </div>;
  }
}

Welcome.propTypes = {
  translate: PropTypes.func.isRequired
};

export default withLocalize(Welcome);
