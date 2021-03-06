import React, { useEffect, useState, useContext } from 'react'
import './sideBar.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import stringFormat from '../../utils/stringFormat';
import Tooltip from '@material-ui/core/Tooltip';
import SideBarResp from '../sideBarResp/sideBarResp';

function SideBar({ plannerInfo }: any) {

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [showPlanners, setShowPlanners] = useState<any>([])

    useEffect(() => {
        setShowPlanners([])
        setShowPlanners([<span>{plannerInfo}</span>])
        userInfoContext?.planners?.forEach((element: any) => {

            setShowPlanners((oldArray: any) => [...oldArray,
            <div className="plannerItem">
                <Tooltip
                    title={element.name?.length > 15 ? <span className="text">{element.name}</span>  : ''} placement="top-end">
                    <Link
                        to={`../../planner/id=${element.plannerId}`} key={element.plannerId}>
                        {stringFormat(element.name, 15)}
                    </Link>
                </Tooltip>
            </div>])
        })
    }, [userInfoContext, setUserInfoContext, plannerInfo])



    return (
        <>
            <div className="plannerList">
                <div>

                {/* <span>{plannerInfo}</span> */}
                <br />
                </div>
                <div>{showPlanners}</div>
            </div>
            <SideBarResp planners={showPlanners}/>
        </>
    )
}

export default SideBar
