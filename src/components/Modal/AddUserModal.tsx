import React, { useState, useEffect } from 'react';
import './Modal.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../api/api';

import ErrorModal from './errorModal';


export default function AddUserModal({ status, setStatus, plannerId, userId }: any) {

    const [user, setUser] = useState<any>({
        permission: 'intermediate'
    })
    const [callerrorModal, setcallerrorModal] = useState<boolean>()
    const [errorInfo, seterrorInfo] = useState<any>()
    const [width, setWidth] = useState<number>(650)

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-10)
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
    
    function closeModal() {
        setStatus(false)
    }
    function AddUser() {

        api.post('/planner/newUser', {
            params: {
                user,
                userId: userId,
                plannerId: plannerId
            }
        })
            .then((data) => {
                if(data.data.error){
                    setcallerrorModal(true)
                    seterrorInfo(data.data.error)
                }
            })
            .catch((error) => {
                setcallerrorModal(true)
                seterrorInfo(error)
            })
    }
    useEffect(() => {

    }, [])
    return (
        <div>
            <Modal
                open={status}
                onClose={() => setStatus(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-permission"
            >
                <Box sx={style}  className='taskModal'>

                    <h3>New user</h3>

                    <div className="newUserModalHeader">
                        <TextField id="name" label="email" variant="outlined" type="email"
                            onChange={(e) => setUser({
                                permission: user?.permission,
                                email: e.target.value
                            })}
                        />

                        <TextField select label={user?.permission+ ' permission'} >
                            <MenuItem onClick={(e) => setUser({
                                email: user?.email,
                                permission: 'total'
                            })}>
                                total
                            </MenuItem>
                            <MenuItem onClick={(e) => setUser({
                                email: user?.email,
                                permission: 'intermediate'
                            })}>
                                intermediate
                            </MenuItem>
                            <MenuItem onClick={(e) => setUser({
                                email: user?.email,
                                permission: 'observer'
                            })}>
                                observer
                            </MenuItem>

                        </TextField>

                    </div>

                    <br />
                    <div>
                        <Button variant="contained" color="primary" onClick={AddUser}>Confirm</Button>
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
            <ErrorModal status={callerrorModal} setStatus={setcallerrorModal} info={errorInfo}/>
        </div>
    );
}