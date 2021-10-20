import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function FormDone({ formInfo, stage }: any) {
    const history = useHistory();

    const [timer, setTimer] = useState<any>(5)

    useEffect(() => {
        const origin = window.location.origin
        setInterval(() => {
            setTimer(timer - 1)
            if(timer === 1){
                history.push('/profile')
            }
        }, 1000)  
    }, [timer])

    return (<div>
        <h1>OK, its done!</h1>
        you will be redirect to your profile in {timer}.
    </div>)
}

export default FormDone
