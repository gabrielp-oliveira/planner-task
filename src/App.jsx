import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Planner from './pages/planner/Planner';
import Profile from './pages/Profile/ProfilePage';
import Forgot from './pages/auth/ForgotPassword/Forgot'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRouter from './utils/ProtectedRouter';
import { createBrowserHistory } from 'history'
import HomePage from './pages/homePage/HomePage';
import Confirmation from './pages/auth/confirmation/Confirmation';

import { UserContext } from './context/userContext'
import auth from './utils/auth'
import logout from './utils/logout';


function App() {
  const { userInfoContext, setUserInfoContext } = useContext(UserContext)


  useEffect(() => {

        auth
        .then((data) => {

          if (!data.data.error) {
            console.log(data.data)
            setUserInfoContext(data.data)
          } else {
            console.log('.')
            // logout()
          }
        }).catch((data) => {
          console.log('.')
          // logout()
        })
    
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>

          <ProtectedRouter path="/register"
            Comp={Register} isAuth={!localStorage.getItem('userValid')} redirect="profile" />

          <ProtectedRouter path="/login"
            Comp={Login} isAuth={!localStorage.getItem('userValid')} redirect="profile" />

          <ProtectedRouter path="/forgotpassword"
            Comp={Forgot} isAuth={!localStorage.getItem('userValid')} redirect="profile" />


          <Route path="/" exact component={HomePage} />
          <Route path="/planner" exact component={HomePage} />
          <Route path="/confirmationpassword" component={Confirmation} />

          <ProtectedRouter path="/planner/id=:id"
            Comp={Planner} isAuth={localStorage.getItem('userValid')} redirect="/" />

            <ProtectedRouter path="/profile" render={(props) => {return props}}
              Comp={Profile} isAuth={localStorage.getItem('userValid')} redirect="/login" />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
