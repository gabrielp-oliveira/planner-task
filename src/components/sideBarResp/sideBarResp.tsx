import React, { useContext, useEffect } from 'react';
import '../sidebar/sideBar.css'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


function SideBarResp({ planners }: any) {
    const [state, setState] = React.useState({ left: false });

    const toggleDrawer = (anchor: any, open: any) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor:any) => (
        <div
          className='list'
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          style={{marginTop:"80px", paddingLeft: '30px'}}
        >
          <List>
                <div className="SideNav" style={{width: "200px" }}>
                    <span> <a></a></span>
                    {planners}
                </div>
          </List>
          <Divider />
    
        </div>
      );



    return (
        <div className="plannerListBars">
            <Button onClick={toggleDrawer('left', true)}>
                <FontAwesomeIcon icon={faBars} color="white" style={{fontSize:"20px"}}/>
            </Button>
            <SwipeableDrawer
            
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </div>
    )
}

export default SideBarResp
