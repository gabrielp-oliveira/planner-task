import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { faKey, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Confirmation() {

    const code = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const password2 = useRef<HTMLInputElement>(null);
    
    return (
        <div>

            <div className="label">
                <FontAwesomeIcon icon={faKey} />
                <input type="password" name="password" ref={code} className="input" placeholder="Secret code" />
            </div>
            <div className="label">
                <FontAwesomeIcon icon={faUnlock} />
                <input type="password" name="password" ref={password} className="input" placeholder="new password" />
            </div>
            <div className="label">
                <FontAwesomeIcon icon={faUnlock} />
                <input type="password" name="password" ref={password2} className="input" placeholder="repeat password" />
            </div>

        </div>
    )
}

export default Confirmation
