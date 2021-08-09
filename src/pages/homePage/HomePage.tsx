import React from 'react'
import './HomePage.css'

import {Link} from 'react-router-dom'


function HomePage() {
    return (
        <div>
            HomePage<br/><br/>
            <Link to="/login">log in</Link><br/>
            <Link to="/register">register</Link><br/>
            <Link to="/profile">profile</Link><br/>
        </div>
    )
}

export default HomePage
