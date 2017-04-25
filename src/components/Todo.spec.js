import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import Todo from './Todo';
import { expect } from 'chai';

describe('(Component) Todo', () => {
  it('renders a li with striped through text if completed', () => {
    let completed = true;
    let onClick = (param) => null;
    let text = 'This test Todo is completed';

    const component = renderIntoDocument(
      <Todo onClick={onClick} completed={completed} text={text} />
    );

    const todo = findRenderedDOMComponentWithClass(component, 'todo');
    expect(todo).to.be.ok;
    const todoText = todo.textContent;
    expect(todoText).to.equal(text);
  });
});
