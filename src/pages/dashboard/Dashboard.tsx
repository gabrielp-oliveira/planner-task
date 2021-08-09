import React, { useEffect, useState, useRef, useContext } from 'react'
import './Dashboard.css'
import { UserContext } from '../../context/userContext'
import api from '../../api/api'
import { createBrowserHistory } from 'history';
import Header from '../../components/header/header'

function Dashboard() {
    // const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)


    return (
        <div className="dashboard">
            <Header></Header>
            <div>
                <div className="lateral">lateral nav</div>
                <main>dashboard body</main>
            </div>

        </div>
    )
}

export default Dashboard
