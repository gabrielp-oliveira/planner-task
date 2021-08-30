import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import Default from './defaultColumns'
import auth from '../../utils/auth'
import logout from '../../utils/logout';

function NewStage({ formInfo, step, currentInfo, status }: any) {

    const StageName = useRef<HTMLInputElement>(null);
    const StageDesc = useRef<HTMLInputElement>(null);

    function done() {
        auth.then((data) => {
            if (!data.data.error) {
                if (currentInfo.length > 0) {
                    status(true)
                    step(3)
                } else {
                    alert('ta vazio ai')
                }
            } else {
                alert(data.data.error)
                logout()
            }
        }).catch((data) => {
            console.log(data)
            alert(data)
            logout()
        })

    }
    function callPrecursorStage() {
        status(false)
        step(1)
    }


    function createNewStage() {
        if (currentInfo?.find((el: any) => el.StageName === StageName.current?.value) === undefined) {
            if (StageName.current?.value.trim() !== '') {

                formInfo((oldArray: any) => [...oldArray, {
                    StageName: StageName.current?.value,
                    StageDesc: StageDesc.current?.value
                }])
                console.log(currentInfo)
            } else {
                alert('use a valid name')
            }
        } else {
            alert('name allready in use')
        }
    }
    function defaultStage() {
        formInfo([])
        Default.forEach(element => {
            formInfo((oldArray: any) => [...oldArray, {
                StageName: element.StageName,
                StageDesc: element.StageDesc
            }
            ])
        });
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        const items = Array.from(currentInfo)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)

        formInfo(items)
        console.log(items)
        console.log(currentInfo)
    }

    function deletethis(ev: any) {
        const newArray = currentInfo.filter((element: any) => {
            return element.StageName !== ev
        })
        formInfo(newArray)
    }

    return (
        <>
            <span>colunas</span>

            <div>
                <label htmlFor="">nome</label>
                <input type="text" ref={StageName} placeholder="stage Name" />
            </div>
            <div>
                <label htmlFor="">descricao</label>
                <input type="text" ref={StageDesc} placeholder="stage Description" />
            </div>
            <button onClick={createNewStage}> New Stage</button>
            <button onClick={defaultStage}>pre-created stage</button>
            <button onClick={callPrecursorStage}> back</button>
            <button onClick={done}> Done</button>

            <div className="columnList">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
                                {currentInfo.map(({ StageName, StageDesc }: any, index: any) => {
                                    return (
                                        <Draggable key={StageName} draggableId={StageName} index={index}>
                                            {(provided, snapshot) => (
                                                <div className={snapshot.isDragging? "dragging column" : "column"}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {StageName}
                                                    {StageDesc}
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
        </>
    )
}

export default NewStage
