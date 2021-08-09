import React from 'react'
import { Route, Redirect} from 'react-router-dom'

interface prop {
    isAuth: any,
    Comp: any,
    rest: any,
    redirect: any
}

function ProtectedRouter({isAuth , redirect, Comp, ...rest}: prop) {
    return (
        <Route {...rest} render={(props) => {
            if(isAuth) {
                return <Comp props={props} tabIndex="0"/>
            }else{
                return <Redirect to={{pathname: redirect, state: {from: props.location}}}/>
            }
        }}/>
    )
}

export default ProtectedRouter
