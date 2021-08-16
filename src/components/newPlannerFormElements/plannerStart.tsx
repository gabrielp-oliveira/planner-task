import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PlannerStart({ formInfo, stage, currentInfo }: any) {

    const plaannerName = useRef<HTMLInputElement>(null);
    const plannerDescription = useRef<HTMLTextAreaElement>(null);
    const [info, setInfo] = useState<any>({ plannerDescription: '', plaannerName: '' })

    function callNextStage() {

        if (info.plannerDescription?.trim() !== '' &&
            info.plaannerName?.trim() !== '') {
            formInfo(info)
            stage(1)
        } else {
            alert('deu ruim, start')
        }
    }
    useEffect(() => {
        setInfo(currentInfo)
    }, [currentInfo])

    return (
        <>

            <div className="newPlannerStage">
                <span>lets start</span>

                <div>
                    <div>
                        <input type="text" ref={plaannerName} placeholder="Planner Name"
                            value={info?.plaannerName} onChange={(e) => setInfo({
                                plaannerName: e.target.value,
                                plannerDescription: info.plannerDescription
                            })} />
                    </div>
                    <div>
                        <textarea ref={plannerDescription} placeholder="Planner Description"
                            value={info?.plannerDescription} onChange={(e) => setInfo({
                                plannerDescription: e.target.value,
                                plaannerName: info.plaannerName
                            })} />
                    </div>
                </div>
            <p>
                <button><Link to="/profile">back to profile</Link></button>
                <button onClick={callNextStage}>Next</button>
            </p>
            </div>
        </>
    )
}

export default PlannerStart
