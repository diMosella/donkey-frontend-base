import React, { PureComponent } from 'react';

class Welcome extends PureComponent {
  render () {
    return <div className='page'>
      <h1>Welcome to Very Simple Todos</h1>
      <p>This application is intended to represent a showcase and implementation example of
        the various combined technologies (React, Redux, Routes, Layouts, Multilingual, etc.).</p>
    </div>;
  }
}

export default Welcome;
