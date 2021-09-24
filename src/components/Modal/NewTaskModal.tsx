import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';



import TextField from '@material-ui/core/TextField';

import logout from '../../utils/logout'
import api from '../../api/api'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function NewTask({ getUsers, status, setStatus, Columnid, plannerId }: any) {


    interface Task {
        title?: string,
        description?: string,
        accountable?: string
    }
    interface User {
        name: string,
        email: string,
        _id: string
    }




    const [task, setTask] = useState<Task>()
    const [users, setUsers] = useState<[User]>()


    function closeModal() {
        setStatus(false)
    }
    function createNewTask() {
        api.post('/planner/newTask', {
            params: {
                title: task?.title,
                desciption: task?.description,
                accountable: task?.accountable,
                plannerId: plannerId,
                Columnid: Columnid
            }
        }).then((data) => {
            console.log(data)
            setTask({})
        })


    }
    
    useEffect(() => {
        setUsers(getUsers)
    }, [getUsers])

    return (
        <div>
            <Modal
                open={status}
                onClose={() => setStatus(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h3>New Task</h3>
                    <div>
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
                        <TextField select label="accountable" value={task?.accountable}
                         helperText="Please select the accountable for this task."
                        onChange={(e) => setTask({
                            title: task?.title,
                            description: task?.description,
                            accountable: e.target.value
                        })}
                        >
                            {users?.map((option) => (
                                <option key={option.email} value={option.email}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    {/* <hr /><br /> */}
                    <div>
                        <Button variant="contained" color="primary" onClick={createNewTask}>Confirm</Button>
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}