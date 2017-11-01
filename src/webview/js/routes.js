import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store';
import { sendAction } from 'utils/sketch';

import App from 'components/screens/app';
import Console from 'components/screens/console';
import Elements from 'components/screens/elements';
import Network from 'components/screens/network';
import Actions from 'components/screens/actions';
import NotFound from 'components/screens/404';

class Redirect extends Component {
  componentDidMount () {
    history.push(this.props.to);
  }

  render () {
    return null;
  }
}

export default class Routes extends Component {
  componentDidMount () {
    sendAction('requestInitialData').catch(console.error);
  }

  render () {
    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={() => <Redirect to="/console" />} />
          <Route path="console" component={Console} />
          <Route path="elements" component={Elements} />
          <Route path="network" component={Network} />
          <Route path="actions" component={Actions} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}
