import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import VisibleTodoList from './VisibleTodoList';
import TodoList from '../components/TodoList';
import Todo from '../components/Todo';
import { VISIBILITY_FILTERS } from '../state/actions';
import { expect } from 'chai';

describe('(Container) VisibleTodoList', () => {
  it('renders one TodoList-component', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><VisibleTodoList /></MemoryRouter>
      </Provider>
    );
    const todoListList = scryRenderedComponentsWithType(component, TodoList);
    expect(todoListList.length).to.equal(1);
  });
  it('renders all Todos when filter is SHOW_ALL', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [
        { id: 1, text: 'Not completed', completed: false },
        { id: 2, text: 'Completed', completed: true }
      ],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><VisibleTodoList /></MemoryRouter>
      </Provider>
    );
    const todosList = scryRenderedComponentsWithType(component, Todo);
    expect(todosList.length).to.equal(2);
  });
  it('renders complete Todos when filter is SHOW_COMPLETED', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [
        { id: 1, text: 'Not completed', completed: false },
        { id: 2, text: 'Completed', completed: true }
      ],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_COMPLETED
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><VisibleTodoList /></MemoryRouter>
      </Provider>
    );
    const todosList = scryRenderedComponentsWithType(component, Todo);
    expect(todosList.length).to.equal(1);
    expect(todosList[0].props.text).to.eql('Completed');
  });
  it('renders complete Todos when filter is SHOW_ACTIVE', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [
        { id: 1, text: 'Not completed', completed: false },
        { id: 2, text: 'Completed', completed: true }
      ],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ACTIVE
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><VisibleTodoList /></MemoryRouter>
      </Provider>
    );
    const todosList = scryRenderedComponentsWithType(component, Todo);
    expect(todosList.length).to.equal(1);
    expect(todosList[0].props.text).to.eql('Not completed');
  });
});
