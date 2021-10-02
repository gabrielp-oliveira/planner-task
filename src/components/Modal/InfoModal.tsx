import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormatDate from '../../utils/formatDate'



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


export default function InfoModal({  status, setStatus, info }: any) {


    function closeModal() {
        setStatus(false)
        setTimeout(() => {
            const element : any = document.getElementsByClassName(info?.Columnid)
            element[0].children[0].style.border = "none"

            const task : any = document.getElementById(info?.taskId)
            task.style.border = "none"
            
        }, 3000);
    }
    

    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  sx={style}>

                    <h3>{info?.modalTitle}</h3>
                    <br />
                    <p><strong>{info?.createdBy}</strong> have created the <strong>{info?.title}</strong> Task at {FormatDate(info?.createdAt)[1]}</p> 
                    <hr /><br />

                    <div>
                        <Button variant="contained" color="primary" onClick={closeModal}>Ok</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}