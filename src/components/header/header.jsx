import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createBrowserHistory} from 'history'

function header() {

    function logout(){
        localStorage.clear()
        createBrowserHistory().push('/login')
        document.location.reload();
    }
    return (

        <header>
            <div>
                <span><Link to="/">Home</Link></span>
            </div>
            <div>
                {/* <button onClick={() => logout()}>logout</button> */}
                <FontAwesomeIcon icon={faCog} />

                </div>
        </header>
    )
}

export default header
