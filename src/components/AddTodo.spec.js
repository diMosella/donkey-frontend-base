import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import AddTodo from './AddTodo';
import { VISIBILITY_FILTERS } from '../state/actions';
import todoApp from '../state/reducers';
const expect = global.chai.expect;

describe('(Component) AddTodo', () => {
  it('renders an div-tag', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      },
      user: {
        name: '',
        authorized: false,
        authorizationPending: false
      }
    };
    const store = mockStore(initialState);
    let todoText = '';
    const onTodoTextSubmit = (text) => { todoText = text; };
    const component = renderIntoDocument(<Provider store={store}><MemoryRouter><AddTodo onTodoTextSubmit={onTodoTextSubmit} /></MemoryRouter></Provider>);
    const formElement = findRenderedDOMComponentWithTag(component, 'form');
    expect(formElement).to.be.ok();
    expect(todoText).to.eql('');
  });
  it('only does add a Todo when text is provided', () => {
    let text = 'This test Link is added';
    const store = createStore(todoApp);
    let todoText = '';
    const onTodoTextSubmit = (text) => { todoText = text; };
    const component = renderIntoDocument(<Provider store={store}><MemoryRouter><AddTodo onTodoTextSubmit={onTodoTextSubmit} /></MemoryRouter></Provider>);
    const button = findRenderedDOMComponentWithTag(component, 'button');
    expect(button).to.be.ok();
    Simulate.click(button);
    expect(store.getState().todos).to.have.length(0);
    const input = findRenderedDOMComponentWithTag(component, 'input');
    expect(input).to.be.ok();
    input.value = ' ';
    Simulate.change(input);
    expect(input.value).to.equal(' ');
    Simulate.submit(button);
    expect(store.getState().todos).to.have.length(0);
    input.value = text;
    Simulate.change(input);
    expect(input.value).to.equal(text);
    Simulate.submit(button);
    expect(todoText).to.eql(text);
  });
});
