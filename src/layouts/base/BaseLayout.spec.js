import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import BaseLayout from './BaseLayout';
import { VISIBILITY_FILTERS } from '../../state/actions';
import { expect } from 'chai';

describe('(Layout) BaseLayout', () => {
  it('renders a div with header, main and footer', () => {
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
      },
      localize: {
        languages: ['en'],
        activeLanguage: 'en',
        options: {}
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><Route path='/' component={BaseLayout} /></MemoryRouter>
      </Provider>
    );
    const baseLayout = findRenderedDOMComponentWithClass(component, 'baseLayout');
    expect(baseLayout).to.be.ok();
    const header = findRenderedDOMComponentWithTag(component, 'header');
    expect(header).to.be.ok();
    const main = findRenderedDOMComponentWithTag(component, 'main');
    expect(main).to.be.ok();
    const footer = findRenderedDOMComponentWithTag(component, 'footer');
    expect(footer).to.be.ok();
  });
});
