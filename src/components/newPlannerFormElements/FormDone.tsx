import React, { useEffect, useState } from 'react';

function FormDone({ formInfo, stage }: any) {

    const [timer, setTimer] = useState<any>(5)

    useEffect(() => {
        const origin = window.location.origin
        setInterval(() => {
            setTimer(timer - 1)
            if(timer === 1){
                window.location.replace(origin + '/profile');
            }
        }, 1000)  
    }, [timer])

    return (<div>
        <h1>OK, its done!</h1>
        you will be redirect to your profile in {timer}.
    </div>)
}

export default FormDone
