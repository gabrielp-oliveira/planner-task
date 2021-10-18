import React, { useEffect, useState, useRef, useContext } from 'react'
import './infoPage.css'
import graphValuesModel from '../../models/graphValuesModel'
import taskModel from '../../models/taskModel'
import userModel from '../../models/userModel'
import { UserContext } from '../../context/userContext'

import formatDate from '../../utils/formatDate'
import stringFormat from '../../utils/stringFormat'
import authPlanner from '../../utils/authPlanner';
import { listenEvent, emitEvent, RemoveEvent } from '../../utils/socket'

import ConfirmDelTaskModal from '../../components/Modal/ConfirmDelTaskModal'
import RecoveryTaskModal from '../../components/Modal/RecoveryTaskModal'
import SideBar from '../../components/sidebar/SideBar';
import NavHeader from '../../components/navHeader/NavHeader'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function InfoPage() {

    const graph = useRef<any>(null)

    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const [users, setUsers] = useState<[userModel]>();
    const [id, setId] = useState<string>();
    const [delList, setDelList] = useState<[taskModel ]>();
    const [pageInfo, setPageInfo] = useState<any>();
    const [callConfirmDelTask, setCallConfirmDelTask] = useState<boolean>();
    const [callRecoveryTask, setcallRecoveryTask] = useState<boolean>();
    const [taskId, setTaskId] = useState<string>();

    const [graphValues, setGraphValues] = useState<graphValuesModel>({ none: 0, interrupted: 0, 'waiting more details': 0, priority: 0, progressing: 0 });

    useEffect(() => {

        const tasksStatus: graphValuesModel = { none: 0, interrupted: 0, 'waiting more details': 0, priority: 0, progressing: 0 }
        const queryString = window.location.pathname;
        const start = queryString.search('=') + 1
        const end = queryString?.lastIndexOf('/')
        authPlanner(queryString.substring(start, end))
            .then((data: any) => {
                emitEvent('exitRoom', { plannerId: data.data.planner?._id })
                emitEvent('joinRoom', { plannerId: data.data.planner?._id })
                setId(data.data.planner?._id)
                setPageInfo(data.data.planner)
                setDelList(data.data.delList)
                setUsers(data.data.planner?.users)
                data.data.planner?.stages.forEach((el: any) => {
                    if (el.tasks.length > 0) {
                        el.tasks.forEach((tsk: any) => {
                            if (tsk.status === undefined) {
                                tasksStatus.none = tasksStatus.none + 1
                            }if(tsk.status === 'interrupted'){
                                tasksStatus.interrupted = tasksStatus.interrupted + 1
                            }if(tsk.status === 'waiting more details'){
                                tasksStatus['waiting more details'] = tasksStatus['waiting more details'] + 1
                            }if(tsk.status === 'priority'){
                                tasksStatus.priority = tasksStatus.priority + 1
                            }if(tsk.status === 'progressing'){
                                tasksStatus.progressing = tasksStatus.progressing + 1
                            }if(tsk.status === 'none'){
                                tasksStatus.none = tasksStatus.none + 1
                            }
                            // tasksStatus[status] = tasksStatus[status] + 1
                            // typescript error /\
                        });
                    }


                })
                setGraphValues(tasksStatus)
            })

    }, [userInfoContext])

    interface restoreResultModel {
        graphValues: graphValuesModel,
        task: [taskModel]
      }
    interface delTaskModel {
        graphValues: graphValuesModel,
        deletedTask: [taskModel]
      }
    useEffect(() => {

        RemoveEvent('deletedTask')
        RemoveEvent('restoreTask')
        RemoveEvent('delTask')
        RemoveEvent('updateTaskInfo')
        RemoveEvent('currentUsers')

        listenEvent('deletedTask', (data: [taskModel]) => {
            setDelList(data)
        })
        listenEvent('restoreTask', ({graphValues, task }: restoreResultModel) => {
            console.log(task)
            setDelList(task)
            setGraphValues(graphValues)
        })
        listenEvent('delTask', ({graphValues, deletedTask}: delTaskModel) => {
            setGraphValues(graphValues)
            setDelList(deletedTask)
        })
        listenEvent('updateTaskInfo', (data: any) => {
            setGraphValues(data.graphValues)
        })
        listenEvent('currentUsers', (usersList: any) => {
            setUsers(usersList)
        })
    }, [])
    useEffect(() => {

        var ctx = graph?.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(graphValues),
                datasets: [{
                    label: 'My First Dataset',
                    data: Object.values(graphValues),
                    backgroundColor: [
                        '#456C86',
                        '#ad88ac',
                        '#b4c237',
                        '#994040',
                        '#62b83a'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,

            }
        });
        return () => {
            chart.destroy()
        }
    }, [graphValues])



    function deleteTask(id: string) {
        setTaskId(id)
        setCallConfirmDelTask(true)
    }
    function recoverTask(id: string) {
        setTaskId(id)
        setcallRecoveryTask(true)
    }


    return (
        <>
            <NavHeader users={users} plannerId={id} userId={userInfoContext?._id}
                userEmail={userInfoContext?.email}  />
            <div style={{ display: 'flex', width: '100%', height: "calc(100% - 80px)" }}>
                <SideBar />
                <div className="infoPage">

                    <Link to={`../id=${id}`}>
                        <h2>{pageInfo?.name}</h2><br />

                    </Link>
                    <p>created at: {formatDate(pageInfo?.CreatedAt, true)}</p>
                    <p>{pageInfo?.desciption}</p>
                    tasks oppened: {Object.values(graphValues).reduce((a: any, b: any) => a + b)}
                    <div >

                        {(Object.values(graphValues).find((el) => el !== 0)) !== undefined ? '' : <h4>No Task at this planner</h4>}
                        <div className='graph'>
                            <canvas className="myChart" ref={graph} aria-label="Graph" ></canvas>
                        </div>
                        <div><br />

                            <div className="deletedList">
                                <h3>Deleted Tasks: {delList?.length}</h3>
                                <div>


                                    {delList?.map((el: any) => {
                                        return <div className={`deletedTask ${el.status ? el.status : 'none'}`} id={el._id}>
                                            <h4>{el.title ? stringFormat(el.title, 15) : '...'}</h4>
                                            <p>{formatDate(el.deletedAt, true)}</p>

                                            <p>{el.status ? el.status : 'none'}</p>

                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                                                <Button onClick={() => deleteTask(el._id)}> <FontAwesomeIcon icon={faTrashAlt} color="white" style={{ fontSize: '20px' }} /></Button>
                                                <Button onClick={() => recoverTask(el._id)}> <FontAwesomeIcon icon={faUndoAlt} color="white" style={{ fontSize: '20px' }} /></Button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDelTaskModal status={callConfirmDelTask} setStatus={setCallConfirmDelTask} taskId={taskId} />
            <RecoveryTaskModal status={callRecoveryTask} setStatus={setcallRecoveryTask} taskId={taskId} />
        </>
    )
}

export default InfoPage
