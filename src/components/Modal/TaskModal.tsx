import React, { useState, useContext, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import FormatDate from '../../utils/formatDate';
import taskModel from '../../models/taskModel';
import api from '../../api/api';

import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Task from '../task/task';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    boxShadow: 24,
    padding: '0px'
};


export default function TaskModal({ status, setStatus, taskId, users }: any) {

    const [taskInfo, setTaskInfo] = useState<taskModel>()
    const [showDescInput, setShowDescInput] = useState<any>(false)
    const [showTitleInput, setShowTitleInput] = useState<boolean>(false)
    const [changestitle, setChangesTitle] = useState<boolean>(false)
    const [changesDesc, setChangesDesc] = useState<boolean>(false)
    const [changesAccountables, setChangesAccountables] = useState<boolean>(false)
    const [showAccountablesInput, setShowAccountablesInput] = useState<boolean>(false)
    const descInp = useRef<any>(null);

    const [description, setDescription] = useState<string>('')
    const [title, seTitle] = useState<string>('')
    const [accountables, setAccountables] = useState<[string?]>([])

    function closeModal() {
        setAccountables([])
        seTitle('')
        setDescription('')
        setStatus(false)
        setChangesDesc(false)
        setChangesTitle(false)
        setChangesAccountables(false)
    }

    function removeItemOnce(value: any) {
        const array: any = []
        if (taskInfo?.accountable === undefined) {
            return
        }
        taskInfo?.accountable.forEach((element: any) => {
            if (element === value) {
                return
            } else {
                array.push(element)
            }
        })

        setTaskInfo({
            _id: taskInfo._id,
            CreatedAt: taskInfo.CreatedAt,
            PlanenrId: taskInfo.PlanenrId,
            StageId: taskInfo.StageId,
            accountable: array,
            description: taskInfo.description,
            title: taskInfo.title,
        })

        if (accountables !== array) {
            console.log('true')
            setChangesAccountables(true)
        } else {
            console.log('false')
            setChangesAccountables(false)
        }
    }

    function updateTask() {
        api.put('/task/update', {
            params: {
                updatedTask: taskInfo
            }
        })
            .then(() => {
                // closeModal()
                setShowTitleInput(false)
                setShowDescInput(false)
                setShowAccountablesInput(false)
            })
    }

    useEffect(() => {
        api.get('/task', {
            params: {
                taskId: taskId
            }
        })
            .then((element: any) => {
                setTaskInfo(element.data)
                setDescription(element.data.description)
                seTitle(element.data.title)
                setAccountables(element.data.accountable)
            })
    }, [status])

    useEffect(() => {
        if(showDescInput){
            descInp.current.children[1].children[0].focus()
        }
    }, [showDescInput])
    return (
        <div>
            <Modal
                open={status}
                onClose={() => setStatus(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}
                    className=''>

                    <div className='taskModal'>

                        <div className="taskModalHeader">
                            <div>
                                <p>
                                    <span className="pencil" onClick={() => setShowTitleInput(!showTitleInput)}><FontAwesomeIcon icon={faPencilAlt} /></span>
                                    &nbsp;&nbsp;
                                    {showTitleInput ? <TextField
                                        label="Title"
                                        id="standard-size-small"
                                        defaultValue={taskInfo?.title}
                                        size="small"
                                        variant="standard"
                                        onChange={(value: any) => {
                                            setTaskInfo(() => {
                                                if (taskInfo) {
                                                    let tsk: taskModel = taskInfo;
                                                    tsk.title = value.target.value;
                                                    return tsk
                                                }
                                            })
                                            if (title !== taskInfo?.title) {
                                                setChangesTitle(true)
                                            } else {
                                                setChangesTitle(false)
                                            }
                                        }}
                                    /> : <h3>{taskInfo?.title}</h3>}


                                </p>
                            </div>
                            <div>
                                {FormatDate(taskInfo?.CreatedAt)[0]}&nbsp;&nbsp;{FormatDate(taskInfo?.CreatedAt)[1]}
                            </div>
                        </div>
                        <br />

                        <div className="taskModalBody">
                            <div className="accountableList">
                                {taskInfo?.accountable?.map((el: any) => <div >
                                    <span className="accountable">
                                        <span>{el}</span>&nbsp;&nbsp; <span className={el} onClick={() => removeItemOnce(el)}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></span>
                                    </span>
                                </div>
                                )}
                            </div>
                            <TextField select label="accountable" fullWidth
                                helperText="Please select the accountable for this task." >
                                {users?.map((option: any) => (
                                    <MenuItem
                                        onClick={(e: any) => {

                                            if (taskInfo?.accountable?.indexOf(option.email) === -1) {
                                                const arr = taskInfo.accountable
                                                if(arr.concat(option.email) !== accountables){
                                                    console.log(accountables)
                                                    arr.push(option.email)
                                                    setChangesAccountables(true)
                                                    console.log('true')

                                                }else{
                                                    setChangesAccountables(false)
                                                    console.log('false')
                                                }
                                                setTaskInfo({
                                                    _id: taskInfo._id,
                                                    CreatedAt: taskInfo.CreatedAt,
                                                    PlanenrId: taskInfo.PlanenrId,
                                                    StageId: taskInfo.StageId,
                                                    accountable: arr,
                                                    description: taskInfo.description,
                                                    title: taskInfo.title,
                                                })

                                            } else {
                                                return
                                            }
                                        }}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <span>
                                { !showDescInput?  <span className="pencil" onClick={() => setShowDescInput(!showDescInput)}><FontAwesomeIcon icon={faPencilAlt} /></span> : ''}
                                <br/>
                                {showDescInput ? <TextField
                                    id="outlined-multiline-static"
                                    label={<span className="pencil" onClick={() => setShowDescInput(!showDescInput)}><FontAwesomeIcon icon={faPencilAlt} /> Description</span>}
                                    fullWidth
                                    multiline
                                    // rows={7}
                                    ref={descInp}
                                    defaultValue={taskInfo?.description}
                                    onChange={(value: any) => {
                                        setTaskInfo(() => {
                                            if (taskInfo) {
                                                let tsk: taskModel = taskInfo;
                                                tsk.description = value.target.value;
                                                return tsk
                                            }
                                        })
                                        
                                        if (description !== value.target.value) {
                                            setChangesDesc(true)
                                        } else {
                                            setChangesDesc(false)
                                        }

                                    }
                                    }
                                /> : <span>{taskInfo?.description}</span>}
                            </span>
                            <span>
                            </span>
                        </div>
                        <br />

                        <div className="taskModalButtons">
                            <Button variant="contained" color="primary" onClick={() =>
                                (changestitle || changesDesc || changesAccountables) ? updateTask() : closeModal()
                            }>
                                {(changestitle || changesDesc || changesAccountables) ? 'Salvar' : 'Ok'}
                            </Button>

                            {(changestitle || changesDesc || changesAccountables) ? <Button variant="contained" color="secondary" onClick={closeModal}>Cancel</Button> : ''}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}