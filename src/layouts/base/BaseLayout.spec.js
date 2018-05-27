import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
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
    const component = shallow(
      <Provider store={store}>
        <MemoryRouter><Route path='/' component={BaseLayout} /></MemoryRouter>
      </Provider>
    );
    const baseLayout = component.find('.baseLayout');
    expect(baseLayout).to.be.ok();
    const header = component.find('.header');
    expect(header).to.be.ok();
    const main = component.find('.main');
    expect(main).to.be.ok();
    const footer = component.find('.footer');
    expect(footer).to.be.ok();
  });
});
