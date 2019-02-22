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
  constructor () {
    if (!ReducerRegistry.instance) {
      this._broadcastRegister = [];
      this._broadcastUnregister = [];
      this._reducers = [];
      this._toRemove = [];
      this._composedReducers = [combineReducers({})];
      ReducerRegistry.instance = this;
    }
    return ReducerRegistry.instance;
  }

  /**
   * Register a new reducer with a name, triggers REGISTER and CHANGE event
   * @param {string} name The name under which the reducer is registered
   * @param {function} reducer The reducer to register
   */
  register (name, reducer) {
    if (typeof name !== 'string' || name.length === 0) {
      donkeyLog.error(`ReducerRegistry.register requires a non-empty name of type string`);
      return;
    }
    if (this._reducers.find((reducer) => reducer.name === name)) {
      donkeyLog.warning(`ReducerRegistry.register already includes a reducer with name ${name}`);
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
    this._reducers.push(produce({ name, reducer }, draftReducers => {}));

    this._composedReducers.length = 0;
    this._composedReducers.push(produce(combineReducers(this.read()), draftComposition => {}));

    // trigger event REGISTER
    broadcast(this._broadcastRegister, this.compose);
  }

  /**
   * Unregister a reducer by name, , triggers UNREGISTER and CHANGE event
   * @param {string} name The name under which the reducer was registered
   */
  unregister (name) {
    if (typeof name !== 'string' || name.length === 0) {
      donkeyLog.error(`ReducerRegistry.unregister requires a non-empty name of type string`);
      return;
    }
    const prevReducers = [...this._reducers];
    this._reducers.length = 0;
    prevReducers.forEach((prevReducer) => {
      if (prevReducer.name !== name) {
        this._reducers.push(produce(prevReducer, draftReducers => {}));
      }
    });
    this._toRemove.push(produce(name, draftName => {}));

    this._composedReducers.length = 0;
    this._composedReducers.push(produce(combineReducers(this.read()), draftComposition => {}));

    // trigger event UNREGISTER
    broadcast(this._broadcastUnregister, this.compose);
  }

  /**
   * Reads the registered reducers
   * @param {string} [name] (Optional) The name the retrieve the reducer by
   * @returns {object|function} When used with name, the specific reducer, otherwise an object with named reducers
   */
  read (name = null) {
    if (name === null) {
      return this._reducers.reduce((accummulator, item) => ({ ...accummulator, [item.name]: item.reducer }), {});
    }
    if (typeof name !== 'string') {
      donkeyLog.error(`ReducerRegistry.read requires a name of type string`);
      return;
    }
    const result = this._reducers.find((item) => item.name === name);
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

const reducerRegistry = new ReducerRegistry();
Object.freeze(reducerRegistry);

export default reducerRegistry;
