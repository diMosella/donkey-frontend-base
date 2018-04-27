import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import AddTodo from './AddTodo';
import todoApp from '../state/reducers';
chai.use(chaiImmutable);
chai.use(dirtyChai);
const expect = chai.expect;

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
  it('only does add a Todo when text is provided', () => {
    let text = 'This test Link is added';
    const store = createStore(todoApp);
    const component = renderIntoDocument(<Provider store={store}><AddTodo /></Provider>);
    const button = findRenderedDOMComponentWithTag(component, 'button');
    expect(button).to.be.ok();
    Simulate.click(button);
    expect(store.getState().todos).to.have.size(0);
    const input = findRenderedDOMComponentWithTag(component, 'input');
    expect(input).to.be.ok();
    input.value = ' ';
    Simulate.change(input);
    expect(input.value).to.equal(' ');
    Simulate.submit(button);
    expect(store.getState().todos).to.have.size(0);
    input.value = text;
    Simulate.change(input);
    expect(input.value).to.equal(text);
    Simulate.submit(button);
    expect(store.getState().todos).to.have.size(1);
    expect(store.getState().todos.get(0)).to.have.property('text', text);
  });
});
