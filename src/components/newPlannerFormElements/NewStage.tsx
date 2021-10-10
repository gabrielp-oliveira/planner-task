import React, { useRef, useState, useEffect } from 'react'
import Default from './defaultColumns'

import api from '../../api/api'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import TextField from '@material-ui/core/TextField';

import { faForward, faBackward, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import ErrorModal from '../Modal/errorModal';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import auth from '../../utils/auth'
import stringFormat from '../../utils/stringFormat';

function NewStage({ formInfo, step, currentInfo, status }: any) {

    const [StageName, setStageName] = useState<string>();
    const [StageDesc, setStageDesc] = useState<string>();
    const [errorInfo, setErrorInfo] = useState<string>()
    const [callError, setCallError] = useState<boolean>()
    function done() {
        // auth.then((data) => {
        //     if (!data.data.error) {
        //         if (currentInfo.length > 0) {
        //             status(true)
        //             step(3)
        //         } else {
        //             alert('ta vazio ai')
        //         }
        //     } else {
        //         alert(data.data.error)
        //         // logout()
        //     }
        // }).catch((data) => {
        //     console.log(data)
        //     alert(data)
        //     // logout()
        // })

    }
    function callPrecursorStage() {
        status(false)
        step(1)
    }


    function createNewStage() {
        if (StageName?.trim() !== undefined || StageDesc?.trim() !== undefined) {

            if (currentInfo?.find((el: any) => el.StageName === StageName) === undefined) {
                if (StageName?.trim() !== '') {
                    formInfo((oldArray: any) => [...oldArray, {
                        StageName: StageName,
                        StageDesc: StageDesc
                    }])
                } else {
                    alert('use a valid name')
                }
            } else {
                alert('name allready in use')
            }
        } else {
            alert('error')
            setCallError(true)
            setErrorInfo('some field is empty')
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
            <div className="newPlannerStage">
                <span>stages</span>

                <div>
                    <TextField type="text" label="stage Name" fullWidth onChange={(e) => setStageName(e.target.value)} />
                </div>
                <div>
                    <TextField type="text" id="outlined-multiline-static" multiline onChange={(e) => setStageDesc(e.target.value)} label="stage Description" fullWidth
                        rows={3} />
                </div>
                <div>
                    <div className="buttons">
                        <Button onClick={callPrecursorStage} variant="contained" color="primary">
                            <FontAwesomeIcon icon={faBackward} />
                        </Button>
                        <Button onClick={done} variant="contained" color="primary">
                            <FontAwesomeIcon icon={faForward} />
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button onClick={defaultStage}>pre-created stage</Button>
                        <Button onClick={createNewStage}> New Stage</Button>
                    </div>

                </div>

                <span className="columnList">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="todo" direction="horizontal">
                            {(provided) => (
                                <div id="todo" {...provided.droppableProps} ref={provided.innerRef}>
                                    {currentInfo.map(({ StageName, StageDesc }: any, index: any) => {
                                        return (
                                            <Draggable key={StageName} draggableId={StageName} index={index}>
                                                {(provided, snapshot) => (
                                                    <div className={snapshot.isDragging ? "dragging card" : "card"}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Tooltip
                                                            title={StageDesc ? StageName + ' - ' + StageDesc : ''} placement="top-end">
                                                            <div>
                                                                <span>
                                                                    {stringFormat(StageName, 11)}
                                                                </span>
                                                            </div>
                                                        </Tooltip>
                                                        <Button
                                                            onClick={() => deletethis(StageName)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                </span>
            </div>
            <ErrorModal status={callError} setStatus={setCallError} info={errorInfo} />

        </>
    )
}

export default NewStage
