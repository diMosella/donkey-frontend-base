import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import Link from './Link';
import { VISIBILITY_FILTERS } from '../state/actions';
import { expect } from 'chai';

describe('(Component) Footer', () => {
  it('renders a Footer-component with 3 Link-components as children', () => {
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
        <MemoryRouter><Footer /></MemoryRouter>
      </Provider>
    );
    const footerList = scryRenderedComponentsWithType(component, Footer);
    expect(footerList.length).to.equal(1);
    const linkList = scryRenderedComponentsWithType(footerList[0], Link);
    expect(linkList.length).to.equal(3);
  });
});
