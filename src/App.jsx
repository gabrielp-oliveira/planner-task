import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Planner from './pages/planner/Planner';
import InfoPage from './pages/info/infoPage'
import Profile from './pages/Profile/ProfilePage';
import Forgot from './pages/auth/ForgotPassword/Forgot'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRouter from './utils/ProtectedRouter';
import HomePage from './pages/homePage/HomePage';
import verifyAccount from './pages/auth/verifyAccount/verifyAccount';
import NewPlannerForm from './components/newPlannerForm/newPlannerForm'

import { UserContext } from './context/userContext'
import auth from './utils/auth'
// import logout from './utils/logout';


function App() {
  const { userInfoContext, setUserInfoContext } = useContext(UserContext)

  const [acess, setAcess] = useState();

  useEffect(() => {

    auth
      .then((data) => {

        if (!data.data.error) {
          setUserInfoContext(data.data)
          setAcess(true)
        } else {
          setAcess(false)
        }
      }).catch((data) => {
        setAcess(false)
      })

  }, [setUserInfoContext])

  return (
    <div className="App">
      <Router>
        <Switch>

          <ProtectedRouter path="/register"
            Comp={Register} isAuth={!acess} redirect="/" />

          <ProtectedRouter path="/login"
            Comp={Login} isAuth={!acess} redirect="/" />

          <ProtectedRouter path="/forgotpassword"
            Comp={Forgot} isAuth={!acess} redirect="/" />

          <ProtectedRouter path="/verifyAccount"
            Comp={verifyAccount} isAuth={!acess} redirect="/" />

          <ProtectedRouter path="/profile/newPlanner"
            Comp={NewPlannerForm} isAuth={true} redirect="/" />

          <Route path="/" exact component={HomePage} />
          <Route path="/profile" exact component={Profile} />

          <ProtectedRouter path="/planner/id=:id/info"
            Comp={InfoPage} isAuth={acess} redirect="/" />

          <ProtectedRouter path="/planner/id=:id"
            Comp={Planner} isAuth={acess} redirect="/" />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
