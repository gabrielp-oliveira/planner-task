import React, { useRef, useState, useEffect } from 'react'
import '../login/Login.css'

import { Link } from 'react-router-dom'
import api from '../../../api/api'

import {  faUnlock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import ErrorModal from '../../../components/Modal/errorModal'

function Confirmation() {

    
    const history = useHistory();

    const code = useRef<any>(null);
    const email = useRef<any>(null);
    const [callErrorModal, setCallErrorModal] =useState<boolean>()
    const [errorInfo, setErrorInfo] =useState<string>()
    const [loading, setloading] = useState<boolean>(false)

    useEffect(() => {
        email.current?.children[1].children[0]?.select()
    }, [])
    function verifyEmail (e: any){
        e.preventDefault()
        // setloading(true)
        const emailValue = email.current?.children[1].children[0]?.value.trim()
        const tokenValue = code.current?.children[1].children[0]?.value.trim()
        if (emailValue !== '' && tokenValue !== '') {
            api.post('/auth/confirmCode', {
                email: emailValue,
                token: tokenValue
            })
                .then((data) => {
                    console.log(data)
                    if(!data.data.error){
                        alert('everything ok, make login again')
                        history.push('/login')
                        document.location.reload();
                        setCallErrorModal(false) 
                    }else{
                        setCallErrorModal(true)
                        setErrorInfo(data.data.error)
                        setloading(false)
                    }
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
            <div className="login">
                <div className="form">

                    <div>
                        <span>Verify Account</span>
                    </div>
                    <form onSubmit={e => verifyEmail(e)}>


                        <div className="label">

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <TextField id="input-with-sx" label="Email" variant="standard" ref={email} fullWidth type="email"/>
                            </Box>

                        </div>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUnlock} />
                                <TextField id="input-with-sx" label="Token" variant="standard" ref={code} fullWidth />
                            </Box>
                        </div>
                        <Button className="loginButton" type="submit" variant="contained" color="primary">verify</Button>&nbsp;&nbsp;
                        <Button className="loginButton" variant="contained" color="primary" onClick={() => {
                        history.push('/login')
                        document.location.reload()}}>Login</Button>

                    </form>

                </div>
            </div>
            <ErrorModal status={callErrorModal} setStatus={setCallErrorModal} info={errorInfo} />
            
        </ >

    )
}

export default Confirmation
