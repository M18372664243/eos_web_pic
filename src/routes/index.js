import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/common/history';

import Login from '../components/tag/Login';
import Home from '../components/tag/Home';
import NoMatch from '../components/tag/404';
import Form from '../components/tag/Form';

class MRoute extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/eos_web_pic" component={Home}/>
          <Route exact path="/eos_web_pic/form" component={Form}/>
          <Route path="/eos_web_pic/login" component={Login}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default MRoute;