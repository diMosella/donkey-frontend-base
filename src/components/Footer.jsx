import React, { PureComponent } from 'react';
import FilterLink from '../containers/FilterLink';
import PropTypes from 'prop-types';
import { VISIBILITY_FILTERS } from '../state/actions';

class Footer extends PureComponent {
  render () {
    const { location } = this.props;
    return <p>
      Show: {' '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_ALL} location={location}>
        All
      </FilterLink>
      {', '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_ACTIVE} location={location}>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_COMPLETED} location={location}>
        Completed
      </FilterLink>
    </p>;
  }
}

Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default Footer;
