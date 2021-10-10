import React, { useEffect, useState, useRef, useContext } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import './Planner.css'
import '../../components/column/column.css'
import '../../components/task/task.css'
import { UserContext } from '../../context/userContext'

import Task from '../../components/task/task'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import authPlanner from '../../utils/authPlanner'
import logout from '../../utils/logout';
import api from '../../api/api'
import { emitEvent, listenEvent } from '../../utils/socket'



import DelColumnModal from '../../components/Modal/DelColumnModal'
import NewColumnModal from '../../components/Modal/NewColumnModal'
import NewTaskModal from '../../components/Modal/NewTaskModal'

import InfoModal from '../../components/Modal/InfoModal'
import ErrorModal from '../../components/Modal/errorModal'

import columnModel from '../../models/columnModel'
import NavHeader from '../../components/navHeader/NavHeader'
import taskModel from '../../models/taskModel'
import ts from 'typescript'
import SideBar from '../../components/sidebar/SideBar'

function Planner({ props }: any) {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)


    const [plannerId, setPlannerId] = useState<string>('')

    const [confirmDelColum, setConfirmDelColum] = useState<boolean>(false);
    const [createNewColumn, setCreateNewColumn] = useState<boolean>(false);
    const [infoModal, setInfoModal] = useState<boolean>();
    const [createNewTask, setCreateNewTask] = useState<boolean>(false);
    const [callError, setcallError] = useState<boolean>(false);
    const [columnName, setcolumnName] = useState<string>('');
    const [columnId, setcolumnId] = useState<string>('');
    const [users, setUsers] = useState<any>();
    const [modalMessage, setModalMessage] = useState<any>();
    const [errorInfo, setErrorInfo] = useState<string>();



    const [columns, setColumns] = useState<any>({});


    useEffect(() => {

        const queryString = window.location.pathname;

        const start = queryString.search('=') + 1
        const end = queryString.length
        const id = queryString.substring(start, end)

        initializerPlanner(id)
            .catch((error) => {
                setcallError(true)
                setErrorInfo(error)
                // logout()
            })

        listenEvent('newTask', (dat: any) => {
            if (userInfoContext?.userInfo._id !== undefined &&
                (dat.userId !== userInfoContext?.userInfo._id)) {
                setInfoModal(true)
                setModalMessage(dat)
            }
            initializerPlanner(id)
                .then((stages: any) => {
                    const task: any = document.getElementById(dat.taskId)
                    task.className ='target active taskCard'
                    return dat.taskId
                })
                .then((taskId) => {
                    const task: any = document.getElementById(taskId)
                    setTimeout(() => {
                        task.className ='taskCard'
                    }, 6000);
                })
                .catch((error) => {
                    setcallError(true)
                    setErrorInfo(error)
                    // logout()
                })

        })
    }, [props.match.params.id])

    listenEvent('changeTask', (pln: columnModel[]) => {
        setColumns(pln)
    })
    listenEvent('updateTaskInfo', (taskList: columnModel) => {
        setColumns(taskList)
    })
    listenEvent('delTask', (taskId: string) => {
        const element = document.getElementById(taskId)
        element?.remove()
    })
    listenEvent('currentUsers', (usersList: any) => {
        setUsers(usersList)
    })

    function updateTaskPosition(col: any) {
        api.put('/task/updateTaskPosition', {
            params: { columns: col, plannerId, userId: userInfoContext?.userInfo?._id }
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

            // alterando o id da coludas das tarefas para o id da nova coluna
            destItems.forEach((el: any) => {
                // el.stageId = destColumn._id
            })
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
            //alterações na mesma coluna
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
                    setErrorInfo(data.data.error )
                    // logout()
                } else {
                    setColumns(data.data.planner.stages)
                    setPlannerId(data.data.planner._id)
                    setUsers(data.data.planner.users)
                    emitEvent('exitRoom', { plannerId: data.data.planner._id })
                    emitEvent('joinRoom', { plannerId: data.data.planner._id })
                    return data
                }
            })
            .then((data : any) => {
                if (data.data.error) {
                    setcallError(true)
                    setErrorInfo( data.data.error )
                }
            })
    }



    return (
        <>
            <NavHeader users={users} plannerId={plannerId} userId={userInfoContext?.userInfo._id} userEmail={userInfoContext?.userInfo.email}></NavHeader>
            <div style={{ display: 'flex', height: 'calc(100%  - 80px)' , width: '100%'}}>
                <SideBar />

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
                                                        <span><FontAwesomeIcon icon={faPlus}
                                                            onClick={() => callCreateTaskModal(true, column._id)} /></span>
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
                <DelColumnModal status={confirmDelColum} setStatus={setConfirmDelColum} name={columnName} Columnid={columnId} plannerId={plannerId} />
                <NewColumnModal status={createNewColumn} setStatus={setCreateNewColumn} plannerId={plannerId} />
                <NewTaskModal getUsers={users} status={createNewTask} setStatus={setCreateNewTask} Columnid={columnId} plannerId={plannerId} />
                <InfoModal status={infoModal} setStatus={setInfoModal} info={modalMessage} />
                <ErrorModal status={callError} setStatus={setcallError} info={errorInfo} />
            </div>
        </>

    );
}

export default Planner
