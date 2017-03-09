/*import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType } from 'react-addons-test-utils';
import App from './App';
import Footer from './Footer';
import AddTodoList from '../containers/AddTodoList';
import { expect } from 'chai';

describe('(Component) App', () => {
  it('renders a div with class \'app\'', () => {
    const component = renderIntoDocument(
      <App />
    );

    const appElmt = findRenderedDOMComponentWithClass(component, 'todo-list');
    expect(appElmt).to.be.ok;
  });

  it('renders a AddTodoList component as child', () => {
    const component = renderIntoDocument(
      <App />
    );
    const addTodoListElmt = scryRenderedComponentsWithType(component, AddTodoList);

    expect(addTodoListElmt.length).to.equal(1);
  });

  it('renders a Footer component as child', () => {
    const component = renderIntoDocument(
      <App />
    );
    const footerListElmt = scryRenderedComponentsWithType(component, Footer);

    expect(footerListElmt.length).to.equal(1);
  });
});*/
