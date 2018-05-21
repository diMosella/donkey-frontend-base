import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import HeaderLayout from './HeaderLayout';
import { VISIBILITY_FILTERS } from '../../state/actions';
import { expect } from 'chai';

describe('(Layout) HeaderLayout', () => {
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
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><Route path='/' component={HeaderLayout} /></MemoryRouter>
      </Provider>
    );
    const headerLayout = findRenderedDOMComponentWithClass(component, 'headerLayout');
    expect(headerLayout).to.be.ok();
    const aside = findRenderedDOMComponentWithTag(component, 'aside');
    expect(aside).to.be.ok();
    expect(aside.textContent).to.eql('TEST MODE');
    const nav = findRenderedDOMComponentWithTag(component, 'nav');
    expect(nav).to.be.ok();
    const form = findRenderedDOMComponentWithTag(component, 'form');
    expect(form).to.be.ok();
  });
  it('renders when NODE_ENV is not set', () => {
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
    delete process.env.NODE_ENV;
    const store = mockStore(initialState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><Route path='/' component={HeaderLayout} /></MemoryRouter>
      </Provider>
    );
    const headerLayout = findRenderedDOMComponentWithClass(component, 'headerLayout');
    expect(headerLayout).to.be.ok();
    const aside = findRenderedDOMComponentWithTag(component, 'aside');
    expect(aside).to.be.ok();
    expect(aside.textContent).to.eql('MODE NOT SET');
    const nav = findRenderedDOMComponentWithTag(component, 'nav');
    expect(nav).to.be.ok();
    const form = findRenderedDOMComponentWithTag(component, 'form');
    expect(form).to.be.ok();
  });
});
