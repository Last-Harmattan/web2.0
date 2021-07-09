import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Banner } from './component/Banner';
import { Feed } from './pages/Feed';
import { Signup } from './pages/Signup';
import { RootState } from './state/reducers';
import { AppDispatch } from './state/store';
import { initUser } from './state/userSlice';

const customHistory = createBrowserHistory();
export function App() {
  const dispatch: AppDispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => !!state.user.currentUser);

  useEffect(() => {
    // We need the user state everywhere in our app so initialize it here.
    dispatch(initUser());
  }, [dispatch]);

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
