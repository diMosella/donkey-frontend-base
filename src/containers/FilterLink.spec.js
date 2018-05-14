import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import FilterLink from './FilterLink';
import Link from '../components/Link';
import { VISIBILITY_FILTERS } from '../state/actions';
import { expect } from 'chai';

describe('(Container) FilterLink', () => {
  it('renders one Link-component', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibilityFilter: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(<Provider store={store}><FilterLink>test link</FilterLink></Provider>);
    const linkList = scryRenderedComponentsWithType(component, Link);
    expect(linkList.length).to.equal(1);
  });
});
