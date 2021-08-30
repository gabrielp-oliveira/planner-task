import React, { useEffect, useState, useRef, useContext } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import './Planner.css'
import { UserContext } from '../../context/userContext'

import authPlanner from '../../utils/authPlanner'
import Header from '../../components/header/header'
import logout from '../../utils/logout';
import api from '../../api/api'
import PlannerProvider from '../../context/plannerContext'

function Planner({ props }: any) {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [stages, setStages] = useState<any>([])
    const [acess, setAcess] = useState<string>()

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
                    console.log(data.data)
                    setAcess(data.data.acess)
                    setStages(data.data.planner.stages)
                }
            })
            .catch((error) => {
                alert(error)
                logout()
            })

    }, [props.match.params?.id, userInfoContext])

    const onDragEnd = (result: DropResult) => {

        if (acess === 'total') {

            const { source, destination } = result
            if (!destination) return

            const items = Array.from(stages)
            const [newOrder] = items.splice(source.index, 1)
            items.splice(destination.index, 0, newOrder)

            setStages(items)
            console.log(items)
        } else {
            alert('you dont have permission')
        }
    }


    return (
        <>
            <PlannerProvider>

                <div className="header"><Header></Header></div>
                <div className="Planner">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="stage" direction="horizontal">
                            {(provided) => (
                                <div className="stage" {...provided.droppableProps} ref={provided.innerRef}>
                                    {stages?.map((element: any, index: any) => {
                                        return (
                                            <Draggable key={element._id} draggableId={element.StageName} index={index} >
                                                {(provided, snapshot) => (
                                                    <div className={snapshot.isDragging ? "dragging column" : "column"}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {element.StageName}
                                                        {/* {console.log(element)} */}
                                                        {/* {StageDesc} */}
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </PlannerProvider>

        </>
    )
}

export default Planner
