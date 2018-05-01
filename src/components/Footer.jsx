import React, { PureComponent } from 'react';
import FilterLink from '../containers/FilterLink';
import { VISIBILITY_FILTERS } from '../state/actions';

class Footer extends PureComponent {
  render () {
    return <p>
      Show: {' '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_ALL}>
        All
      </FilterLink>
      {', '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_ACTIVE}>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter={VISIBILITY_FILTERS.SHOW_COMPLETED}>
        Completed
      </FilterLink>
    </p>;
  }
}

export default Footer;
