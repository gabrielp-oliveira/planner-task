import React, { useEffect, useState, useRef, useContext } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

import './Planner.css'
import { UserContext } from '../../context/userContext'
import { PlannerContextProvider } from '../../context/plannerContext'
import PlannerProvider from '../../context/plannerContext'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'

import authPlanner from '../../utils/authPlanner'
import logout from '../../utils/logout';
import api from '../../api/api'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import DelColumnModal from '../../components/Modal/DelColumnModal'
import NewColumnModal from '../../components/Modal/NewColumnModal'
import NewTaskModal from '../../components/Modal/NewTaskModal'
import Column from '../../components/column/Column';

function Planner({ props }: any) {
    const { userInfoContext, setUserInfoContext } = useContext<any>(UserContext)
    const { plannerInfoContext, setPlannerInfoContext } = useContext<any>(PlannerContextProvider)

    const [columns, setColumns] = useState<any>([])
    const [plannerId, setPlannerId] = useState<string>('')
    const [acess, setAcess] = useState<string>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [orderganizer, setOrderganizer] = useState<any>();
    const [canChange, setCanChange] = useState<boolean>(false);
    const [confirmDelColum, setConfirmDelColum] = useState<boolean>(false);
    const [createNewColumn, setCreateNewColumn] = useState<boolean>(false);
    const [createNewTask, setCreateNewTask] = useState<boolean>(false);
    const [columnName, setcolumnName] = useState<string>('');
    const [columnId, setcolumnId] = useState<string>('');
    const [users, setUsers] = useState<any>();
    const [destination, setDestination] = useState<any>();



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setDestination('')
        if (acess === 'total') {
            setOrderganizer([
                <MenuItem >
                    <Checkbox
                        onChange={(e) => setCanChange(e.target.checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Change Column Order
                </MenuItem>,
                <MenuItem onClick={() => setCreateNewColumn(true)}> New Column </MenuItem>,
            ])
        }
    }, [acess])

    useEffect(() => {

        const queryString = window.location.pathname;

        const start = queryString.search('=') + 1
        const end = queryString.length
        const id = queryString.substring(start, end)
        authPlanner(id)
            .then((data) => {
                if (data.data.error) {
                    // logout()
                } else {

                    setAcess(data.data.acess)
                    setColumns(data.data.planner.stages)
                    setPlannerId(data.data.planner._id)
                    setUsers(data.data.planner.users)
                }
            })

            .catch((error) => {
                alert(error)
                // logout()
            })



    }, [props.match.params.id, userInfoContext])


    useEffect(() => {
        console.log(plannerInfoContext)
    }, [plannerInfoContext])
    const onDragEnd = (result: DropResult) => {
        if (acess === 'total' && canChange === true) {

            const { source, destination } = result
            if (!destination) return

            const items = Array.from(columns)
            const [newOrder] = items.splice(source.index, 1)
            items.splice(destination.index, 0, newOrder)

            setColumns(items)
        }
    }



    return (
        <PlannerProvider>
            <div>
                <button onClick={() => console.log(plannerInfoContext)}>teste</button>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <FontAwesomeIcon icon={faCog} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    {orderganizer}
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </div>
            <div className="Planner">
                {canChange ? <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="stage" direction="horizontal">
                        {(provided) => (
                            <div className="stage" {...provided.droppableProps} ref={provided.innerRef}>
                                {columns?.map((element: any, index: any) => {
                                    return (
                                        <Draggable key={element._id} draggableId={element.StageName} index={index} >

                                            {(provided, snapshot) => (
                                                <Column classN={snapshot.isDragging ? "dragging column" : "column"}
                                                    refe={provided}
                                                    element={element}
                                                    setDelModal={setConfirmDelColum}
                                                    setTaskModal={setCreateNewTask}
                                                    setColumnId={setcolumnId}
                                                    setColumnName={setcolumnName}
                                                    canChange={canChange}
                                                    setDestination={setDestination}
                                                ></Column>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> : <div className="stage" >
                    {columns?.map((element: any,) => {
                        return (
                            <Column classN={"column"}
                                canChange={canChange}
                                element={element}
                                tasks={element.tasks}
                            />
                        )
                    })}
                </div>}
            </div>
            <DelColumnModal status={confirmDelColum} setStatus={setConfirmDelColum} name={columnName} Columnid={columnId} plannerId={plannerId} />
            <NewColumnModal status={createNewColumn} setStatus={setCreateNewColumn} plannerId={plannerId} />
            <NewTaskModal getUsers={users} status={createNewTask} setStatus={setCreateNewTask} Columnid={columnId} plannerId={plannerId} />

        </PlannerProvider>
    )
}

export default Planner
