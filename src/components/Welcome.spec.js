import React from 'react';
import configureMockStore from 'redux-mock-store';
import { connect } from 'react-redux';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import Welcome from './Welcome';
const expect = global.chai.expect;

describe('(Component) Welcome', () => {
  let store;
  let WrappedWelcome;
  before(() => {
    const mockStore = configureMockStore();
    const initialState = {
      localize: {
        languages: [{ code: 'en' }],
        options: {}
      }
    };
    const mapStateToProps = (state) => ({
      translate: (id) => {
        switch (id) {
          case 'main.welcome.title':
            return 'testTitle';
          case 'main.welcome.text':
            return 'testText';
          default:
            return 'no translation';
        }
      },
      currentLanguage: 'en'
    });
    store = mockStore(initialState);
    WrappedWelcome = connect(mapStateToProps)(Welcome);
  });
  it('renders a page', () => {
    const component = renderIntoDocument(
      <WrappedWelcome store={store} />
    );

    const page = findRenderedDOMComponentWithClass(component, 'page');
    expect(page).to.be.ok();
  });
});
