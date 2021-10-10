import React, { useEffect, useState, useContext } from 'react'
import './sideBar.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import stringFormat from '../../utils/stringFormat';
import Tooltip from '@material-ui/core/Tooltip';
import FormatDate from '../../utils/formatDate';

function SideBar() {

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [showPlanners, setShowPlanners] = useState<any>([])

    useEffect(() => {
        setShowPlanners([])
        userInfoContext?.userInfo?.planners?.forEach((element: any) => {

            setShowPlanners((oldArray: any) => [...oldArray,
            <div>
                <Tooltip
                title={element.name?.length > 12? element.name : ''} placement="top-end">
                    <Link
                        to={`../planner/id=${element.plannerId}`} key={element.plannerId}>
                        {stringFormat(element.name, 15)}
                    </Link>
                </Tooltip>
            </div>])
        })

    }, [userInfoContext, setUserInfoContext])



    return (
        <div className="plannerList">
            <div>

                <br />
            </div>
            <div>{showPlanners}</div>
        </div>
    )
}

export default SideBar
