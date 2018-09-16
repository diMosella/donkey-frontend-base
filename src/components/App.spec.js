import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import App from './App';
import { VISIBILITY_FILTERS } from '../state/actions';
const expect = global.chai.expect;

describe('(Component) App', () => {
  it('renders an App', () => {
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
      },
      localize: {
        languages: [],
        options: {}
      }
    };
    const store = mockStore(initialState);
    const component = shallow(<App store={store} />);
    expect(component).to.be.ok();
  });
});
