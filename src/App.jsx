import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/ProfilePage';
import Forgot from './pages/auth/ForgotPassword/Forgot'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRouter from './utils/ProtectedRouter';
import { createBrowserHistory } from 'history'
import HomePage from './pages/homePage/HomePage';
import Confirmation from './pages/auth/confirmation/Confirmation';

import { UserContext } from './context/userContext'
import api from './api/api'

const initialState = {
  userId: '',
  userValid: false,
  token: ''
}
function App() {
  const { userInfoContext, setUserInfoContext } = useContext(UserContext)

  function logout() {
    localStorage.clear()
    createBrowserHistory().push('/login')
    document.location.reload();
    setUserInfoContext(initialState)
  }
  useEffect(() => {

    if (localStorage.getItem('userValid')) {
      api.get('/auth', {
        params: {
          id: localStorage.getItem('UserId')
        }, headers: { authentication: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((data) => {
          console.log(data.data)
          if (!data.data.error) {

            setUserInfoContext(data.data)
          } else {
            console.log('.')
            logout()
          }
        }).catch((data) => {
          console.log('.')
          logout()
        })
    }
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
          <Route path="/confirmaionpassword" component={Confirmation} />


          <Switch>
            <ProtectedRouter path="/profile"
              Comp={Profile} isAuth={localStorage.getItem('userValid')} redirect="login" />

            <ProtectedRouter path="/dashboard"
              Comp={Dashboard} isAuth={localStorage.getItem('userValid')} redirect="login" />
          </Switch>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
