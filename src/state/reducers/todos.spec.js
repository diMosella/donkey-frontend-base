import { expect } from 'chai';
import todos from './todos';

describe('(Reducer) todos', () => {
  it('should be a function.', () => {
    expect(todos).to.be.a('function');
  });
  it('should initialize with an empty state.', () => {
    expect(todos(undefined, [])).to.eql([]);
  });
  it('should return the previous state if an action was not matched.', () => {
    let state = todos(undefined, []);
    expect(state).to.eql([]);
    state = todos(state, { type: '@@@@@@@' });
    expect(state).to.eql([]);
  });
  it('can add a new TODO.', () => {
    const todoText = 'Test TODO reducer';
    const todoContext = {
      type: 'ADD_TODO',
      text: todoText
    };

    const newState = todos([], todoContext);
    expect(newState).to.have.length(1);
    expect(newState[0]).to.have.property('id');
    expect(newState[0]).to.have.property('text');
    expect(newState[0].text).to.eql(todoText);
    expect(newState[0].completed).to.be.false();
  });
  it('can toggle a TODO.', () => {
    const todo = {
      id: 0,
      text: 'Can toggle?',
      completed: false
    };
    const todoContext = {
      type: 'TOGGLE_TODO',
      id: 0
    };

    const newState = todos([ todo ], todoContext);
    expect(newState).to.have.length(1);
    expect(newState[0]).to.have.property('id');
    expect(newState[0].id).to.eql(0);
    expect(newState[0]).to.have.property('text');
    expect(newState[0].text).to.eql(todo.text);
    expect(newState[0].completed).to.be.true();
  });
});
