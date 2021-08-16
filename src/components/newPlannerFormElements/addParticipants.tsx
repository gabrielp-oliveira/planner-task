import React, { useRef, useState, useEffect } from 'react'
import api from '../../api/api'

function AddParticipants({ formInfo, stage, currentInfo }: any) {


    const email = useRef<any>(null);
    const acess = useRef<HTMLSelectElement>(null);
    const [showParticipants, setShowParticipants] = useState<string[]>([])
    const [currentEmail, setCurrentEmail] = useState<string>('')

    function callNextStage() {
        if (currentInfo?.length > 0) {
            stage(2)
        } else {
            alert('ta vazio ai')
        }
    }
    function callPrecursorStage() {
        stage(0)
    }
    useEffect(() => {
        currentInfo.forEach((element: any) => {
            setShowParticipants((oldArray: any) => [...oldArray, <span key={element.email}>{element.email}</span>])
        })
        console.log(currentInfo)
    }, [])

    function confirmUser() {
        if (currentEmail.trim() !=='') {
            api.post('/user/confirm', { email: currentEmail, userId: localStorage.getItem("UserId") })
                .then((data: any) => {
                    console.log(data.data)
                    if (!data.data.error) {
                        if (currentInfo.find((el: any) => el.email === currentEmail) === undefined) {
                            setShowParticipants((oldArray: any) => [...oldArray, <span key={currentEmail}>{currentEmail}</span>])
                            formInfo((oldArray: any) => [...oldArray, {
                                email: currentEmail,
                                acess: acess.current?.value
                            }])
                        } else {
                            alert('usuario ja cadastrado')
                        }
                    } else {
                        alert(data.data.error)
                    }
                }).then(() => {
                    email.current.value = ''
                })
                .catch((err) => {
                    email.current.value = ''
                    console.log(err)
                })
        }else{
            alert('por favor, preencha o campo do email do participante')
        }

    }
    return (
        < div className="newPlannerStage">
            <span>participants</span>

            <div>
                <div>
                    <input type="text" ref={email} placeholder="email of the participant"
                        value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)
                        } />
                </div>
                <div>
                    <select name="acess" ref={acess}>
                        <option value="intermediate" >user</option>
                        <option value="total">total</option>
                        <option value="observer">observer</option>
                    </select>
                </div>
            </div>
            <p className="participants"> {showParticipants}</p>
            <button onClick={confirmUser}>add new user</button><br />
            <button onClick={callPrecursorStage}>Back</button>
            <button onClick={callNextStage}>Next</button>
        </div>
    )
}

export default AddParticipants
