import React, { useEffect, useState, useRef, useContext } from 'react'
import { } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom'
import api from '../../../api/api'

import { UserContext, } from '../../../context/userContext'

import './Login.css'
import { createBrowserHistory } from 'history';

const auth = '/auth/login'

function Login() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)

    useEffect(() => {
        email.current?.select()
    }, [])



    function login(e: any): void {
        e.preventDefault()
        api.post(auth, {
            email: email.current?.value.trim(),
            password: password.current?.value.trim()
        })
        .then((data) => {
            console.log(data)
            if (data.data.userValid) {
                setUserInfoContext(data.data.userValid)
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('UserId', data.data.UserId)
                localStorage.setItem('userValid', data.data.userValid)
                createBrowserHistory().push('/profile')
                document.location.reload();
            }
        })
        .catch((err) => {
            console.log(err)
            alert('error')
        })
 

    }


    return (
        <div className="login">
            <div className="form">
                <div>
                    <span>Log In</span>
                    <Link to="/register"><button>register</button></Link>
                </div>
                <form onSubmit={e => login(e)}>
                    <div className="label">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="text" name="email" ref={email} className="input" />
                    </div>
                    <div className="label">
                        <FontAwesomeIcon icon={faUnlock} />
                        <input type="password" name="password" ref={password} className="input" />
                    </div>

                    <span>
                        <button className="loginButton">Login</button>
                    </span>
                </form>
                <span className="recoveryPassword">
                    <Link to="/forgotpassword">Forgot your password?</Link>
                </span>
            </div>
            <div className="info">
                alo
            </div>
        </div>
    )
}

export default Login
