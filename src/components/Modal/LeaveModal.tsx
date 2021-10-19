import React, { useEffect, useState, useRef, useContext } from 'react'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../context/userContext'
import api from '../../api/api';
import ErrorModal from './errorModal';
import { useHistory } from "react-router-dom";


export default function LeaveModal({ status, setStatus, plannerId }: any) {


    const [width, setWidth] = useState<number>(650)
    const [plannerName, setplannerName] = useState<string>()
    const [disButton, setDisButton] = useState<boolean>(true)
    const [callError, setcallError] = useState<boolean>()
    const [errorInfo, setErrorInfo] = useState<string>()
    const planner = useRef<any>(null);
    const history = useHistory();

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)

    useEffect(() => {
        if (window.screen.width < 650) {
            setWidth(window.screen.width - 10)
        }
        userInfoContext.planners.forEach((el: any) => {
            if (el.plannerId === plannerId) {
                setplannerName(el.name)
            }
        })

    }, [userInfoContext, plannerId])

    window.addEventListener('resize', (e: any) => {
        if (e.target.innerWidth < 650) {
            setWidth(e.target.innerWidth - 20)
        } else {
            setWidth(650)
        }
    })


    function confirmUserLeave() {
        const pln = planner.current?.children[0]?.children[0].value.trim()
        if (pln == plannerName) {
            api.post('/user/leavePlaner', { 
                email: userInfoContext?.email,
                userId: localStorage.getItem("UserId"),
                plannerId }
                )
                .then((data: any) => {
                    if(data.data.error){
                        setErrorInfo(data.data.error)
                        setcallError(true)
                    }else{
                        history.push('/profile')
                        document.location.reload();
                    }
                })

        }
    }
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


    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h3>LEAVING PLANNER</h3>
                    <br />
                    <p> are you sure that you want to abandon this planner, you will lost the acess to the tasks, graphics, users and stages. the only way to get back the acess, is beeing added again.</p>
                    <br />
                    <br />
                    <h2>write the name of the planner: <span style={{ color: 'red' }}>{plannerName}</span></h2>
                    <br />
                    <TextField id="input-with-sx" variant="standard" ref={planner} fullWidth type="planner"
                     onChange={() => {
                                setDisButton(planner.current?.children[0]?.children[0].value.trim() == plannerName? false : true)
                    }}/>
                    <br />
                    <br /><br /><br /><br />
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button variant="contained" color="secondary" onClick={confirmUserLeave} disabled={disButton}>Leave</Button>
                        <Button variant="contained" color="primary" onClick={closeModal}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
            <ErrorModal status={callError} setStatus={setcallError} info={errorInfo} />

        </div>
    );
}