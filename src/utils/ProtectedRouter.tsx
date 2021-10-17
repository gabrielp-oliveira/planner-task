import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

interface prop {
    isAuth: Boolean,
    Comp: any,
    path: string,
    redirect: any,
}

function ProtectedRouter({ isAuth, redirect, Comp, path }: prop) {

    const [acess, setAcrss] = useState<any>()
    useEffect(() => {
        if (isAuth !== undefined) {
            if (isAuth) {
                setAcrss(isAuth)
            } else {
                setAcrss(false)
            }
        }else{
            console.log(acess)
        }
        // setAcrss(undefined)
    }, [isAuth])
    return (
        <Route path={path} render={(props) => {
            if (isAuth !== undefined) {
                if (isAuth) {
                    return <Comp props={props} tabIndex="0" />
                } else {
                    return <Redirect to={{ pathname: redirect, state: { from: props.location } }} />
                }
            }
        }} />
    )
}

export default ProtectedRouter
