import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import api from '../../api/api'
import ErrorModal from './errorModal'

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


export default function DeleteTaskModal({ delTaskStatus, taskId, setDelTaskStatus }: any) {

    const [callError, setcallError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<any>('' );
    function closeModal() {
        setDelTaskStatus(false)
    }

    function delTask() {
        api.delete('task/delTask', {
            params: {
                taskId: taskId
            }
        })
        .then((dat) => {
            console.log(dat)
            if(dat.data.error){
                setcallError(true)
                setErrorInfo(dat.data.error)
            }if(dat.data.ok){
                closeModal()
            }
        })
        .catch((error) => {
            setcallError(true)
            setErrorInfo(error)
        })
    }


    return (
        <div>
            <Modal
                open={delTaskStatus}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div>
                        <h4>Are you sure you want to delete this task?</h4><br/>
                        <p><strong>OBS.:</strong> within the next 7 days, you can still retrieve this task back, if that time runs out, it cannot be retrieved again. </p><br/>
                        <hr/><br/>
                    </div>

                    <div className="taskModalButtons">
                        <div>
                            <Button variant="contained" color="secondary" onClick={delTask}>  delete this Task</Button>
                            <Button variant="contained" color="primary" onClick={closeModal}>cancel</Button>
                        </div>
                        <div></div>
                    </div>
                </Box>
            </Modal>
            <ErrorModal status={callError} setStatus={setcallError} info={errorInfo} />
        </div>
    );
}