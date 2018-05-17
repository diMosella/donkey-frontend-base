import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import AddTodo from '../../containers/AddTodo';

class HeaderLayout extends PureComponent {
  render = () => {
    return (
      <Route path='/' exact component={AddTodo} />
    );
  }
}

export default HeaderLayout;
