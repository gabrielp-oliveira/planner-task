import React, { useEffect, useRef, useState } from 'react'
import './Login.css'

import { } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom'
import api from '../../../api/api'
import auth from '../../../utils/auth'

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorModal from '../../../components/Modal/errorModal';

import { useHistory } from "react-router-dom";

function Login() {
    const email = useRef<any>(null);
    const password = useRef<any>(null);
    const history = useHistory();
    const [callErrorModal, setCallErrorModal] =useState<boolean>()
    const [errorInfo, setErrorInfo] =useState<string>()
    const [loading, setloading] = useState<boolean>(false)


    function login(e: any): void {
        e.preventDefault()
        setloading(true)
        const emailValue = email.current?.children[1].children[0]?.value.trim()
        const passwordValue = password.current?.children[1].children[0]?.value.trim()
        if (emailValue !== '' && passwordValue !== '') {
            api.post('/auth/login', {
                email: emailValue,
                password: passwordValue
            })
                .then((data) => {
                    if(!data.data.error){
                        localStorage.setItem('token', data.data.token)
                        localStorage.setItem('UserId', data.data.UserId)
                    }else{
                        setCallErrorModal(true)
                        setErrorInfo(data.data.error)
                        setloading(false)
                    }
                })
                .then(() => {
                    history.push('/profile')
                    document.location.reload(); 
                })
                .catch((error) => {
                    setCallErrorModal(true)
                    setErrorInfo(error)
                    setloading(false)
                })
        } else {
            setCallErrorModal(true)
            setErrorInfo('some input is empty, please fill all the data.')
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
            {!loading? <div className="login">
                <div className="form">
                    <div>
                        <span>Log In</span>
                    </div>
                    <form onSubmit={e => login(e)}>
                        <div className="label">

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <TextField id="input-with-sx" label="Email" variant="standard" ref={email} fullWidth />
                            </Box>

                        </div>
                        <div className="label">

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUnlock} />
                                <TextField id="input-with-sx" label="Password" variant="standard" ref={password} fullWidth />
                            </Box>

                        </div>

                        <span>
                            <Button className="loginButton" type="submit" variant="contained" color="primary">Login</Button>
                        </span>
                    </form>
                    <span className="recoveryPassword">
                        <Link to="/forgotpassword">Forgot your password?</Link>
                    </span>
                </div> 
            </div> : <CircularProgress style={{alignSelf: 'center', marginTop: '50px'}}/>}
            <ErrorModal status={callErrorModal} setStatus={setCallErrorModal} info={errorInfo}/>

        </>
    )
}

export default Login
