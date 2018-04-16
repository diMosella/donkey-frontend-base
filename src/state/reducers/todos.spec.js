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
    expect(newState[0].id).to.equal(123);
    expect(newState[0]).to.have.property('text');
    expect(newState[0].text).to.eql(todoText);
    expect(newState[0].completed).to.be.false();
  });
});
/*   describe('(Reducer)', () => {
    i

    it('Can add a new notification.', () => {
      const notification = {
        type: 'ADD_NOTIFICATION',
        payload: {
          raw: {
            name: 'asdf',
            issuedate: moment()
          }
        }
      };

      const newState = recentTriggerReducer([], notification);
      expect(newState).to.have.length(1);
      expect(newState[0]).to.have.property('name');
      expect(newState[0].name).to.equal('asdf');
      expect(newState[0]).to.have.property('discarded');
      expect(newState[0].discarded).to.be.false();
    }); */
