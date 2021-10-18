import React, { useEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { faEnvelope, faUnlock, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import api from '../../api/api'
import { useHistory } from "react-router-dom";
import ErrorModal from './errorModal';



export default function ChangePassword({ status, setStatus, email, token, setToken}: any) {

    const history = useHistory();


    const [userEmail, setUserEmail] = useState<string>()
    const password = useRef<any>(null);
    const password2 = useRef<any>(null);

    const [loading, setloading] = useState<boolean>(false)
    const [callErrorModal, setCallErrorModal] = useState<boolean>()
    const [errorInfo, setErrorInfo] = useState<string>()
    const [width, setWidth] = useState<number>(650)

    useEffect(() => {
        if(window.screen.width < 650){
            setWidth(window.screen.width-10)
        }
    }, [])
    

    window.addEventListener('resize',(e: any) => {
        if(e.target.innerWidth < 650){
            setWidth(e.target.innerWidth-20)
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


    function updatePassword(e: any) {
        e.preventDefault()

        const first = password.current?.children[1].children[0]?.value.trim()
        const second = password2.current?.children[1].children[0]?.value.trim()
        if (first !== second) {
            setCallErrorModal(true)
            setErrorInfo('passwords are not compatible.')
            setloading(false)
            return
        }


        api.post('/auth/UpdatePassword', {
            email: userEmail,
            token,
            password: {
                first,
                second
            }
        })
            .then((data) => {

                if (!data.data.error) {
                    alert('everything ok, make login again')
                } else {
                    setCallErrorModal(true)
                    setErrorInfo(data.data.error)
                    setloading(false)
                    setToken('')
                    return
                }
            })
            .then(() => {
                history.push('/login')
                document.location.reload();
                closeModal()
            })
            .catch((error) => {
                setCallErrorModal(true)
                setErrorInfo(error)
                setloading(false)
            })

    }

    useEffect(() => {
        setUserEmail(email)
    }, [email])


    return (
        <div>
            <Modal
                open={status}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="taskModal">

                    <h3>Change Password</h3>
                    <br />
                    <form action="" onSubmit={(e: any) => updatePassword(e)}>

                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUnlock} />
                                <TextField id="input-with-sx" label="Password" variant="standard" ref={password} fullWidth type="password" />
                            </Box>
                        </div>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUnlock} />
                                <TextField id="input-with-sx" label="Repeat Password" variant="standard" ref={password2} fullWidth type="password" />
                            </Box>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button variant="contained" color="primary" type="submit">Update Password</Button>
                            <Button variant="contained" color="primary" onClick={closeModal}>cancel</Button>
                        </div>
                    </form>
                    <br />

                </Box>
            </Modal>
            <ErrorModal status={callErrorModal} setStatus={setCallErrorModal} info={errorInfo} />

        </div>
    );
}