import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Banner } from './component/Banner';
import { Feed } from './pages/Feed';
import { Signup } from './pages/Signup';

const customHistory = createBrowserHistory();
export function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div>
      <Router history={customHistory}>
        <Banner></Banner>

        <Switch>
          <Route path='/signup'>{isLoggedIn ? <Redirect to='/' /> : <Signup />}</Route>
          <Route path='/'>{isLoggedIn ? <Feed /> : <Redirect to='/signup' />}</Route>
        </Switch>
      </Router>
    </div>
  );
}
