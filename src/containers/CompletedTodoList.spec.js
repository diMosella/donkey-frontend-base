import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CompletedTodoList from './CompletedTodoList';
import TodoList from '../components/TodoList';
import Todo from '../components/Todo';
import { VISIBILITY_FILTERS } from '../state/actions';
const expect = global.chai.expect;

describe('(Container) CompletedTodoList', () => {
  it('renders one TodoList-component', () => {
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
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><CompletedTodoList /></MemoryRouter>
      </Provider>
    );
    const todoListList = scryRenderedComponentsWithType(component, TodoList);
    expect(todoListList.length).to.equal(1);
  });
  it('renders complete Todos', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [
        { id: 1, text: 'Not completed', completed: false },
        { id: 2, text: 'Completed', completed: true }
      ],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_AL
      },
      user: {
        name: '',
        authorized: false,
        authorizationPending: false
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><CompletedTodoList /></MemoryRouter>
      </Provider>
    );
    const todosList = scryRenderedComponentsWithType(component, Todo);
    expect(todosList.length).to.equal(1);
    expect(todosList[0].props.text).to.eql('Completed');
  });
});
