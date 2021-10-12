import React, { useEffect, useState, useRef, useContext } from 'react'
import './infoPage.css'
import { UserContext } from '../../context/userContext'
import formatDate from '../../utils/formatDate'

import NavHeader from '../../components/navHeader/NavHeader'
import authPlanner from '../../utils/authPlanner';
import { Link } from 'react-router-dom';
import SideBar from '../../components/sidebar/SideBar';

function InfoPage() {

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [users, setUsers] = useState<any>();
    const [id, setId] = useState<string>();
    const [delList, setDelList] = useState<any>();
    const [currentTask, setCurrentTask] = useState<any>();
    const [pageInfo, setPageInfo] = useState<any>();

    useEffect(() => {
        const queryString = window.location.pathname;
        const start = queryString.search('=') + 1
        const end = queryString?.lastIndexOf('/')
        setId(queryString.substring(start, end))
        authPlanner(id)
            .then((data: any) => {
                console.log(data.data.planner)
                setPageInfo(data.data.planner)
                setCurrentTask(data?.data?.planner?.tasks)
                setDelList(data.data.delList)
                setUsers(data.data.planner?.users)
            })
    }, [id, userInfoContext])
    return (
        <>
            <NavHeader users={users} />
            <div style={{ display: 'flex', width: '100%', height: "100%" }}>
                <SideBar />
                <div className="infoPage">

                    <Link to={`../id=${id}`}>
                        <h2>{pageInfo?.name}</h2><br />

                    </Link>
                    <p>created at: {formatDate(pageInfo?.CreatedAt, true)}</p>
                    <p>{pageInfo?.desciption}</p>
                    tasks finisheds: {delList?.length} <br />
                    tasks oppened: {currentTask?.length}

                </div>
            </div>


        </>
    )
}

export default InfoPage
