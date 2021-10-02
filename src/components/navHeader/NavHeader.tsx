import React, { useEffect, useState, useRef, useContext } from 'react'
import './navHeader.css'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import logout from '../../utils/logout';

import { Link } from 'react-router-dom';

function NavHeader({ acess, users }: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [usersList, setUsersList] = useState<null | HTMLElement>(null);
    const [orderganizer, setOrderganizer] = useState<any>();

    useEffect(() => {
        if (acess === 'total') {
            setOrderganizer([
                <MenuItem > add new User </MenuItem>,
            ])
        }
    }, [acess])

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleUsersList = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUsersList(event.currentTarget);
    };

    const handleCloseUsersList = () => {
        setUsersList(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <div className="navHeader">
            
            <p><Link  to={'../profile'}>Profile</Link></p>
            <div>
                <span>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleUsersList}>
                        <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: "20px" }} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={usersList}
                        keepMounted
                        open={Boolean(usersList)}
                        onClose={handleCloseUsersList}
                    >
                        {users?.map((us: any) => {
                            return <MenuItem >{us.name}</MenuItem>
                        })}
                    </Menu>
                </span>
                <span>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <FontAwesomeIcon icon={faCog} style={{ fontSize: "20px" }} className="rotating" />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {orderganizer}
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </span>
            </div>
        </div>
    )
}

export default NavHeader
