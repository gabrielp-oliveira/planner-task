import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';



export default function ErrorModal({  status, setStatus, info }: any) {
    
    
    const [width, setWidth] = useState<number>(650)

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-10)
        }
    }, [])

    window.addEventListener('resize',(e: any) => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-10)
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
        boxShadow: 24,
        p: 4,
    };
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
                <Box sx={style} className="taskModal">

                    <h3>Error</h3>
                    <br />
                    <p>{info}</p> 
                    <hr /><br />

                    <div>
                        <Button variant="contained" color="primary" onClick={closeModal}>Ok</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}