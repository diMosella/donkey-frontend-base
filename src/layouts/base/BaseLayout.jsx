import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import AddTodo from '../../containers/AddTodo';
import VisibleTodoList from '../../containers/VisibleTodoList';
import Footer from '../../components/Footer';

class BaseLayout extends PureComponent {
  render = () =>
    <div className='baseLayout'>
      <header>
        <Route path='/' exact component={AddTodo} />
      </header>
      <main>
        <Route path='/' exact component={VisibleTodoList} />
        <Route path='/users' component={VisibleTodoList} />
      </main>
      <footer>
        <Route path='/' exact component={Footer} />
      </footer>
    </div>;
}

export default BaseLayout;
