import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HeaderedLayout extends PureComponent {
  render = () => {
    const { route } = this.props;
    const { header } = route;
    return (
      <div className='headeredLayout'>
        {header
          ? <header>
            {header}
          </header>
          : null}
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

HeaderedLayout.propTypes = {
  route: PropTypes.shape({
    footer: PropTypes.element
  }),
  children: PropTypes.element
};

export default HeaderedLayout;
