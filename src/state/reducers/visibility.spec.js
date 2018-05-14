import { expect } from 'chai';
import visibility from './visibility';
import { ACTION_TYPES, VISIBILITY_FILTERS } from '../actions';

describe('(Reducer) visibility', () => {
  it('should be a function.', () => {
    expect(visibility).to.be.a('function');
  });
  it('should initialize with the default value.', () => {
    expect(visibility(undefined, '')).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
  });
  it('should return the previous (default) state if an action was not matched.', () => {
    let state = visibility(undefined, '');
    expect(state).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
    state = visibility(state, { type: '@@@@@@@' });
    expect(state).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ALL });
  });
  it('can set visibility filter.', () => {
    const visFilContext = {
      type: ACTION_TYPES.SET_VISIBILITY_FILTER,
      filter: VISIBILITY_FILTERS.SHOW_ACTIVE
    };

    const newState = visibility(undefined, visFilContext);
    expect(newState).to.eql({ filter: VISIBILITY_FILTERS.SHOW_ACTIVE });
  });
});
