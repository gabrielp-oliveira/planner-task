import React, { useEffect, useState, useRef, useContext } from 'react'
import RegisterModel from '../../../models/RegisterModel'
import api from '../../../api/api'
import {Link} from 'react-router-dom'
import { UserContext, } from '../../../context/userContext'
import { createBrowserHistory } from 'history';

const auth = '/auth/register'

function Register() {
    const [userInfo, setUserInfo] = useState<RegisterModel>()
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const password2 = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    // const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)

    function register (e: any){
        e.preventDefault()
        setUserInfo({
            email: email.current?.value.trim() || '',
            password: password.current?.value.trim() || '',
            name: name.current?.value.trim() || ''
        })
        api.post(auth, userInfo)
        .then((data) => {
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('UserId', data.data.UserId)
                // setUserInfoContext(data.data)
                createBrowserHistory().push('/profile')
                document.location.reload();
            
        })
        .catch(() => {
            console.log('??')
            alert('error')
        }) 
    }

    useEffect(() => {
        email.current?.select()
    }, [])

    return (
        <div className="register">
            <button><Link to="/login">Login</Link> </button>
            <form onSubmit={e => register(e)}>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" ref={email}/>
                </div>
                <div>
                    <label htmlFor="" >name</label>
                    <input type="text" ref={name}/>
                </div>
                <div>
                    <label htmlFor="" >password</label>
                    <input type="text" ref={password}/>
                </div>
                <div>
                    <label htmlFor="" >repeat</label>
                    <input type="text" ref={password2}/>
                </div>
                <button>Register</button>  
            </form>
        </div>
    )
}

export default Register
