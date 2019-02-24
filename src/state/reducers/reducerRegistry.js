import produce from 'immer';
import { combineReducers } from 'redux';
import donkeyLog from '../../utils/donkey-log';

export const EVENTS = {
  CHANGE: 'change',
  REGISTER: 'register',
  UNREGISTER: 'unregister'
};

/**
 * 'Broadcasts' an event by calling all registered listeners
 * @param {Array} register The (event specific) listeners
 * @param {Object} reducers The resulting (composed) reducers
 */
const broadcast = (register, reducers) => {
  if (Array.isArray(register)) {
    register.forEach((listener) => {
      if (typeof listener === 'function') {
        try {
          listener(reducers);
        } catch (error) {
          donkeyLog.error(`ReducerRegistry handling listener for event REGISTER failed`, error);
        }
      }
    });
  }
};

class ReducerRegistry {
  constructor (pointer) {
    if (typeof pointer !== 'string' || pointer.length === 0) {
      const message = `ReducerRegistry.constructor requires a non-empty pointer of type string`;
      donkeyLog.error(message);
      throw (new Error(message));
    }
    if (!ReducerRegistry.instance || ReducerRegistry.instance.pointer() !== pointer) {
      this._pointer = pointer;
      this._broadcastRegister = [];
      this._broadcastUnregister = [];
      this._reducers = [];
      this._nestedRegistries = [];
      this._toRemove = [];
      this._composedReducers = [combineReducers({})];
      ReducerRegistry.instance = this;
    }
    return ReducerRegistry.instance;
  }

  /**
   * Get the identifying pointer of this ReducerRegistry instance
   * @returns {string} The JSON-pointer for this ReducerRegistry instance
   */
  pointer () {
    return this._pointer;
  }

  /**
   * Register a new reducer with a pointer, triggers REGISTER and CHANGE event
   * @param {string} pointer The pointer under which the reducer is registered
   * @param {function} reducer The reducer to register
   */
  register (pointer, reducer) {
    if (typeof pointer !== 'string' || pointer.length === 0) {
      donkeyLog.error(`ReducerRegistry.register requires a non-empty pointer of type string`);
      return;
    }
    if (this._reducers.find((reducer) => reducer.pointer === pointer)) {
      donkeyLog.warning(`ReducerRegistry.register already includes a reducer with pointer ${pointer}`);
      return;
    }
    if (typeof reducer !== 'function') {
      donkeyLog.error(`ReducerRegistry.register requires a reducer of type function`);
      return;
    }
    const prevReducers = [...this._reducers];
    this._reducers.length = 0;
    prevReducers.forEach((prevReducer) => {
      this._reducers.push(produce(prevReducer, draftReducers => {}));
    });
    this._reducers.push(produce({ pointer, reducer }, draftReducers => {}));

    this._composedReducers.length = 0;
    this._composedReducers.push(produce(combineReducers(this.read()), draftComposition => {}));

    // trigger event REGISTER
    broadcast(this._broadcastRegister, this.compose);
  }

  /**
   * Unregister a reducer by pointer, triggers UNREGISTER and CHANGE event
   * @param {string} pointer The pointer under which the reducer was registered
   */
  unregister (pointer) {
    if (typeof pointer !== 'string' || pointer.length === 0) {
      donkeyLog.error(`ReducerRegistry.unregister requires a non-empty pointer of type string`);
      return;
    }
    const prevReducers = [...this._reducers];
    this._reducers.length = 0;
    prevReducers.forEach((prevReducer) => {
      if (prevReducer.pointer !== pointer) {
        this._reducers.push(produce(prevReducer, draftReducers => {}));
      }
    });
    this._toRemove.push(produce(pointer, draftPointer => {}));

    this._composedReducers.length = 0;
    this._composedReducers.push(produce(combineReducers(this.read()), draftComposition => {}));

    // trigger event UNREGISTER
    broadcast(this._broadcastUnregister, this.compose);
  }

  /**
   * Reads the registered reducers
   * @param {string} [pointer] (Optional) The pointer the retrieve the reducer by
   * @returns {object|function} When used with pointer, the specific reducer, otherwise an object with named reducers
   */
  read (pointer = null) {
    if (pointer === null) {
      return this._reducers.reduce((accummulator, item) => ({ ...accummulator, [item.pointer]: item.reducer }), {});
    }
    if (typeof pointer !== 'string') {
      donkeyLog.error(`ReducerRegistry.read requires a pointer of type string`);
      return;
    }
    const result = this._reducers.find((item) => item.pointer === pointer);
    return result ? result.reducer : null;
  }

  /**
   * Composes the reducers into a single reducer
   * @param {*} state The state to alter
   * @param {*} action The action to perform
   * @returns {Reducer} The composed Reducer
   */
  compose (state, action) {
    // cleanup state for removed reducers
    if (this._toRemove.length > 0) {
      state = produce(state, draftState => {
        this._toRemove.forEach((name) => {
          delete draftState[name];
        });
      });
      this._toRemove.length = 0;
    }

    return this._composedReducers[0](state, action);
  }

  /**
   * Adds an event listener, to be called when the event is triggered
   * @param {string} event The name of the event to add the listener to
   * @param {function} listener The listener to be added
   */
  addEventListener (event, listener) {
    let eventsRegistry = [];
    switch (event) {
      case EVENTS.REGISTER:
      case EVENTS.UNREGISTER:
        eventsRegistry.push(event);
        break;
      case EVENTS.CHANGE:
        eventsRegistry.push(EVENTS.REGISTER, EVENTS.UNREGISTER);
        break;
      default:
        donkeyLog.error(`ReducerRegistry.addEventListener only supports one of [${Object.values(EVENTS).join(', ')}]`);
        return;
    }

    if (typeof listener !== 'function') {
      donkeyLog.error(`ReducerRegistry.addEventListener requires a listener of type function`);
      return;
    }
    if (eventsRegistry.includes(EVENTS.REGISTER)) {
      this._broadcastRegister.push(produce(listener, draftListeners => {}));
    }
    if (eventsRegistry.includes(EVENTS.UNREGISTER)) {
      this._broadcastUnregister.push(produce(listener, draftListeners => {}));
    }
  }
}

const reducerRegistry = new ReducerRegistry('/');
Object.freeze(reducerRegistry);

export default reducerRegistry;
