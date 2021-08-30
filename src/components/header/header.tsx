import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logout from '../../utils/logout';

function header() {

    return (

        <header>
            <div>
                <span><Link to="/">Home</Link></span>
            </div>
            <div>
                <button onClick={() => logout()}>logout</button>
                <FontAwesomeIcon icon={faCog} />

                </div>
        </header>
    )
}

export default header
