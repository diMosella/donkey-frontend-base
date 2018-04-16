import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AddTodo from './AddTodo';
import dirtyChai from 'dirty-chai';
import chai, { expect } from 'chai';
chai.use(dirtyChai);

describe('(Container) AddTodo', () => {
  it('renders an div-tag', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: []
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(<Provider store={store}><AddTodo /></Provider>);
    const div = findRenderedDOMComponentWithTag(component, 'div');
    expect(div).to.be.ok();
  });
});
