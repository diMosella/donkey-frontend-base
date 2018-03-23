import React, { PureComponent } from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { hot } from 'react-hot-loader';

class App extends PureComponent {
  render () {
    return <div className='app'>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>;
  }
};

export default hot(module)(App);
