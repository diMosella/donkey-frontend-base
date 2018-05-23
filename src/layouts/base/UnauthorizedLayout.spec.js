import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType } from 'react-dom/test-utils';
import UnauthorizedLayout from './UnauthorizedLayout';
import Login from '../../components/Login';
import { VISIBILITY_FILTERS } from '../../state/actions';
import { expect } from 'chai';

describe('(Layout) UnauthorizedLayout', () => {
  it('renders a div with a Login', () => {
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
        <MemoryRouter><Route path='/' component={UnauthorizedLayout} /></MemoryRouter>
      </Provider>
    );
    const unAuthorizedLayout = findRenderedDOMComponentWithClass(component, 'unauthorizedLayout');
    expect(unAuthorizedLayout).to.be.ok();
    const login = scryRenderedComponentsWithType(component, Login);
    expect(login).to.be.ok();
  });
});
