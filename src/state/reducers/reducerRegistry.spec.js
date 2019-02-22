import { expect } from 'chai';
import reducerRegistry, { EVENTS } from './reducerRegistry';

describe('(Reducers)', () => {
  describe('ReducerRegistry', () => {
    it('should give an empty reducers object', () => {
      expect(reducerRegistry.read()).to.be.a('object');
      expect(Object.entries(reducerRegistry.read())).to.have.length(0);
    });
  });
  describe('ReducerRegistry.read', () => {
    it('should be a function.', () => {
      expect(reducerRegistry.read).to.be.a('function');
    });
  });

  describe('ReducerRegistry.register', () => {
    it('should be a function.', () => {
      expect(reducerRegistry.register).to.be.a('function');
    });
    it('should add a named reducer.', () => {
      reducerRegistry.register('test1', (state, action) => 'testState');
      expect(reducerRegistry.read()).to.be.a('object');
      expect(Object.entries(reducerRegistry.read())).to.have.length(1);
      expect(reducerRegistry.read()).to.have.property('test1');
      expect(reducerRegistry.read('test1')).to.be.a('function');
      expect(reducerRegistry.read('test1')({}, 'TEST')).to.eql('testState');
      reducerRegistry.register('test2', (state, action) => 'testState2');
      expect(reducerRegistry.read()).to.be.a('object');
      expect(Object.entries(reducerRegistry.read())).to.have.length(2);
      expect(reducerRegistry.read()).to.have.property('test1');
      expect(reducerRegistry.read()).to.have.property('test2');
      expect(reducerRegistry.read('test2')).to.be.a('function');
      expect(reducerRegistry.read('test2')({}, 'TEST')).to.eql('testState2');
    });
  });

  describe('ReducerRegistry.unregister', () => {
    it('should be a function.', () => {
      expect(reducerRegistry.unregister).to.be.a('function');
    });
    it('should remove a named reducer.', () => {
      expect(reducerRegistry.read()).to.be.a('object');
      expect(Object.entries(reducerRegistry.read())).to.have.length(2);
      expect(reducerRegistry.read()).to.have.property('test1');
      expect(reducerRegistry.read()).to.have.property('test2');
      reducerRegistry.unregister('test1');
      expect(reducerRegistry.read()).to.be.a('object');
      expect(Object.entries(reducerRegistry.read())).to.have.length(1);
      expect(reducerRegistry.read()).to.have.property('test2');
      expect(reducerRegistry.read()).to.not.have.property('test1');
    });
  });

  describe('ReducerRegistry.addEventListener', () => {
    it('should be a function.', () => {
      expect(reducerRegistry.addEventListener).to.be.a('function');
    });
    it('should trigger a register event.', () => {
      let toggledTrigger1 = false;
      expect(reducerRegistry.read()).to.be.a('object');
      reducerRegistry.addEventListener(EVENTS.REGISTER, () => { toggledTrigger1 = !toggledTrigger1; });
      expect(toggledTrigger1).to.eql(false);
      reducerRegistry.register('test3', (state, action) => 'testState3');
      expect(toggledTrigger1).to.eql(true);
      reducerRegistry.unregister('test3');
      expect(toggledTrigger1).to.eql(true);
      reducerRegistry.register('test4', (state, action) => 'testState4');
      expect(toggledTrigger1).to.eql(false);
    });
    it('should trigger an unregister event.', () => {
      let toggledTrigger2 = false;
      expect(reducerRegistry.read()).to.be.a('object');
      reducerRegistry.addEventListener(EVENTS.UNREGISTER, () => { toggledTrigger2 = !toggledTrigger2; });
      expect(toggledTrigger2).to.eql(false);
      reducerRegistry.register('test5', (state, action) => 'testState5');
      expect(toggledTrigger2).to.eql(false);
      reducerRegistry.unregister('test5');
      expect(toggledTrigger2).to.eql(true);
      reducerRegistry.register('test6', (state, action) => 'testState6');
      expect(toggledTrigger2).to.eql(true);
      reducerRegistry.unregister('test6');
      expect(toggledTrigger2).to.eql(false);
    });
    it('should trigger a change event.', () => {
      let toggledTrigger3 = false;
      expect(reducerRegistry.read()).to.be.a('object');
      reducerRegistry.addEventListener(EVENTS.CHANGE, () => { toggledTrigger3 = !toggledTrigger3; });
      expect(toggledTrigger3).to.eql(false);
      reducerRegistry.register('test7', (state, action) => 'testState7');
      expect(toggledTrigger3).to.eql(true);
      reducerRegistry.unregister('test7');
      expect(toggledTrigger3).to.eql(false);
    });
  });
});
