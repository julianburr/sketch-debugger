import React, { Component, PropTypes } from 'react';
import Link from 'components/link';

import 'styles/app.scss';

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <div className='tab-bar'>
          <ul>
            <li><Link to='/console'>Console</Link></li>
            <li><Link to='/elements'>Elements</Link></li>
            <li><Link to='/network'>Network</Link></li>
            <li><Link to='/actions' disabled>Actions</Link></li>
          </ul>
        </div>
        <div className='tab-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
