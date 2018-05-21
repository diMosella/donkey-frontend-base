import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './App';
import { VISIBILITY_FILTERS } from '../state/actions';
import dirtyChai from 'dirty-chai';
import chai, { expect } from 'chai';
chai.use(dirtyChai);

describe('(Component) App', () => {
  it('renders an App in unauthorized mode', () => {
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
    const component = renderIntoDocument(<App store={store} />);
    const appElmt = findRenderedDOMComponentWithClass(component, 'unauthorizedLayout');
    expect(appElmt).to.be.ok();
  });
});
