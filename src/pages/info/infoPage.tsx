import React, { useEffect, useState, useRef, useContext } from 'react'
import { UserContext } from '../../context/userContext'


import NavHeader from '../../components/navHeader/NavHeader'
import authPlanner from '../../utils/authPlanner';
import { Link } from 'react-router-dom';

function InfoPage() {

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [users, setUsers] = useState<any>();
    const [id, setId] = useState<string>();
    const [delList, setDelList] = useState<any>();
    const [currentTask, setCurrentTask] = useState<any>();

    useEffect(() => {
        const queryString = window.location.pathname;
        const start = queryString.search('=') + 1
        const end = queryString?.lastIndexOf('/')
        setId(queryString.substring(start, end))
        authPlanner(id)
            .then((data: any) => {
                setCurrentTask(data?.data?.planner?.tasks)
                setDelList(data.data.delList)
                setUsers(data.data.planner?.users)
            })
    }, [id, userInfoContext])
    return (
        <>
            <NavHeader users={users} />
            <Link to={`../id=${id}`}>back</Link>
            <div>
                tasks finisheds: {delList?.length} <br />
                tasks oppened: {currentTask?.length}
                
            </div>

        </>
    )
}

export default InfoPage
