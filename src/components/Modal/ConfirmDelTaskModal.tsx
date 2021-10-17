import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import api from '../../api/api'
import { listenEvent } from '../../utils/socket';
import ErrorModal from './errorModal';



export default function ConfirmDelTaskModal({ status, setStatus, taskId }: any) {

    const [width, setWidth] = useState<number>(650)
    const [callError, setcallError] = useState<boolean>(false);
    const [infoError, setinfoError] = useState<string>();

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-10)
        }
    }, [])
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

    window.addEventListener('resize',(e: any) => {
        if(e.target.innerWidth < 650){
            setWidth(e.target.innerWidth-20)
        }else{
            setWidth(650)
        }
    })
    function closeModal() {
        setStatus(false)
    }
    function delTask() {

        api.delete('/task/confirmDelTask', {
            params: {
                taskId: taskId
            }
        })
            .then((data) => {
                if(data.data.error){
                    setinfoError(data.data.error)
                    setcallError(true)
                }
            })
            .then(() => {
                closeModal()
                console.log('?')
            })
            .catch((error) => {
                setinfoError(error)
                setcallError(true)
                closeModal()
            })
    }

    return (
        <>
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='taskModal'>
                    <h3> Delete Task </h3>
                    <p> Are you sure that you want delete this task. Won't be possible get this task back.</p>
                    <hr /><br/>
                    <div>
                        <Button variant="contained" color="primary" onClick={delTask}>Confirm</Button>
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
        <ErrorModal status={callError} setStatus={setcallError} info={infoError} />
        </>
    );
}