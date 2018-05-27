import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag, Simulate } from 'react-dom/test-utils';
import Login from './Login';
const expect = global.chai.expect;

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
  }); */
  it('responds to login clicks by triggering the provided callback', () => {
    const TESTER = 'Tester';
    let userName = '';
    let path = '';
    const onUserNameSubmit = (name) => { userName = name; };
    const logOut = () => { };
    const history = {
      push: (uri) => { path = uri; }
    };

    const component = renderIntoDocument(
      <Login onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} name='userName' />
    );
    const buttonList = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttonList).to.have.length(2);
    expect(buttonList[0]).to.have.attribute('type', 'submit');
    expect(buttonList[0]).to.not.have.attribute('disabled');
    expect(buttonList[1]).to.not.have.attribute('type');
    expect(buttonList[1]).to.have.attribute('disabled');
    Simulate.click(buttonList[0]);
    expect(userName).to.eql('');
    const nameInput = findRenderedDOMComponentWithTag(component, 'input');
    expect(nameInput).to.be.ok();
    nameInput.value = TESTER;
    Simulate.change(nameInput.value);
    Simulate.submit(buttonList[0]);
    expect(userName).to.eql(TESTER);
    expect(path).to.eql('/todos');
  });
  it('responds to logout clicks by triggering the provided callback', () => {
    const TESTER = 'Tester';
    let logOutRequested = false;
    let path = '';
    const onUserNameSubmit = (name) => { userName = name; };
    const logOut = () => { logOutRequested = true; };
    const history = {
      push: (uri) => { path = uri; }
    };

    const component = renderIntoDocument(
      <Login onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} authorized name={TESTER} />
    );
    const buttonList = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttonList).to.have.length(2);
    expect(buttonList[0]).to.have.attribute('type', 'submit');
    expect(buttonList[0]).to.have.attribute('disabled');
    expect(buttonList[1]).to.not.have.attribute('type');
    expect(buttonList[1]).to.not.have.attribute('disabled');
    Simulate.click(buttonList[1]);
    expect(logOutRequested).to.be.true();
    expect(path).to.eql('/');
  });
});
