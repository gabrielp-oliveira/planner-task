import React, { useEffect, useState } from 'react'
import './column.css'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import Task from '../task/task'

function Column({ classN, refe, element, setDelModal, setTaskModal, setColumnId, setColumnName, canChange, setDestination }: any) {
    
    
    const [functions, setFunctions] = useState<any>('')
    const [tasksOrder, setTasksOrder] = useState<any>()

    function deleteColumn(id: string, name: string) {
        setColumnId(id)
        setDelModal(true)
        setColumnName(name)
    }
    function addNewTask(id: string) {
        setTaskModal(true)
        setColumnId(id)
    }


    useEffect(() => {
        if (canChange === true) {
            setFunctions(<div>
                <FontAwesomeIcon icon={faTrashAlt}
                    onClick={() => deleteColumn(element._id, element.StageName)} />

                <FontAwesomeIcon icon={faPlus}
                    onClick={() => addNewTask(element._id)} />
            </div>)
        } else {
            setFunctions('')
        }


    }, [canChange])



    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        console.log('?')
        if (!destination) return
        const items = Array.from(element?.tasks)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)
        element.tasks = items
        setTasksOrder(items)
    }

    return (
        <div className={classN}
            ref={refe?.innerRef}
            {...refe?.draggableProps}
            {...refe?.dragHandleProps}
        >

            <div className="columnHeader">
                <div>{canChange ? functions : '_'}</div>
                <span>{element.StageName}</span>
            </div>

            <div className="columnBody">
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* <Droppable droppableId="task" direction="vertical">
                        {(provided) => (
                            <div  {...provided.droppableProps} ref={provided.innerRef}>
                                {element?.tasks?.map((el: any, index: any) => {
                                    return (

                                                <Task info={el}
                                                    classN={"Tasks"}
                                                    refe={provided}
                                                    el={el}
                                                />

                                    )
                                })}
                            </div>
                        )}
                    </Droppable> */}
                </DragDropContext>
            </div>
        </div>


    )
}
export default Column