import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-dom/test-utils';
import Link from './Link';
import { expect } from 'chai';

describe('(Component) Link', () => {
  it('renders an a with text when inactive', () => {
    let onClick = (param) => null;
    let text = 'This test Link is completed';

    const component = renderIntoDocument(
      <Link onClick={onClick} active={false} children={text} />
    );

    const link = findRenderedDOMComponentWithTag(component, 'a');
    expect(link).to.be.ok;
    const linkText = link.textContent;
    expect(linkText).to.equal(text);
  });
  it('renders a span with text when active', () => {
    let onClick = (param) => null;
    let text = 'This test Link is completed';

    const component = renderIntoDocument(
      <Link onClick={onClick} active children={text} />
    );

    const link = findRenderedDOMComponentWithTag(component, 'span');
    expect(link).to.be.ok;
    const linkText = link.textContent;
    expect(linkText).to.equal(text);
  });
  it('responds to clicks by triggering the provided callback', () => {
    let isClicked = false;
    let onClick = (param) => { isClicked = true; };
    let text = 'This test Link is completed';

    const component = renderIntoDocument(
      <Link onClick={onClick} active={false} children={text} />
    );

    const link = findRenderedDOMComponentWithTag(component, 'a');
    expect(link).to.be.ok;
    Simulate.click(link);
    expect(isClicked).to.equal(true);
  });
});
