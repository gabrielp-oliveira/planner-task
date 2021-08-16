import React, { useEffect, useState, useRef, useContext } from 'react'
import './Planner.css'
import { UserContext } from '../../context/userContext'

import authPlanner from '../../utils/authPlanner'
import Header from '../../components/header/header'
import logout from '../../utils/logout';

import plannerModel from '../../models/PlannerModel'
function Planner({ props }: any) {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [stages, setStages] = useState<any>([])

    useEffect(() => {

        const queryString = window.location.pathname;

        const start = queryString.search('=') + 1
        const end = queryString.length
        const id = queryString.substring(start, end)
        authPlanner(id)
            .then((data) => {
                if (data.data.error) {
                    logout()
                } else {
                    setStages([])
                    data.data.stages.forEach((el: any) => {
                        console.log(el)
                        setStages((oldArray: any) => [...oldArray, <div key={el._id}>{el.StageName}</div>])
                    })
                }
            })
            .catch((error) => {
                alert(error)
                logout()
            })

    }, [props.match.params?.id, userInfoContext])

    return (
        <>
            <div className="header"><Header></Header></div>
            <div className="Planner">
                <div className="column">
                    {stages}
                </div>

            </div>
        </>
    )
}

export default Planner
