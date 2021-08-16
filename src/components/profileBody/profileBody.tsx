import React, { useEffect, useState, useContext } from 'react'
import './profileBody.css'

import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import ProtectedRouter from '../../utils/ProtectedRouter';

import NewPlannerForm from '../newPlannerForm/newPlannerForm';

import { UserContext } from '../../context/userContext'

function ProfileBody() {

    const { userInfoContext } = useContext<any>(UserContext)
    const [userInfo, setUserInfo] = useState<any>()


    useEffect(() => {
        setUserInfo(userInfoContext?.userInfo)
    }, [userInfoContext?.userInfo])



    return (
        <main>
            <Router>
                <Switch>

                    <ProtectedRouter path="/profile/newPlanner"
                        Comp={NewPlannerForm} isAuth={localStorage.getItem('userValid')} redirect="/" />

                    <ProtectedRouter path="/profile/"
                        Comp={Welcome} isAuth={localStorage.getItem('userValid')} redirect="/" />
                </Switch>

            </Router>
        </main>
    )
}

export default ProfileBody


const Welcome = () => {
    return (
        <div>
            welcome to your profile!<br />
            <Link to="/profile/newPlanner"> criar novo planner</Link>

        </div>
    )
}

