import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Footer from './Footer';
import FilterLink from '../containers/FilterLink';
import { VISIBILITY_FILTERS } from '../state/actions';
import { expect } from 'chai';

describe('(Component) Footer', () => {
  it('renders a Footer-component with 3 FilterLink-containers', () => {
    const mockStore = configureMockStore();
    const initialState = {
      todos: [],
      visibilityFilter: {
        filter: VISIBILITY_FILTERS.SHOW_ALL
      }
    };
    const store = mockStore(initialState);
    const component = renderIntoDocument(<Provider store={store}><Footer /></Provider>);
    const filterLinkList = scryRenderedComponentsWithType(component, FilterLink);
    expect(filterLinkList.length).to.equal(3);
  });
});
