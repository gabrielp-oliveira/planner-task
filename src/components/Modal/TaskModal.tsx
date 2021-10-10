import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import FormatDate from '../../utils/formatDate';
import stringFormat from '../../utils/stringFormat';
import taskModel from '../../models/taskModel';
import api from '../../api/api';

import DeleteTaskModal from './deleteTaskModal'
import ErrorModal from './errorModal'
import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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

    const [taskInfo, setTaskInfo] = useState<taskModel | any>()
    const [showErrorMessage, setShowErrorMessage] = useState<string>()
    const [showError, setShowError] = useState<boolean>()
    const [delStatus, setDelStatus] = useState<boolean>()
    const [taskStatus, setTaskStatus] = useState<string>()
    const [showDescInput, setShowDescInput] = useState<any>(false)
    const [showTitleInput, setShowTitleInput] = useState<boolean>(false)
    const [changestitle, setChangesTitle] = useState<boolean>(false)
    const [changesStatus, setChangesStatus] = useState<boolean>(false)
    const [changesDesc, setChangesDesc] = useState<boolean>(false)
    const [changesAccountables, setChangesAccountables] = useState<boolean>(false)
    const [showAccountablesInput, setShowAccountablesInput] = useState<boolean>(false)
    const descInp = useRef<any>(null);

    const [description, setDescription] = useState<string>('')
    const [title, seTitle] = useState<string>('')
    const [accountables, setAccountables] = useState<[string?]>([])
    const [initialTaskStatus, setInitialTaskStatus] = useState<string>()

    function closeModal() {
        setAccountables([])
        setInitialTaskStatus('')
        seTitle('')
        setDescription('')
        setStatus(false)
        setChangesDesc(false)
        setChangesTitle(false)
        setChangesAccountables(false)
        setChangesStatus(false)
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
            plannerId: taskInfo.plannerId,
            StageId: taskInfo.StageId,
            accountable: array,
            description: taskInfo.description,
            title: taskInfo.title,
            status: taskInfo.status
        })

        if (accountables !== array) {
            setChangesAccountables(true)
        } else {
            setChangesAccountables(false)
        }
    }

    function updateTask() {
        console.log(taskInfo)
        api.put('/task/update', {
            params: {
                updatedTask: taskInfo
            }
        })
            .then((dat: any) => {
                console.log(dat.data)
                if (!dat.data.error) {
                    setShowTitleInput(false)
                    setShowDescInput(false)
                    setShowAccountablesInput(false)
                    closeModal()
                } else {
                    setShowError(true)
                    setShowErrorMessage(dat.data.error)
                }
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
                setInitialTaskStatus(element.data.taskStatus)
            })
            .catch((error) => {
                setShowError(true)
                setShowErrorMessage(error)
            })
    }, [status])

    useEffect(() => {
        if (!delStatus) {
            closeModal()
        }
    }, [delStatus])

    function updateTaskStatus(stt: string) {
        if (stt === taskInfo.status) {
            setChangesStatus(false)
        } else {
            setChangesStatus(true)
            setTaskInfo({
                _id: taskInfo._id,
                CreatedAt: taskInfo.CreatedAt,
                plannerId: taskInfo.plannerId,
                StageId: taskInfo.StageId,
                accountable: taskInfo.accountable,
                description: taskInfo.description,
                title: taskInfo.title,
                status: stt
            })
        }
    }
    return (
        <>
            <div>
                <Modal
                    open={status}
                    onClose={() => setStatus(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                    >

                        <div className='taskModal'>

                            <div className="taskModalHeader">
                                <div>
                                    <p>
                                        <span className="pencil" onClick={() => setShowTitleInput(!showTitleInput)}><FontAwesomeIcon icon={faPencilAlt} /></span>
                                        &nbsp;&nbsp;
                                        {showTitleInput ? <TextField
                                            id="standard-size-small"
                                            defaultValue={taskInfo?.title}
                                            size="medium"
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
                                        /> : (taskInfo?.title?.length <= 35) ? <h3>{taskInfo?.title}</h3> : <Tooltip
                                            title={taskInfo?.title} placement="top-end">
                                            <h3>{stringFormat(taskInfo?.title, 35)}</h3>
                                        </Tooltip>}


                                    </p>
                                </div>
                                <div>
                                    {FormatDate(taskInfo?.CreatedAt)[0]}&nbsp;&nbsp;{FormatDate(taskInfo?.CreatedAt)[1]}
                                </div>
                            </div>
                            <br />

                            <div className="taskModalBody">
                                <div className="accountableList">
                                    <div>
                                        {taskInfo?.accountable?.map((el: any) => <div >
                                            <span className="accountable">
                                                <span>{el}</span>&nbsp;&nbsp; <span className={el} onClick={() => removeItemOnce(el)}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></span>
                                            </span>
                                        </div>
                                        )}
                                    </div>
                                    <div>
                                        <TextField select label={'status ' + taskInfo?.status} fullWidth
                                            helperText="Please select the status for this task." >
                                            <MenuItem
                                                onClick={() => updateTaskStatus('none')}
                                                className="none"
                                            >none
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => updateTaskStatus('waiting more details')}
                                                className="waiting more details"
                                            >waiting more details
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => updateTaskStatus('progressing')}
                                                className="progressing"
                                            >progressing
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => updateTaskStatus('interrupted')}
                                                className="interrupted"
                                            >interrupted
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => updateTaskStatus('priority')}
                                                className="priority"
                                            >priority
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                                <TextField select label="accountable" fullWidth
                                    helperText="Please select the accountable for this task." >
                                    {users?.map((option: any) => (
                                        <MenuItem
                                            onClick={(e: any) => {
                                                if (taskInfo?.accountable?.indexOf(option.email) === -1) {
                                                    const arr = taskInfo.accountable
                                                    if (arr.concat(option.email) !== accountables) {
                                                        arr.push(option.email)
                                                        setChangesAccountables(true)

                                                    } else {
                                                        setChangesAccountables(false)
                                                    }
                                                    setTaskInfo({
                                                        _id: taskInfo._id,
                                                        CreatedAt: taskInfo.CreatedAt,
                                                        plannerId: taskInfo.plannerId,
                                                        StageId: taskInfo.StageId,
                                                        accountable: arr,
                                                        description: taskInfo.description,
                                                        title: taskInfo.title,
                                                        status: taskInfo.status
                                                    })
                                                }
                                            }}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <span>
                                    <span className="pencil" onClick={() => setShowDescInput(!showDescInput)}><FontAwesomeIcon icon={faPencilAlt} /> description</span>
                                    <br />
                                    {showDescInput ? <TextField
                                        id="outlined-multiline-static"
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
                                <div>

                                    <Button variant="contained" color="primary" onClick={() =>
                                        (changesStatus || changestitle || changesDesc || changesAccountables) ? updateTask() : closeModal()
                                    }>
                                        {(changesStatus || changestitle || changesDesc || changesAccountables) ? 'Update' : 'Ok'}
                                    </Button>

                                    {(changesStatus || changestitle || changesDesc || changesAccountables) ? <Button variant="contained" color="secondary" onClick={closeModal}>Cancel</Button> : ''}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => setDelStatus(true)} />
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <DeleteTaskModal delTaskStatus={delStatus} taskId={taskId} setDelTaskStatus={setDelStatus} />
            <ErrorModal status={showError} setStatus={setShowError} info={showErrorMessage} />
        </>
    );
}