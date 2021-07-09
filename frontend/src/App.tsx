import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Banner } from './component/Banner';
import { Feed } from './pages/Feed';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TestSidePostCommentDB } from './database/TestSidePostCommentDB';

const customHistory = createBrowserHistory();
export function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  /*
  return (
    <div>
      <Router history={customHistory}>
        <Banner></Banner>

        <Switch>
          <Route path='/login'>{isLoggedIn ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/signup'>{isLoggedIn ? <Redirect to='/' /> : <Signup />}</Route>
          <Route path='/'>{isLoggedIn ? <Feed /> : <Redirect to='/login' />}</Route>
        </Switch>
      </Router>
    </div>
  );
  */

  return <TestSidePostCommentDB></TestSidePostCommentDB>;
}
