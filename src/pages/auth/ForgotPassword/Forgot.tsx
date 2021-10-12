import React, { useRef, useState, useEffect } from 'react'
import '../login/Login.css'

import { Link } from 'react-router-dom'
import ErrorModal from '../../../components/Modal/errorModal';
import ChangePassword from '../../../components/Modal/changePassword'

import { faEnvelope, faUnlock, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';

import api from '../../../api/api'
import { createBrowserHistory } from 'history'
import { Button, TextField } from '@material-ui/core';

function Forgot() {
    const email = useRef<any>(null);
    const token = useRef<any>(null);
    const emailCheck = useRef<any>(null);

    const [callErrorModal, setCallErrorModal] = useState<boolean>()
    const [errorInfo, setErrorInfo] = useState<string>()
    const [useToken, setuseToken] = useState<boolean>(false)
    const [callChangePassword, setCallChangePassword] = useState<boolean>(false)

    useEffect(() => {
        email.current?.children[1].children[0]?.select()
    }, [])

    function forgotPassword(e: any) {
        e.preventDefault()
        if (email.current?.children[1].children[0]?.value.trim() === '') {
            setErrorInfo('Email its empty')
            setCallErrorModal(true)
            return
        }
        api.post('/auth/forgot', { email: email.current?.children[1].children[0]?.value.trim() })
            .then((data: any) => {
                if (!data.data.error) {
                    setuseToken(true)
                } else {
                    console.log(data.data.error)
                    setErrorInfo(data.data.error.error)
                    setCallErrorModal(true)
                }
            })
            .catch((error) => {
                setErrorInfo(error)
                setCallErrorModal(true)
            })
    }

    function confirmForgotCode(e: any) {
        e.preventDefault()
        const emailValue = emailCheck.current?.children[1].children[0]?.value.trim()
        const tokenValue = token.current?.children[1].children[0]?.value.trim().toLowerCase()
        
        if (emailValue !== '' && tokenValue !== '') {
            api.post('/auth/forgot', {
                email: emailValue,
                token: tokenValue
            })
                .then((data: any) => {
                    console.log(data.data)
                    if (!data.data.error) {

                        setCallChangePassword(true)

                    } else {
                        setCallErrorModal(true)
                        setErrorInfo(data.data.error)
                    }
                })
                .catch((error) => {
                    setCallErrorModal(true)
                    setErrorInfo(error)
                })

        }
    }
    return (
        <>

            <div className="HomePageHeader">
                <Link to="/">Home Page</Link>
                <div>
                    <Link to="/login">log in</Link>
                    <Link to="/register">register</Link>
                </div>
            </div>
            <div className="login">

                {!useToken ? <div className="form">
                    <div>
                        <span>A token will be sended to your email.</span>
                    </div>

                    <form action="" onSubmit={(e) => forgotPassword(e)}>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUserAlt} />
                                <TextField id="input-with-sx" label="Email" variant="standard" ref={email} fullWidth type="email" />
                            </Box>
                        </div>
                        <Button className="loginButton" type="submit" variant="contained" color="primary">submit</Button>&nbsp;&nbsp;
                        <Button className="loginButton" variant="contained" color="primary" onClick={() => setuseToken(true)}>Use Token</Button>
                    </form>
                </div> : <div className="form">
                    <div>
                        <span>Use your Token</span>
                    </div>

                    <form action="" onSubmit={(e) => confirmForgotCode(e)}>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUserAlt} />
                                <TextField id="input-with-sx" label="Email" variant="standard" ref={emailCheck} fullWidth type="email" />
                            </Box>
                        </div>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUnlock} />
                                <TextField id="input-with-sx" label="Token" variant="standard" ref={token} fullWidth />
                            </Box>
                        </div>
                        <Button className="loginButton" type="submit" variant="contained" color="primary">submit</Button>&nbsp;&nbsp;
                        <Button className="loginButton" variant="contained" color="primary" onClick={() => setuseToken(false)}>back</Button>
                    </form>
                </div>}
            </div>
            <ErrorModal status={callErrorModal} setStatus={setCallErrorModal} info={errorInfo} />
            <ChangePassword status={callChangePassword} setStatus={setCallChangePassword} email={emailCheck.current?.children[1].children[0]?.value.trim()} />

        </>
    )
}

export default Forgot
