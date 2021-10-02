import React from 'react'
import { Route, Redirect } from 'react-router-dom'

interface prop {
    isAuth: any,
    Comp: any,
    path: string,
    redirect: any,
}

function ProtectedRouter({ isAuth, redirect, Comp, path }: prop) {
    return (
        <Route path={path} render={(props) => {
            // if(isAuth) {
            //     return <Comp props={props} tabIndex="0"/>
            // }else{
            //     return <Redirect to={{pathname: redirect, state: {from: props.location}}}/>                
            // }
            return <Comp props={props} tabIndex="0" />
        }} />
    )
}

export default ProtectedRouter
