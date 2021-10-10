import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


import TextField from '@material-ui/core/TextField';
import api from '../../api/api';


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

interface column {
    name?: string,
    description?: string
}
export default function NewColumnModal({ status, setStatus ,plannerId }: any) {

    const [column, setColumn] = useState<column>()

    function closeModal() {
        setStatus(false)
    }
    function newColumn() {
        console.log(column)

        api.post('/planner/newColumn', {
            params:{
                name: column?.name,
                desciption: column?.description,
                plannerId: plannerId
            }
        })
        .then((data) => {
            console.log(data)
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
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >

                    <h3>New Column</h3>

                    <div>
                        <TextField id="name" label="name" variant="outlined"
                            onChange={(e) => setColumn({
                                description: column?.description,
                                name: e.target.value
                            })}
                        />
                        <TextField id="description" label="description" variant="outlined"
                            onChange={(e) => setColumn({
                                name: column?.name,
                                description: e.target.value
                            })} />
                    </div>

                    <hr /><br />
                    <div>
                        <Button variant="contained" color="primary" onClick={newColumn}>Confirm</Button>
                        <Button variant="contained" color="secondary" onClick={closeModal} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}