import React from 'react';
import configureMockStore from 'redux-mock-store';
import { connect, Provider } from 'react-redux';
import { renderIntoDocument, findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag, Simulate } from 'react-dom/test-utils';
import Login from './Login';
const expect = global.chai.expect;

describe('(Component) Login', () => {
  let store;
  let WrappedLogin;
  before(() => {
    const mockStore = configureMockStore();
    const initialState = {
      localize: {
        languages: [{ code: 'en' }],
        options: {}
      }
    };
    const mapStateToProps = (state) => ({
      translate: (id, params) => {
        switch (id) {
          case 'main.login.title':
            return 'testTitle';
          case 'main.login.status.true':
            return `testStatusTrue [${params.name}]`;
          case 'main.login.status.false':
            return `testStatusFalse [${params.name}]`;
          default:
            return 'no translation';
        }
      },
      currentLanguage: 'en'
    });
    store = mockStore(initialState);
    WrappedLogin = connect(mapStateToProps)(Login);
  });
  it('renders a login page', () => {
    const onUserNameSubmit = (name) => {};
    const logOut = () => {};
    const history = {
      push: () => {}
    };

    const component = renderIntoDocument(
      <Provider store={store}>
        <WrappedLogin onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} authorized name='me' />
      </Provider>
    );

    const login = findRenderedDOMComponentWithTag(component, 'div');
    expect(login).to.be.ok();
    const loginHeader = findRenderedDOMComponentWithTag(component, 'h1');
    expect(loginHeader).to.be.ok();
    expect(loginHeader.textContent).to.equal('testTitle');
  });
  it('renders a span-tag with text when unauthorized', () => {
    let onClick = (param) => null;

    const component = renderIntoDocument(
      <Provider store={store}>
        <WrappedLogin onClick={onClick} active />
      </Provider>
    );

    const unAuthorizedFeedback = findRenderedDOMComponentWithTag(component, 'span');
    expect(unAuthorizedFeedback).to.be.ok();
    expect(unAuthorizedFeedback.textContent).to.equal('testStatusFalse []');
  });
  it('renders a span-tag with text when authorized', () => {
    let onClick = (param) => null;

    const component = renderIntoDocument(
      <Provider store={store}>
        <WrappedLogin onClick={onClick} active authorized name='me' />
      </Provider>
    );
    const authorizedFeedback = findRenderedDOMComponentWithTag(component, 'span');
    expect(authorizedFeedback).to.be.ok();
    expect(authorizedFeedback.textContent).to.equal('testStatusTrue [ me]');
  });
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
      <Provider store={store}>
        <WrappedLogin onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} name='userName' />
      </Provider>
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
    const onUserNameSubmit = (name) => null;
    const logOut = () => { logOutRequested = true; };
    const history = {
      push: (uri) => { path = uri; }
    };

    const component = renderIntoDocument(
      <Provider store={store}>
        <WrappedLogin onUserNameSubmit={onUserNameSubmit} logOut={logOut} history={history} authorized name={TESTER} />
      </Provider>
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
