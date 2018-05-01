import produce from 'immer';
import { ACTION_TYPES, VISIBILITY_FILTERS } from '../actions';

/**
 * Initial state needed to provide base data structure
 */
const VISIBILITY_INITIAL_STATE = {
  filter: VISIBILITY_FILTERS.SHOW_ALL
};

const visibilityFilter = (state = VISIBILITY_INITIAL_STATE, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case ACTION_TYPES.SET_VISIBILITY_FILTER:
        if (action.filter in VISIBILITY_FILTERS) {
          draftState.filter = action.filter;
        }
        break;
    }
  });

export default visibilityFilter;
