import React, { useEffect, useState } from 'react'
import './navHeader.css'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AddUserModal from '../Modal/AddUserModal'

import api from '../../api/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog,  faUserAlt } from '@fortawesome/free-solid-svg-icons'

import logout from '../../utils/logout';

import { Link } from 'react-router-dom';
import DellUserModal from '../Modal/DellUserModal';

import { listenEvent } from '../../utils/socket'

function NavHeader({  users , userId, plannerId, userEmail, planner, getUserTasks, participantEmail }: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [usersList, setUsersList] = useState<null | HTMLElement>(null);
    const [orderganizer, setOrderganizer] = useState<any>();
    const [adUserModal, callAddUserModal] = useState<boolean>();
    const [dellUserModal, callDellUserModal] = useState<boolean>();
    const [totalUserList, setTotalUserList] = useState<any>();


    useEffect(() => {
        setTotalUserList(users)
            setOrderganizer([
                <MenuItem onClick={() => callAddUserModal(true)}> add new User </MenuItem>,
                <MenuItem onClick={() => callDellUserModal(true)}> remove User </MenuItem>,
                <MenuItem> <Link to={`/planner/id=${plannerId}/info`}> Info</Link></MenuItem>,
            ])
    }, [users])

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

    listenEvent('currentUsers', (usersList: any) => {
        setTotalUserList(usersList)
    })

    function setUserTasks(user: any){
        if(planner){
            getUserTasks(true)
            participantEmail(user?.email)

        }
    }

    return (
        <div className="navHeader">
            
            <p><Link  to={'../../profile'}>Profile</Link></p>
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
                        {totalUserList?.map((us: any) => {
                            return <MenuItem onClick={() => setUserTasks(us)}>{us.name}</MenuItem>
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
            <AddUserModal  status={adUserModal} setStatus={callAddUserModal} plannerId={plannerId} userId={userId}/> 
            <DellUserModal  status={dellUserModal} setStatus={callDellUserModal} plannerId={plannerId} userList={totalUserList} userId={userId} userEml={userEmail}/> 
            </div>
        </div>
    )
}

export default NavHeader
