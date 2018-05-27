import { expect } from 'chai';
import user from './user';
import { ACTION_TYPES, KNOWN_USERS } from '../actions';

const DEFAULT_STATE = {
  'authorizationPending': false,
  'authorized': false,
  'name': ''
};

describe('(Reducer) user', () => {
  it('should be a function.', () => {
    expect(user).to.be.a('function');
  });
  it('should initialize with the default value.', () => {
    expect(user(undefined, '')).to.eql(DEFAULT_STATE);
  });
  it('should return the previous (default) state if an action was not matched.', () => {
    let state = user(undefined, '');
    expect(state).to.eql(DEFAULT_STATE);
    state = user(state, { type: '@@@@@@@' });
    expect(state).to.eql(DEFAULT_STATE);
  });
  it('can (un)set authorized flag.', () => {
    const authContext = {
      type: ACTION_TYPES.AUTHORIZE_USER,
      userName: Object.entries(KNOWN_USERS)[0][0]
    };

    const unAuthContext = {
      type: ACTION_TYPES.UNAUTHORIZE_USER
    };

    const newState = user(undefined, authContext);
    expect(newState).to.eql({
      'authorizationPending': false,
      'authorized': true,
      'name': Object.entries(KNOWN_USERS)[0][0]
    });
    const newerState = user(newState, unAuthContext);
    expect(newerState).to.eql({
      'authorizationPending': false,
      'authorized': false,
      'name': ''
    });
  });
});
