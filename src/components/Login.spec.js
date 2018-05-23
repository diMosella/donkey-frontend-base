import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-dom/test-utils';
import Login from './Login';
import { expect } from 'chai';

describe('(Component) Login', () => {
  it('renders a login page', () => {
    const onUserNameSubmit = (name) => {};
    const logOut = () => {};
    const history = {
      push: () => {}
    };

    const component = renderIntoDocument(
      <Login onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} authorized name='me' />
    );

    const login = findRenderedDOMComponentWithTag(component, 'div');
    expect(login).to.be.ok();
    const loginHeader = findRenderedDOMComponentWithTag(component, 'h1');
    expect(loginHeader).to.be.ok();
    expect(loginHeader.textContent).to.equal('Login page');
  });
  /* it('renders a span-tag with text when active', () => {
    let onClick = (param) => null;
    let text = 'This test Login is completed';

    const component = renderIntoDocument(
      <Login onClick={onClick} active children={text} />
    );

    const Login = findRenderedDOMComponentWithTag(component, 'span');
    expect(Login).to.be.ok();
    const LoginText = Login.textContent;
    expect(LoginText).to.equal(text);
  });
  it('responds to clicks by triggering the provided callback', () => {
    let isClicked = false;
    let onClick = (param) => { isClicked = true; };
    let text = 'This test Login is completed';

    const component = renderIntoDocument(
      <Login onClick={onClick} active={false} children={text} />
    );

    const Login = findRenderedDOMComponentWithTag(component, 'a');
    expect(Login).to.be.ok();
    Simulate.click(Login);
    expect(isClicked).to.equal(true);
  }); */
});
