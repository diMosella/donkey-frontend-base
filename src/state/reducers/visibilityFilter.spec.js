import { expect } from 'chai';
import visibilityFilter from './visibilityFilter';
import { ACTION_TYPES, VISIBILITY_FILTERS } from '../actions';

describe('(Reducer) visibilityFilter', () => {
  it('should be a function.', () => {
    expect(visibilityFilter).to.be.a('function');
  });
  it('should initialize with the default value.', () => {
    expect(visibilityFilter(undefined, '')).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
  });
  it('should return the previous (default) state if an action was not matched.', () => {
    let state = visibilityFilter(undefined, '');
    expect(state).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
    state = visibilityFilter(state, { type: '@@@@@@@' });
    expect(state).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
  });
  it('can set visibility filter.', () => {
    const visFilContext = {
      type: ACTION_TYPES.SET_VISIBILITY_FILTER,
      filter: VISIBILITY_FILTERS.SHOW_ACTIVE
    };

    const newState = visibilityFilter(undefined, visFilContext);
    expect(newState).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ACTIVE });
  });
});
