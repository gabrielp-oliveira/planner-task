import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import api from '../../api/api'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DelColumnModal({ status, setStatus,name , Columnid, plannerId}: any) {


    function closeModal() {
        setStatus(false)
    }
    function delColumn() {

        api.delete('/planner/delColumn', {
            params: {
                Columnid: Columnid,
                plannerId: plannerId
            }
        })
            .then((data) => {
                console.log(data.data)
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
                <Box sx={style}>
                    <h3> Delete Column {name}</h3>
                    <p> Are you sure that you want delete the <strong>{name}</strong> column?</p>
                    <hr /><br/>
                    <div>
                        <Button variant="contained" color="primary" onClick={delColumn}>Confirm</Button>
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}