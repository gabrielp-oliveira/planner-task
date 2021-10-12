import React, { useEffect, useState, useContext } from 'react'
import './profileBody.css'

import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import ProtectedRouter from '../../utils/ProtectedRouter';

import NewPlannerForm from '../newPlannerForm/newPlannerForm';

import { UserContext } from '../../context/userContext'
import api from '../../api/api';

function ProfileBody() {

    const { userInfoContext } = useContext<any>(UserContext)
    const [userInfo, setUserInfo] = useState<any>()


    useEffect(() => {
        setUserInfo(userInfoContext?.userInfo)
        console.log(userInfoContext?.userInfo)
    }, [userInfoContext?.userInfo])



    return (
        <main>
            <Router>
                <Switch>

                    <ProtectedRouter path="/profile/newPlanner"
                        Comp={NewPlannerForm} isAuth={true} redirect="/" />

                    <ProtectedRouter path="/profile/"
                        Comp={Welcome} isAuth={true} redirect="/" />
                </Switch>

            </Router>
        </main>
    )
}

export default ProfileBody


const Welcome = ({name, email}: any) => {

    const { userInfoContext } = useContext<any>(UserContext)

    useEffect(() => {
        api.get('/task/userTasks', {
            params: {
                userEmail: userInfoContext?.userInfo?.email
            }
        })
    }, [])
    return (
        <div>
            welcome, {userInfoContext?.userInfo.name}.<br />
            <Link to="/profile/newPlanner"> New planner</Link>

        </div>
    )
}

