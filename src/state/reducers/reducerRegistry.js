import produce from 'immer';
import { combineReducers } from 'redux';
import donkeyLog from '../../utils/donkey-log';

export const EVENTS = {
  CHANGE: 'change',
  REGISTER: 'register',
  UNREGISTER: 'unregister'
};

const ROOT_PATH = '/';

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

/**
 * Converts a pointer string to a path array
 * @param {string} pointer The pointer to convert
 * @returns {Array} The path array
 */
const pointerToPath = (pointer) => {
  if (typeof pointer !== 'string') {
    donkeyLog.error(`ReducerRegistry converting pointer to array failed`);
    return;
  }
  return pointer.split('/').filter((part) => part.length > 0);
};

/**
 * Inspects a pointer, including the nesting inside a registry
 * @param {string} pointer The pointer to inspect
 * @param {string} registryPointer The pointer of the registry to compare with
 * @param {string} [caller] The caller method to be used in error logging
 * @returns {object} The result as object, with {boolean} field completed to indicate if
 *  the inspection ran to completion, and {string} nestedPointer with value of the directly
 *  nested pointer inside the registry.
 */
const inspectPointer = (pointer, registryPointer, caller = null) => {
  const result = {
    completed: false,
    nestedPointer: null
  };
  const callerMethod = `ReducerRegistry${typeof caller === 'string' ? `.${caller}` : ''}`;
  if (typeof pointer !== 'string' || pointer.length === 0) {
    donkeyLog.error(`${callerMethod} requires a non-empty pointer of type string`);
    return result;
  }
  if (!pointer.startsWith(ROOT_PATH)) {
    donkeyLog.error(`${callerMethod} requires a pointer containing '/' and `,
      `the provided '${pointer}' doesn't`);
    return result;
  }
  const pointerPath = pointerToPath(pointer);
  console.log('inspectPointer::', pointer, pointerPath.length, pointerPath);
  const registryPointerPath = pointerToPath(registryPointer);
  if (pointer !== ROOT_PATH && registryPointerPath.some((part, index) => pointerPath[index] !== part)) {
    donkeyLog.error(`${callerMethod} requires the pointer to be nested in the registry`,
      `but '${pointer}' is not in '${registryPointer}'`);
  }
  const relativePointerPath = pointerPath.slice(registryPointerPath.length);
  if (relativePointerPath.length > 1) {
    result.nestedPointer = `${this._pointer !== ROOT_PATH ? this.pointer : ''}/${relativePointerPath[0]}`;
  }
  result.completed = true;
  return result;
};

/**
 * A Registry of Reducers
 * Private field values are mainly arrays, since mutating nested fields is not permitted for frozen objects
 */
class ReducerRegistry {
  constructor (pointer) {
    if (typeof pointer !== 'string' || pointer.length === 0) {
      const message = `ReducerRegistry.constructor requires a non-empty pointer of type string`;
      donkeyLog.error(message);
      throw (new Error(message));
    }
    console.log('Constructor::pointer', pointer);
    this._pointer = pointer;
    this._broadcastRegister = [];
    this._broadcastUnregister = [];
    this._reducers = [];
    this._nestedRegistries = [];
    this._toRemove = [];
    this._composedReducers = [combineReducers({})];
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
    const { completed, nestedPointer } = inspectPointer(this._pointer, pointer, 'register');
    if (completed !== true) {
      return;
    }
    if (typeof nestedPointer === 'string') {
      const existingNestedRegistries = this._nestedRegistries.filter((registry) => registry.pointer === nestedPointer);
      const existingNestedRegistry = existingNestedRegistries.length === 1
        ? existingNestedRegistries[0]
        : null;
      if (existingNestedRegistry) {
        existingNestedRegistry.register(pointer, reducer);
      } else {
        const nestedRegistry = new ReducerRegistry(nestedPointer);
        Object.freeze(nestedRegistry);
        nestedRegistry.register(pointer, reducer);
        this._nestedRegistries.push(produce(nestedRegistry, draftRegistry => {}));
      }
      return;
    }

    if (this._reducers.some((reducer) => reducer.pointer === pointer)) {
      donkeyLog.warning(`ReducerRegistry.register: register already includes a reducer with pointer '${pointer}'`);
      return;
    }
    if (typeof reducer !== 'function') {
      donkeyLog.error(`ReducerRegistry.register: register requires a reducer of type function`);
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
      donkeyLog.error(`ReducerRegistry.unregister: register requires a non-empty pointer of type string`);
      return;
    }
    // TODO: handle nesting

    if (this._reducers.every((reducer) => reducer.pointer !== pointer)) {
      donkeyLog.warning(`ReducerRegistry.unregister: register does not include a reducer with pointer '${pointer}'`);
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
      const nested = this._nestedRegistries.map((registry) => registry.read())
        .reduce((accummulator, registryItems) => ({ ...accummulator, ...registryItems }), {});
      return this._reducers.reduce((accummulator, item) => ({ ...accummulator, [item.pointer]: item.reducer }), nested);
    }
    if (typeof pointer !== 'string') {
      donkeyLog.error(`ReducerRegistry.read requires a pointer of type string`);
      return;
    }
    // TODO: handle nesting
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
        this._toRemove.forEach((pointer) => {
          delete draftState[pointer];
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

class ReducerRegistrySingleton extends ReducerRegistry {
  constructor () {
    if (!ReducerRegistrySingleton.instance) {
      super(ROOT_PATH);
      ReducerRegistrySingleton.instance = this;
    }
    return ReducerRegistrySingleton.instance;
  }
}

const reducerRegistrySingleton = new ReducerRegistrySingleton();
Object.freeze(reducerRegistrySingleton);

export default reducerRegistrySingleton;
