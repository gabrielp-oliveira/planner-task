import React, { useEffect, useState } from 'react'
import TaskModal from '../Modal/TaskModal';
import './task.css'
import stringFormat from '../../utils/stringFormat'
import FormatDate from '../../utils/formatDate'

function Task({ info, classN, refe,  users}: any) {

    const [date, setDate] = useState<string>()
    const [dateDetails, setDateDetails] = useState<string>()
    const [callTaskModal, setCallTaskModal] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>();

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

    function TaskInfoDetails(taskId: string) {
        setCallTaskModal(true)
        setTaskId(taskId)
    }


    return (
        <>
            <div
                className={classN}
                ref={refe?.innerRef}
                {...refe?.draggableProps}
                {...refe?.dragHandleProps}
                onClick={() => TaskInfoDetails(info._id)}
            >
                <div className={`taskCard  ${info.status}`} id={info._id}>
                    <strong>{info.title? stringFormat(info.title, 15) : '...'}</strong>
                    <span>{info.description? stringFormat(info.description, 20): '...'}</span>
                    <span>{FormatDate(date, true)}</span>
                </div>
            </div>
            <TaskModal status={callTaskModal} setStatus={setCallTaskModal} taskId={taskId} users={users}/>
        </>

    )
}

export default Task
