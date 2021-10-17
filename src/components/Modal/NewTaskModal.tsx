import React, { useState,  useEffect } from 'react';
import './Modal.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import ErrorModal from './errorModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import logout from '../../utils/logout'
import api from '../../api/api'



export default function NewTask({ getUsers, status, setStatus, Columnid, plannerId }: any) {

    const [callError, setcallError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<any>('');
    const [accountableList, setAccountableList] = useState<any>([]);
    const [width, setWidth] = useState<number>(650)

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-20)
        }
    }, [])

    window.addEventListener('resize',(e: any) => {
        if(e.target.innerWidth < 650){
            setWidth(e.target.innerWidth-20)
        }else{
            setWidth(650)
        }
    })

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    interface Task {
        title?: string,
        description?: string,
        accountable?: [string]
    }
    interface User {
        name?: string,
        email?: string,
        _id?: string
    }



    const [task, setTask] = useState<Task>()
    const [users, setUsers] = useState<[User]>()


    function closeModal() {
        setStatus(false)
    }
    function createNewTask() {
        api.post('/task/newTask', {
            params: {
                title: task?.title,
                desciption: task?.description,
                accountable: accountableList,
                plannerId: plannerId,
                Columnid: Columnid
            }
        }).then((data) => {
            if (data.data.error) {
                setcallError(true)
                setErrorInfo(data.data.error)
            }else{
                setTask({})
                setUsers([{}])
                setAccountableList([])
                closeModal()   
            }
        })
        .catch((error: any) => {
            setErrorInfo(error)
            })


    }

    useEffect(() => {
        setUsers(getUsers)
    }, [getUsers])


    function removeItemOnce(value: any) {

        const array: any = []
        accountableList.forEach((element: any) => {
            if (element === value) {
                return
            } else {
                array.push(element)
                setAccountableList(array)
            }
        })
        if (accountableList.length === 1) {
            setAccountableList([])
        }
    }


    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="taskModal" >

                    <h3 >New Task</h3>
                    <br />
                    <div>
                        <div className="inputs">

                            <TextField id="tasktitle" label="title" variant="outlined" 
                                onChange={(e) => setTask({
                                    description: task?.description,
                                    accountable: task?.accountable,
                                    title: e.target.value
                                })} />
                            <TextField id="taskDesk" label="Description" variant="outlined"
                                onChange={(e) => setTask({
                                    title: task?.title,
                                    accountable: task?.accountable,
                                    description: e.target.value
                                })}
                            />
                        </div>

                        <div className="accountableList">{accountableList.map((el: any) => <div >
                            <span className="accountable">
                                <span>{el}</span>&nbsp;&nbsp; <span className={el} onClick={() => removeItemOnce(el)}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></span>
                            </span>
                        </div>
                        )}</div>

                        <TextField select label="accountable" value={task?.accountable} fullWidth
                            helperText="Please select the accountable for this task." >
                            {getUsers?.map((option: any) => (
                                <MenuItem
                                    onClick={(e: any) => {
                                        if (accountableList?.indexOf(option.email) === -1) {
                                            setAccountableList(accountableList.concat(option.email))
                                        } else {
                                            return
                                        }
                                    }}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <br />
                    <div className="taskModalButtons">
                        <div>
                            <Button variant="contained" color="primary" onClick={createNewTask}>Confirm</Button>
                            <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                        </div>
                        <div></div>
                    </div>
                </Box>
            </Modal>
            <ErrorModal status={callError} setStatus={setcallError} info={errorInfo} />

        </div>
    );
}