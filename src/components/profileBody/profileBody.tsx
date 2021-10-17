import React, { useEffect, useState, useContext } from 'react'
import './profileBody.css'

import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import ProtectedRouter from '../../utils/ProtectedRouter';

import NewPlannerForm from '../newPlannerForm/newPlannerForm';
import { useHistory } from "react-router-dom";

import { UserContext } from '../../context/userContext'
import api from '../../api/api';
import { Button } from '@material-ui/core';

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


                    <ProtectedRouter path="/profile/"
                        Comp={Welcome} isAuth={true} redirect="/" />
                </Switch>

            </Router>
        </main>
    )
}

export default ProfileBody


const Welcome = ({name, email}: any) => {
    const history = useHistory();
    
    function goTo(){
        history.push('/profile/newPlanner')
        document.location.reload(); 
    }
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
            <div style={{marginTop: '10px'}}>welcome, {userInfoContext?.userInfo.name}</div>
            <br />
            <Button onClick={goTo} className="link" style={{background:'rgb(14, 121, 28, 0.8)', color: 'white', marginTop: '25px'}}> Create New planner</Button>

        </div>
    )
}

