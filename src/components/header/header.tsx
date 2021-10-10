import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

import logout from '../../utils/logout';

function header() {

    return (

        <header className='navHeader'>
            <p>
                <span><Link to="/">Home</Link></span>
            </p>
            <div>
                <Button onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </Button>
            </div>
        </header>
    )
}

export default header
