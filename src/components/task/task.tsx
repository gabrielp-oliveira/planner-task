import React, { useEffect, useState } from 'react'
import './task.css'

function Task({ info,  classN, refe, el, }: any) {

    const [date, setDate] = useState<string>()
    const [dateDetails, setDateDetails] = useState<string>()

    useEffect(() => {
        const teste = new Date(info.CreatedAt)
        const year = teste.getFullYear()
        const month = teste.getMonth()
        const day = teste.getDate()
        const hours = teste.getHours()
        const minutes = teste.getMinutes()
        setDateDetails(`${hours}:${minutes}`)
        setDate(`${year}-${month}-${day}`)

    }, [info])
    return (
        <div
        className={classN}
            ref={refe?.innerRef}
            {...refe?.draggableProps}
            {...refe?.dragHandleProps}>
            <div className="taskCard">
                <span>{date}</span>
                <strong>{info.title}</strong>
                <span>{info.accountable}</span>
            </div>
        </div>
    )
}

export default Task
