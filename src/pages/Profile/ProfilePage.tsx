import React, { useEffect, useState, useContext } from 'react'
import './profilePage.css'
import userInfo from '../../models/UserInfo'
import auth from '../../utils/auth'

import { UserContext } from '../../context/userContext'
import Header from '../../components/header/header'
import ProfileBody from '../../components/profileBody/profileBody'

import logout from '../../utils/logout'
import SideBar from '../../components/sidebar/SideBar'

function ProfilePage() {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [userInfo, setUserInfo] = useState<userInfo>()


    useEffect(() => {
        auth.then((data) => {

            setTimeout(() => {


                if (!data.data.error) {
                    console.log(data.data)
                    setUserInfoContext(data.data)
                } else {
                    logout()
                    console.log(data.data)
                }
            }, 100);
        })

            .catch((error) => {
                console.log(error)
                logout()
            })
    }, [])

    return (
        <>
            <div className="profile">
                <Header></Header>
                <div>
                    <SideBar></SideBar>
                    <ProfileBody></ProfileBody>
                </div>

            </div>
        </>
    )
}

export default ProfilePage
