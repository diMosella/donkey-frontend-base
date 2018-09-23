import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider, connect } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithTag, Simulate } from 'react-dom/test-utils';
import HeaderLayout from './HeaderLayout';
import { VISIBILITY_FILTERS } from '../../state/actions';
const expect = global.chai.expect;

describe('(Layout) HeaderLayout', () => {
  it('renders a div with asides, form and navs', () => {
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
        languages: [{ code: 'en' }],
        options: {}
      }
    };
    const store = mockStore(initialState);
    const mapStateToProps = (state) => ({
      translate: (id) => 'Simple Todos',
      currentLanguage: 'en'
    });
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><Route path='/'
          component={connect(mapStateToProps)(HeaderLayout)} /></MemoryRouter>
      </Provider>
    );
    const headerLayout = findRenderedDOMComponentWithClass(component, 'headerLayout');
    expect(headerLayout).to.be.ok();
    const aside = scryRenderedDOMComponentsWithTag(component, 'aside');
    expect(aside).to.be.ok();
    expect(aside).to.have.length(3);
    expect(aside[0].textContent).to.eql('Simple Todos');
    expect(aside[2].textContent).to.eql('TEST MODE');
    const nav = scryRenderedDOMComponentsWithTag(component, 'nav');
    expect(nav).to.be.ok();
    expect(nav).to.have.length(2);
    const form = scryRenderedDOMComponentsWithTag(component, 'form');
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
      },
      localize: {
        languages: [],
        options: {}
      }
    };
    delete process.env.NODE_ENV;
    const store = mockStore(initialState);
    const mapStateToProps = (state) => ({
      translate: (id) => { /* intentionally left blank */ },
      currentLanguage: 'en'
    });
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter><Route path='/'
          component={connect(mapStateToProps)(HeaderLayout)} /></MemoryRouter>
      </Provider>
    );
    const headerLayout = findRenderedDOMComponentWithClass(component, 'headerLayout');
    expect(headerLayout).to.be.ok();
    const aside = scryRenderedDOMComponentsWithTag(component, 'aside');
    expect(aside).to.be.ok();
    expect(aside).to.have.length(3);
    expect(aside[2].textContent).to.eql('MODE NOT SET');
    const nav = scryRenderedDOMComponentsWithTag(component, 'nav');
    expect(nav).to.be.ok();
    expect(nav).to.have.length(2);
    const form = scryRenderedDOMComponentsWithTag(component, 'form');
    expect(form).to.be.ok();
  });
  it('renders when visiting /todos', () => {
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
        languages: [],
        options: {}
      }
    };
    const store = mockStore(initialState);
    const mapStateToProps = (state) => ({
      translate: (id) => { /* intentionally left blank */ },
      currentLanguage: 'en'
    });
    const component = renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/todos']} initialIndex={1}>
          <Route path='/todos'
            component={connect(mapStateToProps)(HeaderLayout)} />
        </MemoryRouter>
      </Provider>
    );
    const headerLayout = findRenderedDOMComponentWithClass(component, 'headerLayout');
    expect(headerLayout).to.be.ok();
    const aside = scryRenderedDOMComponentsWithTag(component, 'aside');
    expect(aside).to.be.ok();
    expect(aside).to.have.length(3);
    const nav = scryRenderedDOMComponentsWithTag(component, 'nav');
    expect(nav).to.be.ok();
    expect(nav).to.have.length(2);
    const form = scryRenderedDOMComponentsWithTag(component, 'form');
    expect(form).to.be.ok();
    const input = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(input).to.be.ok();
    const button = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(button).to.be.ok();
    input.value = 'test';
    Simulate.change(input);
    Simulate.submit(button);
  });
});
