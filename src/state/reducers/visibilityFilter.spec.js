import { expect } from 'chai';
import visibilityFilter from './visibilityFilter';

describe('(Reducer) visibilityFilter', () => {
  it('should be a function.', () => {
    expect(visibilityFilter).to.be.a('function');
  });
  it('should initialize with the default value.', () => {
    expect(visibilityFilter(undefined, '')).to.eql('SHOW_ALL');
  });
  it('should return the previous (default) state if an action was not matched.', () => {
    let state = visibilityFilter(undefined, '');
    expect(state).to.eql('SHOW_ALL');
    state = visibilityFilter(state, { type: '@@@@@@@' });
    expect(state).to.eql('SHOW_ALL');
  });
  it('can set visibility filter.', () => {
    const visFilter = 'VISI_FILT';
    const visFilContext = {
      type: 'SET_VISIBILITY_FILTER',
      filter: visFilter
    };

    const newState = visibilityFilter('', visFilContext);
    expect(newState).to.eql(visFilter);
  });
});
