import chai from 'chai';
import { List, Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
import todos from './todos';
chai.use(chaiImmutable);
const expect = chai.expect;

describe('(Reducer) todos', () => {
  it('should be a function.', () => {
    expect(todos).to.be.a('function');
  });
  it('should initialize with an empty state.', () => {
    expect(todos(undefined, [])).to.eql(List());
  });
  it('should return the previous state if an action was not matched.', () => {
    let state = todos(undefined, []);
    expect(state).to.eql(List());
    state = todos(state, { type: '@@@@@@@' });
    expect(state).to.eql(List());
  });
  it('can add a new TODO.', () => {
    const todoText = 'Test TODO reducer';
    const todoContext = {
      type: 'ADD_TODO',
      text: todoText
    };

    const newState = todos(List(), todoContext);
    expect(newState).to.have.size(1);
    expect(newState.get(0)).to.have.property('id');
    expect(newState.get(0)).to.have.property('text', todoText);
    expect(newState.get(0)).to.have.property('completed', false);
  });
  it('can toggle a TODO.', () => {
    const todo = Map({
      id: 0,
      text: 'Can toggle?',
      completed: false
    });
    const todoContext = {
      type: 'TOGGLE_TODO',
      id: 0
    };

    const newState = todos(List.of(todo), todoContext);
    expect(newState).to.have.size(1);
    expect(newState.get(0)).to.have.property('id', 0);
    expect(newState.get(0)).to.have.property('text', todo.get('text'));
    expect(newState.get(0)).to.have.property('completed', true);
  });
});
