import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

function SideBar() {

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [showPlanners, setShowPlanners] = useState<any>([])

    useEffect(() => {
        console.log("atualizado")
        setShowPlanners([])
        userInfoContext?.userInfo?.planners?.forEach((element: any) => {

            setShowPlanners((oldArray: any) => [...oldArray,
            <li>
                <Link
                    to={`../planner/id=${element.plannerId}`} key={element.plannerId}>
                    {element.name}
                </Link>
            </li>])
        })

    }, [userInfoContext, setUserInfoContext])



    return (
        <div>

            <ul>{showPlanners}</ul>

        </div>
    )
}

export default SideBar
