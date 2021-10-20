import React, { useEffect, useState, useRef, useContext } from 'react'
import '../login/Login.css'
import RegisterModel from '../../../models/RegisterModel'
import api from '../../../api/api'
import auth from '../../../utils/auth'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorModal from '../../../components/Modal/errorModal';
import CircularProgress from '@material-ui/core/CircularProgress';

import { faEnvelope, faUnlock, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() {
    const [userInfo, setUserInfo] = useState<RegisterModel>()
    const email = useRef<any>(null);
    const password = useRef<any>(null);
    const password2 = useRef<any>(null);
    const name = useRef<any>(null);
    const history = useHistory();

    const [callErrorModal, setCallErrorModal] = useState<boolean>()
    const [errorInfo, setErrorInfo] = useState<string>()
    const [loading, setloading] = useState<boolean>(false)

    function register(e: any) {
        e.preventDefault()
        // setloading(true)
        const emailValue = email.current?.children[1].children[0]?.value.trim()
        const nameValue = name.current?.children[1].children[0]?.value.trim()
        const passwordValue1 = password.current?.children[1].children[0]?.value.trim()
        const passwordValue2 = password2.current?.children[1].children[0]?.value.trim()

        if (
            emailValue === '' &&
            nameValue === '' &&
            passwordValue1 === '' &&
            passwordValue2 === '') {
            setCallErrorModal(true)
            setErrorInfo('please fill in the details below.')
            setloading(false)
            return
        }
        if (
            emailValue === '' ||
            nameValue === '' ||
            passwordValue1 === '' ||
            passwordValue2 === '') {
            setCallErrorModal(true)
            setErrorInfo('some input is empty, please fill all the data.')
            setloading(false)
            return
        } if (passwordValue1 !== passwordValue2) {
            setCallErrorModal(true)
            setErrorInfo('passwords are not compatible.')
            setloading(false)
            return
        }
        if (passwordValue1.length < 3 || passwordValue1.length > 8) {
            setCallErrorModal(true)
            setErrorInfo('must be greater than 3 characters and lower than 8.')
            setloading(false)
            return
        }

        api.post('/auth/register', {
            email: emailValue,
            password: passwordValue1,
            name: nameValue
        })
            .then((data) => {
                if (!data.data.error) {
                    history.push('/verifyAccount')
                    document.location.reload();
                    setloading(false)
                } else {
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
            {!loading ? <div className="login">
                <div className="form">
                    <div>
                        <span>Register</span>
                    </div>


                    <form onSubmit={e => register(e)}>
                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <TextField id="input-with-sx" label="Email" variant="standard" ref={email} fullWidth type="email" />
                            </Box>
                        </div>

                        <div className="label">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="input">
                                <FontAwesomeIcon icon={faUserAlt} />
                                <TextField id="input-with-sx" label="Name" variant="standard" ref={name} fullWidth />
                            </Box>
                        </div>
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
                        <br />
                        <Button className="loginButton" type="submit" variant="contained" color="primary">Register</Button>
                    </form>
                </div>
            </div> : <CircularProgress style={{ alignSelf: 'center', marginTop: '50px' }} />}
            <ErrorModal status={callErrorModal} setStatus={setCallErrorModal} info={errorInfo} />


        </>
    )
}

export default Register
