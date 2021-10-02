import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

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


export default function ErrorModal({  status, setStatus, info }: any) {


    function closeModal() {
        setStatus(false)
    }
    

    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h3>Error</h3>
                    <br />
                    <p>{info.message}</p> 
                    <hr /><br />

                    <div>
                        <Button variant="contained" color="primary" onClick={closeModal}>Ok</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}