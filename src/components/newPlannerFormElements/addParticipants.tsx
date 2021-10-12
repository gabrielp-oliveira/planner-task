import React, { useRef, useState, useEffect } from 'react'
import api from '../../api/api'

import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';

import { faForward, faBackward, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import ErrorModal from '../Modal/errorModal';
import MenuItem from '@material-ui/core/MenuItem';

function AddParticipants({ formInfo, stage, currentInfo }: any) {


    const email = useRef<any>(null);
    const [acess, setAcess] = useState<string>();
    const [currentEmail, setCurrentEmail] = useState<string>('')
    const [errorInfo, setErrorInfo] = useState<string>()
    const [callError, setCallError] = useState<boolean>()

    function callNextStage() {
        console.log(currentInfo)
        if (currentInfo?.length > 0) {
            stage(2)
        } else {
            alert("you didn't added any participant, you can add later, in the planner page")
            stage(2)
        }
    }
    function callPrecursorStage() {
        stage(0)
    }
    function deletethis(ev: any) {
        const newArray = currentInfo.filter((element: any) => {
            return element.email !== ev
        })
        formInfo()
        formInfo(newArray)
    }

    function confirmUser() {
        if (currentEmail.trim() !== '') {
            if (acess?.trim() != undefined) {
                api.post('/user/confirm', { email: currentEmail, userId: localStorage.getItem("UserId") })
                    .then((data: any) => {
                        if (!data.data.error) {
                            if (currentInfo.find((el: any) => el.email === currentEmail) === undefined) {
                                formInfo((oldArray: any) => [...oldArray, {
                                    email: currentEmail,
                                    acess: acess
                                }])
                            } else {
                                setErrorInfo('already registered user.')
                                setCallError(true)
                            }
                        } else {
                            setErrorInfo(data.data.error)
                            setCallError(true)
                        }
                    }).then(() => {
                        email.current.value = ''
                    })
                    .catch((error) => {
                        email.current.value = ''
                        setErrorInfo(error)
                        setCallError(true)
                    })
            } else {
                setErrorInfo('please fill in the acess field.')
                setCallError(true)
            }
        } else {
            setErrorInfo('please fill in the participant email field.')
            setCallError(true)
        }

    }
    return (
        <>
            < div className="newPlannerStage">
                <span>participants</span>

                <div>
                    <div>
                        <TextField type="text" ref={email} label="email of the participant"
                            fullWidth
                            value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)
                            } />
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="acess of the participant"
                            name="acess"
                            fullWidth
                            onChange={(e: any) => setAcess(e.target.value)}
                            helperText="Please select your currency"
                        >

                            <MenuItem key='intermediate' value='intermediate'>
                                intermediate
                            </MenuItem>
                            <MenuItem key='total' value='total'>
                                total
                            </MenuItem>
                            <MenuItem key='observer' value='observer'>
                                observer
                            </MenuItem>
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirmUser} variant="contained" color="primary">add user</Button ><br />
                <div id="participants">{currentInfo?.map((element: any) => {
                    return <div key={element.email}>
                        <div>
                            <span>{element.email} </span>
                            <span>{element.acess}</span>
                            <Button onClick={() => deletethis(element.email)} variant="outlined" style={{ border: "1px solid rgb(224, 37, 37, 0.4)" }}> <FontAwesomeIcon icon={faTrashAlt} /></Button>
                        </div>

                    </div>
                })}</div>
                <p>

                    <Button onClick={callPrecursorStage} variant="contained" color="secondary"><FontAwesomeIcon icon={faBackward} /></Button>

                    <Button onClick={callNextStage} variant="contained" color="primary"><FontAwesomeIcon icon={faForward} /></Button>
                </p>


            </div>
            <ErrorModal status={callError} setStatus={setCallError} info={errorInfo} />
        </>
    )
}

export default AddParticipants
