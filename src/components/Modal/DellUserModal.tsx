import React, { useState, useEffect } from 'react';
import './Modal.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../api/api';

import ErrorModal from './errorModal';



export default function DellUserModal({ status, setStatus, plannerId, userId, userList, userEml }: any) {

    const [user, setUser] = useState<any>()
    const [callerrorModal, setcallerrorModal] = useState<boolean>()
    const [errorInfo, seterrorInfo] = useState<any>()
    const [List, setList] = useState<any>()
    const [userEmail, setUserEmail] = useState<any>()
    const [width, setWidth] = useState<number>(650)

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-20)
        }
    }, [])

    window.addEventListener('resize',(e: any) => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-20)
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

        api.delete('/planner/removeUser', {
            params: {
                user,
                userId: userId,
                plannerId: plannerId
            }
        })
            .then((data) => {
                if (data.data.error) {
                    setcallerrorModal(true)
                    seterrorInfo(data.data.error)
                }
                console.log(data.data)
            })
            .catch((error) => {
                setcallerrorModal(true)
                seterrorInfo(error)
            })
    }
    useEffect(() => {
        const teste: any = []
        userList?.forEach((element: any) => {
            if (element?.email !== userEml) {
                teste.push(element)
            }
        });
        setList(teste)
        setUserEmail(userEmail)
    }, [userList, userEml])
    return (
        <div>
            <Modal
                open={status}
                onClose={() => setStatus(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-permission"
            >
                <Box sx={style} className='taskModal'>

                    <h3>Remove User</h3>

                    <div className="newUserModalHeader">

                        <TextField select defaultValue={user} label={user ? user : 'User'} style={{ width: '100%' }} >
                            {List?.map((usr: any) => {
                                return <MenuItem onClick={(e) => setUser(usr.email)}>
                                    {usr.email}
                                </MenuItem>

                            })}
                        </TextField>

                    </div>

                    <br />
                    <div className="taskModalButtons">
                        <div>
                            <Button variant="contained" color="primary" onClick={AddUser}>Confirm</Button>
                            <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                        </div>
                        <div></div>
                    </div>
                </Box>
            </Modal>
            <ErrorModal status={callerrorModal} setStatus={setcallerrorModal} info={errorInfo} />
        </div>
    );
}