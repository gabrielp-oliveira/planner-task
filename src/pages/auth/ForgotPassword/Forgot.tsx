import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import  api  from '../../../api/api'
import { createBrowserHistory } from 'history'
function Forgot() {
    const email = useRef<HTMLInputElement>(null);

    useEffect(() => {
        email.current?.select()
    }, [])

    function forgotPassword(e: any) {
        e.preventDefault()
        api.post('/auth/forgot', {email: email.current?.value})
        .then((data: any) => {
            console.log('?')
            if(!data.data.error){
                createBrowserHistory().push('/confirmationpassword')
                document.location.reload();
            }else{
                alert('error')
            }
        })
        .catch((error) => {
            console.log('?')
            alert(error)
        })

    }
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <form action="" onSubmit={(e) => forgotPassword(e)}>
                <span>A token will be sendesd to your email.</span>
                <div className="label">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input name="email" ref={email} className="input" placeholder="email"/>
                </div>

                <button>submit</button>
            </form>

        </div>
    )
}

export default Forgot
