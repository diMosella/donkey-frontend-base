import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Link extends PureComponent {
  render () {
    const { active, children, onClick } = this.props;
    if (active) {
      return <span>{children}</span>;
    }

    let onClickLocal = (event) => {
      event.preventDefault();
      onClick();
    };

    return (
      <a href='#' onClick={onClickLocal}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
