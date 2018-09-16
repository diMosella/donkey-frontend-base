import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import Welcome from './Welcome';
const expect = global.chai.expect;

describe('(Component) Welcome', () => {
  it('renders a page', () => {
    const component = renderIntoDocument(
      <Welcome />
    );

    const page = findRenderedDOMComponentWithClass(component, 'page');
    expect(page).to.be.ok();
  });
});
