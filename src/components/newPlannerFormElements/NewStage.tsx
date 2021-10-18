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
        auth.then((data) => {
            if (!data.data.error) {
                if (currentInfo.length > 0) {
                    status(true)
                    step(3)
                } else {
                    setErrorInfo('you have to create unless one stage for your planner')
                    setCallError(true)
                }
            } else {
                setErrorInfo(data.data.error) 
                setCallError(true)
                // logout()
            }
        }).catch((data) => {
                setErrorInfo(data)
                setCallError(true)
            // logout()
        })

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
                    setErrorInfo('use a valid name')
                    setCallError(true)
                }
            } else {
                setErrorInfo('name allready in use')
                setCallError(true)
            }
        } else {
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
                        <Button onClick={callPrecursorStage} variant="contained" color="secondary">
                            <FontAwesomeIcon icon={faBackward} />
                        </Button>
                        <Button onClick={done} variant="contained" color="primary">
                            Done !
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button variant="contained" onClick={defaultStage} style={{background:"rgb(7, 84, 226)", color: 'white'}} >pre-created stage</Button>
                        <Button variant="contained" onClick={createNewStage} style={{background:"rgb(179, 0, 140)", color: 'white'}}> New Stage</Button>
                    </div>

                </div>
                <span>you can drag and drop the stages to reorder then.</span>
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
                                                            title={<span className="mat-tooltip">{StageDesc ? StageName + ' - ' + StageDesc : ''}</span>} placement="top-end">
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
