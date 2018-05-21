import produce from 'immer';
import { ACTION_TYPES, KNOWN_USERS } from '../actions';

/**
 * Initial state needed to provide base data structure
 */
const USER_INITIAL_STATE = {
  name: '',
  authorized: false,
  authorizationPending: false
};

const user = (state = USER_INITIAL_STATE, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case ACTION_TYPES.AUTHORIZE_USER:
        if (action.userName in KNOWN_USERS) {
          draftState.name = action.userName;
          draftState.authorized = true;
        }
        break;
    }
  });

export default user;
