import React, {useEffect, useState, useContext} from 'react'
import './profilePage.css'
import userInfo from '../../models/UserInfo'

import {createBrowserHistory} from 'history'
import { UserContext } from '../../context/userContext'
import Header from '../../components/header/header'


function ProfilePage() {
    const { userInfoContext } = useContext<any>(UserContext)
    const [ userInfo, setUserInfo ] = useState<userInfo>()


    useEffect(() => {
        setUserInfo(userInfoContext.userInfo)
    }, [])
    
    return (
        <>
            <div className="profile">
            <Header></Header>
            <div>
                <div className="lateral">lateral nav</div>
                <main><h1>Welcome {userInfo?.name}</h1></main>
            </div>

        </div>
        </>
    )
}

export default ProfilePage
