import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType } from 'react-addons-test-utils';
import TodoList from './TodoList';
import Todo from './Todo';
import { expect } from 'chai';

describe('(Component) TodoList', () => {
  it('renders a div with class \'todo-list\'', () => {
    let todos = [];
    const component = renderIntoDocument(
      <TodoList todos={todos} onTodoClick={(param) => null} />
    );

    const todoListElmt = findRenderedDOMComponentWithClass(component, 'todo-list');
    expect(todoListElmt).to.be.ok;
  });

  it('renders a Todo component for each todo item', () => {
    const todos = [
      { id: 1, completed: true, onClick: (param) => null, text: 'This test Todo is completed' },
      { id: 2, completed: false, onClick: (param) => null, text: 'Put the kids in bath' },
      { id: 3, completed: false, onClick: (param) => null, text:'Dress the kids' }
    ];
    const component = renderIntoDocument(
      <TodoList
        todos={todos} onTodoClick={(param) => null}
      />
    );
    const todoListElmt = scryRenderedComponentsWithType(component, Todo);

    expect(todoListElmt.length).to.equal(3);

    const todo1 = ReactDOM.findDOMNode(todoListElmt[0]).textContent;
    const todo2 = ReactDOM.findDOMNode(todoListElmt[1]).textContent;
    const todo3 = ReactDOM.findDOMNode(todoListElmt[2]).textContent;

    expect(todo1).to.equal(todos[0].text);
    expect(todo2).to.equal(todos[1].text);
    expect(todo3).to.equal(todos[2].text);
  });
});
