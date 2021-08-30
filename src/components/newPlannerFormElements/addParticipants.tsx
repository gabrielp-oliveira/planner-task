import React, { useRef, useState, useEffect } from 'react'
import api from '../../api/api'

function AddParticipants({ formInfo, stage, currentInfo }: any) {


    const email = useRef<any>(null);
    const acess = useRef<HTMLSelectElement>(null);
    const [currentEmail, setCurrentEmail] = useState<string>('')

    function callNextStage() {
        console.log(currentInfo)
        if (currentInfo?.length > 0) {
            stage(2)
        } else {
            alert('ta vazio ai')
        }
    }
    function callPrecursorStage() {
        stage(0)
    }
    function deletethis(ev: any) {
        const newArray =  currentInfo.filter((element : any) => {
                return element.email !== ev
        })
        formInfo()
        formInfo(newArray)
    }

    function confirmUser() {
        if (currentEmail.trim() !== '') {
            api.post('/user/confirm', { email: currentEmail, userId: localStorage.getItem("UserId") })
                .then((data: any) => {
                    console.log(data.data.name)
                    if (!data.data.error) {
                        if (currentInfo.find((el: any) => el.email === currentEmail) === undefined) {
                            
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
        } else {
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
            <div className="participants">{currentInfo?.map((element: any) => {
                return<div key={element.email}>
                <div>
                    <span>{element.email}</span>
                    <span>{element.acess}</span>
                </div>
                <button onClick={() => deletethis(element.email)}>Remove</button>

            </div>
            })}</div>
            <button onClick={confirmUser}>add new user</button><br />
            <button onClick={callPrecursorStage}>Back</button>
            <button onClick={callNextStage}>Next</button>

        </div>
    )
}

export default AddParticipants
