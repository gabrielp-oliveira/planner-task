import React, { useEffect, useState, useRef, useContext } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import './Planner.css'
import '../../components/task/task.css'
import { UserContext } from '../../context/userContext'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import authPlanner from '../../utils/authPlanner'
import logout from '../../utils/logout';
import api from '../../api/api'
import { emitEvent, listenEvent, RemoveEvent } from '../../utils/socket'



import NewColumnModal from '../../components/Modal/NewColumnModal'
import NewTaskModal from '../../components/Modal/NewTaskModal'
import InfoModal from '../../components/Modal/InfoModal'
import ErrorModal from '../../components/Modal/errorModal'

import columnModel from '../../models/columnModel'
import NavHeader from '../../components/navHeader/NavHeader'
import Task from '../../components/task/task'
import SideBar from '../../components/sidebar/SideBar'
import taskModel from '../../models/taskModel'
import { useHistory } from "react-router-dom";

function Planner({ props }: any) {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)


    const [plannerId, setPlannerId] = useState<string>('')
    const history = useHistory();

    const [confirmDelColum, setConfirmDelColum] = useState<boolean>(false);
    const [createNewColumn, setCreateNewColumn] = useState<boolean>(false);
    const [infoModal, setInfoModal] = useState<boolean>();
    const [createNewTask, setCreateNewTask] = useState<boolean>(false);
    const [callError, setcallError] = useState<boolean>(false);
    const [userTasks, getUserTasks] = useState<boolean>(false);
    const [GetPlannerInfo, SetGetPlannerInfo] = useState<any>();
    const [userEmail, getUserEmail] = useState<string>('');
    const [columnId, setcolumnId] = useState<string>('');
    const [users, setUsers] = useState<any>();
    const [modalMessage, setModalMessage] = useState<any>();
    const [errorInfo, setErrorInfo] = useState<string>();



    const [columns, setColumns] = useState<any>({});


    useEffect(() => {

        const queryString = window.location.hash;

        const start = queryString.search('=') + 1
        const end = queryString.length
        const id = queryString.substring(start, end)

        initializerPlanner(id)
            .catch((error) => {
                setcallError(true)
                setErrorInfo(error)
                // logout()
            })

    }, [props.match.params.id])

    useEffect(() => {
        RemoveEvent('changeTask')
        RemoveEvent('updateTaskInfo')
        RemoveEvent('newTask')
        RemoveEvent('currentUsers')
        RemoveEvent('delTask')
        RemoveEvent('restoreTask')
        listenEvent('delTask', (data: any) => {
            const { task } = data
            setColumns(task)
        })

        listenEvent('changeTask', (pln: columnModel[]) => {
            setColumns(pln)
        })
        listenEvent('updateTaskInfo', (data: any, graphValues: any) => {
            setColumns(data.columns)
        })
        listenEvent('newTask', (dat: any) => {
            if (userInfoContext?._id !== undefined &&
                (dat.userId !== userInfoContext?._id)) {
                setInfoModal(true)
                setModalMessage(dat)
            }
            setColumns(dat.columns)
        })

        listenEvent('currentUsers', (usersList: any) => {
            setUsers(usersList)
        })

        listenEvent('restoreTask', (data: any) => {
            const { tasksRestored } = data
            if (tasksRestored) {
                setColumns(tasksRestored)
            }
        })
    }, [userInfoContext?._id])


    function updateTaskPosition(col: any) {
        api.put('/task/updateTaskPosition', {
            params: { columns: col, plannerId, userId: userInfoContext?._id }
        })
    }


    const onDragEnded = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.tasks];
            const destItems = [...destColumn.tasks];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            updateTaskPosition({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.tasks];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            updateTaskPosition({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedItems
                }
            });
        }

    };

    function callCreateTaskModal(callModal: boolean, coluimnId: string): void {
        setCreateNewTask(callModal)
        setcolumnId(coluimnId)
    }


    async function initializerPlanner(id: string) {
        return authPlanner(id)
            .then((data: any) => {
                if (data.data.error) {
                    setcallError(true)
                    setErrorInfo(data.data.error)
                    history.push('/profile')
                    document.location.reload();
                } else {
                    setColumns(data.data.planner?.stages)
                    setPlannerId(data.data.planner._id)
                    setUsers(data.data.planner.users)
                    emitEvent('exitRoom', { plannerId: data.data.planner._id })
                    emitEvent('joinRoom', { plannerId: data.data.planner._id, userId: userInfoContext?._id })
                    SetGetPlannerInfo(<h1 className="title"
                        onClick={() => initializerPlanner(id)}>
                        {data.data.planner.name}
                        </h1>)

                    return data
                }
            })
            .then((data: any) => {
                if (data.data.error) {
                    setcallError(true)
                    setErrorInfo(data.data.error)
                    history.push('planner-task/#/profile')
                    document.location.reload();
                }
            })
    }


    useEffect(() => {
        if (userTasks) {
            api.get('task/usersTasks', {
                params: {
                    plannerId: plannerId,
                    userEmail: userEmail
                }
            })
                .then((data: any) => {
                    setColumns(data.data.planner.stages)
                    getUserTasks(true)
                })
        }
    }, [plannerId, userEmail])

    return (
        <>
            <NavHeader users={users} plannerId={plannerId} userId={userInfoContext?._id}
                userEmail={userInfoContext?.email} planner={true} getUserTasks={getUserTasks} participantEmail={getUserEmail}
                plannerInfo={GetPlannerInfo}
            ></NavHeader>
            <div style={{ display: 'flex', height: 'calc(100%  - 80px)', width: '100%' }}>
                <SideBar plannerInfo={GetPlannerInfo}/>

                <div className="stage">
                    <DragDropContext
                        onDragEnd={result => onDragEnded(result, columns, setColumns)}
                    >
                        {Object.entries(columns)?.map(([columnId, column]: any, index: any) => {
                            return (
                                <div key={columnId}
                                    className={column._id + ' column'}
                                >
                                    <Droppable droppableId={columnId} key={columnId} direction="vertical">
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className={snapshot.isDraggingOver ? "lightblue" : ""}
                                                >
                                                    <div className="columnHeader">
                                                        <span onClick={() => callCreateTaskModal(true, column._id)}><FontAwesomeIcon icon={faPlus} /> New Task</span>
                                                        <span>{column.StageName}</span>
                                                    </div>
                                                    <div className="columnBody">
                                                        {column.tasks.map((item: any, index: any) => {
                                                            return (
                                                                <Draggable
                                                                    key={item._id}
                                                                    draggableId={item._id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <Task info={item}
                                                                                classN={snapshot.isDragging ? "dragging Task" : "Tasks"}
                                                                                refe={provided}
                                                                                users={users}
                                                                            />
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </div>
                <NewColumnModal status={createNewColumn} setStatus={setCreateNewColumn} plannerId={plannerId} />
                <NewTaskModal getUsers={users} status={createNewTask} setStatus={setCreateNewTask} Columnid={columnId} plannerId={plannerId} />
                <InfoModal status={infoModal} setStatus={setInfoModal} info={modalMessage} />
                <ErrorModal status={callError} setStatus={setcallError} info={errorInfo} />
            </div>
        </>

    );
}

export default Planner
