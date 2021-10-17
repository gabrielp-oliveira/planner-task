import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import api from '../../api/api'

export default function RecoveryTask({ status, setStatus, taskId }: any) {

    const [width, setWidth] = useState<number>(650)

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

        api.post('/task/restoreTask', {
            params: {
                taskId: taskId
            }
        })
            .then((data) => {
                closeModal()
            })

    }

    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='taskModal'>
                    <h3> Restore Task </h3>
                    <p> Are you sure that you want restore this task.it will be back to the planner in the same stage.</p>
                    <hr /><br/>
                    <div>
                        <Button variant="contained" color="primary" onClick={delTask}>Confirm</Button>&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}