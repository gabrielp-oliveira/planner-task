import React, { useEffect, useRef, useState } from 'react'
import Default from './defaultColumns'
import auth from '../../utils/auth'
import logout from '../../utils/logout';

function NewStage({ formInfo, step, currentInfo, status }: any) {

    const StageName = useRef<HTMLInputElement>(null);
    const StageDesc = useRef<HTMLInputElement>(null);
    const [info, setInfo] = useState<any>([])
    const [Stage, setStages] = useState<any>()

    function done() {
        auth.then((data) => {
            if (!data.data.error) {
                if (info.StageName?.trim() !== '' && info.StageDesc?.trim() !== '') {
                    formInfo(info)
                    status(true)
                    step(3)
                } else {
                    alert('ta vazio ai')
                }
            } else {
                alert(data.data.error)
                logout()
            }
        }).catch((data) => {
            console.log(data)
            alert(data)
            logout()
          })

    }
    function callPrecursorStage() {
        formInfo(info)
        status(false)
        step(1)
    }

    useEffect(() => {
        setStages([])
        setInfo([])
        currentInfo?.forEach((element: any) => {
            setStages((oldArray: any) => [...oldArray,
            <div key={element.StageName} className="column">
                <span >{element.StageName}</span><br />
                <span >{element.StageDesc}</span><br /><br />
            </div>])
        });
        console.log(currentInfo)
        setInfo(currentInfo)
    }, [currentInfo])

    function createNewStage() {
        if (info?.find((el: any) => el.StageName === StageName.current?.value) === undefined) {
            if (StageName.current?.value.trim() !== '') {
                setStages((oldArray: any) => [...oldArray,
                    <span key={StageName.current?.value} className="column">
                        <span >{StageName.current?.value}</span><br />
                        <span >{StageDesc.current?.value}</span><br /><br />
                    </span>
                    ])
                    setInfo((oldArray: any) => [...oldArray, {
                        StageName: StageName.current?.value,
                        StageDesc: StageDesc.current?.value
                    }])

            }else{
                alert('use a valid name')
            }
        } else {
            alert('name allready in use')
        }
    }
    function defaultStage() {
        setInfo(Default)
        setStages([])
        Default.forEach(element => {
            setStages((oldArray: any) => [...oldArray,
                <span key={element.StageName} className="column">
                    <span >{element.StageName}</span><br />
                    <span >{element.StageDesc}</span><br /><br />
                </span>
                ])
        });
    }
    return (
        <>
            <span>colunas</span>

            <div>
                <label htmlFor="">nome</label>
                <input type="text" ref={StageName} placeholder="stage Name"/>
            </div>
            <div>
                <label htmlFor="">descricao</label>
                <input type="text" ref={StageDesc} placeholder="stage Description"/>
            </div>
            <button onClick={createNewStage}> New Stage</button>
            <button onClick={defaultStage}>pre-created stage</button>
            <button onClick={callPrecursorStage}> back</button>
            <button onClick={done}> Done</button>
            <div className="columnList">{Stage}</div>
        </>
    )
}

export default NewStage
