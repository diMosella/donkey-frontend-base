import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FooteredLayout extends PureComponent {
  render = () => {
    const { route } = this.props;
    const { footer } = route;
    return (
      <div className='footeredLayout'>
        <div className='content'>
          {this.props.children}
        </div>
        {footer
          ? <footer>
            {footer}
          </footer>
          : null}
      </div>
    );
  }
}

FooteredLayout.propTypes = {
  route: PropTypes.shape({
    footer: PropTypes.element
  }),
  children: PropTypes.element
};

export default FooteredLayout;
