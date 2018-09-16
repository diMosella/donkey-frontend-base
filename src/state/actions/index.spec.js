import { expect } from 'chai';
import { setVisibilityFilter, toggleTodo, ACTION_TYPES } from '.';

describe('(Action) setVisibilityFilter', () => {
  it('should be a function.', () => {
    expect(setVisibilityFilter).to.be.a('function');
  });
  it('should return a proper POJO', () => {
    expect(setVisibilityFilter('filterName')).to.eql({
      type: ACTION_TYPES.SET_VISIBILITY_FILTER,
      filter: 'filterName'
    });
  });
});

describe('(Action) toggleTodo', () => {
  it('should be a function.', () => {
    expect(toggleTodo).to.be.a('function');
  });
  it('should return a proper POJO', () => {
    expect(toggleTodo('id')).to.eql({
      type: ACTION_TYPES.TOGGLE_TODO,
      id: 'id'
    });
  });
});
