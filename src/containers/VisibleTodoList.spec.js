import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import VisibleTodoList from './VisibleTodoList';
import TodoList from '../components/TodoList';
import { expect } from 'chai';

describe('(Container) VisibleTodoList', () => {
  it('renders one TodoList-component', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: []
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(<Provider store={store}><VisibleTodoList /></Provider>);
    const todoListList = scryRenderedComponentsWithType(component, TodoList);
    expect(todoListList.length).to.equal(1);
  });
});
