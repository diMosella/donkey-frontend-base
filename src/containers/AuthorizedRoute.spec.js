import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AuthorizedRoute from './AuthorizedRoute';
import { VISIBILITY_FILTERS } from '../state/actions';
const expect = global.chai.expect;

describe('(Container) AuthorizedRoute', () => {
  it('renders the provided component when authorized', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      },
      user: {
        name: '',
        authorized: true,
        authorizationPending: false
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><AuthorizedRoute component={() => <div className='tested' />} /></MemoryRouter>
      </Provider>
    );
    const divs = scryRenderedDOMComponentsWithTag(component, 'div');
    expect(divs.length).to.equal(1);
    expect(divs[0]).to.have.class('tested');
  });
  it('renders a loading message when loading', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibility: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      },
      user: {
        name: '',
        authorized: false,
        authorizationPending: true
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><AuthorizedRoute component={() => <div className='tested' />} /></MemoryRouter>
      </Provider>
    );
    const divs = scryRenderedDOMComponentsWithTag(component, 'div');
    expect(divs.length).to.equal(1);
    expect(divs[0].textContent).to.eql('Loading...');
  });
});
